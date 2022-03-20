import cx from 'classnames';
import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { getHomePage } from '../lib/contentful/pages/home';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Category from '../components/Category';
import { useState } from 'react';

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
      <div className='m-4 mt-20'>
        {allCategories.map((category, idx) => (
          <div key={idx}>
            <div
              onMouseEnter={() => setHoveredCategory(category.name)}
              onMouseLeave={() => setHoveredCategory(null)}
              className={cx('inline-block', {
                'opacity-100 cursor-pointer':
                  (currentCategory === null && hoveredCategory === null) ||
                  (currentCategory === null &&
                    category.name === hoveredCategory) ||
                  category.name === currentCategory,
                'opacity-0 cursor-default':
                  (currentCategory !== null &&
                    category.name !== currentCategory) ||
                  (currentCategory !== null &&
                    category.name !== hoveredCategory &&
                    category.name !== currentCategory),
              })}
            >
              <Category
                currentCategory={currentCategory}
                setCurrentCategory={setCurrentCategory}
                category={category}
              />
            </div>
          </div>
        ))}
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
