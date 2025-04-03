import React from 'react';

const partners = [
  {
    name: 'EDUCat',
    logo: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&q=80&w=1000',
    description: 'Plataforma líder em educação médica continuada'
  },
  {
    name: 'PUC Minas',
    logo: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80&w=1000',
    description: 'Excelência em ensino e pesquisa médica'
  }
];

export default function PartnersSection() {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Nossos Parceiros</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="bg-gray-50 rounded-lg p-6 flex flex-col items-center text-center"
            >
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{partner.name}</h3>
              <p className="text-gray-600">{partner.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}