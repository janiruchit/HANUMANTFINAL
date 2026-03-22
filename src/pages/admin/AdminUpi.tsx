import { useState } from 'react';
import { mockUpiId } from '@/data/mockData';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Settings, Save, Check } from 'lucide-react';

const AdminUpi = () => {
  const [upi, setUpi] = useState(mockUpiId);
  const [saved, setSaved] = useState(false);

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=${encodeURIComponent(upi)}&pn=Hanumant%20Hostel`;

  return (
    <div className="page-container">
      <div className="animate-fade-in">
        <h1 className="text-xl font-bold text-foreground">UPI Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Configure payment QR code</p>
      </div>

      <div className="glass-card rounded-2xl p-6 mt-6 animate-slide-up">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center">
            <Settings className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-bold">Payment Configuration</h2>
            <p className="text-xs text-muted-foreground">Students will see this QR code for payments</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>UPI ID</Label>
            <Input value={upi} onChange={(e) => setUpi(e.target.value)} placeholder="yourname@upi" className="rounded-xl h-11" />
          </div>
          <Button onClick={save} className="rounded-xl gradient-primary text-primary-foreground">
            {saved ? <><Check className="w-4 h-4 mr-1" /> Saved!</> : <><Save className="w-4 h-4 mr-1" /> Save UPI ID</>}
          </Button>
        </div>

        {upi && (
          <div className="mt-6 text-center">
            <p className="text-sm font-medium text-muted-foreground mb-3">QR Code Preview</p>
            <div className="bg-card rounded-2xl p-4 inline-block border border-border">
              <img src={qrUrl} alt="UPI QR" className="w-48 h-48 rounded-xl" />
            </div>
            <p className="text-xs text-muted-foreground mt-2 font-mono">{upi}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUpi;
