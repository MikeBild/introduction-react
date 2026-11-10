const { App } = require('@aws-cdk/cdk');
const UserManagementApp = require('./website-stack');

const domainName = 'mikebild.com';
const hostName = 'user-management';
const app = new App(process.argv);

new UserManagementApp(app, 'UserManagementApp', {
  domainName,
  hostName,
  certificateArn:
    'arn:aws:acm:us-east-1:044086961882:certificate/37f1582c-be92-424b-b07f-ee91cb43c9ef',
});

app.run();
