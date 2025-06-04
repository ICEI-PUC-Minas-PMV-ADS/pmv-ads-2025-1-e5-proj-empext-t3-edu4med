import React from 'react';
import { Bookmark, FileCheck } from 'lucide-react';
import { useEditais } from '../context/EditaisContext';
import EditalCard from '../components/EditalCard';

export default function MeusEditais() {
  const { editais, favoritedEditais } = useEditais();
  
  const favoritedEditaisList = editais.filter(edital => 
    favoritedEditais.includes(edital.id)
  );

  const inscritosEditais = editais.filter(edital => 
    edital.isRegistered
  );

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Meus Editais</h1>
      
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <Bookmark className="w-6 h-6 text-[#00B4D8]" />
          <h2 className="text-2xl font-semibold">Editais Favoritados</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoritedEditaisList.map((edital) => (
            <EditalCard
              key={edital.id}
              {...edital}
              showStatus={true}
            />
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-6">
          <FileCheck className="w-6 h-6 text-[#00B4D8]" />
          <h2 className="text-2xl font-semibold">Editais Inscritos</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {inscritosEditais.map((edital) => (
            <EditalCard
              key={edital.id}
              {...edital}
              showStatus={true}
            />
          ))}
        </div>
      </section>
    </div>
  );
}