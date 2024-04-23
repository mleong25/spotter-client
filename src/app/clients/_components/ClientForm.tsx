'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';

const ClientForm = (props: any) => {
  const router = useRouter();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    const [field, nested] = name.split('.');

    setClientFormData((prevState: any) => ({
      ...prevState,
      [field]: nested
        ? {
            ...prevState[field],
            [nested]: value,
          }
        : value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch('backend/api/Clients', {
      method: 'POST',
      body: JSON.stringify({ clientFormData }),
      //@ts-ignore
      'Content-Type': 'application/json',
    });

    if (!res.ok) {
      throw new Error('Failed to create Client.');
    }
    const data = await res.json();
    const newClient = data?.client;

    closeForm();
    props.onCreatedClient(newClient);

    router.refresh();
    router.push('/clients');
  };

  const closeForm = () => {
    props.onCloseForm();
  };

  const clientData = {
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
    height: {
      ft: 0,
      in: 0,
    },
    weight: 0,
  };

  const [clientFormData, setClientFormData] = useState(clientData);

  return (
    <div className='flex flex-col container rounded absolute w-3/4 md:w-1/2 top-[10%] shadow-md inset-x-0 md:inset-x-auto'>
      <div className='relative border bg-black rounded-xl p-4'>
        <XMarkIcon
          onClick={closeForm}
          className='w-6 text-blue-600 hover:cursor-pointer absolute top-0 right-0 m-6'
        ></XMarkIcon>
        <h2 className='block font-medium text-lg m-auto py-6'>Client Form</h2>
        <form className='flex flex-col' method='post' onSubmit={handleSubmit}>
          <label className='w-full flex justify-between items-center'>
            First Name
            <input
              id='firstName'
              name='firstName'
              type='text'
              onChange={handleChange}
              required
              value={clientFormData.firstName}
            />
          </label>
          <label className='w-full flex justify-between items-center'>
            Last Name
            <input
              id='lastName'
              name='lastName'
              type='text'
              onChange={handleChange}
              required
              value={clientFormData.lastName}
            />
          </label>
          <label className='w-full flex justify-between items-center'>
            Email
            <input
              id='email'
              name='email'
              type='email'
              onChange={handleChange}
              required
              value={clientFormData.email}
            />
          </label>
          <label className='w-full flex justify-between items-center'>
            DOB
            <input
              id='dob'
              name='dob'
              type='date'
              onChange={handleChange}
              required
              value={clientFormData.dob}
              className='w-[195px]'
            />
          </label>
          <label className='w-full flex justify-between items-center'>
            Height
            <div className='flex justify-end items-baseline gap-2 w-[195px] m-1'>
              <div className='relative flex justify-end w-1/2'>
                <input
                  id='height.ft'
                  name='height.ft'
                  type='number'
                  min='0'
                  onChange={handleChange}
                  required
                  value={clientFormData.height.ft}
                  className='w-full mx-auto'
                  placeholder='0'
                />
                <div className='absolute text-black right-[25px] top-[8px]'>
                  ft
                </div>
              </div>
              <div className='relative flex justify-end w-1/2'>
                <input
                  id='height.in'
                  name='height.in'
                  type='number'
                  min='0'
                  max='11'
                  onChange={handleChange}
                  required
                  value={clientFormData.height.in}
                  className='w-full mx-auto'
                  placeholder='0'
                />
                <div className='absolute text-black right-[25px] top-[8px]'>
                  in
                </div>
              </div>
            </div>
          </label>
          <label className='w-full flex justify-between items-center'>
            Weight
            <div className='relative flex justify-end'>
              <input
                id='weight'
                name='weight'
                type='number'
                min='0'
                onChange={handleChange}
                required
                value={clientFormData.weight}
                placeholder='0'
              />
              <div className='absolute text-black right-[25px] top-[8px]'>
                lbs
              </div>
            </div>
          </label>
          <input
            type='submit'
            className='flex justify-center btn max-w-52 mx-4 my-8 place-self-center'
            value='Create Client'
          />
        </form>
      </div>
    </div>
  );
};

export default ClientForm;
