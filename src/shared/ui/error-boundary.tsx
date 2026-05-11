import { AlertCircle } from "lucide-react";
import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    console.error("Error caught by boundary:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="grid min-h-screen w-full place-items-center bg-red-50">
          <div className="flex flex-col items-center justify-center gap-4 rounded-lg bg-white p-8 shadow-lg">
            <AlertCircle className="h-16 w-16 text-red-500" />
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Что-то пошло не так
              </h1>
              <p className="mt-2 text-gray-600">
                {this.state.error?.message ||
                  "Произошла непредвиденная ошибка. Попробуйте обновить страницу."}
              </p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              Обновить страницу
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}