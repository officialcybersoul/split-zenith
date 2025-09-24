import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Wallet, DollarSign, CreditCard, Smartphone, ArrowRightLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SettleBalanceModalProps {
  trigger: React.ReactNode;
  suggestedAmount?: number;
  suggestedPerson?: string;
}

export default function SettleBalanceModal({ 
  trigger, 
  suggestedAmount = 0, 
  suggestedPerson = '' 
}: SettleBalanceModalProps) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(suggestedAmount.toString());
  const [paymentMethod, setPaymentMethod] = useState('wallet');
  const [settleWith, setSettleWith] = useState(suggestedPerson);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  // Mock members for settlement
  const members = [
    { id: 1, name: 'Alice Johnson', avatar: 'A', balance: -45.50 },
    { id: 2, name: 'Bob Smith', avatar: 'B', balance: 23.75 },
    { id: 3, name: 'Carol Davis', avatar: 'C', balance: -12.25 }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !settleWith) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const settlement = {
        amount: parseFloat(amount),
        with: settleWith,
        method: paymentMethod,
        timestamp: new Date().toISOString()
      };

      console.log('Processing settlement:', settlement);

      if (paymentMethod === 'wallet') {
        toast({
          title: "Wallet Payment Initiated",
          description: `Please confirm the transaction in your wallet for $${amount}.`,
        });
      } else {
        toast({
          title: "Settlement Recorded!",
          description: `$${amount} payment to ${settleWith} has been recorded.`,
        });
      }

      // Reset form
      setAmount('');
      setSettleWith('');
      setIsProcessing(false);
      setOpen(false);
    }, 2000);
  };

  const paymentMethods = [
    { id: 'wallet', name: 'Crypto Wallet', icon: Wallet },
    { id: 'bank', name: 'Bank Transfer', icon: CreditCard },
    { id: 'venmo', name: 'Venmo', icon: Smartphone },
    { id: 'manual', name: 'Cash/Manual', icon: DollarSign }
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] glass-card border-surface-200">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-text-100">
            <div className="gradient-3 w-8 h-8 rounded-lg flex items-center justify-center">
              <ArrowRightLeft className="w-4 h-4 text-bg-100" />
            </div>
            Settle Balance
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Settle With */}
          <div className="space-y-2">
            <Label className="text-text-100">Settle With *</Label>
            <Select value={settleWith} onValueChange={setSettleWith} required>
              <SelectTrigger className="bg-surface-100 border-surface-200 text-text-100">
                <SelectValue placeholder="Choose person" />
              </SelectTrigger>
              <SelectContent>
                {members.map(member => (
                  <SelectItem key={member.id} value={member.name}>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                            {member.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <span>{member.name}</span>
                      </div>
                      <span className={`text-xs numeric ml-4 ${
                        member.balance >= 0 ? 'text-success' : 'text-danger'
                      }`}>
                        {member.balance >= 0 ? '+' : ''}${member.balance.toFixed(2)}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-text-100">Amount *</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 w-4 h-4 text-muted-300" />
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-10 bg-surface-100 border-surface-200 text-text-100 numeric"
                required
              />
            </div>
            {suggestedAmount > 0 && (
              <div className="text-sm text-muted-300">
                Suggested: ${suggestedAmount.toFixed(2)}
              </div>
            )}
          </div>

          {/* Payment Method */}
          <div className="space-y-3">
            <Label className="text-text-100">Payment Method</Label>
            <div className="grid grid-cols-2 gap-2">
              {paymentMethods.map(method => {
                const Icon = method.icon;
                return (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setPaymentMethod(method.id)}
                    className={`flex items-center space-x-2 p-3 rounded-lg transition-colors ${
                      paymentMethod === method.id
                        ? 'bg-primary/10 border border-primary/20'
                        : 'bg-surface-100 border border-surface-200 hover:bg-surface-200'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-muted-300" />
                    <span className="text-text-100 text-sm">{method.name}</span>
                    {paymentMethod === method.id && (
                      <div className="ml-auto w-2 h-2 bg-primary rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Payment Method Info */}
          <div className="bg-surface-100 p-4 rounded-lg border border-surface-200">
            <div className="text-sm text-text-100">
              {paymentMethod === 'wallet' && (
                <div className="flex items-center space-x-2">
                  <Wallet className="w-4 h-4 text-success" />
                  <span>This will initiate a blockchain transaction</span>
                </div>
              )}
              {paymentMethod === 'bank' && (
                <div className="flex items-center space-x-2">
                  <CreditCard className="w-4 h-4 text-primary" />
                  <span>Record bank transfer payment</span>
                </div>
              )}
              {paymentMethod === 'venmo' && (
                <div className="flex items-center space-x-2">
                  <Smartphone className="w-4 h-4 text-[#3d95ce]" />
                  <span>Record Venmo payment</span>
                </div>
              )}
              {paymentMethod === 'manual' && (
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-warning" />
                  <span>Mark as paid manually (cash, etc.)</span>
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant={paymentMethod === 'wallet' ? 'wallet' : 'default'}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                  Processing...
                </div>
              ) : paymentMethod === 'wallet' ? (
                <>
                  <Wallet className="w-4 h-4" />
                  Pay with Wallet
                </>
              ) : (
                'Record Payment'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}