'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import { mockDeals, mockMerchants } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function DealDetails() {
  const params = useParams();
  const dealId = params.id as string;
  const deal = mockDeals.find(d => d.id === dealId);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false);

  if (!deal) {
    return <div className="text-center py-12 text-xl font-semibold">Deal not found</div>;
  }

  const merchant = mockMerchants.find(m => m.id === deal.merchant_id);

  const handleBuyNow = () => {
    setIsCheckingOut(true);
    // Simulate Stripe Checkout Modal delay
    setTimeout(() => {
      setIsCheckingOut(false);
      setPurchaseComplete(true);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden shadow-lg">
          <Image
            src={deal.image_url}
            alt={deal.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">
              {deal.title}
            </h1>
            <p className="text-lg text-slate-500">
              Offered by <span className="font-semibold text-slate-700">{merchant?.business_name || 'Unknown Merchant'}</span>
            </p>
          </div>

          <div className="flex items-end space-x-4 border-b border-slate-200 pb-6">
            <span className="text-4xl font-extrabold text-blue-600">${deal.discount_price.toFixed(2)}</span>
            <span className="text-xl text-slate-400 line-through mb-1">${deal.original_price.toFixed(2)}</span>
            <span className="text-sm font-semibold text-green-600 bg-green-100 px-2 py-1 rounded mb-2">
              {Math.round((1 - deal.discount_price / deal.original_price) * 100)}% OFF
            </span>
          </div>

          <p className="text-slate-700 leading-relaxed">
            {deal.description}
          </p>

          <Card className="bg-slate-50 border-none shadow-inner">
            <CardContent className="p-4 space-y-2 text-sm text-slate-600">
              <p><strong>Expires:</strong> {new Date(deal.expiration_date).toLocaleDateString()}</p>
              <p><strong>Inventory:</strong> {deal.inventory_cap} remaining</p>
            </CardContent>
          </Card>

          <div className="pt-4">
            {purchaseComplete ? (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Success! </strong>
                <span className="block sm:inline">Your purchase is complete. Check your vouchers.</span>
              </div>
            ) : (
              <Button
                size="lg"
                className="w-full text-lg"
                onClick={handleBuyNow}
                disabled={isCheckingOut}
              >
                {isCheckingOut ? 'Processing Checkout...' : 'Buy Now'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
