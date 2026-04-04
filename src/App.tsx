// src/App.tsx
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAsteroids } from './api/nasaService';
import { useStore } from './store/useStore';
import { Sidebar } from './components/Sidebar';
import { AsteroidTable } from './components/AsteroidTable';
import { calculateDangerScore } from './utils/dangerScore';
import { Visuals } from './components/Visuals';

function App() {
  const { startDate, endDate, showOnlyHazardous, sortBy } = useStore();

  // 1. Data Fetching
  const { data, isLoading, isError } = useQuery({
    queryKey: ['asteroids', startDate, endDate],
    queryFn: () => fetchAsteroids(startDate, endDate),
  });

  // 2. Data Processing (Filtering & Sorting)
  const processedData = useMemo(() => {
    if (!data) return [];

    let result = [...data];

    // Apply Filter
    if (showOnlyHazardous) {
      result = result.filter(a => a.isPotentiallyHazardous);
    }

    // Apply Sorting
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
    <div className="flex min-h-screen bg-slate-900 text-slate-100 font-sans">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Near-Earth Objects Overview
          </h2>
          <p className="text-slate-400 mt-2 text-lg">
            Real-time monitoring of asteroids within the selected timeframe.
          </p>
        </header>

        {isLoading && (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="text-slate-400 animate-pulse">Fetching data from NASA...</p>
          </div>
        )}

        {isError && (
          <div className="bg-red-900/20 border border-red-500/50 text-red-200 p-6 rounded-xl">
            <h3 className="font-bold text-lg">Connection Error</h3>
            <p>Could not fetch data. Please ensure your API key is valid and the date range does not exceed 7 days.</p>
          </div>
        )}

        {data && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* STATS CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl">
                <p className="text-slate-400 text-sm uppercase font-bold tracking-widest">
                  Objects Detected
                </p>
                <p className="text-4xl font-mono mt-2 text-blue-400">
                  {data.length}
                </p>
              </div>
              
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl">
                <p className="text-slate-400 text-sm uppercase font-bold tracking-widest">
                  Displayed Items
                </p>
                <p className="text-4xl font-mono mt-2 text-emerald-400">
                  {processedData.length}
                </p>
              </div>
            </div>
            
            {/* MAIN DATA TABLE */}
            <AsteroidTable asteroids={processedData} />

            {/* CHART PLACEHOLDER*/}
            <div className="bg-slate-800/50 h-48 rounded-2xl border-2 border-dashed border-slate-700 flex items-center justify-center">
              <p className="text-slate-500 italic">Visual Analytics Section (Charts) - Next Phase</p>
            </div>
            {/* VISUAL ANALYTICS SECTION */}
            <Visuals data={processedData} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;