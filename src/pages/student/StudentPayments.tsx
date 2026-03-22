import { mockUpiId } from '@/data/mockData';
import { CreditCard, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const StudentPayments = () => {
  const [copied, setCopied] = useState(false);

  const copyUpi = () => {
    navigator.clipboard.writeText(mockUpiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=${encodeURIComponent(mockUpiId)}&pn=Hanumant%20Hostel`;

  return (
    <div className="page-container">
      <div className="animate-fade-in">
        <h1 className="text-xl font-bold text-foreground">Pay Rent</h1>
        <p className="text-sm text-muted-foreground mt-1">Scan QR or copy UPI ID to pay</p>
      </div>

      <div className="glass-card rounded-2xl p-6 mt-6 text-center animate-slide-up">
        <div className="w-16 h-16 rounded-2xl gradient-primary mx-auto flex items-center justify-center mb-4">
          <CreditCard className="w-8 h-8 text-primary-foreground" />
        </div>
        <h2 className="font-bold text-lg">Hanumant Hostel</h2>
        <p className="text-muted-foreground text-sm mt-1">Monthly Rent Payment</p>

        <div className="mt-6 bg-card rounded-2xl p-4 inline-block border border-border">
          <img src={qrUrl} alt="UPI QR Code" className="w-48 h-48 mx-auto rounded-xl" />
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          <div className="bg-muted rounded-xl px-4 py-2.5 text-sm font-mono font-medium">{mockUpiId}</div>
          <Button variant="outline" size="icon" className="rounded-xl" onClick={copyUpi}>
            {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
          </Button>
        </div>

        <div className="mt-6 bg-muted/50 rounded-xl p-4 text-left text-sm space-y-2">
          <p className="font-semibold text-foreground">Payment Instructions:</p>
          <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
            <li>Open any UPI app (GPay, PhonePe, Paytm)</li>
            <li>Scan the QR code or enter UPI ID</li>
            <li>Enter your monthly rent amount</li>
            <li>Complete payment and save receipt</li>
            <li>Inform admin after payment</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default StudentPayments;
