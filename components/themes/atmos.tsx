import {
    faBitcoin,
    faEthereum,
    faFacebook,
    faGoogle,
    faInstagram,
    faLine,
    faPaypal,
    faSnapchat,
    faSpotify,
    faTelegram,
    faTiktok,
    faTwitch,
    faTwitter,
    faWhatsapp,
    faYahoo,
    faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ActionIcon, Blockquote, Button, Center, Group, ScrollArea, Skeleton } from '@mantine/core';
import { useClickOutside, useOs } from '@mantine/hooks';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getFirestore, onSnapshot, query, setDoc, where } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import {
    ChevronDown,
    ChevronUp,
    Copy,
    ExternalLink,
    PlayerPause,
    PlayerPlay,
    Scan,
    Share,
    UserCheck,
    UserPlus,
} from 'tabler-icons-react';
import Urlbox from 'urlbox';

import { app } from '../config/initFirebase';

interface BiofipProps {
    style?: any
}

export const Biofip = ({ style }: BiofipProps) => {
    return (
        <svg style={style} fill='currentcolor' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 441.17"><g id="Layer_2" data-name="Layer 2"><g id="Layer_5" data-name="Layer 5"><path d="M434.14,158.65a117,117,0,0,0-43.25-43.25Q363.5,99.54,328.73,99.54q-33.9,0-61.07,15.64A116.12,116.12,0,0,0,225.25,157a115.55,115.55,0,0,0-41-41.61q-26.52-15.86-60-15.86-29.13,0-52.81,12.38t-38,32.82V17q0-7.81-4.57-12.39T17,0Q9.14,0,4.56,4.56T0,17V222.11Q.43,256,16.3,283.18a116.13,116.13,0,0,0,43,42.81q27.17,15.64,61.07,15.65,34.77,0,62.15-15.87a117.56,117.56,0,0,0,25.78-20.11V424.22q0,7.83,4.57,12.39t12.38,4.56q7.4,0,12-4.56t4.56-12.39V296.43q14.34,20.44,38,32.82t52.81,12.39q33.47,0,60-15.87a115.58,115.58,0,0,0,41.94-43.25Q450,255.15,450,220.8,450,186,434.14,158.65ZM165.6,299.26q-20,12-45.2,11.95-24.78,0-44.77-11.95a85.09,85.09,0,0,1-31.3-32.38Q33,246.45,33,220.37q0-25.63,11.3-46.29a83.09,83.09,0,0,1,31.3-32.38Q95.61,130,120.4,130q25.2,0,45.2,11.74a84.69,84.69,0,0,1,31.52,32.38,89.93,89.93,0,0,1,10.42,31.32h-9.39a16,16,0,0,0-11.73,4.78,16.45,16.45,0,0,0-4.78,12.17,16.32,16.32,0,0,0,16.51,16.52h8.9a88.16,88.16,0,0,1-9.93,28A86.77,86.77,0,0,1,165.6,299.26Zm239.85-32.17a84.7,84.7,0,0,1-31.51,32.39q-20,11.73-45.21,11.73-24.78,0-44.77-11.73a83,83,0,0,1-31.29-32.39,90.07,90.07,0,0,1-9.78-28.22H300.3a16.47,16.47,0,0,0,12.16-4.78,16,16,0,0,0,4.79-11.74A16.37,16.37,0,0,0,300.3,205.4H242.47a89.64,89.64,0,0,1,10.2-31.1A85.08,85.08,0,0,1,284,141.91Q304,130,328.73,130q25.2,0,45.21,11.95a86.84,86.84,0,0,1,31.51,32.39Q417,194.73,417,220.8,417,246.45,405.45,267.09Z" /><path d="M121.92,195a25.59,25.59,0,0,0-25.21,25.65,25.23,25.23,0,0,0,25.21,25.21,23.76,23.76,0,0,0,18-7.61,25.45,25.45,0,0,0-.22-35.64A24,24,0,0,0,121.92,195Z" /></g></g></svg>
    )
}

interface Props {
    username: any,
    displayName: any,
    dateBirth: any,
    region: any,
    regionFlag: any,
    color: any,
    about: any,

    linkInstagram: any,
    linkTwitter: any,
    linkFacebook: any,
    linkYoutube: any,
    linkTwitch: any,
    linkSnapchat: any,
    linkTiktok: any,
    linkGmail: any,
    linkYmail: any,
    linkSpotify: any,
    linkWhatsapp: any,
    linkTelegram: any,
    linkLine: any,

    linkTrack: any,
    linkPlaylist: any,
    linkDiscord: any,
    linkCustom: any,

    linkPaypal: any,
    bitcoinAddress: any,

    walletAddress: any,
    domain: any,
    userUid: any,

    biofipProfile: any,
    biofipProfileACA: any,
    biofipProfileTI: any,

    biofipTheme: any,
    biofipThemeACA: any,
    biofipThemeTI: any
}

export default function ATMOS({
    username,
    displayName,
    dateBirth,
    region,
    regionFlag,
    color,
    about,

    linkInstagram,
    linkTwitter,
    linkFacebook,
    linkYoutube,
    linkTwitch,
    linkSnapchat,
    linkTiktok,
    linkGmail,
    linkYmail,
    linkSpotify,
    linkWhatsapp,
    linkTelegram,
    linkLine,

    linkTrack,
    linkPlaylist,
    linkDiscord,
    linkCustom,

    linkPaypal,
    bitcoinAddress,

    walletAddress,
    domain,
    userUid,

    biofipProfile,
    biofipProfileACA,
    biofipProfileTI,

    biofipTheme,
    biofipThemeACA,
    biofipThemeTI
}: Props) {



    const fire = getFirestore(app)
    const auth = getAuth(app)



    const isFirefox = navigator.userAgent.indexOf('Firefox') != -1

    const [uid, setUid] = useState<any | null>('')
    const [isFriend, setIsFriend] = useState(false)

    async function snapFriends() {
        const q = query(collection(fire, `users/${uid}/usersFollowed`), where('userUid', '==', userUid))
        await onSnapshot(q, (s) => {
            s.docs.map((doc) => setIsFriend(doc.exists()))
        })
    }

    async function addFriend() {
        const now = new Date().toISOString()
        await setDoc(doc(fire, 'users', uid, 'usersFollowed', now), {
            userUid: userUid
        })
        alert(`User '${username}' has been added ✌️😁`)
    }





    const [flip, setFlip] = useState(false)
    const [down, setDown] = useState(true)
    const [up, setUp] = useState(true)
    const [card, setCard] = useState(0)
    const [slideDown, setSlideDown] = useState(-1000)
    const [slideUp, setSlideUp] = useState(1000)

    const [age, setAge] = useState(false)
    const [userAge, setUserAge] = useState(dateBirth)

    const [hero, setHero] = useState<any | null>(false)
    const [hero2, setHero2] = useState<any | null>(false)
    const [hero3, setHero3] = useState<any | null>(false)

    const os = useOs()



    const detectCard = useSwipeable({
        onSwipedDown: () => {
            setCard(1000)
            setSlideDown(0)
        },
        onSwipedUp: () => {
            setCard(-1000)
            setSlideUp(0)
        },
        onSwipedRight: () => {
            if (isFirefox) {
                setCard1(!card1)
                setCard2(!card2)
            } else {
                setFlip(!flip)
            }
        },
        onSwipedLeft: () => {
            if (isFirefox) {
                setCard1(!card1)
                setCard2(!card2)
            } else {
                setFlip(!flip)
            }
        }
    })
    const detectTop = useSwipeable({
        onSwipedUp: () => {
            setCard(0)
            setSlideDown(-1000)
        }
    })
    const detectBottom = useSwipeable({
        onSwipedDown: () => {
            setCard(0)
            setSlideUp(1000)
        }
    })





    async function getProfileNft() {

        const options = { method: 'GET' };
        const items = await fetch(`https://api.opensea.io/api/v1/asset/${biofipProfileACA}/${biofipProfileTI}/?include_orders=false`, options)
            .then(response => response.json())
            .catch(err => {
                console.error(err)
                return null
            })

        setHero(items)

    }



    async function domainQr() {
        const googleQr = `https://chart.googleapis.com/chart?chs=500x500&cht=qr&chl=${domain}&choe=UTF-8`
        await setHero2(googleQr)
    }





    const [youtube, setYoutube] = useState<any | null>(false)
    const [twitch, setTwitch] = useState<any | null>(false)
    const [snapchat, setSnapchat] = useState<any | null>(false)
    const [spotify, setSpotify] = useState<any | null>(false)
    const [telegram, setTelegram] = useState<any | null>(false)

    const [pinTwitter, setPinTwitter] = useState<any | null>(false)
    const [pinTrack, setPinTrack] = useState<any | null>(false)
    const [pinPlaylist, setPinPLaylist] = useState<any | null>(false)



    const [active, setActive] = useState(0)
    const [links, setLinks] = useState<any | null>([])

    const [tweet, setTweet] = useState('flex')
    const [track, setTrack] = useState('none')
    const [playlist, setPlaylist] = useState('none')
    const [discord, setDiscord] = useState('none')
    const [custom, setCustom] = useState('none')

    const [embed, setEmbed] = useState('none')
    const outEmbed = useClickOutside(() => setEmbed('none'))




    const [disc, setDisc] = useState(0)
    const [played, setPlayed] = useState(true)
    const audio = useRef(null)

    function musicToggle(ref) {
        if (played) {
            setPlayed(false)
            ref.current.pause()
        } else {
            setPlayed(true)
            ref.current.play()
        }
    }



    if (linkYoutube) {

        !youtube && fetch(`https://opengraph.apiclabs.com/v1/?url=${encodeURIComponent(linkYoutube)}`)
            .then(res => res.json()).then(x => setYoutube(x))

    }
    if (linkTwitch) {

        !twitch && fetch(`https://opengraph.apiclabs.com/v1/?url=${encodeURIComponent('https://www.twitch.tv/' + linkTwitch)}`)
            .then(res => res.json()).then(x => setTwitch(x))

    }
    if (linkSnapchat) {

        !snapchat && fetch(`https://opengraph.apiclabs.com/v1/?url=${encodeURIComponent('https://www.snapchat.com/add/' + linkSnapchat)}`)
            .then(res => res.json()).then(x => setSnapchat(x))

    }
    if (linkSpotify) {

        !spotify && fetch(`https://opengraph.apiclabs.com/v1/?url=${encodeURIComponent(linkSpotify)}`)
            .then(res => res.json()).then(x => setSpotify(x))

    }
    if (linkTelegram) {

        !telegram && fetch(`https://opengraph.apiclabs.com/v1/?url=${encodeURIComponent('https://t.me/' + linkTelegram)}`)
            .then(res => res.json()).then(x => setTelegram(x))

    }



    if (linkTwitter) {

        !pinTwitter && fetch(`https://twitter-cors.p.rapidapi.com/2/users/by/username/${linkTwitter}?tweet.fields=created_at&user.fields=profile_image_url&expansions=pinned_tweet_id`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer AAAAAAAAAAAAAAAAAAAAAJJFfAEAAAAAjBM5gkfmrwIs3kM2uCqy%2FlxukPE%3DtbOMyEYhwuGFYC18uNnkvxU6mgcTA7oGJTyn1ffp0soxDGeB22',
                'X-RapidAPI-Key': 'b93225fcddmshc2aa39b60b562adp14b4efjsn88f900d37621',
                'X-RapidAPI-Host': 'twitter-cors.p.rapidapi.com'
            }
        })
            .then(res => res.json())
            .then(json => setPinTwitter(json))
            .catch(err => Error(err));

    }

    if (linkTrack) {

        !pinTrack && fetch(`https://opengraph.apiclabs.com/v1/?url=${encodeURIComponent(linkTrack)}`)
            .then(res => res.json()).then(x => {
                setPinTrack(x)
            })

    }

    if (linkPlaylist) {

        !pinPlaylist && fetch(`https://opengraph.apiclabs.com/v1/?url=${encodeURIComponent(linkPlaylist)}`)
            .then(res => res.json()).then(x => {
                setPinPLaylist(x)
            })

    }



    const current = [
        { name: 'Instagram', icon: faInstagram, value: '@' + linkInstagram, pic: <img draggable={false} style={{ width: 150, borderRadius: '100%', marginTop: 40 }} src={''} />, click: () => open(`https://instagram.com/${linkInstagram}`) }
    ]

    const add = [
        linkTwitter && { name: 'Twitter', icon: faTwitter, value: '@' + linkTwitter, pic: <img draggable={false} style={{ width: 100, borderRadius: '100%', marginTop: 60 }} src={pinTwitter?.data?.profile_image_url} />, click: () => open(`https://twitter.com/${linkTwitter}`) },
        linkFacebook && { name: 'Facebook', icon: faFacebook, value: displayName, pic: <img draggable={false} style={{ width: 150, borderRadius: '100%', marginTop: 40 }} src={''} />, click: () => open(linkFacebook) },
        linkYoutube && { name: 'Youtube', icon: faYoutube, value: youtube?.title, pic: <img draggable={false} style={{ width: 150, borderRadius: '100%', marginTop: 40 }} src={youtube.image} />, click: () => open(youtube.url) },
        linkTwitch && { name: 'Twitch', icon: faTwitch, value: linkTwitch, pic: <img draggable={false} style={{ width: 150, borderRadius: '100%', marginTop: 40 }} src={twitch.image} />, click: () => open('https://www.twitch.tv/' + linkTwitch) },
        linkSnapchat && { name: 'Snapchat', icon: faSnapchat, value: linkSnapchat, pic: <img draggable={false} style={{ width: '100%', borderRadius: 16, marginTop: 40 }} src={snapchat.image} />, click: () => open(snapchat.url) },
        linkTiktok && { name: 'Tiktok', icon: faTiktok, value: '@' + linkTiktok, pic: <img draggable={false} style={{ width: 150, borderRadius: '100%', marginTop: 40 }} src={''} />, click: () => open(`https://tiktok.com/@${linkTiktok}`) },
        linkGmail && { name: 'Google Mail', icon: faGoogle, value: linkGmail, pic: <img draggable={false} style={{ width: 150, borderRadius: '100%', marginTop: 40 }} src={''} />, click: () => open(`mailto:${linkGmail}`) },
        linkYmail && { name: 'Yahoo Mail', icon: faYahoo, value: linkYmail, pic: <img draggable={false} style={{ width: 150, borderRadius: '100%', marginTop: 40 }} src={''} />, click: () => open(`mailto:${linkYmail}`) },
        linkSpotify && { name: 'Spotify', icon: faSpotify, value: spotify?.title, pic: <img draggable={false} style={{ width: 150, borderRadius: '100%', marginTop: 40 }} src={spotify.image} />, click: () => open(spotify.url) },
        linkWhatsapp && { name: 'Whatsapp', icon: faWhatsapp, value: linkWhatsapp, pic: <img draggable={false} style={{ width: 150, borderRadius: '100%', marginTop: 40 }} src={''} />, click: () => open(`https://wa.me/${linkWhatsapp}`) },
        linkTelegram && { name: 'Telegram', icon: faTelegram, value: '@' + linkTelegram, pic: <img draggable={false} style={{ width: 150, borderRadius: '100%', marginTop: 40 }} src={telegram.image} />, click: () => open(`https://t.me/${linkTelegram}`) },
        linkLine && { name: 'Line', icon: faLine, value: 'ID: ' + linkLine, pic: <img draggable={false} style={{ width: 150, borderRadius: '100%', marginTop: 40 }} src={''} />, click: () => navigator.clipboard.writeText(linkLine).then(() => alert(`'${linkLine}' Line ID copied to clipboard.`)) },
        linkPaypal && { name: 'Paypal', icon: faPaypal, value: linkPaypal, pic: <img draggable={false} style={{ width: 150, borderRadius: '100%', marginTop: 40 }} src={''} />, click: () => open(`https://paypal.me/${linkPaypal}`) },
        bitcoinAddress && { name: 'Bitcoin', icon: faBitcoin, value: 'Scan / Click QR to copy address', pic: <img draggable={false} style={{ width: '70%', borderRadius: 16 }} src={`https://chart.googleapis.com/chart?chs=500x500&cht=qr&chl=${bitcoinAddress}&choe=UTF-8`} />, click: () => navigator.clipboard.writeText(bitcoinAddress).then(() => alert(`'${bitcoinAddress}' Bitcoin address copied to clipboard.`)) },
        walletAddress && { name: 'Ethereum', icon: faEthereum, value: 'Scan / Click QR to copy address', pic: <img draggable={false} style={{ width: '70%', borderRadius: 16 }} src={`https://chart.googleapis.com/chart?chs=500x500&cht=qr&chl=${walletAddress}&choe=UTF-8`} />, click: () => navigator.clipboard.writeText(walletAddress).then(() => alert(`'${walletAddress}' Bitcoin address copied to clipboard.`)) }
    ]





    //Get NFT List
    const [nftList, setNftList] = useState<any | null>([])

    async function getNftList() {
        if (!walletAddress) { return }

        const options = { method: 'GET', headers: { Accept: 'application/json' } };
        const items = await fetch(`https://api.opensea.io/api/v1/assets?owner=${walletAddress}&order_direction=desc&limit=200&include_orders=false`, options)
            .then(response => response.json())
            .then(response => {
                return response.assets
            })
            .catch(err => {
                console.error(err)
                return null
            })

        setNftList(items)

    }

    const [card1, setCard1] = useState(true)
    const [card2, setCard2] = useState(false)





    async function onShare() {

        const urlbox = Urlbox('fHQ3XMT7hXYarAcQ', 'a3a481393e154a61a6cb2dad8eaaea96')

        const imgUrl = urlbox.buildUrl({
            "format": "png",
            "url": `https://biofip.com/${username}`,
            "height": "978",
            "width": "549",
            "wait_until": "requestsfinished",
            "user_agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 10_0 like Mac OS X) AppleWebKit/602.1.32 (KHTML, like Gecko) Version/10.0 Mobile/14A5261v Safari/602.1"
        })

        const blob = await fetch(imgUrl)
            .then(res => res.blob())

        const filesArray: File[] = [new File([blob], `${username}.png`, { type: blob.type, lastModified: new Date().getTime() })]
        const shareData = {
            files: filesArray,
            title: `${displayName} (@${username}) on Biofip`,
            text: `It was about self-branding based on biography NFT by web 3.0, and multiple APIs were goin to build the traffic of your profile looking for identity card to Metaverse on forward. check ${displayName}'s Biofip by click this url: ${domain}`,
        }

        navigator.share(shareData as any).catch((e) => Error(e))

    }





    useEffect(() => {

        add.map((x, i) => (
            <>
                {x ? current.push({ name: x.name, icon: x.icon, value: x.value, pic: x.pic, click: x.click }) : delete x[i]}
            </>
        ))

        setLinks(current.map(({ icon: icon, name: name, value: value, pic: picture, click: onClick }) => (
            <Group onClick={onClick} sx={{ '* &': { 'cursor': 'pointer' } }} direction='column' position='center'>
                <motion.div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
                    <FontAwesomeIcon icon={icon} color='white' size={'2x'} />
                    <h2>{name}</h2>
                </motion.div>
                <div style={{ display: 'flex', width: '100%', color: 'white', gap: 32, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    {picture}
                    <p>{value}</p>
                </div>
            </Group>
        )))

        getNftList().catch((e) => Error(e))

        if (os == 'android') {
            setDown(false)
            setUp(false)
        } else if (os == 'ios') {
            setDown(false)
            setUp(false)
        }

        function getAge(date) {
            const today = new Date()
            const dateBirth = new Date(date)
            let age = today.getFullYear() - dateBirth.getFullYear()
            const m = today.getMonth() - dateBirth.getMonth()
            if (m < 0 || (m == 0 && today.getDate() < dateBirth.getDate())) {
                age--
            } setUserAge(age)
        } getAge(dateBirth)

        snapFriends().catch((e) => Error(e))

        onAuthStateChanged(auth, (user) => {
            if (user == null) {
                setUid(null)
            } else {
                setUid(user.uid)
            }
        })

        setDisc(disc + 180)

    }, [add, setLinks, current, getNftList, os, setDown, setUp, setUserAge, snapFriends, setUid, setDisc])

    const UserLinks = () => {
        return (
            <>
                {links[active]}
            </>
        )
    }



    const Front = () => {
        return (
            <>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, alignItems: 'center', paddingLeft: '8px', paddingRight: '8px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <h2 style={{ color: 'white', margin: 0 }}>{displayName > 15 ? displayName.substring(0, 15) + '...' : displayName}</h2>
                        <p style={{ color: 'white', margin: 0 }}>{username > 20 ? username.substring(0, 20) + '...' : username}</p>
                    </div>
                    <Button onClick={() => setHero3({ name: region, image: regionFlag })} style={{ backgroundColor: color, color: 'white', padding: '5px', borderRadius: '8px' }}>{region > 15 ? region.substring(0, 15) + '...' : region}</Button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 18, alignItems: 'center', paddingLeft: '8px', paddingRight: '8px', paddingBottom: '24px' }}>
                    <sub style={{ color: 'gray' }}>{about > 30 ? about.substring(0, 30) + '...' : about}</sub>
                    <motion.sub onClick={() => setAge(!age)} whileTap={{ scale: 1.2 }} whileHover={{ cursor: 'help' }} style={{ color: 'gray' }}>{age ? userAge + ' yo' : dateBirth}</motion.sub>
                </div>
            </>
        )
    }
    const Back = () => {
        return (
            <div style={{ width: '100%', height: '100%', color: 'gray', padding: '8px', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', MozBackfaceVisibility: 'hidden', transform: isFirefox ? 'unset' : 'rotateY(180deg)', position: 'absolute' }}>
                <UserLinks />
                <div style={{ position: 'absolute', bottom: 0, left: 0, marginLeft: 8, padding: 16, display: 'flex', flexDirection: 'column', gap: 24 }}>
                    {active != 0 &&
                        <ActionIcon onClick={() => setActive(active - 1)} variant='transparent'><ChevronUp style={{ color: 'gray' }} /></ActionIcon>}
                    {active != links.length - 1 &&
                        <ActionIcon onClick={() => setActive(active + 1)} variant='transparent'><ChevronDown style={{ color: 'gray' }} /></ActionIcon>}
                </div>
                <div style={{ position: 'absolute', bottom: 0, right: 0, marginRight: 8, padding: 8, display: 'flex', gap: 16 }}>
                    <ActionIcon onClick={onShare} variant='transparent'><Share style={{ color: 'gray' }} /></ActionIcon>
                    {isFriend ?
                        <ActionIcon variant='transparent' onClick={() => alert('This Biofip is already on your Friends List 👊😏')}><UserCheck style={{ color: 'gray' }} /></ActionIcon> :
                        <ActionIcon variant='transparent' onClick={() => {
                            if (!uid) {
                                alert('YO NEED TO LOGIN/SIGNUP 👊😏')
                                location.href = '/'
                            } else {
                                addFriend()
                            }
                        }}><UserPlus style={{ color: 'gray' }} /></ActionIcon>}
                    <ActionIcon variant='transparent' onClick={domainQr}><Scan style={{ color: 'gray' }} /></ActionIcon>
                </div>
            </div>
        )
    }





    return (
        <div style={{ perspective: 2000, WebkitPerspective: 2000, MozPerspective: 2000, position: 'fixed', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(2, 5, 14, 1)', top: '0%', bottom: '0%', right: '0%', left: '0%', zIndex: 0 }}>



            <motion.div layout animate={{ scale: [1, 1.2, 1], rotate: [360, 0, 360], rotateY: [360, 0, 360], rotateZ: [360, 0, 360], transition: { yoyo: Infinity, duration: 30 } }} style={{ position: 'fixed', zIndex: 1, background: color, opacity: '20%', filter: 'blur(30px)', borderRadius: '80%', width: '500px', height: '300px' }} />
            <motion.div layout animate={{ x: [250, -250], y: [500, -500], transition: { yoyo: Infinity, duration: 30 } }} style={{ position: 'fixed', background: color, opacity: '20%', filter: 'blur(30px)', zIndex: 2, borderRadius: '80%', width: '300px', height: '200px' }} />



            {down &&
                <div style={{ position: 'fixed', width: '100%', top: 0, zIndex: 300, display: 'flex', justifyContent: 'center' }}><ActionIcon onClick={() => {
                    if (card == -1000) {
                        setCard(0)
                        setSlideUp(1000)
                        setUp(true)
                    } else {
                        setCard(1000)
                        setSlideDown(0)
                        setDown(false)
                    }
                }} variant='transparent'><ChevronDown /></ActionIcon></div>}

            {up && embed == 'none' &&
                <div style={{ position: 'fixed', width: '100%', bottom: 0, zIndex: 300, display: 'flex', justifyContent: 'center' }}><ActionIcon onClick={() => {
                    if (card == 1000) {
                        setCard(0)
                        setSlideDown(-1000)
                        setDown(true)
                    } else {
                        setCard(-1000)
                        setSlideUp(0)
                        setUp(false)
                    }
                }} variant='transparent'><ChevronUp /></ActionIcon></div>}

            {played && pinTrack.image && card == 0 &&
                <motion.img onClick={() => {
                    setCard(1000)
                    setSlideDown(0)
                    setDown(false)
                    setTweet('none')
                    setTrack('flex')
                    setPlaylist('none')
                    setDiscord('none')
                    setCustom('none')
                }} whileHover={{ cursor: 'pointer' }} draggable={false} animate={{ rotate: disc, transition: { duration: 5 } }} src={pinTrack.image} style={{ position: 'fixed', width: 40, borderRadius: '100%', right: 0, bottom: 0, margin: 24, borderStyle: 'outset', borderWidth: '2px', borderColor: 'rgba(255, 255, 255, 0.20)' }} />}



            {hero &&
                <Hero value={hero} onClick={() => setHero(false)} />}

            {hero2 &&
                <div style={{ position: 'fixed', backdropFilter: 'blur(3px)', width: '100%', height: '100%', left: '0%', top: '0%', right: '0%', bottom: '0%', zIndex: 300, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                    <ScrollArea style={{ maxHeight: '100%' }} scrollbarSize={5}>
                        <motion.img draggable={false} whileHover={{ cursor: 'none' }} onClick={() => setHero2(false)} src={hero2} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                    </ScrollArea>
                </div>}

            {hero3 &&
                <div style={{ position: 'fixed', color: 'white', backdropFilter: 'blur(3px)', width: '100%', height: '100%', left: '0%', top: '0%', right: '0%', bottom: '0%', zIndex: 300, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                    <motion.img draggable={false} whileHover={{ cursor: 'none' }} onClick={() => setHero3(false)} src={hero3.image} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                    <div style={{ position: 'fixed', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', right: 0, left: 0, bottom: '10%' }}>
                        <h2>{hero3.name}</h2>
                    </div>
                </div>}


            <motion.div {...detectTop} transition={{ duration: 1 }} initial={{ y: -400 }} animate={{ y: slideDown }} drag={'y'} dragElastic={{ bottom: 0, top: 1 }} dragConstraints={{ top: 0, bottom: 10 }} style={{ display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, justifyContent: 'center', width: '100%', maxWidth: '1000px', background: 'rgba(39, 45, 55, 0.70)', borderBottomLeftRadius: '32px', borderBottomRightRadius: '32px', zIndex: 200, borderStyle: 'outset', borderWidth: '2px', borderColor: 'rgba(255, 255, 255, 0.20)' }}>

                <Group m={'md'} position='right'>
                    {pinTwitter && <Button onClick={() => {
                        setTweet('flex')
                        setTrack('none')
                        setPlaylist('none')
                        setDiscord('none')
                        setCustom('none')
                    }} radius={'lg'} variant={tweet == 'flex' ? 'outline' : 'subtle'}>Tweet</Button>}
                    {pinTrack.type == 'music.song' && <Button onClick={() => {
                        setTweet('none')
                        setTrack('flex')
                        setPlaylist('none')
                        setDiscord('none')
                        setCustom('none')
                    }} radius={'lg'} variant={track == 'flex' ? 'outline' : 'subtle'}>Track</Button>}
                    {pinPlaylist.type == 'music.playlist' && <Button onClick={() => {
                        setTweet('none')
                        setTrack('none')
                        setPlaylist('flex')
                        setDiscord('none')
                        setCustom('none')
                    }} radius={'lg'} variant={playlist == 'flex' ? 'outline' : 'subtle'}>Playlist</Button>}
                    {linkDiscord && <Button onClick={() => {
                        setTweet('none')
                        setTrack('none')
                        setPlaylist('none')
                        setDiscord('flex')
                        setCustom('none')
                    }} radius={'lg'} variant={discord == 'flex' ? 'outline' : 'subtle'}>Discord</Button>}
                    {linkCustom && <Button onClick={() => {
                        setTweet('none')
                        setTrack('none')
                        setPlaylist('none')
                        setDiscord('none')
                        setCustom('flex')
                    }} radius={'lg'} variant={custom == 'flex' ? 'outline' : 'subtle'}>Link</Button>}
                </Group>

                <Group position='center'>
                    {pinTwitter &&
                        <div style={{ display: tweet, margin: 16, borderRadius: 24, flexDirection: 'column', background: 'rgba(39, 45, 55, 0.70)', borderStyle: 'outset', borderWidth: '2px', borderColor: 'rgba(255, 255, 255, 0.20)' }}>
                            <motion.div onClick={() => open(`https://twitter.com/${linkTwitter}`)} whileHover={{ cursor: 'pointer' }} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8, paddingLeft: 16, paddingRight: 16 }}>
                                <Group>
                                    <img draggable={false} src={pinTwitter.data.profile_image_url} style={{ width: 40, borderRadius: 20 }} />
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <h3 style={{ margin: 0 }}>{pinTwitter.data.name}</h3>
                                        <p style={{ margin: 0 }}>{pinTwitter.data.username}</p>
                                    </div>
                                </Group>
                                <FontAwesomeIcon icon={faTwitter} size={'2x'} />
                            </motion.div>
                            <Blockquote><p>{pinTwitter.includes.tweets[0].text}</p><sub>{new Date(pinTwitter.includes.tweets[0].created_at).toDateString()}</sub></Blockquote>
                        </div>}



                    {pinTrack.type == 'music.song' &&
                        <div style={{ display: track, margin: 16, maxWidth: 460, borderRadius: 24, flexDirection: 'column', background: 'rgba(39, 45, 55, 0.70)', borderStyle: 'outset', borderWidth: '2px', borderColor: 'rgba(255, 255, 255, 0.20)' }}>
                            <img draggable={false} style={{ width: '100%', borderTopLeftRadius: 24, borderTopRightRadius: 24 }} src={pinTrack.image} />
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 4, paddingBottom: 8, paddingLeft: 16, paddingRight: 16 }}>
                                <Group>
                                    <ActionIcon onClick={() => musicToggle(audio)} variant='transparent'>
                                        {played ?
                                            <PlayerPause /> :
                                            <PlayerPlay />}
                                        <audio autoPlay ref={audio} loop src={pinTrack.audio} />
                                    </ActionIcon>
                                    <motion.div onClick={() => open(pinTrack.url)} whileHover={{ cursor: 'pointer' }} style={{ display: 'flex', flexDirection: 'column' }}>
                                        <h2 style={{ margin: 0 }}>{pinTrack.title.length > 20 ? pinTrack.title.substring(0, 20) + '...' : pinTrack.title}</h2>
                                        <p style={{ margin: 0 }}>{pinTrack.description.length > 30 ? pinTrack.description.substring(0, 30) + '...' : pinTrack.description}</p>
                                    </motion.div>
                                </Group>
                                <motion.div whileHover={{ cursor: 'pointer' }}><FontAwesomeIcon onClick={() => open(pinTrack.url)} icon={faSpotify} size={'2x'} /></motion.div>
                            </div>
                        </div>}

                    {pinPlaylist.type == 'music.playlist' &&
                        <div style={{ display: playlist, margin: 16, maxWidth: 460, borderRadius: 24, flexDirection: 'column', background: 'rgba(39, 45, 55, 0.70)', borderStyle: 'outset', borderWidth: '2px', borderColor: 'rgba(255, 255, 255, 0.20)' }}>
                            <img draggable={false} style={{ width: '100%', borderTopLeftRadius: 24, borderTopRightRadius: 24 }} src={pinPlaylist.image} />
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 4, paddingBottom: 8, paddingLeft: 16, paddingRight: 16 }}>
                                <Group>
                                    <ActionIcon onClick={() => setEmbed('flex')} variant='transparent'>
                                        <PlayerPlay />
                                    </ActionIcon>
                                    <motion.div onClick={() => open(pinPlaylist.url)} whileHover={{ cursor: 'pointer' }} style={{ display: 'flex', flexDirection: 'column' }}>
                                        <h2 style={{ margin: 0 }}>{pinPlaylist.title.length > 20 ? pinPlaylist.title.substring(0, 20) + '...' : pinPlaylist.title}</h2>
                                        <p style={{ margin: 0 }}>{pinPlaylist.description.length > 30 ? pinPlaylist.description.substring(0, 30) + '...' : pinPlaylist.description}</p>
                                    </motion.div>
                                </Group>
                                <motion.div whileHover={{ cursor: 'pointer' }}><FontAwesomeIcon onClick={() => open(pinPlaylist.url)} icon={faSpotify} size={'2x'} /></motion.div>
                            </div>
                        </div>}

                    {linkDiscord &&
                        <div style={{ display: discord, flexDirection: 'column', margin: 16 }}>
                            <h3>{linkDiscord}</h3>
                            <br />
                            <Group position='center'>
                                <ActionIcon onClick={() => navigator.clipboard.writeText(linkDiscord).then(() => alert(`'${linkDiscord}' url copied to clipboard.`))} variant='transparent'><Copy /></ActionIcon>
                                <br />
                                <ActionIcon onClick={() => open(linkDiscord)} variant='transparent'><ExternalLink /></ActionIcon>
                            </Group>
                        </div>}

                    {linkCustom &&
                        <div style={{ display: custom, flexDirection: 'column', margin: 16 }}>
                            <h3>{linkCustom}</h3>
                            <br />
                            <Group position='center'>
                                <ActionIcon onClick={() => navigator.clipboard.writeText(linkCustom).then(() => alert(`'${linkCustom}' url copied to clipboard.`))} variant='transparent'><Copy /></ActionIcon>
                                <br />
                                <ActionIcon onClick={() => open(linkCustom)} variant='transparent'><ExternalLink /></ActionIcon>
                            </Group>
                        </div>}
                </Group>





                <Center sx={{ marginTop: '5px' }}>
                    <Skeleton radius={'xl'} sx={{ width: '50px', height: '3px', borderRadius: '25px', margin: '24px' }} />
                </Center>

                <div style={{ position: 'fixed', display: embed, backdropFilter: 'blur(3px)', width: '100%', height: '100%', left: '0%', top: '0%', right: '0%', bottom: '0%', zIndex: 50, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                    <div ref={outEmbed} style={{ position: 'fixed', width: '100%', maxWidth: '1000px', bottom: 0, padding: 16 }}>
                        <iframe src={pinPlaylist.url?.replace('https://open.spotify.com/playlist/', 'https://open.spotify.com/embed/playlist/') + '?utm_source=generator'} style={{ border: 0, borderRadius: 16, width: '100%', height: 380 }} />
                    </div>
                </div>
            </motion.div>

            {isFirefox ?
                <>
                    {card1 && <motion.div hidden={card1} {...detectCard} layout whileTap={{ scale: 0.95 }} transition={{ ease: 'backOut', duration: 1.5 }} onDoubleClick={() => {
                        setCard1(!card1)
                        setCard2(!card2)
                    }} initial={{ x: 1000 }} animate={{ x: 0, y: card }} drag={'y'} dragElastic={0.12} dragConstraints={{ right: 0, left: 0, top: 0, bottom: 0 }} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', transformStyle: 'preserve-3d', WebkitTransformStyle: 'preserve-3d', MozTransformStyle: 'preserve-3d', minHeight: '500px', width: '350px', maxHeight: '600px', background: 'rgba(39, 45, 55, 0.70)', borderRadius: '32px', zIndex: 100, borderStyle: 'outset', borderWidth: '2px', borderColor: 'rgba(255, 255, 255, 0.20)' }}>
                        <div style={{ width: '100%', height: '100%', padding: '8px', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', MozBackfaceVisibility: 'hidden', position: 'absolute' }}>
                            <motion.img onClick={getProfileNft} whileTap={{ scale: 0.9 }} whileHover={{ cursor: 'pointer' }} draggable={false} style={{ maxWidth: '100%', borderRadius: '24px' }} src={biofipProfile} alt={`${username}, ${displayName}, ${about}`} />
                            <Front />
                        </div>
                    </motion.div>}

                    {card2 && <motion.div {...detectCard} layout whileTap={{ cursor: 'grabbing', scale: 0.95 }} whileHover={{ cursor: 'grab' }} transition={{ ease: 'backOut', duration: 1.5 }} onDoubleClick={() => {
                        setCard1(!card1)
                        setCard2(!card2)
                    }} initial={{ x: -1000 }} animate={{ x: 0, y: card }} drag={'y'} dragElastic={0.12} dragConstraints={{ right: 0, left: 0, top: 0, bottom: 0 }} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', transformStyle: 'preserve-3d', WebkitTransformStyle: 'preserve-3d', MozTransformStyle: 'preserve-3d', minHeight: '500px', width: '350px', maxHeight: '600px', background: 'rgba(39, 45, 55, 0.70)', borderRadius: '32px', zIndex: 100, borderStyle: 'outset', borderWidth: '2px', borderColor: 'rgba(255, 255, 255, 0.20)' }}>
                        <Back />
                    </motion.div>}
                </> :



                <motion.div {...detectCard} layout whileTap={{ scale: 0.95 }} transition={{ ease: 'backOut', duration: 1.5 }} onDoubleClick={() => {
                    setFlip(!flip)
                }} initial={{ rotateY: -360 }} animate={{ rotateY: flip ? 180 : 0, y: card }} drag={'y'} dragElastic={0.12} dragConstraints={{ right: 0, left: 0, top: 0, bottom: 0 }} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', transformStyle: 'preserve-3d', WebkitTransformStyle: 'preserve-3d', MozTransformStyle: 'preserve-3d', minHeight: '500px', width: '350px', maxHeight: '600px', background: 'rgba(39, 45, 55, 0.70)', borderRadius: '32px', zIndex: 100, borderStyle: 'outset', borderWidth: '2px', borderColor: 'rgba(255, 255, 255, 0.20)' }}>
                    <div style={{ width: '100%', height: '100%', padding: '8px', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', MozBackfaceVisibility: 'hidden', position: 'absolute' }}>
                        <motion.img onClick={getProfileNft} whileTap={{ scale: 0.9 }} whileHover={{ cursor: 'pointer' }} draggable={false} style={{ maxWidth: '100%', borderRadius: '24px' }} src={biofipProfile} alt={`${username}, ${displayName}, ${about}`} />
                        <Front />
                    </div>

                    <Back />
                </motion.div>}

            <motion.div layout transition={{ duration: 1 }} initial={{ y: 400 }} animate={{ y: slideUp }} drag={'y'} dragElastic={{ bottom: 1, top: 0 }} dragConstraints={{ top: 10, bottom: 0 }} style={{ display: 'flex', flexDirection: 'column', position: 'fixed', bottom: 0, justifyContent: 'center', alignItems: 'center', width: '100%', maxWidth: '1000px', background: 'rgba(39, 45, 55, 0.70)', borderTopLeftRadius: '32px', borderTopRightRadius: '32px', zIndex: 200, borderStyle: 'outset', borderWidth: '2px', borderColor: 'rgba(255, 255, 255, 0.20)' }}>
                <div {...detectBottom} style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
                    <h2>{nftList.length == 0 ? 'NFT was Empty' : 'NFT Collection'}</h2>
                    <img draggable={false} src={opensea} style={{ width: 35, marginLeft: 16, marginRight: 16 }} />
                </div>
                {nftList.length != 0 && <ScrollArea style={{ height: '500px' }} scrollbarSize={5}>
                    <Group position='center'>
                        {nftList.map((nft, index) => (
                            <div key={index} style={{ width: '150px', height: '150px' }}>
                                <motion.img draggable={false} onClick={() => {
                                    setHero(nft)
                                }} layout whileHover={{ cursor: 'pointer' }} style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '8px' }} src={nft.image_url} />
                            </div>
                        ))}
                    </Group>
                </ScrollArea>}
            </motion.div>



        </div>
    )
}




interface HeroProps {
    onClick(): any;
    value: any;
}

let opensea = 'https://opensea.io/static/images/logos/opensea.svg'

export function Hero({ onClick, value }: HeroProps) {



    const fire = getFirestore(app)

    const [getUsername, setGetUsername] = useState<any | null>(false)
    const [getProfile, setGetProfile] = useState<any | null>(false)
    async function convert(address) {
        const q = query(collection(fire, 'users'), where('walletAddress', '==', address))
        await onSnapshot(q, (s) => {
            s.docs.map((res) => {
                const data = res.data()
                setGetUsername(data?.username)
                setGetProfile(data?.biofipProfile)
            })
        })
    }



    const [drawer, setDrawer] = useState(false)
    const swipeUp = useSwipeable({
        onSwipedUp: () => {
            convert(value.owner.address)
                .then(() => setDrawer(true))
        },
        onSwipedDown: () => {
            setDrawer(false)
            setGetUsername(false)
        }
    })



    return (
        <div style={{ position: 'fixed', backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)', width: '100%', height: '100%', left: '0%', top: '0%', right: '0%', bottom: '0%', zIndex: 300, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
            <ScrollArea style={{ maxHeight: '100%' }} scrollbarSize={5}>
                <motion.img draggable={false} whileHover={{ cursor: 'not-allowed' }} onClick={() => {
                    onClick()
                    setDrawer(false)
                    setGetUsername(false)
                }} src={value.image_url} style={{ maxWidth: '100%', maxHeight: '100%' }} />
            </ScrollArea>
            <div {...swipeUp} style={{ position: 'fixed', width: '100%', backdropFilter: 'blur(3px)', maxWidth: '1000px', padding: '16px', color: 'white', bottom: 0, background: 'rgba(39, 45, 55, 0.70)', borderTopLeftRadius: '32px', borderTopRightRadius: '32px', zIndex: 200, borderStyle: 'outset', borderWidth: '2px', borderColor: 'rgba(255, 255, 255, 0.20)' }}>

                <Center sx={{ marginTop: '-50px' }}>
                    {drawer ?
                        <ActionIcon onClick={() => {
                            setDrawer(false)
                            setGetUsername(false)
                        }} variant='transparent'><ChevronDown /></ActionIcon> :
                        <ActionIcon onClick={() => {
                            convert(value.owner.address)
                                .then(() => setDrawer(true))
                        }} variant='transparent'><ChevronUp /></ActionIcon>}
                </Center>

                <Center sx={{ marginTop: '5px' }}>
                    <Skeleton radius={'xl'} sx={{ width: '50px', height: '3px', borderRadius: '25px', margin: '24px' }} />
                </Center>

                <Group direction='column'>
                    <b><FontAwesomeIcon icon={faEthereum} size={'sm'} /> {value.name || '#' + value.token_id}</b>
                    <Group>
                        <img draggable={false} src={value.collection.image_url} style={{ borderRadius: '15px', width: '30px' }} />
                        <sub>{value.collection.name}</sub>
                        {value.creator?.config == 'verified' &&
                            <FontAwesomeIcon icon={faCircleCheck} color={'#1971C2'} size={'sm'} />}
                    </Group>
                    {drawer &&
                        <>
                            {value.asset_contract?.address ?
                                <>
                                    <h3>NFT Details</h3>
                                    <div style={{ justifyContent: 'flex-start', width: '100%', display: 'flex' }}>
                                        <Group direction='column'>
                                            <sub>Contract Address</sub>
                                            <p style={{ margin: 0 }}>{value.asset_contract.address.length > 20 ? value.asset_contract.address.substring(0, 20) + '...' : value.asset_contract.address}</p>
                                        </Group>
                                        <Group ml={'xl'} direction='column'>
                                            <sub>Token ID</sub>
                                            <p style={{ margin: 0 }}>{value.token_id.length > 20 ? value.token_id.substring(0, 20) + '...' : value.token_id}</p>
                                        </Group>
                                    </div>
                                </> :
                                <>
                                    <br />
                                    <p style={{ margin: 0 }}>its not an NFT...</p>
                                </>}
                            {value.owner.address != '0x0000000000000000000000000000000000000000' &&
                                <h3>Owner</h3>}
                            {getUsername &&
                                <>
                                    <Group direction='column'>
                                        <sub>Biofip</sub>
                                        <Group>
                                            <img draggable={false} src={getProfile} style={{ borderRadius: '15px', width: '30px' }} />
                                            <p style={{ margin: 0 }}>{getUsername.length > 20 ? getUsername.substring(0, 20) + '...' : getUsername}</p>
                                            <br />
                                            <br />
                                            <br />
                                            <Button onClick={() => open(`/${getUsername}`)} variant='light' radius={'xl'} leftIcon={<Biofip style={{ position: 'static', height: '22px' }} />}>Biofip</Button>
                                        </Group>
                                    </Group>
                                </>}
                            {value.owner.address != '0x0000000000000000000000000000000000000000' &&
                                <Group direction='column'>
                                    <sub>Wallet Address</sub>
                                    <p style={{ margin: 0 }}>{value.owner.address.length > 20 ? value.owner.address.substring(0, 20) + '...' : value.owner.address}</p>
                                </Group>}
                            <br />
                            <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                                <Button onClick={() => open(value.permalink)} leftIcon={<img draggable={false} src={opensea} width={'20px'} height={'20px'} />} rightIcon={<ExternalLink size={'16px'} />} variant='outline' radius={'xl'} color='blue'>View on Opensea</Button>
                            </div>
                            <br />
                        </>}
                </Group>

            </div>
        </div>
    )
}