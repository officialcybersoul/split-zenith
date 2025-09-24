import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { UserPlus, Mail, Search, Wallet } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AddFriendModalProps {
  trigger: React.ReactNode;
}

export default function AddFriendModal({ trigger }: AddFriendModalProps) {
  const [open, setOpen] = useState(false);
  const [searchMethod, setSearchMethod] = useState<'email' | 'wallet'>('email');
  const [searchValue, setSearchValue] = useState('');
  const [foundUser, setFoundUser] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  // Mock user search
  const searchUser = async () => {
    if (!searchValue.trim()) return;
    
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      if (searchMethod === 'email' && searchValue.includes('@')) {
        setFoundUser({
          name: searchValue.split('@')[0].charAt(0).toUpperCase() + searchValue.split('@')[0].slice(1),
          email: searchValue,
          avatar: searchValue.charAt(0).toUpperCase(),
          walletAddress: '0x1234...5678'
        });
      } else if (searchMethod === 'wallet' && searchValue.startsWith('0x')) {
        setFoundUser({
          name: 'Crypto User',
          email: 'user@crypto.com',
          avatar: 'C',
          walletAddress: searchValue
        });
      } else {
        setFoundUser(null);
        toast({
          title: "User Not Found",
          description: `No user found with this ${searchMethod}.`,
          variant: "destructive"
        });
      }
      setIsSearching(false);
    }, 1500);
  };

  const sendFriendRequest = () => {
    if (!foundUser) return;

    console.log('Sending friend request to:', foundUser);
    
    toast({
      title: "Friend Request Sent!",
      description: `Friend request sent to ${foundUser.name}.`,
    });

    // Reset form
    setSearchValue('');
    setFoundUser(null);
    setOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (foundUser) {
      sendFriendRequest();
    } else {
      searchUser();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] glass-card border-surface-200">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-text-100">
            <div className="gradient-3 w-8 h-8 rounded-lg flex items-center justify-center">
              <UserPlus className="w-4 h-4 text-bg-100" />
            </div>
            Add Friend
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Search Method Toggle */}
          <div className="space-y-3">
            <Label className="text-text-100">Find by:</Label>
            <div className="flex space-x-2">
              <Button
                type="button"
                variant={searchMethod === 'email' ? 'default' : 'outline'}
                onClick={() => {
                  setSearchMethod('email');
                  setSearchValue('');
                  setFoundUser(null);
                }}
                className="flex-1 gap-2"
              >
                <Mail className="w-4 h-4" />
                Email
              </Button>
              <Button
                type="button"
                variant={searchMethod === 'wallet' ? 'default' : 'outline'}
                onClick={() => {
                  setSearchMethod('wallet');
                  setSearchValue('');
                  setFoundUser(null);
                }}
                className="flex-1 gap-2"
              >
                <Wallet className="w-4 h-4" />
                Wallet
              </Button>
            </div>
          </div>

          {/* Search Input */}
          <div className="space-y-2">
            <Label htmlFor="search" className="text-text-100">
              {searchMethod === 'email' ? 'Email Address' : 'Wallet Address'}
            </Label>
            <div className="relative">
              {searchMethod === 'email' ? (
                <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-300" />
              ) : (
                <Wallet className="absolute left-3 top-3 w-4 h-4 text-muted-300" />
              )}
              <Input
                id="search"
                type={searchMethod === 'email' ? 'email' : 'text'}
                placeholder={
                  searchMethod === 'email' 
                    ? 'friend@example.com' 
                    : '0x1234567890abcdef...'
                }
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                  setFoundUser(null);
                }}
                className="pl-10 bg-surface-100 border-surface-200 text-text-100"
                disabled={isSearching}
                required
              />
            </div>
          </div>

          {/* Search Results */}
          {foundUser && (
            <div className="space-y-3">
              <Label className="text-text-100">Found User:</Label>
              <div className="p-4 bg-surface-100 rounded-lg border border-surface-200">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {foundUser.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-text-100">{foundUser.name}</h3>
                    <p className="text-sm text-muted-300">{foundUser.email}</p>
                    {foundUser.walletAddress && (
                      <p className="text-xs text-muted-300 numeric">{foundUser.walletAddress}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="default"
              disabled={isSearching || (!searchValue.trim())}
            >
              {isSearching ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                  Searching...
                </div>
              ) : foundUser ? (
                'Send Request'
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  Search
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}