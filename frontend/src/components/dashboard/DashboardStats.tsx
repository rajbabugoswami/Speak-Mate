import { Flame, Target, Trophy, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  { label: "Day Streak", value: "12", icon: Flame, color: "text-orange-500", bg: "bg-orange-100" },
  { label: "Daily Goal", value: "80%", icon: Target, color: "text-blue-500", bg: "bg-blue-100" },
  { label: "Words Learnt", value: "245", icon: Trophy, color: "text-yellow-500", bg: "bg-yellow-100" },
  { label: "Speaking Min", value: "450", icon: Clock, color: "text-emerald-500", bg: "bg-emerald-100" },
];

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div 
            key={i}
            className="bg-white rounded-2xl p-4 shadow-sm border border-border/50 flex items-center space-x-4 hover:shadow-md transition-shadow"
          >
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", stat.bg)}>
              <Icon className={cn("w-6 h-6", stat.color)} />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-xs font-medium text-muted-foreground">{stat.label}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
