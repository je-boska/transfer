import '../styles/globals.css'
import { appWithTranslation } from 'next-i18next'
import Layout from '../components/Layout'
import Footer from '../components/Footer'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
      <Footer />
    </Layout>
  )
}

export default appWithTranslation(MyApp)
