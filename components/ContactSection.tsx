'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Clock } from 'lucide-react';

export default function ContactSection() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', branch: 'Colombo 07', message: '' });

  const branches = [
    { name: 'Colombo 07 (Head Office)', address: 'No. 45, Independence Avenue, Colombo 07', phone: '+94 11 234 5678', hours: '05:00 AM - 10:00 PM' },
    { name: 'Galle Fort Branch', address: 'No. 12, Pedlar Street, Galle Fort, Galle', phone: '+94 91 555 1234', hours: '05:30 AM - 09:30 PM' },
    { name: 'Kandy Lakeview Branch', address: 'No. 88, Anagarika Dharmapala Mawatha, Kandy', phone: '+94 81 999 4321', hours: '05:30 AM - 09:30 PM' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({ name: '', email: '', phone: '', branch: 'Colombo 07', message: '' });
      }, 5000);
    }
  };

  return (
    <div className="space-y-16 py-8 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-mono font-black text-brand-primary tracking-widest uppercase block">
          GET IN TOUCH
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-normal italic text-brand-cream tracking-tight">
          Contact Our Branches
        </h1>
        <p className="text-brand-accent max-w-2xl mx-auto text-sm sm:text-base">
          Have queries about membership suspension, customized diet planning, or corporate rates? Send us a direct line or drop by.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
        {/* Contact info and Branch locator */}
        <div className="space-y-8 flex flex-col justify-between">
          <div className="space-y-6">
            <h2 className="font-display text-2xl font-bold text-brand-cream">Branch Locations</h2>
            <div className="space-y-6">
              {branches.map((branch, idx) => (
                <div 
                  key={idx}
                  className="bg-brand-dark-card border border-brand-border hover:border-brand-primary/30 rounded-2xl p-5 md:p-6 space-y-3 shadow-sm transition-all duration-300"
                >
                  <h3 className="font-display text-lg font-bold text-brand-primary flex items-center space-x-2">
                    <MapPin className="h-5 w-5" />
                    <span>{branch.name}</span>
                  </h3>
                  
                  <div className="space-y-2 font-mono text-[11px] sm:text-xs text-zinc-600 font-bold pl-7">
                    <p className="flex items-center space-x-2">
                      <span className="text-zinc-500">Address:</span>
                      <span className="text-zinc-700">{branch.address}</span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <span className="text-zinc-500">Phone:</span>
                      <a href={`tel:${branch.phone}`} className="text-brand-primary hover:underline">{branch.phone}</a>
                    </p>
                    <p className="flex items-center space-x-2">
                      <span className="text-zinc-500">Hours:</span>
                      <span className="text-zinc-700">{branch.hours} (Daily)</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-brand-dark-card border border-brand-border text-brand-cream rounded-2xl p-6 space-y-4">
            <h4 className="font-display font-bold text-brand-accent flex items-center space-x-1.5">
              <Clock className="h-4 w-4" />
              <span>National Support Hotline</span>
            </h4>
            <p className="text-zinc-600 text-xs sm:text-sm">
              Need instant support? Call our main concierge line for emergency lock freezes or payment queries: <strong className="text-brand-cream">+94 11 234 5000</strong>. Available 06:00 AM - 08:00 PM.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-brand-dark-card border border-brand-border rounded-3xl p-6 md:p-10 shadow-sm flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-2xl font-bold text-brand-cream">Send Message</h2>
              <p className="text-zinc-600 text-xs sm:text-sm">We respond to online inquiries within 3 hours.</p>
            </div>

            {formSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-8 text-center space-y-4 animate-scale-up py-16">
                <CheckCircle className="h-14 w-14 text-emerald-500 mx-auto" />
                <h3 className="font-display text-xl font-bold text-emerald-700">Message Delivered Successfully!</h3>
                <p className="text-zinc-600 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
                  Ayubowan! We have received your query. A concierge specialist from the {formData.branch} branch will call you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" id="contact-form">
                <div className="space-y-1">
                  <label htmlFor="form-name" className="text-[10px] font-mono font-black text-zinc-500 tracking-wider block uppercase">Full Name</label>
                  <input
                    type="text"
                    id="form-name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full bg-brand-dark border border-brand-border focus:border-brand-primary focus:ring-1 focus:ring-brand-primary text-brand-cream outline-none px-4 py-3 rounded-xl font-sans text-sm transition-all placeholder:text-zinc-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="form-email" className="text-[10px] font-mono font-black text-zinc-500 tracking-wider block uppercase">Email Address</label>
                    <input
                      type="email"
                      id="form-email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. saruja@gmail.com"
                      className="w-full bg-brand-dark border border-brand-border focus:border-brand-primary focus:ring-1 focus:ring-brand-primary text-brand-cream outline-none px-4 py-3 rounded-xl font-sans text-sm transition-all placeholder:text-zinc-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="form-phone" className="text-[10px] font-mono font-black text-zinc-500 tracking-wider block uppercase">Phone Number</label>
                    <input
                      type="tel"
                      id="form-phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +94 77 123 4567"
                      className="w-full bg-brand-dark border border-brand-border focus:border-brand-primary focus:ring-1 focus:ring-brand-primary text-brand-cream outline-none px-4 py-3 rounded-xl font-sans text-sm transition-all placeholder:text-zinc-400"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="form-branch" className="text-[10px] font-mono font-black text-zinc-500 tracking-wider block uppercase">Target Branch</label>
                  <select
                    id="form-branch"
                    value={formData.branch}
                    onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                    className="w-full bg-brand-dark border border-brand-border focus:border-brand-primary focus:ring-1 focus:ring-brand-primary text-brand-cream outline-none px-4 py-3 rounded-xl font-sans text-sm transition-all cursor-pointer"
                  >
                    <option value="Colombo 07">Colombo 07 (Head Office)</option>
                    <option value="Galle Fort">Galle Fort Branch</option>
                    <option value="Kandy Lakeview">Kandy Lakeview Branch</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label htmlFor="form-msg" className="text-[10px] font-mono font-black text-zinc-500 tracking-wider block uppercase">Your Query / Message</label>
                  <textarea
                    id="form-msg"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe how we can help you..."
                    className="w-full bg-brand-dark border border-brand-border focus:border-brand-primary focus:ring-1 focus:ring-brand-primary text-brand-cream outline-none px-4 py-3 rounded-xl font-sans text-sm transition-all placeholder:text-zinc-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-primary hover:bg-brand-primary-hover text-white font-display font-bold tracking-wide py-4 rounded-xl shadow-md transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer uppercase mt-2 text-sm"
                >
                  <Send className="h-4 w-4" />
                  <span>SEND INQUIRY</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
