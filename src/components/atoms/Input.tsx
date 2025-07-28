import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex w-full rounded-md border border-border bg-background-primary px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-border",
        error: "border-error focus-visible:ring-error",
        success: "border-primary-green focus-visible:ring-primary-green",
        warning: "border-primary-gold focus-visible:ring-primary-gold",
      },
      size: {
        default: "h-10 px-3 py-2",
        sm: "h-9 px-3 py-2 text-sm",
        lg: "h-11 px-4 py-3",
        xs: "h-8 px-2 py-1 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    variant, 
    size, 
    type = "text",
    label,
    error,
    helperText,
    leftIcon,
    rightIcon,
    loading,
    disabled,
    ...props 
  }, ref) => {
    const inputVariant = error ? "error" : variant;
    const isDisabled = disabled || loading;
    
    return (
      <div className="space-y-2">
        {label && (
          <label 
            htmlFor={props.id} 
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted">
              {leftIcon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              inputVariants({ variant: inputVariant, size, className }),
              {
                "pl-10": leftIcon,
                "pr-10": rightIcon || loading,
              }
            )}
            ref={ref}
            disabled={isDisabled}
            {...props}
          />
          {(rightIcon || loading) && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted">
              {loading ? (
                <svg
                  className="h-4 w-4 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              ) : (
                rightIcon
              )}
            </div>
          )}
        </div>
        {(error || helperText) && (
          <p className={cn(
            "text-sm",
            error ? "text-error" : "text-text-muted"
          )}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input, inputVariants };