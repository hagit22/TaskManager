import { AppProps } from 'next/app';
import RootLayout from '../app/layout';
import '../app/styles/globals.scss';

function MyApp({ Component, pageProps } : AppProps ) {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
}

export default MyApp;
