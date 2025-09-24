import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, Mail, Lock, Chrome } from 'lucide-react';
import cryptoHeroBg from '@/assets/crypto-hero-bg.jpg';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [walletConnected, setWalletConnected] = useState(false);

  const handleWalletConnect = () => {
    // Mock wallet connection
    setWalletConnected(true);
    setTimeout(() => {
      alert('Wallet connected: 0x1234...5678');
    }, 1000);
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock sign in
    console.log('Signing in with:', { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background gradient effects */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${cryptoHeroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-bg-100 via-bg-200 to-bg-100">
        <div className="absolute top-20 left-20 w-96 h-96 gradient-1 rounded-full opacity-10 blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-20 right-20 w-96 h-96 gradient-2 rounded-full opacity-10 blur-3xl animate-pulse-soft" />
      </div>
      
      <Card className="w-full max-w-md mx-4 glass-card border-surface-200">
        <CardHeader className="text-center space-y-2">
          <div className="gradient-1 w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <Wallet className="w-8 h-8 text-bg-100" />
          </div>
          <CardTitle className="text-2xl font-bold text-text-100">
            Sign In to SplitWeb3
          </CardTitle>
          <CardDescription className="text-muted-300">
            Enter your credentials or connect your wallet
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Wallet Connect Section */}
          <div className="space-y-3">
            <Button 
              onClick={handleWalletConnect}
              variant="wallet" 
              className="w-full"
              disabled={walletConnected}
            >
              <Wallet className="w-4 h-4" />
              {walletConnected ? 'Wallet Connected' : 'Connect Wallet'}
            </Button>
            
            {walletConnected && (
              <div className="text-center text-sm text-muted-300">
                Connected: 0x1234...5678
              </div>
            )}
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-surface-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-300">Or continue with</span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-300" />
                <Input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-surface-100 border-surface-200 text-text-100 focus:border-primary"
                  required
                />
              </div>
              
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-300" />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-surface-100 border-surface-200 text-text-100 focus:border-primary"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="w-full">
              <Chrome className="w-4 h-4" />
              Google
            </Button>
            <Button variant="outline" className="w-full">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              Apple
            </Button>
          </div>

          <div className="text-center space-y-2">
            <a href="#" className="text-sm text-muted-300 hover:text-text-100 transition-colors">
              Forgot your password?
            </a>
            <div className="text-sm text-muted-300">
              Don't have an account?{' '}
              <a href="#" className="text-primary hover:text-primary/80 transition-colors">
                Sign up
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}