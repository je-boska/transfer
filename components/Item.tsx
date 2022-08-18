import Link from 'next/link';
import React from 'react';
import { ArcherElement } from 'react-archer';

const Item = ({ title, link, categoryName, idx }) => {
  return (
    <Link key={idx} href={link} passHref>
      <div className='item mb-6'>
        <ArcherElement
          id={`item${idx}`}
          relations={[
            {
              targetId: categoryName,
              targetAnchor: 'middle',
              sourceAnchor: 'middle',
            },
          ]}
        >
          <p className='font-bold pl-2 cursor-pointer hover:italic'>
            {title.toUpperCase()}
          </p>
        </ArcherElement>
      </div>
    </Link>
  );
};

export default Item;
