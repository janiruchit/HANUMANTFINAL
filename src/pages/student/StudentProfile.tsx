import { useAuth } from '@/contexts/AuthContext';
import { mockStudents } from '@/data/mockData';
import { User, Phone, MapPin, BedDouble, Mail } from 'lucide-react';

const StudentProfile = () => {
  const { user } = useAuth();
  const data = mockStudents.find((s) => s.id === user?.id) || mockStudents[0];

  const fields = [
    { label: 'Full Name', value: data.name, icon: User },
    { label: 'Email', value: data.email, icon: Mail },
    { label: 'Room Number', value: data.roomNumber, icon: BedDouble },
    { label: 'Mobile', value: data.mobile, icon: Phone },
    { label: 'Parent Mobile', value: data.parentMobile, icon: Phone },
    { label: 'Address', value: data.address, icon: MapPin },
  ];

  return (
    <div className="page-container">
      <div className="animate-fade-in">
        <h1 className="text-xl font-bold text-foreground">My Profile</h1>
      </div>

      <div className="glass-card rounded-2xl p-6 mt-6 text-center animate-slide-up">
        <div className="w-20 h-20 rounded-full gradient-primary mx-auto flex items-center justify-center text-3xl font-bold text-primary-foreground">
          {data.name.charAt(0)}
        </div>
        <h2 className="font-bold text-lg mt-3">{data.name}</h2>
        <p className="text-sm text-muted-foreground">Room {data.roomNumber}</p>
      </div>

      <div className="glass-card rounded-2xl mt-4 divide-y divide-border/50 animate-slide-up" style={{ animationDelay: '100ms' }}>
        {fields.map((f) => (
          <div key={f.label} className="flex items-center gap-3 px-5 py-4">
            <f.icon className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">{f.label}</p>
              <p className="text-sm font-medium">{f.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentProfile;
