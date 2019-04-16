const { join } = require('path');
const { Stack, RemovalPolicy, ScopedAws, CfnOutput } = require('@aws-cdk/cdk');
const { Bucket } = require('@aws-cdk/aws-s3');
const { BucketDeployment, Source } = require('@aws-cdk/aws-s3-deployment');
const {
  CloudFrontWebDistribution,
  ViewerProtocolPolicy,
  PriceClass,
  OriginProtocolPolicy,
} = require('@aws-cdk/aws-cloudfront');
const { HostedZoneProvider, AliasRecord } = require('@aws-cdk/aws-route53');

module.exports = class UserManagementApp extends Stack {
  constructor(parent, id, props) {
    super(parent, id, props);

    const { domainName, hostName, certificateArn: acmCertRef } = props;
    const region = new ScopedAws(this).region;

    const webSiteBucket = new Bucket(this, 'UserManagementAppBucket', {
      bucketName: `${hostName}.${domainName}`,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: '404.html',
      publicReadAccess: true,
      removalPolicy: RemovalPolicy.Orphan,
      retainOnDelete: false,
      versioned: true,
    });

    const deployment = new BucketDeployment(
      this,
      'UserManagementAppDeployment',
      {
        source: Source.asset(join(__dirname, '../dist')),
        destinationBucket: webSiteBucket,
        retainOnDelete: false,
      }
    );

    const distribution = new CloudFrontWebDistribution(
      this,
      'UserManagementAppDistribution',
      {
        aliasConfiguration: {
          names: [`${hostName}.${domainName}`],
          acmCertRef,
        },
        viewerProtocolPolicy: ViewerProtocolPolicy.RedirectToHTTPS,
        priceClass: PriceClass.PriceClass100,
        originConfigs: [
          {
            customOriginSource: {
              originProtocolPolicy: OriginProtocolPolicy.HttpOnly,
              domainName: `${
                webSiteBucket.bucketName
              }.s3-website.${region}.amazonaws.com`,
            },
            behaviors: [
              {
                forwardedValues: {
                  headers: ['*'],
                  queryString: true,
                  cookies: {
                    forward: 'all',
                  },
                },
                isDefaultBehavior: true,
                compress: true,
                minTtlSeconds: 0,
                maxTtlSeconds: 31536000,
                defaultTtlSeconds: 86400,
              },
            ],
          },
        ],
      }
    );

    const zone = new HostedZoneProvider(this, {
      domainName,
    }).findAndImport(this, domainName);

    new AliasRecord(this, 'UserManagementAppAliasRecord', {
      zone,
      recordName: `${hostName}.${domainName}`,
      target: distribution,
    });
  }
};
