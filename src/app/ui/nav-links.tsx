'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon } from '@heroicons/react/20/solid';
import { UsersIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Clients', href: '/clients', icon: UsersIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  
  return (
    <>
      {links.map((link) => {

        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                'text-blue-600 bg-sky-100': pathname === link.href,
                'bg-zinc-950': pathname !== link.href
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
