'use client';

import ClientDisplay from '../_components/ClientDisplay';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';

const ClientPage = ({ params }: any) => {
  const [client, setClient] = useState({});

  useEffect(() => {
    getClients();
  }, []);

  const getClients = async () => {
    try {
      const res = await fetch(`/backend/api/Clients/${params.id}`, {
        cache: 'no-store',
      });

      const data = await res.json();

      if (!data.client) notFound();

      setClient(data?.client);

    } catch (e: any) {
      throw new Error('Failed to fetch clients.');
    }
  };

  return (
    <>
      <ClientDisplay client={client} id={params.id} />
    </>
  );
};

export default ClientPage;
