import Link from "next/link";
import cx from "classnames";
import React, { Dispatch, SetStateAction, useState } from "react";
import { CategoryType } from "../types/shared";
import { renderRichTextWithImages } from "../lib/rich-text";

interface CategoryProps {
  category: CategoryType;
  currentCategory: string | null;
  setCurrentCategory: Dispatch<SetStateAction<string>>;
}

export default function Category({
  category,
  currentCategory,
  setCurrentCategory,
}: CategoryProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    name,
    description,
    linkedFrom: { articleCollection, artistCollection },
  } = category;

  return (
    <div className="mb-4">
      <h1
        onClick={() => {
          if (!currentCategory) {
            setIsOpen(true);
          }
          if (currentCategory) {
            setIsOpen(false);
          }
          if (currentCategory === category.name) {
            setCurrentCategory(null);
          } else if (!currentCategory) {
            setCurrentCategory(category.name);
          }
        }}
        className={cx("text-5xl mb-12 font-extrabold", {
          "text-black opacity-30": isOpen,
          "text-white animate-shadow": !isOpen,
        })}
      >
        {name}
      </h1>
      {isOpen && (
        <div className="flex gap-6 cursor-default">
          {description && <div className="max-w-lg">{description}</div>}
          <div>
            {articleCollection.items.map(({ title, slug }, idx) => (
              <Link key={idx} href={`/${slug}`} passHref>
                <div className="mb-6 cursor-pointer">
                  <p>{title}</p>
                </div>
              </Link>
            ))}
            {artistCollection.items.map(({ name, slug }, idx) => (
              <Link key={idx} href={`/artists/${slug}`} passHref>
                <div className="mb-6 cursor-pointer">
                  <p>{name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
