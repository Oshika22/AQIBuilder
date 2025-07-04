import { AQICard } from "@/components/AQICard";
import {
  Bell,
  Smartphone,
  Mail,
  Clock,
  Sliders,
  MapPin,
  User,
} from "lucide-react";
import { useState } from "react";

export function Settings() {
  const [aqiThreshold, setAqiThreshold] = useState(100);
  const [enablePush, setEnablePush] = useState(true);
  const [enableSMS, setEnableSMS] = useState(false);
  const [enableEmail, setEnableEmail] = useState(true);
  const [quietHours, setQuietHours] = useState({
    start: "22:00",
    end: "08:00",
  });

  const aqiLevels = [
    { value: 50, label: "Good", color: "bg-aqi-good" },
    { value: 100, label: "Moderate", color: "bg-aqi-moderate" },
    { value: 150, label: "Unhealthy for Sensitive", color: "bg-aqi-sensitive" },
    { value: 200, label: "Unhealthy", color: "bg-aqi-unhealthy" },
    { value: 300, label: "Very Unhealthy", color: "bg-aqi-very" },
  ];

  const getCurrentLevel = (threshold: number) => {
    for (let i = aqiLevels.length - 1; i >= 0; i--) {
      if (threshold >= aqiLevels[i].value) {
        return aqiLevels[i];
      }
    }
    return aqiLevels[0];
  };

  const currentLevel = getCurrentLevel(aqiThreshold);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-b from-primary/5 to-background px-4 pt-12 pb-6">
        <div className="flex items-center space-x-3">
          <Bell className="w-6 h-6 text-primary" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Alert Settings
            </h1>
            <p className="text-muted-foreground">
              Customize your air quality notifications
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 space-y-6">
        {/* AQI Threshold */}
        <AQICard title="Alert Threshold">
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground mb-2">
                {aqiThreshold}
              </div>
              <div
                className={`inline-block px-3 py-1 rounded-full text-white text-sm font-medium ${currentLevel.color}`}
              >
                {currentLevel.label}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                You'll be notified when AQI exceeds this level
              </p>
            </div>

            {/* Custom Slider */}
            <div className="space-y-3">
              <input
                type="range"
                min="50"
                max="300"
                step="10"
                value={aqiThreshold}
                onChange={(e) => setAqiThreshold(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                style={{
                  background: `linear-gradient(to right, 
                    var(--aqi-good) 0%, 
                    var(--aqi-good) 16.67%, 
                    var(--aqi-moderate) 16.67%, 
                    var(--aqi-moderate) 33.33%, 
                    var(--aqi-sensitive) 33.33%, 
                    var(--aqi-sensitive) 50%, 
                    var(--aqi-unhealthy) 50%, 
                    var(--aqi-unhealthy) 66.67%, 
                    var(--aqi-very) 66.67%, 
                    var(--aqi-very) 83.33%, 
                    var(--aqi-hazardous) 83.33%, 
                    var(--aqi-hazardous) 100%)`,
                }}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>50</span>
                <span>100</span>
                <span>150</span>
                <span>200</span>
                <span>300</span>
              </div>
            </div>
          </div>
        </AQICard>

        {/* Notification Types */}
        <AQICard title="Notification Methods">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <Smartphone className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">
                    Push Notifications
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Instant alerts on your device
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEnablePush(!enablePush)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  enablePush ? "bg-primary" : "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    enablePush ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="font-medium text-foreground">Email Alerts</p>
                  <p className="text-sm text-muted-foreground">
                    Detailed reports via email
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEnableEmail(!enableEmail)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  enableEmail ? "bg-primary" : "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    enableEmail ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <Smartphone className="w-5 h-5 text-green-500" />
                <div>
                  <p className="font-medium text-foreground">SMS Messages</p>
                  <p className="text-sm text-muted-foreground">
                    Text message alerts (charges may apply)
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEnableSMS(!enableSMS)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  enableSMS ? "bg-primary" : "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    enableSMS ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </AQICard>

        {/* Quiet Hours */}
        <AQICard
          title="Quiet Hours"
          subtitle="No notifications during these hours"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Start Time
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="time"
                    value={quietHours.start}
                    onChange={(e) =>
                      setQuietHours({ ...quietHours, start: e.target.value })
                    }
                    className="w-full pl-10 pr-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  End Time
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="time"
                    value={quietHours.end}
                    onChange={(e) =>
                      setQuietHours({ ...quietHours, end: e.target.value })
                    }
                    className="w-full pl-10 pr-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Emergency alerts (AQI &gt; 200) will still be sent during quiet
              hours
            </p>
          </div>
        </AQICard>

        {/* Additional Settings */}
        <AQICard title="Additional Settings">
          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-3 text-left hover:bg-muted/30 rounded-lg transition-colors">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">
                    Location Settings
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Manage tracked locations
                  </p>
                </div>
              </div>
              <span className="text-sm text-muted-foreground">3 locations</span>
            </button>

            <button className="w-full flex items-center justify-between p-3 text-left hover:bg-muted/30 rounded-lg transition-colors">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Health Profile</p>
                  <p className="text-sm text-muted-foreground">
                    Personalized recommendations
                  </p>
                </div>
              </div>
              <span className="text-sm text-muted-foreground">Not set</span>
            </button>

            <button className="w-full flex items-center justify-between p-3 text-left hover:bg-muted/30 rounded-lg transition-colors">
              <div className="flex items-center space-x-3">
                <Sliders className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">
                    Advanced Settings
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Customize alert frequency and more
                  </p>
                </div>
              </div>
            </button>
          </div>
        </AQICard>

        {/* Test Alert */}
        <AQICard>
          <button className="w-full py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors">
            Send Test Alert
          </button>
          <p className="text-center text-sm text-muted-foreground mt-2">
            Test your notification settings
          </p>
        </AQICard>
      </div>
    </div>
  );
}
