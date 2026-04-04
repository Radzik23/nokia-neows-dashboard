// src/App.tsx
import { useQuery } from '@tanstack/react-query';
import { fetchAsteroids } from './api/nasaService';
import { useStore } from './store/useStore';
import { calculateDangerScore } from './utils/dangerScore';
import { getSizeComparison } from './utils/funFacts';

function App() {
  // Wyciągamy daty z naszego globalnego stanu
  const { startDate, endDate } = useStore();

  // React Query "słucha" zmiennych startDate i endDate. Gdy się zmienią, samo pobierze dane!
  const { data, isLoading, isError } = useQuery({
    queryKey: ['asteroids', startDate, endDate],
    queryFn: () => fetchAsteroids(startDate, endDate),
  });

  // Tymczasowy kod do sprawdzenia w konsoli, czy algorytmy działają
  if (data && data.length > 0) {
    const sample = data[0];
    const avgSize = (sample.estimatedDiameterMin + sample.estimatedDiameterMax) / 2;
    console.log("--- TEST LOGIKI ---");
    console.log("Pobrane asteroidy (spłaszczone):", data);
    console.log("Przykładowy obiekt:", sample.name);
    console.log("Jego Danger Score:", calculateDangerScore(sample));
    console.log("Ciekawostka:", getSizeComparison(avgSize));
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-400 mb-6">Nokia NEO Dashboard</h1>
        
        {isLoading && <p className="text-yellow-400 text-xl animate-pulse">Łączenie z serwerami NASA...</p>}
        {isError && <p className="text-red-500 text-xl">Wystąpił błąd podczas pobierania. Sprawdź klucz API!</p>}
        
        {data && (
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 shadow-xl">
            <p className="text-green-400 text-2xl mb-2">Sukces! 🚀</p>
            <p className="text-slate-300">
              Pobrano dane o <span className="font-bold text-white">{data.length}</span> asteroidach z ostatnich 7 dni.
            </p>
            <p className="mt-4 text-sm text-slate-400">
              Otwórz narzędzia deweloperskie w przeglądarce (F12 -&gt; Console), aby zobaczyć szczegóły i przetestowany algorytm.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;