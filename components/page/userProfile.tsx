import {
    faBitcoin,
    faDiscord,
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
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Player } from '@lottiefiles/react-lottie-player';
import {
    ActionIcon,
    Blockquote,
    Box,
    Button,
    Card,
    Center,
    ColorInput,
    createStyles,
    Grid,
    Group,
    Input,
    InputWrapper,
    Modal,
    Paper,
    ScrollArea,
    Skeleton,
    Textarea,
    TextInput,
    Tooltip,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useClickOutside, useClipboard, useResizeObserver } from '@mantine/hooks';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getFirestore, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Calendar, ChevronDown, Copy, Pin, PlayerPlay, Trash } from 'tabler-icons-react';

import { app } from '../config/initFirebase';
import Hero from '../hero';
import Music from '../Music';
import tradeCrypto from '../plugins/103957-trading-crypto.json';
import rainbow from '../plugins/colors.json';
import datas from '../plugins/countries.json';
import metamask from '../plugins/metamask-alternative.webp';
import walletconnect from '../plugins/walletconnect-alternative.webp';
import atmos from '../themes/atmos.json';
import defaultProfile from '../themes/defaultProfile.json';

let opensea = 'https://opensea.io/static/images/logos/opensea.svg'
let runner1 = 'https://thumbs.gfycat.com/AgonizingIllArabianhorse-max-1mb.gif'
let runner2 = 'http://pa1.narvii.com/5771/48e643fe18f6cd88b6feb93d5089033ec95c8e73_00.gif'

declare global {
    interface Window {
        ethereum: any
    }
}

export default function UserProfile() {

    const fire = getFirestore(app)
    const auth = getAuth(app)

    const clipboard = useClipboard()
    const [linkOpen, setLinkOpen] = useState(false)
    const [walletOpen, setWalletOpen] = useState(false)
    const [domain, setDomain] = useState('')
    const [wallet, setWallet] = useState('')
    const [userAge, setUserAge] = useState(Number)
    const [isPin, setIsPin] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [isLink, setIsLink] = useState(false)
    const [isPocket, setIsPocket] = useState(false)
    const [flagOpen, setFlagOpen] = useState(false)
    const [socialOpen, setSocialOpen] = useState(false)
    const [selected, setSelected] = useState<any | null>(false)

    //database input post
    const [usernameValue, setUsernameValue] = useState('')
    const [displayNameValue, setDisplayNameValue] = useState('')
    const [dateValue, setDateValue] = useState<any | null>(Date)
    const [regionValue, setRegionValue] = useState('')
    const [flagValue, setFlagValue] = useState('')
    const [aboutValue, setAboutValue] = useState('')
    const [color, setColor] = useState('')
    const [userUid, setUserUid] = useState<any | null>('')

    //userNFT
    const [biofipProfile, setBiofipProfile] = useState('')
    const [biofipProfileACA, setBiofipProfileACA] = useState('')
    const [biofipProfileTI, setBiofipProfileTI] = useState('')
    const [biofipTheme, setBiofipTheme] = useState('')
    const [biofipThemeACA, setBiofipThemeACA] = useState('')
    const [biofipThemeTI, setBiofipThemeTI] = useState('')

    //error
    const [otherUN, setOtherUN] = useState('')
    const [savedUN, setSavedUN] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [isError, setIsError] = useState(true)


    const useStyle = createStyles((theme) => ({
        card: {
            backgroundColor: theme.colorScheme == 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
            height: '100%',
            width: '100%',
            paddingLeft: '20px',
            paddingRight: '20px'
        },

        icon: {
            marginLeft: '16px',
            transition: 'transform 150ms ease',
            transform: flagOpen ? 'rotate(180deg)' : 'rotate(0deg)',
        }
    }))

    const { classes } = useStyle()






    async function snapShot() {
        await onSnapshot(doc(fire, `users/${userUid}`), (s) => {
            const doc = s.data()
            setWallet(doc?.walletAddress)
            setDomain(doc?.domain)
            setBiofipProfile(doc?.biofipProfile)
            setBiofipProfileACA(doc?.biofipProfileACA)
            setBiofipProfileTI(doc?.biofipProfileTI)
            setBiofipTheme(doc?.biofipTheme)
            setBiofipThemeACA(doc?.biofipThemeACA)
            setBiofipThemeTI(doc?.biofipThemeTI)
        })
    }

    async function snapEditProfile() {
        await onSnapshot(doc(fire, `users/${userUid}`), (s) => {
            const doc = s.data()
            setUsernameValue(doc?.username)
            setDisplayNameValue(doc?.displayName)
            setDateValue(doc?.dateBirth)
            setRegionValue(doc?.region)
            setFlagValue(doc?.regionFlag)
            setColor(doc?.color)
            setAboutValue(doc?.about)
        })
    }





    useEffect(() => {

        onAuthStateChanged(auth, (user) => {
            if (user?.uid == null) {
                setUserUid(null)
            } else {
                setUserUid(user.uid)
            }
        })

        snapShot().catch((e) => Error(e))

    }, [setUserUid, snapShot])










    useEffect(() => {
        function getAge(date) {
            const today = new Date()
            const dateBirth = new Date(date)
            let age = today.getFullYear() - dateBirth.getFullYear()
            const m = today.getMonth() - dateBirth.getMonth()
            if (m < 0 || (m == 0 && today.getDate() < dateBirth.getDate())) {
                age--
            } setUserAge(age)
        } getAge(dateValue)
    }, [setUserAge, dateValue])











    const [displayNameError, setDisplayNameError] = useState('')
    const [dateError, setDateError] = useState('')
    const [aboutError, setAboutError] = useState('')



    //USERNAME INPUT CALLBACK
    useEffect(() => {
        // Username is 5-30 letters, numbers, underscores, and periods. cannot start or end by period
        const regex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{4,29}$/
        const q = query(collection(fire, 'users'), where('username', '==', usernameValue))

        if (usernameValue == '') {
            setIsError(true)
            setUsernameError('Username is required!')
        } else if (!regex.test(usernameValue)) {
            setIsError(true)
            setUsernameError('Invalid username!')
        }

        async function snapS() {
            await onSnapshot(q, (snap) => {
                snap.docs.map((doc) => {
                    setOtherUN(doc.data().username)
                })
            })
        }

        snapS().catch((e) => Error(e))

        async function snapshot() {
            await onSnapshot(doc(fire, `users/${userUid}`), (s) => {
                setSavedUN(s.data()?.username)
            })
        }

        snapshot().catch((e) => Error(e))

        if (savedUN == usernameValue) {
            setIsError(false)
        } else if (otherUN == usernameValue) {
            setIsError(true)
            setUsernameError('Username already exist!')
        }



        if (displayNameValue == '') {
            setIsError(true)
            setDisplayNameError('Display Name is required!')
        }
        if (userAge < 18) {
            setIsError(true)
            setDateError('Age requirements 18+')
        }
        if (aboutValue == '') {
            setIsError(true)
            setAboutError('About is required!')
        }


        return () => {
            setIsError(false)
            setUsernameError('')
            setDisplayNameError('')
            setDateError('')
            setAboutError('')
        }
    }, [displayNameValue, userAge, aboutValue, setDisplayNameError, setDateError, setAboutError, usernameValue, setUsernameError, setIsError, savedUN, otherUN, setSavedUN, setOtherUN])










    useEffect(() => {
        setRegionValue(selected?.name)
        setFlagValue(selected?.image)
    }, [selected, setRegionValue, setFlagValue])










    const data = {
        username: usernameValue,
        domain: `https://biofip.com/${usernameValue}`,
        displayName: displayNameValue,
        dateBirth: dateValue,
        region: regionValue,
        regionFlag: flagValue,
        color: color,
        about: aboutValue
    }

    function writeData() {
        if (isError) {
            alert('Something went wrong')
        } else if (!isError) {
            updateDoc(doc(fire, 'users', userUid), data)
            setIsEdit(false)
            alert('Well done.. Changes saved ✌️😆')
        }
    }



    //user link form
    const [instagram, setInstagram] = useState('')
    const [twitter, setTwitter] = useState<any | null>(false)
    const [facebook, setFacebook] = useState<any | null>(false)
    const [youtube, setYoutube] = useState<any | null>(false)
    const [twitch, setTwitch] = useState<any | null>(false)
    const [snapchat, setSnapchat] = useState<any | null>(false)
    const [tiktok, setTiktok] = useState<any | null>(false)
    const [gmail, setGmail] = useState<any | null>(false)
    const [ymail, setYmail] = useState<any | null>(false)
    const [spotify, setSpotify] = useState<any | null>(false)
    const [whatsapp, setWhatsapp] = useState<any | null>(false)
    const [telegram, setTelegram] = useState<any | null>(false)
    const [line, setLine] = useState<any | null>(false)

    const [track, setTrack] = useState<any | null>(false)
    const [playlist, setPlaylist] = useState<any | null>(false)
    const [discord, setDiscord] = useState<any | null>(false)
    const [custom, setCustom] = useState<any | null>(false)

    const [isError2, setIsError2] = useState(true)

    useEffect(() => {
        if (instagram == '') {
            setIsError2(true)
        } else {
            setIsError2(false)
        }
    }, [instagram, setIsError2])



    async function snapPin() {
        await onSnapshot(doc(fire, `users/${userUid}`), (s) => {
            const doc = s.data()

            setTwitter(doc?.linkTwitter)

            setTrack(doc?.linkTrack)
            setPlaylist(doc?.linkPlaylist)
            setDiscord(doc?.linkDiscord)
            setCustom(doc?.linkCustom)
        })
    }

    async function writePin() {
        await updateDoc(doc(fire, 'users', userUid), {
            linkTrack: track,
            linkPlaylist: playlist,
            linkDiscord: discord,
            linkCustom: custom,
        })
        setIsPin(false)
        setPinTwitter(false)
        setPinTrack(false)
        setPinPLaylist(false)
        alert('Well done.. Changes saved ✌️😆')
    }



    async function snapLink() {
        await onSnapshot(doc(fire, `users/${userUid}`), (s) => {
            const doc = s.data()
            setInstagram(doc?.linkInstagram)
            setTwitter(doc?.linkTwitter)
            setFacebook(doc?.linkFacebook)
            setYoutube(doc?.linkYoutube)
            setTwitch(doc?.linkTwitch)
            setSnapchat(doc?.linkSnapchat)
            setTiktok(doc?.linkTiktok)
            setGmail(doc?.linkGmail)
            setYmail(doc?.linkYmail)
            setSpotify(doc?.linkSpotify)
            setWhatsapp(doc?.linkWhatsapp)
            setTelegram(doc?.linkTelegram)
            setLine(doc?.linkLine)
        })
    }



    const form = {
        linkInstagram: instagram,
        linkTwitter: twitter,
        linkFacebook: facebook,
        linkYoutube: youtube,
        linkTwitch: twitch,
        linkSnapchat: snapchat,
        linkTiktok: tiktok,
        linkGmail: gmail,
        linkYmail: ymail,
        linkSpotify: spotify,
        linkWhatsapp: whatsapp,
        linkTelegram: telegram,
        linkLine: line,
    }

    async function writeLink() {
        await updateDoc(doc(fire, 'users', userUid), form)
        setIsLink(false)
        alert('Well done.. Changes saved ✌️😆')
    }





    const fields = () => (
        <>
            <Group style={{ marginBottom: '16px' }}>
                <Button variant='subtle' radius={'md'} sx={{ paddingLeft: 6, paddingRight: 6 }} leftIcon={<FontAwesomeIcon icon={faInstagram} size={'2x'} />} />
                <Input type='text' onChange={(e) => setInstagram(e.target.value)} defaultValue={instagram} placeholder={'Username'} radius={'md'} sx={{ flex: 1 }} />
                <ActionIcon variant='transparent' sx={{ '* &': { cursor: 'default' } }} />
            </Group>

            {twitter &&
                <Group style={{ marginBottom: '16px' }}>
                    <Button variant='subtle' radius={'md'} sx={{ paddingLeft: 6, paddingRight: 6 }} leftIcon={<FontAwesomeIcon icon={faTwitter} size={'2x'} />} />
                    <Input type='text' onChange={(e) => setTwitter(e.target.value)} defaultValue={twitter == true ? '' : twitter} placeholder={'Username'} radius={'md'} sx={{ flex: 1 }} />
                    <ActionIcon onClick={() => {
                        setTwitter(false)
                    }} color={'red'}><Trash size={16} /></ActionIcon>
                </Group>}


            {facebook &&
                <Group style={{ marginBottom: '16px' }}>
                    <Button variant='subtle' radius={'md'} sx={{ paddingLeft: 6, paddingRight: 6 }} leftIcon={<FontAwesomeIcon icon={faFacebook} size={'2x'} />} />
                    <Input type='url' onChange={(e) => setFacebook(e.target.value)} defaultValue={facebook == true ? '' : facebook} placeholder={'Paste your profile link here'} radius={'md'} sx={{ flex: 1 }} />
                    <ActionIcon onClick={() => {
                        setFacebook(false)
                    }} color={'red'}><Trash size={16} /></ActionIcon>
                </Group>}

            {youtube &&
                <Group style={{ marginBottom: '16px' }}>
                    <Button variant='subtle' radius={'md'} sx={{ paddingLeft: 6, paddingRight: 6 }} leftIcon={<FontAwesomeIcon icon={faYoutube} size={'2x'} />} />
                    <Input type='url' onChange={(e) => setYoutube(e.target.value)} defaultValue={youtube == true ? '' : youtube} placeholder={'Paste your channel link here'} radius={'md'} sx={{ flex: 1 }} />
                    <ActionIcon onClick={() => {
                        setYoutube(false)
                    }} color={'red'}><Trash size={16} /></ActionIcon>
                </Group>}

            {twitch &&
                <Group style={{ marginBottom: '16px' }}>
                    <Button variant='subtle' radius={'md'} sx={{ paddingLeft: 6, paddingRight: 6 }} leftIcon={<FontAwesomeIcon icon={faTwitch} size={'2x'} />} />
                    <Input type='text' onChange={(e) => setTwitch(e.target.value)} defaultValue={twitch == true ? '' : twitch} placeholder={'Username'} radius={'md'} sx={{ flex: 1 }} />
                    <ActionIcon onClick={() => {
                        setTwitch(false)
                    }} color={'red'}><Trash size={16} /></ActionIcon>
                </Group>}

            {snapchat &&
                <Group style={{ marginBottom: '16px' }}>
                    <Button variant='subtle' radius={'md'} sx={{ paddingLeft: 6, paddingRight: 6 }} leftIcon={<FontAwesomeIcon icon={faSnapchat} size={'2x'} />} />
                    <Input type='text' onChange={(e) => setSnapchat(e.target.value)} defaultValue={snapchat == true ? '' : snapchat} placeholder={'Username'} radius={'md'} sx={{ flex: 1 }} />
                    <ActionIcon onClick={() => {
                        setSnapchat(false)
                    }} color={'red'}><Trash size={16} /></ActionIcon>
                </Group>}

            {tiktok &&
                <Group style={{ marginBottom: '16px' }}>
                    <Button variant='subtle' radius={'md'} sx={{ paddingLeft: 6, paddingRight: 6 }} leftIcon={<FontAwesomeIcon icon={faTiktok} size={'2x'} />} />
                    <Input type='text' onChange={(e) => setTiktok(e.target.value)} defaultValue={tiktok == true ? '' : tiktok} placeholder={'Username'} radius={'md'} sx={{ flex: 1 }} />
                    <ActionIcon onClick={() => {
                        setTiktok(false)
                    }} color={'red'}><Trash size={16} /></ActionIcon>
                </Group>}

            {gmail &&
                <Group style={{ marginBottom: '16px' }}>
                    <Button variant='subtle' radius={'md'} sx={{ paddingLeft: 6, paddingRight: 6 }} leftIcon={<FontAwesomeIcon icon={faGoogle} size={'2x'} />} />
                    <Input type='email' onChange={(e) => setGmail(e.target.value)} defaultValue={gmail == true ? '' : gmail} placeholder={'your@gmail.com'} radius={'md'} sx={{ flex: 1 }} />
                    <ActionIcon onClick={() => {
                        setGmail(false)
                    }} color={'red'}><Trash size={16} /></ActionIcon>
                </Group>}

            {ymail &&
                <Group style={{ marginBottom: '16px' }}>
                    <Button variant='subtle' radius={'md'} sx={{ paddingLeft: 6, paddingRight: 6 }} leftIcon={<FontAwesomeIcon icon={faYahoo} size={'2x'} />} />
                    <Input type='email' onChange={(e) => setYmail(e.target.value)} defaultValue={ymail == true ? '' : ymail} placeholder={'your@yahoo.com'} radius={'md'} sx={{ flex: 1 }} />
                    <ActionIcon onClick={() => {
                        setYmail(false)
                    }} color={'red'}><Trash size={16} /></ActionIcon>
                </Group>}

            {spotify &&
                <Group style={{ marginBottom: '16px' }}>
                    <Button variant='subtle' radius={'md'} sx={{ paddingLeft: 6, paddingRight: 6 }} leftIcon={<FontAwesomeIcon icon={faSpotify} size={'2x'} />} />
                    <Input type='url' onChange={(e) => setSpotify(e.target.value)} defaultValue={spotify == true ? '' : spotify} placeholder={'Paste your profile/artist link here'} radius={'md'} sx={{ flex: 1 }} />
                    <ActionIcon onClick={() => {
                        setSpotify(false)
                    }} color={'red'}><Trash size={16} /></ActionIcon>
                </Group>}

            {whatsapp &&
                <Group style={{ marginBottom: '16px' }}>
                    <Button variant='subtle' radius={'md'} sx={{ paddingLeft: 6, paddingRight: 6 }} leftIcon={<FontAwesomeIcon icon={faWhatsapp} size={'2x'} />} />
                    <Input type='text' onChange={(e) => setWhatsapp(e.target.value)} defaultValue={whatsapp == true ? '' : whatsapp} placeholder={'+(Country code) your number'} radius={'md'} sx={{ flex: 1 }} />
                    <ActionIcon onClick={() => {
                        setWhatsapp(false)
                    }} color={'red'}><Trash size={16} /></ActionIcon>
                </Group>}

            {telegram &&
                <Group style={{ marginBottom: '16px' }}>
                    <Button variant='subtle' radius={'md'} sx={{ paddingLeft: 6, paddingRight: 6 }} leftIcon={<FontAwesomeIcon icon={faTelegram} size={'2x'} />} />
                    <Input type='text' onChange={(e) => setTelegram(e.target.value)} defaultValue={telegram == true ? '' : telegram} placeholder={'Username'} radius={'md'} sx={{ flex: 1 }} />
                    <ActionIcon onClick={() => {
                        setTelegram(false)
                    }} color={'red'}><Trash size={16} /></ActionIcon>
                </Group>}

            {line &&
                <Group style={{ marginBottom: '16px' }}>
                    <Button variant='subtle' radius={'md'} sx={{ paddingLeft: 6, paddingRight: 6 }} leftIcon={<FontAwesomeIcon icon={faLine} size={'2x'} />} />
                    <Input type='text' onChange={(e) => setLine(e.target.value)} defaultValue={line == true ? '' : line} placeholder={'Line ID'} radius={'md'} sx={{ flex: 1 }} />
                    <ActionIcon onClick={() => {
                        setLine(false)
                    }} color={'red'}><Trash size={16} /></ActionIcon>
                </Group>}
        </>
    )



    const fill = () => (
        <>

            {!twitter &&
                <Button
                    leftIcon={<FontAwesomeIcon icon={faTwitter} />}
                    variant='subtle'
                    styles={{ root: { width: '100%', display: 'flex' } }}
                    size='md'
                    onClick={() => {
                        setTwitter(true)
                        setSocialOpen(false)
                    }}>
                    Twitter
                </Button>}

            {!facebook &&
                <Button
                    leftIcon={<FontAwesomeIcon icon={faFacebook} />}
                    variant='subtle'
                    styles={{ root: { width: '100%', display: 'flex' } }}
                    size='md'
                    onClick={() => {
                        setFacebook(true)
                        setSocialOpen(false)
                    }}>
                    Facebook
                </Button>}

            {!youtube &&
                <Button
                    leftIcon={<FontAwesomeIcon icon={faYoutube} />}
                    variant='subtle'
                    styles={{ root: { width: '100%', display: 'flex' } }}
                    size='md'
                    onClick={() => {
                        setYoutube(true)
                        setSocialOpen(false)
                    }}>
                    Youtube
                </Button>}

            {!twitch &&
                <Button
                    leftIcon={<FontAwesomeIcon icon={faTwitch} />}
                    variant='subtle'
                    styles={{ root: { width: '100%', display: 'flex' } }}
                    size='md'
                    onClick={() => {
                        setTwitch(true)
                        setSocialOpen(false)
                    }}>
                    Twitch
                </Button>}

            {!snapchat &&
                <Button
                    leftIcon={<FontAwesomeIcon icon={faSnapchat} />}
                    variant='subtle'
                    styles={{ root: { width: '100%', display: 'flex' } }}
                    size='md'
                    onClick={() => {
                        setSnapchat(true)
                        setSocialOpen(false)
                    }}>
                    Snapchat
                </Button>}

            {!tiktok &&
                <Button
                    leftIcon={<FontAwesomeIcon icon={faTiktok} />}
                    variant='subtle'
                    styles={{ root: { width: '100%', display: 'flex' } }}
                    size='md'
                    onClick={() => {
                        setTiktok(true)
                        setSocialOpen(false)
                    }}>
                    Tiktok
                </Button>}

            {!gmail &&
                <Button
                    leftIcon={<FontAwesomeIcon icon={faGoogle} />}
                    variant='subtle'
                    styles={{ root: { width: '100%', display: 'flex' } }}
                    size='md'
                    onClick={() => {
                        setGmail(true)
                        setSocialOpen(false)
                    }}>
                    Google Mail
                </Button>}

            {!ymail &&
                <Button
                    leftIcon={<FontAwesomeIcon icon={faYahoo} />}
                    variant='subtle'
                    styles={{ root: { width: '100%', display: 'flex' } }}
                    size='md'
                    onClick={() => {
                        setYmail(true)
                        setSocialOpen(false)
                    }}>
                    Yahoo Mail
                </Button>}

            {!spotify &&
                <Button
                    leftIcon={<FontAwesomeIcon icon={faSpotify} />}
                    variant='subtle'
                    styles={{ root: { width: '100%', display: 'flex' } }}
                    size='md'
                    onClick={() => {
                        setSpotify(true)
                        setSocialOpen(false)
                    }}>
                    Spotify
                </Button>}

            {!whatsapp &&
                <Button
                    leftIcon={<FontAwesomeIcon icon={faWhatsapp} />}
                    variant='subtle'
                    styles={{ root: { width: '100%', display: 'flex' } }}
                    size='md'
                    onClick={() => {
                        setWhatsapp(true)
                        setSocialOpen(false)
                    }}>
                    Whatsapp
                </Button>}

            {!telegram &&
                <Button
                    leftIcon={<FontAwesomeIcon icon={faTelegram} />}
                    variant='subtle'
                    styles={{ root: { width: '100%', display: 'flex' } }}
                    size='md'
                    onClick={() => {
                        setTelegram(true)
                        setSocialOpen(false)
                    }}>
                    Telegram
                </Button>}

            {!line &&
                <Button
                    leftIcon={<FontAwesomeIcon icon={faLine} />}
                    variant='subtle'
                    styles={{ root: { width: '100%', display: 'flex' } }}
                    size='md'
                    onClick={() => {
                        setLine(true)
                        setSocialOpen(false)
                    }}>
                    Line
                </Button>}
        </>
    )





    //Connect ETH Wallet
    const [walletAddress, setWalletAddress] = useState('')





    //METAMASK
    async function connectWalletMM() {
        if (window.ethereum && window.ethereum.isMetaMask) {
            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then((account) => {
                    accountHandler(account[0])
                    console.log('wallet connected')
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            open('https://metamask.app.link/dapp/biofip.com')
        }
    } const accountHandler = (newAccount) => {
        setWalletAddress(newAccount)
    }





    //WALLETCONNECT
    const provider = new WalletConnectProvider({
        infuraId: "ebff12410fb743b38e88b1808d41eee6", //infura.io
    })

    async function connectWalletWC() {
        await provider.enable().catch((e) => Error(e))
    }



    const [isError3, setIsError3] = useState(true)
    useEffect(() => {
        provider.on("accountsChanged", (accounts) => {
            setWalletAddress(accounts[0]);
            console.log('Walletconnect Connected')
        });
        provider.on("chainChanged", (chainId: number) => {
            console.log(chainId);
        });
        provider.on("disconnect", (code: number, reason: string) => {
            console.log(code, reason);
        });

        if (walletAddress == '') {
            setIsError3(true)
        } else {
            setIsError3(false)
        }
    }, [provider, walletAddress, setWalletAddress, setIsError3])





    const [ewallet, setEwallet] = useState<any | null>(false)
    const [crypto, setCrypto] = useState<any | null>(false)

    function Additional() {
        return (
            <>
                {ewallet &&
                    <>
                        <Center>
                            <Skeleton radius={'xl'} sx={{ width: '50px', height: '3px', borderRadius: '25px' }} />
                        </Center>
                        <Group direction='column' position='center'>
                            <h2>E-Wallet</h2>
                        </Group>
                        <Group style={{ marginBottom: '70px' }}>
                            <Button variant='subtle' radius={'md'} sx={{ paddingLeft: 6, paddingRight: 6 }} leftIcon={<FontAwesomeIcon icon={faPaypal} size={'2x'} />} />
                            <Input autoFocus type='text' onChange={(e) => setEwallet(e.target.value)} defaultValue={ewallet == true ? '' : ewallet} placeholder='Username' radius={'md'} sx={{ flex: 1, width: '100%' }} />
                            <ActionIcon onClick={() => {
                                setEwallet(false)
                            }} color={'red'}><Trash size={16} /></ActionIcon>
                        </Group>
                    </>}



                {crypto &&
                    <>
                        <Center>
                            <Skeleton radius={'xl'} sx={{ width: '50px', height: '3px', borderRadius: '25px' }} />
                        </Center>
                        <Group direction='column' position='center'>
                            <h2>Crypto Wallet</h2>
                        </Group>
                        <Group>
                            <Button variant='subtle' radius={'md'} sx={{ paddingLeft: 6, paddingRight: 6 }} leftIcon={<FontAwesomeIcon icon={faBitcoin} size={'2x'} />} />
                            <Input autoFocus type='text' onChange={(e) => setCrypto(e.target.value)} defaultValue={crypto == true ? '' : crypto} placeholder='Paste your bitcoin address here' radius={'md'} sx={{ flex: 1, width: '100%' }} />
                            <ActionIcon onClick={() => {
                                setCrypto(false)
                            }} color={'red'}><Trash size={16} /></ActionIcon>
                        </Group>
                    </>}
            </>
        )
    }



    const address = {
        walletAddress: walletAddress.toLowerCase(),
        linkPaypal: ewallet,
        bitcoinAddress: crypto
    }

    async function writePocket() {
        await updateDoc(doc(fire, 'users', userUid), address)
        setIsPocket(false)
        alert('Well done.. Changes saved ✌️😆')
    }



    async function snapPocket() {
        await onSnapshot(doc(fire, `users/${userUid}`), (s) => {
            const doc = s.data()
            setWalletAddress(wallet)
            setEwallet(doc?.linkPaypal)
            setCrypto(doc?.bitcoinAddress)
        })
    }





    //resize ref
    const [ref, rect] = useResizeObserver()
    const [ref2, rect2] = useResizeObserver()



    //Get NFT List
    const [nftList, setNftList] = useState<any | null>([])
    const [biofipList, setBiofipList] = useState<any | null>([])

    async function getProfileNft() {
        if (!wallet) { return }

        const options = { method: 'GET', headers: { Accept: 'application/json' } };
        const items = await fetch(`https://api.opensea.io/api/v1/assets?owner=${wallet}&order_direction=desc&limit=200&include_orders=false`, options)
            .then(response => response.json())
            .then(response => {
                return response.assets
            })
            .catch(err => {
                console.error(err)
                return null
            });

        const itemsFilter = items.filter((x) => x.collection.name != "biofip") //except != 'biofip' theme NFT OpenSea release !!!

        if (itemsFilter == 0) {
            alert('your NFT was Empty')
        }

        setNftList(itemsFilter)

    }

    async function getProfileSingle() {
        if (!wallet) { return }

        const options = { method: 'GET' };
        const items = await fetch(`https://api.opensea.io/api/v1/asset/${biofipProfileACA}/${biofipProfileTI}/?include_orders=false`, options)
            .then(response => response.json())
            .catch(err => {
                console.error(err)
                return null
            });

        if (items == 0) {
            alert('your NFT was Empty')
        }

        setProfileNft(items)

    }





    async function getThemeNft() {
        if (!wallet) { return }

        const options = { method: 'GET', headers: { Accept: 'application/json' } };
        const items = await fetch(`https://api.opensea.io/api/v1/assets?owner=${wallet}&order_direction=desc&limit=200&include_orders=false`, options)
            .then(response => response.json())
            .then(response => {
                return response.assets
            })
            .catch(err => {
                console.error(err)
                return null
            });

        const biofipFilter = items.filter((x) => x.collection.name == "biofip") //'biofip' theme NFT OpenSea release !!!

        if (biofipFilter.length == 0) {
            alert('your Biofip NFT was Empty')
        }

        setBiofipList(biofipFilter)

    }

    async function getThemeSingle() {
        if (!wallet) { return }

        const options = { method: 'GET' };
        const items = await fetch(`https://api.opensea.io/api/v1/asset/${biofipThemeACA}/${biofipThemeTI}/?include_orders=false`, options)
            .then(response => response.json())
            .catch(err => {
                console.error(err)
                return null
            });

        if (items == 0) {
            alert('your NFT was Empty')
        }

        setThemeNft(items)

    }





    //IMAGE
    const [hero, setHero] = useState<any | null>(false)
    const [hero2, setHero2] = useState<any | null>(false)
    const [profileNft, setProfileNft] = useState<any | null>(false)
    const [profileLoad, setProfileLoad] = useState(false)
    const [themeNft, setThemeNft] = useState<any | null>(false)
    const [themeLoad, setThemeLoad] = useState(false)

    const [embed, setEmbed] = useState('none')
    const outEmbed = useClickOutside(() => setEmbed('none'))



    const ProfileImg = () => {
        return (
            <motion.img draggable={false} onClick={() => {
                setProfileLoad(true)
                if (biofipProfile == 'https://firebasestorage.googleapis.com/v0/b/biofip-2022.appspot.com/o/Biofip-profile.png?alt=media&token=eb8d01d6-0c2c-47b0-b70a-759aeed82ff0') {
                    setTimeout(() => {
                        setProfileNft(defaultProfile[0])
                        getProfileNft()
                    }, 500);
                } else {
                    setTimeout(() => {
                        getProfileNft()
                        getProfileSingle()
                    }, 500);
                }
            }} layout whileHover={{ cursor: 'pointer', scale: 1.03 }} style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '32px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }} src={biofipProfile ? profileLoad ? runner1 : biofipProfile : runner1} />
        )
    }

    const ThemeImg = () => {
        return (
            <motion.img draggable={false} onClick={() => {
                setThemeLoad(true)
                if (biofipTheme == 'https://firebasestorage.googleapis.com/v0/b/biofip-2022.appspot.com/o/theme_ATMOS.png?alt=media&token=08f0d50c-df9e-496f-bf9f-642cec876a8b') {
                    setTimeout(() => {
                        setThemeNft(atmos[0])
                        getThemeNft()
                    }, 500);
                } else {
                    setTimeout(() => {
                        getThemeNft()
                        getThemeSingle()
                    }, 500);
                }
            }} layout whileHover={{ cursor: 'pointer', scale: 1.03 }} style={{ borderRadius: '24px', width: '100%', maxHeight: '100%', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }} src={biofipTheme ? themeLoad ? runner2 : biofipTheme : runner2} />
        )
    }





    async function writeProfile() {
        await updateDoc(doc(fire, 'users', userUid), {
            biofipProfile: profileNft.image_url,
            biofipProfileACA: profileNft.asset_contract.address,
            biofipProfileTI: profileNft.token_id
        })
        setProfileNft(false)
        setProfileLoad(false)
        alert('Well done.. Changes saved ✌️😆')
    }

    async function writeTheme() {
        await updateDoc(doc(fire, 'users', userUid), {
            biofipTheme: themeNft.image_url,
            biofipThemeACA: themeNft.asset_contract.address,
            biofipThemeTI: themeNft.token_id
        })
        setThemeNft(false)
        setThemeLoad(false)
        alert('Well done.. Changes saved ✌️😆')
    }





    async function domainQr() {
        const googleQr = `https://chart.googleapis.com/chart?chs=500x500&cht=qr&chl=${domain}&choe=UTF-8`
        await setHero2(googleQr)
    }





    const [pinTwitter, setPinTwitter] = useState<any | null>(false)
    const [pinTrack, setPinTrack] = useState<any | null>(false)
    const [pinPlaylist, setPinPLaylist] = useState<any | null>(false)

    async function fetchPin() {
        if (twitter) {

            !pinTwitter && await fetch(`https://twitter-cors.p.rapidapi.com/2/users/by/username/${twitter}?tweet.fields=created_at&user.fields=profile_image_url&expansions=pinned_tweet_id`, {
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

        if (track) {

            !pinTrack && await fetch(`https://opengraph.apiclabs.com/v1/?url=${encodeURIComponent(track)}`)
                .then(res => res.json()).then(x => {
                    setPinTrack(x)
                })

        }

        if (playlist) {

            !pinPlaylist && await fetch(`https://opengraph.apiclabs.com/v1/?url=${encodeURIComponent(playlist)}`)
                .then(res => res.json()).then(x => {
                    setPinPLaylist(x)
                })

        }
    }

    const [errorTrack, setErrorTrack] = useState('')
    const [errorPlaylist, setErrorPlaylist] = useState('')

    useEffect(() => {

        fetchPin().catch((e) => Error(e))

        pinTrack.type != 'music.song' ? setErrorTrack('Invalid url (check after saved)') : setErrorTrack('')

        pinPlaylist.type != 'music.playlist' ? setErrorPlaylist('Invalid url (check after saved)') : setErrorPlaylist('')


    }, [fetchPin, track, playlist, pinTrack, pinPlaylist, setErrorTrack, setErrorPlaylist])










    return (
        <>

            <br />

            <Card style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 1px 5px' }} radius={'xl'} className={classes.card}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <a>{rect.width > 400 ? 'Biofip Domain' : 'Domain'}</a>
                    <Group>
                        <Button onClick={domainQr} variant='light' radius='lg'>
                            {rect.width > 350 ? domain?.length > 20 ? domain?.substring(0, 20) + '...' : domain : domain?.substring(0, 10) + '...'}
                        </Button>
                        <Tooltip label='domain copied!' gutter={10} placement='center' position='bottom' radius='lg' opened={linkOpen}>
                            <ActionIcon variant='light' size={'lg'} radius={'md'}
                                onClick={() => {
                                    clipboard.copy(domain)
                                    setLinkOpen(true)
                                    setTimeout(() => {
                                        setLinkOpen(false)
                                    }, 500);
                                }}>
                                <Copy />
                            </ActionIcon>
                        </Tooltip>
                    </Group>
                </div>

                <div ref={ref} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <a>{rect.width > 400 ? 'Wallet Address' : 'Wallet'}</a>
                    <Group>
                        <Button onClick={() => open(`https://opensea.io/${wallet}`)} variant='light' radius='lg'>
                            {rect.width > 350 ? wallet?.length > 20 ? wallet?.substring(0, 20) + '...' : wallet : wallet?.substring(0, 10) + '...'}
                        </Button>
                        <Tooltip label='address copied!' gutter={10} placement='center' position='bottom' radius='lg' opened={walletOpen}>
                            <ActionIcon variant='light' size={'lg'} radius={'md'}
                                onClick={() => {
                                    clipboard.copy(wallet)
                                    setWalletOpen(true)
                                    setTimeout(() => {
                                        setWalletOpen(false)
                                    }, 500);
                                }}>
                                <Copy />
                            </ActionIcon>
                        </Tooltip>
                    </Group>
                </div>

            </Card>









            <Grid grow style={{ marginBottom: '8px' }}>
                <Grid.Col span={3}>
                    <h3>Biofip Profile</h3>
                    <ProfileImg />
                </Grid.Col>
                <Grid.Col span={1}>
                    <h3>Theme</h3>
                    <ThemeImg />
                </Grid.Col>
            </Grid>

            {profileNft &&
                <div style={{ position: 'fixed', backdropFilter: 'blur(3px)', width: '100%', height: '100%', left: '0%', top: '0%', right: '0%', bottom: '0%', zIndex: 100, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                    <Paper sx={(theme) => ({ backgroundColor: theme.colorScheme == 'dark' ? '' : theme.colors.gray[1] })} radius={'xl'} p={'md'} style={{ position: 'fixed', left: 0, right: 0, bottom: 0, borderBottomLeftRadius: '0px', borderBottomRightRadius: '0px' }}>
                        <div style={{ height: '200px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                            <motion.img draggable={false} onClick={() => setHero(profileNft)} whileHover={{ cursor: 'zoom-in' }} src={profileNft.image_url} style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '16px' }} />
                            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                <Button onClick={() => open(profileNft.permalink)} variant='subtle' radius={'md'} leftIcon={<img draggable={false} src={opensea} width={'20px'} height={'20px'} />}>OpenSea</Button>
                                <Group ml={'md'} position='center'>
                                    <Button onClick={writeProfile} variant='light' radius={'md'}>Save</Button>
                                    <Button onClick={() => {
                                        setProfileNft(false)
                                        setProfileLoad(false)
                                    }} color={'red'} variant='subtle' radius={'md'}>Cancel</Button>
                                </Group>
                            </div>
                        </div>

                        <Center>
                            <Skeleton radius={'xl'} sx={{ width: '50px', height: '3px', borderRadius: '25px', margin: '24px' }} />
                        </Center>

                        <Card radius={'lg'} style={{ width: '100%', maxHeight: '100%', position: 'static' }}>
                            <ScrollArea style={{ height: '300px' }} scrollbarSize={5}>
                                <Group position='center'>
                                    <div style={{ width: '150px', height: '150px' }}>
                                        <motion.img draggable={false} onClick={() => {
                                            setProfileNft(defaultProfile[0])
                                        }} layout whileHover={{ cursor: 'pointer' }} style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '8px' }} src={defaultProfile[0].image_url} />
                                    </div>
                                    {nftList && nftList.map((nft, index) => (
                                        <div key={index} style={{ width: '150px', height: '150px' }}>
                                            <motion.img draggable={false} onClick={() => {
                                                setProfileNft(nft)
                                            }} layout whileHover={{ cursor: 'pointer' }} style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '8px' }} src={nft.image_url} />
                                        </div>
                                    ))}
                                </Group>
                            </ScrollArea>
                        </Card>
                    </Paper>
                </div>}

            {themeNft &&
                <div style={{ position: 'fixed', backdropFilter: 'blur(3px)', width: '100%', height: '100%', left: '0%', top: '0%', right: '0%', bottom: '0%', zIndex: 100, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                    <Paper sx={(theme) => ({ backgroundColor: theme.colorScheme == 'dark' ? '' : theme.colors.gray[1] })} radius={'xl'} p={'md'} style={{ position: 'fixed', left: 0, right: 0, bottom: 0, borderBottomLeftRadius: '0px', borderBottomRightRadius: '0px' }}>
                        <div style={{ height: '200px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                            <motion.img draggable={false} onClick={() => setHero(themeNft)} whileHover={{ cursor: 'zoom-in' }} src={themeNft.image_url} style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '16px' }} />
                            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                <Button onClick={() => open(themeNft.permalink)} variant='subtle' radius={'md'} leftIcon={<img draggable={false} src={opensea} width={'20px'} height={'20px'} />}>OpenSea</Button>
                                <Group ml={'md'} position='center'>
                                    <Button onClick={writeTheme} variant='light' radius={'md'}>Save</Button>
                                    <Button onClick={() => {
                                        setThemeNft(false)
                                        setThemeLoad(false)
                                    }} color={'red'} variant='subtle' radius={'md'}>Cancel</Button>
                                </Group>
                            </div>
                        </div>

                        <Center>
                            <Skeleton radius={'xl'} sx={{ width: '50px', height: '3px', borderRadius: '25px', margin: '24px' }} />
                        </Center>

                        <Card radius={'lg'} style={{ width: '100%', maxHeight: '100%', position: 'static' }}>
                            <ScrollArea style={{ height: '300px' }} scrollbarSize={5}>
                                <Group position='center'>
                                    <div style={{ width: '150px', height: '150px' }}>
                                        <motion.img draggable={false} onClick={() => {
                                            setThemeNft(atmos[0])
                                        }} layout whileHover={{ cursor: 'pointer' }} style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '8px' }} src={atmos[0].image_url} />
                                    </div>
                                    {biofipList && biofipList.map((nft, index) => (
                                        <div key={index} style={{ width: '150px', height: '150px' }}>
                                            <motion.img draggable={false} onClick={() => {
                                                setThemeNft(nft)
                                            }} layout whileHover={{ cursor: 'pointer' }} style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '8px' }} src={nft.image_url} />
                                        </div>
                                    ))}
                                </Group>
                            </ScrollArea>
                        </Card>
                    </Paper>
                </div>}

            {hero &&
                <Hero value={hero} onClick={() => setHero(false)} />}



            {hero2 &&
                <div style={{ position: 'fixed', backdropFilter: 'blur(3px)', width: '100%', height: '100%', left: '0%', top: '0%', right: '0%', bottom: '0%', zIndex: 100, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                    <ScrollArea style={{ maxHeight: '100%' }} scrollbarSize={5}>
                        <motion.img draggable={false} whileHover={{ cursor: 'none' }} onClick={() => setHero2(false)} src={hero2} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                    </ScrollArea>
                </div>}










            <Group ref={ref2} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>



                {isPin ?
                    <Card radius={'xl'} className={classes.card} style={{ paddingTop: '32px', paddingBottom: '32px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>

                        <Center>
                            <Skeleton radius={'xl'} sx={{ width: '50px', height: '3px', borderRadius: '25px', marginTop: '-20px' }} />
                        </Center>

                        <br />

                        {track ?
                            <Group style={{ marginBottom: '16px' }}>
                                <Button variant='subtle' radius={'md'} sx={{ paddingLeft: 6, paddingRight: 6 }} leftIcon={<FontAwesomeIcon icon={faSpotify} size={'2x'} />} />
                                <TextInput error={errorTrack} type='url' onChange={(e) => setTrack(e.target.value)} defaultValue={track == true ? '' : track} placeholder={'Paste your favorite track here'} radius={'md'} sx={{ flex: 1 }} />
                                <ActionIcon onClick={() => setTrack(false)} color={'red'}><Trash size={16} /></ActionIcon>
                            </Group> :
                            <Button leftIcon={<FontAwesomeIcon icon={faSpotify} />} onClick={() => setTrack(true)} m={'lg'} radius={'lg'} variant='light'>Track</Button>}

                        {playlist ?
                            <Group style={{ marginBottom: '16px' }}>
                                <Button variant='subtle' radius={'md'} sx={{ paddingLeft: 6, paddingRight: 6 }} leftIcon={<FontAwesomeIcon icon={faSpotify} size={'2x'} />} />
                                <TextInput error={errorPlaylist} type='url' onChange={(e) => setPlaylist(e.target.value)} defaultValue={playlist == true ? '' : playlist} placeholder={'Paste your playlist link here'} radius={'md'} sx={{ flex: 1 }} />
                                <ActionIcon onClick={() => setPlaylist(false)} color={'red'}><Trash size={16} /></ActionIcon>
                            </Group> :
                            <Button leftIcon={<FontAwesomeIcon icon={faSpotify} />} onClick={() => setPlaylist(true)} m={'lg'} radius={'lg'} variant='light'>Playlist</Button>}

                        {discord ?
                            <Group style={{ marginBottom: '16px' }}>
                                <Button variant='subtle' radius={'md'} sx={{ paddingLeft: 0, paddingRight: 5 }} leftIcon={<FontAwesomeIcon icon={faDiscord} size={'2x'} />} />
                                <Input type='url' onChange={(e) => setDiscord(e.target.value)} defaultValue={discord == true ? '' : discord} placeholder={'Paste your link invitation'} radius={'md'} sx={{ flex: 1 }} />
                                <ActionIcon onClick={() => setDiscord(false)} color={'red'}><Trash size={16} /></ActionIcon>
                            </Group> :
                            <Button leftIcon={<FontAwesomeIcon icon={faDiscord} />} onClick={() => setDiscord(true)} m={'lg'} radius={'lg'} variant='light'>Discord</Button>}

                        {custom ?
                            <Group style={{ marginBottom: '16px' }}>
                                <Button variant='subtle' radius={'md'} sx={{ paddingLeft: 0, paddingRight: 6 }} leftIcon={<FontAwesomeIcon icon={faLink} size={'2x'} />} />
                                <Input type='url' onChange={(e) => setCustom(e.target.value)} defaultValue={custom == true ? '' : custom} placeholder={'Here is your custom link'} radius={'md'} sx={{ flex: 1 }} />
                                <ActionIcon onClick={() => setCustom(false)} color={'red'}><Trash size={16} /></ActionIcon>
                            </Group> :
                            <Button leftIcon={<FontAwesomeIcon icon={faLink} />} onClick={() => setCustom(true)} m={'lg'} radius={'lg'} variant='light'>Custom</Button>}

                        <br />

                        <p>Pinned Tweet <Pin size={20} /><br /><sub>come from your Twitter account</sub></p>

                        {pinTwitter?.data?.profile_image_url ?
                            <Box sx={(theme) => ({ display: 'flex', margin: 16, borderRadius: 24, flexDirection: 'column', backgroundColor: theme.colorScheme == 'dark' ? theme.colors.dark[7] : theme.colors.gray[0] })}>
                                <motion.div onClick={() => open(`https://twitter.com/${twitter}`)} whileHover={{ cursor: 'pointer' }} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8, paddingLeft: 16, paddingRight: 16 }}>
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
                            </Box> :
                            <>
                                <br />
                                <Blockquote><sub style={{ color: 'gray' }}>Please check Twitter Account / Pin your own tweet</sub></Blockquote>
                            </>}

                        <Group>
                            {pinTrack.type == 'music.song' &&
                                <div>
                                    <p>Pinned Track <Pin size={20} /></p>
                                    <Box sx={(theme) => ({ display: 'flex', maxWidth: 400, margin: 16, borderRadius: 24, flexDirection: 'column', backgroundColor: theme.colorScheme == 'dark' ? theme.colors.dark[7] : theme.colors.gray[0] })}>
                                        <img draggable={false} style={{ width: '100%', borderTopLeftRadius: 24, borderTopRightRadius: 24 }} src={pinTrack.image} />
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 4, paddingBottom: 8, paddingLeft: 16, paddingRight: 16 }}>
                                            <Group>
                                                <Music src={pinTrack.audio} />
                                                <motion.div onClick={() => open(pinTrack.url)} whileHover={{ cursor: 'pointer' }} style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <h2 style={{ margin: 0 }}>{pinTrack.title.length > 15 ? pinTrack.title.substring(0, 15) + '...' : pinTrack.title}</h2>
                                                    <p style={{ margin: 0 }}>{pinTrack.description.length > 25 ? pinTrack.description.substring(0, 25) + '...' : pinTrack.description}</p>
                                                </motion.div>
                                            </Group>
                                            <motion.div whileHover={{ cursor: 'pointer' }}><FontAwesomeIcon onClick={() => open(pinTrack.url)} icon={faSpotify} size={'2x'} /></motion.div>
                                        </div>
                                    </Box>
                                </div>}

                            {pinPlaylist.type == 'music.playlist' &&
                                <div>
                                    <p>Pinned Playlist <Pin size={20} /></p>
                                    <Box sx={(theme) => ({ display: 'flex', maxWidth: 400, margin: 16, borderRadius: 24, flexDirection: 'column', backgroundColor: theme.colorScheme == 'dark' ? theme.colors.dark[7] : theme.colors.gray[0] })}>
                                        <img draggable={false} style={{ width: '100%', borderTopLeftRadius: 24, borderTopRightRadius: 24 }} src={pinPlaylist.image} />
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 4, paddingBottom: 8, paddingLeft: 16, paddingRight: 16 }}>
                                            <Group>
                                                <ActionIcon onClick={() => setEmbed('flex')} variant='transparent'>
                                                    <PlayerPlay />
                                                </ActionIcon>
                                                <motion.div onClick={() => open(pinPlaylist.url)} whileHover={{ cursor: 'pointer' }} style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <h2 style={{ margin: 0 }}>{pinPlaylist.title.length > 15 ? pinPlaylist.title.substring(0, 15) + '...' : pinPlaylist.title}</h2>
                                                    <p style={{ margin: 0 }}>{pinPlaylist.description.length > 25 ? pinPlaylist.description.substring(0, 25) + '...' : pinPlaylist.description}</p>
                                                </motion.div>
                                            </Group>
                                            <motion.div whileHover={{ cursor: 'pointer' }}><FontAwesomeIcon onClick={() => open(pinPlaylist.url)} icon={faSpotify} size={'2x'} /></motion.div>
                                        </div>
                                    </Box>
                                </div>}
                        </Group>

                        <Button sx={{ marginTop: 24 }} onClick={writePin} variant='light' radius={'md'}>Save</Button>
                        <Button sx={{ marginLeft: '8px' }} color={'red'} variant='subtle' radius={'md'} onClick={() => {
                            snapPin().catch((e) => Error(e))
                            setIsPin(false)
                        }}>Cancel</Button>

                    </Card> :



                    <Button sx={(theme) => ({ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', backgroundColor: theme.colorScheme == 'dark' ? theme.colors.dark[6] : theme.colors.gray[1] })} onClick={() => {
                        snapPin().catch((e) => Error(e))
                        setIsPin(true)
                    }} variant='light' radius={'lg'}>
                        Pin
                    </Button>}



                <div style={{ position: 'fixed', display: embed, backdropFilter: 'blur(3px)', width: '100%', height: '100%', left: '0%', top: '0%', right: '0%', bottom: '0%', zIndex: 50, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                    <div ref={outEmbed} style={{ position: 'fixed', width: '100%', maxWidth: '1000px', bottom: 0, padding: 16 }}>
                        <iframe src={pinPlaylist.url?.replace('https://open.spotify.com/playlist/', 'https://open.spotify.com/embed/playlist/') + '?utm_source=generator'} style={{ border: 0, borderRadius: 16, width: '100%', height: 380 }} />
                    </div>
                </div>





                {isEdit ?
                    <Card radius={'xl'} className={classes.card} style={{ paddingTop: '32px', paddingBottom: '32px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>

                        <Center>
                            <Skeleton radius={'xl'} sx={{ width: '50px', height: '3px', borderRadius: '25px', marginTop: '-20px' }} />
                        </Center>

                        <br />

                        <InputWrapper description={'Username'} error={usernameError} style={{ marginBottom: '24px' }} >
                            <Input type='text' styles={{ input: { textTransform: 'lowercase' } }} radius={'md'} placeholder='Username' defaultValue={usernameValue} onChange={(e) => setUsernameValue(e.target.value.toLowerCase())} />
                        </InputWrapper>

                        <InputWrapper description={'Display Name'} error={displayNameError} style={{ marginBottom: '24px' }}>
                            <Input type='text' radius={'md'} placeholder='Display Name' defaultValue={displayNameValue} onChange={(e) => setDisplayNameValue(e.target.value)} />
                        </InputWrapper>

                        <DatePicker rightSection={<Calendar />} error={dateError} description={userAge + ' y.o.'} radius={'md'} placeholder={'Date of Birth'} dropdownType={'modal'} style={{ marginBottom: '24px' }} value={new Date(dateValue)} onChange={(val) => setDateValue(val?.toDateString())} />



                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <InputWrapper description={'Region'} style={{ marginBottom: '24px' }}>
                                <Button variant={'default'} radius='md' onClick={() => setFlagOpen(true)} leftIcon={<img draggable={false} src={selected ? selected?.image : flagValue} width={22} height={22} />} rightIcon={<ChevronDown size={16} className={classes.icon} />}>
                                    {selected ? selected?.name : regionValue}
                                </Button>
                            </InputWrapper>

                            <ColorInput styles={{ root: { width: '100%', marginLeft: '8px' } }} onChange={e => setColor(e)} swatchesPerRow={5} description='Theme Color' placeholder='Paste Here' radius={'md'} withPicker={false} value={color}
                                swatches={[
                                    rainbow[0].color,
                                    rainbow[1].color,
                                    rainbow[2].color,
                                    rainbow[3].color,
                                    rainbow[4].color
                                ]} />
                        </div>


                        <Modal styles={{ modal: { margin: '32px' } }} centered radius={'lg'} withCloseButton={false} opened={flagOpen} onClose={() => setFlagOpen(false)}>
                            <ScrollArea style={{ height: '250px' }} scrollbarSize={5}>
                                <Group direction='column'>
                                    {datas.map((item, index) => (
                                        <Button
                                            leftIcon={<img draggable={false} src={item?.image} width={18} height={18} />}
                                            variant='subtle'
                                            styles={{ root: { width: '100%', display: 'flex' } }}
                                            onClick={() => {
                                                setSelected(item)
                                                setFlagOpen(false)
                                            }}
                                            key={index}>
                                            {item?.name}
                                        </Button>
                                    ))}
                                </Group>
                            </ScrollArea>
                        </Modal>

                        <Textarea radius={'md'} error={aboutError} description={'About / Known As'} style={{ marginBottom: '24px' }} defaultValue={aboutValue} onChange={(e) => setAboutValue(e.target.value)} />

                        <Button disabled={isError} variant='light' radius={'md'} onClick={writeData}>Save</Button>
                        <Button sx={{ marginLeft: '8px' }} color={'red'} variant='subtle' radius={'md'} onClick={() => {
                            snapEditProfile().catch((e) => Error(e))
                            setIsEdit(false)
                            return setSelected('')
                        }}>Cancel</Button>

                    </Card> :



                    <Button sx={(theme) => ({ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', backgroundColor: theme.colorScheme == 'dark' ? theme.colors.dark[6] : theme.colors.gray[1] })} onClick={() => {
                        snapEditProfile().catch((e) => Error(e))
                        setIsEdit(true)
                    }} variant='light' radius={'lg'}>
                        Edit Profile
                    </Button>}



                {isLink ?
                    <Card radius={'xl'} className={classes.card} style={{ paddingTop: '32px', paddingBottom: '32px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                        <Center>
                            <Skeleton radius={'xl'} sx={{ width: '50px', height: '3px', borderRadius: '25px', marginTop: '-20px' }} />
                        </Center>
                        <br />
                        {fields()}
                        <Modal styles={{ modal: { margin: '32px' } }} centered radius={'lg'} withCloseButton={false} opened={socialOpen} onClose={() => setSocialOpen(false)}>
                            <ScrollArea style={{ height: '250px' }} scrollbarSize={5}>
                                <Group direction='column'>
                                    {fill()}
                                </Group>
                            </ScrollArea>
                        </Modal>
                        <Group position='center' mt={'xl'}>
                            <Button radius={'md'} variant={'light'} onClick={() => setSocialOpen(true)}>Add Link</Button>
                        </Group>
                        <Button disabled={isError2} sx={{ marginTop: '16px' }} variant='light' radius={'md'} onClick={() => {
                            if (instagram == '') {
                                setIsError2(true)
                            } else {
                                setIsError2(false)
                                writeLink()
                            }
                        }}>Save</Button>
                        <Button sx={{ marginLeft: '8px' }} color={'red'} variant='subtle' radius={'md'} onClick={() => {
                            snapLink().catch((e) => Error(e))
                            setIsLink(false)
                        }}>Cancel</Button>
                    </Card> :



                    <Button sx={(theme) => ({ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', backgroundColor: theme.colorScheme == 'dark' ? theme.colors.dark[6] : theme.colors.gray[1] })} variant='light' radius={'lg'} onClick={() => {
                        snapLink().catch((e) => Error(e))
                        setIsLink(true)
                    }}>
                        {rect2.width > 370 ? 'User Link' : 'Link'}
                    </Button>}



                {isPocket ?
                    <Card radius={'xl'} className={classes.card} style={{ paddingTop: '32px', paddingBottom: '32px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                        <Center>
                            <Skeleton radius={'xl'} sx={{ width: '50px', height: '3px', borderRadius: '25px', marginTop: '-20px' }} />
                        </Center>
                        <Group direction='column' position='center' sx={{ marginBottom: '100px' }}>
                            <h2>Main Wallet</h2>
                            <Player
                                autoplay
                                loop
                                src={tradeCrypto}
                                style={{ height: '300px', width: '300px' }} />
                            <Button onClick={() => clipboard.copy(walletAddress)} variant='subtle' radius='lg'>
                                {walletAddress ? walletAddress.length > 20 ? walletAddress.substring(0, 20) + '...' : walletAddress : '...'}
                            </Button>
                            <Group position='center'>
                                <Button onClick={connectWalletWC} size='md' variant='light' radius={'xl'} leftIcon={<Image width={'25px'} height={'25px'} src={walletconnect} />}>WalletConnect</Button>
                                <Button onClick={connectWalletMM} size='md' variant='light' radius={'xl'} leftIcon={<Image width={'25px'} height={'25px'} src={metamask} />}>MetaMask</Button>
                            </Group>
                        </Group>
                        <Additional />
                        <Group position='center' sx={{ margin: '70px' }}>
                            {!ewallet &&
                                <Button onClick={() => setEwallet(true)} leftIcon={<FontAwesomeIcon icon={faPaypal} />} radius={'lg'} variant={'light'}>Add Paypal</Button>}
                            {!crypto &&
                                <Button onClick={() => setCrypto(true)} leftIcon={<FontAwesomeIcon icon={faBitcoin} />} radius={'lg'} variant={'light'}>Add Bitcoin</Button>}
                        </Group>
                        <Button disabled={isError3} variant='light' radius={'md'} onClick={() => {
                            if (walletAddress == '') {
                                setIsError3(true)
                            } else {
                                setIsError3(false)
                                writePocket()
                            }
                        }}>Save</Button>
                        <Button sx={{ marginLeft: '8px' }} color={'red'} variant='subtle' radius={'md'} onClick={() => {
                            snapPocket().catch((e) => Error(e))
                            setIsPocket(false)
                        }}>Cancel</Button>
                    </Card> :



                    <Button sx={(theme) => ({ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', backgroundColor: theme.colorScheme == 'dark' ? theme.colors.dark[6] : theme.colors.gray[1] })} variant='light' radius={'lg'} onClick={() => {
                        snapPocket().catch((e) => Error(e))
                        setIsPocket(true)
                    }}>
                        {rect2.width > 400 ? 'Pocket Address' : 'Pocket'}
                    </Button>}

            </Group>

        </>
    );
}