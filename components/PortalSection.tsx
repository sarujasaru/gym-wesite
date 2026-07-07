'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useGym } from '@/context/GymContext';

import { LogIn, UserPlus, Info } from 'lucide-react';

const MemberDashboard = dynamic(
  () => import('./MemberDashboard'),
  {
    ssr: false,
    loading: () => (
      <div className="py-8 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-pulse">
        {/* Welcome Banner Skeleton */}
        <div className="bg-brand-dark-card border border-brand-primary/20 rounded-3xl p-6 md:p-8 h-32 flex items-center justify-between">
          <div className="space-y-3 w-1/2">
            <div className="h-4 bg-brand-dark rounded w-1/4" />
            <div className="h-8 bg-brand-dark rounded w-3/4" />
          </div>
          <div className="h-12 bg-brand-dark rounded-xl w-32" />
        </div>

        {/* Dashboard Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left profile and plans */}
          <div className="space-y-8 lg:col-span-1">
            <div className="bg-brand-dark-card border border-brand-border rounded-3xl p-6 h-48 space-y-4">
              <div className="h-6 bg-brand-dark rounded w-1/2" />
              <div className="space-y-2 pt-2">
                <div className="h-4 bg-brand-dark rounded w-full" />
                <div className="h-4 bg-brand-dark rounded w-5/6" />
                <div className="h-4 bg-brand-dark rounded w-2/3" />
              </div>
            </div>
            <div className="bg-brand-dark-card border border-brand-border rounded-3xl p-6 h-56 space-y-4">
              <div className="h-6 bg-brand-dark rounded w-1/2" />
              <div className="h-16 bg-brand-dark rounded-2xl w-full" />
              <div className="h-10 bg-brand-dark rounded-xl w-full" />
            </div>
          </div>

          {/* Right bookings and billing */}
          <div className="space-y-8 lg:col-span-2">
            <div className="bg-brand-dark-card border border-brand-border rounded-3xl p-6 md:p-8 h-80 space-y-4">
              <div className="flex justify-between items-center">
                <div className="h-6 bg-brand-dark rounded w-1/3" />
                <div className="h-4 bg-brand-dark rounded w-1/6" />
              </div>
              <div className="space-y-3 pt-4">
                <div className="h-12 bg-brand-dark rounded-2xl w-full" />
                <div className="h-12 bg-brand-dark rounded-2xl w-full" />
              </div>
            </div>
            <div className="bg-brand-dark-card border border-brand-border rounded-3xl p-6 md:p-8 h-[350px] space-y-4">
              <div className="h-6 bg-brand-dark rounded w-1/4" />
              <div className="h-20 bg-brand-dark rounded-2xl w-full" />
              <div className="h-24 bg-brand-dark rounded-2xl w-full" />
            </div>
          </div>
        </div>
      </div>
    )
  }
);

interface PortalSectionProps {
  setActiveTab: (tab: string) => void;
}

export default function PortalSection({ setActiveTab }: PortalSectionProps) {
  const { currentUser, login, register, plans } = useGym();
  
  // Tab states: 'login' | 'register'
  const [formType, setFormType] = useState<'login' | 'register'>('login');

  // Input states
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedPlanId, setSelectedPlanId] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Check if a plan was pre-selected from pricing page
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedPlanId = window.localStorage.getItem('selected_plan_id');
      if (savedPlanId) {
        setTimeout(() => {
          setSelectedPlanId(savedPlanId);
          setFormType('register');
          window.localStorage.removeItem('selected_plan_id');
        }, 0);
      }
    }
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!email) {
      setErrorMsg('Please enter your registered email address.');
      return;
    }

    const result = login(email, 'member');
    if (result.success) {
      setSuccessMsg('Login successful! Loading dashboard...');
      // Clear fields
      setEmail('');
    } else {
      setErrorMsg(result.error || 'Login failed.');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!name || !email || !phone) {
      setErrorMsg('Please fill in all required fields (Name, Email, Phone).');
      return;
    }

    const result = register(name, email, phone, selectedPlanId || undefined);
    if (result.success) {
      setSuccessMsg('Registration successful! Welcome to the club.');
      // Clear fields
      setName('');
      setEmail('');
      setPhone('');
      setSelectedPlanId('');
    } else {
      setErrorMsg(result.error || 'Registration failed.');
    }
  };

  const setTestMemberCredentials = () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setEmail('janaka@gmail.com');
  };

  // If already logged in, show member dashboard
  if (currentUser) {
    return <MemberDashboard setActiveTab={setActiveTab} />;
  }

  return (
    <div className="py-8 pb-16 max-w-lg mx-auto px-4 sm:px-6">
      <div className="bg-brand-dark-card border border-brand-border rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        
        {/* Toggle Form Type */}
        <div className="flex bg-brand-dark p-1.5 rounded-2xl border border-brand-border">
          <button
            onClick={() => {
              setFormType('login');
              setErrorMsg(null);
              setSuccessMsg(null);
            }}
            className={`w-1/2 py-3 rounded-xl font-display text-xs sm:text-sm font-bold tracking-wide transition-all ${
              formType === 'login'
                ? 'bg-brand-primary text-white shadow-sm'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            MEMBER LOGIN
          </button>
          <button
            onClick={() => {
              setFormType('register');
              setErrorMsg(null);
              setSuccessMsg(null);
            }}
            className={`w-1/2 py-3 rounded-xl font-display text-xs sm:text-sm font-bold tracking-wide transition-all ${
              formType === 'register'
                ? 'bg-brand-primary text-white shadow-sm'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            MEMBER SIGN UP
          </button>
        </div>

        {/* Message Feeds */}
        {errorMsg && (
              <div className="bg-rose-50 border border-rose-300 text-rose-700 px-4 py-3 rounded-xl text-xs sm:text-sm font-medium">
            {errorMsg}
          </div>
        )}
        {successMsg && (
              <div className="bg-emerald-50 border border-emerald-300 text-emerald-700 px-4 py-3 rounded-xl text-xs sm:text-sm font-medium">
            {successMsg}
          </div>
        )}

        {/* Login Form */}
        {formType === 'login' && (
          <div className="space-y-6">
            <div className="text-center space-y-1">
              <h2 className="font-display text-xl sm:text-2xl font-black text-brand-cream">Welcome back</h2>
              <p className="text-zinc-600 text-xs sm:text-sm">Sign in to view your membership, book classes, and track your payments.</p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4" id="login-form">
              <div className="space-y-1">
                <label htmlFor="login-email" className="text-[10px] font-mono font-black text-zinc-500 tracking-wider block uppercase">Email Address</label>
                <input
                  type="text"
                  id="login-email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. janaka@gmail.com"
                  className="w-full bg-brand-dark border border-brand-border focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none px-4 py-3 rounded-xl text-brand-cream font-sans text-sm transition-all"
                />
              </div>

              <button
                type="submit"
                  className="bg-brand-primary hover:bg-brand-primary-hover text-white font-display font-bold tracking-wide py-4 rounded-xl shadow-md transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer uppercase text-sm"
              >
                <LogIn className="h-4 w-4" />
                <span>SIGN IN TO DASHBOARD</span>
              </button>
            </form>

            {/* Test account trigger */}
            <div className="bg-brand-primary/10 border border-brand-border rounded-2xl p-4 space-y-3">
              <div className="flex items-center space-x-1.5 text-brand-primary font-mono text-[10px] font-black tracking-wider uppercase">
                <Info className="h-4 w-4" />
                <span>Test Credentials (Instant Login)</span>
              </div>
              <button
                onClick={setTestMemberCredentials}
                className="w-full bg-brand-dark hover:bg-brand-primary/10 border border-brand-border hover:border-brand-primary text-zinc-700 hover:text-brand-primary text-xs font-sans font-bold py-2.5 px-3 rounded-xl transition-all"
              >
                Load Test Member Account
              </button>
            </div>
          </div>
        )}

        {/* Register Form */}
        {formType === 'register' && (
          <div className="space-y-6">
            <div className="text-center space-y-1">
              <h2 className="font-display text-xl sm:text-2xl font-black text-brand-cream">Join Ceylon Iron Club</h2>
              <p className="text-zinc-600 text-xs sm:text-sm">Enter details below. Gain immediate active credentials.</p>
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-4" id="register-form">
              <div className="space-y-1">
                <label htmlFor="reg-name" className="text-[10px] font-mono font-black text-zinc-500 tracking-wider block uppercase">Full Name</label>
                <input
                  type="text"
                  id="reg-name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter full name"
                  className="w-full bg-brand-dark border border-brand-border focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none px-4 py-3 rounded-xl text-brand-cream font-sans text-sm transition-all"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="reg-email" className="text-[10px] font-mono font-black text-zinc-500 tracking-wider block uppercase">Email Address</label>
                <input
                  type="email"
                  id="reg-email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. saruja@gmail.com"
                  className="w-full bg-brand-dark border border-brand-border focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none px-4 py-3 rounded-xl text-brand-cream font-sans text-sm transition-all"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="reg-phone" className="text-[10px] font-mono font-black text-zinc-500 tracking-wider block uppercase">Phone Number</label>
                <input
                  type="tel"
                  id="reg-phone"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +94 77 123 4567"
                  className="w-full bg-brand-dark border border-brand-border focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none px-4 py-3 rounded-xl text-brand-cream font-sans text-sm transition-all"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="reg-plan" className="text-[10px] font-mono font-black text-zinc-500 tracking-wider block uppercase">Choose Membership Plan (Optional)</label>
                <select
                  id="reg-plan"
                  value={selectedPlanId}
                  onChange={(e) => setSelectedPlanId(e.target.value)}
                  className="w-full bg-brand-dark border border-brand-border focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none px-4 py-3 rounded-xl text-brand-cream font-sans text-sm transition-all cursor-pointer"
                >
                  <option value="" className="bg-brand-dark text-brand-cream">No Plan Selected (Just Register)</option>
                  {plans.map((p) => (
                    <option key={p._id} value={p._id} className="bg-brand-dark text-brand-cream">
                      {p.name} - Rs. {p.priceLKR.toLocaleString()} / {p.billingPeriod}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                  className="w-full bg-brand-primary hover:bg-brand-primary-hover text-white font-display font-bold tracking-wide py-4 rounded-xl shadow-md transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer uppercase text-sm mt-2"
              >
                <UserPlus className="h-4 w-4" />
                <span>CONFIRM REGISTRATION</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
