import {
    faFacebook,
    faGoogle,
    faInstagram,
    faLine,
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    ActionIcon,
    Button,
    Card,
    Checkbox,
    ColorInput,
    Grid,
    Group,
    Input,
    InputWrapper,
    Modal,
    Paper,
    ScrollArea,
    Skeleton,
    Stepper,
    Textarea,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useClipboard } from '@mantine/hooks';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getFirestore, onSnapshot, query, setDoc, where } from 'firebase/firestore';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Calendar, ChevronDown, Trash } from 'tabler-icons-react';

import * as rainbow from '../components/plugins/colors.json';
import datas from '../components/plugins/countries.json';
import metamask from '../components/plugins/metamask-alternative.webp';
import walletconnect from '../components/plugins/walletconnect-alternative.webp';
import { app } from './config/initFirebase';

export default function UseRegister() {

    const auth = getAuth(app)
    const [userUid, setUserUid] = useState<any | null>('')

    useEffect(() => {

        onAuthStateChanged(auth, (user) => {
            if (user?.uid == null) {
                setUserUid(null)
            } else {
                setUserUid(user.uid)
            }
        })

    }, [setUserUid])

    const fire = getFirestore(app)
    const [active, setActive] = useState(0)
    const [dateValue, setDateValue] = useState<any | null>(Date)
    const [userAge, setUserAge] = useState(Number)
    const [flagOpen, setFlagOpen] = useState(false)
    const [selected, setSelected] = useState<any | null>(false)
    const [socialOpen, setSocialOpen] = useState(false)
    const clipboard = useClipboard()

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





    //User Link From
    const [usernameValue, setUsernameValue] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [about, setAbout] = useState('')
    const [color, setColor] = useState('#1f4fff')

    const [usernameError, setUsernameError] = useState('')
    const [otherUN, setOtherUN] = useState('')
    const [savedUN, setSavedUN] = useState('')

    const [isError, setIsError] = useState(true)

    //USERNAME INPUT CALLBACK
    useEffect(() => {
        // Username is 5-30 letters, numbers, underscores, and periods. cannot start or end by period
        const regex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{4,29}$/
        const q = query(collection(fire, 'users'), where('username', '==', usernameValue))

        if (!regex.test(usernameValue)) {
            setIsError(true)
            setUsernameError('Invalid username!')
        }

        if (displayName == '') {
            setIsError(true)
        }
        if (userAge < 18) {
            setIsError(true)
        }
        if (selected == false) {
            setIsError(true)
        }
        if (about == '') {
            setIsError(true)
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

        if (usernameValue == '') {
            setIsError(true)
            setUsernameError('Username is required!')
        }

        return () => {
            setIsError(false)
            setUsernameError('')
        }
    }, [usernameValue, displayName, userAge, selected, about, setUsernameError, setIsError, savedUN, otherUN, setSavedUN, setOtherUN])





    const editProfile = () => (
        <>
            <Card radius={'xl'} sx={(theme) => ({ backgroundColor: theme.colorScheme == 'dark' ? theme.colors.dark[6] : theme.colors.gray[1], height: '100%', width: '100%', paddingLeft: '20px', paddingRight: '20px' })}>

                <br />

                <InputWrapper error={usernameError} description={'Username'} style={{ marginBottom: '24px' }} >
                    <Input type='text' styles={{ input: { textTransform: 'lowercase' } }} defaultValue={usernameValue} autoFocus onChange={(e) => setUsernameValue(e.target.value.toLowerCase())} radius={'md'} placeholder='Username' />
                </InputWrapper>

                <InputWrapper description={'Display Name'} style={{ marginBottom: '24px' }}>
                    <Input type='text' defaultValue={displayName} onChange={(e) => setDisplayName(e.target.value)} radius={'md'} placeholder='Display Name' />
                </InputWrapper>

                <DatePicker value={new Date(dateValue)} rightSection={<Calendar />} description={userAge + ' y.o.'} radius={'md'} placeholder={'Date of Birth'} dropdownType={'modal'} style={{ marginBottom: '24px' }} onChange={(val) => setDateValue(val?.toDateString())} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <InputWrapper description={'Region'} style={{ marginBottom: '24px' }}>
                        <Button variant={'default'} radius='md' onClick={() => setFlagOpen(true)} leftIcon={selected ? <img draggable={false} src={selected?.image} width={22} height={22} /> : []} rightIcon={<ChevronDown size={16} style={{ marginLeft: '16px', transition: 'transform 150ms ease', transform: flagOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />}>
                            {selected ? selected?.name : 'Select your country'}
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

                <Textarea defaultValue={about} onChange={(e) => setAbout(e.target.value)} radius={'md'} description={'About / Known As'} style={{ marginBottom: '24px' }} />

            </Card>

            <Group position='right' mt='xl'>
                <Button disabled={isError} radius={'md'} variant='light' onClick={() => {
                    if (usernameValue == '') {
                        setIsError(true)
                    } else if (isError == false) {
                        setActive(1)
                    }
                }}>Next step</Button>
            </Group>
            <br />
        </>
    )





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

    const [isError2, setIsError2] = useState(true)

    useEffect(() => {
        if (instagram == '') {
            setIsError2(true)
        } else {
            setIsError2(false)
        }
    }, [instagram, setIsError2])

    const userLink = () => (
        <>
            <Card radius={'xl'} sx={(theme) => ({ backgroundColor: theme.colorScheme == 'dark' ? theme.colors.dark[6] : theme.colors.gray[1], height: '100%', width: '100%', paddingLeft: '20px', paddingRight: '20px' })}>

                <Group style={{ marginBottom: '16px' }}>
                    <Button variant='subtle' radius={'md'} sx={{ paddingLeft: 6, paddingRight: 6 }} leftIcon={<FontAwesomeIcon icon={faInstagram} size={'2x'} />} />
                    <Input type='text' required onChange={(e) => setInstagram(e.target.value)} defaultValue={instagram} placeholder={'Username'} radius={'md'} sx={{ flex: 1 }} />
                    <ActionIcon variant='transparent' sx={{ '* &': { cursor: 'default' } }} />
                </Group>

                {twitter &&
                    <Group style={{ marginBottom: '16px' }}>
                        <Button variant='subtle' radius={'md'} sx={{ paddingLeft: 6, paddingRight: 6 }} leftIcon={<FontAwesomeIcon icon={faTwitter} size={'2x'} />} />
                        <Input onChange={(e) => setTwitter(e.target.value)} defaultValue={twitter == true ? '' : twitter} placeholder={'Username'} radius={'md'} sx={{ flex: 1 }} />
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


                <Modal styles={{ modal: { margin: '32px' } }} centered radius={'lg'} withCloseButton={false} opened={socialOpen} onClose={() => setSocialOpen(false)}>
                    <ScrollArea style={{ height: '250px' }} scrollbarSize={5}>
                        <Group direction='column'>

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
                        </Group>
                    </ScrollArea>
                </Modal>


                <Group position='center' mt={'xl'}>
                    <Button radius={'md'} variant={'light'} onClick={() => setSocialOpen(true)}>Add Link</Button>
                </Group>

            </Card>
            <Group position='right' mt='xl'>
                <Button radius={'md'} variant='subtle' onClick={() => setActive(0)}>Back</Button>
                <Button disabled={isError2} radius={'md'} variant='light' onClick={() => {
                    if (instagram == '') {
                        setIsError2(true)
                    } else {
                        setIsError2(false)
                        setActive(2)
                    }
                }}>Next step</Button>
            </Group>
            <br />
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



    const pocketAddress = () => (
        <>
            <Card radius={'xl'} sx={(theme) => ({ backgroundColor: theme.colorScheme == 'dark' ? theme.colors.dark[6] : theme.colors.gray[1], height: '100%', width: '100%', paddingLeft: '20px', paddingRight: '20px' })}>
                <Group direction='column' position='center'>
                    <h2>Main Wallet</h2>
                    <Button onClick={() => clipboard.copy(walletAddress)} variant='subtle' radius='lg'>
                        {walletAddress ? walletAddress.length > 20 ? walletAddress.substring(0, 20) + '...' : walletAddress : '...'}
                    </Button>
                    <Group position='center'>
                        <Button onClick={connectWalletWC} size='md' variant='light' radius={'xl'} leftIcon={<Image width={'25px'} height={'25px'} src={walletconnect} />}>WalletConnect</Button>
                        <Button onClick={connectWalletMM} size='md' variant='light' radius={'xl'} leftIcon={<Image width={'25px'} height={'25px'} src={metamask} />}>MetaMask</Button>
                    </Group>
                </Group>
            </Card>
            <Group position='right' mt='xl'>
                <Button radius={'md'} variant='subtle' onClick={() => setActive(1)}>Back</Button>
                <Button disabled={isError3} radius={'md'} variant='light' onClick={() => {
                    if (walletAddress == '') {
                        setIsError3(true)
                    } else {
                        setIsError3(false)
                        setActive(3)
                    }
                }}>Next step</Button>
            </Group>
            <br />
        </>
    )










    //terms&privacy
    const [termsOfService, setTermsOfService] = useState(false)
    const [privacyPolicy, setPrivacyPolicy] = useState(false)

    const [isError4, setIsError4] = useState(true)



    //Firebase Input
    const data = {
        username: usernameValue,
        displayName: displayName,
        dateBirth: dateValue,
        region: selected?.name,
        regionFlag: selected?.image,
        color: color,
        about: about,

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

        linkTrack: false,
        linkPlaylist: false,
        linkDiscord: false,
        linkCustom: false,

        linkPaypal: false,
        bitcoinAddress: false,

        walletAddress: walletAddress.toLowerCase(),
        domain: `https://biofip.com/${usernameValue}`,
        userUid: userUid,

        stateTermsOfService: termsOfService,
        statePrivacyPolicy: privacyPolicy,

        /*

        config: '☑️' 

        (#just for premium/paid feature) 
        */

        biofipProfile: 'https://firebasestorage.googleapis.com/v0/b/biofip-2022.appspot.com/o/Biofip-profile.png?alt=media&token=eb8d01d6-0c2c-47b0-b70a-759aeed82ff0',
        biofipProfileACA: false,
        biofipProfileTI: false,
        //change to default

        biofipTheme: 'https://firebasestorage.googleapis.com/v0/b/biofip-2022.appspot.com/o/theme_ATMOS.png?alt=media&token=08f0d50c-df9e-496f-bf9f-642cec876a8b',
        biofipThemeACA: false,
        biofipThemeTI: false
        //change to default
    }

    async function submitAll() {
        await setDoc(doc(fire, 'users', userUid), data)
        const now = new Date().toISOString()
        await setDoc(doc(fire, 'users', userUid, 'usersFollowed', now), {
            userUid: userUid
        })
        alert('Changes saved')
        location.reload()
    }





    useEffect(() => {
        if (!termsOfService) {
            setIsError4(true)
        } else if (!privacyPolicy) {
            setIsError4(true)
        } else {
            setIsError4(false)
        }
    }, [termsOfService, privacyPolicy, setIsError4])

    const itsDone = () => (
        <>
            <Group direction='column'>
                <sub>Congrats! , you got NEW :</sub>
                <Grid grow>
                    <Grid.Col span={1}>
                        <h3>Biofip Profile</h3>
                        <motion.img draggable={false} layout style={{ maxWidth: '100%', maxHeight: 350, borderRadius: '32px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }} src={'https://firebasestorage.googleapis.com/v0/b/biofip-2022.appspot.com/o/Biofip-profile.png?alt=media&token=eb8d01d6-0c2c-47b0-b70a-759aeed82ff0'} />
                    </Grid.Col>
                    <Grid.Col span={1}>
                        <h3>Theme</h3>
                        <motion.img draggable={false} layout style={{ maxWidth: '100%', maxHeight: 350, borderRadius: '32px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }} src={'https://firebasestorage.googleapis.com/v0/b/biofip-2022.appspot.com/o/theme_ATMOS.png?alt=media&token=08f0d50c-df9e-496f-bf9f-642cec876a8b'} />
                    </Grid.Col>
                </Grid>
                <br />
                <sub>I acknowledge that I have read and agree to :</sub>
                <Group>
                    <Checkbox checked={termsOfService} size='xs' label={<a href='/tos'>Terms of Service</a>} onChange={(e) => setTermsOfService(e.target.checked)} />
                    <Checkbox checked={privacyPolicy} size='xs' label={<a href='/pp'>Privacy Policy</a>} onChange={(e) => setPrivacyPolicy(e.target.checked)} />
                </Group>
            </Group>
            <Group position='right' mt='xl'>
                <Button radius={'md'} variant='subtle' onClick={() => setActive(2)}>Back</Button>
                <Button disabled={isError4} radius={'md'} variant='light' onClick={() => {
                    if (!termsOfService) {
                        setIsError4(true)
                    } else if (!privacyPolicy) {
                        setIsError4(true)
                    } else {
                        setIsError4(false)
                        submitAll()
                    }
                }}>Get it done!</Button>
            </Group>
            <br />
        </>
    )










    return (
        <Paper style={{ position: 'fixed', width: '100%', height: '100%', left: '0%', top: '0%', right: '0%', bottom: '0%', zIndex: 100, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Paper radius={'xl'} p={'md'} style={{ position: 'fixed', width: '100%', maxWidth: '1000px', top: '0%' }}>
                <Group position='center' m={'xs'}>
                    <Skeleton radius={'xl'} sx={{ width: '50px', height: '3px', borderRadius: '25px', marginTop: '-20px' }} />
                </Group>

                <Stepper active={active} onStepClick={setActive} orientation='horizontal'>
                    <Stepper.Step label="Profile" allowStepSelect={false}>
                        {editProfile()}
                    </Stepper.Step>
                    <Stepper.Step label="Link" allowStepSelect={false}>
                        {userLink()}
                    </Stepper.Step>
                    <Stepper.Step label="Pocket" allowStepSelect={false}>
                        {pocketAddress()}
                    </Stepper.Step>
                    <Stepper.Completed>
                        {itsDone()}
                    </Stepper.Completed>
                </Stepper>
            </Paper>
        </Paper>
    )
}