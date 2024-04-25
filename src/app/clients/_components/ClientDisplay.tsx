'use client';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

const ClientDisplay = (props: any) => {
  const router = useRouter();
  const [error, setError] = useState(false);

  if (error) throw new Error('Error deleting client.');

  const deleteClient = async () => {
    const res = await fetch(`/backend/api/Clients/${props.client._id}`, {
      method: 'DELETE',
    });

    if (!res.ok) setError(true);

    if (res.ok) router.replace('/clients');
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <>
      {props.client && (
        <div className='flex flex-col'>
          <div className='flex flex-row justify-between'>
            <div className='flex flex-col gap-3'>
              <div>
                {props.client.firstName} {props.client.lastName}
              </div>
              <div>
                {' '}
                Date of Birth:{' '}
                {props.client.dob ? formatDate(props.client.dob) : ''}
              </div>
              <div>
                Height: {props.client.height?.ft}ft {props.client.height?.in}in
              </div>
              <div>Weight: {props.client.weight}lbs</div>
            </div>
            <div className='flex gap-2'>
              <TrashIcon
                className='size-6 text-red-500 cursor-pointer'
                onClick={deleteClient}
              />
              <Link href={`/clients/${props.client?._id}/campaigns/new`} className='contents'>
                <PlusIcon className='size-6 cursor-pointer' />
              </Link>
            </div>
          </div>
          <div className='flex justify-center container mt-5'>Campaign</div>
        </div>
      )}
    </>
  );
};

export default ClientDisplay;
