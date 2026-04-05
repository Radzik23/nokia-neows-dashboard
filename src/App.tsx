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
import { IntelligenceFeed } from './components/IntelligenceFeed';
import spaceBackground from './assets/space-background.jpg';

function App() {
  const { activeTab, startDate, endDate, showOnlyHazardous, sortBy } = useStore();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['asteroids', startDate, endDate],
    queryFn: () => fetchAsteroids(startDate, endDate),
  });

  const processedData = useMemo(() => {
    if (!data) return [];
    let result = [...data];
    if (showOnlyHazardous) result = result.filter(a => a.isPotentiallyHazardous);
    result.sort((a, b) => {
      if (sortBy === 'dangerScore') return calculateDangerScore(b) - calculateDangerScore(a);
      if (sortBy === 'date') return new Date(a.date).getTime() - new Date(b.date).getTime();
      if (sortBy === 'closest') return parseFloat(a.missDistanceKm) - parseFloat(b.missDistanceKm);
      return 0;
    });
    return result;
  }, [data, showOnlyHazardous, sortBy]);

  const handleExportCSV = () => {
    if (processedData.length === 0) return;
    const headers = ["NEO Name", "Date", "Velocity", "Distance", "Min Dia", "Max Dia", "Hazard", "Score"];
    const csvRows = [headers.join(","), ...processedData.map(a => 
      [`"${a.name}"`, a.date, a.velocityKmh, a.missDistanceKm, a.estimatedDiameterMin, a.estimatedDiameterMax, a.isPotentiallyHazardous, calculateDangerScore(a)].join(",")
    )];
    const blob = new Blob([csvRows.join("\n")], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'neo_report.csv'; a.click();
  };

  return (
    <div className="flex min-h-screen text-slate-100 font-sans" style={{ backgroundImage: `linear-gradient(rgba(6, 9, 16, 0.6), rgba(6, 9, 16, 0.9)), url(${spaceBackground})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
      
      <Sidebar onExportCSV={handleExportCSV} />

      <main className="flex-1 bg-[#060910]/40 backdrop-blur-sm p-10 overflow-y-auto">
        {isLoading && <div className="text-blue-500 font-mono text-center mt-20 animate-pulse">CONNECTING TO NASA DSN...</div>}

        {data && (
          <div className="animate-in fade-in duration-700">
            {activeTab === 'mission-control' && (
              <div className="space-y-10">
                <header>
                  <h2 className="text-4xl font-bold tracking-tighter">Mission Control</h2>
                  <p className="text-slate-400 text-sm">Real-time surveillance feed active.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard label="Total NEOs" value={data.length} color="blue" />
                  <StatCard label="Hazardous" value={data.filter(a => a.isPotentiallyHazardous).length} color="coral" />
                  <StatCard label="Filtered" value={processedData.length} color="white" />
                  <StatCard label="Closest" value={data.length > 0 ? [...data].sort((a,b) => parseFloat(a.missDistanceKm) - parseFloat(b.missDistanceKm))[0].name.replace(/[()]/g, '') : 'N/A'} color="white" />
                </div>

                <Visuals data={processedData} />
                
                <IntelligenceFeed processedData={processedData} />
              </div>
            )}

            {activeTab === 'neo-tracker' && (
              <div className="space-y-10">
                <h2 className="text-4xl font-bold tracking-tighter">NEO Tracker</h2>
                <AsteroidTable asteroids={processedData} />
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;