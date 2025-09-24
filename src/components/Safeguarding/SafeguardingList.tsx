import { useState } from "react";
import { Search, Plus, Filter, MoreHorizontal, Shield, AlertTriangle, Lock, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface SafeguardingIncident {
  id: string;
  clientName: string;
  incidentType: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'reported' | 'investigating' | 'action-taken' | 'closed';
  reportedBy: string;
  reportedDate: string;
  assignedTo: string;
  description: string;
  actionTaken?: string;
  referralMade: boolean;
  reviewDate?: string;
}

const mockIncidents: SafeguardingIncident[] = [
  {
    id: 'SG001',
    clientName: 'Robert Davies',
    incidentType: 'Financial Abuse',
    severity: 'high',
    status: 'investigating',
    reportedBy: 'Mark Wilson (Staff)',
    reportedDate: '2024-01-10',
    assignedTo: 'Sarah Johnson',
    description: 'Suspected financial exploitation by family member',
    referralMade: true,
    reviewDate: '2024-01-17'
  },
  {
    id: 'SG002',
    clientName: 'Margaret Thompson',
    incidentType: 'Neglect',
    severity: 'medium',
    status: 'action-taken',
    reportedBy: 'John Smith (Volunteer)',
    reportedDate: '2024-01-08',
    assignedTo: 'Sarah Johnson',
    description: 'Poor living conditions, lack of personal care',
    actionTaken: 'Social services contacted, care package arranged',
    referralMade: true,
    reviewDate: '2024-01-22'
  },
  {
    id: 'SG003',
    clientName: 'Mary Foster',
    incidentType: 'Emotional Abuse',
    severity: 'critical',
    status: 'reported',
    reportedBy: 'Emily Johnson (Volunteer)',
    reportedDate: '2024-01-14',
    assignedTo: 'Sarah Johnson',
    description: 'Verbal threats and intimidation from care provider',
    referralMade: false,
    reviewDate: '2024-01-16'
  }
];

export const SafeguardingList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [incidents] = useState<SafeguardingIncident[]>(mockIncidents);

  const filteredIncidents = incidents.filter(incident =>
    incident.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    incident.incidentType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-destructive text-destructive-foreground';
      case 'high': return 'bg-warning text-warning-foreground';
      case 'medium': return 'bg-eden-accent text-white';
      case 'low': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'reported': return 'destructive';
      case 'investigating': return 'default';
      case 'action-taken': return 'secondary';
      case 'closed': return 'outline';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl lg:text-2xl font-bold text-foreground flex items-center gap-2">
            <Shield className="h-5 w-5 lg:h-6 lg:w-6 text-warning" />
            Safeguarding
          </h2>
          <p className="text-sm text-muted-foreground">Confidential safeguarding incident management</p>
        </div>
        <Button 
          className="bg-eden-primary hover:bg-eden-primary/90 w-full sm:w-auto"
          onClick={() => toast.success("Report Incident form would open here")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Report Incident
        </Button>
      </div>

      {/* Security Warning */}
      <Alert className="border-warning bg-warning/5">
        <Lock className="h-4 w-4 text-warning" />
        <AlertDescription className="text-warning-foreground">
          <strong>Restricted Access:</strong> This section contains sensitive safeguarding information. 
          Access is logged and restricted to authorized personnel only. All data is encrypted and GDPR compliant.
        </AlertDescription>
      </Alert>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-warning" />
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-muted-foreground">Active Incidents</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <div>
                <p className="text-2xl font-bold">1</p>
                <p className="text-sm text-muted-foreground">Critical Priority</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-eden-accent" />
              <div>
                <p className="text-2xl font-bold">2</p>
                <p className="text-sm text-muted-foreground">Under Review</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-eden-secondary" />
              <div>
                <p className="text-2xl font-bold">15</p>
                <p className="text-sm text-muted-foreground">This Year</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Lock className="h-4 w-4 lg:h-5 lg:w-5 text-warning" />
            Safeguarding Incidents
          </CardTitle>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search incidents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full sm:w-auto"
              onClick={() => toast.info("Filter options would open here")}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0 sm:p-6">
          {/* Mobile Cards */}
          <div className="block lg:hidden">
            <div className="space-y-4 p-4">
              {filteredIncidents.map((incident) => (
                <Card key={incident.id} className="p-4 border-l-4 border-l-warning">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-mono text-sm font-medium text-warning mb-1">
                          {incident.id}
                        </div>
                        <p className="font-medium text-foreground">{incident.clientName}</p>
                        <p className="text-sm font-medium text-warning">{incident.incidentType}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Restricted Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => toast.success(`Viewing restricted details for ${incident.id}`)}>
                            <Lock className="h-3 w-3 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info(`Updating status for ${incident.id}`)}>Update Status</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info(`Adding notes to ${incident.id}`)}>Add Notes</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => toast.success(`Making referral for ${incident.id}`)}>Make Referral</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info(`Generating report for ${incident.id}`)}>Generate Report</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Badge className={`text-xs ${getSeverityColor(incident.severity)}`}>
                          {incident.severity}
                        </Badge>
                      </div>
                      <div>
                        <Badge variant={getStatusColor(incident.status)} className="capitalize text-xs">
                          {incident.status.replace('-', ' ')}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-1 text-sm">
                      <p className="text-muted-foreground text-xs">
                        Reported: {new Date(incident.reportedDate).toLocaleDateString()}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        By: {incident.reportedBy}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        Assigned: {incident.assignedTo}
                      </p>
                      {incident.reviewDate && (
                        <p className="text-muted-foreground text-xs">
                          Review: {new Date(incident.reviewDate).toLocaleDateString()}
                        </p>
                      )}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Referral:</span>
                        <Badge 
                          variant={incident.referralMade ? 'default' : 'destructive'} 
                          className="text-xs"
                        >
                          {incident.referralMade ? 'Made' : 'Pending'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Incident ID</TableHead>
                  <TableHead>Client & Type</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Review Date</TableHead>
                  <TableHead>Referral</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIncidents.map((incident) => (
                  <TableRow key={incident.id} className="border-l-4 border-l-warning">
                    <TableCell>
                      <div className="font-mono text-sm font-medium text-warning">
                        {incident.id}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium text-foreground">{incident.clientName}</p>
                        <p className="text-sm font-medium text-warning">{incident.incidentType}</p>
                        <p className="text-xs text-muted-foreground">
                          Reported: {new Date(incident.reportedDate).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          By: {incident.reportedBy}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`text-xs ${getSeverityColor(incident.severity)}`}>
                        {incident.severity}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(incident.status)} className="capitalize">
                        {incident.status.replace('-', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm font-medium">{incident.assignedTo}</p>
                    </TableCell>
                    <TableCell>
                      {incident.reviewDate && (
                        <p className="text-sm">
                          {new Date(incident.reviewDate).toLocaleDateString()}
                        </p>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={incident.referralMade ? 'default' : 'destructive'} 
                        className="text-xs"
                      >
                        {incident.referralMade ? 'Made' : 'Pending'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Restricted Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => toast.success(`Viewing restricted details for ${incident.id}`)}>
                            <Lock className="h-3 w-3 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info(`Updating status for ${incident.id}`)}>Update Status</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info(`Adding notes to ${incident.id}`)}>Add Notes</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => toast.success(`Making referral for ${incident.id}`)}>Make Referral</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info(`Generating report for ${incident.id}`)}>Generate Report</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};