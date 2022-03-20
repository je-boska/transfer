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
  const { name } = category;

  return (
    <div className='relative mb-4'>
      <div id={`category${name}`} className='absolute left-20 top-8'></div>
      <h1
        id={`category${name}`}
        onClick={() => {
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
    </div>
  );
}
