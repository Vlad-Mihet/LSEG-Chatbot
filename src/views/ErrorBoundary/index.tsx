import { Component } from "react";
import styles from "./index.module.scss";

interface Props {
  children: React.ReactNode;
}

class ErrorBoundary extends Component<Props, { hasError: boolean }> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.error}>
          <h1>Something went wrong</h1>
          <p>Try refreshing the page or come back later.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
