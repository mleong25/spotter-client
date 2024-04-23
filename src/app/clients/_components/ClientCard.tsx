'use client';

import React, { useState, useEffect } from 'react';
import { UserCircleIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

const ClientCard = (props: any) => {
  // const router = useRouter();

  // const handleChange = (e: any) => {
  //   const { name, value } = e.target;
  //   const [field, nested] = name.split('.');

  //   setClientFormData((prevState: any) => ({
  //     ...prevState,
  //     [field]: nested
  //       ? {
  //           ...prevState[field],
  //           [nested]: value,
  //         }
  //       : value,
  //   }));
  // };

  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();

  //   const res = await fetch('backend/api/Clients', {
  //     method: 'POST',
  //     body: JSON.stringify({ clientFormData }),
  //     //@ts-ignore
  //     'Content-Type': 'application/json',
  //   });

  //   if (!res.ok) {
  //     throw new Error('Failed to create Client.');
  //   }
  //   const data = await res.json();
  //   const newClient = data?.client;

  //   closeForm();
  //   props.onCreatedClient(newClient);

  //   router.refresh();
  //   router.push('/clients');
  // };

  // const closeForm = () => {
  //   props.onCloseForm();
  // };

  // const clientData = {
  //   firstName: '',
  //   lastName: '',
  //   dob: '',
  //   email: '',
  //   height: {
  //     ft: 0,
  //     in: 0,
  //   },
  //   weight: 0,
  // };

  // const [clientFormData, setClientFormData] = useState(clientData);

  return (
    <Link href={`/clients/${props._id}`} className='contents'>
      <div className='flex border rounded-full p-6 place-items-center gap-4 h-5 justify-stretch max-w-[300px]'>
        <UserCircleIcon className='w-6'></UserCircleIcon>
        <div className='truncate'>
          {props.firstName} {props.lastName}
        </div>
      </div>
    </Link>
  );
};

export default ClientCard;
