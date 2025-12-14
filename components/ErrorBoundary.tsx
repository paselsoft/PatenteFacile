import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-gray-100">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Ops! Qualcosa è andato storto.</h1>
            <p className="text-gray-600 mb-6">
              Si è verificato un errore imprevisto nell'applicazione. Stiamo lavorando per risolverlo.
            </p>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="mb-6 p-4 bg-gray-100 rounded-lg text-left overflow-auto max-h-40 text-xs text-red-800 font-mono">
                    {this.state.error.toString()}
                </div>
            )}

            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-motorizzazione hover:bg-blue-800 transition-colors shadow-lg hover:shadow-xl"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Ricarica la Pagina
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}