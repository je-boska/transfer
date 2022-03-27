import cx from 'classnames';
import React, { Dispatch, SetStateAction } from 'react';
import { CategoryType } from '../types/shared';
import Xarrow from 'react-xarrows';

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
      <div id={`category${name}`} className='absolute left-12 top-4'></div>
      <h1
        onClick={() => {
          if (currentCategory === category.name) {
            setCurrentCategory(null);
          } else if (!currentCategory) {
            setCurrentCategory(category.name);
          }
        }}
        className='text-base sm:text-xl mb-12 lg:mb-0 pr-2 font-extrabold cursor-pointer'
      >
        {name.toUpperCase()}
      </h1>
      <Xarrow
        key={`category${name}`}
        start={'transfer'}
        end={`category${name}`}
        color='rgba(0, 0, 0, 0.1)'
        startAnchor='bottom'
        endAnchor='left'
        strokeWidth={1}
        curveness={0}
        showHead={false}
      />
    </div>
  );
}
