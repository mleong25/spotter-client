'use client';

import {
  createContext,
  Dispatch,
  useContext,
  useState,
  SetStateAction,
} from 'react';

interface ClientsProps {
  clients: any[] | undefined;
  setClients: Dispatch<SetStateAction<any[] | undefined>>;
  getClientById: any;
}

const ClientsContext = createContext<ClientsProps>({
  clients: undefined,
  setClients: (): any[] => [],
  getClientById: (): any => {},
});

export const ClientsProvider = ({ children }: any) => {
  const [clients, setClients] = useState<any[]>();

  const getClientById = (id: string) => {
    console.log(clients, id);
    return clients?.filter((c) => c._id === id)[0];
  };

  return (
    <ClientsContext.Provider value={{ clients, setClients, getClientById }}>
      {children}
    </ClientsContext.Provider>
  );
};

export const useClientContext = () => useContext(ClientsContext);
