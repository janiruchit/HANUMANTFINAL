import { useState } from 'react';
import { mockStudents } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';

const AdminFees = () => {
  const [students, setStudents] = useState(mockStudents.map((s) => ({ ...s })));

  const toggleStatus = (id: string) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, rentStatus: s.rentStatus === 'paid' ? 'unpaid' as const : 'paid' as const } : s))
    );
  };

  const paidCount = students.filter((s) => s.rentStatus === 'paid').length;

  return (
    <div className="page-container">
      <div className="animate-fade-in">
        <h1 className="text-xl font-bold text-foreground">Fee Management</h1>
        <p className="text-sm text-muted-foreground mt-1">{paidCount}/{students.length} students paid</p>
      </div>

      <div className="mt-6 space-y-3">
        {students.map((s, i) => (
          <div key={s.id} className="glass-card rounded-2xl p-4 flex items-center justify-between animate-slide-up" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${s.rentStatus === 'paid' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>
                {s.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-sm">{s.name}</p>
                <p className="text-xs text-muted-foreground">Room {s.roomNumber} • ₹{s.rentAmount}</p>
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              className={`rounded-xl text-xs ${s.rentStatus === 'paid' ? 'border-success/30 text-success' : 'border-destructive/30 text-destructive'}`}
              onClick={() => toggleStatus(s.id)}
            >
              {s.rentStatus === 'paid' ? <><CheckCircle className="w-3.5 h-3.5 mr-1" /> Paid</> : <><XCircle className="w-3.5 h-3.5 mr-1" /> Unpaid</>}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminFees;
