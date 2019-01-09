import * as React from 'react';
import { Fragment } from 'react';

interface TProps {
  headline?: string;
}

export const Form: React.StatelessComponent<TProps> = (props) => {
  return (
    <Fragment>
      <h1>{props.headline}</h1>
      <form>{props.children}</form>
    </Fragment>
  );
};

export default Form;
