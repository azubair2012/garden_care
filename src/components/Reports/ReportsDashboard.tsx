import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  Download, 
  Calendar, 
  Users, 
  Heart, 
  FileText, 
  TrendingUp,
  Filter,
  PieChart
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const ReportsDashboard = () => {
  const reportCards = [
    {
      title: "Client Demographics",
      description: "Age, location, and support type breakdown",
      icon: Users,
      lastGenerated: "2024-01-15",
      format: "PDF & Excel",
      category: "Operational"
    },
    {
      title: "Volunteer Impact",
      description: "Hours contributed, case assignments, training status",
      icon: Heart,
      lastGenerated: "2024-01-14",
      format: "PDF",
      category: "Volunteer"
    },
    {
      title: "Case Outcomes",
      description: "Resolution rates, intervention effectiveness",
      icon: FileText,
      lastGenerated: "2024-01-13",
      format: "Excel",
      category: "Impact"
    },
    {
      title: "Rapid Response Metrics",
      description: "Response times, completion rates, follow-up analysis",
      icon: BarChart3,
      lastGenerated: "2024-01-12",
      format: "PDF",
      category: "Operational"
    },
    {
      title: "Advocacy Success Rates",
      description: "Outcomes by organization, resolution timeframes",
      icon: TrendingUp,
      lastGenerated: "2024-01-11",
      format: "PDF & Excel",
      category: "Impact"
    },
    {
      title: "Financial Impact Report",
      description: "Cost per intervention, value for money analysis",
      icon: PieChart,
      lastGenerated: "2024-01-10",
      format: "Excel",
      category: "Financial"
    }
  ];

  const kpiMetrics = [
    { label: "Service Users Supported", value: "247", change: "+12%", period: "vs last month" },
    { label: "Volunteer Hours", value: "1,340", change: "+8%", period: "this month" },
    { label: "Cases Resolved", value: "89", change: "+15%", period: "this quarter" },
    { label: "Advocacy Success Rate", value: "78%", change: "+5%", period: "vs last quarter" },
    { label: "Response Time (avg)", value: "15 mins", change: "-3 mins", period: "vs last month" },
    { label: "Client Satisfaction", value: "4.8/5", change: "+0.2", period: "vs last quarter" }
  ];

  const upcomingReports = [
    { name: "Monthly Funder Report", due: "2024-01-20", recipient: "NHS Greater Manchester" },
    { name: "Quarterly Impact Assessment", due: "2024-01-25", recipient: "Local Authority" },
    { name: "Volunteer Training Report", due: "2024-01-30", recipient: "Internal Management" },
    { name: "Safeguarding Annual Review", due: "2024-02-05", recipient: "Charity Commission" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Reports & Analytics</h2>
          <p className="text-muted-foreground">Generate reports for funders, regulators, and internal use</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="current-month">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current-month">Current Month</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {kpiMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">{metric.label}</p>
                <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                <div className="flex items-center gap-1">
                  <Badge 
                    variant={metric.change.startsWith('+') ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {metric.change}
                  </Badge>
                  <p className="text-xs text-muted-foreground">{metric.period}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Available Reports */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-eden-primary" />
              Available Reports
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {reportCards.map((report, index) => (
              <div key={index} className="p-4 border rounded-lg bg-eden-surface/20">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-10 h-10 bg-eden-surface rounded-lg flex items-center justify-center">
                      <report.icon className="h-5 w-5 text-eden-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground">{report.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{report.description}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {report.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          Last: {new Date(report.lastGenerated).toLocaleDateString()}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Format: {report.format}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="h-3 w-3 mr-1" />
                    Generate
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Reports */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-eden-primary" />
              Upcoming Reports
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingReports.map((report, index) => (
              <div key={index} className="p-4 border rounded-lg bg-eden-surface/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">{report.name}</h3>
                    <p className="text-sm text-muted-foreground">For: {report.recipient}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Due: {new Date(report.due).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={
                        new Date(report.due) <= new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) 
                          ? 'destructive' 
                          : 'secondary'
                      }
                      className="text-xs"
                    >
                      {Math.ceil((new Date(report.due).getTime() - Date.now()) / (24 * 60 * 60 * 1000))} days
                    </Badge>
                    <Button size="sm" variant="outline">
                      Prepare
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-6 p-4 bg-eden-primary/5 rounded-lg border border-eden-primary/20">
              <h3 className="font-medium text-eden-primary mb-2">Quick Export Options</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="justify-start">
                  <Download className="h-3 w-3 mr-2" />
                  Client List (CSV)
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <Download className="h-3 w-3 mr-2" />
                  Volunteer Hours
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <Download className="h-3 w-3 mr-2" />
                  Case Summary
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <Download className="h-3 w-3 mr-2" />
                  Monthly Stats
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};