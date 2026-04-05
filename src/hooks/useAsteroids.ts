// src/hooks/useAsteroids.ts
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAsteroids } from '../api/nasaService';
import { useStore } from '../store/useStore';
import { calculateDangerScore } from '../utils/dangerScore';

export const useAsteroids = () => {
  const { startDate, endDate, showOnlyHazardous, sortBy, minVelocity } = useStore();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['asteroids', startDate, endDate],
    queryFn: () => fetchAsteroids(startDate, endDate),
  });

  const processedData = useMemo(() => {
    if (!data) return [];
    let result = [...data];
    
    if (showOnlyHazardous) result = result.filter(a => a.isPotentiallyHazardous);
    
    if (minVelocity > 0) {
      result = result.filter(a => parseFloat(a.velocityKmh) >= minVelocity);
    }
    
    result.sort((a, b) => {
      if (sortBy === 'dangerScore') return calculateDangerScore(b) - calculateDangerScore(a);
      if (sortBy === 'date') return new Date(a.date).getTime() - new Date(b.date).getTime();
      if (sortBy === 'closest') return parseFloat(a.missDistanceKm) - parseFloat(b.missDistanceKm);
      return 0;
    });
    
    return result;
  }, [data, showOnlyHazardous, sortBy, minVelocity]);

  return { 
    rawData: data, 
    processedData, 
    isLoading, 
    isError 
  };
};