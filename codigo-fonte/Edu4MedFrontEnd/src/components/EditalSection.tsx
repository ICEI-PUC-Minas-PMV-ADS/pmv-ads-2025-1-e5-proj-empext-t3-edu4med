import React, { useState } from 'react';
import EditalCard from './EditalCard';
import { ChevronLeft, ChevronRight, Grid3x3, List } from 'lucide-react';

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
  const [isGridView, setIsGridView] = useState(false);
  const scrollContainer = (direction: 'left' | 'right') => {
    const container = document.getElementById(scroll-${title});
    if (container) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="my-8">
      <div className="flex justify-between items-center mb-4 px-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        {title === "Todos Editais" && (
          <button
            onClick={() => setIsGridView(!isGridView)}
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label={isGridView ? "Exibir como carrossel" : "Exibir como grid"}
          >
            {isGridView ? (
              <List className="w-6 h-6 text-gray-600" />
            ) : (
              <Grid3x3 className="w-6 h-6 text-gray-600" />
            )}
          </button>
        )}
      </div>
      
      {isGridView && title === "Todos Editais" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {editais.map((edital) => (
            <EditalCard
              key={edital.id}
              {...edital}
              showStatus={title === "Meus Editais"}
            />
          ))}
        </div>
      ) : (
        <div className="relative">
          <button
            onClick={() => scrollContainer('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          
          <div
            id={scroll-${title}}
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
      )}
    </div>
  );
}
