'use client';

import ClientForm from './_components/ClientForm';
import { useState, useEffect } from 'react';
import { UserPlusIcon } from '@heroicons/react/24/outline';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';

export default function Page() {
  const [showClientForm, setShowClientForm] = useState(false);
  const [clients, setClients] = useState([Object]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getClients();
  }, []);

  const getClients = async () => {
    try {
      const res = await fetch('backend/api/Clients', {});

      if (!res.ok) {
        throw new Error('Failed to fetch clients.');
      }

      const data = await res.json();

      setClients(data?.clients);
    } catch (e: any) {
      console.log('Error loading clients ', e);
    }

    setTimeout(() => {
      setLoading(false);
    }, 200);
  };

  const triggerClientForm = () => {
    setShowClientForm(!showClientForm);
  };

  const createdClient = (newClient: any) => {
    setClients([...clients, newClient]);
  }

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

      {loading && (
        <div className='flex justify-center place-items-center container m-auto size-full'>
          <button
            type='button'
            className='inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-blue-600 hover:bg-blue-500 transition ease-in-out duration-150'
            disabled
          >
            <svg
              className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
            >
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'
              ></circle>
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
              ></path>
            </svg>
            Loading Clients...
          </button>
        </div>
      )}

      {!clients.length && !loading && (
        <div className='flex justify-center place-items-center container m-auto size-full'>
          Create some clients!
        </div>
      )}

      {clients.length && !loading && (
        <div className='flex flex-col mx-2 my-6 container m-auto size-full gap-6'>
          {clients.map((c: any) => {
            return (
              <div
                key={c._id}
                className='flex border rounded-full p-6 w-1/2 gap-4'
              >
                <UserCircleIcon className='w-6'></UserCircleIcon>
                <div>
                  {c.firstName} {c.lastName}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showClientForm && (
        <ClientForm onCloseForm={triggerClientForm} onCreatedClient={createdClient}></ClientForm>
      )}
    </>
  );
}
