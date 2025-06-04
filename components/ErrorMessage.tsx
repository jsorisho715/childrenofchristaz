import React from 'react';

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  type?: 'error' | 'warning' | 'info';
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  title = 'Oops!', 
  message, 
  onRetry,
  type = 'error'
}) => {
  const bgColor = {
    error: 'bg-red-50 border-red-200',
    warning: 'bg-yellow-50 border-yellow-200',
    info: 'bg-blue-50 border-blue-200'
  }[type];

  const textColor = {
    error: 'text-red-800',
    warning: 'text-yellow-800',
    info: 'text-blue-800'
  }[type];

  return (
    <div className={`p-4 ${bgColor} border rounded-md shadow-sm`}>
      <h2 className={`text-lg font-semibold ${textColor}`}>{title}</h2>
      <p className={`mt-2 ${textColor}`}>{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 px-4 py-2 bg-gold-500 text-black rounded-md hover:bg-gold-600 transition-colors duration-200"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage; 