import { Users, Heart, FileText, Phone, TrendingUp, Clock } from "lucide-react";
import { StatsCard } from "./StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface DashboardOverviewProps {
  onNavigateToProfile?: (type: string, id: string) => void;
}

export const DashboardOverview = ({ onNavigateToProfile }: DashboardOverviewProps) => {
  const recentActivity = [
    {
      id: 1,
      type: 'case_created',
      description: 'New case created for Fatima Hassan',
      time: '2 hours ago',
      priority: 'medium',
      linkedType: 'case',
      linkedId: 'C001'
    },
    {
      id: 2,
      type: 'volunteer_assigned',
      description: 'Amina Malik assigned to befriending case',
      time: '4 hours ago',
      priority: 'low',
      linkedType: 'volunteer',
      linkedId: '1'
    },
    {
      id: 3,
      type: 'rapid_response',
      description: 'Rapid response completed for elderly client',
      time: '6 hours ago',
      priority: 'high',
      linkedType: 'client',
      linkedId: '3'
    },
    {
      id: 4,
      type: 'advocacy',
      description: 'Housing advocacy letter sent to council',
      time: '1 day ago',
      priority: 'medium',
      linkedType: 'case',
      linkedId: 'C003'
    }
  ];

  const upcomingTasks = [
    {
      id: 1,
      task: 'Follow-up call with Khadijah Ahmed',
      due: 'Today, 2:00 PM',
      assignee: 'Aisha Rahman',
      linkedType: 'client',
      linkedId: '3'
    },
    {
      id: 2,
      task: 'DBS check renewal for volunteer',
      due: 'Tomorrow, 10:00 AM',
      assignee: 'Yusuf Ahmed',
      linkedType: 'volunteer',
      linkedId: '2'
    },
    {
      id: 3,
      task: 'Quarterly safeguarding review',
      due: 'Friday, 9:00 AM',
      assignee: 'Aisha Rahman',
      linkedType: 'case',
      linkedId: 'C002'
    }
  ];

  return (
    <div className="space-y-4 lg:space-y-6">
      <div>
        <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-2">Welcome back, Aisha</h2>
        <p className="text-sm lg:text-base text-muted-foreground">Here's what's happening at Eden Care today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
        <StatsCard
          title="Active Service Users"
          value={247}
          change="+12 this month"
          changeType="positive"
          icon={Users}
        />
        <StatsCard
          title="Active Volunteers"
          value={86}
          change="+3 this month"
          changeType="positive"
          icon={Heart}
        />
        <StatsCard
          title="Open Cases"
          value={34}
          change="2 urgent"
          changeType="neutral"
          icon={FileText}
        />
        <StatsCard
          title="Rapid Responses"
          value={8}
          change="This week"
          changeType="neutral"
          icon={Phone}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-base lg:text-lg">
              <TrendingUp className="h-4 w-4 lg:h-5 lg:w-5 text-eden-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivity.map((activity) => (
              <div 
                key={activity.id} 
                className="flex items-start gap-3 p-3 rounded-lg bg-eden-surface/30 hover:bg-eden-surface/50 cursor-pointer transition-colors"
                onClick={() => onNavigateToProfile?.(activity.linkedType, activity.linkedId)}
              >
                <div className="w-2 h-2 bg-eden-accent rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground line-clamp-2">
                    {activity.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {activity.time}
                  </p>
                </div>
                <Badge 
                  variant={
                    activity.priority === 'high' ? 'destructive' : 
                    activity.priority === 'medium' ? 'default' : 'secondary'
                  }
                  className="shrink-0 text-xs"
                >
                  {activity.priority}
                </Badge>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full mt-4">
              View All Activity
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-base lg:text-lg">
              <Clock className="h-4 w-4 lg:h-5 lg:w-5 text-eden-primary" />
              Upcoming Tasks
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingTasks.map((task) => (
              <div 
                key={task.id} 
                className="flex items-start gap-3 p-3 rounded-lg bg-eden-surface/30 hover:bg-eden-surface/50 cursor-pointer transition-colors"
                onClick={() => onNavigateToProfile?.(task.linkedType, task.linkedId)}
              >
                <div className="w-2 h-2 bg-warning rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground line-clamp-2">
                    {task.task}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Due: {task.due}
                  </p>
                  <p className="text-xs text-eden-primary font-medium mt-1 truncate">
                    Assigned to: {task.assignee}
                  </p>
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full mt-4">
              View All Tasks
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};