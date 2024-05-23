'use client';

import { useEffect, useState } from 'react';
import { useClientContext } from '@/contexts/clients';
import LoadingSpinner from '../[_components]/LoadingSpinner';
import Link from 'next/link';

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [, setError] = useState();

  const { clients, setClients } = useClientContext();

  useEffect(() => {
    const load = async () => {
      try {
        await getClients();
      } catch (e: any) {
        setError(() => {
          throw new Error(e);
        });
      }
    };

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

    setClients(data?.clients);
  };

  return (
    <>
      {loading && <LoadingSpinner desc={'Clients'} />}

      {!loading && (
        <div className='flex flex-wrap justify-start gap-6'>
          <Link
            className='border rounded-md p-6 w-fit h-fit cursor-pointer hover:border-[--primary-500]'
            href='/clients'
          >
            Total Clients
            <div className='text-4xl'>{clients ? clients.length : 0}</div>
          </Link>
          <Link
            className='border grow rounded-md p-6 w-fit h-fit cursor-pointer hover:border-[--primary-500]'
            href='/dashboard'
          >
            Today
            <div className='text-3xl'>Training {clients && clients[0].firstName} @ 12:00PM</div>
            <div className='text-3xl'>Training {clients && clients[1].firstName} @ 1:30PM</div>
            <div className='text-3xl'>Training {clients && clients[3].firstName} @ 3:00PM</div>
          </Link>
          <Link
            className='grow border rounded-md p-6 cursor-pointer hover:border-[--primary-500]'
            href='/dashboard'
          >
            Schedule
            <div className='text-2xl'>Sunday</div>
            <div className='text-2xl'>Monday</div>
            <div className='text-2xl'>Tuesday</div>
            <div className='text-2xl'>Wednesday</div>
            <div className='text-2xl'>Thursday</div>
            <div className='text-2xl'>Friday</div>
            <div className='text-2xl'>Saturday</div>
          </Link>
        </div>
      )}
    </>
  );
}
