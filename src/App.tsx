// src/App.tsx
import { useQuery } from '@tanstack/react-query';
import { fetchAsteroids } from './api/nasaService';
import { useStore } from './store/useStore';
import { Sidebar } from './components/Sidebar';

function App() {
  const { startDate, endDate } = useStore();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['asteroids', startDate, endDate],
    queryFn: () => fetchAsteroids(startDate, endDate),
  });

  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-100 font-sans">
      {/* LEFT SIDEBAR - Controls & Filters */}
      <Sidebar />

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Near-Earth Objects Overview
          </h2>
          <p className="text-slate-400 mt-2 text-lg">
            Real-time monitoring of asteroids within the selected timeframe.
          </p>
        </header>

        {/* LOADING STATE */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="text-slate-400 animate-pulse">Fetching data from NASA...</p>
          </div>
        )}

        {/* ERROR STATE */}
        {isError && (
          <div className="bg-red-900/20 border border-red-500/50 text-red-200 p-6 rounded-xl flex flex-col gap-2">
            <h3 className="font-bold text-lg">Connection Error</h3>
            <p>Could not fetch data. Please ensure your API key is valid and the date range does not exceed 7 days.</p>
          </div>
        )}

        {/* SUCCESS STATE - Dashboard Content */}
        {data && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* TOP STATS CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl hover:border-blue-500/50 transition-colors">
                <p className="text-slate-400 text-sm uppercase font-bold tracking-widest">
                  Objects Detected
                </p>
                <p className="text-4xl font-mono mt-2 text-blue-400">
                  {data.length}
                </p>
              </div>
              
              {/*  */}
            </div>
            
            {/* DATA VISUALIZATION AREA  */}
            <div className="bg-slate-800/50 min-h-[400px] rounded-2xl border-2 border-dashed border-slate-700 flex items-center justify-center">
              <div className="text-center">
                <p className="text-slate-500 text-lg italic">
                  Data Table and Visual Analytics Section
                </p>
                <p className="text-slate-600 text-sm mt-2">
                  Coming soon in the next development phase
                </p>
              </div>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}

export default App;