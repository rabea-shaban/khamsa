import * as React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, id, checked, ...props }, ref) => {
    const checkboxId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="flex items-start gap-3 select-none text-right">
        <div className="relative flex items-center justify-center pt-0.5">
          <input
            type="checkbox"
            id={checkboxId}
            ref={ref}
            checked={checked}
            className={cn(
              'peer h-5 w-5 appearance-none rounded-md border border-border bg-surface checked:bg-primary checked:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-normal cursor-pointer disabled:cursor-not-allowed disabled:opacity-50',
              className,
            )}
            {...props}
          />
          <Check className="h-3.5 w-3.5 text-primary-foreground pointer-events-none absolute hidden peer-checked:block stroke-[3]" />
        </div>
        {(label || description) && (
          <div className="space-y-0.5">
            {label && (
              <label htmlFor={checkboxId} className="text-sm font-bold text-foreground cursor-pointer block">
                {label}
              </label>
            )}
            {description && (
              <p className="text-xs text-foreground-muted">{description}</p>
            )}
          </div>
        )}
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';
