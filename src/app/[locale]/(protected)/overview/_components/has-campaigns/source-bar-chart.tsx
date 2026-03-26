
"use client";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, CartesianGrid, Tooltip } from "recharts";
import { ANALYTICS_DATA } from "./data";
import { CustomTooltip } from "../customTooltip";

export default function SourcesChart() {
  const sourceColors = ["#3b82f6", "#f59e0b", "#ef4444", "#10b981", "#8b5cf6"];

  return (
    <div className="flex h-[300px] w-full mt-4">
      {/* Left Icon Column */}
      <div className="flex flex-col justify-between py-4 pr-4 border-r border-dashed">
        {ANALYTICS_DATA.sources.map((s) => (
          <s.icon key={s.name} size={18} className="text-foreground" />
        ))}
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart layout="vertical" data={ANALYTICS_DATA.sources} margin={{ left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
          <XAxis type="number" hide />
          <YAxis dataKey="name" type="category" hide />
          {/* <Bar dataKey="views" radius={[0, 10, 10, 0]} barSize={18}>
            {ANALYTICS_DATA.sources.map((_, index) => (
              <Cell key={`cell-${index}`} fill={sourceColors[index % sourceColors.length]} />
            ))}

          </Bar> */}
          o
          <Bar dataKey="views" radius={[0, 10, 10, 0]} barSize={18}>
            {ANALYTICS_DATA.sources.map((_, index) => (
              <Cell key={`cell-${index}`} fill={sourceColors[index % sourceColors.length]} />
            ))}
          </Bar>
          <Tooltip
            cursor={{ fill: "transparent" }}
            content={<CustomTooltip items={ANALYTICS_DATA.sources} valueSuffix="Page Views" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// const CustomTooltip = ({ active, payload }: any) => {
//   if (!active || !payload?.length) return null

//   const item = ANALYTICS_DATA.sources.find(s => s.name === payload[0].payload.name)
//   if (!item) return null

//   return (
//     <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2 shadow-lg">
//       <item.icon size={15} className="text-foreground/80 shrink-0" />
//       <span className="text-sm font-medium text-foreground/80">{item.name}</span>
//       <span className="text-sm text-foreground ">{payload[0].value.toLocaleString()} views</span>
//     </div>
//   )
// }
