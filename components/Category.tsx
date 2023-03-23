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

  const { name, slug } = category;

  return (
    <div className='relative mb-4'>
      <ArcherElement
        id={`category${slug}`}
        relations={[
          {
            targetId: 'transfer',
            targetAnchor: 'bottom',
            sourceAnchor: 'middle',
          },
        ]}
      >
        <h1
          id={`category${slug}`}
          onClick={() => {
            if (currentCategory === category.slug) {
              push('/', undefined, { shallow: true });
            } else if (!currentCategory) {
              setCategoryQuery(category.slug);
            }
          }}
          className='text-base sm:text-xl mb-12 lg:mb-0 pr-2 w-24 font-extrabold hover:italic cursor-link'
        >
          {name.toUpperCase()}
        </h1>
      </ArcherElement>
    </div>
  );
}
