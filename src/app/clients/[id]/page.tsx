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
    const res = await fetch(`/backend/api/Clients/${params.id}`, {
      cache: 'no-store',
    });

    if (!res.ok) throw new Error('Failed to fetch clients.');

    const data = await res.json();

    if (!data.client) notFound();

    setClient(data?.client);
  };

  return (
    <>
      <ClientDisplay client={client} id={params.id} />
    </>
  );
};

export default ClientPage;
