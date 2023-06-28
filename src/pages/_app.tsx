import '@/styles/base.css';
import '@/styles/antd.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ExampleProvider } from '@/context/ExampleContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ExampleProvider initialData={'User'}>
      <Head>
        <title>Dori Bottle ADMIN</title>
      </Head>
      <Component {...pageProps} />
    </ExampleProvider>
  );
}
