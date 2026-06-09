export type Role = 'consumer' | 'merchant' | 'admin';

export interface User {
  id: string;
  email: string;
  role: Role;
  created_at: string;
}

export interface Merchant {
  id: string;
  user_id: string;
  business_name: string;
  address: string;
  category: string;
  created_at: string;
}

export type DealStatus = 'draft' | 'pending_approval' | 'active' | 'expired';

export interface Deal {
  id: string;
  merchant_id: string;
  title: string;
  description: string;
  original_price: number;
  discount_price: number;
  inventory_cap: number;
  image_url: string;
  expiration_date: string;
  status: DealStatus;
}

export type VoucherStatus = 'active' | 'redeemed' | 'refunded';

export interface Voucher {
  id: string;
  deal_id: string;
  consumer_id: string;
  qr_code_string: string;
  status: VoucherStatus;
  purchased_at: string;
}
