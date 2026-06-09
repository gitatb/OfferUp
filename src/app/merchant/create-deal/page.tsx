'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CreateDeal() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call to create deal
    setTimeout(() => {
      setIsSubmitting(false);
      router.push('/merchant');
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Create New Deal</h1>
        <p className="text-slate-500 mt-1">Fill out the details below to submit a new deal for approval.</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium leading-none">Deal Title</label>
              <Input id="title" required placeholder="e.g., 50% off Classic Burger Meal" />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium leading-none">Description</label>
              <textarea
                id="description"
                required
                className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Describe what the customer gets..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="original_price" className="text-sm font-medium leading-none">Original Price ($)</label>
                <Input id="original_price" type="number" step="0.01" required placeholder="20.00" />
              </div>
              <div className="space-y-2">
                <label htmlFor="discount_price" className="text-sm font-medium leading-none">Discount Price ($)</label>
                <Input id="discount_price" type="number" step="0.01" required placeholder="10.00" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="inventory" className="text-sm font-medium leading-none">Inventory Cap</label>
                <Input id="inventory" type="number" required placeholder="100" />
              </div>
              <div className="space-y-2">
                <label htmlFor="expiration" className="text-sm font-medium leading-none">Expiration Date</label>
                <Input id="expiration" type="date" required />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="image_url" className="text-sm font-medium leading-none">Image URL</label>
              <Input id="image_url" type="url" required placeholder="https://example.com/image.jpg" />
            </div>

            <div className="pt-4 flex space-x-4">
              <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit for Approval'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
