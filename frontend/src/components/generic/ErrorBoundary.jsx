import React from "react";
import Error from "./Error";
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }
  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }
  render() {
    if (this.state.errorInfo) {
      return <Error message={this.state.error.message} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
