import React, { createContext, useContext, useState, ReactNode } from 'react';
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

const mockEditais: Edital[] = [
  {
    id: '1',
    title: 'Congresso Brasileiro de Anestesiologia',
    institution: 'Sociedade Brasileira de Anestesiologia',
    imageUrl: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=2791&ixlib=rb-4.0.3',
    description: 'O maior evento de anestesiologia do Brasil, reunindo profissionais e estudantes para compartilhar conhecimentos e experiências.',
    closingDate: '2024-06-30',
    location: 'SP',
    status: 'open',
    externalLink: 'https://example.com/congresso-anestesiologia',
  },
  {
    id: '2',
    title: 'Simpósio de Medicina Intensiva',
    institution: 'AMIB',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=2880&ixlib=rb-4.0.3',
    description: 'Simpósio focado em atualizações e inovações em medicina intensiva.',
    closingDate: '2024-05-15',
    location: 'RJ',
    status: 'open',
    externalLink: 'https://example.com/simposio-medicina-intensiva',
  },
  {
    id: '3',
    title: 'Residência em Clínica Médica',
    institution: 'Santa Casa de São Paulo',
    imageUrl: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&q=80&w=2871&ixlib=rb-4.0.3',
    description: 'Programa de residência médica em clínica geral com duração de 2 anos.',
    closingDate: '2024-04-20',
    location: 'SP',
    status: 'closed',
    externalLink: 'https://example.com/residencia-clinica-medica',
  },
];

export function EditaisProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [editais, setEditais] = useState<Edital[]>(mockEditais);
  const [favoritedEditais, setFavoritedEditais] = useState<string[]>([]);
  const [registeredEditais, setRegisteredEditais] = useState<string[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ location: '', institution: '' });

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

  const getFilteredEditais = (includeUserLocation = false) => {
    return editais
      .map(edital => ({
        ...edital,
        isFavorited: favoritedEditais.includes(edital.id),
        isRegistered: registeredEditais.includes(edital.id)
      }))
      .filter(edital => {
        const matchesSearch = edital.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            edital.institution.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesLocation = includeUserLocation
          ? user?.location ? edital.location === user.location : true
          : !filters.location || edital.location === filters.location;
        
        const matchesInstitution = !filters.institution || 
                                 edital.institution.toLowerCase().includes(filters.institution.toLowerCase());
        
        return matchesSearch && matchesLocation && matchesInstitution;
      });
  };

  const addEdital = async (edital: Omit<Edital, 'id' | 'isFavorited' | 'isRegistered' | 'registrationStatus'>) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newEdital: Edital = {
        ...edital,
        id: String(editais.length + 1),
      };

      setEditais(prev => [...prev, newEdital]);
      toast.success('Edital criado com sucesso!');
    } catch (error) {
      toast.error('Erro ao criar edital. Tente novamente.');
      throw error;
    }
  };

  const updateEdital = async (id: string, editalUpdate: Partial<Edital>) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      setEditais(prev => prev.map(edital => 
        edital.id === id ? { ...edital, ...editalUpdate } : edital
      ));

      toast.success('Edital atualizado com sucesso!');
    } catch (error) {
      toast.error('Erro ao atualizar edital. Tente novamente.');
      throw error;
    }
  };

  const deleteEdital = async (id: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

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