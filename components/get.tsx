import ATMOS from './themes/atmos';

export default function Get(doc) {

    if (doc.biofipTheme == 'https://firebasestorage.googleapis.com/v0/b/biofip-2022.appspot.com/o/theme_ATMOS.png?alt=media&token=08f0d50c-df9e-496f-bf9f-642cec876a8b') {
        return (
            <ATMOS
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
        )
    }

    return <p>you need to pick any theme</p>

}