// src/components/ErrorMessage.tsx
import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="card bg-red-500/10 border-red-500/50">
      <div className="flex items-center gap-3">
        <AlertCircle className="text-red-500" size={24} />
        <p className="text-red-400">{message}</p>
      </div>
    </div>
  );
};
