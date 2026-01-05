import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: number;
}

const StatCard = ({ icon: Icon, label, value }: StatCardProps) => {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-border bg-card/50 px-6 py-4 backdrop-blur-sm">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-4 w-4" />
        <span className="text-xs font-medium tracking-widest uppercase">{label}</span>
      </div>
      <span className="font-display text-4xl text-foreground">{value.toLocaleString()}</span>
    </div>
  );
};

export default StatCard;
