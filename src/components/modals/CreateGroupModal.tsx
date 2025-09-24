import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Users, Plus, X, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CreateGroupModalProps {
  trigger: React.ReactNode;
}

export default function CreateGroupModal({ trigger }: CreateGroupModalProps) {
  const [open, setOpen] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [memberEmails, setMemberEmails] = useState<string[]>([]);
  const [currentEmail, setCurrentEmail] = useState('');
  const { toast } = useToast();

  const addMemberEmail = () => {
    if (currentEmail && currentEmail.includes('@') && !memberEmails.includes(currentEmail)) {
      setMemberEmails(prev => [...prev, currentEmail]);
      setCurrentEmail('');
    }
  };

  const removeMemberEmail = (email: string) => {
    setMemberEmails(prev => prev.filter(e => e !== email));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!groupName.trim()) {
      toast({
        title: "Group Name Required",
        description: "Please enter a name for your group.",
        variant: "destructive"
      });
      return;
    }

    const newGroup = {
      name: groupName,
      description,
      members: ['you@example.com', ...memberEmails],
      createdBy: 'You',
      createdAt: new Date().toISOString()
    };

    console.log('Creating group:', newGroup);
    
    toast({
      title: "Group Created!",
      description: `"${groupName}" has been created with ${memberEmails.length + 1} member(s).`,
    });

    // Reset form
    setGroupName('');
    setDescription('');
    setMemberEmails([]);
    setCurrentEmail('');
    setOpen(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addMemberEmail();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] glass-card border-surface-200">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-text-100">
            <div className="gradient-1 w-8 h-8 rounded-lg flex items-center justify-center">
              <Users className="w-4 h-4 text-bg-100" />
            </div>
            Create New Group
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Group Name */}
          <div className="space-y-2">
            <Label htmlFor="groupName" className="text-text-100">Group Name *</Label>
            <Input
              id="groupName"
              placeholder="e.g., House Expenses, Trip to Vegas"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="bg-surface-100 border-surface-200 text-text-100"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-text-100">Description (optional)</Label>
            <Textarea
              id="description"
              placeholder="What's this group for?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-surface-100 border-surface-200 text-text-100"
              rows={3}
            />
          </div>

          {/* Add Members */}
          <div className="space-y-3">
            <Label className="text-text-100">Add Members</Label>
            
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-300" />
                <Input
                  type="email"
                  placeholder="Enter email address"
                  value={currentEmail}
                  onChange={(e) => setCurrentEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-10 bg-surface-100 border-surface-200 text-text-100"
                />
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={addMemberEmail}
                disabled={!currentEmail || !currentEmail.includes('@')}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {/* Member List */}
            <div className="space-y-2">
              {/* You (default member) */}
              <div className="flex items-center justify-between p-3 bg-surface-100 rounded-lg border border-surface-200">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      Y
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-text-100 text-sm font-medium">You</div>
                    <div className="text-muted-300 text-xs">you@example.com</div>
                  </div>
                </div>
                <Badge variant="secondary" className="text-xs">Owner</Badge>
              </div>

              {/* Added members */}
              {memberEmails.map((email, index) => (
                <div key={email} className="flex items-center justify-between p-3 bg-surface-100 rounded-lg border border-surface-200">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                        {email.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-text-100 text-sm">{email}</div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeMemberEmail(email)}
                    className="text-danger hover:text-danger h-8 w-8 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>

            {memberEmails.length === 0 && (
              <div className="text-center text-muted-300 text-sm py-4 bg-surface-100 rounded-lg">
                Add member email addresses to invite them to your group
              </div>
            )}
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="default">
              Create Group
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}