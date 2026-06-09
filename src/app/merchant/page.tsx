import Link from 'next/link';
import { mockDeals, mockVouchers, mockMerchants } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Tag, Clock, PlusCircle, Scan } from 'lucide-react';

export default function MerchantDashboard() {
  // Simulating logged in merchant user (u2)
  const merchantId = 'm1';
  const merchant = mockMerchants.find(m => m.id === merchantId);
  const merchantDeals = mockDeals.filter(d => d.merchant_id === merchantId);

  // Get vouchers related to merchant deals
  const dealIds = merchantDeals.map(d => d.id);
  const merchantVouchers = mockVouchers.filter(v => dealIds.includes(v.deal_id));

  // Calculate metrics
  const activeDealsCount = merchantDeals.filter(d => d.status === 'active').length;
  const pendingRedemptionsCount = merchantVouchers.filter(v => v.status === 'active').length;
  const totalSales = merchantVouchers.reduce((total, voucher) => {
    const deal = merchantDeals.find(d => d.id === voucher.deal_id);
    return total + (deal ? deal.discount_price : 0);
  }, 0);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-200 pb-4 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Merchant Dashboard</h1>
          <p className="text-slate-500 mt-1">{merchant?.business_name}</p>
        </div>
        <div className="flex space-x-2">
          <Link href="/merchant/redeem">
            <Button variant="outline" className="flex items-center">
              <Scan className="w-4 h-4 mr-2" />
              Redeem Voucher
            </Button>
          </Link>
          <Link href="/merchant/create-deal">
            <Button className="flex items-center">
              <PlusCircle className="w-4 h-4 mr-2" />
              Create Deal
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <DollarSign className="w-4 h-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSales.toFixed(2)}</div>
            <p className="text-xs text-slate-500 mt-1">From purchased vouchers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Active Deals</CardTitle>
            <Tag className="w-4 h-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeDealsCount}</div>
            <p className="text-xs text-slate-500 mt-1">Currently live on platform</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Pending Redemptions</CardTitle>
            <Clock className="w-4 h-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingRedemptionsCount}</div>
            <p className="text-xs text-slate-500 mt-1">Vouchers sold but not redeemed</p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-4">Your Deals</h2>
        <div className="bg-white border rounded-lg overflow-hidden">
          <table className="w-full text-sm text-left text-slate-500">
            <thead className="text-xs text-slate-700 uppercase bg-slate-50 border-b">
              <tr>
                <th className="px-6 py-3">Deal Title</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Inventory</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {merchantDeals.map((deal) => (
                <tr key={deal.id} className="bg-white border-b hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900 line-clamp-1">
                    {deal.title}
                  </td>
                  <td className="px-6 py-4">
                    ${deal.discount_price.toFixed(2)} <span className="line-through text-slate-400 text-xs">${deal.original_price.toFixed(2)}</span>
                  </td>
                  <td className="px-6 py-4">
                    {deal.inventory_cap}
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={
                      deal.status === 'active' ? 'success' :
                      deal.status === 'pending_approval' ? 'warning' : 'secondary'
                    }>
                      {deal.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </Badge>
                  </td>
                </tr>
              ))}
              {merchantDeals.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center">No deals found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
