// src/App.tsx
import { useState } from 'react';
import { useStore } from './store/useStore';
import { useAsteroids } from './hooks/useAsteroids';
import { Sidebar } from './components/Sidebar';
import { MissionControl } from './views/MissionControl';
import { NeoTracker } from './views/NeoTracker';
import spaceBackground from './assets/space-background.jpg';
import { LayoutDashboard, Radar, Download, Filter } from 'lucide-react';

function App() {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const { activeTab, setActiveTab, startDate, endDate, setDates, showOnlyHazardous, setShowOnlyHazardous, sortBy, setSortBy } = useStore();
  
  const { rawData, processedData, isLoading } = useAsteroids();

  const handleExportCSV = () => {
    if (processedData.length === 0) return;
    const headers = ["NEO Name", "Date", "Velocity", "Distance", "Min Dia", "Max Dia", "Hazard", "Score"];
    const csvRows = [headers.join(","), ...processedData.map(a => 
      [`"${a.name}"`, a.date, a.velocityKmh, a.missDistanceKm, a.estimatedDiameterMin, a.estimatedDiameterMax, a.isPotentiallyHazardous, 0].join(",")
    )];
    const blob = new Blob([csvRows.join("\n")], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'neo_report.csv'; a.click();
  };

  return (
    <div className="flex min-h-screen max-w-full overflow-x-hidden text-slate-100 font-sans pb-20 md:pb-0" style={{ backgroundImage: `url(${spaceBackground})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
      
      <Sidebar onExportCSV={handleExportCSV} />

      <main className="flex-1 min-w-0 bg-[#060910]/40 backdrop-blur-sm p-4 md:p-10 overflow-y-auto overflow-x-hidden w-full">
        
        {/* MOBILE HEADER */}
        <div className="md:hidden flex justify-between items-center mb-4 bg-[#0B0F19]/80 p-4 rounded-xl border border-slate-700/50">
          <div>
            <h1 className="text-sm font-black tracking-widest text-white italic uppercase">Station Alpha</h1>
            <p className="text-[9px] text-blue-500 font-mono uppercase tracking-tighter">Mobile Command</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setShowMobileFilters(!showMobileFilters)} className={`p-2 rounded-lg border transition-colors ${showMobileFilters ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' : 'bg-slate-800/50 text-slate-400 border-slate-700'}`}>
              <Filter size={18} />
            </button>
            <button onClick={handleExportCSV} className="p-2 bg-blue-600/20 text-blue-400 rounded-lg border border-blue-500/30">
              <Download size={18} />
            </button>
          </div>
        </div>

        {/* MOBILE FILTERS */}
        {showMobileFilters && (
          <div className="md:hidden mb-6 bg-[#0B0F19]/90 backdrop-blur-md p-4 rounded-xl border border-slate-700/50 flex flex-col gap-4 animate-in slide-in-from-top-4">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Timeframe</span>
              <div className="flex gap-2">
                <input type="date" value={startDate} onChange={(e) => setDates(e.target.value, endDate)} className="flex-1 bg-[#111827] border border-slate-800 rounded p-2 text-[10px] text-slate-300" />
                <input type="date" value={endDate} onChange={(e) => setDates(startDate, e.target.value)} className="flex-1 bg-[#111827] border border-slate-800 rounded p-2 text-[10px] text-slate-300" />
              </div>
            </div>
            <div className="flex items-center justify-between gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={showOnlyHazardous} onChange={(e) => setShowOnlyHazardous(e.target.checked)} className="rounded border-slate-700 bg-[#111827] text-blue-600 w-4 h-4" />
                <span className="text-xs text-slate-300">Hazardous Only</span>
              </label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)} className="bg-[#111827] border border-slate-800 rounded p-2 text-[10px] text-slate-300 flex-1">
                <option value="dangerScore">Highest Risk</option>
                <option value="date">Approach Date</option>
                <option value="closest">Closest Miss</option>
              </select>
            </div>
          </div>
        )}

        {isLoading && <div className="text-blue-500 font-mono text-center mt-20 animate-pulse">CONNECTING TO NASA DSN...</div>}

        {rawData && (
          <div className="animate-in fade-in duration-700">
            {activeTab === 'mission-control' && <MissionControl rawData={rawData} processedData={processedData} />}
            {activeTab === 'neo-tracker' && <NeoTracker processedData={processedData} />}
          </div>
        )}
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0B0F19]/95 backdrop-blur-2xl border-t border-slate-800/80 z-[100] flex justify-around items-center p-3 pb-6">
        <button onClick={() => setActiveTab('mission-control')} className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'mission-control' ? 'text-blue-400' : 'text-slate-500'}`}>
          <LayoutDashboard size={20} />
          <span className="text-[9px] font-bold tracking-widest">DASHBOARD</span>
        </button>
        <button onClick={() => setActiveTab('neo-tracker')} className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'neo-tracker' ? 'text-blue-400' : 'text-slate-500'}`}>
          <Radar size={20} />
          <span className="text-[9px] font-bold tracking-widest">TRACKER</span>
        </button>
      </nav>

    </div>
  );
}

export default App;