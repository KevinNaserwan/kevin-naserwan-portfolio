import '../style.css';
import Script from 'next/script';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Script src="/i18n.js?v=3.2" strategy="beforeInteractive" />
      <Script src="/main.js?v=3.2" strategy="afterInteractive" />
    </>
  );
}
