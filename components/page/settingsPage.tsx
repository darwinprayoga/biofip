import { faEthereum, faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ActionIcon, Button, Card, Center, Divider, Group, Paper, ScrollArea, Skeleton, Textarea } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getFirestore, onSnapshot, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Album, Apps, Atom2, Barcode, Help, Planet, ShieldCheck, X } from 'tabler-icons-react';

import { app } from '../config/initFirebase';

export default function SettingsPage() {

    const [biofipSocial, setBiofipSocial] = useState(false)
    const [biofipCredits, setBiofipCredits] = useState(false)
    const [biofipHelp, setBiofipHelp] = useState(false)
    const [helpForm, setHelpForm] = useState('')
    const [helpError, setHelpError] = useState(true)

    const [userUid, setUserUid] = useState<any | null>('')
    const auth = getAuth(app)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user == null) {
                setUserUid(null)
            } else {
                setUserUid(user.uid)
            }
        })
    }), [setUserUid]





    //firebase
    const fire = getFirestore(app)

    const [credits, setCredits] = useState<any | null>(false)

    async function snapCredits() {
        onSnapshot(collection(fire, 'credits'), (s) => {
            setCredits(s.docs.map((doc) => doc.data()))
        })
    }

    async function helpSubmit() {
        const now = new Date().toISOString()
        if (helpError == false) {
            await setDoc(doc(fire, 'help', userUid, 'time', now), {
                text: helpForm
            })
            alert('Aight!, Your messages has sent 🤟😏')
            setHelpForm('')
            setBiofipHelp(false)
        } else {
            setHelpError(true)
        }
    }

    const outside = useClickOutside(() => { setBiofipSocial(false) })





    return (
        <>
            <h2>Settings</h2>

            <Card radius={'xl'} sx={(theme) => ({ backgroundColor: theme.colorScheme == 'dark' ? theme.colors.dark[6] : theme.colors.gray[1], height: '100%', width: '100%', paddingLeft: '20px', paddingRight: '20px' })} style={{ paddingTop: '32px', paddingBottom: '32px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>

                <Center>
                    <Skeleton radius={'xl'} sx={{ width: '50px', height: '3px', borderRadius: '25px', marginTop: '-20px' }} />
                </Center>

                <br />

                <Group position='center'>
                    <Button onClick={() => open('/about')} leftIcon={<Atom2 />} size='md' variant='subtle' styles={{ root: { width: '100%', display: 'flex' } }}>About Biofip</Button>
                </Group>
                <Divider my={'sm'} />

                <Group position='center'>
                    <Button onClick={() => setBiofipSocial(true)} leftIcon={<Apps />} size='md' variant='subtle' styles={{ root: { width: '100%', display: 'flex' } }}>Follow Us</Button>
                </Group>
                <Divider my={'sm'} />



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





                <Group position='center'>
                    <Button onClick={() => alert('send me your proposal via biofip.com@gmail.com')} leftIcon={<Planet />} size='md' variant='subtle' styles={{ root: { width: '100%', display: 'flex' } }}>Become Designer</Button>
                </Group>
                <Divider my={'sm'} />

            </Card>

            <Card radius={'xl'} sx={(theme) => ({ backgroundColor: theme.colorScheme == 'dark' ? theme.colors.dark[6] : theme.colors.gray[1], height: '100%', width: '100%', paddingLeft: '20px', paddingRight: '20px' })} style={{ paddingTop: '32px', paddingBottom: '32px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>

                <Center>
                    <Skeleton radius={'xl'} sx={{ width: '50px', height: '3px', borderRadius: '25px', marginTop: '-20px' }} />
                </Center>

                <br />

                <Group position='center'>
                    <Button leftIcon={<Album />} size='md' variant='subtle' styles={{ root: { width: '100%', display: 'flex' } }} onClick={() => open('/tos')}>Terms of Service</Button>
                </Group>
                <Divider my={'sm'} />

                <Group position='center'>
                    <Button leftIcon={<ShieldCheck />} size='md' variant='subtle' styles={{ root: { width: '100%', display: 'flex' } }} onClick={() => open('/pp')}>Privacy Policy</Button>
                </Group>
                <Divider my={'sm'} />

                <Group position='center'>
                    <Button onClick={() => {
                        if (!credits) {
                            snapCredits().catch(e => Error(e))
                                .then(() => setBiofipCredits(true))
                        } else {
                            setBiofipCredits(true)
                        }
                    }} leftIcon={<Barcode />} size='md' variant='subtle' styles={{ root: { width: '100%', display: 'flex' } }}>Credits & Attributions</Button>
                </Group>
                <Divider my={'sm'} />





                {biofipCredits &&
                    <div style={{ position: 'fixed', backdropFilter: 'blur(3px)', width: '100%', height: '100%', left: '0%', top: '0%', right: '0%', bottom: '0%', zIndex: 50, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                        <Paper radius={'xl'} p={'md'} style={{ position: 'fixed', width: '100%', maxWidth: '1000px', bottom: 0, borderBottomLeftRadius: '0px', borderBottomRightRadius: '0px' }}>
                            <Group position='right'>
                                <ActionIcon variant='transparent' onClick={() => setBiofipCredits(false)} color={'red'}><X /></ActionIcon>
                            </Group>
                            <br />
                            <Card radius={'lg'} style={{ width: '100%', maxHeight: '100%', position: 'static' }}>
                                <ScrollArea style={{ height: '500px' }} scrollbarSize={5}>
                                    {credits && credits.map((doc, index) => (
                                        <Group key={index} direction='column'>
                                            <b>{doc.name}</b>
                                            <sub>{doc.link}</sub>
                                            <br />
                                        </Group>
                                    ))}
                                </ScrollArea>
                            </Card>
                        </Paper>
                    </div>}





                <Group position='center'>
                    <Button onClick={() => setBiofipHelp(true)} leftIcon={<Help />} size='md' variant='subtle' styles={{ root: { width: '100%', display: 'flex' } }}>Help Center</Button>
                </Group>
                <Divider my={'sm'} />





                {biofipHelp &&
                    <div style={{ position: 'fixed', backdropFilter: 'blur(3px)', width: '100%', height: '100%', left: '0%', top: '0%', right: '0%', bottom: '0%', zIndex: 50, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                        <Paper radius={'xl'} p={'md'} style={{ position: 'fixed', width: '100%', maxWidth: '1000px', bottom: 0, borderBottomLeftRadius: '0px', borderBottomRightRadius: '0px' }}>
                            <Group position='right'>
                                <ActionIcon variant='transparent' onClick={() => {
                                    setHelpForm('')
                                    setBiofipHelp(false)
                                }} color={'red'}><X /></ActionIcon>
                            </Group>
                            <br />
                            <Group p={'md'}>
                                <Textarea autoFocus value={helpForm} onChange={(e) => setHelpForm(e.target.value)} radius={'md'} description='Fill messages to Biofip' sx={{ flex: 1 }} />
                            </Group>
                            <Group p={'md'} mb={'lg'} position='right'>
                                <Button onClick={() => helpSubmit()} disabled={helpError} variant='light' radius={'md'}>Submit</Button>
                            </Group>
                        </Paper>
                    </div>}





            </Card>
        </>
    )
}