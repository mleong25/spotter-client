'use client';

import { UserCircleIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

const ClientCard = (props: any) => {
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
