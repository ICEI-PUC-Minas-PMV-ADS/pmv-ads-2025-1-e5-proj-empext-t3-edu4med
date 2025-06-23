import React, { useState } from 'react';
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
  Link as LinkIcon,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react';
import FilterButton from '../components/FilterButton';
import { ESTADOS_BRASIL } from '../components/constants';
import { format, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';

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

  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);

  const [isEditing, setIsEditing] = useState(false);
  const [selectedEdital, setSelectedEdital] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);

  const [refreshKey, setRefreshKey] = useState(0);

  // Configurações de paginação
  const [editalPage, setEditalPage] = useState(1);
  const [userPage, setUserPage] = useState(1);
  const [editalPageSize, setEditalPageSize] = useState(10);
  const [userPageSize, setUserPageSize] = useState(10);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && selectedEdital) {
        await updateEdital(selectedEdital.id, formData);
      } else {
        await addEdital(formData);
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
      externalLink: edital.externalLink || ''
    });
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
      externalLink: ''
    });
    setSelectedEdital(null);
    setIsEditing(false);
    setShowForm(false);

    // ⚠️ Força re-render das tabelas com nova versão dos editais
    setRefreshKey(prev => prev + 1);
  };

  // Filtragem
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
    : [editais, filters.editais];

  // Ordenação dos editais: abertos primeiro e por data mais próxima
  const sortedEditais = [...filteredEditais].sort((a, b) => {
    // Prioridade: 'open' vem antes de qualquer outro status
    if (a.status === 'open' && b.status !== 'open') return -1;
    if (a.status !== 'open' && b.status === 'open') return 1;

    // Convertendo a data de fechamento para Date
    const parseDate = (dateStr: string) => {
      const [day, month, year] = dateStr.split('/');
      return new Date(Number(year), Number(month) - 1, Number(day));
    };

    const dateA = parseDate(a.closingDate);
    const dateB = parseDate(b.closingDate);

    // Datas mais próximas vêm antes
    return dateA.getTime() - dateB.getTime();
  });

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

  // Paginação
  const paginatedEditais = sortedEditais.slice(
    (editalPage - 1) * editalPageSize,
    editalPage * editalPageSize
  );

  const paginatedUsers = sortedEditais.slice(
    (userPage - 1) * userPageSize,
    userPage * userPageSize
  );

  const totalEditalPages = Math.ceil(sortedEditais.length / editalPageSize);
  const totalUserPages = Math.ceil(sortedEditais.length / userPageSize);

  function formatDate(dateStr: string): string {
    if (!dateStr) return 'Data não informada';
    const [day, month, year] = dateStr.split('/');
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    if (isNaN(date.getTime())) return 'Data inválida';
    return date.toLocaleDateString('pt-BR');
  }

  function toInputDate(dateStr: string): string {
    const [day, month, year] = dateStr.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }

  // Quando mudam os filtros, voltar para a primeira página
  React.useEffect(() => {
    setEditalPage(1);
  }, [filters.editais, editalPageSize]);

  React.useEffect(() => {
    setUserPage(1);
  }, [filters.users, userPageSize]);
  console.log(users);

  // Buscar usuários do back-end dinamicamente com filtros e paginação
  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const query = new URLSearchParams();
        if (filters.users.name) query.append('nome', filters.users.name);
        if (filters.users.location) query.append('regiao', filters.users.location);
        query.append('page', userPage.toString());
        query.append('pageSize', userPageSize.toString());

        const res = await fetch(`https://edu4med-ehf7ehhzcrgybmcz.brazilsouth-01.azurewebsites.net/api/Usuario`);
        const data = await res.json();

        // Ajuste aqui
        setUsers(data || []);
        setTotalUsers(data.length || 0);
      } catch (err) {
        console.error('Erro ao buscar usuários:', err);
        setUsers([]);
        setTotalUsers(0);
      }
    };

    fetchUsers();
  }, [filters.users, userPage, userPageSize]);

  // Componente de paginação
  const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    pageSize,
    onPageSizeChange
  }: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    pageSize: number;
    onPageSizeChange: (size: number) => void;
  }) => {
    return (
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center">
          <span className="text-sm text-gray-700">
            Mostrar
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="mx-2 p-1 border rounded"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
            por página
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className={`p-1 rounded ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-100'
              }`}
          >
            <ChevronsLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-1 rounded ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-100'
              }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm">
            Página <span className="font-medium">{currentPage}</span> de{" "}
            <span className="font-medium">{totalPages}</span>
          </span>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            className={`p-1 rounded ${currentPage === totalPages || totalPages === 0
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-blue-600 hover:bg-blue-100'
              }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages || totalPages === 0}
            className={`p-1 rounded ${currentPage === totalPages || totalPages === 0
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-blue-600 hover:bg-blue-100'
              }`}
          >
            <ChevronsRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  };

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
          <div
            key={selectedEdital?.id || 'new'}
            className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-2xl font-bold mb-6">
              {isEditing ? 'Editar Edital' : 'Novo Edital'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                  value={formData.closingDate ? toInputDate(formData.closingDate) : ''}
                  onChange={(e) => {
                    const [year, month, day] = e.target.value.split('-');
                    setFormData({ ...formData, closingDate: `${day}/${month}/${year}` });
                  }}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Região
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
          <div key={refreshKey} className="overflow-x-auto">
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
                {paginatedEditais.length > 0 ? (
                  paginatedEditais.map((edital) => (
                    <tr key={'${edital.id}-${refreshKey}'} className="border-b">
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
                        {edital.closingDate
                          ? formatDate(edital.closingDate)
                          : 'Data não informada'}
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
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-4 text-center text-gray-500">
                      Nenhum edital encontrado
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {filteredEditais.length > 0 && (
            <Pagination
              currentPage={editalPage}
              totalPages={totalEditalPages}
              onPageChange={setEditalPage}
              pageSize={editalPageSize}
              onPageSizeChange={setEditalPageSize}
            />
          )}
        </div>

        {/* TABELA DE USUÁRIOS */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Usuários Cadastrados</h2>
            <FilterButton
              title="Filtrar Usuários"
              filters={filters.users}
              onFilterChange={(newFilters) =>
                setFilters({ ...filters, users: { ...filters.users, name: newFilters.name } })
              }
              onClearFilters={() =>
                setFilters({
                  ...filters,
                  users: { name: '', registeredEditais: '', location: '', timeUsed: '' }
                })
              }
              filterOptions={[
                {
                  name: 'name',
                  label: 'Nome',
                  type: 'text' as const,
                  placeholder: 'Filtrar por nome'
                },
                {
                  name: 'registeredEditais',
                  label: 'Editais Inscritos',
                  type: 'number' as const,
                  placeholder: 'Quantidade'
                }
              ]}
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">Nome</th>
                  <th className="text-left py-3">Email</th>
                  <th className="text-left py-3">Editais Inscritos</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.length > 0 ? (
                  users.map((users) => (
                <tr key={users.id} className="border-b">
                  <td className="py-3">{users.nome}</td>
                  <td className="py-3">{users.email}</td>
                  <td className="py-3">{getRegisteredEditaisCount(users.id)}</td>
                </tr>
                ))
                ) : (
                <tr>
                  <td colSpan={3} className="py-4 text-center text-gray-500">
                    Nenhum usuário encontrado
                  </td>
                </tr>
                )}
              </tbody>
            </table>
          </div>
          {filteredUsers.length > 0 && (
            <Pagination
              currentPage={userPage}
              totalPages={totalUserPages}
              onPageChange={setUserPage}
              pageSize={userPageSize}
              onPageSizeChange={setUserPageSize}
            />
          )}
        </div>
      </div>
    </div>
  );
}
