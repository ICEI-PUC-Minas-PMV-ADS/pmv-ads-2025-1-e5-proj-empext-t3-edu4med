import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from 'react';

interface Notification {
  id: string;
  message: string;
  date: string;
  read: boolean;
}

interface EditalAPI {
  id: number;
  universidade: string;
  fim_cadastro: string; // formato: dd/MM/yyyy
  ativo: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  isOpen: boolean;
  toggleNotifications: () => void;
  markAsRead: (id: string) => void;
  addNotification: (message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleNotifications = () => setIsOpen(!isOpen);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const addNotification = (message: string) => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      message,
      date: new Date().toISOString(),
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const parseDate = (dateStr: string): Date => {
    const [day, month, year] = dateStr.split('/');
    return new Date(Number(year), Number(month) - 1, Number(day));
  };

  const verificarEditalMaisProximo = async () => {
    try {
      const response = await fetch(
        'https://webapiedu4med-b4h3hafmfcekhce9.brazilsouth-01.azurewebsites.net/api/Vestibular'
      );
      const data: EditalAPI[] = await response.json();

      const editaisAtivos = data.filter((edital) => edital.ativo && edital.fim_cadastro);

      if (editaisAtivos.length === 0) return;

      const editalMaisProximo = editaisAtivos.reduce((maisProximo, atual) => {
        const dataMaisProximo = parseDate(maisProximo.fim_cadastro);
        const dataAtual = parseDate(atual.fim_cadastro);
        return dataAtual < dataMaisProximo ? atual : maisProximo;
      });

      const diasRestantes = Math.ceil(
        (parseDate(editalMaisProximo.fim_cadastro).getTime() - new Date().getTime()) /
          (1000 * 60 * 60 * 24)
      );

      if (diasRestantes <= 7 && diasRestantes >= 0) {
        const mensagem = `O edital "${editalMaisProximo.universidade}" encerra as inscrições em ${editalMaisProximo.fim_cadastro}. Garanta sua vaga!`;

        const jaExiste = notifications.some((n) => n.message === mensagem);

        if (!jaExiste) {
          addNotification(mensagem);
        }
      }
    } catch (error) {
      console.error('Erro ao buscar editais para notificação:', error);
    }
  };

  useEffect(() => {
    // Executa imediatamente ao carregar
    verificarEditalMaisProximo();

    // Define intervalo de 1x por dia (em milissegundos: 86400000)
    const interval = setInterval(() => {
      verificarEditalMaisProximo();
    }, 24 * 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, [notifications]); // Dependência para evitar duplicações

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        isOpen,
        toggleNotifications,
        markAsRead,
        addNotification
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}