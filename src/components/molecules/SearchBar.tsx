import * as React from "react";
import { Input } from "@/components/atoms/Input";
import { SearchIcon } from "@/components/atoms/Icon";
import { cn } from "@/lib/utils";

export interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  className?: string;
  size?: "default" | "sm" | "lg";
  loading?: boolean;
  disabled?: boolean;
}

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({
    placeholder = "Search...",
    value,
    onChange,
    onSubmit,
    className,
    size = "default",
    loading = false,
    disabled = false,
    ...props
  }, ref) => {
    const [internalValue, setInternalValue] = React.useState(value || "");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInternalValue(newValue);
      onChange?.(newValue);
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit?.(internalValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        onSubmit?.(internalValue);
      }
    };

    React.useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value);
      }
    }, [value]);

    return (
      <form onSubmit={handleSubmit} className={cn("relative", className)}>
        <Input
          ref={ref}
          type="search"
          placeholder={placeholder}
          value={internalValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          leftIcon={<SearchIcon size="sm" />}
          size={size}
          loading={loading}
          disabled={disabled}
          className="w-full"
          {...props}
        />
      </form>
    );
  }
);

SearchBar.displayName = "SearchBar";

export { SearchBar };