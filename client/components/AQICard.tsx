import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface AQICardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

export function AQICard({
  children,
  className,
  title,
  subtitle,
}: AQICardProps) {
  return (
    <div
      className={cn(
        "bg-card rounded-xl p-4 shadow-sm border border-border/40",
        className,
      )}
    >
      {(title || subtitle) && (
        <div className="mb-3">
          {title && (
            <h3 className="font-semibold text-card-foreground">{title}</h3>
          )}
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
