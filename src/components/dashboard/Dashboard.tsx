import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Users, 
  Wallet, 
  Search, 
  Bell, 
  User,
  ArrowUpRight,
  ArrowDownLeft,
  TrendingUp,
  Download,
  DollarSign,
  UserPlus
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Dashboard() {
  const [walletConnected] = useState(true);
  
  // Mock data
  const netBalance = 245.67;
  const groups = [
    { id: 1, name: 'House Expenses', members: 4, balance: -125.50, gradient: 'gradient-1' },
    { id: 2, name: 'Trip to Vegas', members: 6, balance: 89.20, gradient: 'gradient-2' },
    { id: 3, name: 'Office Lunch', members: 8, balance: -45.30, gradient: 'gradient-3' },
  ];
  
  const recentActivity = [
    { id: 1, user: 'Alice', action: 'paid $45.00 for Dinner', time: '2 hours ago', avatar: 'A' },
    { id: 2, user: 'Bob', action: 'added expense Groceries $89.50', time: '4 hours ago', avatar: 'B' },
    { id: 3, user: 'Carol', action: 'settled $125.00 with Alice', time: '1 day ago', avatar: 'C' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-surface-200 bg-surface-100/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="gradient-1 w-10 h-10 rounded-xl flex items-center justify-center">
                <Wallet className="w-6 h-6 text-bg-100" />
              </div>
              <h1 className="text-xl font-bold text-text-100">SplitWeb3</h1>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-300" />
                <Input
                  placeholder="Search groups, friends, expenses..."
                  className="pl-10 bg-surface-100 border-surface-200 text-text-100"
                />
              </div>
            </div>

            {/* Right actions */}
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              
              {walletConnected && (
                <div className="flex items-center space-x-2 px-3 py-2 bg-surface-100 rounded-lg border border-surface-200">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                  <span className="text-sm text-muted-300 numeric">0x1234...5678</span>
                </div>
              )}
              
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Balance Summary */}
        <Card className="mb-8 glass-card border-surface-200 relative overflow-hidden">
          <div className="absolute inset-0 gradient-1 opacity-5" />
          <CardHeader>
            <CardTitle className="text-text-100">Your Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-4xl font-bold numeric mb-2">
                  <span className={netBalance >= 0 ? 'amount-positive' : 'amount-negative'}>
                    ${Math.abs(netBalance).toFixed(2)}
                  </span>
                </div>
                <p className="text-muted-300">
                  {netBalance >= 0 ? 'You are owed' : 'You owe'}
                </p>
              </div>
              
              <div className="flex space-x-3">
                <Button variant="default" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Expense
                </Button>
                <Button variant="outline" className="gap-2">
                  <Users className="w-4 h-4" />
                  Create Group
                </Button>
                <Button variant="wallet" className="gap-2">
                  <Wallet className="w-4 h-4" />
                  Settle
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Button variant="outline" className="h-20 flex-col gap-2">
            <Plus className="w-6 h-6" />
            <span>Add Expense</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col gap-2">
            <Users className="w-6 h-6" />
            <span>Create Group</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col gap-2">
            <UserPlus className="w-6 h-6" />
            <span>Add Friend</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col gap-2">
            <Download className="w-6 h-6" />
            <span>Export CSV</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Groups */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-text-100">Your Groups</h2>
              <Button variant="ghost" className="gap-2">
                <Plus className="w-4 h-4" />
                New Group
              </Button>
            </div>
            
            <div className="grid gap-4">
              {groups.map((group) => (
                <Card key={group.id} className="glass-card border-surface-200 hover:border-primary/20 transition-colors cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 ${group.gradient} rounded-xl flex items-center justify-center`}>
                          <Users className="w-6 h-6 text-bg-100" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-text-100">{group.name}</h3>
                          <p className="text-sm text-muted-300">{group.members} members</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className={`text-lg font-semibold numeric ${group.balance >= 0 ? 'amount-positive' : 'amount-negative'}`}>
                          {group.balance >= 0 ? '+' : ''}${group.balance.toFixed(2)}
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          {group.balance >= 0 ? (
                            <ArrowUpRight className="w-4 h-4 text-success" />
                          ) : (
                            <ArrowDownLeft className="w-4 h-4 text-danger" />
                          )}
                          <span className="text-sm text-muted-300">
                            {group.balance >= 0 ? 'You are owed' : 'You owe'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-text-100">Recent Activity</h2>
              <TrendingUp className="w-5 h-5 text-muted-300" />
            </div>
            
            <Card className="glass-card border-surface-200">
              <CardContent className="p-0">
                <div className="divide-y divide-surface-200">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="p-4 hover:bg-surface-100/50 transition-colors">
                      <div className="flex items-start space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                            {activity.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-text-100">
                            <span className="font-medium">{activity.user}</span>{' '}
                            {activity.action}
                          </p>
                          <p className="text-xs text-muted-300 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}