import { DeliveryTime } from '../shared/DeliveryModels';

interface DeliveryTimeSelectorProps {
  isLoading: boolean;
  deliveryTimes: DeliveryTime[];
  selectedTime: DeliveryTime | undefined;
  setSelectedTime: (time: DeliveryTime) => void;
}

/**
 * Delivery time selector component
 * @param props `DeliveryTimeSelectorProps`
 * @returns
 * - `Loading...` if `isLoading` is true
 * - `No available time slot` if `deliveryTimes` is empty
 * - Buttons with delivery start and end times otherwise
 */
function DeliveryTimeSelector({
  isLoading,
  deliveryTimes,
  selectedTime,
  setSelectedTime,
}: DeliveryTimeSelectorProps) {
  function isSelected(time: DeliveryTime) {
    return selectedTime?.deliveryTimeId === time.deliveryTimeId;
  }

  if (isLoading) {
    return <p data-testid="delivery-time-selector-loading">Loading...</p>;
  }

  if (deliveryTimes.length === 0) {
    return <p data-testid="delivery-time-selector-not-found">No available time slot 😭</p>;
  }

  return (
    <div data-testid="delivery-time-selector">
      {deliveryTimes.map((time, index) => (
        <button
          key={index}
          className={`button slot ${isSelected(time) ? 'accent selected' : ''}`}
          onClick={() => setSelectedTime(time)}>
          {time.startTime} - {time.stopTime}
        </button>
      ))}
    </div>
  );
}

export default DeliveryTimeSelector;
