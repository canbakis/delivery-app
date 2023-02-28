import { DeliverySlotSelectionState } from './DeliveryModels';

/**
 * Name of the local storage item used to store the delivery slot selection state.
 */
const storeName = 'deliverySlotSelectionState';

/**
 * This is a helper to store the delivery slot selection state in local storage.
 * Used to persist the state across page refreshes.
 */
export const DeliverySlotSelectionStore = {
  /**
   * Gets the state or empty object if not found.
   * Uses `storeName` as key.
   */
  getAll: (): DeliverySlotSelectionState => {
    const savedState = localStorage.getItem(storeName);
    if (savedState) {
      return JSON.parse(savedState);
    }
    return {};
  },

  /**
   * Stores the value for a given key in local storage.
   * Stongly typed to only allow keys from `DeliverySlotSelectionState`
   *
   * @param key keyof `DeliverySlotSelectionState`
   * @param value  value to set
   */
  set: <T extends keyof DeliverySlotSelectionState>(
    key: T,
    value: DeliverySlotSelectionState[T]
  ) => {
    const savedState = DeliverySlotSelectionStore.getAll();
    localStorage.setItem(storeName, JSON.stringify({ ...savedState, [key]: value }));
  },

  /**
   * Gets the value for a given key in local storage.
   * Stongly typed to only allow keys from `DeliverySlotSelectionState`.
   *
   * @param key keyof `DeliverySlotSelectionState`
   * @return value for the given key
   */
  get: <T extends keyof DeliverySlotSelectionState>(key: T): DeliverySlotSelectionState[T] => {
    const savedState = DeliverySlotSelectionStore.getAll();
    return savedState[key];
  },

  /**
   * Removes the local storage item with `storeName` key.
   */
  clear: () => {
    localStorage.removeItem(storeName);
  },
};
