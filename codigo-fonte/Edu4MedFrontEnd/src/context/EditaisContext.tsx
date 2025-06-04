import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';

interface Edital {
  id: string;
  title: string;
  institution: string;
  imageUrl: string;
  description: string;
  closingDate: string;
  location: string;
  status: 'open' | 'closed';
  externalLink?: string;
  isFavorited?: boolean;
  isRegistered?: boolean;
  registrationStatus?: string;
}

interface Registration {
  userId: string;
  editalId: string;
  date: string;
}

interface EditaisContextType {
  editais: Edital[];
  favoritedEditais: string[];
  registeredEditais: string[];
  registrations: Registration[];
  searchTerm: string;
  filters: {
    location: string;
    institution: string;
  };
  toggleFavorite: (editalId: string) => void;
  setSearchTerm: (term: string) => void;
  setFilters: (filters: { location: string; institution: string }) => void;
  clearFilters: () => void;
  getFilteredEditais: (includeUserLocation?: boolean) => Edital[];
  addEdital: (edital: Omit<Edital, 'id' | 'isFavorited' | 'isRegistered' | 'registrationStatus'>) => Promise<void>;
  updateEdital: (id: string, edital: Partial<Edital>) => Promise<void>;
  deleteEdital: (id: string) => Promise<void>;
  confirmRegistration: (editalId: string, userId: string) => void;
  getRegisteredEditaisCount: (userId: string) => number;
}

const EditaisContext = createContext<EditaisContextType | undefined>(undefined);

export function EditaisProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [editais, setEditais] = useState<Edital[]>([]);
  const [favoritedEditais, setFavoritedEditais] = useState<string[]>([]);
  const [registeredEditais, setRegisteredEditais] = useState<string[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ location: '', institution: '' });

  // Função robusta para formatar datas
  const formatDate = (dateString: string): string => {
    if (!dateString) return 'Data não disponível';

    try {
      // Tenta parsear como ISO string (formato comum em APIs)
      let date = new Date(dateString);

      // Se for inválido, tenta parsear como mm/dd/yyyy
      if (isNaN(date.getTime())) {
        const parts = dateString.split('/');
        if (parts.length === 3) {
          // Assume formato mm/dd/yyyy
          date = new Date(`${parts[2]}-${parts[0]}-${parts[1]}`);
        }
      }

      // Se ainda for inválido, retorna a string original
      if (isNaN(date.getTime())) {
        return dateString;
      }

      // Formata para dd/mm/yyyy
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch (error) {
      console.error('Erro ao formatar data:', error);
      return dateString;
    }
  };

  //Função para corrigir o TimeZone
  function fixTimezoneDate(dateStr: string): string {
    const [day, month, year] = dateStr.split('/').map(Number);

    const date = new Date(Date.UTC(year, month - 1, day));
    const adjustedDay = String(date.getUTCDate() + 1).padStart(2, '0');
    const adjustedMonth = String(date.getUTCMonth() + 1).padStart(2, '0');
    const adjustedYear = date.getUTCFullYear();

    return `${adjustedDay}/${adjustedMonth}/${adjustedYear}`;
  }

  // Função para retornar uma imagem aleatória
  const getImageForEdital = (): string => {
    const images = [
      'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=2791',
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=2880',
      'https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&q=80&w=2871',
      'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=2832',
      'https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=2940',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2940',
      'https://images.unsplash.com/photo-1581595219315-a187dd40c322?auto=format&fit=crop&q=80&w=2940',
      'https://images.unsplash.com/photo-1551601651-bc60f254d532?auto=format&fit=crop&q=80&w=2940',
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2940',
    ];
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };

  useEffect(() => {
    const fetchEditais = async () => {
      try {
        const response = await fetch('https://webapiedu4med-b4h3hafmfcekhce9.brazilsouth-01.azurewebsites.net/api/Vestibular');
        const data = await response.json();

        const editaisFromApi: Edital[] = data.map((item: any) => {
          return {
            id: item.id.toString(),
            title: item.universidade,
            institution: item.instituicao,
            description: '', // Se não existir na API, pode ser vazio ou omitido
            closingDate: formatDate(item.fim_cadastro), // Usa a nova função de formatação
            location: item.regiao,
            status: item.ativo ? 'open' : 'closed',
            externalLink: item.link,
            imageUrl: getImageForEdital(),
          };
        });

        setEditais(editaisFromApi);
      } catch (error) {
        console.error('Erro ao buscar editais:', error);
        toast.error('Erro ao carregar editais. Tente novamente mais tarde.');
      }
    };

    fetchEditais();
  }, []);

  const toggleFavorite = (editalId: string) => {
    setFavoritedEditais(prev =>
      prev.includes(editalId)
        ? prev.filter(id => id !== editalId)
        : [...prev, editalId]
    );
  };

  const confirmRegistration = (editalId: string, userId: string) => {
    if (!registrations.some(r => r.editalId === editalId && r.userId === userId)) {
      const newRegistration: Registration = {
        userId,
        editalId,
        date: new Date().toISOString(),
      };
      setRegistrations(prev => [...prev, newRegistration]);
      setRegisteredEditais(prev => [...prev, editalId]);
      toast.success('Inscrição confirmada com sucesso!');
    }
  };

  const getRegisteredEditaisCount = (userId: string) => {
    return registrations.filter(r => r.userId === userId).length;
  };

  const clearFilters = () => {
    setFilters({ location: '', institution: '' });
    setSearchTerm('');
  };

  const parseDate = (dateStr: string): Date => {
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      // yyyy-mm-dd → dd/mm/yyyy 2 1 0
      return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
    }
    return new Date(dateStr); // fallback para ISO
  };

  const getFilteredEditais = (includeUserLocation = false) => {
    const filtered = editais
      .map(edital => ({
        ...edital,
        isFavorited: favoritedEditais.includes(edital.id),
        isRegistered: registeredEditais.includes(edital.id),
      }))
      .filter(edital => {
        const matchesSearch =
          (edital.title?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
          (edital.institution?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);

        const matchesLocation = includeUserLocation
          ? user?.location ? edital.location === user.location : true
          : !filters.location || edital.location === filters.location;

        const matchesInstitution = !filters.institution ||
          edital.institution.toLowerCase().includes(filters.institution.toLowerCase());

        return matchesSearch && matchesLocation && matchesInstitution;
      })
      .sort((a, b) => {
        // Primeiro: status "open" antes de "closed"
        if (a.status === 'closed' && b.status !== 'closed') return 1;
        if (a.status !== 'closed' && b.status === 'closed') return -1;

        // Se os dois têm o mesmo status, ordenar por data (mais próxima primeiro)
        const dateA = parseDate(a.closingDate);
        const dateB = parseDate(b.closingDate);
        return dateA.getTime() - dateB.getTime();
      });

    return filtered;
  };


  const addEdital = async (
    edital: Omit<Edital, 'id' | 'isFavorited' | 'isRegistered' | 'registrationStatus'>
  ) => {
    try {
      // Mapeia os campos para o esperado pela API
      const editalPayload = {
        universidade: edital.title,
        instituicao: edital.institution,
        fim_cadastro: edital.closingDate ? fixTimezoneDate(edital.closingDate) : '', // já deve estar no formato dd/MM/yyyy
        regiao: edital.location,
        ativo: edital.status === 'open',
        link: edital.externalLink || '',
        link_inscricoes: '', // se tiver esse campo, preencha aqui
        vagas: '', // opcional
      };

      const response = await fetch('https://webapiedu4med-b4h3hafmfcekhce9.brazilsouth-01.azurewebsites.net/api/Vestibular', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editalPayload),
      });

      if (!response.ok) {
        throw new Error('Erro ao criar edital');
      }

      const createdEdital = await response.json();

      setEditais(prev => [...prev, {
        id: createdEdital.id.toString(),
        title: createdEdital.universidade,
        institution: createdEdital.instituicao,
        description: '',
        closingDate: formatDate(createdEdital.fim_cadastro),
        location: createdEdital.regiao,
        status: createdEdital.ativo ? 'open' : 'closed',
        externalLink: createdEdital.link,
        imageUrl: getImageForEdital(),
      }]);

      toast.success('Edital criado com sucesso!');
    } catch (error) {
      toast.error('Erro ao criar edital. Tente novamente.');
      throw error;
    }
  };

  const updateEdital = async (id: string, editalUpdate: Partial<Edital>) => {
    try {
      const editalPayload = {
        universidade: editalUpdate.title,
        instituicao: editalUpdate.institution,
        fim_cadastro: editalUpdate.closingDate ? fixTimezoneDate(editalUpdate.closingDate) : '',
        regiao: editalUpdate.location,
        ativo: editalUpdate.status === 'open',
        link: editalUpdate.externalLink || '',
        link_inscricoes: '',
        vagas: '',
      };

      const response = await fetch(
        `https://webapiedu4med-b4h3hafmfcekhce9.brazilsouth-01.azurewebsites.net/api/Vestibular/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editalPayload),
        }
      );

      if (!response.ok) {
        throw new Error('Erro ao atualizar edital');
      }

      let updated: any = null;
      const text = await response.text();
      if (text) {
        updated = JSON.parse(text);
      }

      setEditais(prev =>
        prev.map(edital =>
          edital.id === id
            ? {
              ...edital,
              id,
              title: updated?.universidade ?? editalUpdate.title ?? edital.title,
              institution: updated?.instituicao ?? editalUpdate.institution ?? edital.institution,
              closingDate: fixTimezoneDate(updated?.fim_cadastro ?? editalUpdate.closingDate ?? edital.closingDate),
              location: updated?.regiao ?? editalUpdate.location ?? edital.location,
              status: (updated?.ativo ?? editalUpdate.status === 'open') ? 'open' : 'closed',
              externalLink: updated?.link ?? editalUpdate.externalLink ?? edital.externalLink,
              imageUrl: edital.imageUrl || getImageForEdital(),
            }
            : edital
        )
      );

      toast.success('Edital atualizado com sucesso!');
    } catch (error) {
      toast.error('Erro ao atualizar edital. Tente novamente.');
      throw error;
    }
  };

  const deleteEdital = async (id: string) => {
    try {
      const response = await fetch(`https://webapiedu4med-b4h3hafmfcekhce9.brazilsouth-01.azurewebsites.net/api/Vestibular/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao excluir edital');
      }

      setEditais(prev => prev.filter(edital => edital.id !== id));
      setFavoritedEditais(prev => prev.filter(editalId => editalId !== id));
      setRegisteredEditais(prev => prev.filter(editalId => editalId !== id));
      setRegistrations(prev => prev.filter(reg => reg.editalId !== id));

      toast.success('Edital excluído com sucesso!');
    } catch (error) {
      toast.error('Erro ao excluir edital. Tente novamente.');
      throw error;
    }
  };


  return (
    <EditaisContext.Provider
      value={{
        editais: editais.map(edital => ({
          ...edital,
          isFavorited: favoritedEditais.includes(edital.id),
          isRegistered: registeredEditais.includes(edital.id)
        })),
        favoritedEditais,
        registeredEditais,
        registrations,
        searchTerm,
        filters,
        toggleFavorite,
        setSearchTerm,
        setFilters,
        clearFilters,
        getFilteredEditais,
        addEdital,
        updateEdital,
        deleteEdital,
        confirmRegistration,
        getRegisteredEditaisCount,
      }}
    >
      {children}
    </EditaisContext.Provider>
  );
}

export function useEditais() {
  const context = useContext(EditaisContext);
  if (context === undefined) {
    throw new Error('useEditais must be used within an EditaisProvider');
  }
  return context;
}