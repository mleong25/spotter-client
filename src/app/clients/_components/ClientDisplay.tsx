'use client';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import LoadingSpinner from '@/app/[_components]/LoadingSpinner';
import CreateCampaign from './CreateCampaign';

const ClientDisplay = (props: any) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showCampaignForm, setCampaignForm] = useState(false);

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

  const closeCampaignForm = () => {
    setCampaignForm(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  return (
    <>
      {loading && <LoadingSpinner desc={'Client'} />}

      {!loading && props.client && !showCampaignForm && (
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
              <PlusIcon
                className='size-6 cursor-pointer'
                onClick={() => {
                  setCampaignForm(true);
                }}
              />
            </div>
          </div>
          <div className='flex justify-center container mt-5'>Campaign</div>
        </div>
      )}

      {!loading && props.client && showCampaignForm && (
        <CreateCampaign client={props.client} onCloseForm={closeCampaignForm} />
      )}
    </>
  );
};

export default ClientDisplay;
