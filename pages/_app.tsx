import "../styles/globals.css";
import { appWithTranslation } from "next-i18next";
import Layout from "../components/Layout";
import Header from "../components/Header";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Header />
      <Component {...pageProps} />
    </Layout>
  );
}

export default appWithTranslation(MyApp);
