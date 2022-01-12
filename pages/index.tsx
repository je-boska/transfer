import { InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { getHomePage } from '../lib/contentful/pages/home'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import LocaleSwitch from '../components/LocaleSwitch'

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      allCategories: await getHomePage(),
      ...(await serverSideTranslations(locale, ['common'])),
    },
    revalidate: 60 * 60,
  }
}

export default function Home({
  allCategories,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation('common')
  const { locale } = useRouter()

  return (
    <div>
      <Head>
        <title>Transfer</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <LocaleSwitch />
      <div className='m-8'>
        <h1 className='font-bold text-2xl mb-6'>TRANSFER</h1>
        {allCategories.map(
          ({ engName, czName, linkedFrom: { articleCollection } }, idx) => (
            <div key={idx}>
              <p>{locale === 'en' ? engName : czName}</p>
              {articleCollection.items.map(({ engTitle, czTitle }, idx) => (
                <div key={idx}>
                  <p>{locale == 'en' ? engTitle : czTitle}</p>
                </div>
              ))}
            </div>
          )
        )}
        <p className='font-bold mt-8'>{t('test')}</p>
      </div>
    </div>
  )
}
