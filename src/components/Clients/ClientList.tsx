import { useState } from "react";
import { Search, Plus, Filter, MoreHorizontal, User, Shield, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

interface Client {
  id: string;
  name: string;
  age: number;
  address: string;
  phone: string;
  email?: string;
  status: 'active' | 'pending' | 'inactive';
  supportType: string[];
  safeguardingFlag: boolean;
  lastContact: string;
  assignedStaff: string;
}

const mockClients: Client[] = [
  {
    id: '1',
    name: 'Fatima Hassan',
    age: 78,
    address: '42 Oak Street, Manchester',
    phone: '0161 234 5678',
    email: 'fatima.hassan@email.com',
    status: 'active',
    supportType: ['Befriending', 'End-of-life'],
    safeguardingFlag: false,
    lastContact: '2024-01-15',
    assignedStaff: 'Aisha Rahman'
  },
  {
    id: '2',
    name: 'Ibrahim Ali',
    age: 82,
    address: '15 Church Lane, Oldham',
    phone: '0161 876 5432',
    email: 'ibrahim.ali@email.com',
    status: 'active',
    supportType: ['Advocacy', 'Befriending'],
    safeguardingFlag: true,
    lastContact: '2024-01-14',
    assignedStaff: 'Yusuf Ahmed'
  },
  {
    id: '3',
    name: 'Khadijah Ahmed',
    age: 71,
    address: '8 Victoria Road, Stockport',
    phone: '0161 555 9876',
    email: 'khadijah.ahmed@email.com',
    status: 'pending',
    supportType: ['Rapid Response'],
    safeguardingFlag: false,
    lastContact: '2024-01-13',
    assignedStaff: 'Aisha Rahman'
  }
];

interface ClientListProps {
  onNavigateToProfile?: (type: string, id: string) => void;
}

export const ClientList = ({ onNavigateToProfile }: ClientListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [clients] = useState<Client[]>(mockClients);

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl lg:text-2xl font-bold text-foreground">Service Users</h2>
          <p className="text-sm lg:text-base text-muted-foreground">Manage clients and their support needs</p>
        </div>
        <Button className="bg-eden-primary hover:bg-eden-primary/90 w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Add Client
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Client Directory</CardTitle>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-full sm:max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[250px]">Client</TableHead>
                  <TableHead className="min-w-[150px] hidden sm:table-cell">Contact</TableHead>
                  <TableHead className="min-w-[120px] hidden md:table-cell">Support Type</TableHead>
                  <TableHead className="min-w-[100px]">Status</TableHead>
                  <TableHead className="min-w-[120px] hidden lg:table-cell">Assigned Staff</TableHead>
                  <TableHead className="min-w-[120px] hidden md:table-cell">Last Contact</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow 
                    key={client.id} 
                    className="cursor-pointer hover:bg-eden-surface/20"
                    onClick={() => onNavigateToProfile?.('client', client.id)}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 lg:w-10 lg:h-10 bg-eden-surface rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="h-4 w-4 lg:h-5 lg:w-5 text-eden-primary" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium text-foreground text-sm lg:text-base truncate">{client.name}</p>
                            {client.safeguardingFlag && (
                              <Shield className="h-3 w-3 lg:h-4 lg:w-4 text-warning flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-xs lg:text-sm text-muted-foreground">Age {client.age}</p>
                          <p className="text-xs text-muted-foreground truncate">{client.address}</p>
                          <div className="sm:hidden mt-2">
                            <div className="flex items-center gap-1 mb-1">
                              <Phone className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs">{client.phone}</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {client.supportType.map((type) => (
                                <Badge key={type} variant="secondary" className="text-xs">
                                  {type}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm truncate">{client.phone}</span>
                        </div>
                        {client.email && (
                          <p className="text-xs text-muted-foreground truncate">{client.email}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {client.supportType.map((type) => (
                          <Badge key={type} variant="secondary" className="text-xs">
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          client.status === 'active' ? 'default' :
                          client.status === 'pending' ? 'destructive' : 'secondary'
                        }
                        className="text-xs"
                      >
                        {client.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <p className="text-sm font-medium truncate">{client.assignedStaff}</p>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <p className="text-sm">{new Date(client.lastContact).toLocaleDateString()}</p>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Client</DropdownMenuItem>
                          <DropdownMenuItem>Add Case Note</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Create Case</DropdownMenuItem>
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