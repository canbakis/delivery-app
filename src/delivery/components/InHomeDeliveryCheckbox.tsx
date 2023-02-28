import './InHomeDeliveryCheckbox.css';

interface InHomeDeliveryCheckboxProps {
  inHomeDelivery: boolean;
  setInHomeDelivery: (inHomeDelivery: boolean) => void;
}

function InHomeDeliveryCheckbox({
  inHomeDelivery,
  setInHomeDelivery,
}: InHomeDeliveryCheckboxProps) {
  function handleInHomeDeliveryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const inHomeDelivery = event.target.checked;
    setInHomeDelivery(inHomeDelivery);
  }

  return (
    <div className="in-home-delivery-checkbox" data-testid="in-home-delivery-checkbox">
      <label htmlFor="in-home-delivery">In Home Delivery</label>
      <input
        id="in-home-delivery"
        type="checkbox"
        checked={inHomeDelivery}
        onChange={handleInHomeDeliveryChange}
      />
    </div>
  );
}

export default InHomeDeliveryCheckbox;
