import React from 'react';
import { Phone, MapPin, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#00B4D8] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>(31) 3333-3333</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Localização</h3>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Ciências Médicas - Belo Horizonte</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Redes Sociais</h3>
            <a
              href="https://instagram.com/edu4med"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-gray-200 transition-colors"
            >
              <Instagram className="w-4 h-4" />
              <span>@edu4med</span>
            </a>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Sobre</h3>
            <p>© Copyright 2025 - Edu4Med</p>
          </div>
        </div>
      </div>
    </footer>
  );
}