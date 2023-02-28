import { DeliverySlotSelectionStore } from './shared/DeliverySlotSelectionStore';

interface DeliverySummaryProps {
  onBack: () => void;
  onConfirm: () => void;
}

function DeliverySummary({ onBack, onConfirm }: DeliverySummaryProps) {
  /**
   * Gets the data from the `DeliverySlotSelectionStore` and returns a summary text.
   * Throws an error if no date or time is selected.
   *
   * @returns Summary text of the delivery selection
   */
  function getSummary(): string {
    const {
      selectedDate: date,
      selectedTime: time,
      inHomeDelivery,
    } = DeliverySlotSelectionStore.getAll();

    if (date && time) {
      return `You have selected ${date} at ${time.startTime}-${time.stopTime} for ${
        inHomeDelivery ? 'in-home ' : ''
      }delivery.`;
    } else {
      throw new Error('No date or time selected');
    }
  }

  return (
    <div>
      <h1>😎 Delivery Summary</h1>

      <p data-testid="delivery-summary-text">{getSummary()}</p>

      <button
        data-testid="delivery-summary-back-button"
        style={{ width: '15rem', marginTop: '2rem' }}
        className={`button accent`}
        onClick={onBack}>
        Back
      </button>

      <button
        data-testid="delivery-summary-confirm-button"
        style={{ width: '15rem', marginTop: '2rem' }}
        className={`button primary`}
        onClick={onConfirm}>
        Confirm
      </button>
    </div>
  );
}

export default DeliverySummary;
