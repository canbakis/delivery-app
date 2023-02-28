import { DeliveryTime } from './DeliveryModels';

/**
 * Sorts date strings in ascending order.
 * @param a date string
 * @param b date string
 * @returns number
 * @example
 * ['2020-01-03', '2020-01-02', '2020-01-01'].sort(sortDateStringsAsc) // ['2020-01-01', '2020-01-02', '2020-01-03']
 */
export function sortDateStringsAsc(a: string, b: string): number {
  return new Date(a).getTime() - new Date(b).getTime();
}

/**
 * Typeguard to check if a string is a date string.
 * @param json from api
 * @returns true if the string is a date string.
 * @example
 * isDateString('2020-01-01T00:00:00.000Z') // true
 * isDateString('2020-01-01') // true
 * isDateString('abc') // false
 */
export function isDateString(json: unknown): json is string {
  return typeof json === 'string' && !isNaN(Date.parse(json));
}

/**
 * Typeguard to check if an array is consisted of date strings.
 * @param json from api
 * @returns true if the array is consisted of date strings.
 */
export function isDateStringArray(json: unknown): json is string[] {
  return Array.isArray(json) && json.every(isDateString);
}

/**
 * Typeguard to check if an object is a `DeliveryTime` object.
 * @param json from api
 * @returns true if the object is a `DeliveryTime` object.
 */
export function isDeliveryTime(json: unknown): json is DeliveryTime {
  return (
    typeof json === 'object' &&
    json !== null &&
    'deliveryDate' in json &&
    'deliveryTimeId' in json &&
    'inHomeAvailable' in json &&
    'startTime' in json &&
    'stopTime' in json &&
    typeof json.deliveryDate === 'string' &&
    typeof json.deliveryTimeId === 'string' &&
    typeof json.inHomeAvailable === 'boolean' &&
    typeof json.startTime === 'string' &&
    typeof json.stopTime === 'string'
  );
}

/**
 * Typeguard to check if an array is consisted of `DeliveryTime` objects.
 * @param json from api
 * @returns true if the array is consisted of `DeliveryTime` objects.
 */
export function isDeliveryTimeArray(json: unknown): json is DeliveryTime[] {
  return Array.isArray(json) && json.every(isDeliveryTime);
}

/**
 * Checks if the selected time is in the list of available times.
 */
export function isTimeAvailable(
  availableTimes: DeliveryTime[],
  selectedTime: DeliveryTime
): boolean {
  return availableTimes.some((time) => time.deliveryTimeId === selectedTime.deliveryTimeId);
}
