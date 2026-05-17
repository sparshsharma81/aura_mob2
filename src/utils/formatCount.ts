export function formatCount(value?: number) {
  if (!value) return '0';
  if (value < 1000) return String(value);
  if (value < 1000000) return `${(value / 1000).toFixed(1)}K`;
  return `${(value / 1000000).toFixed(1)}M`;
}
