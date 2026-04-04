// src/utils/funFacts.ts
export const getSizeComparison = (diameterInMeters: number): string => {
  const avg = diameterInMeters;

  if (avg < 10) return "Wielkość dużego samochodu dostawczego.";
  if (avg < 50) return "Porównywalna do szerokości boiska piłkarskiego.";
  if (avg < 150) return "Większa niż Statua Wolności.";
  if (avg < 300) return "Wielkość Wieży Eiffla.";
  if (avg < 1000) return "Prawie tak długa jak 10 boisk do piłki nożnej.";
  return "Gigant! Większy niż najwyższe budynki świata.";
};