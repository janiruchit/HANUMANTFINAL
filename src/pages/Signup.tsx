import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Building2, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';

const Signup = () => {
  const { signup, isLoading } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', mobile: '', parentMobile: '', address: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const update = (key: string, value: string) => setForm((p) => ({ ...p, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signup(form);
    } catch {
      setError('Signup failed. Try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-background">
      <div className="w-full max-w-md animate-slide-up">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary mb-4">
            <Building2 className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Student Registration</h1>
          <p className="text-muted-foreground mt-1">Create your hostel account</p>
        </div>

        <div className="glass-card rounded-3xl p-6">
          <form onSubmit={handleSubmit} className="space-y-3">
            {error && <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-xl">{error}</div>}
            <div className="space-y-1.5">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Your full name" value={form.name} onChange={(e) => update('name', e.target.value)} required className="rounded-xl h-11" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="semail">Email</Label>
              <Input id="semail" type="email" placeholder="your@email.com" value={form.email} onChange={(e) => update('email', e.target.value)} required className="rounded-xl h-11" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="spass">Password</Label>
              <div className="relative">
                <Input id="spass" type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={form.password} onChange={(e) => update('password', e.target.value)} required className="rounded-xl h-11 pr-12" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="mobile">Mobile</Label>
                <Input id="mobile" placeholder="9876543210" value={form.mobile} onChange={(e) => update('mobile', e.target.value)} required className="rounded-xl h-11" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="pmobile">Parent Mobile</Label>
                <Input id="pmobile" placeholder="9876543211" value={form.parentMobile} onChange={(e) => update('parentMobile', e.target.value)} required className="rounded-xl h-11" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="address">Address</Label>
              <Input id="address" placeholder="City, State" value={form.address} onChange={(e) => update('address', e.target.value)} required className="rounded-xl h-11" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="aadhaar">Aadhaar Card (Upload)</Label>
              <Input id="aadhaar" type="file" accept="image/*,.pdf" className="rounded-xl h-11 file:mr-3 file:rounded-lg file:border-0 file:bg-primary/10 file:text-primary file:font-medium" />
            </div>
            <Button type="submit" className="w-full h-12 rounded-xl gradient-primary text-primary-foreground font-semibold text-base mt-2" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
