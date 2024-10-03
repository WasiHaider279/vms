export type IOrderPayload = {
  id?: string;
  text?: string;
  page?: number;
  limit?: number;
  orderDate?: string;
  market?: string;
  paymentStatus?: string;
  fulfillmentStatus?: string;
  pages?: number;
  refund?: boolean;
  total?: number;
  deliveryStatus?: string;
  products?: string;
  "sort[createdAt]"?: number;
  "sort[updatedAt]"?: number;
};
