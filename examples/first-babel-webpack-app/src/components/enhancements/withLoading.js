import React, { Fragment as F } from "react";
import PropTypes from "prop-types";

function Spinner() {
  return <div>Loading....</div>;
}

function withLoading(WrappedComponent) {
  return props => (
    <F>
      {props.isLoading && <Spinner />}
      <WrappedComponent {...props} />
    </F>
  );
}

withLoading.propTypes = {};

export default withLoading;
