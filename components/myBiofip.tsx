import { ActionIcon } from '@mantine/core';
import { motion } from 'framer-motion';

import { Biofip } from './useNavbar';

export interface MyBiofipProps {
    onClick?(): void
}

export default function MyBiofip({ onClick }: MyBiofipProps) {


    return (
        <motion.div
            whileTap={{ scale: 1.2, rotate: -720 }}
            whileHover={{ scale: 1.2, rotate: 720 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ ease: 'anticipate' }}>
            <ActionIcon style={{
                padding: 25,
                borderRadius: '100%'
            }} variant={'filled'} onClick={onClick}>
                <Biofip style={{ position: 'fixed', height: '25px' }} />
            </ActionIcon>
        </motion.div>
    )
}