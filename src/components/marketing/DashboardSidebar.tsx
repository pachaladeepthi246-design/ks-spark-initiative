import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  RobotMascot, 
  RobotChart, 
  RobotPhone, 
  RobotRocket, 
  RobotPen, 
  RobotCoin,
  RobotChat
} from '@/components/icons/CuteRobots';
import { 
  ChevronLeft, 
  ChevronRight, 
  Settings, 
  LogOut,
  HelpCircle,
  Bell
} from 'lucide-react';

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { title: 'Dashboard', href: '/dashboard', icon: <RobotChart size={24} /> },
  { title: 'WhatsApp', href: '/tools/whatsapp', icon: <RobotPhone size={24} /> },
  { title: 'Social Poster', href: '/tools/social-poster', icon: <RobotRocket size={24} /> },
  { title: 'Ads Generator', href: '/tools/ads-gen', icon: <RobotPen size={24} /> },
  { title: 'Billing', href: '/billing', icon: <RobotCoin size={24} /> },
];

const DashboardSidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside 
      className={cn(
        'glass-card h-screen flex flex-col transition-all duration-300 border-r border-border/50',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="p-4 border-b border-border/50">
        <Link to="/dashboard" className="flex items-center gap-3">
          <RobotMascot size={40} />
          {!collapsed && (
            <span className="text-xl font-bold gradient-text">MarketBot</span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
                isActive 
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25' 
                  : 'hover:bg-muted text-muted-foreground hover:text-foreground'
              )}
            >
              <div className={cn('flex-shrink-0', isActive && 'scale-110')}>
                {item.icon}
              </div>
              {!collapsed && (
                <span className="font-medium">{item.title}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-border/50 space-y-2">
        {/* Credits indicator */}
        {!collapsed && (
          <div className="glass-card p-3 rounded-xl mb-4">
            <div className="flex items-center gap-2 mb-2">
              <RobotCoin size={20} />
              <span className="text-sm font-medium">Credits</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full w-3/4 gradient-bg-electric rounded-full" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">750 / 1000 remaining</p>
          </div>
        )}

        <Link 
          to="/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
        >
          <Settings className="h-5 w-5" />
          {!collapsed && <span>Settings</span>}
        </Link>
        
        <button
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-all w-full"
        >
          <HelpCircle className="h-5 w-5" />
          {!collapsed && <span>Help & Support</span>}
        </button>
        
        <button
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-destructive/10 text-destructive transition-all w-full"
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>

      {/* Collapse Toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-4 top-20 bg-background border border-border rounded-full shadow-lg"
      >
        {collapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>
    </aside>
  );
};

export default DashboardSidebar;
