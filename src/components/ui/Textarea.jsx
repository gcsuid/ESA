import * as React from "react";
import { cn } from "../../lib/utils";

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-border-dark bg-surface px-3 py-2 text-sm placeholder:text-text-placeholder focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-border-dark disabled:cursor-not-allowed disabled:opacity-50 text-text-primary",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
