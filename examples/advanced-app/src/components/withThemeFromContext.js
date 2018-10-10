import React from 'react';

const withThemeFromContext = () => {
  return BaseComponent => {
    return class WithThemeFromContext extends React.Component {
      static contextTypes = {
        theme: React.PropTypes.object.isRequired,
      };

      render() {
        return <BaseComponent {...this.props} theme={this.context.theme} />;
      }
    };
  };
};

export default withThemeFromContext;
