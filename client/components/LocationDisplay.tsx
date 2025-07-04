import { MapPin, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface LocationDisplayProps {
  city: string;
  country: string;
  lastUpdated: Date;
  className?: string;
}

export function LocationDisplay({
  city,
  country,
  lastUpdated,
  className,
}: LocationDisplayProps) {
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center space-x-2">
        <MapPin className="w-5 h-5 text-primary" />
        <div>
          <h2 className="font-semibold text-lg text-foreground">
            {city}, {country}
          </h2>
        </div>
      </div>
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <Clock className="w-4 h-4" />
        <span>
          Last updated: {formatDate(lastUpdated)} at {formatTime(lastUpdated)}
        </span>
      </div>
    </div>
  );
}
