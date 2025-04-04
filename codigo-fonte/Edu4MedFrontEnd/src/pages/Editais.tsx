import React from 'react';
import SearchBar from '../components/SearchBar';
import FilterButton from '../components/FilterButton';
import EditalSection from '../components/EditalSection';
import { useEditais } from '../context/EditaisContext';
import { ESTADOS_BRASIL } from '../components/constants';

const filterOptions = [
  {
    name: 'location',
    label: 'Estado',
    type: 'select' as const,
    placeholder: 'Selecione o estado',
    options: ESTADOS_BRASIL
  },
  {
    name: 'institution',
    label: 'Instituição',
    type: 'text' as const,
    placeholder: 'Nome da instituição'
  }
];

export default function Editais() {
  const { getFilteredEditais, filters, setFilters, clearFilters } = useEditais();

  // Get editais filtered by user's location for "Para Você" section
  const paraVoce = getFilteredEditais(true).filter(edital => edital.status === 'open');

  // Get editais filtered by manual filters for other sections
  const filteredEditais = getFilteredEditais(false);
  
  const tempoEsgotando = filteredEditais.filter(
    edital => edital.status === 'open' && 
    new Date(edital.closingDate).getTime() - new Date().getTime() < 7 * 24 * 60 * 60 * 1000
  );

  return (
    <main className="max-w-7xl mx-auto py-6">
      <SearchBar />
      <FilterButton
        title="Filtrar Editais"
        filters={filters}
        onFilterChange={setFilters}
        onClearFilters={clearFilters}
        filterOptions={filterOptions}
      />
      
      <EditalSection title="Para você" editais={paraVoce} />
      <EditalSection title="Tempo se esgotando" editais={tempoEsgotando} />
      <EditalSection title="Todos Editais" editais={filteredEditais} />
    </main>
  );
}