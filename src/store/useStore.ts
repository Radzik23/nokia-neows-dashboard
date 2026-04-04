// src/store/useStore.ts
import { create } from 'zustand';
import { format, subDays } from 'date-fns';

interface DashboardState {
  startDate: string;
  endDate: string;
  setDates: (start: string, end: string) => void;
  
  showOnlyHazardous: boolean;
  setShowOnlyHazardous: (show: boolean) => void;
  
  sortBy: 'date' | 'dangerScore' | 'closest';
  setSortBy: (sort: 'date' | 'dangerScore' | 'closest') => void;
}

const today = new Date();
const defaultEnd = format(today, 'yyyy-MM-dd');
const defaultStart = format(subDays(today, 6), 'yyyy-MM-dd');

export const useStore = create<DashboardState>((set) => ({
  startDate: defaultStart,
  endDate: defaultEnd,
  setDates: (start, end) => set({ startDate: start, endDate: end }),
  
  showOnlyHazardous: false,
  setShowOnlyHazardous: (show) => set({ showOnlyHazardous: show }),
  
  sortBy: 'dangerScore',
  setSortBy: (sort) => set({ sortBy: sort }),
}));