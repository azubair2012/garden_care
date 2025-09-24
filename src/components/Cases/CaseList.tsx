import { useState } from "react";
import { Search, Plus, Filter, MoreHorizontal, FileText, User, Clock, AlertCircle } from "lucide-react";
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

interface Case {
  id: string;
  title: string;
  clientName: string;
  assignedStaff: string;
  assignedVolunteer?: string;
  status: 'open' | 'in-progress' | 'closed' | 'urgent';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  caseType: string[];
  openedDate: string;
  lastUpdate: string;
  nextAction: string;
  notesCount: number;
}

const mockCases: Case[] = [
  {
    id: 'C001',
    title: 'End-of-life support and advocacy',
    clientName: 'Margaret Thompson',
    assignedStaff: 'Sarah Johnson',
    assignedVolunteer: 'John Smith',
    status: 'in-progress',
    priority: 'high',
    caseType: ['End-of-life', 'Advocacy'],
    openedDate: '2024-01-10',
    lastUpdate: '2024-01-15',
    nextAction: 'Follow-up call scheduled for tomorrow',
    notesCount: 8
  },
  {
    id: 'C002',
    title: 'Housing advocacy and benefits support',
    clientName: 'Robert Davies',
    assignedStaff: 'Mark Wilson',
    status: 'urgent',
    priority: 'urgent',
    caseType: ['Advocacy', 'Housing'],
    openedDate: '2024-01-08',
    lastUpdate: '2024-01-14',
    nextAction: 'Council meeting scheduled',
    notesCount: 12
  },
  {
    id: 'C003',
    title: 'Befriending and isolation support',
    clientName: 'Elizabeth Morris',
    assignedStaff: 'Sarah Johnson',
    assignedVolunteer: 'Emily Johnson',
    status: 'open',
    priority: 'medium',
    caseType: ['Befriending'],
    openedDate: '2024-01-12',
    lastUpdate: '2024-01-13',
    nextAction: 'Initial home visit planned',
    notesCount: 3
  },
  {
    id: 'C004',
    title: 'Rapid response - funeral arrangements',
    clientName: 'James Wilson',
    assignedStaff: 'Mark Wilson',
    status: 'closed',
    priority: 'high',
    caseType: ['End-of-life', 'Rapid Response'],
    openedDate: '2024-01-05',
    lastUpdate: '2024-01-11',
    nextAction: 'Case closed - follow-up complete',
    notesCount: 15
  },
  {
    id: 'C005',
    title: 'Mental health support and advocacy',
    clientName: 'Mary Foster',
    assignedStaff: 'Sarah Johnson',
    status: 'in-progress',
    priority: 'high',
    caseType: ['Advocacy', 'Mental Health'],
    openedDate: '2024-01-09',
    lastUpdate: '2024-01-14',
    nextAction: 'GP liaison appointment',
    notesCount: 6
  }
];

export const CaseList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cases] = useState<Case[]>(mockCases);

  const filteredCases = cases.filter(case_ =>
    case_.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    case_.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-destructive text-destructive-foreground';
      case 'high': return 'bg-warning text-warning-foreground';
      case 'medium': return 'bg-eden-accent text-white';
      case 'low': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'urgent': return 'destructive';
      case 'in-progress': return 'default';
      case 'open': return 'secondary';
      case 'closed': return 'outline';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl lg:text-2xl font-bold text-foreground">Cases</h2>
          <p className="text-sm text-muted-foreground">Manage client cases and interventions</p>
        </div>
        <Button 
          className="bg-eden-primary hover:bg-eden-primary/90 w-full sm:w-auto"
          onClick={() => toast.success("New Case form would open here")}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Case
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-eden-primary" />
              <div>
                <p className="text-2xl font-bold">34</p>
                <p className="text-sm text-muted-foreground">Open Cases</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              <div>
                <p className="text-2xl font-bold">2</p>
                <p className="text-sm text-muted-foreground">Urgent Cases</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-warning" />
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-muted-foreground">Due This Week</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-eden-secondary" />
              <div>
                <p className="text-2xl font-bold">15</p>
                <p className="text-sm text-muted-foreground">Assigned Volunteers</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Active Cases</CardTitle>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search cases..."
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
              {filteredCases.map((case_) => (
                <Card key={case_.id} className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-mono text-sm font-medium text-eden-primary mb-1">
                          {case_.id}
                        </div>
                        <p className="font-medium text-foreground text-sm">{case_.title}</p>
                        <p className="text-sm text-muted-foreground">Client: {case_.clientName}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => toast.success(`Viewing case ${case_.id}`)}>View Case</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info(`Adding note to case ${case_.id}`)}>Add Note</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info(`Assigning volunteer to case ${case_.id}`)}>Assign Volunteer</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => toast.success(`Closing case ${case_.id}`)}>Close Case</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {case_.caseType.map((type) => (
                        <Badge key={type} variant="outline" className="text-xs">
                          {type}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Badge variant={getStatusColor(case_.status)} className="capitalize text-xs">
                          {case_.status.replace('-', ' ')}
                        </Badge>
                      </div>
                      <div>
                        <Badge className={`text-xs ${getPriorityColor(case_.priority)}`}>
                          {case_.priority}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div>
                        <p className="text-muted-foreground text-xs">Staff: {case_.assignedStaff}</p>
                        {case_.assignedVolunteer && (
                          <p className="text-muted-foreground text-xs">Vol: {case_.assignedVolunteer}</p>
                        )}
                        <p className="text-muted-foreground text-xs">{case_.notesCount} notes</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Last update: {new Date(case_.lastUpdate).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-eden-primary">{case_.nextAction}</p>
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
                  <TableHead>Case ID</TableHead>
                  <TableHead>Case Details</TableHead>
                  <TableHead>Assignment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Last Update</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCases.map((case_) => (
                  <TableRow key={case_.id}>
                    <TableCell>
                      <div className="font-mono text-sm font-medium">
                        {case_.id}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium text-foreground">{case_.title}</p>
                        <p className="text-sm text-muted-foreground">Client: {case_.clientName}</p>
                        <div className="flex flex-wrap gap-1">
                          {case_.caseType.map((type) => (
                            <Badge key={type} variant="outline" className="text-xs">
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Staff: {case_.assignedStaff}</p>
                        {case_.assignedVolunteer && (
                          <p className="text-sm text-muted-foreground">Vol: {case_.assignedVolunteer}</p>
                        )}
                        <p className="text-xs text-muted-foreground">{case_.notesCount} notes</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(case_.status)} className="capitalize">
                        {case_.status.replace('-', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`text-xs ${getPriorityColor(case_.priority)}`}>
                        {case_.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="text-sm">{new Date(case_.lastUpdate).toLocaleDateString()}</p>
                        <p className="text-xs text-muted-foreground">{case_.nextAction}</p>
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
                          <DropdownMenuItem onClick={() => toast.success(`Viewing case ${case_.id}`)}>View Case</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info(`Adding note to case ${case_.id}`)}>Add Note</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info(`Assigning volunteer to case ${case_.id}`)}>Assign Volunteer</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => toast.success(`Closing case ${case_.id}`)}>Close Case</DropdownMenuItem>
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