// src/types/asteroid.ts

export interface Asteroid {
  id: string;
  name: string;
  date: string;
  estimatedDiameterMin: number;
  estimatedDiameterMax: number;
  isPotentiallyHazardous: boolean;
  isSentryObject: boolean;
  velocityKmh: string;
  missDistanceKm: string;
  absoluteMagnitudeH: number;
  dangerScore?: number;
  funFact?: string;
}

export interface NeoWsResponse {
  element_count: number;
  near_earth_objects: {
    [date: string]: any[];
  };
}