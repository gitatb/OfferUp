import { mockVouchers, mockDeals } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { QrCode } from 'lucide-react';

export default function MyVouchers() {
  // Simulating logged in consumer (u1)
  const consumerVouchers = mockVouchers.filter(v => v.consumer_id === 'u1');

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-3xl font-bold text-slate-900">My Vouchers</h1>
        <p className="text-slate-500 mt-2">Manage and redeem your purchased deals.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {consumerVouchers.map(voucher => {
          const deal = mockDeals.find(d => d.id === voucher.deal_id);
          if (!deal) return null;

          return (
            <Card key={voucher.id} className="flex flex-col sm:flex-row overflow-hidden">
              <div className="bg-slate-100 p-6 flex flex-col items-center justify-center sm:w-48 border-r border-slate-200">
                <QrCode className="w-24 h-24 text-slate-800 mb-2" />
                <p className="font-mono text-xs text-slate-500 break-all text-center">
                  {voucher.qr_code_string}
                </p>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold line-clamp-2">{deal.title}</h3>
                  <Badge variant={voucher.status === 'active' ? 'success' : 'secondary'} className="ml-2">
                    {voucher.status.charAt(0).toUpperCase() + voucher.status.slice(1)}
                  </Badge>
                </div>
                <div className="mt-auto space-y-1 text-sm text-slate-600">
                  <p><strong>Purchased:</strong> {new Date(voucher.purchased_at).toLocaleDateString()}</p>
                  <p><strong>Expires:</strong> {new Date(deal.expiration_date).toLocaleDateString()}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {consumerVouchers.length === 0 && (
        <div className="text-center py-12 text-slate-500 bg-slate-50 rounded-lg border border-dashed">
          You haven&apos;t purchased any vouchers yet.
        </div>
      )}
    </div>
  );
}
