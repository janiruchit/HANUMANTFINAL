import { useState } from 'react';
import { mockComplaints } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, Plus, Clock, CheckCircle, Loader2 } from 'lucide-react';

const statusConfig = {
  pending: { label: 'Pending', icon: Clock, color: 'bg-warning/10 text-warning' },
  'in-progress': { label: 'In Progress', icon: Loader2, color: 'bg-info/10 text-info' },
  resolved: { label: 'Resolved', icon: CheckCircle, color: 'bg-success/10 text-success' },
};

const StudentComplaints = () => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [complaints, setComplaints] = useState(mockComplaints);

  const submit = () => {
    if (!title.trim()) return;
    setComplaints([
      { id: Date.now().toString(), studentId: '2', studentName: 'Rahul Sharma', title, description: desc, status: 'pending', date: new Date().toISOString().split('T')[0] },
      ...complaints,
    ]);
    setTitle('');
    setDesc('');
    setShowForm(false);
  };

  return (
    <div className="page-container">
      <div className="flex items-center justify-between animate-fade-in">
        <div>
          <h1 className="text-xl font-bold text-foreground">Complaints</h1>
          <p className="text-sm text-muted-foreground mt-1">Submit and track complaints</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="rounded-xl gradient-primary text-primary-foreground" size="sm">
          <Plus className="w-4 h-4 mr-1" /> New
        </Button>
      </div>

      {showForm && (
        <div className="glass-card rounded-2xl p-5 mt-4 animate-scale-in space-y-3">
          <Input placeholder="Complaint title" value={title} onChange={(e) => setTitle(e.target.value)} className="rounded-xl" />
          <Textarea placeholder="Describe your issue..." value={desc} onChange={(e) => setDesc(e.target.value)} className="rounded-xl" rows={3} />
          <div className="flex gap-2">
            <Button onClick={submit} className="rounded-xl gradient-primary text-primary-foreground" size="sm">Submit</Button>
            <Button onClick={() => setShowForm(false)} variant="outline" className="rounded-xl" size="sm">Cancel</Button>
          </div>
        </div>
      )}

      <div className="mt-6 space-y-3">
        {complaints.map((c, i) => {
          const sc = statusConfig[c.status];
          return (
            <div key={c.id} className="glass-card rounded-2xl p-4 animate-slide-up" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MessageSquare className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{c.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{c.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{c.date}</p>
                  </div>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${sc.color}`}>{sc.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudentComplaints;
