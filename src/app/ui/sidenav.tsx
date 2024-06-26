import NavLinks from '@/app/ui/nav-links';
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/16/solid';

export default function SideNav() {
  return (
    <div className='flex h-full flex-col px-3 py-4 md:px-2'>
      <div className='mb-2 flex h-20 items-end justify-start rounded-md bg-[--primary-500] p-4 md:h-40'>
        <div className='w-32 text-white md:w-40'>SPOTTER</div>
      </div>
      <div className='flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2'>
        <NavLinks />
        <div className='hidden h-auto w-full grow rounded-md bg-zinc-950 md:block'></div>
        <form>
          <button className='flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-zinc-950 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3'>
            <ArrowRightStartOnRectangleIcon className='w-6'></ArrowRightStartOnRectangleIcon>
            <div className='hidden md:block'>Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
