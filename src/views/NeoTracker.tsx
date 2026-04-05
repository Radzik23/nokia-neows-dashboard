// src/views/NeoTracker.tsx
import { AsteroidTable } from '../components/AsteroidTable';
import type { Asteroid } from '../types/asteroid';

interface Props {
  processedData: Asteroid[];
}

export const NeoTracker = ({ processedData }: Props) => {
  return (
    <div className="space-y-6 md:space-y-10">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">NEO Tracker</h2>
      <AsteroidTable asteroids={processedData} />
    </div>
  );
};