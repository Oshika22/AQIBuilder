import { AQICard } from "@/components/AQICard";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Cloud,
  Wind,
  Droplets,
} from "lucide-react";

export function Forecast() {
  const forecastData = [
    {
      day: "Today",
      date: "Dec 15",
      aqi: 85,
      trend: "stable",
      weather: { temp: 22, humidity: 65, wind: 12 },
      confidence: 95,
    },
    {
      day: "Tomorrow",
      date: "Dec 16",
      aqi: 78,
      trend: "improving",
      weather: { temp: 20, humidity: 58, wind: 15 },
      confidence: 88,
    },
    {
      day: "Day After",
      date: "Dec 17",
      aqi: 92,
      trend: "worsening",
      weather: { temp: 24, humidity: 72, wind: 8 },
      confidence: 82,
    },
  ];

  const hourlyData = [
    { time: "12 PM", aqi: 85 },
    { time: "1 PM", aqi: 88 },
    { time: "2 PM", aqi: 82 },
    { time: "3 PM", aqi: 79 },
    { time: "4 PM", aqi: 76 },
    { time: "5 PM", aqi: 81 },
    { time: "6 PM", aqi: 85 },
    { time: "7 PM", aqi: 89 },
  ];

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return "bg-aqi-good";
    if (aqi <= 100) return "bg-aqi-moderate";
    if (aqi <= 150) return "bg-aqi-sensitive";
    if (aqi <= 200) return "bg-aqi-unhealthy";
    if (aqi <= 300) return "bg-aqi-very";
    return "bg-aqi-hazardous";
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving":
        return <TrendingDown className="w-4 h-4 text-green-500" />;
      case "worsening":
        return <TrendingUp className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const maxAQI = Math.max(...hourlyData.map((d) => d.aqi));

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-b from-primary/5 to-background px-4 pt-12 pb-6">
        <h1 className="text-2xl font-bold text-foreground">AQI Forecast</h1>
        <p className="text-muted-foreground">3-day air quality prediction</p>
      </div>

      <div className="px-4 space-y-6">
        {/* Hourly Chart */}
        <AQICard title="Today's Hourly Forecast">
          <div className="space-y-4">
            <div className="flex justify-between items-end h-32 px-2">
              {hourlyData.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center space-y-2"
                >
                  <div
                    className={`w-6 rounded-t ${getAQIColor(item.aqi)}`}
                    style={{ height: `${(item.aqi / maxAQI) * 80}px` }}
                  />
                  <span className="text-xs font-medium">{item.aqi}</span>
                  <span className="text-xs text-muted-foreground">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </AQICard>

        {/* 3-Day Forecast */}
        <AQICard title="3-Day Forecast">
          <div className="space-y-4">
            {forecastData.map((day, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-foreground">
                      {day.day}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {day.date}
                    </span>
                    {getTrendIcon(day.trend)}
                  </div>
                  <div className="flex items-center space-x-4 mt-1">
                    <div className="flex items-center space-x-1">
                      <Cloud className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {day.weather.temp}°C
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Droplets className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {day.weather.humidity}%
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Wind className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {day.weather.wind}km/h
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-full text-white font-bold ${getAQIColor(day.aqi)}`}
                  >
                    {day.aqi}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {day.confidence}% confidence
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AQICard>

        {/* Model Information */}
        <AQICard title="Forecast Details">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Model Used</span>
              <span className="text-sm font-medium">Advanced ML Ensemble</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">
                Data Sources
              </span>
              <span className="text-sm font-medium">
                Satellites + Ground Stations
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">
                Update Frequency
              </span>
              <span className="text-sm font-medium">Every 3 hours</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">
                Accuracy Range
              </span>
              <span className="text-sm font-medium">±15 AQI points</span>
            </div>
          </div>
        </AQICard>

        {/* Weather Impact */}
        <AQICard title="Weather Impact Analysis">
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center space-x-2">
                <Wind className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  Wind Direction: Northwest
                </span>
              </div>
              <p className="text-xs text-blue-700 dark:text-blue-200 mt-1">
                Favorable winds helping disperse pollutants from urban areas
              </p>
            </div>

            <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-800">
              <div className="flex items-center space-x-2">
                <Droplets className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-medium text-amber-900 dark:text-amber-100">
                  High Humidity Expected
                </span>
              </div>
              <p className="text-xs text-amber-700 dark:text-amber-200 mt-1">
                May increase particle formation and reduce air quality
              </p>
            </div>
          </div>
        </AQICard>
      </div>
    </div>
  );
}
