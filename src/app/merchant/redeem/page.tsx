'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockVouchers, mockDeals } from '@/lib/mock-data';

export default function RedeemVoucher() {
  const router = useRouter();
  const [qrCode, setQrCode] = useState('');
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  const handleRedeem = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRedeeming(true);
    setMessage(null);

    // Simulate redemption logic
    setTimeout(() => {
      setIsRedeeming(false);
      const voucher = mockVouchers.find(v => v.qr_code_string === qrCode);

      if (!voucher) {
        setMessage({ type: 'error', text: 'Voucher not found. Please check the code and try again.' });
        return;
      }

      // Check if it belongs to this merchant (mock logic: assume merchant m1)
      const deal = mockDeals.find(d => d.id === voucher.deal_id);
      if (deal?.merchant_id !== 'm1') {
        setMessage({ type: 'error', text: 'This voucher is not for your business.' });
        return;
      }

      if (voucher.status === 'redeemed') {
        setMessage({ type: 'error', text: 'This voucher has already been redeemed.' });
        return;
      }

      if (voucher.status === 'refunded') {
        setMessage({ type: 'error', text: 'This voucher has been refunded and is invalid.' });
        return;
      }

      // In a real app we'd update the DB. Here we just show success.
      setMessage({ type: 'success', text: `Success! Voucher for "${deal.title}" has been redeemed.` });
      setQrCode('');
    }, 1000);
  };

  return (
    <div className="max-w-md mx-auto space-y-6 mt-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900">Redeem Voucher</h1>
        <p className="text-slate-500 mt-2">Enter the customer&apos;s voucher code below.</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleRedeem} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="qrCode" className="text-sm font-medium leading-none">Voucher Code</label>
              <Input
                id="qrCode"
                required
                value={qrCode}
                onChange={(e) => setQrCode(e.target.value)}
                placeholder="e.g., VOUCHER-d1-u1-8x92a"
                className="font-mono text-center text-lg"
              />
            </div>

            <Button type="submit" className="w-full" disabled={isRedeeming || !qrCode}>
              {isRedeeming ? 'Verifying...' : 'Redeem Now'}
            </Button>
          </form>

          {message && (
            <div className={`mt-6 p-4 rounded-md text-sm font-medium ${
              message.type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'
            }`}>
              {message.text}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="text-center">
        <Button variant="link" onClick={() => router.push('/merchant')}>
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
}
