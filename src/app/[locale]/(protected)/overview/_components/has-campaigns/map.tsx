"use client";
import { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { ANALYTICS_DATA } from "./data";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export function LocationsMap() {
  const [content, setContent] = useState("");
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      className="relative w-full h-[450px] rounded-xl overflow-hidden cursor-crosshair"
      onMouseMove={handleMouseMove}
    >
      {/* Tooltip */}
      {content && (
        <div
          className="pointer-events-none absolute z-[100] shadow-xl transition-transform duration-75"
          style={{ left: position.x, top: position.y, transform: "translate(-50%, -130%)" }}
        >
          <div className="bg-[#1a1a1a] border border-orange-400/30 text-white px-3 py-1.5 rounded-lg text-[11px] font-semibold flex items-center gap-2 whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            {content}
          </div>
          {/* Arrow */}
          <div className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 w-3 h-3 bg-[#1a1a1a] border-r border-b border-orange-400/30 rotate-45" />
        </div>
      )}

      <ComposableMap projectionConfig={{ scale: 135 }} width={800} height={400}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const country = ANALYTICS_DATA.locations.find(
                (l) => l.id === geo.id || l.name === geo.properties.name
              );

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    if (country)
                      setContent(`${country.name.toUpperCase()} • ${country.views} VIEWS`);
                  }}
                  onMouseLeave={() => setContent("")}
                  fill={country ? "#DB7857" : "#e2e8f0"}
                  stroke="#fff"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover: {
                      fill: country ? "#c96a3f" : "#cbd5e1",
                      outline: "none",
                      filter: country ? "drop-shadow(0 0 6px rgba(219,120,87,0.6))" : "none",
                      cursor: country ? "pointer" : "default",
                    },
                    pressed: { outline: "none" },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}