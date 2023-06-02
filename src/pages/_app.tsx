import '@/styles/base.css';
import type { AppProps } from 'next/app';
import { ExampleProvider } from '@/context/ExampleContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ExampleProvider initialData={'User'}>
      <Component {...pageProps} />
    </ExampleProvider>
  );
}
