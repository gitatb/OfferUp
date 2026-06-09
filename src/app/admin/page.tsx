'use client';

import { useState } from 'react';
import { mockDeals, mockVouchers, mockMerchants } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle } from 'lucide-react';

export default function AdminDashboard() {
  const [deals, setDeals] = useState(mockDeals);

  const pendingDeals = deals.filter(d => d.status === 'pending_approval');

  // Ledger calculations
  const platformCommissionRate = 0.30;

  const ledgerData = mockVouchers.map(voucher => {
    const deal = deals.find(d => d.id === voucher.deal_id);
    const merchant = mockMerchants.find(m => m.id === deal?.merchant_id);

    const amountPaid = deal ? deal.discount_price : 0;
    const platformFee = amountPaid * platformCommissionRate;
    const merchantPayout = amountPaid - platformFee;

    return {
      voucherId: voucher.id,
      purchaseDate: voucher.purchased_at,
      merchantName: merchant?.business_name || 'Unknown',
      dealTitle: deal?.title || 'Unknown',
      amountPaid,
      platformFee,
      merchantPayout,
      status: voucher.status
    };
  });

  const totalPlatformFees = ledgerData.reduce((sum, item) => sum + item.platformFee, 0);

  const handleApprove = (dealId: string) => {
    setDeals(deals.map(d => d.id === dealId ? { ...d, status: 'active' } : d));
  };

  const handleReject = (dealId: string) => {
    setDeals(deals.map(d => d.id === dealId ? { ...d, status: 'draft' } : d));
  };

  return (
    <div className="space-y-12">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="text-slate-500 mt-1">Platform operations and financial overview.</p>
      </div>

      <section>
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-2xl font-bold text-slate-900">Deal Moderation Queue</h2>
          <Badge variant="warning">{pendingDeals.length} Pending</Badge>
        </div>

        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-slate-500">
              <thead className="text-xs text-slate-700 uppercase bg-slate-50 border-b">
                <tr>
                  <th className="px-6 py-3">Merchant</th>
                  <th className="px-6 py-3">Deal Title</th>
                  <th className="px-6 py-3">Price (Orig / Disc)</th>
                  <th className="px-6 py-3">Inventory</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingDeals.map((deal) => {
                  const merchant = mockMerchants.find(m => m.id === deal.merchant_id);
                  return (
                    <tr key={deal.id} className="bg-white border-b hover:bg-slate-50">
                      <td className="px-6 py-4 font-medium text-slate-900">
                        {merchant?.business_name}
                      </td>
                      <td className="px-6 py-4">
                        {deal.title}
                      </td>
                      <td className="px-6 py-4">
                        ${deal.original_price} / ${deal.discount_price}
                      </td>
                      <td className="px-6 py-4">
                        {deal.inventory_cap}
                      </td>
                      <td className="px-6 py-4 text-right space-x-2 flex justify-end">
                        <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" onClick={() => handleReject(deal.id)}>
                          <XCircle className="w-4 h-4 mr-1" /> Reject
                        </Button>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={() => handleApprove(deal.id)}>
                          <CheckCircle className="w-4 h-4 mr-1" /> Approve
                        </Button>
                      </td>
                    </tr>
                  );
                })}
                {pendingDeals.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                      No deals pending approval.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      <section>
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-2xl font-bold text-slate-900">Global Ledger</h2>
          <div className="text-right">
            <span className="text-sm text-slate-500 block">Total Platform Revenue</span>
            <span className="text-2xl font-bold text-green-600">${totalPlatformFees.toFixed(2)}</span>
          </div>
        </div>

        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-slate-500">
              <thead className="text-xs text-slate-700 uppercase bg-slate-50 border-b">
                <tr>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Voucher ID</th>
                  <th className="px-6 py-3">Merchant</th>
                  <th className="px-6 py-3 text-right">Amount Paid</th>
                  <th className="px-6 py-3 text-right">Merchant Payout (70%)</th>
                  <th className="px-6 py-3 text-right text-green-700 font-semibold">Platform Fee (30%)</th>
                </tr>
              </thead>
              <tbody>
                {ledgerData.map((item) => (
                  <tr key={item.voucherId} className="bg-white border-b hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(item.purchaseDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs">
                      {item.voucherId}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {item.merchantName}
                    </td>
                    <td className="px-6 py-4 text-right">
                      ${item.amountPaid.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      ${item.merchantPayout.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-right text-green-700 font-medium">
                      ${item.platformFee.toFixed(2)}
                    </td>
                  </tr>
                ))}
                {ledgerData.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                      No transactions recorded yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </section>
    </div>
  );
}
