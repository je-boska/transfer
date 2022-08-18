import React, { Dispatch, SetStateAction } from 'react';
import { CategoryType } from '../types/shared';
import { ArcherElement } from 'react-archer';

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
              setCurrentCategory(null);
            } else if (!currentCategory) {
              setCurrentCategory(category.name);
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
