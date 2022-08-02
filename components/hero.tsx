import { faEthereum } from '@fortawesome/free-brands-svg-icons';
import { faAngleDown, faAngleUp, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ActionIcon, Button, Center, Group, Paper, ScrollArea, Skeleton } from '@mantine/core';
import { collection, getFirestore, onSnapshot, query, where } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { ExternalLink } from 'tabler-icons-react';

import { app } from './config/initFirebase';
import { Biofip } from './useNavbar';

interface Props {
    onClick(): any;
    value: any;
}

let opensea = 'https://opensea.io/static/images/logos/opensea.svg'

export default function Hero({ onClick, value }: Props) {



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
        <div style={{ position: 'fixed', backdropFilter: 'blur(3px)', width: '100%', height: '100%', left: '0%', top: '0%', right: '0%', bottom: '0%', zIndex: 100, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
            <ScrollArea style={{ maxHeight: '100%' }} scrollbarSize={5}>
                <motion.img draggable={false} whileHover={{ cursor: 'not-allowed' }} onClick={() => {
                    onClick()
                    setDrawer(false)
                    setGetUsername(false)
                }} src={value.image_url} style={{ maxWidth: '100%', maxHeight: '100%' }} />
            </ScrollArea>
            <Paper {...swipeUp} radius={'xl'} p={'md'} style={{ position: 'fixed', width: '100%', maxWidth: '1000px', bottom: 0, borderBottomLeftRadius: '0px', borderBottomRightRadius: '0px' }}>

                <Center sx={{ marginTop: '-50px' }}>
                    {drawer ?
                        <ActionIcon onClick={() => {
                            setDrawer(false)
                            setGetUsername(false)
                        }} variant='transparent'><FontAwesomeIcon icon={faAngleDown} /></ActionIcon> :
                        <ActionIcon onClick={() => {
                            convert(value.owner.address)
                                .then(() => setDrawer(true))
                        }} variant='transparent'><FontAwesomeIcon icon={faAngleUp} /></ActionIcon>}
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

            </Paper>
        </div>
    )
}