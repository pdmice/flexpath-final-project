import React from "react";
import { Link } from "react-router-dom";

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
      return (
        <div>
          <h2 className="text-center">An Error Has Occurred</h2>
          <p className="text-center">
            {" "}
            Have you made sure the backend is running, and you haven't fed it
            horribly mis-formed data? If you've gone this far up the error tree
            it's probably one of those.
          </p>
          <a href="http://localhost:5173/"> go home</a>
          <details>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
