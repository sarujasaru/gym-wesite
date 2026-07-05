'use client';

import React, { useState } from 'react';
import { useGym } from '@/context/GymContext';
import { Dumbbell, Menu, X, LogIn, User, ShieldAlert } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const { currentUser, logout } = useGym();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-brand-dark/95 border-b border-brand-primary/20 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => handleNavClick('home')}
            id="nav-logo"
          >
            <div className="bg-brand-primary p-2 rounded-lg text-white transition-transform group-hover:scale-105 duration-300">
              <Dumbbell className="h-6 w-6" />
            </div>
            <div>
              <span className="font-display text-lg sm:text-xl font-bold tracking-wider text-brand-cream block leading-none">
                CEYLON IRON
              </span>
              <span className="text-[10px] text-brand-accent tracking-[0.25em] font-mono font-bold block uppercase mt-1">
                Strength Club • SL
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" id="desktop-menu">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 rounded-md font-display text-sm font-semibold tracking-wide transition-all duration-200 ${
                  activeTab === item.id
                    ? 'text-brand-primary bg-brand-primary/10 border-b-2 border-brand-primary rounded-b-none'
                    : 'text-zinc-600 hover:text-brand-cream hover:bg-brand-primary/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action buttons */}
          <div className="hidden md:flex items-center space-x-2" id="nav-actions">
            <ThemeToggle />
            {currentUser ? (
              <div className="flex items-center space-x-3">
                <button
                  id="nav-portal-btn"
                  onClick={() => handleNavClick('portal')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-display text-sm font-semibold border transition-all duration-300 ${
                    activeTab === 'portal'
                      ? 'bg-brand-primary text-white border-brand-primary'
                      : 'bg-transparent border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white'
                  }`}
                >
                  {currentUser.role === 'admin' ? (
                    <>
                      <ShieldAlert className="h-4 w-4 text-brand-accent" />
                      <span>Admin Console</span>
                    </>
                  ) : (
                    <>
                      <User className="h-4 w-4 text-brand-accent" />
                      <span>My Profile</span>
                    </>
                  )}
                </button>
                <button
                  id="logout-btn"
                  onClick={() => {
                    logout();
                    handleNavClick('home');
                  }}
                  className="text-xs font-mono font-semibold tracking-wider text-zinc-500 hover:text-brand-primary transition-colors cursor-pointer"
                >
                  LOGOUT
                </button>
              </div>
            ) : (
              <button
                id="login-btn-header"
                onClick={() => handleNavClick('portal')}
                className="flex items-center space-x-2 bg-brand-primary hover:bg-brand-primary-hover  text-white font-display text-sm font-bold tracking-wide px-5 py-2.5 rounded-lg transition-all shadow-md hover:shadow-brand-primary/20 hover:scale-[1.02] duration-300"
              >
                <LogIn className="h-4 w-4" />
                <span>JOIN THE CLUB</span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-1">
            <ThemeToggle />
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-zinc-600 hover:text-brand-cream p-2 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-brand-dark-card border-b border-brand-primary/20 py-4 px-4 space-y-2 animate-fade-in" id="mobile-menu">
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`mobile-nav-${item.id}`}
              onClick={() => handleNavClick(item.id)}
              className={`block w-full text-left px-4 py-3 rounded-lg font-display text-base font-semibold tracking-wide transition-all ${
                activeTab === item.id
                  ? 'text-brand-primary bg-brand-primary/10 border-l-4 border-brand-primary'
                  : 'text-zinc-700 hover:text-brand-cream hover:bg-brand-primary/5'
              }`}
            >
              {item.label}
            </button>
          ))}
          <hr className="border-brand-primary/10 my-3" />
          {currentUser ? (
            <div className="space-y-3 px-4 pt-2">
              <div className="flex items-center space-x-2 text-zinc-700">
                {currentUser.role === 'admin' ? (
                  <ShieldAlert className="h-5 w-5 text-brand-accent" />
                ) : (
                  <User className="h-5 w-5 text-brand-accent" />
                )}
                <span className="font-display font-medium text-sm">{currentUser.name}</span>
              </div>
              <button
                id="mobile-portal-btn"
                onClick={() => handleNavClick('portal')}
                className="w-full text-center bg-brand-primary/20 hover:bg-brand-primary text-brand-cream border border-brand-primary/50 py-2.5 rounded-lg font-display text-sm font-semibold transition-all"
              >
                {currentUser.role === 'admin' ? 'Admin Console' : 'My Dashboard'}
              </button>
              <button
                id="mobile-logout-btn"
                onClick={() => {
                  logout();
                  handleNavClick('home');
                }}
                className="block w-full text-center text-xs font-mono font-semibold tracking-wider text-zinc-500 hover:text-brand-primary py-2"
              >
                LOGOUT
              </button>
            </div>
          ) : (
            <div className="px-4 pt-2">
              <button
                id="mobile-login-btn"
                onClick={() => handleNavClick('portal')}
                className="w-full flex items-center justify-center space-x-2 bg-brand-primary hover:bg-brand-primary-hover text-brand-cream font-display font-bold text-sm tracking-wide py-3 rounded-lg transition-all"
              >
                <LogIn className="h-4 w-4" />
                <span>JOIN THE CLUB</span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
