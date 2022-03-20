import Link from 'next/link';
import cx from 'classnames';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { CategoryType } from '../types/shared';
import Xarrow from 'react-xarrows';
import Item from './Item';

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

  const totalLength =
    articleCollection.items.length + artistCollection.items.length;

  return (
    <div className='relative mb-4'>
      <div id={`category${name}`} className='absolute left-20 top-8'></div>
      <h1
        id={`category${name}`}
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
        className={cx('text-xl mb-12 font-extrabold', {})}
      >
        {name.toUpperCase()}
      </h1>
      {isOpen && (
        <div className='cursor-default'>
          <div className='flex flex-wrap gap-8'>
            {articleCollection.items.map(({ title, slug }, idx) => (
              <Item
                key={idx}
                idx={idx}
                title={title}
                link={`/articles/${slug}`}
                categoryName={`category${name}`}
              />
            ))}
            {artistCollection.items.map(({ name: title, slug }, idx) => (
              <Item
                key={idx + articleCollection.items.length}
                idx={idx + articleCollection.items.length}
                title={title}
                link={`/artists/${slug}`}
                categoryName={`category${name}`}
              />
            ))}
          </div>
          {description && <div className='max-w-lg'>{description}</div>}
        </div>
      )}
    </div>
  );
}
