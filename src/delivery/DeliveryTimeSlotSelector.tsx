import { useEffect, useState } from 'react';
import DeliveryDateSelector from './components/DeliveryDateSelector';
import DeliveryTimeSelector from './components/DeliveryTimeSelector';
import InHomeDeliveryCheckbox from './components/InHomeDeliveryCheckbox';
import { DeliveryAPI } from './shared/DeliveryApi';
import { isTimeAvailable } from './shared/DeliveryApiUtils';
import { DeliveryTime } from './shared/DeliveryModels';
import { DeliverySlotSelectionStore } from './shared/DeliverySlotSelectionStore';

interface DeliveryTimeSlotSelectorProps {
  onNext: () => void;
}

function DeliveryTimeSlotSelector({ onNext }: DeliveryTimeSlotSelectorProps) {
  // maybe better to use useReducer here to make it cleaner?
  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    DeliverySlotSelectionStore.get('selectedDate')
  );
  const [selectedTime, setSelectedTime] = useState<DeliveryTime | undefined>(
    DeliverySlotSelectionStore.get('selectedTime')
  );
  const [inHomeDelivery, setInHomeDelivery] = useState(
    DeliverySlotSelectionStore.get('inHomeDelivery') || false
  );
  const [deliveryDatesLoaded, setDeliveryDatesLoaded] = useState<boolean>(false);
  const [deliveryTimesLoaded, setDeliveryTimesLoaded] = useState<boolean>(false);
  const [deliveryDates, setDeliveryDates] = useState<string[]>([]);
  const [deliveryTimes, setDeliveryTimes] = useState<DeliveryTime[]>([]);

  useEffect(() => {
    // Gets delivery dates
    DeliveryAPI.getDates()
      .then((dates) => setDeliveryDates(dates))
      .finally(() => setDeliveryDatesLoaded(true));
  }, []);

  useEffect(() => {
    // Gets delivery times for the selected date
    if (selectedDate) {
      setDeliveryTimesLoaded(false);
      DeliveryAPI.getTimes(selectedDate)
        .then((times) => setDeliveryTimes(times))
        .finally(() => setDeliveryTimesLoaded(true));
    }
  }, [selectedDate]);

  useEffect(() => {
    // Selects first date if none is selected
    if (!selectedDate && deliveryDatesLoaded && deliveryDates.length > 0) {
      setSelectedDate(deliveryDates[0]);
    }
  }, [selectedDate, deliveryDates, deliveryDatesLoaded]);

  useEffect(() => {
    const filteredDeliveryTimes = getFilteredDeliveryTimes(deliveryTimes, inHomeDelivery);

    // If the previously selected time is not available anymore, reset it
    if (
      selectedTime &&
      deliveryTimesLoaded &&
      !isTimeAvailable(filteredDeliveryTimes, selectedTime)
    ) {
      setSelectedTime(undefined);
    }
  }, [selectedTime, deliveryTimes, deliveryTimesLoaded, inHomeDelivery]);

  useEffect(() => {
    // Stores the delivery selection state in store
    DeliverySlotSelectionStore.set('selectedDate', selectedDate);
    DeliverySlotSelectionStore.set('selectedTime', selectedTime);
    DeliverySlotSelectionStore.set('inHomeDelivery', inHomeDelivery);
  }, [selectedDate, selectedTime, inHomeDelivery]);

  /**
   * Returns filtered delivery times based on whether in-home delivery is selected or not
   */
  function getFilteredDeliveryTimes(deliveryTimes: DeliveryTime[], inHomeDelivery: boolean) {
    const filteredDeliveryTimes = deliveryTimes.filter((time) => time.inHomeAvailable === true);

    return inHomeDelivery ? filteredDeliveryTimes : deliveryTimes;
  }

  /**
   * Enable/disable Proceed button based on whether a time is selected or not
   */
  const isProceedButtonDisabled = !selectedTime;

  return (
    <div>
      <h1>🚚 Select Delivery Time</h1>

      <DeliveryDateSelector
        isLoading={!deliveryDatesLoaded}
        deliveryDates={deliveryDates}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      <InHomeDeliveryCheckbox
        inHomeDelivery={inHomeDelivery}
        setInHomeDelivery={setInHomeDelivery}
      />

      <DeliveryTimeSelector
        isLoading={!deliveryTimesLoaded}
        deliveryTimes={getFilteredDeliveryTimes(deliveryTimes, inHomeDelivery)}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
      />

      <button
        data-testid="delivery-selector-next-button"
        style={{ width: '15rem', marginTop: '2rem' }}
        disabled={isProceedButtonDisabled}
        className={`button primary ${isProceedButtonDisabled ? 'disabled' : ''}`}
        onClick={onNext}>
        Next
      </button>
    </div>
  );
}

export default DeliveryTimeSlotSelector;
