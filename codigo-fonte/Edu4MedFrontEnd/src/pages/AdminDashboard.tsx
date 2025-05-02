import React, { useState, useRef } from 'react';
import { useEditais } from '../context/EditaisContext';
import { useAuth } from '../context/AuthContext';
import {
  Pencil,
  Trash2,
  Plus,
  Users,
  FileText,
  Calendar,
  MapPin,
  Upload,
  X,
  Link as LinkIcon
} from 'lucide-react';
import FilterButton from '../components/FilterButton';
import { ESTADOS_BRASIL } from '../components/constants';

interface TableFilters {
  editais: {
    institution: string;
    location: string;
    status: string;
    closingDate: string;
  };
  users: {
    name: string;
    location: string;
    registeredEditais: string;
    timeUsed: string;
  };
}

export default function AdminDashboard() {
  const {
    editais = [], // fallback para array vazio
    addEdital,
    updateEdital,
    deleteEdital,
    getRegisteredEditaisCount
  } = useEditais();

  const { users = [] } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [selectedEdital, setSelectedEdital] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [filters, setFilters] = useState<TableFilters>({
    editais: {
      institution: '',
      location: '',
      status: '',
      closingDate: ''
    },
    users: {
      name: '',
      location: '',
      registeredEditais: '',
      timeUsed: ''
    }
  });

  const [formData, setFormData] = useState({
    title: '',
    institution: '',
    closingDate: '',
    location: '',
    status: 'open',
    description: '',
    imageUrl: '',
    externalLink: ''
  });

  const editalFilterOptions = [
    {
      name: 'institution',
      label: 'Instituição',
      type: 'text' as const,
      placeholder: 'Filtrar por instituição'
    },
    {
      name: 'location',
      label: 'Estado',
      type: 'select' as const,
      options: ESTADOS_BRASIL,
      placeholder: 'Selecione o estado'
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select' as const,
      options: [
        { value: 'open', label: 'Aberto' },
        { value: 'closed', label: 'Fechado' }
      ]
    },
    {
      name: 'closingDate',
      label: 'Data Limite',
      type: 'date' as const
    }
  ];

  const userFilterOptions = [
    {
      name: 'name',
      label: 'Nome',
      type: 'text' as const,
      placeholder: 'Filtrar por nome'
    },
    {
      name: 'location',
      label: 'Estado',
      type: 'select' as const,
      options: ESTADOS_BRASIL,
      placeholder: 'Selecione o estado'
    },
    {
      name: 'registeredEditais',
      label: 'Editais Inscritos',
      type: 'number' as const,
      placeholder: 'Quantidade'
    },
    {
      name: 'timeUsed',
      label: 'Tempo de Uso (dias)',
      type: 'number' as const,
      placeholder: 'Dias'
    }
  ];

  const clearFilters = () => {
    setFilters({
      editais: {
        institution: '',
        location: '',
        status: '',
        closingDate: ''
      },
      users: {
        name: '',
        location: '',
        registeredEditais: '',
        timeUsed: ''
      }
    });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setSelectedImage(base64);
        setFormData(prev => ({ ...prev, imageUrl: base64 }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = { ...formData, imageUrl: selectedImage || '' };
      if (isEditing && selectedEdital) {
        await updateEdital(selectedEdital.id, payload);
      } else {
        await addEdital(payload);
      }
      resetForm();
    } catch (err) {
      console.error('Erro ao salvar edital:', err);
    }
  };

  const handleEdit = (edital: any) => {
    setSelectedEdital(edital);
    setFormData({
      title: edital.title,
      institution: edital.institution,
      closingDate: edital.closingDate,
      location: edital.location,
      status: edital.status,
      description: edital.description,
      imageUrl: edital.imageUrl,
      externalLink: edital.externalLink || ''
    });
    setSelectedImage(edital.imageUrl);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este edital?')) {
      try {
        await deleteEdital(id);
      } catch (error) {
        console.error('Erro ao excluir edital:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      institution: '',
      closingDate: '',
      location: '',
      status: 'open',
      description: '',
      imageUrl: '',
      externalLink: ''
    });
    setSelectedImage(null);
    setSelectedEdital(null);
    setIsEditing(false);
    setShowForm(false);
  };

  const filteredEditais = Array.isArray(editais)
    ? editais.filter(edital => {
      const { institution, location, status, closingDate } = filters.editais;
      return (
        (!institution || edital.institution.toLowerCase().includes(institution.toLowerCase())) &&
        (!location || edital.location === location) &&
        (!status || edital.status === status) &&
        (!closingDate || edital.closingDate === closingDate)
      );
    })
    : [];

  const filteredUsers = Array.isArray(users)
    ? users.filter(user => {
      const { name, location, registeredEditais, timeUsed } = filters.users;
      const userRegisteredEditais = getRegisteredEditaisCount(user.id);
      const userTimeUsed = Math.floor(
        (Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24)
      );
      return (
        (!name || user.name.toLowerCase().includes(name.toLowerCase())) &&
        (!location || user.location === location) &&
        (!registeredEditais || userRegisteredEditais.toString() === registeredEditais) &&
        (!timeUsed || userTimeUsed.toString() === timeUsed)
      );
    })
    : [];

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard do Administrador</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-[#00B4D8] text-white px-4 py-2 rounded-lg hover:bg-[#0077B6] flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Novo Edital
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-8 h-8 text-[#00B4D8]" />
            <h2 className="text-xl font-semibold">Total de Editais</h2>
          </div>
          <p className="text-3xl font-bold">{editais.length}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-8 h-8 text-[#00B4D8]" />
            <h2 className="text-xl font-semibold">Total de Usuários</h2>
          </div>
          <p className="text-3xl font-bold">{users.length}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-8 h-8 text-[#00B4D8]" />
            <h2 className="text-xl font-semibold">Editais Ativos</h2>
          </div>
          <p className="text-3xl font-bold">
            {editais.filter(e => e.status === 'open').length}
          </p>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">
              {isEditing ? 'Editar Edital' : 'Novo Edital'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Imagem de Capa
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    {selectedImage ? (
                      <div className="relative">
                        <img
                          src={selectedImage}
                          alt="Preview"
                          className="mx-auto h-32 w-auto"
                        />
                        <button
                          type="button"
                          onClick={() => setSelectedImage(null)}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                        >
                          <X className="w-4  h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-[#00B4D8] hover:text-[#0077B6]"
                          >
                            <span>Upload de imagem</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              accept="image/*"
                              onChange={handleImageChange}
                              ref={fileInputRef}
                            />
                          </label>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG até 10MB
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Título
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Instituição
                </label>
                <input
                  type="text"
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Link Externo
                </label>
                <div className="flex items-center gap-2">
                  <LinkIcon className="w-5 h-5 text-gray-400" />
                  <input
                    type="url"
                    value={formData.externalLink}
                    onChange={(e) => setFormData({ ...formData, externalLink: e.target.value })}
                    placeholder="https://exemplo.com/inscricao"
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data Limite
                </label>
                <input
                  type="date"
                  value={formData.closingDate}
                  onChange={(e) => setFormData({ ...formData, closingDate: e.target.value })}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estado
                </label>
                <select
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="">Selecione o estado</option>
                  {ESTADOS_BRASIL.map((estado) => (
                    <option key={estado.value} value={estado.value}>
                      {estado.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value as 'open' | 'closed' })
                  }
                  className="w-full p-2 border rounded-md"
                >
                  <option value="open">Aberto</option>
                  <option value="closed">Fechado</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descrição
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2 border rounded-md"
                  rows={4}
                  required
                />
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#00B4D8] text-white rounded-md hover:bg-[#0077B6]"
                >
                  {isEditing ? 'Salvar Alterações' : 'Criar Edital'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Gerenciar Editais</h2>
            <FilterButton
              title="Filtrar Editais"
              filters={filters.editais}
              onFilterChange={(newFilters) => setFilters({ ...filters, editais: newFilters })}
              onClearFilters={() => setFilters({ ...filters, editais: { institution: '', location: '', status: '', closingDate: '' } })}
              filterOptions={editalFilterOptions}
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">Título</th>
                  <th className="text-left py-3">Instituição</th>
                  <th className="text-left py-3">Estado</th>
                  <th className="text-left py-3">Status</th>
                  <th className="text-left py-3">Data Limite</th>
                  <th className="text-left py-3">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredEditais.map((edital) => (
                  <tr key={edital.id} className="border-b">
                    <td className="py-3">{edital.title}</td>
                    <td className="py-3">{edital.institution}</td>
                    <td className="py-3">{edital.location}</td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${edital.status === 'open'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                          }`}
                      >
                        {edital.status === 'open' ? 'Aberto' : 'Fechado'}
                      </span>
                    </td>
                    <td className="py-3">
                      {new Date(edital.closingDate).toLocaleDateString()}
                    </td>
                    <td className="py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(edital)}
                          className="p-1 hover:text-[#00B4D8]"
                        >
                          <Pencil className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(edital.id)}
                          className="p-1 hover:text-red-600"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Usuários Cadastrados</h2>
            <FilterButton
              title="Filtrar Usuários"
              filters={filters.users}
              onFilterChange={(newFilters) => setFilters({ ...filters, users: newFilters })}
              onClearFilters={() => setFilters({ ...filters, users: { name: '', location: '', registeredEditais: '', timeUsed: '' } })}
              filterOptions={userFilterOptions}
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">Nome</th>
                  <th className="text-left py-3">Localização</th>
                  <th className="text-left py-3">Tempo de Uso</th>
                  <th className="text-left py-3">Editais Inscritos</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b">
                    <td className="py-3">{user.name}</td>
                    <td className="py-3">
                      {user.location ? (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {user.location}
                        </div>
                      ) : (
                        'Não definido'
                      )}
                    </td>
                    <td className="py-3">
                      {Math.floor(
                        (new Date().getTime() - new Date(user.createdAt).getTime()) /
                        (1000 * 60 * 60 * 24)
                      )}{' '}
                      dias
                    </td>
                    <td className="py-3">{getRegisteredEditaisCount(user.id)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
