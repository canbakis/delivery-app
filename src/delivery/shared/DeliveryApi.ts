import { isDateStringArray, isDeliveryTimeArray, sortDateStringsAsc } from './DeliveryApiUtils';

/**
 * Base url for the `DeliveryAPI`.
 */
const baseUrl = 'https://api.mathem.io/mh-test-assignment/delivery';

/**
 * Delivery API that fetches dates and times.
 * Uses base url from `baseUrl` and appends the path to it.
 */
export const DeliveryAPI = {
  /**
   * Gets the dates from delivery api and sorts them in ascending order.
   */
  getDates: () =>
    fetch(`${baseUrl}/dates`)
      .then((response) => response.json())
      .then((dates) => {
        // Type guard checkng if dates is an array of date strings
        if (isDateStringArray(dates)) {
          // Sort dates in ascending order
          dates.sort(sortDateStringsAsc);
          return dates;
        } else {
          throw new Error('Invalid response from server');
        }
      }),

  /**
   * Gets the times from delivery api and sorts them in ascending order.
   * @param date date string
   */
  getTimes: (date: string) =>
    fetch(`${baseUrl}/times/${date}`)
      .then((response) => response.json())
      .then((times) => {
        // Type guard checkng if times is an array of DeliveryTime objects
        if (isDeliveryTimeArray(times)) {
          // Sort times in ascending order, based on startTime
          times.sort((a, b) =>
            sortDateStringsAsc(
              `${a.deliveryDate} ${a.startTime}`,
              `${b.deliveryDate} ${b.startTime}`
            )
          );
          return times;
        } else {
          throw new Error('Invalid response from server');
        }
      }),
};
