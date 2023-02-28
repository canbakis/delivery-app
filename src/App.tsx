import { useState } from 'react';
import './App.css';
import { AppPages } from './AppPages';
import DeliverySummary from './delivery/DeliverySummary';
import DeliveryTimeSlotSelector from './delivery/DeliveryTimeSlotSelector';
import { DeliverySlotSelectionStore } from './delivery/shared/DeliverySlotSelectionStore';

function App() {
  // I'm using a state to keep track of the current page
  const [currentPage, setCurrentPage] = useState<AppPages>('delivery');

  /**
   * Handles page change
   * @param page the page to go to
   */
  function handlePageChange(page: AppPages) {
    setCurrentPage(page);
  }

  /**
   * Resets everything and goes back to the delivery page
   */
  function handleConfirm() {
    DeliverySlotSelectionStore.clear();
    setCurrentPage('delivery');
  }

  /**
   * Renders given page component
   * @param page the page to render
   * @returns 
   */
  function renderPage(page: AppPages) {
    switch (page) {
      case 'delivery':
        return <DeliveryTimeSlotSelector onNext={() => handlePageChange('delivery-summary')} />;
      case 'delivery-summary':
        return (
          <DeliverySummary onBack={() => handlePageChange('delivery')} onConfirm={handleConfirm} />
        );
      default:
        return <div>Page not found</div>;
    }
  }

  return <div className="App">{renderPage(currentPage)}</div>;
}

export default App;
