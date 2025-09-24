import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Plus, X, DollarSign, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AddExpenseModalProps {
  trigger: React.ReactNode;
  groupMembers?: Array<{ id: number; name: string; avatar: string }>;
}

export default function AddExpenseModal({ trigger, groupMembers = [] }: AddExpenseModalProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState('');
  const [participants, setParticipants] = useState<number[]>([]);
  const [splitType, setSplitType] = useState('equal');
  const [note, setNote] = useState('');
  const [category, setCategory] = useState('');
  const { toast } = useToast();

  // Default members if none provided (for dashboard usage)
  const defaultMembers = [
    { id: 1, name: 'Alice Johnson', avatar: 'A' },
    { id: 2, name: 'Bob Smith', avatar: 'B' },
    { id: 3, name: 'Carol Davis', avatar: 'C' },
    { id: 4, name: 'You', avatar: 'Y' }
  ];

  const members = groupMembers.length > 0 ? groupMembers : defaultMembers;

  const toggleParticipant = (memberId: number) => {
    setParticipants(prev => 
      prev.includes(memberId)
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !amount || !paidBy || participants.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const expense = {
      title,
      amount: parseFloat(amount),
      paidBy,
      participants,
      splitType,
      note,
      category: category || 'General',
      perPerson: parseFloat(amount) / participants.length
    };

    console.log('Creating expense:', expense);
    
    toast({
      title: "Expense Added!",
      description: `${title} for $${amount} has been added successfully.`,
    });

    // Reset form
    setTitle('');
    setAmount('');
    setPaidBy('');
    setParticipants([]);
    setNote('');
    setCategory('');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] glass-card border-surface-200">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-text-100">
            <div className="gradient-2 w-8 h-8 rounded-lg flex items-center justify-center">
              <Plus className="w-4 h-4 text-bg-100" />
            </div>
            Add New Expense
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title and Amount */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-text-100">Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Dinner at restaurant"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-surface-100 border-surface-200 text-text-100"
                required
              />
            </div>
            
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
            </div>
          </div>

          {/* Category and Paid By */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category" className="text-text-100">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="bg-surface-100 border-surface-200 text-text-100">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="food">Food & Dining</SelectItem>
                  <SelectItem value="transport">Transportation</SelectItem>
                  <SelectItem value="entertainment">Entertainment</SelectItem>
                  <SelectItem value="shopping">Shopping</SelectItem>
                  <SelectItem value="utilities">Utilities</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="paidBy" className="text-text-100">Paid By *</Label>
              <Select value={paidBy} onValueChange={setPaidBy} required>
                <SelectTrigger className="bg-surface-100 border-surface-200 text-text-100">
                  <SelectValue placeholder="Who paid?" />
                </SelectTrigger>
                <SelectContent>
                  {members.map(member => (
                    <SelectItem key={member.id} value={member.name}>
                      <div className="flex items-center space-x-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                            {member.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <span>{member.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Participants */}
          <div className="space-y-3">
            <Label className="text-text-100 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Split Between * ({participants.length} selected)
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {members.map(member => (
                <div
                  key={member.id}
                  onClick={() => toggleParticipant(member.id)}
                  className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                    participants.includes(member.id)
                      ? 'bg-primary/10 border border-primary/20'
                      : 'bg-surface-100 border border-surface-200 hover:bg-surface-200'
                  }`}
                >
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      {member.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-text-100 text-sm">{member.name}</span>
                  {participants.includes(member.id) && (
                    <div className="ml-auto w-2 h-2 bg-primary rounded-full" />
                  )}
                </div>
              ))}
            </div>
            
            {participants.length > 0 && amount && (
              <div className="text-sm text-muted-300 bg-surface-100 p-3 rounded-lg">
                <strong className="text-text-100">Split Preview:</strong> ${(parseFloat(amount) / participants.length).toFixed(2)} per person
              </div>
            )}
          </div>

          {/* Note */}
          <div className="space-y-2">
            <Label htmlFor="note" className="text-text-100">Note (optional)</Label>
            <Textarea
              id="note"
              placeholder="Add any additional details..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="bg-surface-100 border-surface-200 text-text-100"
              rows={3}
            />
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="default">
              Add Expense
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}