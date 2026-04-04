// src/components/AsteroidTable.tsx
import type { Asteroid } from '../types/asteroid';
import { calculateDangerScore } from '../utils/dangerScore';
import { getSizeComparison } from '../utils/funFacts';
import { AlertTriangle } from 'lucide-react'; // Usunąłem nieużywane 'Info'

interface Props {
  asteroids: Asteroid[];
}

export const AsteroidTable = ({ asteroids }: Props) => {
  return (
    <div className="overflow-x-auto bg-slate-800 rounded-xl border border-slate-700 shadow-2xl">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-900/50 border-b border-slate-700">
            <th className="p-4 font-semibold text-slate-300">Name</th>
            <th className="p-4 font-semibold text-slate-300">Date</th>
            <th className="p-4 font-semibold text-slate-300">Size (Avg)</th>
            <th className="p-4 font-semibold text-slate-300">Velocity</th>
            <th className="p-4 font-semibold text-slate-300">Distance</th>
            <th className="p-4 font-semibold text-slate-300 text-center">Danger Score</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700/50">
          {asteroids.map((asteroid) => {
            const score = calculateDangerScore(asteroid);
            const avgSize = (asteroid.estimatedDiameterMin + asteroid.estimatedDiameterMax) / 2;
            
            return (
              <tr 
                key={asteroid.id} 
                className="hover:bg-slate-700/30 transition-colors group"
              >
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white">{asteroid.name}</span>
                    {asteroid.isPotentiallyHazardous && (
                      <AlertTriangle 
                        size={16} 
                        className="text-amber-500" 
                        aria-label="Potentially Hazardous" 
                      />
                    )}
                  </div>
                </td>
                <td className="p-4 text-slate-400 text-sm">{asteroid.date}</td>
                <td className="p-4">
                  <div className="flex flex-col">
                    <span className="text-white">{avgSize.toFixed(1)} m</span>
                    <span className="text-[10px] text-slate-500 italic uppercase">
                      {getSizeComparison(avgSize)}
                    </span>
                  </div>
                </td>
                <td className="p-4 text-slate-400 text-sm">
                  {Math.round(parseFloat(asteroid.velocityKmh)).toLocaleString()} km/h
                </td>
                <td className="p-4 text-slate-400 text-sm">
                  {(parseFloat(asteroid.missDistanceKm) / 1000000).toFixed(2)} mln km
                </td>
                <td className="p-4 text-center">
                  <div className={`
                    inline-block px-3 py-1 rounded-full text-xs font-bold
                    ${score > 75 ? 'bg-red-500/20 text-red-400 border border-red-500/50' : 
                      score > 40 ? 'bg-amber-500/20 text-amber-400 border border-amber-500/50' : 
                      'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'}
                  `}>
                    {score} / 100
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      
      {asteroids.length === 0 && (
        <div className="p-12 text-center text-slate-500">
          No asteroids found matching the selected filters.
        </div>
      )}
    </div>
  );
};