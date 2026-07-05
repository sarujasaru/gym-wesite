'use client';

import React, { useState, useEffect } from 'react';
import { useGym } from '@/context/GymContext';
import { Clock, User, CheckCircle, Flame, Calendar, MapPin, Check } from 'lucide-react';
import { client } from '@/sanity/lib/client'; // 🌟 சانيةி கிளையண்ட் இம்போர்ட்

export default function ScheduleSection({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const { trainers, currentUser, bookClass } = useGym();
  
  // 🌟 சானிட்டி schedules தரவிற்கான ஸ்டேட்ஸ்
  const [schedulesData, setSchedulesData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  const [selectedDay, setSelectedDay] = useState<string>('Monday');
  const [successBookingId, setSuccessBookingId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState<string | null>(null);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // 🌟 சானிட்டியிலிருந்து schedules விபரங்களை எடுக்கும் கியூரி
  useEffect(() => {
    async function fetchSchedules() {
      try {
        // நீங்கள் கொடுத்த அமைப்பின்படி `trainer` என்பது ரெஃபரன்ஸ் ஆப்ஜெக்ட்டாக உள்ளதால், அதன் `_ref` ஐ எடுக்கிறோம்
        const query = `*[_type == "schedule"] {
          _id,
          className,
          dayOfWeek,
          startTime,
          endTime,
          durationMinutes,
          capacity,
          isActive,
          "trainerId": trainer._ref
        }`;
        const data = await client.fetch(query);
        setSchedulesData(data);
      } catch (error) {
        console.error("Error fetching schedules from Sanity:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSchedules();
  }, []);

  // 🌟 சானிட்டியிலிருந்து வந்த தரவை லோக்கல் நாளின் அடிப்படையில் ஃபில்டர் செய்கிறோம்
  const filteredSchedules = schedulesData.filter(s => s.dayOfWeek === selectedDay);

  const handleBookSession = (scheduleId: string) => {
    setErrorMessage(null);
    setSuccessBookingId(null);

    if (!currentUser) {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('pending_booking_schedule_id', scheduleId);
      }
      setShowLoginPrompt(scheduleId);
      return;
    }

    if (currentUser.role === 'admin') {
      setErrorMessage('Administrators are not permitted to enroll in fitness classes.');
      return;
    }

    const dateStr = new Date().toISOString().split('T')[0];
    
    // GymContext இல் உள்ள bookClass பங்க்ஷனை இயக்குகிறது
    const result = bookClass(
      scheduleId,
      currentUser.name,
      currentUser.email,
      dateStr
    );

    if (result.success) {
      setSuccessBookingId(scheduleId);
      setTimeout(() => {
        setSuccessBookingId(null);
        setActiveTab('portal');
      }, 2000);
    } else {
      setErrorMessage(result.error || 'Booking failed.');
    }
  };

  return (
    <div className="space-y-12 py-8 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-mono font-black text-brand-primary tracking-widest uppercase block">
          TRAINING TIMETABLE
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-normal italic text-brand-cream tracking-tight">
          Weekly Class Schedule
        </h1>
        <p className="text-brand-accent max-w-2xl mx-auto text-sm sm:text-base">
          Our classes run across morning and evening windows to fit your daily schedule. Maximum capacity is restricted to guarantee personalized coaching.
        </p>
      </div>

      {/* Days Filter */}
      <div className="flex flex-wrap items-center justify-center gap-2 pb-2 border-b border-brand-border">
        {days.map((day) => {
          const hasClasses = schedulesData.some(s => s.dayOfWeek === day);
          const isSelected = selectedDay === day;
          return (
            <button
              key={day}
              onClick={() => {
                setSelectedDay(day);
                setShowLoginPrompt(null);
                setErrorMessage(null);
              }}
              className={`px-4 sm:px-5 py-2.5 rounded-xl font-display text-xs sm:text-sm font-bold tracking-wide transition-all ${
                isSelected
                  ? 'bg-brand-primary  text-white shadow-md shadow-brand-primary/10'
                  : 'bg-brand-dark-card hover:bg-brand-primary/10 text-brand-accent border border-brand-border'
              }`}
            >
              <span className="relative">
                {day}
                {hasClasses && !isSelected && (
                  <span className="absolute -top-1 -right-2 h-2 w-2 rounded-full bg-brand-primary animate-pulse" />
                )}
              </span>
            </button>
          );
        })}
      </div>

      {/* Book Status Message Displays */}
      {errorMessage && (
        <div className="bg-rose-50 border border-rose-300 text-rose-700 px-4 py-3 rounded-xl text-xs sm:text-sm font-medium flex items-center justify-between">
          <span>{errorMessage}</span>
          <button onClick={() => setErrorMessage(null)} className="text-rose-400 hover:text-rose-200 font-bold ml-2">Dismiss</button>
        </div>
      )}

      {/* Login Prompt Card */}
      {showLoginPrompt && (
        <div className="bg-brand-dark-card border border-brand-primary/30 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-display font-bold text-brand-cream">Sign-in Required to Book</h4>
            <p className="text-zinc-600 text-xs sm:text-sm">
              Please register or log in as a member to book this session. We will secure your spot!
            </p>
          </div>
          <button
            onClick={() => setActiveTab('portal')}
            className="bg-brand-primary hover:bg-brand-primary-hover text-white text-xs font-mono font-bold px-5 py-3 rounded-xl shadow-sm"
          >
            GO TO LOGIN / REGISTER
          </button>
        </div>
      )}

      {/* Schedule Listing Grid */}
      {loading ? (
        <div className="text-center font-mono text-xs text-brand-cream py-12">
          Loading Timetable from Sanity...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchedules.length > 0 ? (
            filteredSchedules.map((schedule) => {
              // 🌟 சானிட்டி ட்ரெய்னர் ரெஃபரன்ஸ் ஐடியை Context ட்ரெய்னர்ஸுடன் ஒப்பிடுகிறோம்
              const trainer = trainers.find(t => t._id === schedule.trainerId);
              
              // சானிட்டியிலிருந்து வரும் enrolledCount விபரம் தற்காலிகமாக இல்லை என்றால் 0 என எடுத்துக்கொள்ளும்
              const enrolledCount = schedule.enrolledCount || 0; 
              const enrolledPercent = Math.min(100, (enrolledCount / schedule.capacity) * 100);
              const isFull = enrolledCount >= schedule.capacity;
              const isBookedSuccessfully = successBookingId === schedule._id;

              return (
                <div 
                  key={schedule._id}
                  className={`bg-brand-dark-card rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 ${
                    isBookedSuccessfully 
                      ? 'border-emerald-400 bg-emerald-50 shadow-md shadow-emerald-200/50' 
                      : 'border-brand-border hover:border-brand-primary/30 shadow-sm'
                  }`}
                >
                  <div className="space-y-5">
                    {/* Time Badge */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-brand-primary">
                        <Clock className="h-4 w-4" />
                        <span className="font-mono text-xs font-black tracking-wide">
                          {schedule.startTime} - {schedule.endTime}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono font-bold bg-brand-border text-zinc-600 px-2 py-0.5 rounded">
                        {schedule.durationMinutes} MIN
                      </span>
                    </div>

                    {/* Class Title */}
                    <div className="space-y-1">
                      <h3 className="font-display text-lg sm:text-xl font-bold text-brand-cream">
                        {schedule.className}
                      </h3>
                      <div className="flex items-center space-x-1.5 text-zinc-500 text-xs font-medium">
                        <User className="h-3.5 w-3.5 text-brand-primary/70" />
                        <span>Coached by <strong className="text-zinc-400">{trainer ? trainer.name : 'Elite Trainer'}</strong></span>
                      </div>
                    </div>

                    {/* Capacity Bar */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-mono font-bold">
                        <span className="text-zinc-500">ENROLLMENT DENSITY</span>
                        <span className={isFull ? 'text-rose-500' : 'text-brand-primary'}>
                          {enrolledCount} / {schedule.capacity} spots
                        </span>
                      </div>
                      <div className="w-full bg-brand-border h-2 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            isFull ? 'bg-rose-500' : 'bg-brand-primary'
                          }`}
                          style={{ width: `${enrolledPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Booking Button */}
                  <div className="mt-6 pt-5 border-t border-brand-border">
                    <button
                      disabled={isFull && !isBookedSuccessfully}
                      onClick={() => handleBookSession(schedule._id)}
                      className={`w-full py-3 rounded-xl font-display text-xs sm:text-sm font-bold tracking-wide uppercase transition-all duration-300 flex items-center justify-center space-x-1.5 ${
                        isBookedSuccessfully
                          ? 'bg-emerald-600 text-white'
                          : isFull
                          ? 'bg-brand-border text-zinc-500 cursor-not-allowed'
                          : 'bg-brand-primary hover:bg-brand-primary-hover text-white hover:scale-[1.01]'
                      }`}
                    >
                      {isBookedSuccessfully ? (
                        <>
                          <Check className="h-4 w-4" />
                          <span>BOOKED CONFIRMED!</span>
                        </>
                      ) : isFull ? (
                        <span>FULLY BOOKED</span>
                      ) : (
                        <span>BOOK THIS SESSION</span>
                      )}
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full bg-brand-dark-card border border-dashed border-brand-border rounded-2xl p-12 text-center text-zinc-500 space-y-2">
              <Calendar className="h-10 w-10 text-brand-primary/40 mx-auto" />
              <p className="font-display font-semibold text-brand-cream">No coaching classes scheduled for {selectedDay}</p>
              <p className="text-zinc-500 text-xs">We host specialized open-mat and individual weights routines on quiet days.</p>
            </div>
          )}
        </div>
      )}

      {/* Localized Sri Lankan training note */}
      <section className="bg-brand-dark-card border border-brand-border rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <h4 className="font-display font-bold text-brand-cream flex items-center space-x-1.5">
            <MapPin className="h-4 w-4 text-brand-primary" />
            <span>Multi-Location Schedule Access</span>
          </h4>
          <p className="text-zinc-600 text-xs sm:text-sm">
            Elite members can reserve classes across all three branches (Colombo 07, Galle Fort, Kandy Center) without extra surcharges.
          </p>
        </div>
        <div className="font-mono text-[10px] bg-brand-primary/10 text-brand-primary px-3 py-1.5 rounded-lg font-black tracking-wider uppercase">
          Colombo 07 • Kandy • Galle
        </div>
      </section>
    </div>
  );
}