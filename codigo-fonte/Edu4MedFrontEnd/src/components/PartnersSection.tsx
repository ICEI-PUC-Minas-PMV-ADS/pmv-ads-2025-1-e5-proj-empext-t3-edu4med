import React from 'react';
import PontuaMed from '../Imgs/PontuaMedS.png';
import EduCat from '../Imgs/EduCats.png';

const partners = [
  {
    name: 'EDUCat',
    logo: EduCat,
    link: 'https://educat.com.br/',
    description: 'Plataforma líder em educação médica continuada',
  },
  {
    name: 'PontuaMed',
    logo: PontuaMed,
    link: 'https://www.instagram.com/pontuamed/',
    description: 'Newsletter de oportunidades extracurriculares',
  },
];

export default function PartnersSection() {
  return (
    <div className="bg-gradient-to-r from-[#00B4D8] to-[#0077B6] py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">Nossos Parceiros</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="text-white p-6 flex flex-col items-center text-center"
            >
              <a
                href={partner.link}
                target="_blank"
                rel="noopener noreferrer"
                className="h-40 w-full flex items-center justify-center mb-4 group"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-full object-contain transform transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
              </a>
              <p className="text-white">{partner.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
