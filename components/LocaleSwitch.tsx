import { useRouter } from 'next/router';
import Link from 'next/link';

const LocaleSwitch = () => {
  const { locale, asPath } = useRouter();

  return (
    <button className='pr-2 text-lg sm:text-xl cursor-link'>
      <Link href={asPath} locale={locale === 'cz' ? 'en' : 'cz'}>
        {locale === 'cz' ? <p>EN</p> : <p>CZ</p>}
      </Link>
    </button>
  );
};

export default LocaleSwitch;
