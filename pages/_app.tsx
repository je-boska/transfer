import '../styles/globals.css'
import { appWithTranslation, useTranslation } from 'next-i18next'
import Layout from '../components/Layout'
import Footer from '../components/Footer'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

function MyApp({ Component, pageProps }) {
  const { t } = useTranslation('common')
  return (
    <Layout>
      <Component {...pageProps} />
      <Footer about={t('about')} news={t('news')} />
    </Layout>
  )
}

export default appWithTranslation(MyApp)

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
    revalidate: 60 * 60,
  }
}
