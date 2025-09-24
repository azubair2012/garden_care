import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { 
  Settings, 
  Users, 
  Shield, 
  Database, 
  Mail, 
  Bell,
  Lock,
  Download,
  Trash,
  Plus,
  Edit
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'staff' | 'volunteer';
  status: 'active' | 'inactive';
  lastLogin: string;
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@edencare.org.uk',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Mark Wilson',
    email: 'mark.wilson@edencare.org.uk',
    role: 'staff',
    status: 'active',
    lastLogin: '2024-01-15T09:15:00Z'
  },
  {
    id: '3',
    name: 'John Smith',
    email: 'john.smith@volunteer.edencare.org.uk',
    role: 'volunteer',
    status: 'active',
    lastLogin: '2024-01-14T16:45:00Z'
  },
  {
    id: '4',
    name: 'Emily Johnson',
    email: 'emily.j@volunteer.edencare.org.uk',
    role: 'volunteer',
    status: 'active',
    lastLogin: '2024-01-13T14:20:00Z'
  }
];

export const SettingsPanel = () => {
  const [activeTab, setActiveTab] = useState("organization");
  const [users] = useState<User[]>(mockUsers);

  const settingsCategories = [
    { id: 'organization', label: 'Organization', icon: Settings },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'security', label: 'Security & Privacy', icon: Shield },
    { id: 'data', label: 'Data Management', icon: Database },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'integrations', label: 'Integrations', icon: Mail }
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'destructive';
      case 'staff': return 'default';
      case 'volunteer': return 'secondary';
      default: return 'secondary';
    }
  };

  const renderOrganizationSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Organization Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="org-name">Organization Name</Label>
              <Input id="org-name" defaultValue="Eden Care UK" />
            </div>
            <div>
              <Label htmlFor="charity-number">Charity Registration Number</Label>
              <Input id="charity-number" defaultValue="1234567" />
            </div>
            <div>
              <Label htmlFor="contact-email">Contact Email</Label>
              <Input id="contact-email" defaultValue="info@edencare.org.uk" />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" defaultValue="0161 234 5678" />
            </div>
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <Textarea 
              id="address"
              defaultValue="123 Community Street, Manchester, M1 1AA"
              rows={3}
            />
          </div>
          <Button 
            className="bg-eden-primary hover:bg-eden-primary/90 w-full sm:w-auto"
            onClick={() => toast.success("Organization settings saved")}
          >
            Save Changes
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>System Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Auto-backup frequency</Label>
              <p className="text-sm text-muted-foreground">How often should the system create backups?</p>
            </div>
            <Select defaultValue="daily">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hourly">Hourly</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Data retention period</Label>
              <p className="text-sm text-muted-foreground">How long to keep inactive records?</p>
            </div>
            <Select defaultValue="7-years">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5-years">5 Years</SelectItem>
                <SelectItem value="7-years">7 Years</SelectItem>
                <SelectItem value="10-years">10 Years</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderUserManagement = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            User Management
            <Button 
              className="bg-eden-primary hover:bg-eden-primary/90 w-full sm:w-auto"
              onClick={() => toast.success("Add User form would open here")}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getRoleColor(user.role)} className="capitalize">
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(user.lastLogin).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => toast.info(`Editing ${user.name}`)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => toast.error(`Would delete ${user.name}`)}
                      >
                        <Trash className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-warning" />
            Security & Privacy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Two-factor authentication</Label>
              <p className="text-sm text-muted-foreground">Require 2FA for all admin users</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Session timeout</Label>
              <p className="text-sm text-muted-foreground">Auto-logout after inactivity</p>
            </div>
            <Select defaultValue="30-minutes">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15-minutes">15 mins</SelectItem>
                <SelectItem value="30-minutes">30 mins</SelectItem>
                <SelectItem value="1-hour">1 hour</SelectItem>
                <SelectItem value="4-hours">4 hours</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Audit logging</Label>
              <p className="text-sm text-muted-foreground">Log all user actions for compliance</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>GDPR compliance mode</Label>
              <p className="text-sm text-muted-foreground">Enhanced data protection controls</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Export & Deletion</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Export all data</Label>
              <p className="text-sm text-muted-foreground">Download complete system backup</p>
            </div>
            <Button 
              variant="outline"
              onClick={() => toast.info("Data export would start here")}
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Request data deletion</Label>
              <p className="text-sm text-muted-foreground">Permanently delete client data (GDPR)</p>
            </div>
            <Button 
              variant="destructive"
              onClick={() => toast.error("Data deletion confirmation would appear")}
            >
              <Trash className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'organization':
        return renderOrganizationSettings();
      case 'users':
        return renderUserManagement();
      case 'security':
        return renderSecuritySettings();
      case 'data':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Data management settings coming soon...</p>
            </CardContent>
          </Card>
        );
      case 'notifications':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Notification preferences coming soon...</p>
            </CardContent>
          </Card>
        );
      case 'integrations':
        return (
          <Card>
            <CardHeader>
              <CardTitle>System Integrations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Integration settings coming soon...</p>
            </CardContent>
          </Card>
        );
      default:
        return renderOrganizationSettings();
    }
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      <div>
        <h2 className="text-xl lg:text-2xl font-bold text-foreground">Settings</h2>
        <p className="text-sm text-muted-foreground">Configure system preferences and manage users</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        {/* Settings Navigation */}
        <Card className="w-full lg:w-64 lg:h-fit">
          <CardContent className="p-4">
            <nav className="grid grid-cols-2 lg:grid-cols-1 gap-2 lg:space-y-2">
              {settingsCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <Button
                    key={category.id}
                    variant={activeTab === category.id ? "secondary" : "ghost"}
                    className="w-full justify-start gap-2 text-xs lg:text-sm"
                    onClick={() => setActiveTab(category.id)}
                  >
                    <Icon className="h-3 w-3 lg:h-4 lg:w-4" />
                    <span className="truncate">{category.label}</span>
                  </Button>
                );
              })}
            </nav>
          </CardContent>
        </Card>

        {/* Settings Content */}
        <div className="flex-1">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};