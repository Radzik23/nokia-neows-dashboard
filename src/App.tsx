// src/App.tsx
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAsteroids } from './api/nasaService';
import { useStore } from './store/useStore';
import { Sidebar } from './components/Sidebar';
import { AsteroidTable } from './components/AsteroidTable';
import { calculateDangerScore } from './utils/dangerScore';
import { Visuals } from './components/Visuals';
import { StatCard } from './components/StatCard';
import spaceBackground from './assets/space-background.jpg';

function App() {
  const { activeTab, startDate, endDate, showOnlyHazardous, sortBy } = useStore();

  // 1. Data Fetching
  const { data, isLoading, isError } = useQuery({
    queryKey: ['asteroids', startDate, endDate],
    queryFn: () => fetchAsteroids(startDate, endDate),
  });

  // 2. Data Processing (Filtering & Sorting)
  const processedData = useMemo(() => {
    if (!data) return [];

    let result = [...data];

    if (showOnlyHazardous) {
      result = result.filter(a => a.isPotentiallyHazardous);
    }

    result.sort((a, b) => {
      if (sortBy === 'dangerScore') {
        return calculateDangerScore(b) - calculateDangerScore(a);
      }
      if (sortBy === 'date') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      if (sortBy === 'closest') {
        return parseFloat(a.missDistanceKm) - parseFloat(b.missDistanceKm);
      }
      return 0;
    });

    return result;
  }, [data, showOnlyHazardous, sortBy]);

  return (
    <div 
      className="flex min-h-screen text-slate-100 font-sans"
      style={{
        backgroundImage: `url(${spaceBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <Sidebar />

      <main className="flex-1 bg-[#060910]/40 backdrop-blur-sm p-10 overflow-y-auto">
        
        {/* LOADING STATE */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="text-blue-500 font-mono text-xs uppercase tracking-widest animate-pulse">
              Establishing link to NASA Deep Space Network...
            </p>
          </div>
        )}

        {/* ERROR STATE */}
        {isError && (
          <div className="bg-red-950/40 backdrop-blur-md border border-red-500/50 text-red-400 p-6 rounded-xl font-mono">
            <h3 className="font-bold text-lg tracking-widest uppercase">Critical System Error</h3>
            <p className="text-sm mt-2 text-red-500/80">Telemetry stream disconnected. Verify API key and timeframe constraints.</p>
          </div>
        )}

        {data && (
          <>
            {/* --- MISSION CONTROL --- */}
            {activeTab === 'mission-control' && (
              <div className="space-y-10 animate-in fade-in duration-700">
                <header>
                  <h2 className="text-4xl font-bold text-white tracking-tighter drop-shadow-lg">Mission Control</h2>
                  <p className="text-slate-400 flex items-center gap-2 text-sm mt-1">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                    Real-time Near-Earth Object Surveillance Feed
                  </p>
                </header>

                {/* Grid Statystyk */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard 
                    label="Total Detected NEOs" 
                    value={data.length} 
                    color="blue" 
                    trend="LIVE FEED" 
                  />
                  <StatCard 
                    label="Potentially Hazardous" 
                    value={data.filter(a => a.isPotentiallyHazardous).length} 
                    color="coral" 
                    subValue="CRITICAL WATCH ACTIVE" 
                  />
                  <StatCard 
                    label="Displayed Items" 
                    value={processedData.length} 
                    color="white" 
                    subValue="FILTER APPLIED" 
                  />
                  <StatCard 
                    label="Closest Approach" 
                    value={data.length > 0 ? [...data].sort((a,b) => parseFloat(a.missDistanceKm) - parseFloat(b.missDistanceKm))[0].name.replace(/[()]/g, '') : 'N/A'} 
                    color="white" 
                    subValue="MINIMUM SAFE DISTANCE" 
                  />
                </div>

                {/* Charts */}
                <Visuals data={processedData} />
              </div>
            )}

            {/* --- NEO TRACKER (Data Table) --- */}
            {activeTab === 'neo-tracker' && (
              <div className="space-y-10 animate-in slide-in-from-right-4 duration-500">
                <header>
                  <h2 className="text-4xl font-bold text-white tracking-tighter drop-shadow-lg">NEO Tracking Center</h2>
                  <p className="text-slate-400 text-sm mt-1">
                    Active surveillance filtered for mission-critical proximity events.
                  </p>
                </header>
                
                <AsteroidTable asteroids={processedData} />
              </div>
            )}

            {/* --- (Orbital Analysis, Archives) --- */}
            {(activeTab === 'orbital-analysis' || activeTab === 'archives') && (
              <div className="flex flex-col items-center justify-center h-96 border-2 border-dashed border-slate-700/50 rounded-xl bg-[#0B0F19]/30 backdrop-blur-sm">
                <p className="text-slate-500 font-mono tracking-widest uppercase text-sm">
                  Module Offline / Requires Level 4 Authorization
                </p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;