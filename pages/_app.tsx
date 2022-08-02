// _app.tsx file
import { GetServerSidePropsContext } from 'next';
import { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
// install cookies-next package to manage cookies
import { getCookie, setCookies } from 'cookies-next';
import { MantineProvider, ColorScheme, ColorSchemeProvider, Container, ScrollArea } from '@mantine/core';
import { useFullscreen, useOs } from '@mantine/hooks';
import { useRouter } from 'next/router';
// Google Analytics
import * as gtag from '../components/config/gtag';
import Script from 'next/script';
// page load
import Loader from '../components/loader';
import Head from 'next/head';


export default function App(props: AppProps & { colorScheme: ColorScheme }) {

  const { fullscreen } = useFullscreen()
  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState(0)
  const os = useOs()

  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    // when color scheme is updated save it to cookie
    setCookies('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };

  //GOOGLE ANALYTICS
  const router = useRouter()
  useEffect(() => {

    if (os == 'android') {
      null
    } else if (os == 'ios') {
      null
    } else {
      document.addEventListener('contextmenu', (e) => {
        e.preventDefault()
      })
    }

    setHeight(screen.height)
    setWidth(screen.width)
    document.body.style.overflow = 'hidden'

    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    router.events.on('hashChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
      router.events.off('hashChangeComplete', handleRouteChange)
    }
  }, [os, router.events, setHeight])

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="robots" content="max-image-preview:large" />

        {/* <!-- Root --> */}
        <title>Biofip - Official Site</title>
        <link rel='manifest' href='/manifest.json' />
        <link rel='shortcut icon' href='/favicon.ico' />
      </Head>

      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{ colorScheme, primaryColor: 'gray' }} withGlobalStyles withNormalizeCSS>
          <Loader>
            <ScrollArea style={{ height: height, maxWidth: width, userSelect: 'none', msUserSelect: 'none', MozUserSelect: 'none', WebkitUserSelect: 'none' }} scrollbarSize={2}>
              <Container pt={32} pb={fullscreen ? 0 : 100}>
                <Component {...pageProps} />
              </Container>
            </ScrollArea>
          </Loader>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  // get color scheme from cookie
  colorScheme: getCookie('mantine-color-scheme', ctx) || 'dark',
});