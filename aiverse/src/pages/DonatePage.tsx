import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Heart, Shield, CheckCircle2, Smartphone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DONATION_AMOUNTS = [500, 1000, 2500, 5000, 10000];

export default function DonatePage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const generateUPILink = (amount: number) => {
    const upiId = '8884162999-4@ybl';
    const payeeName = 'KS Foundation NGO';
    const transactionNote = 'Donation to KS Foundation';
    
    return `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(transactionNote)}`;
  };

  const handleDonate = async () => {
    const amount = selectedAmount || parseInt(customAmount);
    
    if (!amount || amount < 100) {
      toast({
        title: "Invalid Amount",
        description: "Minimum donation amount is ₹100",
        variant: "destructive"
      });
      return;
    }

    if (!donorEmail && !isAnonymous) {
      toast({
        title: "Email Required",
        description: "Please provide your email or donate anonymously",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      // Create donation record
      const { data: donation, error: donationError } = await supabase
        .from('donations')
        .insert({
          amount,
          donor_name: isAnonymous ? null : donorName,
          donor_email: isAnonymous ? null : donorEmail,
          message: message || null,
          is_anonymous: isAnonymous,
          status: 'pending',
          payment_method: 'upi'
        })
        .select()
        .single();

      if (donationError) throw donationError;

      // Generate UPI transaction ID
      const transactionId = `TXN${Date.now()}${Math.random().toString(36).substring(7)}`;

      // Create UPI payment record
      await supabase.from('upi_payments').insert({
        donation_id: donation.id,
        transaction_id: transactionId,
        upi_id: 'KS Foundation', // Masked UPI ID
        amount,
        status: 'pending',
        payment_app: 'gpay' // Default, user can choose
      });

      // Open UPI payment app
      const upiLink = generateUPILink(amount);
      window.location.href = upiLink;

      toast({
        title: "Opening Payment App",
        description: "Please complete the payment in your UPI app",
      });

      // Reset form
      setTimeout(() => {
        setSelectedAmount(null);
        setCustomAmount('');
        setDonorName('');
        setDonorEmail('');
        setMessage('');
        setIsAnonymous(false);
        setLoading(false);
      }, 2000);

    } catch (error) {
      console.error('Donation error:', error);
      toast({
        title: "Error",
        description: "Failed to process donation. Please try again.",
        variant: "destructive"
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <Heart className="w-4 h-4 text-primary fill-primary" />
            <span className="text-sm font-medium text-primary">Support Our Mission</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Make a Difference Today</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your donation helps provide free education, mentorship, and opportunities to underprivileged students pursuing careers in technology.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Donation Form */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-xl shadow-lg p-8 space-y-6">
              {/* Amount Selection */}
              <div>
                <label className="text-sm font-medium text-foreground mb-3 block">Select Amount (INR)</label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                  {DONATION_AMOUNTS.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => {
                        setSelectedAmount(amount);
                        setCustomAmount('');
                      }}
                      className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                        selectedAmount === amount
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                      }`}
                    >
                      ₹{amount.toLocaleString('en-IN')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Amount */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Custom Amount</label>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(null);
                  }}
                  placeholder="Enter custom amount (min ₹100)"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Donor Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="anonymous"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                  />
                  <label htmlFor="anonymous" className="text-sm text-muted-foreground">
                    Donate anonymously
                  </label>
                </div>

                {!isAnonymous && (
                  <>
                    <input
                      type="text"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      placeholder="Your Name"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                      type="email"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      placeholder="Your Email *"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </>
                )}

                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Leave a message (optional)"
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              {/* Payment Button */}
              <button
                onClick={handleDonate}
                disabled={loading}
                className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Smartphone className="w-5 h-5" />
                {loading ? 'Processing...' : `Donate ₹${(selectedAmount || parseInt(customAmount) || 0).toLocaleString('en-IN')} via UPI`}
              </button>

              <p className="text-sm text-center text-muted-foreground">
                Payment powered by Google Pay & PhonePe UPI
              </p>
            </div>
          </div>

          {/* Info Sidebar */}
          <div className="space-y-6">
            {/* Trust Indicators */}
            <div className="bg-card rounded-xl shadow-lg p-6 space-y-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Secure Payment</h3>
                  <p className="text-sm text-muted-foreground">Direct UPI transfer to verified NGO account</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Tax Benefits</h3>
                  <p className="text-sm text-muted-foreground">80G tax exemption certificate available</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-primary mt-1 fill-primary" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Direct Impact</h3>
                  <p className="text-sm text-muted-foreground">100% funds go to student programs</p>
                </div>
              </div>
            </div>

            {/* Impact Stats */}
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6 space-y-3">
              <h3 className="font-semibold text-foreground mb-3">Your Impact</h3>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">₹500 = 1 month course material</p>
                <p className="text-muted-foreground">₹2,500 = Complete certification program</p>
                <p className="text-muted-foreground">₹10,000 = Full scholarship for 1 student</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
