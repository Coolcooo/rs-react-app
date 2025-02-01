import { Component } from 'react';

type ErrorDescriptionProps = {
  description: string;
};
class ErrorDescription extends Component<ErrorDescriptionProps, object> {
  render = () => {
    return <div>{this.props.description}</div>;
  };
}

export default ErrorDescription;
