import { ArrowLeft, Phone, Mail, MapPin, Calendar, Award, Clock, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

interface VolunteerProfileProps {
  volunteerId: string;
  onBack: () => void;
}

export const VolunteerProfile = ({ volunteerId, onBack }: VolunteerProfileProps) => {
  // Mock volunteer data with Muslim names
  const volunteerData = {
    '1': {
      id: '1',
      name: 'Amina Malik',
      age: 34,
      address: '123 Green Lane, Manchester',
      phone: '0161 789 1234',
      email: 'amina.malik@email.com',
      status: 'active',
      skills: ['Befriending', 'Advocacy', 'Translation (Urdu)'],
      availability: ['Monday AM', 'Wednesday PM', 'Friday AM'],
      dbsStatus: 'current',
      dbsExpiry: '2024-08-15',
      joinDate: '2022-03-10',
      totalHours: 156,
      currentCases: 3,
      rating: 4.8,
      languages: ['English', 'Urdu', 'Punjabi'],
      qualifications: ['Level 2 Health & Social Care', 'Safeguarding Certificate'],
      interests: ['Cooking', 'Reading', 'Community work'],
      notes: 'Excellent with elderly clients. Particularly skilled in cross-cultural communication. Has experience working with dementia patients.',
      recentActivities: [
        { id: 1, activity: 'Completed befriending visit with Fatima Hassan', date: '2024-01-15', duration: '2 hours' },
        { id: 2, activity: 'Attended safeguarding training session', date: '2024-01-12', duration: '3 hours' },
        { id: 3, activity: 'Provided translation support for Ibrahim Ali', date: '2024-01-10', duration: '1.5 hours' }
      ],
      achievements: [
        { title: 'Volunteer of the Month', date: '2023-11-01', description: 'Outstanding dedication to client care' },
        { title: '100 Hours Milestone', date: '2023-09-15', description: 'Completed 100 hours of volunteer service' }
      ]
    },
    '2': {
      id: '2',
      name: 'Hassan Omar',
      age: 29,
      address: '67 Mill Street, Oldham',
      phone: '0161 456 7890',
      email: 'hassan.omar@email.com',
      status: 'active',
      skills: ['Rapid Response', 'Practical Support', 'IT Help'],
      availability: ['Tuesday PM', 'Thursday AM', 'Saturday All Day'],
      dbsStatus: 'current',
      dbsExpiry: '2024-11-20',
      joinDate: '2023-01-15',
      totalHours: 89,
      currentCases: 2,
      rating: 4.6,
      languages: ['English', 'Arabic', 'French'],
      qualifications: ['First Aid Certificate', 'IT Support Diploma'],
      interests: ['Technology', 'Sports', 'Volunteering'],
      notes: 'Tech-savvy volunteer excellent for rapid response situations. Good at helping elderly clients with digital issues.',
      recentActivities: [
        { id: 1, activity: 'Rapid response call for emergency shopping', date: '2024-01-14', duration: '3 hours' },
        { id: 2, activity: 'Helped set up tablet for Khadijah Ahmed', date: '2024-01-11', duration: '2 hours' },
        { id: 3, activity: 'Monthly volunteer team meeting', date: '2024-01-08', duration: '1 hour' }
      ],
      achievements: [
        { title: 'Rapid Response Hero', date: '2023-12-01', description: 'Outstanding response to emergency situations' },
        { title: 'New Volunteer Mentor', date: '2023-10-01', description: 'Successfully mentored 3 new volunteers' }
      ]
    },
    '3': {
      id: '3',
      name: 'Zara Ibrahim',
      age: 42,
      address: '34 Rose Avenue, Stockport',
      phone: '0161 234 9876',
      email: 'zara.ibrahim@email.com',
      status: 'active',
      skills: ['End-of-life Support', 'Counselling', 'Bereavement Support'],
      availability: ['Monday PM', 'Wednesday AM', 'Friday PM'],
      dbsStatus: 'current',
      dbsExpiry: '2024-06-30',
      joinDate: '2021-09-05',
      totalHours: 234,
      currentCases: 4,
      rating: 4.9,
      languages: ['English', 'Arabic', 'Bengali'],
      qualifications: ['Counselling Certificate', 'Bereavement Support Training', 'Mental Health First Aid'],
      interests: ['Meditation', 'Gardening', 'Reading'],
      notes: 'Highly experienced volunteer specializing in end-of-life and bereavement support. Exceptional empathy and communication skills.',
      recentActivities: [
        { id: 1, activity: 'End-of-life support session', date: '2024-01-15', duration: '4 hours' },
        { id: 2, activity: 'Bereavement counselling for family member', date: '2024-01-13', duration: '2 hours' },
        { id: 3, activity: 'Advanced training workshop attendance', date: '2024-01-09', duration: '6 hours' }
      ],
      achievements: [
        { title: 'Excellence in Care Award', date: '2023-12-15', description: 'Recognized for exceptional end-of-life support' },
        { title: 'Senior Volunteer Status', date: '2023-08-01', description: 'Promoted to senior volunteer role' },
        { title: '200 Hours Milestone', date: '2023-05-10', description: 'Completed 200 hours of volunteer service' }
      ]
    }
  };

  const volunteer = volunteerData[volunteerId as keyof typeof volunteerData];

  if (!volunteer) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <p>Volunteer not found</p>
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
          <h2 className="text-xl lg:text-2xl font-bold text-foreground">Volunteer Profile</h2>
          <p className="text-sm lg:text-base text-muted-foreground">Comprehensive volunteer information and activity history</p>
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
                    <h3 className="text-xl font-semibold">{volunteer.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{volunteer.rating}</span>
                    </div>
                  </div>
                  <Badge variant={volunteer.status === 'active' ? 'default' : 'secondary'}>
                    {volunteer.status}
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
                  <span className="text-sm">{volunteer.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{volunteer.email}</span>
                </div>
                <div className="flex items-start gap-2 sm:col-span-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <span className="text-sm">{volunteer.address}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Skills & Languages */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {volunteer.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Languages</h4>
                <div className="flex flex-wrap gap-2">
                  {volunteer.languages.map((lang) => (
                    <Badge key={lang} variant="outline">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <Separator />

            {/* Availability */}
            <div>
              <h4 className="font-semibold mb-3">Availability</h4>
              <div className="flex flex-wrap gap-2">
                {volunteer.availability.map((slot) => (
                  <Badge key={slot} variant="secondary" className="bg-eden-surface/50">
                    {slot}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            {/* Qualifications */}
            <div>
              <h4 className="font-semibold mb-3">Qualifications</h4>
              <div className="flex flex-wrap gap-2">
                {volunteer.qualifications.map((qual) => (
                  <Badge key={qual} variant="outline" className="text-eden-primary border-eden-primary">
                    {qual}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            {/* Notes */}
            <div>
              <h4 className="font-semibold mb-3">Notes</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{volunteer.notes}</p>
            </div>
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Total Hours</span>
                  <span className="font-medium">{volunteer.totalHours}</span>
                </div>
                <Progress value={(volunteer.totalHours / 250) * 100} className="h-2" />
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Current Cases</p>
                  <p className="text-sm font-medium">{volunteer.currentCases}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Join Date</p>
                  <p className="text-sm font-medium">{new Date(volunteer.joinDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">DBS Expiry</p>
                  <p className="text-sm font-medium">{new Date(volunteer.dbsExpiry).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent Activities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {volunteer.recentActivities.map((activity) => (
                <div key={activity.id} className="p-3 bg-eden-surface/30 rounded-lg">
                  <h5 className="text-sm font-medium line-clamp-2 mb-1">{activity.activity}</h5>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{new Date(activity.date).toLocaleDateString()}</span>
                    <span>{activity.duration}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Award className="h-4 w-4" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {volunteer.achievements.map((achievement, index) => (
                <div key={index} className="p-3 bg-gradient-to-r from-eden-primary/10 to-eden-accent/10 rounded-lg">
                  <h5 className="text-sm font-medium text-eden-primary mb-1">{achievement.title}</h5>
                  <p className="text-xs text-muted-foreground mb-1">{achievement.description}</p>
                  <p className="text-xs text-muted-foreground">{new Date(achievement.date).toLocaleDateString()}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};