import { useState } from 'react';
import { mockMenu } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UtensilsCrossed, Plus, X } from 'lucide-react';

const AdminMenu = () => {
  const [menu, setMenu] = useState(mockMenu);
  const [editing, setEditing] = useState<string | null>(null);
  const [newItem, setNewItem] = useState('');

  const addItem = (meal: 'breakfast' | 'lunch' | 'dinner') => {
    if (!newItem.trim()) return;
    setMenu((prev) => ({
      ...prev,
      [meal]: { ...prev[meal], items: [...prev[meal].items, newItem.trim()] },
    }));
    setNewItem('');
  };

  const removeItem = (meal: 'breakfast' | 'lunch' | 'dinner', idx: number) => {
    setMenu((prev) => ({
      ...prev,
      [meal]: { ...prev[meal], items: prev[meal].items.filter((_, i) => i !== idx) },
    }));
  };

  return (
    <div className="page-container">
      <div className="animate-fade-in">
        <h1 className="text-xl font-bold text-foreground">Menu Management</h1>
        <p className="text-sm text-muted-foreground mt-1">{menu.date}</p>
      </div>

      <div className="mt-6 space-y-4">
        {(['breakfast', 'lunch', 'dinner'] as const).map((meal, i) => (
          <div key={meal} className="glass-card rounded-2xl p-5 animate-slide-up" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <UtensilsCrossed className="w-5 h-5 text-primary" />
                <h3 className="font-semibold capitalize">{meal}</h3>
                <span className="text-xs text-muted-foreground">({menu[meal].time})</span>
              </div>
              <Button size="sm" variant="ghost" className="rounded-xl text-xs" onClick={() => setEditing(editing === meal ? null : meal)}>
                {editing === meal ? 'Done' : 'Edit'}
              </Button>
            </div>
            <div className="space-y-2">
              {menu[meal].items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between bg-muted/50 rounded-xl px-3 py-2">
                  <span className="text-sm">{item}</span>
                  {editing === meal && (
                    <button onClick={() => removeItem(meal, idx)} className="text-muted-foreground hover:text-destructive transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            {editing === meal && (
              <div className="flex gap-2 mt-3">
                <Input placeholder="Add item..." value={newItem} onChange={(e) => setNewItem(e.target.value)} className="rounded-xl h-9" onKeyDown={(e) => e.key === 'Enter' && addItem(meal)} />
                <Button size="sm" className="rounded-xl gradient-primary text-primary-foreground" onClick={() => addItem(meal)}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMenu;
