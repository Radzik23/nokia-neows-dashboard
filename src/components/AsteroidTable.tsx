// src/components/AsteroidTable.tsx
import type { Asteroid } from '../types/asteroid';
import { calculateDangerScore } from '../utils/dangerScore';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

interface Props {
  asteroids: Asteroid[];
}

export const AsteroidTable = ({ asteroids }: Props) => {
  return (
    <div className="w-full bg-[#0B0F19] rounded-xl border border-slate-800/50 shadow-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800/50">
              <th className="p-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">NEO Designation</th>
              <th className="p-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Closest Approach</th>
              <th className="p-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Rel. Velocity</th>
              <th className="p-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Miss Distance</th>
              <th className="p-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Diameter (M)</th>
              <th className="p-5 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Hazard Status</th>
              <th className="p-5 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Danger Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/30">
            {asteroids.map((asteroid) => {
              const score = calculateDangerScore(asteroid);
              // Formatujemy nazwę, żeby usunąć nawiasy jeśli są, dla czystszego wyglądu
              const cleanName = asteroid.name.replace(/[()]/g, '');
              
              return (
                <tr 
                  key={asteroid.id} 
                  className="hover:bg-slate-800/20 transition-colors group"
                >
                  {/* NEO Designation */}
                  <td className="p-5">
                    <div className="flex flex-col">
                      <span className="font-bold text-white tracking-wide">{cleanName}</span>
                      <span className="text-[10px] text-slate-500 font-mono mt-1">ID: {asteroid.id}</span>
                    </div>
                  </td>

                  {/* Closest Approach */}
                  <td className="p-5">
                    <div className="flex flex-col">
                      <span className="text-slate-300 font-mono text-sm">{asteroid.date}</span>
                    </div>
                  </td>

                  {/* Rel. Velocity */}
                  <td className="p-5">
                    <div className="flex items-baseline gap-1">
                      <span className="text-white font-mono text-sm">
                        {Math.round(parseFloat(asteroid.velocityKmh)).toLocaleString()}
                      </span>
                      <span className="text-[10px] text-blue-500 font-bold tracking-widest">km/h</span>
                    </div>
                  </td>

                  {/* Miss Distance */}
                  <td className="p-5">
                    <div className="flex flex-col">
                      <span className="text-white font-mono text-sm">
                        {(parseFloat(asteroid.missDistanceKm) / 1000000).toFixed(4)}
                      </span>
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">mln km</span>
                    </div>
                  </td>

                  {/* Diameter */}
                  <td className="p-5">
                    <span className="text-slate-300 font-mono text-sm">
                      {asteroid.estimatedDiameterMin.toFixed(1)} - {asteroid.estimatedDiameterMax.toFixed(1)}
                    </span>
                  </td>

                  {/* Hazard Status */}
                  <td className="p-5 text-center">
                    <div className="flex justify-center">
                      {asteroid.isPotentiallyHazardous ? (
                        <AlertTriangle size={18} className="text-[#FF7E67]" aria-label="Hazardous" />
                      ) : (
                        <ShieldCheck size={18} className="text-slate-600" aria-label="Safe" />
                      )}
                    </div>
                  </td>

                  {/* Danger Score Badge */}
                  <td className="p-5">
                    <div className="flex justify-center">
                      <div className={`
                        w-10 h-10 rounded-xl flex items-center justify-center font-mono text-sm font-bold border-2
                        ${score > 75 ? 'border-[#FF7E67]/30 text-[#FF7E67] bg-[#FF7E67]/10' : 
                          score > 40 ? 'border-amber-500/30 text-amber-500 bg-amber-500/10' : 
                          'border-blue-500/30 text-blue-400 bg-blue-500/10'}
                      `}>
                        {score}
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        
        {asteroids.length === 0 && (
          <div className="p-16 text-center flex flex-col items-center gap-3">
            <ShieldCheck size={48} className="text-slate-700" />
            <p className="text-slate-500 font-mono text-sm tracking-widest uppercase">
              No objects detected within designated parameters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};