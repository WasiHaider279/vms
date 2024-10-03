export interface IPayoutFormData {
  bankName: string;
  paymentMethod: string;
  amount: number;
}

export interface IPayout {
  id: number;
  requestedDate: string;
  amount: number;
  bankName: string;
  transferMethod: string;
  status: string;
}
