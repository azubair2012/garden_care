import { useState } from "react";
import { Search, Plus, Filter, MoreHorizontal, Heart, CheckCircle, Clock, MapPin } from "lucide-react";
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

interface Volunteer {
  id: string;
  name: string;
  email: string;
  phone: string;
  skills: string[];
  dbsStatus: 'current' | 'pending' | 'expired';
  dbsExpiry: string;
  trainingComplete: boolean;
  availability: string[];
  assignedCases: number;
  hoursThisMonth: number;
  location: string;
  joinedDate: string;
}

const mockVolunteers: Volunteer[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '0161 234 5678',
    skills: ['Befriending', 'Counselling', 'Transport'],
    dbsStatus: 'current',
    dbsExpiry: '2025-06-15',
    trainingComplete: true,
    availability: ['Monday', 'Wednesday', 'Friday'],
    assignedCases: 3,
    hoursThisMonth: 24,
    location: 'Manchester City Centre',
    joinedDate: '2023-03-15'
  },
  {
    id: '2',
    name: 'Emily Johnson',
    email: 'emily.j@email.com',
    phone: '0161 876 5432',
    skills: ['End-of-life support', 'Administrative', 'Phone support'],
    dbsStatus: 'current',
    dbsExpiry: '2024-12-20',
    trainingComplete: true,
    availability: ['Tuesday', 'Thursday', 'Saturday'],
    assignedCases: 2,
    hoursThisMonth: 18,
    location: 'Oldham',
    joinedDate: '2022-11-08'
  },
  {
    id: '3',
    name: 'David Wilson',
    email: 'david.wilson@email.com',
    phone: '0161 555 9876',
    skills: ['Advocacy', 'Benefits advice', 'Housing support'],
    dbsStatus: 'pending',
    dbsExpiry: '2024-08-10',
    trainingComplete: false,
    availability: ['Monday', 'Tuesday', 'Thursday'],
    assignedCases: 0,
    hoursThisMonth: 0,
    location: 'Stockport',
    joinedDate: '2024-01-10'
  },
  {
    id: '4',
    name: 'Sarah Matthews',
    email: 'sarah.m@email.com',
    phone: '0161 999 1234',
    skills: ['Befriending', 'Gardening', 'Shopping assistance'],
    dbsStatus: 'expired',
    dbsExpiry: '2023-12-01',
    trainingComplete: true,
    availability: ['Wednesday', 'Friday', 'Sunday'],
    assignedCases: 1,
    hoursThisMonth: 8,
    location: 'Manchester South',
    joinedDate: '2021-05-20'
  }
];

interface VolunteerListProps {
  onNavigateToProfile?: (type: string, id: string) => void;
}

export const VolunteerList = ({ onNavigateToProfile }: VolunteerListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [volunteers] = useState<Volunteer[]>(mockVolunteers);

  const filteredVolunteers = volunteers.filter(volunteer =>
    volunteer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    volunteer.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl lg:text-2xl font-bold text-foreground">Volunteers</h2>
          <p className="text-sm text-muted-foreground">Manage volunteer assignments and training</p>
        </div>
        <Button 
          className="bg-eden-primary hover:bg-eden-primary/90 w-full sm:w-auto"
          onClick={() => toast.success("Add Volunteer form would open here")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Volunteer
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-eden-secondary" />
              <div>
                <p className="text-2xl font-bold">86</p>
                <p className="text-sm text-muted-foreground">Active Volunteers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-eden-secondary" />
              <div>
                <p className="text-2xl font-bold">78</p>
                <p className="text-sm text-muted-foreground">DBS Current</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-warning" />
              <div>
                <p className="text-2xl font-bold">5</p>
                <p className="text-sm text-muted-foreground">Pending Training</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-eden-accent" />
              <div>
                <p className="text-2xl font-bold">342</p>
                <p className="text-sm text-muted-foreground">Hours This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Volunteer Directory</CardTitle>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search volunteers..."
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
              {filteredVolunteers.map((volunteer) => (
                <Card key={volunteer.id} className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-eden-surface rounded-full flex items-center justify-center">
                          <Heart className="h-5 w-5 text-eden-secondary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{volunteer.name}</p>
                          <p className="text-sm text-muted-foreground">{volunteer.email}</p>
                          <p className="text-xs text-muted-foreground">{volunteer.location}</p>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => toast.success(`Viewing ${volunteer.name}'s profile`)}>View Profile</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info(`Assigning case to ${volunteer.name}`)}>Assign Case</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info(`Updating training for ${volunteer.name}`)}>Update Training</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => toast.success(`Contacting ${volunteer.name}`)}>Contact Volunteer</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground text-xs">Skills</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {volunteer.skills.slice(0, 2).map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {volunteer.skills.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{volunteer.skills.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">Cases & Hours</p>
                        <p className="font-medium">{volunteer.assignedCases} cases</p>
                        <p className="text-sm text-muted-foreground">{volunteer.hoursThisMonth}h this month</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-muted-foreground text-xs">DBS Status</p>
                        <Badge 
                          variant={
                            volunteer.dbsStatus === 'current' ? 'default' :
                            volunteer.dbsStatus === 'pending' ? 'destructive' : 'secondary'
                          }
                          className="text-xs mt-1"
                        >
                          {volunteer.dbsStatus}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          Expires: {new Date(volunteer.dbsExpiry).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">Training</p>
                        <Badge 
                          variant={volunteer.trainingComplete ? 'default' : 'destructive'}
                          className="text-xs mt-1"
                        >
                          {volunteer.trainingComplete ? 'Complete' : 'Pending'}
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
                  <TableHead>Volunteer</TableHead>
                  <TableHead>Skills</TableHead>
                  <TableHead>DBS Status</TableHead>
                  <TableHead>Training</TableHead>
                  <TableHead>Cases</TableHead>
                  <TableHead>Hours/Month</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVolunteers.map((volunteer) => (
                  <TableRow key={volunteer.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-eden-surface rounded-full flex items-center justify-center">
                          <Heart className="h-5 w-5 text-eden-secondary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{volunteer.name}</p>
                          <p className="text-sm text-muted-foreground">{volunteer.email}</p>
                          <p className="text-xs text-muted-foreground">{volunteer.location}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {volunteer.skills.slice(0, 2).map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {volunteer.skills.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{volunteer.skills.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Badge 
                          variant={
                            volunteer.dbsStatus === 'current' ? 'default' :
                            volunteer.dbsStatus === 'pending' ? 'destructive' : 'secondary'
                          }
                          className="text-xs"
                        >
                          {volunteer.dbsStatus}
                        </Badge>
                        <p className="text-xs text-muted-foreground">
                          Expires: {new Date(volunteer.dbsExpiry).toLocaleDateString()}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={volunteer.trainingComplete ? 'default' : 'destructive'}
                        className="text-xs"
                      >
                        {volunteer.trainingComplete ? 'Complete' : 'Pending'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">{volunteer.assignedCases}</p>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">{volunteer.hoursThisMonth}h</p>
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
                          <DropdownMenuItem onClick={() => toast.success(`Viewing ${volunteer.name}'s profile`)}>View Profile</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info(`Assigning case to ${volunteer.name}`)}>Assign Case</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info(`Updating training for ${volunteer.name}`)}>Update Training</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => toast.success(`Contacting ${volunteer.name}`)}>Contact Volunteer</DropdownMenuItem>
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