import { ActionIcon } from '@mantine/core';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { PlayerPause, PlayerPlay } from 'tabler-icons-react';

interface Props {
    src: string
}

export default function Music({ src }: Props) {

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



    return (
        <ActionIcon onClick={() => musicToggle(audio)} variant='transparent'>
            {played ?
                <PlayerPause /> :
                <PlayerPlay />}
            <audio ref={audio} autoPlay loop src={src} />
        </ActionIcon>
    )
}