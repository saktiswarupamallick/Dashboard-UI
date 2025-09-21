import { Component } from 'react';
import type { ReactNode, ErrorInfo } from 'react';
import { THEME_CLASSES } from '../utils/theme';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
    
    this.setState({
      error,
      errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className={`min-h-screen flex items-center justify-center ${THEME_CLASSES.DASHBOARD_BG}`}>
          <div className={`max-w-md w-full mx-4 p-6 rounded-lg shadow-lg ${THEME_CLASSES.CARD_BG} border ${THEME_CLASSES.BORDER_DEFAULT}`}>
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0">
                <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className={`text-lg font-medium ${THEME_CLASSES.TEXT_PRIMARY}`}>
                  Something went wrong
                </h3>
              </div>
            </div>
            
            <div className="mt-4">
              <p className={`text-sm ${THEME_CLASSES.TEXT_SECONDARY}`}>
                We're sorry, but something unexpected happened. Please try refreshing the page.
              </p>
              
              {import.meta.env.DEV && this.state.error && (
                <details className="mt-4">
                  <summary className={`cursor-pointer text-sm font-medium ${THEME_CLASSES.TEXT_PRIMARY}`}>
                    Error Details 
                  </summary>
                  <pre className={`mt-2 text-xs ${THEME_CLASSES.TEXT_SECONDARY} bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-auto`}>
                    {this.state.error.toString()}
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </details>
              )}
            </div>
            
            <div className="mt-6">
              <button
                onClick={() => window.location.reload()}
                className={`w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 ${THEME_CLASSES.FOCUS_RING}`}
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
