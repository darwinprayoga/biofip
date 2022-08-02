import { faEthereum, faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    ActionIcon,
    Anchor,
    Button,
    Card,
    Center,
    createStyles,
    Divider,
    Grid,
    Group,
    Paper,
    ScrollArea,
    Skeleton,
    Tabs,
} from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getFirestore, onSnapshot } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Planet } from 'tabler-icons-react';

import { app } from '../config/initFirebase';
import Hero from '../hero';
import atmos from '../themes/atmos.json';
import { Biofip } from '../useNavbar';

let opensea = 'https://opensea.io/static/images/logos/opensea.svg'

export default function BiofipTimeline() {

    const [biofipSocial, setBiofipSocial] = useState(false)
    const [biofipCard, setBiofipCard] = useState<any | null>(false)
    const [biofipPage, setBiofipPage] = useState<any | null>(false)
    const [username, setUsername] = useState<any | null>(false)
    const [biofipProfile, setBiofipProfile] = useState<any | null>(false)
    const [userUid, setUserUid] = useState<any | null>('')
    const [hero, setHero] = useState<any | null>(false)
    const [hero2, setHero2] = useState<any | null>(false)

    const fire = getFirestore(app)
    const auth = getAuth(app)

    const outside = useClickOutside(() => {
        setBiofipSocial(false)
    })




    async function getBiofipCard() {

        const options = { method: 'GET', headers: { Accept: 'application/json' } };
        const items = await fetch(`https://api.opensea.io/api/v1/assets?collection=biofip&order_direction=desc&limit=20&include_orders=false`, options)
            .then(response => response.json())
            .then(response => {
                return response.assets
            })
            .catch(err => {
                console.error(err)
                return null
            });

        setBiofipCard(items)

    }





    async function getBiofipPage() {

        const options = { method: 'GET', headers: { Accept: 'application/json' } };
        const items = await fetch(`https://api.opensea.io/api/v1/assets?collection=biofip&order_direction=desc&limit=20&include_orders=false`, options)
            .then(response => response.json())
            .then(response => {
                return response.assets
            })
            .catch(err => {
                console.error(err)
                return null
            });

        setBiofipPage(items)

    }

    async function snap() {
        await onSnapshot(doc(fire, `users/${userUid}`), (s) => {
            const doc = s.data()
            setUsername(doc?.username)
            setBiofipProfile(doc?.biofipProfile)
        })
    }





    useEffect(() => {

        onAuthStateChanged(auth, (user) => {
            if (user == null) {
                setUserUid(null)
            } else {
                setUserUid(user.uid)
            }
        })

        snap().catch((e) => Error(e))

        getBiofipCard().catch((e) => Error(e))
        getBiofipPage().catch((e) => Error(e))

    }, [setUserUid, snap, getBiofipCard, getBiofipPage])











    const useStyle = createStyles((theme) => ({
        container: {
            backgroundColor: theme.colorScheme == 'dark' ? theme.colors.dark[8] : theme.colors.gray[1],
            borderRadius: '32px',
            width: '100%',
            height: '100%',
            padding: '20px'
        },

        card: {
            display: 'flex',
            flexDirection: 'column',
            minWidth: '210px'
        },

        image: {
            objectFit: 'cover',
            width: '100%',
            height: '100%',
            borderRadius: '16px'
        }
    }))

    const { classes } = useStyle()





    return (
        <>

            <div style={{ width: '100%', justifyContent: 'space-between', alignItems: 'center', display: 'flex' }}>
                {username ?
                    <motion.h2 whileHover={{ y: '-5px', cursor: 'none', scale: 1.1 }} whileTap={{ y: '-5px', cursor: 'none', scale: 1.1 }}>{username.length > 20 ? username.substring(0, 20) + '...' : username}</motion.h2> :
                    <motion.h1 whileHover={{ y: '-5px', cursor: 'none', scale: 1.1 }} whileTap={{ y: '-5px', cursor: 'none', scale: 1.1 }}>biofip</motion.h1>}
                {userUid &&
                    <motion.img draggable={false} layout onClick={() => {
                        setBiofipProfile(false)
                        setHero2(biofipProfile)
                    }} style={{ height: '50px', borderRadius: '25px', marginRight: '24px', zIndex: 20, boxShadow: 'rgba(0, 0, 0, 0.24) 0px 1px 5px' }} src={biofipProfile || undefined} whileHover={{ scale: 9, x: -180, y: 200, borderRadius: 0, cursor: 'pointer' }} />}
            </div>

            <Paper className={classes.container}>

                <Center>
                    <Skeleton radius={'xl'} sx={{ width: '50px', height: '3px', borderRadius: '25px' }} />
                </Center>

                <br />

                <Tabs variant={'pills'} tabPadding={'lg'}>
                    <Tabs.Tab label={'Card'}>
                        <Grid grow>
                            <Grid.Col span={1}>
                                <Card p={0} radius={'lg'} className={classes.card}>
                                    <motion.img draggable={false} onClick={() => setHero(atmos[0])} layout whileHover={{ cursor: 'zoom-in', scale: 0.9 }} whileTap={{ cursor: 'zoom-in', scale: 0.9 }} src={atmos[0].image_url} className={classes.image} />
                                    <Group onClick={() => open(atmos[0].permalink)} sx={{ '* &': { cursor: 'pointer' } }} position={'apart'} p={'sm'}>
                                        <sub>{atmos[0].name || '#' + atmos[0].token_id}</sub>
                                        <img src={opensea} width={'25px'} height={'25px'} />
                                    </Group>
                                </Card>
                            </Grid.Col>
                            {biofipCard && biofipCard.map((nft, index) => (
                                <Grid.Col key={index} span={1}>
                                    <Card p={0} radius={'lg'} className={classes.card}>
                                        <motion.img draggable={false} onClick={() => setHero(nft)} layout whileHover={{ cursor: 'zoom-in', scale: 0.9 }} whileTap={{ cursor: 'zoom-in', scale: 0.9 }} src={nft.image_url} className={classes.image} />
                                        <Group onClick={() => open(nft.permalink)} sx={{ '* &': { cursor: 'pointer' } }} position={'apart'} p={'sm'}>
                                            <sub>{nft.name || '#' + nft.token_id}</sub>
                                            <img src={opensea} width={'25px'} height={'25px'} />
                                        </Group>
                                    </Card>
                                </Grid.Col>
                            ))}
                        </Grid>
                    </Tabs.Tab>
                    <Tabs.Tab label={'Page'}>
                        <Grid grow>
                            {biofipPage && biofipPage.map((nft, index) => (
                                <Grid.Col key={index} span={1}>
                                    <Card p={0} radius={'lg'} className={classes.card}>
                                        <motion.img draggable={false} onClick={() => setHero(nft)} layout whileHover={{ cursor: 'zoom-in', scale: 0.9 }} whileTap={{ cursor: 'zoom-in', scale: 0.9 }} src={nft.image_url} className={classes.image} />
                                        <Group onClick={() => open(nft.permalink)} sx={{ '* &': { cursor: 'pointer' } }} position={'apart'} p={'sm'}>
                                            <sub>{nft.name || '#' + nft.token_id}</sub>
                                            <img src={opensea} width={'25px'} height={'25px'} />
                                        </Group>
                                    </Card>
                                </Grid.Col>
                            ))}
                        </Grid>
                    </Tabs.Tab>
                </Tabs>

            </Paper>

            <br />





            <div style={{ width: '100%', padding: '20px', marginBottom: '-16px', borderTopLeftRadius: '32px', borderTopRightRadius: '32px' }}>
                <Grid mb={'xs'} grow>
                    <Grid.Col span={9} mb={'sm'}>
                        <Group>
                            <Anchor size='xs' href='/about'>About</Anchor>•
                            <Anchor size='xs' href='/pp'>Privacy Policy</Anchor>•
                            <Anchor size='xs' href='/tos'>Terms of Service</Anchor>
                        </Group>
                    </Grid.Col>
                    <Grid.Col span={1}>
                        <Button onClick={() => alert('Another languages would coming soon..')} size='xs' mb={'sm'} variant='outline' radius={'md'} leftIcon={<Planet />}>English</Button>
                    </Grid.Col>
                </Grid>
                <Divider mb={'sm'} />
                <Group>
                    <motion.div onClick={() => {
                        setBiofipSocial(true)
                    }} whileHover={{ cursor: 'pointer', scale: 1.1, y: '-1px' }}>
                        <Biofip style={{ width: '24px' }} />
                    </motion.div>
                    <sub>© 2022 Biography For Ideal Page</sub>
                </Group>
            </div>



            {biofipSocial &&
                <div style={{ position: 'fixed', backdropFilter: 'blur(3px)', width: '100%', height: '100%', left: '0%', top: '0%', right: '0%', bottom: '0%', zIndex: 50, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                    <Paper ref={outside} radius={'xl'} p={'md'} style={{ position: 'fixed', width: '100%', maxWidth: '1000px', bottom: 0, borderBottomLeftRadius: '0px', borderBottomRightRadius: '0px' }}>
                        <Center sx={{ marginTop: '-20px' }}>
                            <Skeleton radius={'xl'} sx={{ width: '50px', height: '3px', borderRadius: '25px', margin: '24px' }} />
                        </Center>
                        <Group p={'md'}>
                            <ActionIcon onClick={() => open('https://opensea.io/collection/biofip')} variant='outline' sx={{ padding: '30px' }} radius={'xl'}><FontAwesomeIcon icon={faEthereum} size={'2x'} /></ActionIcon>
                            <ActionIcon onClick={() => open('https://instagram.com/biofip')} variant='outline' sx={{ padding: '30px' }} radius={'xl'}><FontAwesomeIcon icon={faInstagram} size={'2x'} /></ActionIcon>
                            <ActionIcon onClick={() => open('https://facebook.com/BI0FIP')} variant='outline' sx={{ padding: '30px' }} radius={'xl'}><FontAwesomeIcon icon={faFacebookF} size={'2x'} /></ActionIcon>
                            <ActionIcon onClick={() => open('https://twitter.com/BI0FIP')} variant='outline' sx={{ padding: '30px' }} radius={'xl'}><FontAwesomeIcon icon={faTwitter} size={'2x'} /></ActionIcon>
                        </Group>
                    </Paper>
                </div>}





            {hero &&
                <Hero value={hero} onClick={() => {
                    setHero(false)
                }} />}



            {hero2 &&
                <div style={{ position: 'fixed', backdropFilter: 'blur(3px)', width: '100%', height: '100%', left: '0%', top: '0%', right: '0%', bottom: '0%', zIndex: 100, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                    <ScrollArea style={{ maxHeight: '100%' }} scrollbarSize={5}>
                        <motion.img draggable={false} whileHover={{ cursor: 'none' }} onClick={() => {
                            setHero2(false)
                        }} src={hero2} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                    </ScrollArea>
                </div>}





        </>
    )
}