export function calculateDistance(
  from: { lat: number; lng: number },
  to: { lat: number; lng: number },
  unit: 'km' | 'm' = 'm',
): number {
  const EARTH_RADIUS_KM = 6371;

  const toRadians = (deg: number) => (deg * Math.PI) / 180;

  const latDelta = toRadians(to.lat - from.lat);
  const lonDelta = toRadians(to.lng - from.lng);

  const lat1 = toRadians(from.lat);
  const lat2 = toRadians(to.lat);

  const a =
    Math.sin(latDelta / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(lonDelta / 2) ** 2;

  const c = 2 * Math.asin(Math.sqrt(a));

  const distanceKm = EARTH_RADIUS_KM * c;

  return unit === 'm' ? distanceKm * 1000 : distanceKm;
}
