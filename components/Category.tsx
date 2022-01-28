import Link from "next/link";
import cx from "classnames";
import React, { useState } from "react";
import { CategoryType } from "../types/shared";

interface CategoryProps {
  category: CategoryType;
  currentCategory: string | null;
}

export default function Category({ category, currentCategory }: CategoryProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    name,
    linkedFrom: { articleCollection },
  } = category;

  return (
    <div>
      <h1
        onClick={() => {
          if (!currentCategory) {
            setIsOpen(true);
          }
          if (currentCategory) {
            setIsOpen(false);
          }
        }}
        className={cx(
          "animate-shadow drop-shadow-lg text-5xl mb-12 font-extrabold",
          {
            "text-black": isOpen,
            "text-white": !isOpen,
          }
        )}
      >
        {name}
      </h1>
      {isOpen &&
        articleCollection.items.map(({ title, slug }, idx) => (
          <Link key={idx} href={`/${slug}`} passHref>
            <div className="ml-12 mb-6 cursor-pointer">
              <p>{title}</p>
            </div>
          </Link>
        ))}
    </div>
  );
}
