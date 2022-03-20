import React, { useState } from 'react';
import Item from './Item';

const ItemBox = ({ category }) => {
  console.log(category);
  return (
    <>
      {category && (
        <div className='cursor-default grid w-1/2 m-4 mt-20 h-[calc(100vh-10rem)]'>
          {category.description && (
            <div className='max-w-lg mb-20 whitespace-normal'>
              {category.description}
            </div>
          )}
          <div className='flex flex-wrap justify-evenly max-w-lg gap-8'>
            {category.linkedFrom.articleCollection.items.map(
              ({ title, slug }, idx) => (
                <Item
                  key={idx}
                  idx={idx}
                  title={title}
                  link={`/articles/${slug}`}
                  categoryName={`category${category.name}`}
                />
              )
            )}
            {category.linkedFrom.artistCollection.items.map(
              ({ name: title, slug }, idx) => (
                <Item
                  key={idx + category.linkedFrom.articleCollection.items.length}
                  idx={idx + category.linkedFrom.articleCollection.items.length}
                  title={title}
                  link={`/artists/${slug}`}
                  categoryName={`category${category.name}`}
                />
              )
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ItemBox;
