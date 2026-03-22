import { useState } from 'react';
import { mockStudents } from '@/data/mockData';
import { Search, User, Phone, MapPin, BedDouble, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';

const AdminStudents = () => {
  const [search, setSearch] = useState('');
  const [students] = useState(mockStudents);

  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) || s.roomNumber.includes(search)
  );

  return (
    <div className="page-container">
      <div className="animate-fade-in">
        <h1 className="text-xl font-bold text-foreground">Student Management</h1>
        <p className="text-sm text-muted-foreground mt-1">{students.length} students registered</p>
      </div>

      <div className="relative mt-4 animate-slide-up">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search by name or room..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 rounded-xl h-11" />
      </div>

      <div className="mt-4 space-y-3">
        {filtered.map((s, i) => (
          <div key={s.id} className="glass-card rounded-2xl p-4 animate-slide-up" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold flex-shrink-0">
                  {s.name.charAt(0)}
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-sm">{s.name}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <BedDouble className="w-3 h-3" /> Room {s.roomNumber}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Phone className="w-3 h-3" /> {s.mobile}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" /> {s.address}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${s.rentStatus === 'paid' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>
                  {s.rentStatus === 'paid' ? 'Paid' : 'Unpaid'}
                </span>
                <button className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <User className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No students found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminStudents;
