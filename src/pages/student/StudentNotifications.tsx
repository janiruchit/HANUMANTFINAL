import { mockNotifications } from '@/data/mockData';
import { Bell, AlertTriangle, Info } from 'lucide-react';

const typeConfig = {
  warning: { icon: AlertTriangle, color: 'bg-warning/10 text-warning border-warning/20' },
  info: { icon: Info, color: 'bg-info/10 text-info border-info/20' },
};

const StudentNotifications = () => {
  return (
    <div className="page-container">
      <div className="animate-fade-in">
        <h1 className="text-xl font-bold text-foreground">Notifications</h1>
        <p className="text-sm text-muted-foreground mt-1">Stay updated with hostel announcements</p>
      </div>

      <div className="mt-6 space-y-3">
        {mockNotifications.map((n, i) => {
          const tc = typeConfig[n.type];
          const Icon = tc.icon;
          return (
            <div key={n.id} className={`glass-card rounded-2xl p-4 border-l-4 ${tc.color} animate-slide-up`} style={{ animationDelay: `${i * 80}ms` }}>
              <div className="flex items-start gap-3">
                <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-sm text-foreground">{n.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{n.message}</p>
                  <p className="text-xs text-muted-foreground mt-2">{n.date}</p>
                </div>
              </div>
            </div>
          );
        })}
        {mockNotifications.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Bell className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No notifications yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentNotifications;
