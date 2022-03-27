import React from 'react';
import cx from 'classnames';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import LocaleSwitch from './LocaleSwitch';

export default function Header() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <header
      className={cx(
        'bg-transferGray xl:bg-transparent fixed h-14 top-0 w-full z-10',
        {
          'md:w-1/2 lg:w-[60%] md:border-r border-black':
            pathname.includes('/articles'),
        }
      )}
    >
      <div className='flex justify-between m-4 text-lg sm:text-xl'>
        {pathname === '/' ? (
          <h1 className='w-1/2 font-extrabold'>
            {t('transfer').toUpperCase()}
          </h1>
        ) : (
          <div className='-translate-y-1'>
            <button onClick={() => router.back()}>←</button>
            <button
              className='mb-0.5 ml-2 text-2xl'
              onClick={() => router.push('/')}
            >
              ⌂
            </button>
          </div>
        )}
        <div>
          <LocaleSwitch />
        </div>
      </div>
    </header>
  );
}
