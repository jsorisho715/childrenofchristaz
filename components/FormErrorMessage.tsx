import React from 'react';

interface FormErrorMessageProps {
  message: string;
  type?: 'error' | 'warning' | 'info';
}

const FormErrorMessage: React.FC<FormErrorMessageProps> = ({ message, type = 'error' }) => {
  const textColor = {
    error: 'text-red-600',
    warning: 'text-yellow-600',
    info: 'text-blue-600'
  }[type];

  return (
    <p className={`mt-1 text-sm ${textColor} flex items-center gap-1`}>
      <span className="inline-block w-4 h-4">
        {type === 'error' && '⚠️'}
        {type === 'warning' && 'ℹ️'}
        {type === 'info' && '💡'}
      </span>
      {message}
    </p>
  );
};

export default FormErrorMessage; 