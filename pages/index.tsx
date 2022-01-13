import { InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { getHomePage } from '../lib/contentful/pages/home'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import Category from '../components/Category'

export default function Home({
  allCategories,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation('common')
  const { locale } = useRouter()

  return (
    <div>
      <Head>
        <title>Transfer</title>
        <meta name='description' content='Transfer' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='m-8'>
        {allCategories.map((category, idx) => (
          <Category category={category} key={idx} />
        ))}
      </div>
    </div>
  )
}

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      allCategories: await getHomePage(locale),
      ...(await serverSideTranslations(locale, ['common'])),
    },
    revalidate: 60 * 60,
  }
}
