import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, ArrowLeft, MapPin, Calendar, Building2, ExternalLink } from 'lucide-react';
import { useEditais } from '../context/EditaisContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

function ConfirmationModal({ isOpen, onClose, onConfirm, title, message }: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{message}</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-[#00B4D8] text-white rounded-md hover:bg-[#0077B6]"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}

export default function EditalDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { editais, toggleFavorite, confirmRegistration } = useEditais();
  const { user } = useAuth();
  const [showRedirectModal, setShowRedirectModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  
  const edital = editais.find(e => e.id === id);

  if (!edital || !user) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {!edital ? 'Edital não encontrado' : 'Usuário não autenticado'}
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 inline-flex items-center text-[#00B4D8] hover:text-[#0077B6]"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar
          </button>
        </div>
      </div>
    );
  }

  const handleRegistrationClick = () => {
    if (edital.externalLink) {
      setShowRedirectModal(true);
    } else {
      toast.error('Link de inscrição não disponível');
    }
  };

  const handleRedirectConfirm = () => {
    setShowRedirectModal(false);
    window.open(edital.externalLink, '_blank');
    setTimeout(() => {
      setShowRegistrationModal(true);
    }, 1000);
  };

  const handleRegistrationConfirm = () => {
    confirmRegistration(edital.id, user.id);
    setShowRegistrationModal(false);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center text-[#00B4D8] hover:text-[#0077B6]"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Voltar
      </button>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src={edital.imageUrl}
          alt={edital.title}
          className="w-full h-64 object-cover"
        />
        
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold text-gray-900">{edital.title}</h1>
            <button
              onClick={() => toggleFavorite(edital.id)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Heart
                className={`w-6 h-6 ${
                  edital.isFavorited
                    ? 'fill-red-500 text-red-500'
                    : 'text-gray-400'
                }`}
              />
            </button>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center text-gray-600">
              <Building2 className="w-5 h-5 mr-2" />
              <span>{edital.institution}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Calendar className="w-5 h-5 mr-2" />
              <span>Data limite: {new Date(edital.closingDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-5 h-5 mr-2" />
              <span>Localização: {edital.location}</span>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Descrição</h2>
            <p className="text-gray-700">{edital.description}</p>
          </div>

          <div className="flex items-center justify-between">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              edital.status === 'open'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {edital.status === 'open' ? 'Inscrições Abertas' : 'Inscrições Encerradas'}
            </span>
            
            {edital.status === 'open' && (
              <button
                onClick={handleRegistrationClick}
                className={`bg-[#00B4D8] text-white px-6 py-2 rounded-lg hover:bg-[#0077B6] transition-colors flex items-center gap-2 ${
                  edital.isRegistered ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={edital.isRegistered}
              >
                {edital.isRegistered ? (
                  'Inscrito'
                ) : (
                  <>
                    Inscrever-se
                    <ExternalLink className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showRedirectModal}
        onClose={() => setShowRedirectModal(false)}
        onConfirm={handleRedirectConfirm}
        title="Redirecionamento"
        message="Você está sendo redirecionado para um ambiente externo. Deseja continuar?"
      />

      <ConfirmationModal
        isOpen={showRegistrationModal}
        onClose={() => setShowRegistrationModal(false)}
        onConfirm={handleRegistrationConfirm}
        title="Confirmação de Inscrição"
        message="Você finalizou sua inscrição neste edital?"
      />
    </div>
  );
}
