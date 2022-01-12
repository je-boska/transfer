import { useRouter } from "next/router";
import Link from "next/link";

const LocaleSwitch = () => {
  const { locale, pathname } = useRouter();

  return (
    <div>
      <Link href={pathname} locale={locale === "cz" ? "en" : "cz"}>
        {locale === "cz" ? <p>EN</p> : <p>CZ</p>}
      </Link>
    </div>
  );
};

export default LocaleSwitch;
