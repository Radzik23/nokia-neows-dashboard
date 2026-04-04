// src/api/nasaService.ts
import type { Asteroid, NeoWsResponse } from '../types/asteroid';

const API_KEY = import.meta.env.VITE_NASA_API_KEY;
const BASE_URL = 'https://api.nasa.gov/neo/rest/v1/feed';

export const fetchAsteroids = async (startDate: string, endDate: string): Promise<Asteroid[]> => {
  const response = await fetch(`${BASE_URL}?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`);
  
  if (!response.ok) {
    throw new Error('Nie udało się pobrać danych z API NASA NeoWs');
  }

  const data: NeoWsResponse = await response.json();
  const processedAsteroids: Asteroid[] = [];

  Object.keys(data.near_earth_objects).forEach((date) => {
    const dailyAsteroids = data.near_earth_objects[date];
    
    dailyAsteroids.forEach((neo: any) => {
      processedAsteroids.push({
        id: neo.id,
        name: neo.name,
        date: date,
        estimatedDiameterMin: neo.estimated_diameter.meters.estimated_diameter_min,
        estimatedDiameterMax: neo.estimated_diameter.meters.estimated_diameter_max,
        isPotentiallyHazardous: neo.is_potentially_hazardous_asteroid,
        isSentryObject: neo.is_sentry_object,
        velocityKmh: neo.close_approach_data[0].relative_velocity.kilometers_per_hour,
        missDistanceKm: neo.close_approach_data[0].miss_distance.kilometers,
        absoluteMagnitudeH: neo.absolute_magnitude_h,
      });
    });
  });

  return processedAsteroids;
};