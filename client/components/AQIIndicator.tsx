import { cn } from "@/lib/utils";

interface AQIIndicatorProps {
  value: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function AQIIndicator({
  value,
  className,
  size = "md",
}: AQIIndicatorProps) {
  const getAQILevel = (aqi: number) => {
    if (aqi <= 50)
      return {
        level: "Good",
        color: "aqi-good",
        description: "Air quality is satisfactory",
      };
    if (aqi <= 100)
      return {
        level: "Moderate",
        color: "aqi-moderate",
        description: "Acceptable for most people",
      };
    if (aqi <= 150)
      return {
        level: "Unhealthy for Sensitive Groups",
        color: "aqi-sensitive",
        description: "Sensitive people may experience minor issues",
      };
    if (aqi <= 200)
      return {
        level: "Unhealthy",
        color: "aqi-unhealthy",
        description: "Everyone may experience health issues",
      };
    if (aqi <= 300)
      return {
        level: "Very Unhealthy",
        color: "aqi-very",
        description:
          "Health alert: everyone may experience serious health effects",
      };
    return {
      level: "Hazardous",
      color: "aqi-hazardous",
      description: "Emergency conditions: everyone is at risk",
    };
  };

  const aqiInfo = getAQILevel(value);

  const sizeClasses = {
    sm: "w-16 h-16 text-sm",
    md: "w-24 h-24 text-lg",
    lg: "w-32 h-32 text-2xl",
  };

  return (
    <div className={cn("flex flex-col items-center space-y-2", className)}>
      <div
        className={cn(
          "rounded-full flex items-center justify-center font-bold text-white shadow-lg",
          sizeClasses[size],
          `bg-${aqiInfo.color}`,
        )}
      >
        {value}
      </div>
      <div className="text-center">
        <div className="font-semibold text-sm">{aqiInfo.level}</div>
        {size !== "sm" && (
          <div className="text-xs text-muted-foreground max-w-[200px]">
            {aqiInfo.description}
          </div>
        )}
      </div>
    </div>
  );
}
