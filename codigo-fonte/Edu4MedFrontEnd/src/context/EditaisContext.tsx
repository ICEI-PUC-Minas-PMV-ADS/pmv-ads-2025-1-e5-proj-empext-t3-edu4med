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
    title: 'Processo Seletivo UNICEUB',
    institution: 'Centro Universitario de Brasilia - UNICEUB',
    imageUrl: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=2791&ixlib=rb-4.0.3',
    description: '75 vagas para Medicina em instituição privada',
    closingDate: '2025-05-04',
    location: 'DF',
    status: 'open',
    externalLink: 'http://www.uniceub.br'
  },
  {
    id: '2',
    title: 'Processo Seletivo UNICEUB - VUNESP',
    institution: 'Centro Universitario de Brasilia - UNICEUB',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=2880&ixlib=rb-4.0.3',
    description: '75 vagas para Medicina via VUNESP em instituição privada',
    closingDate: '2025-05-04',
    location: 'DF',
    status: 'open',
    externalLink: 'https://www.vunesp.com.br/UCEB2501'
  },
  {
    id: '3',
    title: 'Processo Seletivo FAME Barbacena',
    institution: 'Faculdade de Medicina de Barbacena/MG - FAME',
    imageUrl: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&q=80&w=2871&ixlib=rb-4.0.3',
    description: '60 vagas para Medicina em instituição privada',
    closingDate: '2025-05-05',
    location: 'MG',
    status: 'open',
    externalLink: 'http://www.funjob.edu.br'
  },
  {
    id: '4',
    title: 'Vestibular FAME Barbacena',
    institution: 'Faculdade de Medicina de Barbacena - FAME',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=2880&ixlib=rb-4.0.3',
    description: '60 vagas para Medicina via vestibular online',
    closingDate: '2025-05-05',
    location: 'MG',
    status: 'open',
    externalLink: 'https://vestibular.funjob.edu.br/'
  },
  {
    id: '5',
    title: 'Processo Seletivo Unicerrado',
    institution: 'Centro Universitario de Goiatuba - GO',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=2880&ixlib=rb-4.0.3',
    description: '60 vagas para Medicina em instituição municipal',
    closingDate: '2025-05-06',
    location: 'GO',
    status: 'open',
    externalLink: 'www.unicerrado.edu.br'
  },
  {
    id: '6',
    title: 'Vestibular UERJ',
    institution: 'Universidade do Estado do Rio de Janeiro - UERJ',
    imageUrl: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&q=80&w=2871&ixlib=rb-4.0.3',
    description: '104 vagas para Medicina em instituição pública',
    closingDate: '2025-05-06',
    location: 'RJ',
    status: 'open',
    externalLink: 'https://www.vestibular.uerj.br/?p=15576'
  },
  {
    id: '7',
    title: 'Processo Seletivo UNIG',
    institution: 'Universidade Iguacu - Nova Iguacu - RJ',
    imageUrl: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=2791&ixlib=rb-4.0.3',
    description: '100 vagas para Medicina em instituição privada',
    closingDate: '2025-05-08',
    location: 'RJ',
    status: 'open',
    externalLink: 'http://www.unig.br'
  },
  {
    id: '8',
    title: 'Vestibular Medicina UNIG',
    institution: 'Universidade Iguacu - UNIG',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=2880&ixlib=rb-4.0.3',
    description: '100 vagas para Medicina (vestibular específico)',
    closingDate: '2025-05-08',
    location: 'RJ',
    status: 'open',
    externalLink: 'https://unig.br/vestibular-medicina-2025-2/'
  },
  {
    id: '9',
    title: 'Processo Seletivo UNIFENAS Alfenas',
    institution: 'UNIFENAS Alfenas/MG',
    imageUrl: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&q=80&w=2871&ixlib=rb-4.0.3',
    description: '80 vagas para Medicina em instituição privada',
    closingDate: '2025-05-12',
    location: 'MG',
    status: 'open',
    externalLink: 'http://www.unifenas.br'
  },
  {
    id: '10',
    title: 'Processo Seletivo UNIFENAS BH',
    institution: 'UNIFENAS Belo Horizonte/MG',
    imageUrl: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=2791&ixlib=rb-4.0.3',
    description: '130 vagas para Medicina em instituição privada',
    closingDate: '2025-05-12',
    location: 'MG',
    status: 'open',
    externalLink: 'http://www.unifenas.br'
  },
  {
    id: '11',
    title: 'Processo Seletivo FAMINAS BH',
    institution: 'Faculdade de Minas BH - FAMINAS',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=2880&ixlib=rb-4.0.3',
    description: '90 vagas para Medicina em instituição privada',
    closingDate: '2025-05-12',
    location: 'MG',
    status: 'open',
    externalLink: 'http://www.faminasbh.edu.br'
  },
  {
    id: '12',
    title: 'Processo Seletivo FAMINAS Muriae',
    institution: 'Uni-Faminas Minas - FAMINAS/Muriae',
    imageUrl: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&q=80&w=2871&ixlib=rb-4.0.3',
    description: '40 vagas para Medicina em instituição privada',
    closingDate: '2025-05-12',
    location: 'MG',
    status: 'open',
    externalLink: 'http://www.faminasbh.edu.br'
  },
  {
    id: '13',
    title: 'Processo Seletivo UNILAGO',
    institution: 'Uniao das Faculdades dos Grandes Lagos',
    imageUrl: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=2791&ixlib=rb-4.0.3',
    description: '50 vagas para Medicina em instituição privada',
    closingDate: '2025-05-12',
    location: 'SP',
    status: 'open',
    externalLink: 'http://www.unilago.com.br'
  },
  {
    id: '14',
    title: 'Vestibular FAMINAS Muriae',
    institution: 'Faculdade de Minas - FAMINAS',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=2880&ixlib=rb-4.0.3',
    description: '40 vagas para Medicina (vestibular online)',
    closingDate: '2025-05-12',
    location: 'MG',
    status: 'open',
    externalLink: 'https://vestibularfaminas.com.br/medicina/'
  },
  {
    id: '15',
    title: 'Vestibular FAMINAS BH',
    institution: 'Faculdade de Minas - FAMINAS-BH',
    imageUrl: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&q=80&w=2871&ixlib=rb-4.0.3',
    description: '90 vagas para Medicina (vestibular online)',
    closingDate: '2025-05-12',
    location: 'MG',
    status: 'open',
    externalLink: 'https://vestibularfaminas.com.br/medicina/'
  },
  {
    id: '16',
    title: 'Processo Seletivo PUC PR Curitiba',
    institution: 'Pontificia Universidade Catolica do Parana',
    imageUrl: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=2791&ixlib=rb-4.0.3',
    description: '83 vagas para Medicina em instituição privada',
    closingDate: '2025-05-12',
    location: 'PR',
    status: 'open',
    externalLink: 'https://graduacao.pucpr.br/'
  },
  {
    id: '17',
    title: 'Processo Seletivo PUC PR Londrina',
    institution: 'Pontificia Universidade Catolica do Parana',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=2880&ixlib=rb-4.0.3',
    description: '55 vagas para Medicina em instituição privada',
    closingDate: '2025-05-12',
    location: 'PR',
    status: 'open',
    externalLink: 'https://graduacao.pucpr.br/'
  },
  {
    id: '18',
    title: 'Processo Seletivo PUC PR Toledo',
    institution: 'Pontificia Universidade Catolica do Parana',
    imageUrl: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&q=80&w=2871&ixlib=rb-4.0.3',
    description: '20 vagas para Medicina em instituição privada',
    closingDate: '2025-05-12',
    location: 'PR',
    status: 'open',
    externalLink: 'https://graduacao.pucpr.br/'
  },
  {
    id: '19',
    title: 'Processo Seletivo UNIFSM',
    institution: 'Centro Universitario Santa Maria',
    imageUrl: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=2791&ixlib=rb-4.0.3',
    description: '30 vagas para Medicina em instituição privada',
    closingDate: '2025-05-13',
    location: 'PB',
    status: 'open',
    externalLink: 'https://unifsm.edu.br/editais/'
  },
  {
    id: '20',
    title: 'Processo Seletivo FASM',
    institution: 'Faculdade Santa Marcelina',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=2880&ixlib=rb-4.0.3',
    description: '85 vagas para Medicina via VUNESP',
    closingDate: '2025-05-13',
    location: 'SP',
    status: 'open',
    externalLink: 'https://www.vunesp.com.br/FSTM2501'
  },
  {
    id: '21',
    title: 'Processo Seletivo FEEVALE',
    institution: 'Universidade Feevale',
    imageUrl: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&q=80&w=2871&ixlib=rb-4.0.3',
    description: '40 vagas para Medicina em instituição privada',
    closingDate: '2025-05-14',
    location: 'RS',
    status: 'open',
    externalLink: 'http://www.feevale.br'
  },
  {
    id: '22',
    title: 'Processo Seletivo UNIFIMES',
    institution: 'Centro Universitario de Mineiros',
    imageUrl: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=2791&ixlib=rb-4.0.3',
    description: '75 vagas para Medicina em instituição municipal',
    closingDate: '2025-05-15',
    location: 'GO',
    status: 'open',
    externalLink: 'www.unifimes.edu.br'
  },
  {
    id: '23',
    title: 'Processo Seletivo São Camilo',
    institution: 'Centro Universitario São Camilo',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=2880&ixlib=rb-4.0.3',
    description: '90 vagas para Medicina via VUNESP',
    closingDate: '2025-05-15',
    location: 'SP',
    status: 'open',
    externalLink: 'https://www.vunesp.com.br/CUSC2402'
  },
  {
    id: '24',
    title: 'Processo Seletivo UNIFIP',
    institution: 'Centro Universitario de Patos',
    imageUrl: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&q=80&w=2871&ixlib=rb-4.0.3',
    description: '30 vagas para Medicina em instituição privada',
    closingDate: '2025-05-16',
    location: 'PB',
    status: 'open',
    externalLink: 'http://www.fiponline.com.br'
  },
  {
    id: '25',
    title: 'Processo Seletivo FEMA',
    institution: 'Fundacao Educacional do Municipio de Assis',
    imageUrl: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=2791&ixlib=rb-4.0.3',
    description: '42 vagas para Medicina em instituição privada',
    closingDate: '2025-05-16',
    location: 'SP',
    status: 'open',
    externalLink: 'http://www.fema.edu.br'
  },
  {
    id: '26',
    title: 'Processo Seletivo FEMA - VUNESP',
    institution: 'Fundacao Educacional do Municipio de Assis',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=2880&ixlib=rb-4.0.3',
    description: '46 vagas para Medicina via VUNESP',
    closingDate: '2025-05-16',
    location: 'SP',
    status: 'open',
    externalLink: 'https://www.vunesp.com.br/FEAS2501'
  },
  {
    id: '27',
    title: 'Processo Seletivo UNIFAGOC',
    institution: 'Centro Universitario UNIFAGOC',
    imageUrl: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&q=80&w=2871&ixlib=rb-4.0.3',
    description: '18 vagas para Medicina em instituição privada',
    closingDate: '2025-05-19',
    location: 'MG',
    status: 'open',
    externalLink: 'http://www.fagoc.br'
  },
  {
    id: '28',
    title: 'Processo Seletivo UESB Vitória da Conquista',
    institution: 'Universidade Estadual do Sudoeste da Bahia',
    imageUrl: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=2791&ixlib=rb-4.0.3',
    description: '4 vagas para Medicina em instituição pública',
    closingDate: '2025-05-20',
    location: 'BA',
    status: 'open',
    externalLink: 'https://www.uesb.br/editais/edital-117-processo-seletivo-de-acesso-e-inclusao-psai-para-2025-2/'
  },
  {
    id: '29',
    title: 'Processo Seletivo UESB Jequié',
    institution: 'Universidade Estadual do Sudoeste da Bahia',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=2880&ixlib=rb-4.0.3',
    description: '4 vagas para Medicina em instituição pública',
    closingDate: '2025-05-20',
    location: 'BA',
    status: 'open',
    externalLink: 'https://www.uesb.br/editais/edital-117-processo-seletivo-de-acesso-e-inclusao-psai-para-2025-2/'
  },
  {
    id: '30',
    title: 'Processo Seletivo UNIUBE',
    institution: 'Universidade de Uberaba',
    imageUrl: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&q=80&w=2871&ixlib=rb-4.0.3',
    description: '39 vagas para Medicina em instituição privada',
    closingDate: '2025-05-21',
    location: 'MG',
    status: 'open',
    externalLink: 'http://www.uniube.br'
  },
  {
    id: '31',
    title: 'Processo Seletivo UNIUBE - VUNESP',
    institution: 'Universidade de Uberaba',
    imageUrl: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=2791&ixlib=rb-4.0.3',
    description: '39 vagas para Medicina via VUNESP',
    closingDate: '2025-05-21',
    location: 'MG',
    status: 'open',
    externalLink: 'https://www.vunesp.com.br/UNUB2209'
  },
  {
    id: '32',
    title: 'Processo Seletivo UNIFIMES Mineiros',
    institution: 'Centro Universitario de Mineiros',
    imageUrl: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=2791&ixlib=rb-4.0.3',
    description: '60 vagas para Medicina em instituição municipal',
    closingDate: '2025-05-22',
    location: 'GO',
    status: 'open',
    externalLink: 'http://www.unifimes.edu.br'
  },
  {
    id: '33',
    title: 'Processo Seletivo UNIFIMES - VUNESP',
    institution: 'Centro Universitario de Mineiros',
    imageUrl: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&q=80&w=2871&ixlib=rb-4.0.3',
    description: '60 vagas para Medicina via VUNESP',
    closingDate: '2025-05-22',
    location: 'GO',
    status: 'open',
    externalLink: 'https://www.vunesp.com.br/UNIF2502'
  },
  {
    id: '34',
    title: 'Processo Seletivo UNISA Guarulhos',
    institution: 'Universidade de Santo Amaro',
    imageUrl: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=2791&ixlib=rb-4.0.3',
    description: '30 vagas para Medicina via VUNESP',
    closingDate: '2025-05-25',
    location: 'SP',
    status: 'open',
    externalLink: 'https://www.vunesp.com.br/UNIS2501'
  },
  {
    id: '35',
    title: 'Processo Seletivo UNISA Interlagos',
    institution: 'Universidade de Santo Amaro',
    imageUrl: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=2791&ixlib=rb-4.0.3',
    description: '60 vagas para Medicina via VUNESP',
    closingDate: '2025-05-25',
    location: 'SP',
    status: 'open',
    externalLink: 'https://www.vunesp.com.br/UNIS2501'
  },
  {
    id: '36',
    title: 'Processo Seletivo UNIFEV',
    institution: 'Centro Universitario de Votuporanga',
    imageUrl: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&q=80&w=2871&ixlib=rb-4.0.3',
    description: '60 vagas para Medicina em instituição privada',
    closingDate: '2025-05-26',
    location: 'SP',
    status: 'open',
    externalLink: 'www.fev.edu.br'
  },
  {
    id: '37',
    title: 'Vestibular UNIFEV',
    institution: 'Centro Universitario de Votuporanga',
    imageUrl: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=2791&ixlib=rb-4.0.3',
    description: '60 vagas para Medicina (vestibular específico)',
    closingDate: '2025-05-26',
    location: 'SP',
    status: 'open',
    externalLink: 'https://www.unifev.edu.br/medvotu'
  },
  {
    id: '38',
    title: 'Processo Seletivo UNIFESO',
    institution: 'Centro Universitario Serra dos Orgaos',
    imageUrl: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=2791&ixlib=rb-4.0.3',
    description: '40 vagas para Medicina em instituição privada',
    closingDate: '2025-05-27',
    location: 'RJ',
    status: 'open',
    externalLink: 'http://www.feso.br'
  },
  {
    id: '39',
    title: 'Vestibular Medicina UNIFESO',
    institution: 'Centro Universitario Serra dos Orgaos',
    imageUrl: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&q=80&w=2871&ixlib=rb-4.0.3',
    description: '40 vagas para Medicina (vestibular específico)',
    closingDate: '2025-05-27',
    location: 'RJ',
    status: 'open',
    externalLink: 'https://medicinaunifeso.com.br/'
  },
  {
    id: '40',
    title: 'Processo Seletivo USCS',
    institution: 'Universidade de Sao Caetano do Sul',
    imageUrl: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=2791&ixlib=rb-4.0.3',
    description: '60 vagas para Medicina em instituição municipal',
    closingDate: '2025-05-28',
    location: 'SP',
    status: 'open',
    externalLink: 'http://www.uscs.edu.br'
  },
  {
    id: '41',
    title: 'Processo Seletivo USCS Bela Vista',
    institution: 'Universidade Municipal de Sao Caetano do Sul',
    imageUrl: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=2791&ixlib=rb-4.0.3',
    description: '60 vagas para Medicina em campus Bela Vista',
    closingDate: '2025-05-28',
    location: 'SP',
    status: 'open',
    externalLink: ''
  },
  {
    id: '42',
    title: 'Processo Seletivo USCS',
    institution: 'Universidade Municipal de Sao Caetano do Sul',
    imageUrl: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&q=80&w=2871&ixlib=rb-4.0.3',
    description: '60 vagas para Medicina em instituição municipal',
    closingDate: '2025-05-28',
    location: 'SP',
    status: 'open',
    externalLink: 'http://www.uscs.edu.br'
  },
  {
    id: '43',
    title: 'Processo Seletivo USCS - VUNESP',
    institution: 'Universidade Municipal de Sao Caetano do Sul',
    imageUrl: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=2791&ixlib=rb-4.0.3',
    description: '60 vagas para Medicina via VUNESP',
    closingDate: '2025-05-28',
    location: 'SP',
    status: 'open',
    externalLink: 'https://www.vunesp.com.br/USCS2501'
  },
  {
    id: '44',
    title: 'Processo Seletivo USCS Itapetininga',
    institution: 'Universidade Municipal de Sao Caetano do Sul',
    imageUrl: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=2791&ixlib=rb-4.0.3',
    description: '60 vagas para Medicina em campus Itapetininga',
    closingDate: '2025-05-28',
    location: 'SP',
    status: 'open',
    externalLink: 'https://www.vunesp.com.br/USCS2501'
  },
  {
    id: '45',
    title: 'Processo Seletivo USCS Bela Vista - VUNESP',
    institution: 'Universidade Municipal de Sao Caetano do Sul',
    imageUrl: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&q=80&w=2871&ixlib=rb-4.0.3',
    description: '60 vagas para Medicina via VUNESP (Bela Vista)',
    closingDate: '2025-05-28',
    location: 'SP',
    status: 'open',
    externalLink: 'https://www.vunesp.com.br/USCS2501'
  },
  {
    id: '46',
    title: 'Processo Seletivo SLMANDIC Araras',
    institution: 'Faculdade Sao Leopoldo Mandic',
    imageUrl: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=2791&ixlib=rb-4.0.3',
    description: '48 vagas para Medicina em campus Araras',
    closingDate: '2025-05-30',
    location: 'SP',
    status: 'open',
    externalLink: 'https://www.slmandicararas.edu.br/'
  },
  {
    id: '47',
    title: 'Processo Seletivo SLMANDIC Campinas',
    institution: 'Faculdade Sao Leopoldo Mandic',
    imageUrl: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=2791&ixlib=rb-4.0.3',
    description: '44 vagas para Medicina em campus Campinas',
    closingDate: '2025-05-30',
    location: 'SP',
    status: 'open',
    externalLink: 'http://www.slmandic.edu.br'
  },
  {
    id: '48',
    title: 'Processo Seletivo SLMANDIC Limeira',
    institution: 'Faculdade Sao Leopoldo Mandic',
    imageUrl: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&q=80&w=2871&ixlib=rb-4.0.3',
    description: '21 vagas para Medicina em campus Limeira',
    closingDate: '2025-05-30',
    location: 'SP',
    status: 'open',
    externalLink: 'www.slmandiclimeira.com.br'
  },
  {
    id: '49',
    title: 'Processo Seletivo UNIFAI',
    institution: 'Centro Universitario de Adamantina',
    imageUrl: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=2791&ixlib=rb-4.0.3',
    description: '50 vagas para Medicina em instituição municipal',
    closingDate: '2025-05-30',
    location: 'SP',
    status: 'open',
    externalLink: 'http://www.fai.com.br'
  },
  {
    id: '50',
    title: 'Processo Seletivo UNIFAI - VUNESP',
    institution: 'Centro Universitario de Adamantina',
    imageUrl: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=2791&ixlib=rb-4.0.3',
    description: '50 vagas para Medicina via VUNESP',
    closingDate: '2025-05-30',
    location: 'SP',
    status: 'open',
    externalLink: 'https://www.vunesp.com.br/FAIS2503'
  },
  {
    id: '51',
    title: 'Processo Seletivo UNISC',
    institution: 'Universidade de Santa Cruz do Sul',
    imageUrl: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&q=80&w=2871&ixlib=rb-4.0.3',
    description: 'Vagas não especificadas para Medicina',
    closingDate: '2025-06-02',
    location: 'RS',
    status: 'open',
    externalLink: 'http://www.unisc.br'
  },
  {
    id: '52',
    title: 'Processo Seletivo UNOESTE',
    institution: 'Universidade do Oeste Paulista',
    imageUrl: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=2791&ixlib=rb-4.0.3',
    description: '105 vagas para Medicina em instituição privada',
    closingDate: '2025-06-11',
    location: 'SP',
    status: 'open',
    externalLink: 'http://www.unoeste.br'
  }
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
