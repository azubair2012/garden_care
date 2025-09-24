import { 
  Users, 
  Heart, 
  FileText, 
  BarChart3, 
  Shield, 
  Settings,
  Home,
  UserCheck,
  Phone,
  AlertTriangle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'clients', label: 'Service Users', icon: Users },
  { id: 'volunteers', label: 'Volunteers', icon: Heart },
  { id: 'cases', label: 'Cases', icon: FileText },
  { id: 'rapid-response', label: 'Rapid Response', icon: Phone, badge: '2' },
  { id: 'safeguarding', label: 'Safeguarding', icon: Shield, restricted: true },
  { id: 'advocacy', label: 'Advocacy', icon: UserCheck },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const Sidebar = ({ activeSection, onSectionChange, isOpen, onToggle }: SidebarProps) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 h-full w-64 border-r border-border bg-card/95 backdrop-blur-sm z-50 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-4 lg:p-6">
          {/* Mobile close button */}
          <div className="flex justify-end mb-4 lg:hidden">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onToggle}
              className="p-2"
            >
              <AlertTriangle className="h-4 w-4 rotate-45" />
            </Button>
          </div>

          <nav className="space-y-1 lg:space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 h-10 lg:h-11 text-sm lg:text-base",
                    isActive && "bg-eden-surface text-eden-primary font-medium",
                    item.restricted && "border border-warning/20"
                  )}
                  onClick={() => {
                    onSectionChange(item.id);
                    onToggle(); // Close mobile menu after selection
                  }}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <span className="flex-1 text-left truncate">{item.label}</span>
                  {item.badge && (
                    <Badge variant="destructive" className="ml-auto text-xs">
                      {item.badge}
                    </Badge>
                  )}
                  {item.restricted && (
                    <AlertTriangle className="h-3 w-3 text-warning ml-auto flex-shrink-0" />
                  )}
                </Button>
              );
            })}
          </nav>

          <div className="mt-6 lg:mt-8 p-3 lg:p-4 bg-eden-surface rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-eden-secondary rounded-full flex-shrink-0"></div>
              <span className="text-xs lg:text-sm font-medium text-eden-primary">System Status</span>
            </div>
            <p className="text-xs text-muted-foreground">All systems operational</p>
            <p className="text-xs text-muted-foreground mt-1">Last backup: 2 hours ago</p>
          </div>
        </div>
      </aside>
    </>
  );
};