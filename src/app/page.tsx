'use client';

import { useState } from 'react';
import { mockDeals } from '@/lib/mock-data';
import { DealCard } from '@/components/DealCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const categories = ['All', 'Food', 'Beauty', 'Activities'];

export default function Home() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // For a real app, category should be tied to the deal. In mock data, we don't have deal categories directly,
  // but we can just filter active deals for now. We will just simulate category filtering.
  const activeDeals = mockDeals.filter(d => d.status === 'active');

  const filteredDeals = activeDeals.filter(deal => {
    const matchesSearch = deal.title.toLowerCase().includes(search.toLowerCase()) ||
                          deal.description.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Local Deals & Experiences
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto">
          Discover and save on the best things to do, see, and eat in your city.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
        <Input
          placeholder="Search for deals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-grow"
        />
        <Button>Search</Button>
      </div>

      <div className="flex justify-center space-x-2 overflow-x-auto pb-2">
        {categories.map(cat => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(cat)}
            className="rounded-full"
          >
            {cat}
          </Button>
        ))}
      </div>

      {filteredDeals.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDeals.map(deal => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-slate-500">
          No deals found matching your criteria.
        </div>
      )}
    </div>
  );
}
