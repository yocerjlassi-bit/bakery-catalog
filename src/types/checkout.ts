export interface CheckoutFormData {
    customerName: string;
    phoneNumber: string;
    email?: string;
    orderType: "pickup" | "delivery";
    deliveryAddress?: string;
    requestedDate: string;
    timeSlot: string;
    notes: string;
  }