import React, { useState, useRef, useEffect } from 'react';
import { Lock, BookmarkCheck, User } from 'lucide-react';
import ChangePasswordModal from '../components/ChangePasswordModal';
import { Link } from 'react-router-dom';

export default function Profile() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setFormData({
        email: parsedUser.email || '',
        password: '',
      });
    }
  }, []);

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    if (!token || !user) return;

    try {
      const response = await fetch(https://localhost:44335/api/Usuario/${user.id}, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: Bearer ${token},
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        let updatedUser = user; // valor padrão
        const text = await response.text();
        if (text) {
          updatedUser = JSON.parse(text);
        }
        updatedUser.email = formData.email;

        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        setIsEditing(false);
        alert('Dados atualizados com sucesso!');
      } else {
        alert('Erro ao atualizar os dados');
      }
    } catch (error) {
      console.error(error);
      alert('Erro na requisição');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col items-center mb-8">

          {isEditing ? (
            <div className="mt-4 w-full max-w-md space-y-4">
              {[
                { label: 'Email', type: 'email', name: 'email' },
                { label: 'Senha', type: 'password', name: 'password' },
              ].map(({ label, type, name }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input
                    type={type}
                    value={formData[name as keyof typeof formData]}
                    onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#00B4D8] focus:border-transparent"
                  />
                </div>
              ))}

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
              <User className="w-16 h-16 text-[#00B4D8] mx-auto mb-2" />
              <p className="text-gray-600">{user?.email}</p>
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
          <h3 className="text-xl font-semibold mb-4">Configurações</h3>
          <div className="space-y-4">
            <Link
              to="/meus-editais"
              className="flex items-center gap-2 text-gray-700 hover:text-[#00B4D8]"
            >
              <BookmarkCheck className="w-5 h-5" />
              Meus Editais
            </Link>
            
          </div>
        </div>
      </div>
    </div>
  );
}
