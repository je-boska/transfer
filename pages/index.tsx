import cx from 'classnames';
import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { getHomePage } from '../lib/contentful/pages/home';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Category from '../components/Category';
import { useState } from 'react';
import ItemBox from '../components/ItemBox';

export default function Home({
  allCategories,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);

  return (
    <div>
      <Head>
        <title>TRANSFER</title>
        <meta name='description' content='Transfer' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='lg:grid grid-cols-2 gap-20'>
        <div className='m-4 mt-20 grid lg:grid-cols-12 lg:grid-rows-[1fr,1fr,1fr,1fr,1fr,1fr,1fr] lg:h-[calc(100vh-10rem)]'>
          {allCategories.map((category, idx) => (
            <div key={idx} className='category cursor-pointer'>
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
