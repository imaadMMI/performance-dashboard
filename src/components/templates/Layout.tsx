import * as React from "react";
import { cn } from "@/lib/utils";

export interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "desktop" | "full";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  centered?: boolean;
}

const Layout = React.forwardRef<HTMLDivElement, LayoutProps>(
  ({ 
    children, 
    className, 
    maxWidth = "desktop",
    padding = "md",
    centered = true,
    ...props 
  }, ref) => {
    const paddingClasses = {
      none: "",
      sm: "px-4 py-2",
      md: "px-6 py-4",
      lg: "px-8 py-6",
      xl: "px-12 py-8",
    };

    const maxWidthValues = {
      sm: '640px',
      md: '768px', 
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      desktop: '1600px'
    };
    
    const maxWidthValue = maxWidth === "full" ? "100%" : maxWidthValues[maxWidth as keyof typeof maxWidthValues];

    return (
      <div
        ref={ref}
        className={cn(
          "w-full",
          {
            "mx-auto": centered,
          },
          paddingClasses[padding],
          className
        )}
        style={{ maxWidth: maxWidthValue }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Layout.displayName = "Layout";

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  padding?: "none" | "sm" | "md" | "lg";
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ 
    children, 
    className, 
    size = "xl",
    padding = "md",
    ...props 
  }, ref) => {
    const sizeClasses = {
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-xl",
      "2xl": "max-w-2xl",
      full: "max-w-full",
    };

    const paddingClasses = {
      none: "",
      sm: "px-4",
      md: "px-6",
      lg: "px-8",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "mx-auto w-full",
          sizeClasses[size],
          paddingClasses[padding],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";

export interface FlexProps {
  children: React.ReactNode;
  className?: string;
  direction?: "row" | "row-reverse" | "col" | "col-reverse";
  align?: "start" | "center" | "end" | "baseline" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
  gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
}

const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  ({ 
    children, 
    className, 
    direction = "row",
    align = "start",
    justify = "start",
    wrap = "nowrap",
    gap = "none",
    ...props 
  }, ref) => {
    const directionClasses = {
      row: "flex-row",
      "row-reverse": "flex-row-reverse",
      col: "flex-col",
      "col-reverse": "flex-col-reverse",
    };

    const alignClasses = {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      baseline: "items-baseline",
      stretch: "items-stretch",
    };

    const justifyClasses = {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    };

    const wrapClasses = {
      nowrap: "flex-nowrap",
      wrap: "flex-wrap",
      "wrap-reverse": "flex-wrap-reverse",
    };

    const gapClasses = {
      none: "",
      xs: "gap-1",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex",
          directionClasses[direction],
          alignClasses[align],
          justifyClasses[justify],
          wrapClasses[wrap],
          gapClasses[gap],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Flex.displayName = "Flex";

export interface GridProps {
  children: React.ReactNode;
  className?: string;
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  rows?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  responsive?: {
    tablet?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
    phone?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  };
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ 
    children, 
    className, 
    cols = 1,
    rows,
    gap = "md",
    responsive,
    ...props 
  }, ref) => {
    const colsClasses = {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6",
      12: "grid-cols-12",
    };

    const rowsClasses = {
      1: "grid-rows-1",
      2: "grid-rows-2",
      3: "grid-rows-3",
      4: "grid-rows-4",
      5: "grid-rows-5",
      6: "grid-rows-6",
    };

    const gapClasses = {
      none: "",
      xs: "gap-1",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
    };

    const responsiveClasses = responsive ? [
      responsive.tablet ? `md:${colsClasses[responsive.tablet]}` : "",
      responsive.phone ? `sm:${colsClasses[responsive.phone]}` : "",
    ].filter(Boolean).join(" ") : "";

    return (
      <div
        ref={ref}
        className={cn(
          "grid",
          colsClasses[cols],
          rows ? rowsClasses[rows] : "",
          gapClasses[gap],
          responsiveClasses,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Grid.displayName = "Grid";

export { Layout, Container, Flex, Grid };