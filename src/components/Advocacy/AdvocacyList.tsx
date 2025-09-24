import { useState } from "react";
import { Search, Plus, Filter, MoreHorizontal, UserCheck, FileText, Calendar, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

interface AdvocacyAction {
  id: string;
  clientName: string;
  advocacyType: string;
  description: string;
  targetOrganization: string;
  assignedTo: string;
  status: 'pending' | 'in-progress' | 'completed' | 'escalated';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  startDate: string;
  lastAction: string;
  nextAction?: string;
  outcome?: string;
  documentsCount: number;
}

const mockAdvocacy: AdvocacyAction[] = [
  {
    id: 'ADV001',
    clientName: 'Robert Davies',
    advocacyType: 'Housing',
    description: 'Appeal housing benefit decision and secure emergency accommodation',
    targetOrganization: 'Manchester City Council',
    assignedTo: 'Mark Wilson',
    status: 'in-progress',
    priority: 'urgent',
    startDate: '2024-01-08',
    lastAction: 'Formal appeal letter submitted',
    nextAction: 'Council meeting on 18th Jan',
    documentsCount: 5
  },
  {
    id: 'ADV002',
    clientName: 'Margaret Thompson',
    advocacyType: 'Healthcare',
    description: 'Ensure proper pain management and care plan review',
    targetOrganization: 'NHS Greater Manchester',
    assignedTo: 'Sarah Johnson',
    status: 'completed',
    priority: 'high',
    startDate: '2024-01-05',
    lastAction: 'Care plan reviewed and updated',
    outcome: 'Enhanced pain management protocol agreed',
    documentsCount: 8
  },
  {
    id: 'ADV003',
    clientName: 'Elizabeth Morris',
    advocacyType: 'Benefits',
    description: 'Appeal PIP assessment decision',
    targetOrganization: 'DWP',
    assignedTo: 'Mark Wilson',
    status: 'escalated',
    priority: 'high',
    startDate: '2024-01-02',
    lastAction: 'Tribunal hearing scheduled',
    nextAction: 'Prepare evidence for tribunal',
    documentsCount: 12
  },
  {
    id: 'ADV004',
    clientName: 'James Wilson',
    advocacyType: 'Social Care',
    description: 'Secure appropriate day care placement',
    targetOrganization: 'Adult Social Care',
    assignedTo: 'Sarah Johnson',
    status: 'completed',
    priority: 'medium',
    startDate: '2023-12-15',
    lastAction: 'Day care placement confirmed',
    outcome: 'Client attending day center 3 days/week',
    documentsCount: 6
  },
  {
    id: 'ADV005',
    clientName: 'Mary Foster',
    advocacyType: 'Mental Health',
    description: 'Access to community mental health services',
    targetOrganization: 'NHS Mental Health Trust',
    assignedTo: 'Sarah Johnson',
    status: 'pending',
    priority: 'high',
    startDate: '2024-01-12',
    lastAction: 'Initial referral submitted',
    nextAction: 'Follow up on referral status',
    documentsCount: 3
  }
];

export const AdvocacyList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [advocacy] = useState<AdvocacyAction[]>(mockAdvocacy);

  const filteredAdvocacy = advocacy.filter(action =>
    action.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    action.advocacyType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    action.targetOrganization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'secondary';
      case 'in-progress': return 'default';
      case 'escalated': return 'destructive';
      case 'completed': return 'outline';
      default: return 'secondary';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-destructive text-destructive-foreground';
      case 'high': return 'bg-warning text-warning-foreground';
      case 'medium': return 'bg-eden-accent text-white';
      case 'low': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl lg:text-2xl font-bold text-foreground">Advocacy</h2>
          <p className="text-sm text-muted-foreground">Track advocacy actions and outcomes</p>
        </div>
        <Button 
          className="bg-eden-primary hover:bg-eden-primary/90 w-full sm:w-auto"
          onClick={() => toast.success("New Advocacy Action form would open here")}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Advocacy Action
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-eden-primary" />
              <div>
                <p className="text-2xl font-bold">23</p>
                <p className="text-sm text-muted-foreground">Active Actions</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-eden-accent" />
              <div>
                <p className="text-2xl font-bold">47</p>
                <p className="text-sm text-muted-foreground">Letters Sent</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-warning" />
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-muted-foreground">Escalated Cases</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-eden-secondary" />
              <div>
                <p className="text-2xl font-bold">78%</p>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Advocacy Actions</CardTitle>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search advocacy actions..."
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
              {filteredAdvocacy.map((action) => (
                <Card key={action.id} className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-mono text-sm font-medium text-eden-primary mb-1">
                          {action.id}
                        </div>
                        <p className="font-medium text-foreground">{action.clientName}</p>
                        <Badge variant="outline" className="text-xs mt-1">
                          {action.advocacyType}
                        </Badge>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => toast.success(`Viewing details for ${action.id}`)}>View Details</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info(`Updating progress for ${action.id}`)}>Update Progress</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info(`Adding document to ${action.id}`)}>Add Document</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => toast.success(`Generating letter for ${action.id}`)}>Generate Letter</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info(`Scheduling meeting for ${action.id}`)}>Schedule Meeting</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    <p className="text-xs text-muted-foreground">
                      {action.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-muted-foreground text-xs">Target</p>
                        <p className="text-sm font-medium">{action.targetOrganization}</p>
                        <p className="text-xs text-muted-foreground">
                          Assigned: {action.assignedTo}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{action.documentsCount}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Badge variant={getStatusColor(action.status)} className="capitalize text-xs">
                          {action.status.replace('-', ' ')}
                        </Badge>
                      </div>
                      <div>
                        <Badge className={`text-xs ${getPriorityColor(action.priority)}`}>
                          {action.priority}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">
                        Started: {new Date(action.startDate).toLocaleDateString()}
                      </p>
                      <p className="text-xs font-medium text-foreground">
                        Last: {action.lastAction}
                      </p>
                      {action.nextAction && (
                        <p className="text-xs text-eden-primary">
                          Next: {action.nextAction}
                        </p>
                      )}
                      {action.outcome && (
                        <p className="text-xs text-eden-secondary">
                          Outcome: {action.outcome}
                        </p>
                      )}
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
                  <TableHead>Action ID</TableHead>
                  <TableHead>Client & Details</TableHead>
                  <TableHead>Target Organization</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Documents</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAdvocacy.map((action) => (
                  <TableRow key={action.id}>
                    <TableCell>
                      <div className="font-mono text-sm font-medium">
                        {action.id}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium text-foreground">{action.clientName}</p>
                        <Badge variant="outline" className="text-xs">
                          {action.advocacyType}
                        </Badge>
                        <p className="text-xs text-muted-foreground">
                          {action.description}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Started: {new Date(action.startDate).toLocaleDateString()}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm font-medium">{action.targetOrganization}</p>
                      <p className="text-xs text-muted-foreground">
                        Assigned: {action.assignedTo}
                      </p>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(action.status)} className="capitalize">
                        {action.status.replace('-', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`text-xs ${getPriorityColor(action.priority)}`}>
                        {action.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-foreground">
                          Last: {action.lastAction}
                        </p>
                        {action.nextAction && (
                          <p className="text-xs text-eden-primary">
                            Next: {action.nextAction}
                          </p>
                        )}
                        {action.outcome && (
                          <p className="text-xs text-eden-secondary">
                            Outcome: {action.outcome}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <FileText className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{action.documentsCount}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => toast.success(`Viewing details for ${action.id}`)}>View Details</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info(`Updating progress for ${action.id}`)}>Update Progress</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info(`Adding document to ${action.id}`)}>Add Document</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => toast.success(`Generating letter for ${action.id}`)}>Generate Letter</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info(`Scheduling meeting for ${action.id}`)}>Schedule Meeting</DropdownMenuItem>
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