// src/components/Sidebar.tsx
import { useStore } from '../store/useStore';
import { Calendar, ShieldAlert, SortDesc, Rocket } from 'lucide-react';

export const Sidebar = () => {
  const { startDate, endDate, setDates, showOnlyHazardous, setShowOnlyHazardous, sortBy, setSortBy } = useStore();

  return (
    <aside className="w-80 bg-slate-800 border-r border-slate-700 p-6 flex flex-col gap-8 h-screen sticky top-0">
      <div className="flex items-center gap-3 text-blue-400">
        <Rocket size={32} />
        <h1 className="text-xl font-bold tracking-tight text-white">NEO Monitor</h1>
      </div>

      {/* Date Range Section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-slate-400 text-sm font-semibold uppercase">
          <Calendar size={16} />
          <span>Date Range (Max 7 days)</span>
        </div>
        <div className="flex flex-col gap-2">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setDates(e.target.value, endDate)}
            className="bg-slate-900 border border-slate-700 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setDates(startDate, e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      {/* Filtering Section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-slate-400 text-sm font-semibold uppercase">
          <ShieldAlert size={16} />
          <span>Filters</span>
        </div>
        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={showOnlyHazardous}
            onChange={(e) => setShowOnlyHazardous(e.target.checked)}
            className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
            Potentially Hazardous
          </span>
        </label>
      </div>

      {/* Sorting Section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-slate-400 text-sm font-semibold uppercase">
          <SortDesc size={16} />
          <span>Sort By</span>
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="bg-slate-900 border border-slate-700 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
        >
          <option value="dangerScore">Danger Score (Highest)</option>
          <option value="date">Approach Date</option>
          <option value="closest">Miss Distance (Closest)</option>
        </select>
      </div>
      
      <div className="mt-auto text-[10px] text-slate-500 text-center uppercase tracking-widest">
        Data source: NASA NeoWs API
      </div>
    </aside>
  );
};