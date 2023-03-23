import Link from 'next/link';
import { ArcherElement } from 'react-archer';

const Item = ({ title, link, categorySlug, idx }) => {
  return (
    <Link key={idx} href={link} passHref>
      <div className='item mb-6'>
        <ArcherElement
          id={`item${idx}`}
          relations={[
            {
              targetId: categorySlug,
              targetAnchor: 'middle',
              sourceAnchor: 'middle',
            },
          ]}
        >
          <p className='font-bold pl-2 cursor-link hover:italic'>
            {title.toUpperCase()}
          </p>
        </ArcherElement>
      </div>
    </Link>
  );
};

export default Item;
