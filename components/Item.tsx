import Link from 'next/link';
import React from 'react';
import Xarrow from 'react-xarrows';

const Item = ({ title, link, categoryName, idx }) => {
  return (
    <Link key={idx} href={link} passHref>
      <div className='item mb-6'>
        <p id={`item${idx}`} className='font-bold pl-2 cursor-pointer'>
          {title.toUpperCase()}
        </p>
        <Xarrow
          key={idx}
          start={categoryName}
          end={`item${idx}`}
          color='rgba(0, 0, 0, 0.1)'
          startAnchor='right'
          endAnchor='middle'
          strokeWidth={1}
          curveness={0}
          showHead={false}
        />
      </div>
    </Link>
  );
};

export default Item;
