import { useTranslation } from "next-i18next";
import Link from "next/link";
import React from "react";
import LocaleSwitch from "./LocaleSwitch";

export default function Header() {
  const { t } = useTranslation("common");
  return (
    <div className="bg-transparent fixed h-14 grid grid-cols-2 top-0 w-full z-10">
      <ul className="flex justify-items-stretch gap-8 px-8 py-4">
        <li>
          <Link href="/" passHref>
            <h1 className="cursor-pointer text-xl">TRANSFER</h1>
          </Link>
        </li>
      </ul>
      <div className="px-8 py-4 justify-self-end">
        <LocaleSwitch />
      </div>
    </div>
  );
}
