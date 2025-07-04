import { AQICard } from "@/components/AQICard";
import {
  MapPin,
  Factory,
  Car,
  Flame,
  Layers,
  Search,
  Navigation,
} from "lucide-react";
import { useState } from "react";

export function Map() {
  const [selectedSource, setSelectedSource] = useState<string | null>(null);

  const pollutionSources = [
    {
      id: "traffic",
      name: "Heavy Traffic",
      icon: Car,
      location: "Downtown Intersection",
      aqi: 120,
      type: "traffic",
      coordinates: { lat: 37.7749, lng: -122.4194 },
    },
    {
      id: "factory",
      name: "Industrial Plant",
      icon: Factory,
      location: "Industrial District",
      aqi: 180,
      type: "industrial",
      coordinates: { lat: 37.7849, lng: -122.4094 },
    },
    {
      id: "burning",
      name: "Controlled Burn",
      icon: Flame,
      location: "Rural Area",
      aqi: 95,
      type: "fire",
      coordinates: { lat: 37.7649, lng: -122.4294 },
    },
  ];

  const getSourceColor = (aqi: number) => {
    if (aqi <= 50) return "text-aqi-good";
    if (aqi <= 100) return "text-aqi-moderate";
    if (aqi <= 150) return "text-aqi-sensitive";
    if (aqi <= 200) return "text-aqi-unhealthy";
    if (aqi <= 300) return "text-aqi-very";
    return "text-aqi-hazardous";
  };

  const getSourceBgColor = (aqi: number) => {
    if (aqi <= 50) return "bg-aqi-good/20 border-aqi-good/40";
    if (aqi <= 100) return "bg-aqi-moderate/20 border-aqi-moderate/40";
    if (aqi <= 150) return "bg-aqi-sensitive/20 border-aqi-sensitive/40";
    if (aqi <= 200) return "bg-aqi-unhealthy/20 border-aqi-unhealthy/40";
    if (aqi <= 300) return "bg-aqi-very/20 border-aqi-very/40";
    return "bg-aqi-hazardous/20 border-aqi-hazardous/40";
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-b from-primary/5 to-background px-4 pt-12 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Pollution Map
            </h1>
            <p className="text-muted-foreground">
              Real-time air quality heatmap
            </p>
          </div>
          <button className="p-2 bg-primary text-primary-foreground rounded-lg">
            <Navigation className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="mt-4 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search location..."
            className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
      </div>

      <div className="px-4 space-y-6">
        {/* Map Placeholder with Heatmap Visualization */}
        <AQICard>
          <div className="relative h-64 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-lg overflow-hidden">
            {/* Simulated heatmap overlay */}
            <div className="absolute inset-0">
              {/* Good air quality zones (green) */}
              <div className="absolute top-4 left-4 w-16 h-16 bg-aqi-good/30 rounded-full blur-xl" />
              <div className="absolute bottom-8 right-8 w-20 h-20 bg-aqi-good/30 rounded-full blur-xl" />

              {/* Moderate zones (yellow) */}
              <div className="absolute top-12 right-12 w-24 h-24 bg-aqi-moderate/40 rounded-full blur-xl" />
              <div className="absolute bottom-16 left-16 w-18 h-18 bg-aqi-moderate/40 rounded-full blur-xl" />

              {/* Unhealthy zones (red) */}
              <div className="absolute top-20 left-1/3 w-12 h-12 bg-aqi-unhealthy/50 rounded-full blur-lg" />
              <div className="absolute bottom-12 right-1/4 w-14 h-14 bg-aqi-sensitive/40 rounded-full blur-lg" />
            </div>

            {/* Pollution source markers */}
            {pollutionSources.map((source) => {
              const Icon = source.icon;
              return (
                <button
                  key={source.id}
                  onClick={() => setSelectedSource(source.id)}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-2 rounded-full border-2 transition-all hover:scale-110 ${getSourceBgColor(source.aqi)}`}
                  style={{
                    top: `${(source.coordinates.lat - 37.7649) * 1000 + 50}%`,
                    left: `${(source.coordinates.lng + 122.4294) * 1000 + 30}%`,
                  }}
                >
                  <Icon className={`w-4 h-4 ${getSourceColor(source.aqi)}`} />
                </button>
              );
            })}

            {/* Map controls */}
            <div className="absolute top-4 right-4 flex flex-col space-y-2">
              <button className="p-2 bg-background border border-border rounded shadow-sm">
                <Layers className="w-4 h-4" />
              </button>
              <button className="p-2 bg-background border border-border rounded shadow-sm">
                <MapPin className="w-4 h-4" />
              </button>
            </div>
          </div>
        </AQICard>

        {/* Legend */}
        <AQICard title="Air Quality Legend">
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-aqi-good rounded-full" />
              <span>Good (0-50)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-aqi-moderate rounded-full" />
              <span>Moderate (51-100)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-aqi-sensitive rounded-full" />
              <span>Sensitive (101-150)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-aqi-unhealthy rounded-full" />
              <span>Unhealthy (151-200)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-aqi-very rounded-full" />
              <span>Very (201-300)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-aqi-hazardous rounded-full" />
              <span>Hazardous (300+)</span>
            </div>
          </div>
        </AQICard>

        {/* Pollution Sources */}
        <AQICard title="Pollution Sources">
          <div className="space-y-3">
            {pollutionSources.map((source) => {
              const Icon = source.icon;
              const isSelected = selectedSource === source.id;
              return (
                <button
                  key={source.id}
                  onClick={() =>
                    setSelectedSource(isSelected ? null : source.id)
                  }
                  className={`w-full p-3 rounded-lg border transition-all text-left ${
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50 hover:bg-primary/5"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-full ${getSourceBgColor(source.aqi)}`}
                      >
                        <Icon
                          className={`w-4 h-4 ${getSourceColor(source.aqi)}`}
                        />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {source.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {source.location}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-lg font-bold ${getSourceColor(source.aqi)}`}
                      >
                        {source.aqi}
                      </div>
                      <div className="text-xs text-muted-foreground">AQI</div>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Type:</span>
                          <span className="ml-2 capitalize">{source.type}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Impact:</span>
                          <span className="ml-2">High</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Distance:
                          </span>
                          <span className="ml-2">2.3 km</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Wind:</span>
                          <span className="ml-2">Towards you</span>
                        </div>
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </AQICard>

        {/* Map Data Info */}
        <AQICard title="Data Information">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last Updated</span>
              <span>5 minutes ago</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Data Resolution</span>
              <span>1 km grid</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Monitoring Stations</span>
              <span>47 active</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Satellite Data</span>
              <span>Available</span>
            </div>
          </div>
        </AQICard>
      </div>
    </div>
  );
}
