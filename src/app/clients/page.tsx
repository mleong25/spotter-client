'use client';

import ClientForm from './_components/ClientForm';
import { useState, useEffect } from 'react';
import { UserPlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import ClientCard from './_components/ClientCard';
import LoadingSpinner from '../[_components]/LoadingSpinner';
import { notFound } from 'next/navigation';

export default function Page() {
  const [showClientForm, setShowClientForm] = useState(false);
  const [clients, setClients] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [, setError] = useState();

  useEffect(() => {
    const load = async () => {
      try {
        await getClients();
      } catch (e: any) {
        setError(() => {
          throw new Error(e);
        })
      }
    }

    load();
  }, []);

  const getClients = async () => {
    const res = await fetch(`/backend/api/Clients`, {});

    setTimeout(() => {
      setLoading(false);
    }, 200);

    if (!res.ok) {
      throw new Error('Error fetching clients.');
    }

    const data = await res.json();

    if (!data.clients) notFound();

    setClients(data?.clients);
  };

  const triggerClientForm = () => {
    setShowClientForm(!showClientForm);
  };

  const createdClient = (newClient: any) => {
    setClients([...clients, newClient]);
  };

  return (
    <>
      <div className='flex flex-row justify-between'>
        <div>Client Page</div>
        {!showClientForm && (
          <UserPlusIcon
            onClick={triggerClientForm}
            className={clsx('w-6 hover:text-blue-600 hover:cursor-pointer', {
              'text-blue-600': showClientForm,
            })}
          ></UserPlusIcon>
        )}
      </div>

      {loading && <LoadingSpinner desc={'Clients'} />}

      {!clients.length && !loading && (
        <div className='flex justify-center place-items-center container m-auto size-full'>
          Create some clients!
        </div>
      )}

      {clients.length && !loading && (
        <div className='inline-grid auto-rows-max grid-cols-1 my-6 container m-auto size-full gap-x-4 gap-y-5 md:grid-cols-3 lg:grid-cols-4'>
          {clients.map((c: any) => {
            return <ClientCard key={c._id} client={c} />;
          })}
        </div>
      )}

      {showClientForm && (
        <ClientForm
          onCloseForm={triggerClientForm}
          onCreatedClient={createdClient}
        ></ClientForm>
      )}
    </>
  );
}
