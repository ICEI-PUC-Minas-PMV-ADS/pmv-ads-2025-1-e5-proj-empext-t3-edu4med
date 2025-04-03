import React from 'react';
import { Search } from 'lucide-react';
import { useEditais } from '../context/EditaisContext';

export default function SearchBar() {
  const { searchTerm, setSearchTerm } = useEditais();

  return (
    <div className="relative max-w-2xl mx-auto mt-4 px-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Pesquisar editais..."
        className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
      />
      <Search className="absolute left-7 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
    </div>
  );
}