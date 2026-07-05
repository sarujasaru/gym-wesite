'use client';

import React, { useState } from 'react';
import { useGym } from '@/context/GymContext';
import { 
  User, Mail, Phone, Calendar, Dumbbell, CalendarRange, 
  CreditCard, Sparkles, LogOut, CheckCircle, ArrowUpRight, PhoneCall, X, Lock
} from 'lucide-react';

export default function MemberDashboard({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const { currentUser, logout, bookings, schedules, trainers, plans, editMemberPlan, payments, addPayment } = useGym();
  
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [selectedUpgradePlanId, setSelectedUpgradePlanId] = useState('');

  // Payment modal state
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentForm, setPaymentForm] = useState({
    cardholderName: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    paymentMethod: 'Visa',
  });

  if (!currentUser) return null;

  // Filter bookings for this member
  const memberBookings = bookings.filter(b => b.memberEmail.toLowerCase() === currentUser.email.toLowerCase());

  // Filter payments for this member
  const memberPayments = payments.filter(p => p.memberEmail.toLowerCase() === currentUser.email.toLowerCase());

  const activePlan = plans.find(p => p._id === currentUser.planId);

  const handleUpgradePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUpgradePlanId && currentUser.memberId) {
      editMemberPlan(currentUser.memberId, selectedUpgradePlanId);
      setSuccessMsg('Your membership tier has been updated successfully!');
      setTimeout(() => setSuccessMsg(null), 3000);
    }
  };

  const formatCardNumber = (val: string) =>
    val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser?.planId) return;
    const plan = plans.find(p => p._id === currentUser.planId);
    if (!plan) return;

    setIsProcessing(true);
    setTimeout(() => {
      addPayment({
        memberName: currentUser.name,
        memberEmail: currentUser.email,
        planName: plan.name,
        amountLKR: plan.priceLKR,
        paymentMethod: `${paymentForm.paymentMethod} ending ${paymentForm.cardNumber.replace(/\s/g, '').slice(-4)}`,
        status: 'completed',
      });
      setIsProcessing(false);
      setShowPaymentModal(false);
      setPaymentForm({ cardholderName: '', cardNumber: '', expiryMonth: '', expiryYear: '', cvv: '', paymentMethod: 'Visa' });
      setSuccessMsg(`Payment of Rs. ${plan.priceLKR.toLocaleString()} processed successfully!`);
      setTimeout(() => setSuccessMsg(null), 5000);
    }, 2000);
  };

  return (
    <div className="py-8 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Welcome Banner */}
      <div className="bg-brand-dark-card border border-brand-primary/20 rounded-3xl p-6 md:p-8 text-brand-cream flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-block bg-brand-primary/20 text-brand-accent text-xs font-mono font-bold tracking-widest px-3 py-1 rounded">
            MEMBER PANEL
          </div>
          <h1 className="font-display text-2xl sm:text-4xl font-black">
            Welcome, {currentUser.name}! 👋
          </h1>
          <p className="text-zinc-600 text-xs sm:text-sm">
            Welcome to your Ceylon Iron Club membership suite. Manage your schedules, upgrades, and bills.
          </p>
        </div>

        <button
          onClick={() => {
            logout();
            setActiveTab('home');
          }}
          className="flex items-center space-x-2 bg-brand-primary/10 hover:bg-brand-primary border border-brand-primary/25 hover:border-brand-primary text-brand-primary hover:text-white px-5 py-3 rounded-xl font-display text-sm font-bold transition-all"
        >
          <LogOut className="h-4 w-4" />
          <span>LOGOUT SESSION</span>
        </button>
      </div>

      {/* Success Notification */}
      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-700 px-5 py-4 rounded-xl text-xs sm:text-sm font-medium flex items-center space-x-2 animate-fade-in">
          <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left column: Member Profile details & Plan Control */}
        <div className="space-y-8 lg:col-span-1">
          
          {/* Profile Card */}
          <div className="bg-brand-dark-card border border-brand-border rounded-3xl p-6 space-y-6 shadow-sm">
            <h3 className="font-display text-lg font-bold text-brand-cream border-b border-brand-border pb-3">My Account Details</h3>
            
            <div className="space-y-4 font-mono text-[11px] sm:text-xs font-bold text-zinc-600">
              <div className="flex justify-between items-center py-1 border-b border-brand-border">
                <span className="text-zinc-500">EMAIL:</span>
                <span className="text-zinc-700">{currentUser.email}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-brand-border">
                <span className="text-zinc-500">PHONE:</span>
                <span className="text-zinc-700">{currentUser.phone}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-brand-border">
                <span className="text-zinc-500">MEMBER ID:</span>
                <span className="text-zinc-700">{currentUser.memberId || 'MEM_MOCK'}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-zinc-500">CURRENT STATUS:</span>
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[10px]">ACTIVE</span>
              </div>
            </div>
          </div>

          {/* Active Plan details & change tier */}
          <div className="bg-brand-dark-card border border-brand-border rounded-3xl p-6 space-y-6 shadow-sm">
            <h3 className="font-display text-lg font-bold text-brand-cream border-b border-brand-border pb-3">My Membership Plan</h3>
            
            {activePlan ? (
              <div className="space-y-4">
                <div className="p-4 bg-brand-primary/10 rounded-2xl border border-brand-border space-y-2">
                  <span className="text-[10px] font-mono font-black text-brand-primary tracking-wider uppercase block">CURRENT TIER</span>
                  <div className="font-display font-black text-lg text-brand-cream">{activePlan.name}</div>
                  <div className="font-mono text-xs font-bold text-zinc-600">Rs. {activePlan.priceLKR.toLocaleString()} / month</div>
                </div>

                {/* Upgrade/Change Plan form */}
                <form onSubmit={handleUpgradePlan} className="space-y-3 pt-2">
                  <label htmlFor="upgrade-plan" className="text-[10px] font-mono font-black text-zinc-500 tracking-wider block uppercase">Change / Upgrade Tier</label>
                  <select
                    id="upgrade-plan"
                    value={selectedUpgradePlanId}
                    onChange={(e) => setSelectedUpgradePlanId(e.target.value)}
                    className="w-full bg-brand-dark border border-brand-border px-3 py-2.5 rounded-xl text-brand-cream font-sans text-xs outline-none cursor-pointer"
                  >
                    <option value="" className="bg-brand-dark text-brand-cream">-- Choose New Tier --</option>
                    {plans.filter(p => p._id !== currentUser.planId).map((p) => (
                      <option key={p._id} value={p._id} className="bg-brand-dark text-brand-cream">
                        {p.name} (Rs. {p.priceLKR.toLocaleString()})
                      </option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    disabled={!selectedUpgradePlanId}
                    className="w-full bg-brand-primary hover:bg-brand-primary-hover text-white text-xs font-mono font-bold tracking-widest py-3 rounded-xl transition-all disabled:bg-brand-border disabled:text-zinc-400 border border-brand-primary/20 cursor-pointer"
                  >
                    CHANGE MEMBERSHIP TIER
                  </button>
                </form>
              </div>
            ) : (
              <div className="space-y-4 text-center py-4">
                <p className="text-zinc-500 text-xs">No active pricing tier selected. Choose a plan to unlock bookings.</p>
                <button
                  onClick={() => setActiveTab('schedule')}
                  className="bg-brand-primary text-white text-xs font-mono font-bold px-4 py-2.5 rounded-xl shadow-sm"
                >
                  EXPLORE TIER PLANS
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Columns: Bookings list & payment tracker */}
        <div className="space-y-8 lg:col-span-2">
          
          {/* Active Bookings List */}
          <div className="bg-brand-dark-card border border-brand-border rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-brand-border pb-3">
              <h3 className="font-display text-lg font-bold text-brand-cream">My Booked Coaching Sessions</h3>
              <button
                onClick={() => setActiveTab('schedule')}
                className="text-xs font-mono font-bold text-brand-primary hover:underline flex items-center space-x-1"
              >
                <span>BOOK CLASS</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {memberBookings.length > 0 ? (
              <div className="space-y-4">
                {memberBookings.map((bk) => {
                  const schedule = schedules.find(s => s._id === bk.scheduleId);
                  const trainer = schedule ? trainers.find(t => t._id === schedule.trainerId) : null;
                  return (
                    <div 
                      key={bk._id}
                      className="border border-brand-border hover:border-brand-primary/30 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all duration-200"
                    >
                      <div className="space-y-1">
                        <div className="font-display font-bold text-brand-cream text-base">
                          {schedule ? schedule.className : 'Private Workout'}
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-zinc-500 text-xs font-medium">
                          <span>Day: <strong className="text-zinc-700">{schedule?.dayOfWeek}</strong></span>
                          <span>Time: <strong className="text-zinc-700">{schedule?.startTime}</strong></span>
                          <span>Coach: <strong className="text-zinc-700">{trainer?.name}</strong></span>
                        </div>
                      </div>

                      {/* We'll let them simulate cancellation */}
                      <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase">
                        CONFIRMED SEAT
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-10 bg-brand-dark border border-dashed border-brand-border rounded-2xl space-y-3">
                <CalendarRange className="h-8 w-8 text-brand-primary/40 mx-auto" />
                <p className="font-display font-semibold text-brand-cream text-sm">No scheduled bookings found</p>
                <p className="text-zinc-600 text-xs max-w-xs mx-auto leading-normal">
                  You haven&apos;t reserved any coaching slots yet. Explore our weekly timetable to reserve compound sessions!
                </p>
                <button
                  onClick={() => setActiveTab('schedule')}
                  className="bg-brand-primary text-white text-xs font-mono font-bold px-4 py-2 rounded-xl"
                >
                  BOOK SESSIONS
                </button>
              </div>
            )}
          </div>

          {/* Payment History & Billing */}
          <div className="bg-brand-dark-card border border-brand-border rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
            <div className="border-b border-brand-border pb-4">
              <h3 className="font-display text-lg font-bold text-brand-cream">My Billing Statement</h3>
              <p className="text-zinc-500 text-xs mt-1">Your payment history and current dues are shown below.</p>
            </div>

            {/* Next Payment Due Banner */}
            {activePlan && (
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-brand-primary/10 border border-brand-primary/25 rounded-2xl p-4">
                <div className="flex items-center gap-3 flex-1">
                  <div className="bg-brand-primary/20 rounded-xl p-2.5">
                    <CreditCard className="h-5 w-5 text-brand-primary" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono font-black text-zinc-500 tracking-wider uppercase">Monthly Due Amount</div>
                    <div className="font-display font-black text-brand-cream text-xl">Rs. {activePlan.priceLKR.toLocaleString()}</div>
                    <div className="text-zinc-500 text-[11px] font-medium">{activePlan.name} — {activePlan.billingPeriod} billing</div>
                  </div>
                </div>
                <button
                  onClick={() => setShowPaymentModal(true)}
                  className="flex items-center justify-center space-x-2 bg-brand-primary hover:bg-brand-primary-hover text-white text-xs font-mono font-bold tracking-wider px-5 py-3 rounded-xl transition-all shadow-sm border border-brand-primary/20 cursor-pointer"
                >
                  <CreditCard className="h-3.5 w-3.5" />
                  <span>PAY NOW</span>
                </button>
              </div>
            )}

            {memberPayments.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse font-sans text-xs">
                  <thead>
                    <tr className="border-b border-brand-border text-zinc-500 font-mono font-bold uppercase tracking-wider">
                      <th className="pb-3">Invoice Ref</th>
                      <th className="pb-3">Membership Plan</th>
                      <th className="pb-3 text-right">Amount (LKR)</th>
                      <th className="pb-3">Date</th>
                      <th className="pb-3">Method</th>
                      <th className="pb-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {memberPayments.map((pay) => (
                      <tr key={pay._id} className="border-b border-brand-border hover:bg-brand-dark-card-lighter transition-colors">
                        <td className="py-3.5 font-mono text-zinc-500">#{pay._id.slice(-5).toUpperCase()}</td>
                        <td className="py-3.5 font-semibold text-brand-cream">{pay.planName}</td>
                        <td className="py-3.5 font-mono font-bold text-brand-cream text-right">Rs. {pay.amountLKR.toLocaleString()}</td>
                        <td className="py-3.5 text-zinc-600">{pay.paymentDate}</td>
                        <td className="py-3.5 text-zinc-600 font-medium">{pay.paymentMethod}</td>
                        <td className="py-3.5 text-center">
                          {pay.status === 'completed' ? (
                            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase">
                              PAID
                            </span>
                          ) : (
                            <span className="bg-amber-50 text-amber-700 border border-amber-200 text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase">
                              PENDING
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 bg-brand-dark border border-brand-border rounded-2xl text-zinc-500 text-xs">
                No billing records found. Contact us to record your first payment.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && activePlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-brand-dark-card border border-brand-border rounded-3xl w-full max-w-md shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-brand-border">
              <div>
                <h2 className="font-display text-lg font-black text-brand-cream">Secure Payment</h2>
                <p className="text-zinc-500 text-xs mt-0.5">
                  {activePlan.name} — Rs. {activePlan.priceLKR.toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="text-zinc-500 hover:text-brand-cream transition-colors p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handlePaymentSubmit} className="p-6 space-y-5">
              {/* Payment Method selector */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono font-black text-zinc-500 tracking-wider uppercase">Payment Method</label>
                <div className="flex gap-2">
                  {['Visa', 'Mastercard', 'Amex'].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setPaymentForm(f => ({ ...f, paymentMethod: m }))}
                      className={`flex-1 py-2 text-xs font-mono font-bold rounded-xl border transition-all ${
                        paymentForm.paymentMethod === m
                          ? 'bg-brand-primary text-white border-brand-primary'
                          : 'bg-brand-dark text-zinc-400 border-brand-border hover:border-brand-primary/40'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cardholder Name */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono font-black text-zinc-500 tracking-wider uppercase">Cardholder Name</label>
                <input
                  required
                  type="text"
                  placeholder="JOHN FERNANDO"
                  value={paymentForm.cardholderName}
                  onChange={e => setPaymentForm(f => ({ ...f, cardholderName: e.target.value.toUpperCase() }))}
                  className="w-full bg-brand-dark border border-brand-border px-4 py-2.5 rounded-xl text-brand-cream text-sm font-mono outline-none focus:border-brand-primary transition-colors"
                />
              </div>

              {/* Card Number */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono font-black text-zinc-500 tracking-wider uppercase">Card Number</label>
                <div className="relative">
                  <input
                    required
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    value={paymentForm.cardNumber}
                    onChange={e => setPaymentForm(f => ({ ...f, cardNumber: formatCardNumber(e.target.value) }))}
                    maxLength={19}
                    className="w-full bg-brand-dark border border-brand-border px-4 py-2.5 rounded-xl text-brand-cream text-sm font-mono outline-none focus:border-brand-primary transition-colors pr-10"
                  />
                  <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                </div>
              </div>

              {/* Expiry + CVV */}
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono font-black text-zinc-500 tracking-wider uppercase">Month</label>
                  <input
                    required
                    type="text"
                    placeholder="MM"
                    maxLength={2}
                    value={paymentForm.expiryMonth}
                    onChange={e => setPaymentForm(f => ({ ...f, expiryMonth: e.target.value.replace(/\D/g, '').slice(0, 2) }))}
                    className="w-full bg-brand-dark border border-brand-border px-3 py-2.5 rounded-xl text-brand-cream text-sm font-mono outline-none focus:border-brand-primary transition-colors text-center"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono font-black text-zinc-500 tracking-wider uppercase">Year</label>
                  <input
                    required
                    type="text"
                    placeholder="YY"
                    maxLength={2}
                    value={paymentForm.expiryYear}
                    onChange={e => setPaymentForm(f => ({ ...f, expiryYear: e.target.value.replace(/\D/g, '').slice(0, 2) }))}
                    className="w-full bg-brand-dark border border-brand-border px-3 py-2.5 rounded-xl text-brand-cream text-sm font-mono outline-none focus:border-brand-primary transition-colors text-center"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono font-black text-zinc-500 tracking-wider uppercase">CVV</label>
                  <input
                    required
                    type="password"
                    placeholder="•••"
                    maxLength={4}
                    value={paymentForm.cvv}
                    onChange={e => setPaymentForm(f => ({ ...f, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                    className="w-full bg-brand-dark border border-brand-border px-3 py-2.5 rounded-xl text-brand-cream text-sm font-mono outline-none focus:border-brand-primary transition-colors text-center"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-brand-primary hover:bg-brand-primary-hover disabled:bg-brand-border disabled:text-zinc-400 text-white font-mono font-black text-sm tracking-widest py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    <span>PROCESSING...</span>
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    <span>PAY Rs. {activePlan.priceLKR.toLocaleString()}</span>
                  </>
                )}
              </button>

              <p className="text-center text-[10px] text-zinc-600 font-mono">
                🔒 Your payment is secured and encrypted
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
