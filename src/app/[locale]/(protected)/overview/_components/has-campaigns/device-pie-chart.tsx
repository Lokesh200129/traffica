
"use client";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ANALYTICS_DATA } from "./data";
import { CustomTooltip } from "../customTooltip";

export function DeviceChart() {
  return (
    <div className="h-[300px] w-full flex flex-col items-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={ANALYTICS_DATA.devices}
            innerRadius={85}
            outerRadius={110}
            dataKey="value"
            stroke="none"
            style={{ outline: "none" }} 
          >
            {ANALYTICS_DATA.devices.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          {/* <Tooltip /> */}
          {/* <Tooltip
            formatter={(value: number, name: string) => [`${value.toLocaleString()} page views`, name]}
          /> */}
          <Tooltip
            content={
              <CustomTooltip
                items={ANALYTICS_DATA.devices.map(d => ({
                  name: d.name,
                  color: d.color   // color dot dikhega icon ki jagah
                }))}
                valueSuffix="Page Views"
              />
            }
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend at bottom */}
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4">
        {ANALYTICS_DATA.devices.map((d) => (
          <div key={d.name} className="flex items-center gap-2 text-[11px] font-medium text-foreground/70">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
            {d.name}
          </div>
        ))}
      </div>
    </div>
  );
}