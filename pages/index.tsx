import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { getHomePage } from '../lib/contentful/pages/home';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Category from '../components/Category';
import { useState } from 'react';
import ItemBox from '../components/ItemBox';
import { ArcherContainer, ArcherElement } from 'react-archer';

export default function Home({
  allCategories,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);

  return (
    <div>
      <Head>
        <title>TRANSFER</title>
        <meta name='description' content='Transfer' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
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
          <div className='pt-14 w-1/2 lg:w-full grid grid-cols-12 grid-rows-[1fr,1fr,1fr,1fr,1fr,1fr,1fr] lg:h-[calc(100vh-10rem)]'>
            {allCategories.map((category, idx) => (
              <div key={idx} className='category'>
                {(currentCategory === null ||
                  currentCategory === category.name) && (
                  <Category
                    currentCategory={currentCategory}
                    setCurrentCategory={setCurrentCategory}
                    category={category}
                  />
                )}
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
    </div>
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
