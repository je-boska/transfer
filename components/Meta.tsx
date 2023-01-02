import Head from 'next/head';

export default function Meta({ title }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name='description'
          content='Transfer are an interdisciplinary research group that examines alternative means of contact with others. '
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
    </>
  );
}
