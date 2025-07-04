import { AQIIndicator } from "@/components/AQIIndicator";
import { AQICard } from "@/components/AQICard";
import { HealthTip } from "@/components/HealthTip";
import { LocationDisplay } from "@/components/LocationDisplay";
import { Wind, Droplets, Eye, Thermometer } from "lucide-react";

export function Home() {
  // Mock data - in real app this would come from API
  const currentAQI = 85;
  const location = {
    city: "San Francisco",
    country: "USA",
    lastUpdated: new Date(),
  };

  const weatherData = {
    temperature: 22,
    humidity: 65,
    windSpeed: 12,
    visibility: 8.5,
  };

  const pollutants = [
    { name: "PM2.5", value: 45, unit: "μg/m³", status: "Moderate" },
    { name: "PM10", value: 78, unit: "μg/m³", status: "Moderate" },
    { name: "O₃", value: 120, unit: "μg/m³", status: "Unhealthy" },
    { name: "NO₂", value: 42, unit: "μg/m³", status: "Good" },
  ];

  const getPollutantColor = (status: string) => {
    switch (status) {
      case "Good":
        return "text-aqi-good";
      case "Moderate":
        return "text-aqi-moderate";
      case "Unhealthy":
        return "text-aqi-unhealthy";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-b from-primary/5 to-background px-4 pt-12 pb-6">
        <LocationDisplay
          city={location.city}
          country={location.country}
          lastUpdated={location.lastUpdated}
        />
      </div>

      <div className="px-4 space-y-6">
        {/* Main AQI Display */}
        <div className="flex justify-center py-6">
          <AQIIndicator value={currentAQI} size="lg" />
        </div>

        {/* Weather Overview */}
        <AQICard title="Current Conditions">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <Thermometer className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">Temperature</p>
                <p className="font-semibold">{weatherData.temperature}°C</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Droplets className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Humidity</p>
                <p className="font-semibold">{weatherData.humidity}%</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Wind className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-muted-foreground">Wind Speed</p>
                <p className="font-semibold">{weatherData.windSpeed} km/h</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Eye className="w-5 h-5 text-cyan-500" />
              <div>
                <p className="text-sm text-muted-foreground">Visibility</p>
                <p className="font-semibold">{weatherData.visibility} km</p>
              </div>
            </div>
          </div>
        </AQICard>

        {/* Pollutant Breakdown */}
        <AQICard title="Air Quality Details">
          <div className="space-y-3">
            {pollutants.map((pollutant) => (
              <div
                key={pollutant.name}
                className="flex justify-between items-center py-2"
              >
                <div>
                  <p className="font-medium text-foreground">
                    {pollutant.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {pollutant.value} {pollutant.unit}
                  </p>
                </div>
                <span
                  className={`text-sm font-medium ${getPollutantColor(pollutant.status)}`}
                >
                  {pollutant.status}
                </span>
              </div>
            ))}
          </div>
        </AQICard>

        {/* Health Recommendations */}
        <HealthTip aqiValue={currentAQI} />

        {/* Quick Actions */}
        <AQICard title="Quick Actions">
          <div className="grid grid-cols-2 gap-3">
            <button className="p-3 bg-primary/10 rounded-lg border border-primary/20 text-left hover:bg-primary/15 transition-colors">
              <div className="font-medium text-primary">View Forecast</div>
              <div className="text-sm text-muted-foreground">3-day outlook</div>
            </button>
            <button className="p-3 bg-secondary rounded-lg border border-border text-left hover:bg-secondary/80 transition-colors">
              <div className="font-medium text-secondary-foreground">
                Set Alerts
              </div>
              <div className="text-sm text-muted-foreground">
                Custom notifications
              </div>
            </button>
          </div>
        </AQICard>
      </div>
    </div>
  );
}
