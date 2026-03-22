import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import ThemeToggle from '@/components/ThemeToggle';
import { Building2, LayoutDashboard, UtensilsCrossed, CreditCard, Bell, MessageSquare, User, Users, Receipt, Settings, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

const studentNav = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/student' },
  { label: 'Menu', icon: UtensilsCrossed, path: '/student/menu' },
  { label: 'Payments', icon: CreditCard, path: '/student/payments' },
  { label: 'Complaints', icon: MessageSquare, path: '/student/complaints' },
  { label: 'Notifications', icon: Bell, path: '/student/notifications' },
  { label: 'Profile', icon: User, path: '/student/profile' },
];

const adminNav = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
  { label: 'Students', icon: Users, path: '/admin/students' },
  { label: 'Fees', icon: Receipt, path: '/admin/fees' },
  { label: 'Menu', icon: UtensilsCrossed, path: '/admin/menu' },
  { label: 'Notifications', icon: Bell, path: '/admin/notifications' },
  { label: 'UPI Settings', icon: Settings, path: '/admin/upi' },
];

const AppLayout = ({ children }: { children: ReactNode }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const nav = user?.role === 'admin' ? adminNav : studentNav;
  const bottomItems = nav.slice(0, 5);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-border bg-card/50 backdrop-blur-sm fixed inset-y-0 left-0 z-40">
        <div className="p-5 flex items-center gap-3 border-b border-border">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
            <Building2 className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="min-w-0">
            <h2 className="font-bold text-sm text-foreground truncate">Hanumant Hostel</h2>
            <p className="text-xs text-muted-foreground capitalize">{user?.role} Panel</p>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {nav.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive(item.path)
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-border space-y-1">
          <div className="flex items-center justify-between px-3 py-1">
            <span className="text-xs text-muted-foreground">Theme</span>
            <ThemeToggle />
          </div>
          <button onClick={logout} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors w-full">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border/50">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-2">
            <button onClick={() => setSidebarOpen(true)} className="p-2 -ml-2 rounded-xl hover:bg-muted transition-colors">
              <Menu className="w-5 h-5" />
            </button>
            <span className="font-bold text-sm">Hanumant Hostel</span>
          </div>
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-72 bg-card border-r border-border animate-slide-up flex flex-col">
            <div className="p-4 flex items-center justify-between border-b border-border">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-sm">Hanumant Hostel</span>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-xl hover:bg-muted">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 p-3 space-y-1">
              {nav.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive(item.path) ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
            <div className="p-3 border-t border-border">
              <button onClick={logout} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 w-full">
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 md:ml-64 pt-14 md:pt-0">
        {children}
      </main>

      {/* Bottom Navigation - Mobile */}
      <div className="bottom-nav">
        {bottomItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`bottom-nav-item ${isActive(item.path) ? 'bottom-nav-item-active' : ''}`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AppLayout;
