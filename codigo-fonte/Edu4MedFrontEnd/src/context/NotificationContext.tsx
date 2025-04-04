import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Notification {
  id: string;
  message: string;
  date: string;
  read: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  isOpen: boolean;
  toggleNotifications: () => void;
  markAsRead: (id: string) => void;
  addNotification: (message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const mockNotifications: Notification[] = [
  {
    id: '1',
    message: 'O edital "Congresso Brasileiro de Anestesiologia" está com vagas abertas até 30/06/2024. Inscreva-se!',
    date: '2024-03-15',
    read: false,
  },
  {
    id: '2',
    message: 'O edital "Simpósio de Medicina Intensiva" está com vagas abertas até 15/05/2024. Inscreva-se!',
    date: '2024-03-14',
    read: true,
  },
];

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [isOpen, setIsOpen] = useState(false);

  const toggleNotifications = () => setIsOpen(!isOpen);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const addNotification = (message: string) => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      message,
      date: new Date().toISOString(),
      read: false,
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        isOpen,
        toggleNotifications,
        markAsRead,
        addNotification,
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