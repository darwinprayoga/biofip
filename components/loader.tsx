import { Player } from '@lottiefiles/react-lottie-player';
import { Group, Paper } from '@mantine/core';
import { useFullscreen } from '@mantine/hooks';
import { collection, getFirestore, onSnapshot } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import * as offlineLottie from '../components/plugins/85379-dragon.json';
import * as loadLottie from '../components/plugins/92445-crypto-bitcoin.json';
import { app } from './config/initFirebase';

export default function Loader({ children }) {

    const [loading, setLoading] = useState(true)
    const [render, setRender] = useState(true)
    const [online, setOnline] = useState(true)

    const { toggle } = useFullscreen();

    const fire = getFirestore(app)

    useEffect(() => {

        setLoading(false)

        onSnapshot(collection(fire, 'users'), (s) => {
            s.forEach((doc) => {
                if (doc.exists()) {
                    setRender(false)
                }
            })
        })

        setOnline(navigator.onLine)

    }, [setLoading, setRender, setOnline])

    const Onload = () => {
        if (online == false) {
            return (
                <>
                    <Paper style={{ position: 'fixed', zIndex: 100, left: '0%', right: '0%', top: '0%', bottom: '0%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Group position='center'>
                            <Player
                                autoplay
                                loop
                                src={offlineLottie}
                                style={{ height: '400px', width: '400px' }} />
                            <h2>You are Offline now.</h2>
                            <sub>ERR_INTERNET_DISCONNECTED</sub>
                        </Group>
                    </Paper>
                </>
            )
        } else if (loading) {
            return (
                <div />
            )
        } else {
            return (
                <>
                    {render &&
                        <Paper onClick={toggle} style={{ position: 'fixed', zIndex: 100, left: '0%', right: '0%', top: '0%', bottom: '0%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Player
                                autoplay
                                loop
                                src={loadLottie}
                                style={{ height: '200px', width: '200px' }} />
                            <motion.sub style={{ margin: 32, marginLeft: 48 }} animate={{ scale: [1, 1.2], transition: { yoyo: Infinity, duration: 1 } }}>Tap Everywhere!</motion.sub>
                        </Paper>}
                    {children}
                </>
            )
        }
    }

    return (
        <Onload />
    )
}