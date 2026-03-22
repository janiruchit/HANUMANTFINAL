import { mockStudents } from '@/data/mockData';
import { Users, IndianRupee, AlertTriangle } from 'lucide-react';

const AdminDashboard = () => {
  const totalStudents = mockStudents.length;
  const paidCount = mockStudents.filter((s) => s.rentStatus === 'paid').length;
  const unpaidCount = totalStudents - paidCount;

  const cards = [
    { label: 'Total Students', value: totalStudents, icon: Users, color: 'bg-primary/10 text-primary' },
    { label: 'Rent Paid', value: paidCount, icon: IndianRupee, color: 'bg-success/10 text-success' },
    { label: 'Rent Unpaid', value: unpaidCount, icon: AlertTriangle, color: 'bg-destructive/10 text-destructive' },
  ];

  return (
    <div className="page-container">
      <div className="animate-fade-in">
        <h1 className="text-xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Hostel overview at a glance</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        {cards.map((card, i) => (
          <div key={card.label} className="stat-card animate-slide-up" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{card.label}</p>
                <p className="text-3xl font-bold mt-1">{card.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${card.color}`}>
                <card.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 animate-slide-up" style={{ animationDelay: '240ms' }}>
        <h2 className="section-title">Due Students</h2>
        <div className="space-y-3">
          {mockStudents.filter((s) => s.rentStatus === 'unpaid').map((s) => (
            <div key={s.id} className="glass-card rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center font-bold text-destructive text-sm">
                  {s.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-sm">{s.name}</p>
                  <p className="text-xs text-muted-foreground">Room {s.roomNumber}</p>
                </div>
              </div>
              <span className="text-sm font-bold text-destructive">₹{s.rentAmount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
