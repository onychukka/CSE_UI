import React, { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div className={`border rounded-lg shadow-md p-4 mb-4 ${className}`}>
      {children}
    </div>
  );
};

interface CardHeaderProps {
  children: ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children }) => {
  return <div className="mb-4">{children}</div>;
};

interface CardTitleProps {
  children: ReactNode;
  className?: string; // Add the className prop here
}

export const CardTitle: React.FC<CardTitleProps> = ({
  children,
  className = "",
}) => {
  return <h2 className={`text-xl font-semibold ${className}`}>{children}</h2>;
};

interface CardContentProps {
  children: ReactNode;
  className?: string; // Add the className prop here
}

export const CardContent: React.FC<CardContentProps> = ({
  children,
  className = "",
}) => {
  return <div className={`text-gray-500 ${className}`}>{children}</div>;
};
