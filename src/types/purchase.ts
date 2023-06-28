export interface IPurchase {
  id?: number;
  sku: string;
  order_id: string;
  token: string;
  receipt: IReceipt;
  status: string;
  user_id: number;
  created_by: string;
  created_date: string;
}

export interface IReceipt {
  cancellation_date: any;
  cancellation_date_ms: any;
  cancellation_date_pst: any;
  cancellation_reason: any;
  expires_date: any;
  expires_date_ms: any;
  expires_date_pst: any;
  original_purchase_date: string;
  original_purchase_date_ms: string;
  original_purchase_date_pst: string;
  original_transaction_id: string;
  product_id: string;
  promotional_offer_id: any;
  purchase_date: string;
  purchase_date_ms: string;
  purchase_date_pst: string;
  quantity: string;
  transaction_id: string;
  web_order_line_item_id: any;
}
