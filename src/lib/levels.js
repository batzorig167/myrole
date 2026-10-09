// Оноонд тохирох түвшинг олно: `min` нь оноогоос бага буюу тэнцүү хамгийн өндөр түвшин.
export function findLevel(levels, score) {
  const sorted = [...(levels || [])].sort((a, b) => b.min - a.min);
  return sorted.find((level) => score >= level.min) || sorted[sorted.length - 1] || null;
}
