"use client";
import { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { ANALYTICS_DATA } from "./data";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export function LocationsMap() {
  const [content, setContent] = useState("");
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    // Isse mouse ki current position track hogi relative to the container
    const rect = e.currentTarget.getBoundingClientRect();

    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      className="relative w-full h-[450px] bg-slate-50/50 rounded-xl overflow-hidden cursor-crosshair"
      onMouseMove={handleMouseMove}
    >
      {/* Tooltip moving with cursor */}
      {content && (
        <div
          className="pointer-events-none absolute z-[100] bg-accent/90 text-white px-3 py-1.5 rounded-md text-[11px] font-bold shadow-xl transition-transform duration-75"
          style={{
            left: position.x,
            top: position.y,
            transform: 'translate(-50%, -120%)' // Tooltip ko cursor ke thoda upar aur center mein rakhta hai
          }}
        >
          {content}
          {/* Chota sa arrow niche */}
          <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 bg-accent/80 rotate-45" />
        </div>
      )}

      <ComposableMap
        projectionConfig={{ scale: 135 }}
        width={800}
        height={400}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              // ISO Codes (geo.id) ya Name se match karna
              const country = ANALYTICS_DATA.locations.find(
                (l) => l.id === geo.id || l.name === geo.properties.name
              );

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    if (country) {
                      setContent(`${country.name.toUpperCase()} • ${country.views} VIEWS`);
                    }
                  }}
                  onMouseLeave={() => setContent("")}
                  fill={country ? "var(--accent)" : "#cbd5e1"}
                  stroke="#f8fafc"
                  strokeWidth={0.5}
                  style={{
                    hover: { fill: "var(--accent)", outline: "none", opacity: 0.9, cursor: "pointer" },
                    default: { outline: "none" },
                    pressed: { outline: "none" }
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