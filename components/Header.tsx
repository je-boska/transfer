import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import LocaleSwitch from './LocaleSwitch';

export default function Header() {
  const { t } = useTranslation('common');
  const router = useRouter();

  return (
    <header className='bg-transferGray md:bg-transparent fixed h-14 grid grid-cols-2 top-0 w-full z-10'>
      <div className='px-4 py-3 lg:p-4 text-xl '>
        {router.pathname === '/' ? (
          <Link href='/' passHref>
            <h1 className='cursor-pointer'>{t('transfer').toUpperCase()}</h1>
          </Link>
        ) : (
          <div className='inline-flex pr-2 gap-2 bg-transferGray -translate-y-1'>
            <button onClick={() => router.back()}>←</button>
            <button
              className='mb-0.5 text-2xl'
              onClick={() => router.push('/')}
            >
              ⌂
            </button>
          </div>
        )}
      </div>

      <div className='p-3 lg:p-4 justify-self-end xl:fixed xl:bottom-0 xl:left-0'>
        <LocaleSwitch />
      </div>
    </header>
  );
}
