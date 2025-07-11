import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  change: string;
  color: string;
}

export default function StatsCard({ icon: Icon, value, label, change, color }: StatsCardProps) {
  return (
    <div className="text-center">
      <div className={`w-24 h-24 ${color.replace('text-', 'bg-').replace('600', '100')} rounded-full flex items-center justify-center mx-auto mb-4`}>
        <Icon className={`w-12 h-12 ${color}`} />
      </div>
      <h3 className="text-3xl font-bold text-slate-800 mb-2">{value}</h3>
      <p className="text-slate-600">{label}</p>
      <div className="mt-3 text-sm text-eco-green font-medium">{change}</div>
    </div>
  );
}
