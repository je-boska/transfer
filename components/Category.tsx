import React, { Dispatch, SetStateAction } from 'react';
import { CategoryType } from '../types/shared';
import { ArcherElement } from 'react-archer';
import { useRouter } from 'next/router';

interface CategoryProps {
  category: CategoryType;
  currentCategory: string | null;
}

export default function Category({ category, currentCategory }: CategoryProps) {
  const { push, query } = useRouter();

  function setCategoryQuery(category: string) {
    push({ query: { ...query, category } }, undefined, {
      shallow: true,
    });
  }

  const { name } = category;

  return (
    <div className='relative mb-4'>
      <ArcherElement
        id={`category${name}`}
        relations={[
          {
            targetId: 'transfer',
            targetAnchor: 'bottom',
            sourceAnchor: 'middle',
          },
        ]}
      >
        <h1
          id={`category${name}`}
          onClick={() => {
            if (currentCategory === category.name) {
              push('/', undefined, { shallow: true });
            } else if (!currentCategory) {
              setCategoryQuery(category.name);
            }
          }}
          className='text-base sm:text-xl mb-12 lg:mb-0 pr-2 w-24 font-extrabold cursor-pointer hover:italic'
        >
          {name.toUpperCase()}
        </h1>
      </ArcherElement>
    </div>
  );
}
