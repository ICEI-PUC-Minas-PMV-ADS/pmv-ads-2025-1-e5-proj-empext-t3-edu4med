import React from 'react';
import EditalCard from './EditalCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface EditalSectionProps {
  title: string;
  editais: Array<{
    id: string;
    title: string;
    institution: string;
    imageUrl: string;
    location: string;
    closingDate: string;
    status: 'open' | 'closed';
    isFavorited?: boolean;
    registrationStatus?: string;
  }>;
}

export default function EditalSection({ title, editais }: EditalSectionProps) {
  const scrollContainer = (direction: 'left' | 'right') => {
    const container = document.getElementById(`scroll-${title}`);
    if (container) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4 px-4">{title}</h2>
      <div className="relative">
        <button
          onClick={() => scrollContainer('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        
        <div
          id={`scroll-${title}`}
          className="flex overflow-x-auto gap-4 px-4 pb-4 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {editais.map((edital) => (
            <EditalCard
              key={edital.id}
              {...edital}
              showStatus={title === "Meus Editais"}
            />
          ))}
        </div>

        <button
          onClick={() => scrollContainer('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md"
        >
          <ChevronRight className="w-6 h-6 text-gray-600" />
        </button>
      </div>
    </div>
  );
}