import React from "react";
import { ReactNode, Fragment } from "react";

interface TProps {
  headline?: string;
}

export const Form: React.FunctionComponent<
  TProps & { children?: ReactNode }
> = (props) => {
  return (
    <Fragment>
      <h1>{props.headline}</h1>
      <form>{props.children}</form>
    </Fragment>
  );
};

export default Form;
