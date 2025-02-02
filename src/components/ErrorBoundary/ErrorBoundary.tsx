import { Component, ReactNode } from 'react';
import ErrorDescription from '../ErrorDescription/ErrorDescription.tsx';

type ErrorBoundaryProps = {
  children: ReactNode;
};
type ErrorBoundaryState = {
  hasError: boolean;
};
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }
  static getDerivedStateFromError = () => {
    return { hasError: true };
  };
  componentDidCatch = (error: Error) => {
    console.log(error);
  };
  render = () => {
    if (this.state.hasError) {
      return <ErrorDescription description="Ooops, something went wrong" />;
    } else {
      return this.props.children;
    }
  };
}

export default ErrorBoundary;
