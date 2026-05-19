import { ISensorLocalisation } from '../services/sensor-data/models/sensor-data.model';
import { calculateDistance } from './get_distance_from_coord';

export function filterByDistance(data: ISensorLocalisation[]): ISensorLocalisation[] {
  const result: ISensorLocalisation[] = [];
  for (const point of data) {
    const last = result.at(-1);
    if (!last) {
      result.push(point);
      continue;
    }
    const distance = calculateDistance(
      { lat: last.latitude, lng: last.longitude },
      { lat: point.latitude, lng: point.longitude },
      'm',
    );

    if (distance < 50) {
      result[result.length - 1] = point;
    } else {
      result.push(point);
    }
  }

  return result;
}
