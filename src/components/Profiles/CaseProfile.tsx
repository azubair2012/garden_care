import { ArrowLeft, FileText, User, Calendar, Clock, AlertTriangle, CheckCircle, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

interface CaseProfileProps {
  caseId: string;
  onBack: () => void;
}

export const CaseProfile = ({ caseId, onBack }: CaseProfileProps) => {
  // Mock case data with Muslim names
  const caseData = {
    'C001': {
      id: 'C001',
      title: 'Weekly befriending visits',
      client: 'Fatima Hassan',
      clientId: '1',
      volunteer: 'Amina Malik',
      volunteerId: '1',
      status: 'active',
      priority: 'medium',
      created: '2024-01-10',
      lastUpdate: '2024-01-15',
      description: 'Weekly befriending visits to provide companionship and emotional support. Client enjoys discussing gardening, cooking, and sharing stories about her family.',
      objectives: [
        'Provide regular companionship and social interaction',
        'Monitor general wellbeing and mood',
        'Encourage independence where possible',
        'Report any concerns to case coordinator'
      ],
      progress: [
        { date: '2024-01-15', note: 'Excellent visit. Fatima was in good spirits and showed me her garden plans for spring. Discussed her diabetes management - seems well controlled.', author: 'Amina Malik' },
        { date: '2024-01-10', note: 'First befriending visit completed. Good rapport established. Fatima expressed gratitude for the service and is looking forward to regular visits.', author: 'Amina Malik' },
        { date: '2024-01-08', note: 'Case initiated following assessment. Client matched with suitable volunteer based on cultural background and interests.', author: 'Aisha Rahman' }
      ],
      nextActions: [
        { action: 'Schedule next befriending visit', due: '2024-01-22', assignee: 'Amina Malik' },
        { action: 'Monthly case review', due: '2024-02-10', assignee: 'Aisha Rahman' }
      ]
    },
    'C002': {
      id: 'C002',
      title: 'End-of-life support coordination',
      client: 'Fatima Hassan',
      clientId: '1',
      volunteer: 'Zara Ibrahim',
      volunteerId: '3',
      status: 'pending',
      priority: 'high',
      created: '2024-01-08',
      lastUpdate: '2024-01-12',
      description: 'Coordination of end-of-life support services including liaison with healthcare providers, family support, and practical assistance.',
      objectives: [
        'Coordinate with healthcare team',
        'Provide emotional support to client and family',
        'Assist with practical arrangements as needed',
        'Ensure dignity and comfort throughout process'
      ],
      progress: [
        { date: '2024-01-12', note: 'Met with family to discuss care preferences. Healthcare plan reviewed with GP. Client wishes to remain at home with family support.', author: 'Zara Ibrahim' },
        { date: '2024-01-08', note: 'Initial assessment completed. Client referred by GP for end-of-life support coordination. Family meeting scheduled.', author: 'Aisha Rahman' }
      ],
      nextActions: [
        { action: 'Follow-up family meeting', due: '2024-01-18', assignee: 'Zara Ibrahim' },
        { action: 'Coordinate with palliative care team', due: '2024-01-20', assignee: 'Aisha Rahman' }
      ]
    },
    'C003': {
      id: 'C003',
      title: 'Housing advocacy case',
      client: 'Ibrahim Ali',
      clientId: '2',
      volunteer: 'Hassan Omar',
      volunteerId: '2',
      status: 'active',
      priority: 'high',
      created: '2024-01-05',
      lastUpdate: '2024-01-14',
      description: 'Advocacy support for housing issues including liaison with local authority, completion of housing applications, and representation at meetings.',
      objectives: [
        'Secure appropriate housing for client',
        'Advocate for client rights and needs',
        'Complete necessary paperwork and applications',
        'Provide ongoing support throughout process'
      ],
      progress: [
        { date: '2024-01-14', note: 'Housing application submitted to council. Supporting documents gathered including medical evidence. Next review meeting scheduled.', author: 'Hassan Omar' },
        { date: '2024-01-08', note: 'Met with client to discuss housing needs. Current accommodation unsuitable due to accessibility issues. Advocacy support initiated.', author: 'Yusuf Ahmed' },
        { date: '2024-01-05', note: 'Case opened following client request for housing advocacy support. Initial assessment scheduled.', author: 'Yusuf Ahmed' }
      ],
      nextActions: [
        { action: 'Attend housing review meeting', due: '2024-01-25', assignee: 'Hassan Omar' },
        { action: 'Follow up on medical evidence', due: '2024-01-20', assignee: 'Yusuf Ahmed' }
      ]
    }
  };

  const case_ = caseData[caseId as keyof typeof caseData];

  if (!case_) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <p>Case not found</p>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'pending': return 'destructive';
      case 'completed': return 'secondary';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h2 className="text-xl lg:text-2xl font-bold text-foreground">Case Details</h2>
          <p className="text-sm lg:text-base text-muted-foreground">Comprehensive case information and progress tracking</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Main Case Details */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">{case_.title}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant={getStatusColor(case_.status)}>
                    {case_.status}
                  </Badge>
                  <Badge variant={getPriorityColor(case_.priority)}>
                    {case_.priority} priority
                  </Badge>
                </div>
              </div>
              <FileText className="h-8 w-8 text-eden-primary" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Case Description */}
            <div>
              <h4 className="font-semibold mb-3">Description</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{case_.description}</p>
            </div>

            <Separator />

            {/* Objectives */}
            <div>
              <h4 className="font-semibold mb-3">Objectives</h4>
              <ul className="space-y-2">
                {case_.objectives.map((objective, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-eden-primary mt-0.5 flex-shrink-0" />
                    <span>{objective}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            {/* Progress Notes */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Progress Notes
              </h4>
              <div className="space-y-4">
                {case_.progress.map((note, index) => (
                  <div key={index} className="p-4 bg-eden-surface/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-muted-foreground">
                        {new Date(note.date).toLocaleDateString()}
                      </span>
                      <span className="text-xs font-medium text-eden-primary">
                        {note.author}
                      </span>
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">{note.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Add New Note */}
            <div>
              <h4 className="font-semibold mb-3">Add Progress Note</h4>
              <Textarea 
                placeholder="Enter progress note..."
                className="mb-3"
              />
              <Button size="sm" className="bg-eden-primary hover:bg-eden-primary/90">
                Add Note
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Case Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Case Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Client</p>
                  <p className="text-sm font-medium">{case_.client}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Assigned Volunteer</p>
                  <p className="text-sm font-medium">{case_.volunteer}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Created</p>
                  <p className="text-sm font-medium">{new Date(case_.created).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Last Updated</p>
                  <p className="text-sm font-medium">{new Date(case_.lastUpdate).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Next Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {case_.nextActions.map((action, index) => (
                <div key={index} className="p-3 bg-eden-surface/30 rounded-lg">
                  <h5 className="text-sm font-medium line-clamp-2 mb-2">{action.action}</h5>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Due: {new Date(action.due).toLocaleDateString()}</span>
                  </div>
                  <p className="text-xs text-eden-primary font-medium mt-1">{action.assignee}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <User className="h-4 w-4 mr-2" />
                View Client Profile
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <User className="h-4 w-4 mr-2" />
                View Volunteer Profile
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Meeting
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};