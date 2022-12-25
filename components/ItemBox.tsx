import React from 'react';
import Item from './Item';

const ItemBox = ({ category }) => {
  return (
    <>
      {category && (
        <div className='cursor-default grid m-4 mt-20 lg:h-[calc(100vh-10rem)]'>
          {category.description && (
            <div className='max-w-lg mx-auto mb-20 self-center whitespace-normal order-2 lg:order-1'>
              {category.description}
            </div>
          )}
          <div className='flex flex-wrap justify-evenly gap-2 mb-10 lg:mb-0 order-1 lg:order-2'>
            {category.linkedFrom.articleCollection.items.map(
              ({ title, slug }, idx) => (
                <Item
                  key={idx}
                  idx={idx}
                  title={title}
                  link={`/articles/${slug}`}
                  categorySlug={`category${category.slug}`}
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
                  categorySlug={`category${category.slug}`}
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
