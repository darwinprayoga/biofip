import { Player } from '@lottiefiles/react-lottie-player';
import {
    ActionIcon,
    Button,
    Card,
    Center,
    Group,
    Paper,
    Skeleton,
    TextInput,
    TextInputProps,
    useMantineTheme,
} from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';
import { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { ArrowLeft, ArrowRight, Qrcode, Search } from 'tabler-icons-react';

import * as Lottie from '../plugins/97806-silver-token-transparent.json';

export default function UsernameSearch(props: TextInputProps) {

    const theme = useMantineTheme()
    const [onSearch, setOnSearch] = useState('')

    const [scanModal, setScanModal] = useState(false)
    const outOfModal = useClickOutside(() => setScanModal(false))





    return (
        <>
            <Player
                autoplay
                loop
                src={Lottie}
                style={{ maxWidth: '400px', maxHeight: '400px' }} />
            <br />
            <TextInput
                icon={<Search size={18} />}
                autoFocus
                type='search'
                onKeyDown={(e) => {
                    if (e.key == 'Enter') {
                        location.href = `/${onSearch.toLowerCase()}`
                    }
                }}
                onChange={(e) => setOnSearch(e.target.value)}
                variant='filled'
                radius='xl'
                size='md'
                styles={{ input: { textTransform: 'lowercase' } }}
                style={{ width: '70%' }}
                rightSection={
                    <ActionIcon onClick={() => location.href = `/${onSearch.toLowerCase()}`} size={32} radius="xl" color={theme.primaryColor} variant="filled">
                        {theme.dir === 'ltr' ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}
                    </ActionIcon>
                }
                placeholder='Search username'
                rightSectionWidth={42}
                {...props} />





            <br />





            <Group spacing={'xl'} position='center'>
                <Button onClick={() => setScanModal(true)} radius={'md'} variant='subtle' leftIcon={<Qrcode />}>Scan QR</Button>
            </Group>



            {scanModal &&
                <div style={{ position: 'fixed', backdropFilter: 'blur(3px)', width: '100%', height: '100%', left: '0%', top: '0%', right: '0%', bottom: '0%', zIndex: 100, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                    <Paper ref={outOfModal} radius={'xl'} p={'md'} style={{ position: 'fixed', width: '100%', maxWidth: '500px', bottom: 0, borderBottomLeftRadius: '0px', borderBottomRightRadius: '0px' }}>

                        <Center sx={{ marginTop: '-20px' }}>
                            <Skeleton radius={'xl'} sx={{ width: '50px', height: '3px', borderRadius: '25px', margin: '24px' }} />
                        </Center>

                        <Card radius={'lg'} style={{ width: '100%', maxHeight: '100%', position: 'static', padding: '0px' }}>
                            <Group position='center'>
                                <QrReader
                                    scanDelay={300}
                                    containerStyle={{ width: '100%' }}
                                    constraints={{ facingMode: 'environment' }}
                                    onResult={(result, error) => {
                                        if (result) {
                                            setScanModal(false)
                                            location.href = result?.getText()
                                        } else if (error) {
                                            return false
                                        }
                                    }} />
                            </Group>
                        </Card>
                    </Paper>
                </div>}
        </>
    )
}