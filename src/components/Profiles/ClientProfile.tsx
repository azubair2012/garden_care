import { ArrowLeft, Phone, Mail, MapPin, Calendar, Users, FileText, Shield, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ClientProfileProps {
  clientId: string;
  onBack: () => void;
}

export const ClientProfile = ({ clientId, onBack }: ClientProfileProps) => {
  // Mock client data with Muslim names
  const clientData = {
    '1': {
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
      assignedStaff: 'Aisha Rahman',
      joinDate: '2023-06-15',
      emergencyContact: 'Omar Hassan (Son) - 07123 456789',
      notes: 'Prefers morning visits. Has mobility issues but maintains good spirits. Enjoys discussing gardening and cooking.',
      recentCases: [
        { id: 'C001', title: 'Weekly befriending visits', status: 'active', created: '2024-01-10' },
        { id: 'C002', title: 'End-of-life support coordination', status: 'pending', created: '2024-01-08' }
      ],
      healthConditions: ['Arthritis', 'Type 2 Diabetes', 'Limited mobility'],
      preferences: ['Morning visits', 'Female volunteers preferred', 'Halal dietary requirements']
    },
    '2': {
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
      assignedStaff: 'Yusuf Ahmed',
      joinDate: '2023-03-20',
      emergencyContact: 'Zara Ali (Daughter) - 07234 567890',
      notes: 'Requires advocacy support for housing issues. Safeguarding flag due to financial concerns from family member.',
      recentCases: [
        { id: 'C003', title: 'Housing advocacy case', status: 'active', created: '2024-01-05' },
        { id: 'C004', title: 'Financial safeguarding review', status: 'urgent', created: '2024-01-12' }
      ],
      healthConditions: ['Dementia (early stage)', 'High blood pressure'],
      preferences: ['Male volunteers preferred', 'Arabic language support available', 'Prayer time considerations']
    },
    '3': {
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
      assignedStaff: 'Aisha Rahman',
      joinDate: '2024-01-10',
      emergencyContact: 'Hassan Ahmed (Son) - 07345 678901',
      notes: 'New client requiring rapid response support following hospital discharge. Assessment pending.',
      recentCases: [
        { id: 'C005', title: 'Post-discharge support', status: 'pending', created: '2024-01-13' }
      ],
      healthConditions: ['Recent hip surgery', 'Hypertension'],
      preferences: ['Female volunteers only', 'Afternoon availability', 'Urdu language support']
    }
  };

  const client = clientData[clientId as keyof typeof clientData];

  if (!client) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <p>Client not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h2 className="text-xl lg:text-2xl font-bold text-foreground">Client Profile</h2>
          <p className="text-sm lg:text-base text-muted-foreground">Comprehensive client information and case history</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Main Profile Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-eden-surface rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-eden-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold">{client.name}</h3>
                    {client.safeguardingFlag && (
                      <Shield className="h-5 w-5 text-warning" />
                    )}
                  </div>
                  <Badge variant={client.status === 'active' ? 'default' : client.status === 'pending' ? 'destructive' : 'secondary'}>
                    {client.status}
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Contact Information */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Contact Information
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{client.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{client.email}</span>
                </div>
                <div className="flex items-start gap-2 sm:col-span-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <span className="text-sm">{client.address}</span>
                </div>
                <div className="flex items-center gap-2 sm:col-span-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Emergency: {client.emergencyContact}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Support Types */}
            <div>
              <h4 className="font-semibold mb-3">Support Types</h4>
              <div className="flex flex-wrap gap-2">
                {client.supportType.map((type) => (
                  <Badge key={type} variant="secondary">
                    {type}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            {/* Health Conditions */}
            <div>
              <h4 className="font-semibold mb-3">Health Conditions</h4>
              <div className="flex flex-wrap gap-2">
                {client.healthConditions.map((condition) => (
                  <Badge key={condition} variant="outline">
                    {condition}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            {/* Preferences */}
            <div>
              <h4 className="font-semibold mb-3">Preferences & Requirements</h4>
              <div className="flex flex-wrap gap-2">
                {client.preferences.map((pref) => (
                  <Badge key={pref} variant="secondary" className="bg-eden-surface/50">
                    {pref}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            {/* Notes */}
            <div>
              <h4 className="font-semibold mb-3">Notes</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{client.notes}</p>
            </div>
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Age</p>
                  <p className="text-sm font-medium">{client.age} years</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Assigned Staff</p>
                  <p className="text-sm font-medium">{client.assignedStaff}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Join Date</p>
                  <p className="text-sm font-medium">{new Date(client.joinDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Last Contact</p>
                  <p className="text-sm font-medium">{new Date(client.lastContact).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Cases */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Recent Cases
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {client.recentCases.map((case_) => (
                <div key={case_.id} className="p-3 bg-eden-surface/30 rounded-lg">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h5 className="text-sm font-medium line-clamp-2">{case_.title}</h5>
                    <Badge variant={case_.status === 'active' ? 'default' : case_.status === 'urgent' ? 'destructive' : 'secondary'} className="text-xs shrink-0">
                      {case_.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Created: {new Date(case_.created).toLocaleDateString()}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};