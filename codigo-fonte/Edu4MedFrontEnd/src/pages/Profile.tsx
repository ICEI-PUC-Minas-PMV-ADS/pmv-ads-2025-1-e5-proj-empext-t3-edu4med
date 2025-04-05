import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { Camera, Lock, BookmarkCheck, Phone, MapPin, Plus, Trash2 } from 'lucide-react';
import ChangePasswordModal from '../components/ChangePasswordModal';
import { Link } from 'react-router-dom';

const estados = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

export default function Profile() {
  const { user, updateUser, uploadProfileImage, addDream, removeDream } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newDream, setNewDream] = useState('');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    location: user?.location || '',
  });

  const handleSave = () => {
    updateUser({
      ...user,
      ...formData,
    });
    setIsEditing(false);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      await uploadProfileImage(file);
    }
  };

  const handleAddDream = () => {
    if (newDream.trim()) {
      addDream(newDream.trim());
      setNewDream('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <div 
              className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden cursor-pointer"
              onClick={handleImageClick}
            >
              {user?.profileImage ? (
                <img
                  src={user.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Camera className="w-12 h-12 text-gray-400" />
              )}
            </div>
            <button 
              onClick={handleImageClick}
              className="absolute bottom-0 right-0 bg-[#00B4D8] text-white p-2 rounded-full hover:bg-[#0077B6]"
            >
              <Camera className="w-4 h-4" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
          </div>
          
          {isEditing ? (
            <div className="mt-4 w-full max-w-md space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#00B4D8] focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefone
                </label>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-gray-400 mr-2" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#00B4D8] focus:border-transparent"
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estado
                </label>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#00B4D8] focus:border-transparent"
                  >
                    <option value="">Selecione um estado</option>
                    {estados.map((estado) => (
                      <option key={estado} value={estado}>{estado}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-[#00B4D8] text-white rounded-md hover:bg-[#0077B6]"
                >
                  Salvar
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center mt-4">
              <h2 className="text-2xl font-bold">{user?.name}</h2>
              <p className="text-gray-600">{user?.email}</p>
              {user?.phone && (
                <p className="text-gray-600 flex items-center justify-center mt-2">
                  <Phone className="w-4 h-4 mr-1" />
                  {user.phone}
                </p>
              )}
              {user?.location && (
                <p className="text-gray-600 flex items-center justify-center mt-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  {user.location}
                </p>
              )}
              <button
                onClick={() => setIsEditing(true)}
                className="mt-4 text-[#00B4D8] hover:text-[#0077B6]"
              >
                Editar perfil
              </button>
            </div>
          )}
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Meus Sonhos</h3>
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newDream}
                onChange={(e) => setNewDream(e.target.value)}
                placeholder="Digite seu sonho na medicina..."
                className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-[#00B4D8] focus:border-transparent"
              />
              <button
                onClick={handleAddDream}
                className="bg-[#00B4D8] text-white px-4 py-2 rounded-lg hover:bg-[#0077B6] flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Adicionar
              </button>
            </div>

            <div className="space-y-2">
              {user?.dreams?.map((dream) => (
                <div
                  key={dream.id}
                  className="bg-gray-50 p-4 rounded-lg flex justify-between items-start"
                >
                  <div>
                    <p className="text-gray-800">{dream.text}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(dream.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => removeDream(dream.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Configurações</h3>
          <div className="space-y-4">
            <Link
              to="/meus-editais"
              className="flex items-center gap-2 text-gray-700 hover:text-[#00B4D8]"
            >
              <BookmarkCheck className="w-5 h-5" />
              Meus Editais
            </Link>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 text-gray-700 hover:text-[#00B4D8]"
            >
              <Lock className="w-5 h-5" />
              Alterar senha
            </button>
          </div>
        </div>
      </div>

      <ChangePasswordModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
