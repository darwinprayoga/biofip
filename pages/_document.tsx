import { createGetInitialProps } from '@mantine/next';
import Document, { Head, Html, Main, NextScript } from 'next/document';

const getInitialProps = createGetInitialProps();
const now = new Date().toISOString()

export default class _Document extends Document {
    static getInitialProps = getInitialProps;

    render() {
        return (
            <Html lang='en'>
                <Head>

                    {/* <!-- SEO --> */}
                    <meta name="author" content="Muhammad Darwin Prayoga" />
                    <meta name='description'
                        content='It was about self-branding based on biography NFT by web 3.0, and multiple APIs were goin to build the traffic of your profile looking for identity card to Metaverse on forward.' />
                    <meta name="keywords"
                        content="Owls Bio, nft, NFT, Biography, Self branding, Web 3.0, Identity card, Metaverse, Trading card, Biofip, biofip, Biography Fit Page, Design trend, UI, UX, Wallet QR, Ethereum, Multiple APIs, Linktree, Pillar.io, LinkFire, lnk.to, Smart links"
                        itemProp="keywords" />

                    {/* <!-- Google+ / Schema.org --> */}
                    <meta itemProp="name" content="Biography Fit Page" />
                    <meta itemProp="headline" content="Biography Fit Page" />
                    <meta itemProp="description"
                        content="It was about self-branding based on biography NFT by web 3.0, and multiple APIs were goin to build the traffic of your profile looking for identity card to Metaverse on forward." />
                    <meta itemProp="image" content="/icon-384x384.png" />
                    <meta itemProp="datePublished" content={now} />
                    <meta itemProp="dateModified" content={now} />
                    <meta itemProp="author" content="Muhammad Darwin Prayoga" />

                    {/* <!-- Basic --> */}
                    <meta name='application-name' content='Biofip' />
                    <meta name='apple-mobile-web-app-capable' content='yes' />
                    <meta name='apple-mobile-web-app-status-bar-style' content='default' />
                    <meta name='apple-mobile-web-app-title' content='Biofip' />
                    <meta name='format-detection' content='telephone=no' />
                    <meta name='mobile-web-app-capable' content='yes' />
                    <meta name='msapplication-tap-highlight' content='no' />
                    <meta name='msapplication-TileColor' content='#1a1b1e' />
                    <meta name='theme-color' content='#1a1b1e' />

                    {/* <!-- ICON --> */}
                    <meta name="msapplication-TileImage" content="/icon-270x270.png" />
                    <link rel='apple-touch-icon' href='/icon-180x180.png' />
                    <link href='/maskable-32.png' rel='icon' sizes='32x32' type='image/png' />
                    <link href='/maskable-16.png' rel='icon' sizes='16x16' type='image/png' />

                    {/* <!-- Preview URL --> */}
                    <meta name='twitter:card' content='summary' />
                    <meta name='twitter:url' content='https://biofip.com' />
                    <meta name='twitter:title' content='Biofip - Official Site' />
                    <meta name='twitter:description'
                        content='It was about self-branding based on biography NFT by web 3.0, and multiple APIs were goin to build the traffic of your profile looking for identity card to Metaverse on forward.' />
                    <meta name='twitter:image' content='/icon-384x384.png' />
                    <meta name='twitter:creator' content='@mdarwinp' />
                    <meta property='og:type' content='profile' />
                    <meta property='og:title' content='Biofip - Official Site' />
                    <meta property='og:description'
                        content='It was about self-branding based on biography NFT by web 3.0, and multiple APIs were goin to build the traffic of your profile looking for identity card to Metaverse on forward.' />
                    <meta property='og:site_name' content='Biofip' />
                    <meta property='og:url' content='https://biofip.com' />
                    <meta property='og:image' content='/icon-384x384.png' />
                    <meta property='og:image:url' content='/icon-384x384.png' />
                    <meta property="og:image:secure_url" content='/icon-384x384.png' />

                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}