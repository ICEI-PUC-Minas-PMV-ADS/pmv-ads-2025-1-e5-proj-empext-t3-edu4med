import React, { useState } from 'react';
import { Filter, X, RefreshCw } from 'lucide-react';

interface FilterButtonProps {
  title: string;
  filters: Record<string, string>;
  onFilterChange: (filters: Record<string, string>) => void;
  onClearFilters: () => void;
  filterOptions: {
    name: string;
    label: string;
    type: 'text' | 'select' | 'date' | 'number';
    options?: { value: string; label: string }[];
    placeholder?: string;
  }[];
}

export default function FilterButton({
  title,
  filters,
  onFilterChange,
  onClearFilters,
  filterOptions = [] // Provide default empty array
}: FilterButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterChange = (name: string, value: string) => {
    onFilterChange({ ...filters, [name]: value });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50"
      >
        <Filter className="w-4 h-4" />
        Filtros
      </button>

      {isOpen && (
        <div className="absolute mt-2 p-4 bg-white rounded-lg shadow-lg w-80 z-50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">{title}</h3>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  onClearFilters();
                  setIsOpen(false);
                }}
                className="p-1 hover:bg-gray-100 rounded-full"
                title="Limpar filtros"
              >
                <RefreshCw className="w-4 h-4 text-gray-600" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            {filterOptions.map((option) => (
              <div key={option.name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {option.label}
                </label>
                {option.type === 'select' ? (
                  <select
                    value={filters[option.name] || ''}
                    onChange={(e) => handleFilterChange(option.name, e.target.value)}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#00B4D8] focus:border-transparent"
                  >
                    <option value="">{option.placeholder || 'Selecione...'}</option>
                    {option.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={option.type}
                    value={filters[option.name] || ''}
                    onChange={(e) => handleFilterChange(option.name, e.target.value)}
                    placeholder={option.placeholder}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#00B4D8] focus:border-transparent"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}