import { mockMenu } from '@/data/mockData';
import { Coffee, Sun, Moon } from 'lucide-react';

const mealIcons = { breakfast: Coffee, lunch: Sun, dinner: Moon };
const mealColors = {
  breakfast: 'from-amber-400/20 to-orange-400/20 border-amber-400/30',
  lunch: 'from-emerald-400/20 to-teal-400/20 border-emerald-400/30',
  dinner: 'from-indigo-400/20 to-purple-400/20 border-indigo-400/30',
};

const StudentMenu = () => {
  return (
    <div className="page-container">
      <div className="animate-fade-in">
        <h1 className="text-xl font-bold text-foreground">Daily Menu</h1>
        <p className="text-sm text-muted-foreground mt-1">{mockMenu.date}</p>
      </div>

      <div className="grid gap-4 mt-6">
        {(['breakfast', 'lunch', 'dinner'] as const).map((meal, i) => {
          const Icon = mealIcons[meal];
          return (
            <div
              key={meal}
              className={`glass-card rounded-2xl p-5 border bg-gradient-to-br ${mealColors[meal]} animate-slide-up`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-card/80 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold capitalize text-foreground">{meal}</h3>
                  <p className="text-xs text-muted-foreground">{mockMenu[meal].time}</p>
                </div>
              </div>
              <div className="space-y-2">
                {mockMenu[meal].items.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudentMenu;
