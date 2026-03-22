import { useState } from 'react';
import { mockNotifications } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Bell, Plus, Send } from 'lucide-react';

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const send = () => {
    if (!title.trim()) return;
    setNotifications([
      { id: Date.now().toString(), title, message, date: new Date().toISOString().split('T')[0], type: 'info' as const },
      ...notifications,
    ]);
    setTitle('');
    setMessage('');
    setShowForm(false);
  };

  return (
    <div className="page-container">
      <div className="flex items-center justify-between animate-fade-in">
        <div>
          <h1 className="text-xl font-bold text-foreground">Notifications</h1>
          <p className="text-sm text-muted-foreground mt-1">Send announcements to students</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="rounded-xl gradient-primary text-primary-foreground" size="sm">
          <Plus className="w-4 h-4 mr-1" /> New
        </Button>
      </div>

      {showForm && (
        <div className="glass-card rounded-2xl p-5 mt-4 animate-scale-in space-y-3">
          <Input placeholder="Notification title" value={title} onChange={(e) => setTitle(e.target.value)} className="rounded-xl" />
          <Textarea placeholder="Message to all students..." value={message} onChange={(e) => setMessage(e.target.value)} className="rounded-xl" rows={3} />
          <div className="flex gap-2">
            <Button onClick={send} className="rounded-xl gradient-primary text-primary-foreground" size="sm"><Send className="w-4 h-4 mr-1" /> Send</Button>
            <Button onClick={() => setShowForm(false)} variant="outline" className="rounded-xl" size="sm">Cancel</Button>
          </div>
        </div>
      )}

      <div className="mt-6 space-y-3">
        {notifications.map((n, i) => (
          <div key={n.id} className="glass-card rounded-2xl p-4 animate-slide-up" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-info/10 flex items-center justify-center flex-shrink-0">
                <Bell className="w-5 h-5 text-info" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">{n.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{n.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{n.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminNotifications;
