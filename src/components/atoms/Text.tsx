import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textVariants = cva("", {
  variants: {
    variant: {
      // Heading variants
      h1: "text-5xl lg:text-4xl md:text-3xl font-bold leading-tight tracking-tight",
      h2: "text-4xl lg:text-3xl md:text-2xl font-bold leading-tight tracking-tight",
      h3: "text-3xl lg:text-2xl md:text-xl font-semibold leading-snug tracking-tight",
      h4: "text-2xl lg:text-xl md:text-lg font-semibold leading-snug",
      h5: "text-xl lg:text-lg md:text-base font-semibold leading-normal",
      h6: "text-lg lg:text-base md:text-sm font-medium leading-normal",
      
      // Body text variants
      body: "text-base leading-normal",
      bodyLarge: "text-lg leading-relaxed",
      bodySmall: "text-sm leading-normal",
      caption: "text-xs leading-tight font-normal tracking-wide",
      
      // UI text variants
      button: "text-sm leading-none font-medium tracking-wide",
      label: "text-sm leading-tight font-medium",
      code: "text-sm leading-normal font-mono",
      
      // Brand text variants
      logo: "text-2xl leading-none font-bold tracking-tight",
      tagline: "text-base leading-normal tracking-wide",
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
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    },
    weight: {
      thin: "font-thin",
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      extrabold: "font-extrabold",
      black: "font-black",
    },
    truncate: {
      true: "truncate",
      false: "",
    },
  },
  defaultVariants: {
    variant: "body",
    color: "primary",
    align: "left",
    weight: "normal",
    truncate: false,
  },
});

export interface TextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
    VariantProps<typeof textVariants> {
  as?: "p" | "span" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "label" | "code" | "pre";
  children: React.ReactNode;
}

const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ 
    className, 
    variant, 
    color, 
    align, 
    weight, 
    truncate, 
    as: Component = "p",
    children,
    ...props 
  }, ref) => {
    // Auto-select HTML element based on variant if not specified
    const getDefaultElement = (variant: string | null | undefined): TextProps["as"] => {
      switch (variant) {
        case "h1": return "h1";
        case "h2": return "h2";
        case "h3": return "h3";
        case "h4": return "h4";
        case "h5": return "h5";
        case "h6": return "h6";
        case "label": return "label";
        case "code": return "code";
        default: return Component;
      }
    };

    const ElementType = (Component === "p" ? getDefaultElement(variant) : Component) as React.ElementType;
    
    return (
      <ElementType
        className={cn(textVariants({ variant, color, align, weight, truncate, className }))}
        ref={ref as React.Ref<HTMLElement>}
        {...props}
      >
        {children}
      </ElementType>
    );
  }
);

Text.displayName = "Text";

export { Text, textVariants };