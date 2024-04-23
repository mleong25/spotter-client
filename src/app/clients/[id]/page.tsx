'use client';

import ClientDisplay from '../_components/ClientDisplay';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

const getClientById = async (id: any) => {
  const res = await fetch(
    `/backend/api/Clients/${id}`,
    {
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    throw new Error('Failed to get client.');
  }

  return res.json();
};

const deleteClient = async (id: any) => {
  const res = await fetch(
    `/backend/api/Clients/${id}`,
    {
      method: 'DELETE',
    }
  );
  return res;
};

const ClientPage = async ({ params }: any) => {
  const router = useRouter();

  const { client } = await getClientById(params.id);

  const handleDelete = async () => {
    const res = await deleteClient(params.id);

    if (res.ok) {
      router.replace('/clients');
    }
  }

  return (
    <>
      <div className='flex flex-row justify-between'>
        <ClientDisplay client={client} />
        <TrashIcon
          className='size-6 text-red-500 cursor-pointer'
          onClick={handleDelete}
        />
      </div>
    </>
  );
};

export default ClientPage;
