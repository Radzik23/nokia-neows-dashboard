// src/views/MissionControl.tsx
import { StatCard } from '../components/StatCard';
import { Visuals } from '../components/Visuals';
import { IntelligenceFeed } from '../components/IntelligenceFeed';
import type { Asteroid } from '../types/asteroid';

interface Props {
  rawData: Asteroid[];
  processedData: Asteroid[];
}

export const MissionControl = ({ rawData, processedData }: Props) => {
  return (
    <div className="space-y-6 md:space-y-10">
      <header>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Mission Control</h2>
        <p className="text-slate-400 text-sm">Real-time surveillance feed active.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard label="Total NEOs" value={rawData.length} color="blue" />
        <StatCard label="Hazardous" value={rawData.filter((a) => a.isPotentiallyHazardous).length} color="coral" />
        <StatCard label="Filtered" value={processedData.length} color="white" />
        <StatCard label="Closest" value={rawData.length > 0 ? [...rawData].sort((a, b) => parseFloat(a.missDistanceKm) - parseFloat(b.missDistanceKm))[0].name.replace(/[()]/g, '') : 'N/A'} color="white" />
      </div>

      <Visuals data={processedData} />
      <IntelligenceFeed processedData={processedData} />
    </div>
  );
};