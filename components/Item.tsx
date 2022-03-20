import Link from 'next/link';
import React from 'react';
import Xarrow from 'react-xarrows';

const Item = ({ title, link, categoryName, idx }) => {
  return (
    <Link key={idx} href={link} passHref>
      <div id={`item${idx}`} className='item mb-6 cursor-pointer'>
        <p className='font-bold'>{title.toUpperCase()}</p>
        <Xarrow
          key={idx}
          start={categoryName}
          end={`item${idx}`}
          color='rgba(0, 0, 0, 0.1)'
          startAnchor='left'
          endAnchor='top'
          strokeWidth={1}
          curveness={0}
          showHead={false}
        />
      </div>
    </Link>
  );
};

export default Item;
