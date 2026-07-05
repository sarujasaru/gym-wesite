'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Service, Trainer, MembershipPlan, Schedule, Booking, GalleryItem, Promotion, Member, Payment,
  DEFAULT_SERVICES, DEFAULT_TRAINERS, DEFAULT_PLANS, DEFAULT_SCHEDULES, DEFAULT_GALLERY,
  DEFAULT_PROMOTIONS, DEFAULT_MEMBERS, DEFAULT_PAYMENTS, DEFAULT_BOOKINGS,
  getFromStorage, saveToStorage
} from '@/lib/gym-store';

export interface UserSession {
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'member';
  planId?: string;
  memberId?: string;
}

interface GymContextType {
  // Current user session
  currentUser: UserSession | null;
  setCurrentUser: (user: UserSession | null) => void;
  login: (email: string, role: 'admin' | 'member') => { success: boolean; error?: string };
  register: (name: string, email: string, phone: string, planId?: string) => { success: boolean; error?: string };
  logout: () => void;

  // State slices
  services: Service[];
  trainers: Trainer[];
  plans: MembershipPlan[];
  schedules: Schedule[];
  bookings: Booking[];
  gallery: GalleryItem[];
  promotions: Promotion[];
  members: Member[];
  payments: Payment[];

  // Mutators (CRUD matching Admin side requirements)
  // Plans
  addPlan: (plan: Omit<MembershipPlan, '_id'>) => void;
  editPlan: (id: string, updated: Partial<MembershipPlan>) => void;
  deletePlan: (id: string) => void;

  // Trainers
  addTrainer: (trainer: Omit<Trainer, '_id'>) => void;
  editTrainer: (id: string, updated: Partial<Trainer>) => void;
  deleteTrainer: (id: string) => void;

  // Schedules
  addSchedule: (schedule: Omit<Schedule, '_id' | 'enrolledCount'>) => void;
  editSchedule: (id: string, updated: Partial<Schedule>) => void;
  deleteSchedule: (id: string) => void;

  // Bookings
  bookClass: (scheduleId: string, memberName: string, memberEmail: string, date: string) => { success: boolean; error?: string };
  updateBookingStatus: (id: string, status: 'pending' | 'confirmed' | 'cancelled') => void;
  deleteBooking: (id: string) => void;

  // Members
  addMember: (member: Omit<Member, '_id' | 'joinedDate'>) => void;
  updateMemberStatus: (id: string, status: 'active' | 'inactive') => void;
  editMemberPlan: (id: string, planId: string) => void;
  deleteMember: (id: string) => void;

  // Promotions
  addPromotion: (promo: Omit<Promotion, '_id'>) => void;
  editPromotion: (id: string, updated: Partial<Promotion>) => void;
  deletePromotion: (id: string) => void;

  // Payments
  addPayment: (payment: Omit<Payment, '_id' | 'paymentDate'>) => void;
  deletePayment: (id: string) => void;
}

const GymContext = createContext<GymContextType | undefined>(undefined);

export function GymProvider({ children }: { children: React.ReactNode }) {
  // Authentication states
  const [currentUser, setCurrentUserState] = useState<UserSession | null>(null);

  // Core Data Lists
  const [services, setServices] = useState<Service[]>([]);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);

  // On mount, load from Storage or write defaults
  useEffect(() => {
    setTimeout(() => {
      setServices(getFromStorage<Service[]>('gym_services', DEFAULT_SERVICES));
      setTrainers(getFromStorage<Trainer[]>('gym_trainers', DEFAULT_TRAINERS));
      setPlans(getFromStorage<MembershipPlan[]>('gym_plans', DEFAULT_PLANS));
      setSchedules(getFromStorage<Schedule[]>('gym_schedules', DEFAULT_SCHEDULES));
      setBookings(getFromStorage<Booking[]>('gym_bookings', DEFAULT_BOOKINGS));
      setGallery(getFromStorage<GalleryItem[]>('gym_gallery', DEFAULT_GALLERY));
      setPromotions(getFromStorage<Promotion[]>('gym_promotions', DEFAULT_PROMOTIONS));
      setMembers(getFromStorage<Member[]>('gym_members', DEFAULT_MEMBERS));
      setPayments(getFromStorage<Payment[]>('gym_payments', DEFAULT_PAYMENTS));
      
      const savedUser = getFromStorage<UserSession | null>('gym_current_user', null);
      if (savedUser) {
        setCurrentUserState(savedUser);
      }
    }, 0);
  }, []);

  const setCurrentUser = (user: UserSession | null) => {
    setCurrentUserState(user);
    saveToStorage('gym_current_user', user);
  };

  // Helper sync to localstorage on edits
  const syncAndSet = <T,>(key: string, value: T, setter: React.Dispatch<React.SetStateAction<T>>) => {
    setter(value);
    saveToStorage(key, value);
  };

  // Authentication business logic (member-only login)
  const login = (email: string, role: 'admin' | 'member'): { success: boolean; error?: string } => {
    const emailLower = email.toLowerCase().trim();
    // Find matching member
    const member = members.find(m => m.email.toLowerCase() === emailLower);
    if (member) {
      const userSession: UserSession = {
        name: member.name,
        email: member.email,
        phone: member.phone,
        role: 'member',
        planId: member.planId,
        memberId: member._id
      };
      setCurrentUser(userSession);
      return { success: true };
    }
    // If not found in members list, check default credentials
    const defaultM = DEFAULT_MEMBERS.find(m => m.email.toLowerCase() === emailLower);
    if (defaultM) {
      const userSession: UserSession = {
        name: defaultM.name,
        email: defaultM.email,
        phone: defaultM.phone,
        role: 'member',
        planId: defaultM.planId,
        memberId: defaultM._id
      };
      setCurrentUser(userSession);
      return { success: true };
    }
    return { success: false, error: 'Email address not found. Please register first!' };
  };

  const register = (name: string, email: string, phone: string, planId?: string): { success: boolean; error?: string } => {
    const emailLower = email.toLowerCase().trim();
    const exists = members.some(m => m.email.toLowerCase() === emailLower);
    if (exists) {
      return { success: false, error: 'A member with this email already exists!' };
    }

    const newMemberId = `mem-${Date.now()}`;
    const newMember: Member = {
      _id: newMemberId,
      name,
      email: emailLower,
      phone,
      planId,
      status: 'active',
      joinedDate: new Date().toISOString().split('T')[0]
    };

    const updatedMembers = [...members, newMember];
    syncAndSet('gym_members', updatedMembers, setMembers);

    // If plan was chosen, generate an automatic initial pending payment record
    if (planId) {
      const selectedPlan = plans.find(p => p._id === planId) || DEFAULT_PLANS.find(p => p._id === planId);
      const planName = selectedPlan ? selectedPlan.name : 'Unknown Plan';
      const amount = selectedPlan ? selectedPlan.priceLKR : 4500;
      
      const newPayment: Payment = {
        _id: `pay-${Date.now()}`,
        memberEmail: emailLower,
        memberName: name,
        planName,
        amountLKR: amount,
        paymentDate: new Date().toISOString().split('T')[0],
        paymentMethod: 'Simulated Card',
        status: 'completed' // auto mark completed for preview ease
      };
      syncAndSet('gym_payments', [...payments, newPayment], setPayments);
    }

    // Auto-login registered member
    const userSession: UserSession = {
      name,
      email: emailLower,
      phone,
      role: 'member',
      planId,
      memberId: newMemberId
    };
    setCurrentUser(userSession);

    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  // Mutator: Plans CRUD
  const addPlan = (plan: Omit<MembershipPlan, '_id'>) => {
    const newPlan: MembershipPlan = {
      ...plan,
      _id: `plan-${Date.now()}`
    };
    const updated = [...plans, newPlan];
    syncAndSet('gym_plans', updated, setPlans);
  };

  const editPlan = (id: string, updated: Partial<MembershipPlan>) => {
    const updatedList = plans.map(p => p._id === id ? { ...p, ...updated } : p);
    syncAndSet('gym_plans', updatedList, setPlans);
  };

  const deletePlan = (id: string) => {
    const updatedList = plans.filter(p => p._id !== id);
    syncAndSet('gym_plans', updatedList, setPlans);
  };

  // Mutator: Trainers CRUD
  const addTrainer = (trainer: Omit<Trainer, '_id'>) => {
    const newTrainer: Trainer = {
      ...trainer,
      _id: `tr-${Date.now()}`
    };
    const updated = [...trainers, newTrainer];
    syncAndSet('gym_trainers', updated, setTrainers);
  };

  const editTrainer = (id: string, updated: Partial<Trainer>) => {
    const updatedList = trainers.map(t => t._id === id ? { ...t, ...updated } : t);
    syncAndSet('gym_trainers', updatedList, setTrainers);
  };

  const deleteTrainer = (id: string) => {
    const updatedList = trainers.filter(t => t._id !== id);
    syncAndSet('gym_trainers', updatedList, setTrainers);
  };

  // Mutator: Schedules CRUD
  const addSchedule = (schedule: Omit<Schedule, '_id' | 'enrolledCount'>) => {
    const newSchedule: Schedule = {
      ...schedule,
      _id: `sch-${Date.now()}`,
      enrolledCount: 0
    };
    const updated = [...schedules, newSchedule];
    syncAndSet('gym_schedules', updated, setSchedules);
  };

  const editSchedule = (id: string, updated: Partial<Schedule>) => {
    const updatedList = schedules.map(s => s._id === id ? { ...s, ...updated } : s);
    syncAndSet('gym_schedules', updatedList, setSchedules);
  };

  const deleteSchedule = (id: string) => {
    const updatedList = schedules.filter(s => s._id !== id);
    syncAndSet('gym_schedules', updatedList, setSchedules);
  };

  // Mutator: Book Class
  const bookClass = (scheduleId: string, memberName: string, memberEmail: string, date: string): { success: boolean; error?: string } => {
    const schedule = schedules.find(s => s._id === scheduleId);
    if (!schedule) {
      return { success: false, error: 'Class schedule not found.' };
    }

    if (schedule.enrolledCount >= schedule.capacity) {
      return { success: false, error: 'This class is currently fully booked!' };
    }

    // Check if duplicate booking for this member on this date and class
    const isDuplicate = bookings.some(b => 
      b.scheduleId === scheduleId && 
      b.memberEmail.toLowerCase() === memberEmail.toLowerCase() && 
      b.status !== 'cancelled'
    );
    if (isDuplicate) {
      return { success: false, error: 'You have already booked this training session!' };
    }

    // Create booking
    const newBooking: Booking = {
      _id: `bk-${Date.now()}`,
      memberName,
      memberEmail: memberEmail.toLowerCase(),
      scheduleId,
      bookingDate: date,
      status: 'confirmed' // Pre-approve for instant client delight
    };

    // Update schedules count
    const updatedSchedules = schedules.map(s => 
      s._id === scheduleId ? { ...s, enrolledCount: s.enrolledCount + 1 } : s
    );
    
    syncAndSet('gym_schedules', updatedSchedules, setSchedules);
    syncAndSet('gym_bookings', [...bookings, newBooking], setBookings);

    return { success: true };
  };

  const updateBookingStatus = (id: string, status: 'pending' | 'confirmed' | 'cancelled') => {
    const currentBk = bookings.find(b => b._id === id);
    const updatedList = bookings.map(b => b._id === id ? { ...b, status } : b);
    
    // Adjust schedule enrolled counts if transitioning to cancelled or from cancelled
    if (currentBk && currentBk.status !== status) {
      const scheduleId = currentBk.scheduleId;
      const schedulesUpdated = schedules.map(s => {
        if (s._id === scheduleId) {
          if (status === 'cancelled' && currentBk.status !== 'cancelled') {
            return { ...s, enrolledCount: Math.max(0, s.enrolledCount - 1) };
          } else if (currentBk.status === 'cancelled' && status !== 'cancelled') {
            return { ...s, enrolledCount: s.enrolledCount + 1 };
          }
        }
        return s;
      });
      syncAndSet('gym_schedules', schedulesUpdated, setSchedules);
    }

    syncAndSet('gym_bookings', updatedList, setBookings);
  };

  const deleteBooking = (id: string) => {
    const currentBk = bookings.find(b => b._id === id);
    if (currentBk && currentBk.status !== 'cancelled') {
      const updatedSchedules = schedules.map(s => 
        s._id === currentBk.scheduleId ? { ...s, enrolledCount: Math.max(0, s.enrolledCount - 1) } : s
      );
      setSchedules(updatedSchedules);
      saveToStorage('gym_schedules', updatedSchedules);
    }
    const updatedList = bookings.filter(b => b._id !== id);
    syncAndSet('gym_bookings', updatedList, setBookings);
  };

  // Mutator: Members CRUD
  const addMember = (member: Omit<Member, '_id' | 'joinedDate'>) => {
    const newMember: Member = {
      ...member,
      _id: `mem-${Date.now()}`,
      joinedDate: new Date().toISOString().split('T')[0]
    };
    const updated = [...members, newMember];
    syncAndSet('gym_members', updated, setMembers);
  };

  const updateMemberStatus = (id: string, status: 'active' | 'inactive') => {
    const updated = members.map(m => m._id === id ? { ...m, status } : m);
    syncAndSet('gym_members', updated, setMembers);
  };

  const editMemberPlan = (id: string, planId: string) => {
    const updated = members.map(m => m._id === id ? { ...m, planId } : m);
    syncAndSet('gym_members', updated, setMembers);
    
    // If the logged in user is the member being updated, refresh session
    if (currentUser && currentUser.memberId === id) {
      const sessionUpdated = { ...currentUser, planId };
      setCurrentUser(sessionUpdated);
    }
  };

  const deleteMember = (id: string) => {
    const updated = members.filter(m => m._id !== id);
    syncAndSet('gym_members', updated, setMembers);
  };

  // Mutator: Promotions CRUD
  const addPromotion = (promo: Omit<Promotion, '_id'>) => {
    const newPromo: Promotion = {
      ...promo,
      _id: `promo-${Date.now()}`
    };
    const updated = [...promotions, newPromo];
    syncAndSet('gym_promotions', updated, setPromotions);
  };

  const editPromotion = (id: string, updated: Partial<Promotion>) => {
    const updatedList = promotions.map(p => p._id === id ? { ...p, ...updated } : p);
    syncAndSet('gym_promotions', updatedList, setPromotions);
  };

  const deletePromotion = (id: string) => {
    const updatedList = promotions.filter(p => p._id !== id);
    syncAndSet('gym_promotions', updatedList, setPromotions);
  };

  // Mutator: Payments CRUD
  const addPayment = (payment: Omit<Payment, '_id' | 'paymentDate'>) => {
    const newPayment: Payment = {
      ...payment,
      _id: `pay-${Date.now()}`,
      paymentDate: new Date().toISOString().split('T')[0]
    };
    const updated = [...payments, newPayment];
    syncAndSet('gym_payments', updated, setPayments);
  };

  const deletePayment = (id: string) => {
    const updatedList = payments.filter(p => p._id !== id);
    syncAndSet('gym_payments', updatedList, setPayments);
  };

  return (
    <GymContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        login,
        register,
        logout,
        services,
        trainers,
        plans,
        schedules,
        bookings,
        gallery,
        promotions,
        members,
        payments,
        addPlan,
        editPlan,
        deletePlan,
        addTrainer,
        editTrainer,
        deleteTrainer,
        addSchedule,
        editSchedule,
        deleteSchedule,
        bookClass,
        updateBookingStatus,
        deleteBooking,
        addMember,
        updateMemberStatus,
        editMemberPlan,
        deleteMember,
        addPromotion,
        editPromotion,
        deletePromotion,
        addPayment,
        deletePayment
      }}
    >
      {children}
    </GymContext.Provider>
  );
}

export function useGym() {
  const context = useContext(GymContext);
  if (context === undefined) {
    throw new Error('useGym must be used within a GymProvider');
  }
  return context;
}
