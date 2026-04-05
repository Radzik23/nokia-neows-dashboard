// src/components/Visuals.tsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Cell } from 'recharts';
import type { Asteroid } from '../types/asteroid';
import { calculateDangerScore } from '../utils/dangerScore';

interface Props {
  data: Asteroid[];
}

export const Visuals = ({ data }: Props) => {
  const dailyCount = data.reduce((acc: any, curr) => {
    acc[curr.date] = (acc[curr.date] || 0) + 1;
    return acc;
  }, {});

  const areaData = Object.keys(dailyCount).map(date => ({
    date,
    count: dailyCount[date]
  })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const topAsteroids = [...data]
    .sort((a, b) => b.estimatedDiameterMax - a.estimatedDiameterMax)
    .slice(0, 5)
    .map(a => ({
      name: a.name.replace(/[()]/g, ''),
      size: Math.round((a.estimatedDiameterMax + a.estimatedDiameterMin) / 2),
      score: calculateDangerScore(a)
    }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      {/* CHART 1: DAILY ACTIVITY */}
      <div className="bg-[#0B0F19]/60 backdrop-blur-md p-4 md:p-6 rounded-xl border border-slate-700/50 shadow-xl">
        <h3 className="text-white text-[10px] font-black tracking-[0.2em] uppercase mb-6 opacity-50">Daily Activity (Objects Count)</h3>
        <div className="h-[250px] md:h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={areaData}>
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="date" stroke="#475569" fontSize={10} tickMargin={10} />
              <YAxis stroke="#475569" fontSize={10} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                itemStyle={{ color: '#3b82f6' }}
              />
              <Area type="monotone" dataKey="count" stroke="#3b82f6" fillOpacity={1} fill="url(#colorCount)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* CHART 2: TOP 5 LARGEST VS SCORE */}
      <div className="bg-[#0B0F19]/60 backdrop-blur-md p-4 md:p-6 rounded-xl border border-slate-700/50 shadow-xl">
        <h3 className="text-white text-[10px] font-black tracking-[0.2em] uppercase mb-6 opacity-50">Top 5 Largest (Size vs Danger Score)</h3>
        <div className="h-[250px] md:h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topAsteroids} layout="vertical" margin={{ left: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={true} vertical={false} />
              <XAxis type="number" stroke="#475569" fontSize={10} hide />
              <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={9} width={80} />
              <Tooltip 
                cursor={{ fill: '#1e293b', opacity: 0.4 }}
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
              />
              <Bar 
                dataKey="size" 
                radius={[0, 4, 4, 0]} 
                barSize={12}
              >
                {topAsteroids.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.score > 70 ? '#FF7E67' : entry.score > 40 ? '#f59e0b' : '#10b981'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-[9px] text-slate-500 mt-4 uppercase tracking-tighter text-center">Color indicates Danger Score: Green (Low) | Yellow (Mid) | Red (High)</p>
      </div>
    </div>
  );
};