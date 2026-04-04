// src/utils/dangerScore.ts
import type { Asteroid } from '../types/asteroid';

export const calculateDangerScore = (asteroid: Asteroid): number => {
  let score = 0;


  const avgDiameter = (asteroid.estimatedDiameterMin + asteroid.estimatedDiameterMax) / 2;
  score += Math.log10(avgDiameter + 1) * 15;

  const velocity = parseFloat(asteroid.velocityKmh);
  score += (velocity / 25000) * 10;

  const distance = parseFloat(asteroid.missDistanceKm);
  const proximityPoints = Math.max(0, 25 * (1 - distance / 10000000));
  score += proximityPoints;

  if (asteroid.isPotentiallyHazardous) {
    score += 40;
  }

  return Math.min(Math.round(score), 100);
};