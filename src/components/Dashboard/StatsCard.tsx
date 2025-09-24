import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  className?: string;
}

export const StatsCard = ({ 
  title, 
  value, 
  change, 
  changeType = 'neutral', 
  icon: Icon,
  className 
}: StatsCardProps) => {
  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <CardContent className="p-4 lg:p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1 lg:space-y-2 min-w-0 flex-1">
            <p className="text-xs lg:text-sm font-medium text-muted-foreground truncate">{title}</p>
            <p className="text-lg lg:text-2xl font-bold text-foreground">{value}</p>
            {change && (
              <p className={cn(
                "text-xs font-medium truncate",
                changeType === 'positive' && "text-eden-secondary",
                changeType === 'negative' && "text-destructive",
                changeType === 'neutral' && "text-muted-foreground"
              )}>
                {change}
              </p>
            )}
          </div>
          <div className="w-10 h-10 lg:w-12 lg:h-12 bg-eden-surface rounded-lg flex items-center justify-center flex-shrink-0 ml-3">
            <Icon className="h-5 w-5 lg:h-6 lg:w-6 text-eden-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};