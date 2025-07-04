import { AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react";
import { AQICard } from "./AQICard";

interface HealthTipProps {
  aqiValue: number;
}

export function HealthTip({ aqiValue }: HealthTipProps) {
  const getHealthInfo = (aqi: number) => {
    if (aqi <= 50) {
      return {
        icon: CheckCircle,
        color: "text-aqi-good",
        tip: "Great day for outdoor activities! Perfect for jogging and exercise.",
        activities: ["Jogging", "Cycling", "Outdoor sports"],
      };
    }
    if (aqi <= 100) {
      return {
        icon: Info,
        color: "text-aqi-moderate",
        tip: "Air quality is acceptable. Sensitive people should limit prolonged outdoor exertion.",
        activities: ["Light exercise", "Short walks", "Indoor activities"],
      };
    }
    if (aqi <= 150) {
      return {
        icon: AlertTriangle,
        color: "text-aqi-sensitive",
        tip: "Sensitive groups should reduce outdoor activities. Consider wearing a mask.",
        activities: [
          "Indoor exercise",
          "Limited outdoor time",
          "Wear mask outside",
        ],
      };
    }
    if (aqi <= 200) {
      return {
        icon: XCircle,
        color: "text-aqi-unhealthy",
        tip: "Avoid outdoor activities. Everyone should limit time outdoors.",
        activities: [
          "Stay indoors",
          "Use air purifier",
          "Avoid exercise outside",
        ],
      };
    }
    if (aqi <= 300) {
      return {
        icon: XCircle,
        color: "text-aqi-very",
        tip: "Health alert! Avoid all outdoor activities. Keep windows closed.",
        activities: ["Stay indoors", "Seal windows", "Use air purifier"],
      };
    }
    return {
      icon: XCircle,
      color: "text-aqi-hazardous",
      tip: "Emergency conditions! Remain indoors and avoid all outdoor activities.",
      activities: [
        "Emergency indoor stay",
        "Medical consultation",
        "Air purifier essential",
      ],
    };
  };

  const healthInfo = getHealthInfo(aqiValue);
  const Icon = healthInfo.icon;

  return (
    <AQICard title="Health Recommendations">
      <div className="space-y-3">
        <div className="flex items-start space-x-3">
          <Icon className={`w-5 h-5 mt-0.5 ${healthInfo.color}`} />
          <p className="text-sm text-foreground leading-relaxed">
            {healthInfo.tip}
          </p>
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground">
            Recommendations:
          </h4>
          <ul className="space-y-1">
            {healthInfo.activities.map((activity, index) => (
              <li
                key={index}
                className="text-sm text-muted-foreground flex items-center space-x-2"
              >
                <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full" />
                <span>{activity}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AQICard>
  );
}
