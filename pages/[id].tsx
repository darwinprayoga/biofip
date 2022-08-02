import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import Head from 'next/head';

import { app } from '../components/config/initFirebase';
import Get from '../components/get';

export default function username({ user }) {

    return (
        <>
            {user.map((doc, i) => (
                <div key={i}>
                    <Head>
                        <title>{doc.username} {doc.config}</title>
                        {/* <!-- SEO --> */}
                        <meta name="author" content="Muhammad Darwin Prayoga" />
                        <meta name='description' content={doc.about} />
                        <meta name="keywords"
                            content={`${doc.username}, ${doc.displayName}, ${doc.walletAddress}, ${doc.about}`}
                            itemProp="keywords" />

                        {/* <!-- Google+ / Schema.org --> */}
                        <meta itemProp="name" content={`Biofip | @${doc.username}`} />
                        <meta itemProp="headline" content={`Biofip | @${doc.username}`} />
                        <meta itemProp="description" content={doc.about} />
                        <meta itemProp="image" content={doc.biofipProfile} />
                        <meta itemProp="author" content="Muhammad Darwin Prayoga" />

                        {/* <!-- Basic --> */}
                        <meta name='application-name' content={`Biofip | @${doc.username}`} />
                        <meta name='apple-mobile-web-app-title' content={`Biofip | @${doc.username}`} />

                        {/* <!-- Preview URL --> */}
                        <meta name='twitter:card' content='summary' />
                        <meta name='twitter:url' content={doc.domain} />
                        <meta name='twitter:title' content={`Biofip | @${doc.username}`} />
                        <meta name='twitter:description' content={doc.about} />
                        <meta name='twitter:image' content={doc.biofipProfile} />
                        <meta name='twitter:creator' content='@mdarwinp' />
                        <meta property='og:type' content='website' />
                        <meta property='og:title' content={`Biofip | @${doc.username}`} />
                        <meta property='og:description' content={doc.about} />
                        <meta property='og:site_name' content={`Biofip | @${doc.username}`} />
                        <meta property='og:url' content={doc.domain} />
                        <meta property='og:image' content={doc.biofipProfile} />
                        <meta property='og:image:url' content={doc.biofipProfile} />
                        <meta property="og:image:secure_url" content={doc.biofipProfile} />
                    </Head>

                    <Get
                        username={doc.username}
                        displayName={doc.displayName}
                        dateBirth={doc.dateBirth}
                        region={doc.region}
                        regionFlag={doc.regionFlag}
                        color={doc.color}
                        about={doc.about}

                        linkInstagram={doc.linkInstagram}
                        linkTwitter={doc.linkTwitter}
                        linkFacebook={doc.linkFacebook}
                        linkYoutube={doc.linkYoutube}
                        linkTwitch={doc.linkTwitch}
                        linkSnapchat={doc.linkSnapchat}
                        linkTiktok={doc.linkTiktok}
                        linkGmail={doc.linkGmail}
                        linkYmail={doc.linkYmail}
                        linkSpotify={doc.linkSpotify}
                        linkWhatsapp={doc.linkWhatsapp}
                        linkTelegram={doc.linkTelegram}
                        linkLine={doc.linkLine}

                        linkTrack={doc.linkTrack}
                        linkPlaylist={doc.linkPlaylist}
                        linkDiscord={doc.linkDiscord}
                        linkCustom={doc.linkCustom}

                        linkPaypal={doc.linkPaypal}
                        bitcoinAddress={doc.bitcoinAddress}

                        walletAddress={doc.walletAddress}
                        domain={doc.domain}
                        userUid={doc.userUid}

                        biofipProfile={doc.biofipProfile}
                        biofipProfileACA={doc.biofipProfileACA}
                        biofipProfileTI={doc.biofipProfileTI}

                        biofipTheme={doc.biofipTheme}
                        biofipThemeACA={doc.biofipThemeACA}
                        biofipThemeTI={doc.biofipThemeTI} />
                </div>
            ))}
        </>
    )
}





export async function getServerSideProps({ params }) {

    const fire = getFirestore(app)
    const q = query(collection(fire, 'users'), where('username', '==', params.id))
    const req = await getDocs(q)
    const data = await req.docs.map((doc) => ({ ...doc.data() }))

    if (!data.length) {
        return {
            notFound: true,
        }
    }


    return {
        props: { user: data }, // will be passed to the page component as props
    }

}