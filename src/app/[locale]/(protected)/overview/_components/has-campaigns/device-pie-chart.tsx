// "use client";
// import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
// import { ANALYTICS_DATA } from "./data";

// export function DeviceChart() {
//   return (
//     <div className="h-[300px] w-full flex flex-col items-center">
//       <ResponsiveContainer width="100%" height="100%">
//         <PieChart>
//           <Pie data={ANALYTICS_DATA.devices} innerRadius={70} outerRadius={90} paddingAngle={5} dataKey="value">
//             {ANALYTICS_DATA.devices.map((entry, i) => (
//               <Cell key={i} fill={entry.color} stroke="none" />
//             ))}
//           </Pie>
//           <Tooltip />
//         </PieChart>
//       </ResponsiveContainer>
//       <div className="flex gap-4 mt-4">
//         {ANALYTICS_DATA.devices.map((d) => (
//           <div key={d.name} className="flex items-center gap-1.5 text-xs font-medium">
//             <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} /> {d.name}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ANALYTICS_DATA } from "./data";

export function DeviceChart() {
  return (
    <div className="h-[300px] w-full flex flex-col items-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie 
            data={ANALYTICS_DATA.devices} 
            innerRadius={85} // Thin donut look
            outerRadius={110} 
            dataKey="value"
            stroke="none"
          >
            {ANALYTICS_DATA.devices.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
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