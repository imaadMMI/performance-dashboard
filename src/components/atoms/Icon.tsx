import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const iconVariants = cva("", {
  variants: {
    size: {
      xs: "h-3 w-3",
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6",
      xl: "h-8 w-8",
      "2xl": "h-10 w-10",
      "3xl": "h-12 w-12",
    },
    color: {
      primary: "text-text-primary",
      secondary: "text-text-secondary",
      muted: "text-text-muted",
      accent: "text-text-accent",
      gold: "text-text-gold",
      white: "text-primary-white",
      black: "text-primary-black",
      success: "text-primary-green",
      warning: "text-primary-gold",
      error: "text-error",
      info: "text-info",
      current: "text-current",
    },
    variant: {
      default: "",
      button: "hover:opacity-80 transition-opacity cursor-pointer",
      interactive: "hover:opacity-80 active:opacity-60 transition-opacity cursor-pointer",
    },
  },
  defaultVariants: {
    size: "md",
    color: "current",
    variant: "default",
  },
});

export interface IconProps
  extends Omit<React.SVGAttributes<SVGElement>, 'color'>,
    VariantProps<typeof iconVariants> {
  children: React.ReactNode;
  spin?: boolean;
}

const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ 
    className, 
    size, 
    color, 
    variant, 
    spin = false,
    children,
    ...props 
  }, ref) => {
    return (
      <svg
        className={cn(
          iconVariants({ size, color, variant, className }),
          {
            "animate-spin": spin,
          }
        )}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
        ref={ref}
        {...props}
      >
        {children}
      </svg>
    );
  }
);

Icon.displayName = "Icon";

// Common icon components for reusability
export const ChevronDownIcon = React.forwardRef<SVGSVGElement, Omit<IconProps, 'children'>>(
  (props, ref) => (
    <Icon ref={ref} {...props}>
      <path d="m6 9 6 6 6-6" />
    </Icon>
  )
);

export const ChevronUpIcon = React.forwardRef<SVGSVGElement, Omit<IconProps, 'children'>>(
  (props, ref) => (
    <Icon ref={ref} {...props}>
      <path d="m18 15-6-6-6 6" />
    </Icon>
  )
);

export const ChevronLeftIcon = React.forwardRef<SVGSVGElement, Omit<IconProps, 'children'>>(
  (props, ref) => (
    <Icon ref={ref} {...props}>
      <path d="m15 18-6-6 6-6" />
    </Icon>
  )
);

export const ChevronRightIcon = React.forwardRef<SVGSVGElement, Omit<IconProps, 'children'>>(
  (props, ref) => (
    <Icon ref={ref} {...props}>
      <path d="m9 18 6-6-6-6" />
    </Icon>
  )
);

export const SearchIcon = React.forwardRef<SVGSVGElement, Omit<IconProps, 'children'>>(
  (props, ref) => (
    <Icon ref={ref} {...props}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </Icon>
  )
);

export const LoadingIcon = React.forwardRef<SVGSVGElement, Omit<IconProps, 'children'>>(
  (props, ref) => (
    <Icon ref={ref} spin {...props}>
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
      <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </Icon>
  )
);

export const CloseIcon = React.forwardRef<SVGSVGElement, Omit<IconProps, 'children'>>(
  (props, ref) => (
    <Icon ref={ref} {...props}>
      <path d="m18 6-12 12" />
      <path d="m6 6 12 12" />
    </Icon>
  )
);

export const MenuIcon = React.forwardRef<SVGSVGElement, Omit<IconProps, 'children'>>(
  (props, ref) => (
    <Icon ref={ref} {...props}>
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </Icon>
  )
);

export function IconButton({
  href,
  Icon,
  label,
  isActive,
}: {
  href: string;
  Icon: React.ElementType;
  label: string;
  isActive: boolean;
}) {
  return (
    <Link href={href}>
      <div className="group relative flex justify-center">
        <button
          aria-label={label}
          className={`
            flex items-center justify-center w-12 h-12 rounded-md
            transition-all duration-200 text-brand-black
            ${isActive
              ? "bg-(--brand-white) shadow-md"
              : "hover:bg-opacity-20"}
            group-hover:scale-105
          `}
        >
          <Icon size={30} />
        </button>

        {/* Tooltip on hover */}
        <div className="
          absolute left-full ml-3 top-1/2 -translate-y-1/2 
          bg-(--brand-light) text-black text-xs font-medium px-2 py-1 rounded shadow-lg
          opacity-0 group-hover:opacity-100 group-hover:translate-x-1 
          transition-all duration-200 pointer-events-none whitespace-nowrap
        ">
          {label}
        </div>
      </div>
    </Link>
  );
}

ChevronDownIcon.displayName = "ChevronDownIcon";
ChevronUpIcon.displayName = "ChevronUpIcon";
ChevronLeftIcon.displayName = "ChevronLeftIcon";
ChevronRightIcon.displayName = "ChevronRightIcon";
SearchIcon.displayName = "SearchIcon";
LoadingIcon.displayName = "LoadingIcon";
CloseIcon.displayName = "CloseIcon";
MenuIcon.displayName = "MenuIcon";

export { Icon, iconVariants };
