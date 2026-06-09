import Image from 'next/image';
import Link from 'next/link';
import { Deal } from '@/lib/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function DealCard({ deal }: { deal: Deal }) {
  return (
    <Card className="overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
      <div className="relative w-full h-48">
        <Image
          src={deal.image_url}
          alt={deal.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 right-2">
          {deal.status === 'active' && (
            <Badge variant="success">Active</Badge>
          )}
          {deal.status === 'pending_approval' && (
            <Badge variant="warning">Pending</Badge>
          )}
        </div>
      </div>
      <CardContent className="flex flex-col flex-grow p-4">
        <h3 className="text-lg font-semibold line-clamp-2 mb-2">{deal.title}</h3>
        <div className="flex items-end mt-auto space-x-2">
          <span className="text-2xl font-bold text-slate-900">${deal.discount_price.toFixed(2)}</span>
          <span className="text-sm text-slate-500 line-through mb-1">${deal.original_price.toFixed(2)}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={`/deal/${deal.id}`} className="w-full">
          <Button className="w-full">View Deal</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
