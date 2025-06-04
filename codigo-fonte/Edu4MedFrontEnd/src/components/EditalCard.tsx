import React from 'react';
import { Heart, MapPin, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEditais } from '../context/EditaisContext';

interface EditalCardProps {
  id: string;
  title: string;
  institution: string;
  imageUrl: string;
  location: string;
  closingDate: string;
  status: 'open' | 'closed';
  isFavorited?: boolean;
  registrationStatus?: string;
  showStatus?: boolean;
}

export default function EditalCard({
  id,
  title,
  institution,
  imageUrl,
  location,
  closingDate,
  status,
  isFavorited = false,
  registrationStatus,
  showStatus = false,
}: EditalCardProps) {
  const { toggleFavorite } = useEditais();

  function formatDate(dateStr: string) {
    const [day, month, year] = dateStr.split('/');
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    return date.toLocaleDateString('pt-BR');
  }

  return (
    <div className="flex-shrink-0 w-full sm:w-72 bg-white rounded-lg shadow-md overflow-hidden mx-0 sm:mx-2 hover:shadow-lg transition-shadow">
      <img src={imageUrl} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{title}</h3>
          
          {status === 'open' && (
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleFavorite(id);
              }}
              className="ml-2 flex-shrink-0"
              aria-label={isFavorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            >
              <Heart
                className={`w-6 h-6 ${
                  isFavorited
                    ? 'fill-red-500 text-red-500'
                    : 'text-gray-400 hover:text-red-500'
                }`}
              />
            </button>
          )}
        </div>
        
        <p className="text-gray-600 mb-3">{institution}</p>
        
        <div className="space-y-2 mb-3">
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{location}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Calendar className="w-4 h-4 mr-1" />
            <span>Até {formatDate(closingDate)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <span
            className={`text-sm font-medium px-2 py-1 rounded-full ${
              status === 'open'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {status === 'open' ? 'Inscrições Abertas' : 'Inscrições Encerradas'}
          </span>
          
          <Link 
            to={`/editais/${id}`}
            className="text-[#00B4D8] hover:text-[#0077B6] text-sm font-medium"
          >
            Ver mais
          </Link>
        </div>

        {showStatus && registrationStatus && (
          <div className="mt-2 text-sm font-medium text-[#00B4D8]">
            {registrationStatus}
          </div>
        )}
      </div>
    </div>
  );
}