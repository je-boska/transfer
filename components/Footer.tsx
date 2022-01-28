import { useTranslation } from "next-i18next";
import Link from "next/link";
import React from "react";
import LocaleSwitch from "./LocaleSwitch";

export default function Footer() {
  const { t } = useTranslation("common");
  return (
    <div className="bg-transferGray fixed grid grid-cols-2 bottom-0 w-full">
      <ul className="flex justify-items-stretch gap-8 px-8 py-4">
        <li>
          <Link href="/" passHref>
            <h1 className="cursor-pointer font-bold">Transfer</h1>
          </Link>
        </li>
        <li>
          <h2>{t("about")}</h2>
        </li>
        <li>
          <h2>{t("news")}</h2>
        </li>
      </ul>
      <div className="px-8 py-4 justify-self-end">
        <LocaleSwitch />
      </div>
    </div>
  );
}
