import { useAuth } from '@/contexts/AuthContext';
import { mockStudents, mockMenu } from '@/data/mockData';
import { Home, BedDouble, IndianRupee, AlertTriangle, UtensilsCrossed } from 'lucide-react';

const StudentDashboard = () => {
  const { user } = useAuth();
  const studentData = mockStudents.find((s) => s.id === user?.id) || mockStudents[0];

  const cards = [
    { label: 'Room Number', value: studentData.roomNumber, icon: BedDouble, color: 'bg-primary/10 text-primary' },
    { label: 'Monthly Rent', value: `₹${studentData.rentAmount}`, icon: IndianRupee, color: 'bg-accent/10 text-accent' },
    { label: 'Rent Status', value: studentData.rentStatus === 'paid' ? 'Paid ✓' : 'Unpaid', icon: studentData.rentStatus === 'paid' ? Home : AlertTriangle, color: studentData.rentStatus === 'paid' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive' },
  ];

  return (
    <div className="page-container">
      <div className="animate-fade-in">
        <h1 className="text-xl font-bold text-foreground">Welcome back,</h1>
        <p className="text-2xl font-bold text-gradient">{user?.name || studentData.name}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        {cards.map((card, i) => (
          <div key={card.label} className="stat-card animate-slide-up" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{card.label}</p>
                <p className="text-2xl font-bold mt-1">{card.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${card.color}`}>
                <card.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {studentData.rentStatus === 'unpaid' && (
        <div className="mt-4 glass-card rounded-2xl p-4 border-l-4 border-destructive animate-slide-up" style={{ animationDelay: '240ms' }}>
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm text-destructive">Rent Overdue</p>
              <p className="text-xs text-muted-foreground mt-0.5">Your rent of ₹{studentData.rentAmount} for this month is pending. Please pay immediately.</p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 animate-slide-up" style={{ animationDelay: '320ms' }}>
        <div className="flex items-center gap-2 mb-4">
          <UtensilsCrossed className="w-5 h-5 text-primary" />
          <h2 className="section-title mb-0">Today's Menu</h2>
        </div>
        <div className="glass-card rounded-2xl p-4">
          <p className="text-xs text-muted-foreground mb-3">{mockMenu.date}</p>
          {(['breakfast', 'lunch', 'dinner'] as const).map((meal) => (
            <div key={meal} className="py-3 border-b border-border/50 last:border-0">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-sm capitalize">{meal}</span>
                <span className="text-xs text-muted-foreground">{mockMenu[meal].time}</span>
              </div>
              <p className="text-sm text-muted-foreground">{mockMenu[meal].items.join(' • ')}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
