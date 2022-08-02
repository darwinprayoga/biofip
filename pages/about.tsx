import { Player } from '@lottiefiles/react-lottie-player';
import {
    ActionIcon,
    Button,
    Card,
    Center,
    Grid,
    Group,
    Notification,
    Paper,
    ScrollArea,
    Skeleton,
    Textarea,
} from '@mantine/core';
import { useResizeObserver } from '@mantine/hooks';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getFirestore, onSnapshot, setDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import TypeAnimation from 'react-type-animation';
import { Note, X } from 'tabler-icons-react';

import { app } from '../components/config/initFirebase';
import Lottie from '../components/plugins/106298-vr-swag.json';
import { Biofip } from '../components/useNavbar';

export default function About() {

    const [ref, rect] = useResizeObserver();
    const viewport = useRef<HTMLDivElement>(null);

    function scrollTo() {
        viewport.current?.scrollTo({ top: viewport.current.scrollHeight, behavior: 'smooth' })
    }



    //firebase
    const fire = getFirestore(app)
    const auth = getAuth(app)

    const [userUid, setUserUid] = useState('')

    const [comment, setComment] = useState<any | null>(false)
    const [toggle, setToggle] = useState(false)
    const [result, setResult] = useState<any | null>(false)
    const [input, setInput] = useState(false)
    const [inputError, setInputError] = useState(true)
    const [inputText, setInputText] = useState('')

    async function snapComment() {
        onSnapshot(collection(fire, 'comments'), (s) => {
            setComment(s.docs.map((doc) => doc.data()))
        })
    }

    async function commentSubmit() {
        const now = new Date().toISOString()
        if (inputError == false) {
            await setDoc(doc(fire, 'comments', now), {
                text: inputText,
                userUid: userUid
            })
            alert('Awesome, Gotcha dude! 👊😎')
            setInputText('')
            setInput(false)
            setToggle(false)
            scrollTo()
        } else {
            setInputError(true)
        }
    }



    const array = [
        { username: '', biofipProfile: '', text: '' }
    ]
    useEffect(() => {

        onAuthStateChanged(auth, (user) => {
            if (user == null) {
                setUserUid('no uid')
            } else {
                setUserUid(user.uid)
            }
        })

        snapComment().catch((e) => Error(e))

        if (inputText == '') {
            setInputError(true)
        } else {
            setInputError(false)
        }

        comment && comment.map((user) => {

            async function convert(uid) {
                onSnapshot(doc(fire, 'users', uid), (s) => {
                    const res = s.data()
                    array.push({ username: res?.username, biofipProfile: res?.biofipProfile, text: user.text })
                    delete array[0]
                    setTimeout(() => {
                        setResult(array)
                    }, 500);
                })
            }

            convert(user.userUid).catch(e => Error(e)).then(() => {
                setComment(false)
            })
        })

    }, [snapComment, comment, inputText, setInputError, setResult, setToggle])





    return (
        <>
            <Head>
                <title>Biofip - About</title>
            </Head>

            {toggle &&
                <motion.div layout style={{ marginRight: 25, position: 'fixed', top: 'auto', right: '5%', left: 'auto', bottom: '10%', zIndex: 10 }}>
                    <ActionIcon onClick={() => setInput(true)} style={{ padding: '25px' }} variant='filled' radius={'xl'}><Note style={{ position: 'fixed', height: '25px' }} /></ActionIcon>
                </motion.div>}

            <Grid grow>
                <Grid.Col span={5}>
                    <motion.div onDrag={() => setToggle(true)} dragElastic={1} whileHover={{ cursor: 'grab' }} whileTap={{ cursor: 'grabbing' }} drag dragConstraints={{ left: 0, right: 0, bottom: 0, top: 0 }} style={{ backgroundColor: 'white', maxWidth: '367px', boxShadow: '-10px -6px 21px rgba(84, 84, 84, 0.52), 6px 5px 42px rgba(53, 54, 54, 0.36)', borderRadius: '100%', padding: '24px' }}>
                        <Player
                            autoplay
                            loop
                            src={Lottie}
                            style={{ borderRadius: '100%', width: '300px', height: '300px', marginBottom: '16px' }} />
                        <Center>
                            <Biofip style={{ width: '50px' }} />
                        </Center>
                    </motion.div>
                    <h1 style={{ fontFamily: 'Comfortaa' || 'sans-serif' }}>biofip</h1>
                </Grid.Col>

                <Grid.Col span={5}>
                    <Card radius={'xl'} sx={(theme) => ({ backgroundColor: theme.colorScheme == 'dark' ? theme.colors.dark[6] : theme.colors.gray[1], height: '100%', width: '100%', paddingLeft: '20px', paddingRight: '20px' })} style={{ paddingTop: '32px', paddingBottom: '32px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                        <Center>
                            <Skeleton radius={'xl'} sx={{ width: '50px', height: '3px', borderRadius: '25px', marginTop: '-20px' }} />
                        </Center>

                        <div style={{ paddingLeft: '16px', paddingRight: '16px' }}>
                            <TypeAnimation
                                cursor
                                sequence={['So what do you think the Biofip is?', 1000, 'Describe me on a forum below!.', 1000]}
                                wrapper='p'
                                ref={ref}
                                repeat={Infinity} />
                        </div>

                        <Paper radius={'lg'} p={'md'}>

                            <ScrollArea viewportRef={viewport} style={{ height: '500px' }} scrollbarSize={2} offsetScrollbars>
                                {result && result.map((doc, index) => (
                                    <Notification key={index} styles={{ body: { width: rect.width, borderRadius: '16px', padding: '8px', paddingTop: '0px' }, root: { alignItems: 'flex-start', backgroundColor: 'transparent', border: '0', boxShadow: 'unset' }, title: { marginBottom: '8px' } }} mb={'sm'} radius={'lg'}
                                        icon={<motion.img draggable={false} layout whileHover={{ cursor: 'pointer', scale: 2, x: 8, y: 15 }} whileTap={{ cursor: 'pointer', scale: 2, x: 8, y: 10 }} onClick={() => open(`/${doc.username}`)} src={doc.biofipProfile} style={{ borderRadius: '15px', width: '30px' }} />}
                                        title={doc.username} disallowClose>
                                        {doc.text}
                                    </Notification>
                                ))}
                            </ScrollArea>

                        </Paper>
                    </Card>
                </Grid.Col>
            </Grid>

            {input &&
                <div style={{ position: 'fixed', backdropFilter: 'blur(3px)', width: '100%', height: '100%', left: '0%', top: '0%', right: '0%', bottom: '0%', zIndex: 50, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                    <Paper radius={'xl'} p={'md'} style={{ position: 'fixed', width: '100%', maxWidth: '1000px', bottom: 0, borderBottomLeftRadius: '0px', borderBottomRightRadius: '0px' }}>
                        <Group position='right'>
                            <ActionIcon variant='transparent' onClick={() => {
                                setInputText('')
                                setInput(false)
                                setToggle(false)
                            }} color={'red'}><X /></ActionIcon>
                        </Group>
                        <br />
                        <Group p={'md'}>
                            <Textarea autoFocus value={inputText} onChange={(e) => setInputText(e.target.value)} radius={'md'} description='Tell the WORLD about Biofip' sx={{ flex: 1 }} />
                        </Group>
                        <Group p={'md'} mb={'lg'} position='right'>
                            <Button disabled={inputError} onClick={commentSubmit} variant='light' radius={'md'}>Submit</Button>
                        </Group>
                    </Paper>
                </div>}
        </>
    )
}