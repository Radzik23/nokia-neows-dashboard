// src/components/Visuals.tsx
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, Cell 
} from 'recharts';
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
      name: a.name.replace('(', '').replace(')', ''),
      size: Math.round((a.estimatedDiameterMax + a.estimatedDiameterMin) / 2),
      score: calculateDangerScore(a)
    }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* CHART 1: DAILY ACTIVITY */}
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl">
        <h3 className="text-slate-300 text-sm font-bold uppercase tracking-wider mb-6">Daily Activity (Objects count)</h3>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={areaData}>
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="date" stroke="#64748b" fontSize={12} tickMargin={10} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                itemStyle={{ color: '#60a5fa' }}
              />
              <Area type="monotone" dataKey="count" stroke="#3b82f6" fillOpacity={1} fill="url(#colorCount)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* CHART 2: TOP 5 LARGEST VS SCORE */}
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl">
        <h3 className="text-slate-300 text-sm font-bold uppercase tracking-wider mb-6">Top 5 Largest (Size vs Danger Score)</h3>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topAsteroids} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
              <XAxis type="number" stroke="#64748b" fontSize={12} hide />
              <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={10} width={80} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                cursor={{ fill: '#334155', opacity: 0.4 }}
              />
              <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={20}>
                {topAsteroids.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.score > 70 ? '#ef4444' : '#10b981'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-[10px] text-slate-500 mt-4 text-center">Color indicates Danger Score: Green (Low/Mid) | Red (High)</p>
      </div>
    </div>
  );
};