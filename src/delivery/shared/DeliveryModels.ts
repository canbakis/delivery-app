export interface DeliveryTime {
  deliveryDate: string;
  deliveryTimeId: string;
  inHomeAvailable: boolean;
  startTime: string;
  stopTime: string;
}

export interface DeliverySlotSelectionState {
  selectedDate?: string;
  selectedTime?: DeliveryTime;
  inHomeDelivery?: boolean;
}
