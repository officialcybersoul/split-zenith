import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Plus, 
  Users, 
  Settings, 
  Download, 
  MoreVertical,
  DollarSign,
  Calendar,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  Wallet
} from 'lucide-react';

export default function GroupDetail() {
  const [selectedTab, setSelectedTab] = useState('expenses');
  
  // Mock data
  const group = {
    name: 'House Expenses',
    members: [
      { id: 1, name: 'Alice Johnson', avatar: 'A', balance: -45.50 },
      { id: 2, name: 'Bob Smith', avatar: 'B', balance: 23.75 },
      { id: 3, name: 'Carol Davis', avatar: 'C', balance: -12.25 },
      { id: 4, name: 'You', avatar: 'Y', balance: 34.00 }
    ],
    totalBalance: 156.78,
    yourBalance: 34.00
  };

  const expenses = [
    {
      id: 1,
      title: 'Groceries - Whole Foods',
      amount: 89.50,
      paidBy: 'Alice Johnson',
      splitWith: 4,
      date: '2 hours ago',
      category: 'Food'
    },
    {
      id: 2,
      title: 'Internet Bill',
      amount: 65.00,
      paidBy: 'You',
      splitWith: 4,
      date: '1 day ago',
      category: 'Utilities'
    },
    {
      id: 3,
      title: 'House Cleaning Service',
      amount: 120.00,
      paidBy: 'Bob Smith',
      splitWith: 4,
      date: '3 days ago',
      category: 'Services'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Group Info */}
      <div className="relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 gradient-1 opacity-90" />
        <div className="relative bg-black/20 backdrop-blur-sm">
          <div className="container mx-auto px-6 py-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">{group.name}</h1>
                  <p className="text-white/80">{group.members.length} members</p>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Button variant="secondary" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Expense
                </Button>
                <Button variant="outline" className="gap-2">
                  <Users className="w-4 h-4" />
                  Invite
                </Button>
                <Button variant="ghost" size="icon">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Balance Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="glass-card border-white/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-lg">Your Balance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold numeric">
                    <span className={group.yourBalance >= 0 ? 'text-success' : 'text-danger'}>
                      {group.yourBalance >= 0 ? '+' : ''}${group.yourBalance.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-white/70 text-sm mt-1">
                    {group.yourBalance >= 0 ? 'You are owed' : 'You owe'}
                  </p>
                </CardContent>
              </Card>
              
              <Card className="glass-card border-white/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-lg">Total Spent</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white numeric">
                    ${group.totalBalance.toFixed(2)}
                  </div>
                  <p className="text-white/70 text-sm mt-1">All time</p>
                </CardContent>
              </Card>
              
              <Card className="glass-card border-white/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="wallet" className="w-full gap-2 text-sm">
                    <Wallet className="w-4 h-4" />
                    Settle Balance
                  </Button>
                  <Button variant="ghost" className="w-full gap-2 text-sm text-white hover:bg-white/10">
                    <Download className="w-4 h-4" />
                    Export Data
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="container mx-auto px-6 py-8">
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-4 lg:w-fit lg:grid-cols-4 mb-8">
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="balances">Balances</TabsTrigger>
            <TabsTrigger value="settlements">Settlements</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
          </TabsList>

          <TabsContent value="expenses" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-text-100">Recent Expenses</h2>
              <Button variant="default" className="gap-2">
                <Plus className="w-4 h-4" />
                Add Expense
              </Button>
            </div>
            
            <div className="space-y-4">
              {expenses.map((expense) => (
                <Card key={expense.id} className="glass-card border-surface-200 hover:border-primary/20 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 gradient-2 rounded-xl flex items-center justify-center">
                          <DollarSign className="w-6 h-6 text-bg-100" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-text-100">{expense.title}</h3>
                          <p className="text-sm text-muted-300">
                            Paid by {expense.paidBy} • Split {expense.splitWith} ways
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {expense.category}
                            </Badge>
                            <span className="text-xs text-muted-300">{expense.date}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-lg font-semibold text-text-100 numeric">
                            ${expense.amount.toFixed(2)}
                          </div>
                          <div className="text-sm text-muted-300 numeric">
                            ${(expense.amount / expense.splitWith).toFixed(2)} per person
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="balances" className="space-y-6">
            <h2 className="text-xl font-semibold text-text-100">Member Balances</h2>
            
            <div className="grid gap-4">
              {group.members.map((member) => (
                <Card key={member.id} className="glass-card border-surface-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {member.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-text-100">{member.name}</h3>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className={`text-lg font-semibold numeric ${member.balance >= 0 ? 'amount-positive' : 'amount-negative'}`}>
                          {member.balance >= 0 ? '+' : ''}${member.balance.toFixed(2)}
                        </div>
                        {member.balance !== 0 && (
                          <Button 
                            variant={member.balance > 0 ? "default" : "outline"}
                            size="sm"
                            className="gap-2"
                          >
                            {member.balance > 0 ? (
                              <>
                                <ArrowDownLeft className="w-3 h-3" />
                                Request
                              </>
                            ) : (
                              <>
                                <ArrowUpRight className="w-3 h-3" />
                                Pay
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settlements" className="space-y-6">
            <h2 className="text-xl font-semibold text-text-100">Suggested Settlements</h2>
            
            <Card className="glass-card border-surface-200">
              <CardContent className="p-6">
                <div className="text-center py-8">
                  <CreditCard className="w-12 h-12 text-muted-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-text-100 mb-2">No Settlements Needed</h3>
                  <p className="text-muted-300">All balances are settled up!</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="members" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-text-100">Group Members</h2>
              <Button variant="outline" className="gap-2">
                <Plus className="w-4 h-4" />
                Invite Member
              </Button>
            </div>
            
            <div className="grid gap-4">
              {group.members.map((member) => (
                <Card key={member.id} className="glass-card border-surface-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {member.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-text-100">{member.name}</h3>
                          <p className="text-sm text-muted-300">
                            {member.id === 4 ? 'You' : 'Member since Jan 2024'}
                          </p>
                        </div>
                      </div>
                      
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}