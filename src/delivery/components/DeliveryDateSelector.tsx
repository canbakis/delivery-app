import './DeliveryDateSelector.css';

/**
 * I would like to make these readonly for this component, maybe using context api?
 */
interface DeliveryDateSelectProps {
  isLoading: boolean;
  deliveryDates: string[];
  selectedDate: string | undefined;
  setSelectedDate: (date: string) => void;
}

/**
 * Delivery date selector component
 * @param props `DeliveryDateSelectProps`
 * @returns
 * - `Loading...` if `isLoading` is true
 * -  Buttons with delivery dates otherwise
 */
function DeliveryDateSelector({
  isLoading,
  deliveryDates,
  selectedDate,
  setSelectedDate,
}: DeliveryDateSelectProps) {
  function isSelected(date: string) {
    return selectedDate === date;
  }

  if (isLoading) {
    return <p data-testid="delivery-date-selector-loading">Loading...</p>;
  }

  // I wanted to made dates horizontally scrollable on mobile devices, but decided to leave it for now
  return (
    <div className="dates" data-testid="delivery-date-selector">
      {deliveryDates.map((date, index) => (
        <button
          key={index}
          className={`button slot ${isSelected(date) ? 'accent selected' : ''}`}
          onClick={() => setSelectedDate(date)}>
          {date}
        </button>
      ))}
    </div>
  );
}

export default DeliveryDateSelector;
