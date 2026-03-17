// "use client";
// import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
// import { ANALYTICS_DATA } from "./data";

// export function SourcesList() {
//   return (
//     <div className="flex h-[300px] w-full">
//       <div className="flex flex-col justify-between py-2 pr-4 border-r border-border">
//         {ANALYTICS_DATA.sources.map((s) => (
//           <s.icon key={s.name} size={20} className="text-muted-foreground" />
//         ))}
//       </div>
//       <ResponsiveContainer width="100%" height="100%">
//         <BarChart layout="vertical" data={ANALYTICS_DATA.sources} margin={{ left: 10 }}>
//           <XAxis type="number" hide />
//           <YAxis dataKey="name" type="category" hide />
//           <Tooltip cursor={{ fill: "transparent" }} />
//           <Bar dataKey="views" fill="var(--secondary)" radius={[0, 4, 4, 0]} barSize={15} />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }

"use client";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, CartesianGrid } from "recharts";
import { ANALYTICS_DATA } from "./data";

export default function SourcesChart() {
  const sourceColors = ["#3b82f6", "#f59e0b", "#ef4444", "#10b981", "#8b5cf6"];

  return (
    <div className="flex h-[300px] w-full mt-4">
      {/* Left Icon Column */}
      <div className="flex flex-col justify-between py-1 pr-4 border-r border-dashed">
        {ANALYTICS_DATA.sources.map((s) => (
          <s.icon key={s.name} size={18} className="text-foreground" />
        ))}
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart layout="vertical" data={ANALYTICS_DATA.sources} margin={{ left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
          <XAxis type="number" hide />
          <YAxis dataKey="name" type="category" hide />
          <Bar dataKey="views" radius={[0, 10, 10, 0]} barSize={18}>
            {ANALYTICS_DATA.sources.map((_, index) => (
              <Cell key={`cell-${index}`} fill={sourceColors[index % sourceColors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}