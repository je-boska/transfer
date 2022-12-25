import { InferGetStaticPropsType } from 'next';
import { getHomePage } from '../lib/contentful/pages/home';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';
import { ArcherContainer, ArcherElement } from 'react-archer';

import Category from '../components/Category';
import ItemBox from '../components/ItemBox';
import Meta from '../components/Meta';
import { useRouter } from 'next/router';

export default function Home({
  allCategories,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const { query } = useRouter();

  useEffect(() => {
    if (query.category && typeof query.category !== 'object') {
      setCurrentCategory(query.category);
    } else {
      setCurrentCategory(null);
    }
  }, [query]);

  return (
    <>
      <Meta title='TRANSFER' />
      <ArcherContainer
        strokeColor='lightgray'
        strokeWidth={1}
        lineStyle='straight'
        endMarker={false}
        svgContainerStyle={{ zIndex: -1 }}
      >
        <div className='absolute top-14 left-10 lg:left-20'>
          <ArcherElement id='transfer'>
            <div></div>
          </ArcherElement>
        </div>
        <div className='lg:grid grid-cols-[2fr,3fr] gap-20'>
          <div className='p-4 pt-28 w-1/2 lg:w-full grid grid-cols-12 grid-rows-[1fr,1fr,1fr,1fr,1fr,1fr,1fr] lg:h-[calc(100vh-10rem)]'>
            {allCategories.map((category, idx) => (
              <div key={idx} className='category'>
                {!currentCategory || currentCategory === category.name ? (
                  <Category
                    currentCategory={currentCategory}
                    category={category}
                  />
                ) : null}
              </div>
            ))}
          </div>
          <ItemBox
            category={
              allCategories.filter(
                (category) => category.name === currentCategory
              )[0]
            }
          />
        </div>
      </ArcherContainer>
    </>
  );
}

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      allCategories: await getHomePage(locale),
      ...(await serverSideTranslations(locale, ['common'])),
    },
    revalidate: 60 * 60,
  };
}
