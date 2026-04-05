// src/components/Sidebar.tsx
import { useStore } from '../store/useStore';
import { LayoutDashboard, Radar, Activity, Archive, Calendar, ShieldAlert, SortDesc, Terminal, Zap } from 'lucide-react';

interface SidebarProps {
  onExportCSV?: () => void;
}

export const Sidebar = ({ onExportCSV }: SidebarProps) => {
  // minVelocity i setMinVelocity
  const { 
    activeTab, 
    setActiveTab, 
    startDate, 
    endDate, 
    setDates, 
    showOnlyHazardous, 
    setShowOnlyHazardous, 
    sortBy, 
    setSortBy,
    minVelocity,
    setMinVelocity 
  } = useStore();

  const navItems = [
    { id: 'mission-control', label: 'MISSION CONTROL', icon: LayoutDashboard },
    { id: 'neo-tracker', label: 'NEO TRACKER', icon: Radar },
    { id: 'orbital-analysis', label: 'ORBITAL ANALYSIS', icon: Activity },
    { id: 'archives', label: 'DEEP SPACE ARCHIVES', icon: Archive },
  ];

  return (
    <aside className="hidden md:flex w-72 bg-[#0B0F19]/90 backdrop-blur-xl border-r border-slate-800/50 flex flex-col h-screen sticky top-0 overflow-y-auto z-50">
      
      <div className="p-6 mb-2">
        <h1 className="text-sm font-black tracking-[0.2em] text-white uppercase italic">Station Alpha</h1>
        <p className="text-[10px] text-blue-500 font-mono mt-1">DEEP SPACE ACTIVE</p>
      </div>

      <nav className="flex flex-col gap-1 px-4 mb-6">
        {navItems.map((item) => (
          <button key={item.id} onClick={() => setActiveTab(item.id as any)} className={`flex items-center gap-4 px-4 py-3 rounded-lg text-[11px] font-bold tracking-widest transition-all ${activeTab === item.id ? 'bg-blue-600/10 text-blue-400 border-l-2 border-blue-500' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/30'}`}>
            <item.icon size={18} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="px-6 flex flex-col gap-6">
        <div className="h-px w-full bg-slate-800/50" />
        
        {/* MISSION TIMEFRAME */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest"><Calendar size={12} /><span>Mission Timeframe</span></div>
          <div className="flex flex-col gap-2">
            <input type="date" value={startDate} onChange={(e) => setDates(e.target.value, endDate)} className="bg-[#111827] border border-slate-800 rounded p-2 text-xs text-slate-300 focus:border-blue-500 outline-none font-mono" />
            <input type="date" value={endDate} onChange={(e) => setDates(startDate, e.target.value)} className="bg-[#111827] border border-slate-800 rounded p-2 text-xs text-slate-300 focus:border-blue-500 outline-none font-mono" />
          </div>
        </div>

        {/* THREAT FILTER */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest"><ShieldAlert size={12} /><span>Threat Filter</span></div>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" checked={showOnlyHazardous} onChange={(e) => setShowOnlyHazardous(e.target.checked)} className="w-4 h-4 rounded border-slate-700 bg-[#111827] text-blue-600 focus:ring-blue-500" />
            <span className="text-xs text-slate-400 group-hover:text-white transition-colors font-mono">Hazardous Only</span>
          </label>
        </div>

        {/* VELOCITY FILTER */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest"><Zap size={12} /><span>Velocity Filter</span></div>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={minVelocity > 0} 
              onChange={(e) => setMinVelocity(e.target.checked ? 75000 : 0)} 
              className="w-4 h-4 rounded border-slate-700 bg-[#111827] text-blue-600 focus:ring-blue-500" 
            />
            <span className="text-xs text-slate-400 group-hover:text-white transition-colors font-mono">Fast Only (&gt;75k km/h)</span>
          </label>
        </div>

        {/* SORT PARAMETERS */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest"><SortDesc size={12} /><span>Sort Parameters</span></div>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)} className="bg-[#111827] border border-slate-800 rounded p-2 text-xs text-slate-300 focus:border-blue-500 outline-none cursor-pointer font-mono">
            <option value="dangerScore">Danger Score (Highest)</option>
            <option value="date">Approach Date</option>
            <option value="closest">Miss Distance (Closest)</option>
          </select>
        </div>
      </div>

      <div className="mt-auto p-6 flex flex-col gap-4 border-t border-slate-800/50 bg-[#0B0F19]">
        <button onClick={onExportCSV} className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold py-3 rounded shadow-lg shadow-blue-900/20 uppercase tracking-widest transition-colors">
          Log Mission Data (CSV)
        </button>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[9px] text-slate-500 font-mono"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />API STATUS: 200 OK</div>
          <div className="flex items-center gap-2 text-[9px] text-slate-500 font-mono"><Terminal size={10} />SYSTEM LOGS ACTIVE</div>
        </div>
      </div>
    </aside>
  );
};