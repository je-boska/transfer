import Head from 'next/head';
import React from 'react';

export default function Meta({ title }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content='Transfer' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
    </>
  );
}
