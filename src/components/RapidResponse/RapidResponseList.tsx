import { useState } from "react";
import { Search, Plus, Filter, MoreHorizontal, Phone, Clock, CheckCircle, AlertTriangle } from "lucide-react";
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

interface RapidResponse {
  id: string;
  clientName: string;
  requestType: string;
  description: string;
  requestedBy: string;
  assignedTo: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  requestTime: string;
  responseTime?: string;
  completedTime?: string;
  outcome?: string;
  followUpRequired: boolean;
}

const mockResponses: RapidResponse[] = [
  {
    id: 'RR001',
    clientName: 'Margaret Thompson',
    requestType: 'Emergency Shopping',
    description: 'Client has no food, unable to leave home due to illness',
    requestedBy: 'NHS District Nurse',
    assignedTo: 'John Smith (Volunteer)',
    status: 'completed',
    priority: 'high',
    requestTime: '2024-01-15T09:30:00Z',
    responseTime: '2024-01-15T10:15:00Z',
    completedTime: '2024-01-15T14:30:00Z',
    outcome: 'Essential groceries delivered, client stable',
    followUpRequired: true
  },
  {
    id: 'RR002',
    clientName: 'Robert Davies',
    requestType: 'Hospital Transport',
    description: 'Urgent transport needed for medical appointment',
    requestedBy: 'GP Surgery',
    assignedTo: 'Mark Wilson (Staff)',
    status: 'in-progress',
    priority: 'urgent',
    requestTime: '2024-01-15T11:00:00Z',
    responseTime: '2024-01-15T11:15:00Z',
    followUpRequired: false
  },
  {
    id: 'RR003',
    clientName: 'Elizabeth Morris',
    requestType: 'Emotional Support',
    description: 'Client experiencing severe anxiety, needs immediate support',
    requestedBy: 'Family Member',
    assignedTo: 'Sarah Johnson (Staff)',
    status: 'pending',
    priority: 'high',
    requestTime: '2024-01-15T13:45:00Z',
    followUpRequired: true
  },
  {
    id: 'RR004',
    clientName: 'James Wilson',
    requestType: 'Medication Collection',
    description: 'Prescription collection from pharmacy',
    requestedBy: 'Client',
    assignedTo: 'Emily Johnson (Volunteer)',
    status: 'completed',
    priority: 'medium',
    requestTime: '2024-01-14T16:20:00Z',
    responseTime: '2024-01-14T16:45:00Z',
    completedTime: '2024-01-14T18:00:00Z',
    outcome: 'Medication collected and delivered safely',
    followUpRequired: false
  },
  {
    id: 'RR005',
    clientName: 'Mary Foster',
    requestType: 'Welfare Check',
    description: 'Concerned neighbor reports no contact for 3 days',
    requestedBy: 'Community Member',
    assignedTo: 'Mark Wilson (Staff)',
    status: 'completed',
    priority: 'urgent',
    requestTime: '2024-01-14T08:00:00Z',
    responseTime: '2024-01-14T08:30:00Z',
    completedTime: '2024-01-14T10:00:00Z',
    outcome: 'Client safe, medical attention arranged',
    followUpRequired: true
  }
];

export const RapidResponseList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [responses] = useState<RapidResponse[]>(mockResponses);

  const filteredResponses = responses.filter(response =>
    response.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    response.requestType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'destructive';
      case 'in-progress': return 'default';
      case 'completed': return 'secondary';
      case 'cancelled': return 'outline';
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

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const calculateResponseTime = (requestTime: string, responseTime?: string) => {
    if (!responseTime) return 'N/A';
    const request = new Date(requestTime);
    const response = new Date(responseTime);
    const diffMinutes = Math.floor((response.getTime() - request.getTime()) / (1000 * 60));
    return `${diffMinutes} mins`;
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl lg:text-2xl font-bold text-foreground">Rapid Response</h2>
          <p className="text-sm text-muted-foreground">Emergency and urgent support requests</p>
        </div>
        <Button 
          className="bg-eden-primary hover:bg-eden-primary/90 w-full sm:w-auto"
          onClick={() => toast.success("Log Response form would open here")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Log Response
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-eden-primary" />
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-muted-foreground">This Week</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <div>
                <p className="text-2xl font-bold">2</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-warning" />
              <div>
                <p className="text-2xl font-bold">15</p>
                <p className="text-sm text-muted-foreground">Avg Response (mins)</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-eden-secondary" />
              <div>
                <p className="text-2xl font-bold">95%</p>
                <p className="text-sm text-muted-foreground">Completion Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Response Log</CardTitle>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search responses..."
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
              {filteredResponses.map((response) => (
                <Card key={response.id} className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-mono text-sm font-medium text-eden-primary mb-1">
                          {response.id}
                        </div>
                        <p className="font-medium text-foreground">{response.clientName}</p>
                        <p className="text-sm font-medium text-eden-primary">{response.requestType}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => toast.success(`Viewing details for ${response.id}`)}>View Details</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info(`Updating status for ${response.id}`)}>Update Status</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info(`Adding notes to ${response.id}`)}>Add Notes</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => toast.success(`Creating follow-up for ${response.id}`)}>Create Follow-up</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    <p className="text-xs text-muted-foreground">{response.description}</p>
                    <p className="text-xs text-muted-foreground">
                      Requested by: {response.requestedBy}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Badge variant={getStatusColor(response.status)} className="capitalize text-xs">
                          {response.status.replace('-', ' ')}
                        </Badge>
                      </div>
                      <div>
                        <Badge className={`text-xs ${getPriorityColor(response.priority)}`}>
                          {response.priority}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-1 text-sm">
                      <p className="text-muted-foreground text-xs">Assigned: {response.assignedTo}</p>
                      <p className="text-muted-foreground text-xs">
                        Request: {formatTime(response.requestTime)}
                      </p>
                      <p className="text-xs font-medium">
                        Response: {calculateResponseTime(response.requestTime, response.responseTime)}
                      </p>
                      {response.completedTime && (
                        <p className="text-xs text-muted-foreground">
                          Completed: {formatTime(response.completedTime)}
                        </p>
                      )}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Follow-up:</span>
                        {response.followUpRequired ? (
                          <Badge variant="destructive" className="text-xs">Required</Badge>
                        ) : (
                          <Badge variant="secondary" className="text-xs">None</Badge>
                        )}
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
                  <TableHead>Response ID</TableHead>
                  <TableHead>Client & Request</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Response Time</TableHead>
                  <TableHead>Follow-up</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredResponses.map((response) => (
                  <TableRow key={response.id}>
                    <TableCell>
                      <div className="font-mono text-sm font-medium">
                        {response.id}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium text-foreground">{response.clientName}</p>
                        <p className="text-sm font-medium text-eden-primary">{response.requestType}</p>
                        <p className="text-xs text-muted-foreground">{response.description}</p>
                        <p className="text-xs text-muted-foreground">
                          Requested by: {response.requestedBy}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm font-medium">{response.assignedTo}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatTime(response.requestTime)}
                      </p>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(response.status)} className="capitalize">
                        {response.status.replace('-', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`text-xs ${getPriorityColor(response.priority)}`}>
                        {response.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm font-medium">
                        {calculateResponseTime(response.requestTime, response.responseTime)}
                      </p>
                      {response.completedTime && (
                        <p className="text-xs text-muted-foreground">
                          Completed: {formatTime(response.completedTime)}
                        </p>
                      )}
                    </TableCell>
                    <TableCell>
                      {response.followUpRequired ? (
                        <Badge variant="destructive" className="text-xs">Required</Badge>
                      ) : (
                        <Badge variant="secondary" className="text-xs">None</Badge>
                      )}
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
                          <DropdownMenuItem onClick={() => toast.success(`Viewing details for ${response.id}`)}>View Details</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info(`Updating status for ${response.id}`)}>Update Status</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info(`Adding notes to ${response.id}`)}>Add Notes</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => toast.success(`Creating follow-up for ${response.id}`)}>Create Follow-up</DropdownMenuItem>
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