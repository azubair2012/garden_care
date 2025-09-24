import { Bell, Search, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  onMenuToggle: () => void;
}

export const Header = ({ onMenuToggle }: HeaderProps) => {
  return (
    <header className="h-14 lg:h-16 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
      <div className="h-full px-4 lg:px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 lg:gap-4">
          {/* Mobile menu button */}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onMenuToggle}
            className="lg:hidden p-2"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 lg:w-8 lg:h-8 bg-gradient-to-br from-eden-primary to-eden-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs lg:text-sm">EC</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-semibold text-foreground text-sm lg:text-base">Eden Care CRM</h1>
              <p className="text-xs text-muted-foreground hidden lg:block">Community Support Management</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 lg:gap-4 flex-1 max-w-xs lg:max-w-md mx-2 lg:mx-8">
          <div className="relative flex-1">
            <Search className="absolute left-2 lg:left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search..."
              className="pl-8 lg:pl-10 bg-background/60 text-sm h-9 lg:h-10"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 lg:gap-3">
          <Button variant="ghost" size="sm" className="relative p-2">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-warning rounded-full"></span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-1 lg:gap-2 p-1 lg:p-2">
                <div className="w-7 h-7 lg:w-8 lg:h-8 bg-eden-surface rounded-full flex items-center justify-center">
                  <User className="h-3 w-3 lg:h-4 lg:w-4 text-eden-primary" />
                </div>
                <span className="hidden md:inline text-sm">Sarah Admin</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 lg:w-56">
              <DropdownMenuLabel>
                <div>
                  <p className="font-medium text-sm">Sarah Johnson</p>
                  <p className="text-xs text-muted-foreground">Administrator</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-sm">Profile Settings</DropdownMenuItem>
              <DropdownMenuItem className="text-sm">Security</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-sm">Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};