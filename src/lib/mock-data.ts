import { User, Merchant, Deal, Voucher } from './types';

export const mockUsers: User[] = [
  { id: 'u1', email: 'consumer@example.com', role: 'consumer', created_at: '2023-01-01T00:00:00Z' },
  { id: 'u2', email: 'merchant@example.com', role: 'merchant', created_at: '2023-01-01T00:00:00Z' },
  { id: 'u3', email: 'admin@example.com', role: 'admin', created_at: '2023-01-01T00:00:00Z' },
];

export const mockMerchants: Merchant[] = [
  { id: 'm1', user_id: 'u2', business_name: 'Burger Palace', address: '123 Main St', category: 'Food', created_at: '2023-01-02T00:00:00Z' },
  { id: 'm2', user_id: 'u4', business_name: 'Glow Spa', address: '456 Wellness Way', category: 'Beauty', created_at: '2023-01-03T00:00:00Z' },
];

export const mockDeals: Deal[] = [
  {
    id: 'd1',
    merchant_id: 'm1',
    title: '50% off Classic Burger Meal',
    description: 'Enjoy our signature classic burger with fries and a drink.',
    original_price: 20.0,
    discount_price: 10.0,
    inventory_cap: 100,
    image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=60',
    expiration_date: '2024-12-31T23:59:59Z',
    status: 'active',
  },
  {
    id: 'd2',
    merchant_id: 'm2',
    title: '1-Hour Swedish Massage',
    description: 'Relax and unwind with a full hour of Swedish massage.',
    original_price: 100.0,
    discount_price: 60.0,
    inventory_cap: 50,
    image_url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=500&q=60',
    expiration_date: '2024-11-30T23:59:59Z',
    status: 'active',
  },
  {
    id: 'd3',
    merchant_id: 'm1',
    title: 'Family Dinner Special',
    description: 'A feast for 4! Includes 4 burgers, large fries, and 4 drinks.',
    original_price: 60.0,
    discount_price: 35.0,
    inventory_cap: 20,
    image_url: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=500&q=60',
    expiration_date: '2024-12-15T23:59:59Z',
    status: 'pending_approval',
  },
];

export const mockVouchers: Voucher[] = [
  {
    id: 'v1',
    deal_id: 'd1',
    consumer_id: 'u1',
    qr_code_string: 'VOUCHER-d1-u1-8x92a',
    status: 'active',
    purchased_at: '2024-05-15T12:00:00Z',
  },
  {
    id: 'v2',
    deal_id: 'd2',
    consumer_id: 'u1',
    qr_code_string: 'VOUCHER-d2-u1-b2c3d',
    status: 'redeemed',
    purchased_at: '2024-05-10T09:30:00Z',
  },
];
