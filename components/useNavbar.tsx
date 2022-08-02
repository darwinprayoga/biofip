import { faAngleDown, faAngleLeft, faAngleRight, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Player } from '@lottiefiles/react-lottie-player';
import {
  ActionIcon,
  Button,
  Card,
  Center,
  createStyles,
  Group,
  Kbd,
  Navbar,
  Paper,
  ScrollArea,
  Skeleton,
  UnstyledButton,
} from '@mantine/core';
import { useClickOutside, useDisclosure, useFullscreen, useHotkeys, useOs, useResizeObserver } from '@mantine/hooks';
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { collection, doc, getFirestore, onSnapshot } from 'firebase/firestore';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import {
  Gauge,
  Icon as TablerIcon,
  Login,
  Logout,
  Maximize,
  Qrcode,
  Search,
  Settings,
  User,
  Users,
  X,
} from 'tabler-icons-react';

import * as Lottie from '../components/plugins/81487-yummi-nft-cards.json';
import * as defaultProfile from '../components/themes/defaultProfile.json';
import { app } from './config/initFirebase';
import Hero from './hero';
import MyBiofip from './myBiofip';
import BiofipTimeline from './page/biofipTimeline';
import SettingsPage from './page/settingsPage';
import UsernameSearch from './page/usernameSearch';
import UserProfile from './page/userProfile';
import google from './plugins/Google-logo.png';
import meta from './plugins/Meta-logo.png';
import Switcher from './switcher';
import UseRegister from './useRegister';



interface Props {
  style?: any
}

export const Biofip = ({ style }: Props) => {
  return (
    <svg style={style} fill='currentcolor' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 441.17"><g id="Layer_2" data-name="Layer 2"><g id="Layer_5" data-name="Layer 5"><path d="M434.14,158.65a117,117,0,0,0-43.25-43.25Q363.5,99.54,328.73,99.54q-33.9,0-61.07,15.64A116.12,116.12,0,0,0,225.25,157a115.55,115.55,0,0,0-41-41.61q-26.52-15.86-60-15.86-29.13,0-52.81,12.38t-38,32.82V17q0-7.81-4.57-12.39T17,0Q9.14,0,4.56,4.56T0,17V222.11Q.43,256,16.3,283.18a116.13,116.13,0,0,0,43,42.81q27.17,15.64,61.07,15.65,34.77,0,62.15-15.87a117.56,117.56,0,0,0,25.78-20.11V424.22q0,7.83,4.57,12.39t12.38,4.56q7.4,0,12-4.56t4.56-12.39V296.43q14.34,20.44,38,32.82t52.81,12.39q33.47,0,60-15.87a115.58,115.58,0,0,0,41.94-43.25Q450,255.15,450,220.8,450,186,434.14,158.65ZM165.6,299.26q-20,12-45.2,11.95-24.78,0-44.77-11.95a85.09,85.09,0,0,1-31.3-32.38Q33,246.45,33,220.37q0-25.63,11.3-46.29a83.09,83.09,0,0,1,31.3-32.38Q95.61,130,120.4,130q25.2,0,45.2,11.74a84.69,84.69,0,0,1,31.52,32.38,89.93,89.93,0,0,1,10.42,31.32h-9.39a16,16,0,0,0-11.73,4.78,16.45,16.45,0,0,0-4.78,12.17,16.32,16.32,0,0,0,16.51,16.52h8.9a88.16,88.16,0,0,1-9.93,28A86.77,86.77,0,0,1,165.6,299.26Zm239.85-32.17a84.7,84.7,0,0,1-31.51,32.39q-20,11.73-45.21,11.73-24.78,0-44.77-11.73a83,83,0,0,1-31.29-32.39,90.07,90.07,0,0,1-9.78-28.22H300.3a16.47,16.47,0,0,0,12.16-4.78,16,16,0,0,0,4.79-11.74A16.37,16.37,0,0,0,300.3,205.4H242.47a89.64,89.64,0,0,1,10.2-31.1A85.08,85.08,0,0,1,284,141.91Q304,130,328.73,130q25.2,0,45.21,11.95a86.84,86.84,0,0,1,31.51,32.39Q417,194.73,417,220.8,417,246.45,405.45,267.09Z" /><path d="M121.92,195a25.59,25.59,0,0,0-25.21,25.65,25.23,25.23,0,0,0,25.21,25.21,23.76,23.76,0,0,0,18-7.61,25.45,25.45,0,0,0-.22-35.64A24,24,0,0,0,121.92,195Z" /></g></g></svg>
  )
}

const useStyles = createStyles((theme) => ({

  grid: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'fixed',
    left: 'auto',
    top: '0%',
    right: '0%',
    bottom: '0%',
    zIndex: 30
  },

  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
    },
  },

  active: {
    '&, &:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[8]
          : theme.colors[theme.primaryColor][0],
      color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 7],
    },
  },

  modal: {
    backgroundColor: theme.colorScheme == 'dark' ? theme.colors.dark[7] : theme.white,
    padding: '32px',
    margin: '32px',
    borderRadius: '32px'
  }
}));

interface NavbarLinkProps {
  icon: TablerIcon;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, active, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <UnstyledButton onClick={onClick} className={cx(classes.link, { [classes.active]: active })}>
      <Icon />
    </UnstyledButton>
  );
}

export interface UseNavbarProps {
  isBiofip?: boolean
}

export default function UseNavbar({ isBiofip }: UseNavbarProps) {
  const [active, setActive] = useState(0);
  const [mockData, setMockData] = useState<any | null>([])
  const [opened, handlers] = useDisclosure(false)
  const [modalOpened, setModalOpened] = useState(false)
  const [biofip, setBiofip] = useState(false)
  const { classes } = useStyles();

  const [ref, rect] = useResizeObserver();
  const [ref2, rect2] = useResizeObserver();



  const { toggle } = useFullscreen()





  //SHOW MYBIOFIP?
  useEffect(() => {
    if (isBiofip == true) {
      setBiofip(true)
    } else if (isBiofip == false) {
      setBiofip(false)
    }
  }, [setBiofip])





  //FIREBASE
  const auth = getAuth(app)
  const fire = getFirestore(app)
  const [isUser, setIsUser] = useState(false)
  const [userUid, setUserUid] = useState<any | null>('')

  async function googleLogIn() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider).catch((e) => console.log(e)).then(() => {
      setModalOpened(false)
      handlers.close()
    })
  }
  async function googleLogOut() {
    await signOut(auth).catch((e) => console.log(e)).then(() => {
      handlers.close()
      location.reload()
    })
  }
  async function fbLogin() {
    const provider = new FacebookAuthProvider()
    await signInWithPopup(auth, provider).catch((e) => console.log(e)).then(() => {
      setModalOpened(false)
      handlers.close()
    })
  }





  const [popOpen, setPopOpen] = useState(false)
  const [username, setUsername] = useState<any | null>(false)
  const [biofipProfile, setBiofipProfile] = useState<any | null>(false)
  const [biofipProfileACA, setBiofipProfileACA] = useState<any | null>(false)
  const [biofipProfileTI, setBiofipProfileTI] = useState<any | null>(false)
  const [domain, setDomain] = useState<any | null>(false)
  const [hero, setHero] = useState<any | null>(false)
  const [hero2, setHero2] = useState<any | null>(false)
  const [userFollowed, setUserFollowed] = useState(false)



  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user == null) {
        setIsUser(false)
        setUserUid(null)
        setMockData([
          { icon: Gauge },
          { icon: Search }
        ])
      } else {
        setIsUser(true)
        setUserUid(user.uid)
        setMockData([
          { icon: Gauge },
          { icon: Search },
          { icon: User },
          { icon: Settings }
        ])
      }
    })
  }, [setIsUser, setMockData, setUserUid])



  async function snapUser() {
    await onSnapshot(doc(fire, `users/${userUid}`), (s) => {
      const doc = s.data()
      setUsername(doc?.username)
      setBiofipProfile(doc?.biofipProfile)
      setBiofipProfileACA(doc?.biofipProfileACA)
      setBiofipProfileTI(doc?.biofipProfileTI)
      setDomain(doc?.domain)
    })
  }



  useEffect(() => {
    snapUser().catch((e) => Error(e))
  }, [snapUser])










  async function openMyBiofip() {
    snapUser().catch((e) => Error(e)).then(() => {
      if (isUser) {
        if (popOpen) {
          location.href = `/${username}`
        } else {
          setPopOpen(true)
          snapFriends().catch((e) => Error(e))
        }
      } else {
        alert(`its " My Biofip " toggle, so you need to Login!`)
        setModalOpened(true)
      }
    })

    return () => {
      setUsername(false)
      setBiofipProfile(false)
      setDomain(false)
    }
  }

  async function domainQr() {
    const googleQr = `https://chart.googleapis.com/chart?chs=500x500&cht=qr&chl=${domain}&choe=UTF-8`
    await setHero2(googleQr)
  }





  //NAVIGATION
  const pageOn = () => {
    if (active == 0) {
      return (
        <BiofipTimeline />
      )
    } else if (active == 1) {
      return (
        <UsernameSearch />
      )
    } else if (active == 2) {
      return (
        <UserProfile />
      )
    } else if (active == 3) {
      return (
        <SettingsPage />
      )
    }
  }

  const links = mockData.map((link, index) => (
    <NavbarLink
      {...link}
      key={index}
      active={index == active}
      onClick={() => {
        setActive(index)
      }}
    />
  ));

  const clickOutsideRef = useClickOutside(() => { handlers.close() });
  const outOfModal = useClickOutside(() => { setModalOpened(false) });
  const outOfToggle = useClickOutside(() => { setPopOpen(false) });

  const os = useOs()

  const navKeys = () => {
    if (os == 'windows' && 'macos' && 'linux') {
      return (
        <div style={{ margin: 10, position: 'fixed', top: '0%', right: '0%', left: 'auto', bottom: 'auto' }}>
          <Kbd>Ctrl</Kbd>+<Kbd>X</Kbd>
        </div>
      )
    }
  }

  useHotkeys([
    ['ctrl+X', () => handlers.toggle()]
  ])



  //is user register
  const [register, setRegister] = useState(false)

  async function snapRegister() {
    onSnapshot(doc(fire, `users/${userUid}`), (s) => {
      const doc = s.data()
      if (doc?.username == undefined) {
        setRegister(true)
      } else {
        setRegister(false)
      }
    })
  }

  useEffect(() => {

    if (isUser) {
      snapRegister().catch((e) => Error(e))
    }

  }, [snapRegister])










  //Friends list

  const data = [
    { username: '', biofipProfile: '', biofipProfileACA: '', biofipProfileTI: '' }
  ]

  const [result, setResult] = useState<any | null>(false)
  const [userSelect, setUserSelect] = useState<any | null>(false)
  const [usersList, setUsersList] = useState(false)

  const [list, setList] = useState<any | null>(false)

  async function snapFriends() {
    await onSnapshot(collection(fire, `users/${userUid}/usersFollowed`), (s) => {
      setList(s.docs.map((doc) => doc.data()))
    })
  }



  useEffect(() => {

    list && list.map((user) => {

      async function convert(uid) {
        onSnapshot(doc(fire, 'users', uid), (s) => {
          const res = s.data()
          data.push({ username: res?.username, biofipProfile: res?.biofipProfile, biofipProfileACA: res?.biofipProfileACA, biofipProfileTI: res?.biofipProfileTI })
          delete data[0]
          setTimeout(() => {
            setResult(data)
          }, 500);
        })
      }

      convert(user.userUid).catch(e => Error(e)).then(() => {
        setList(false)
      })
    })

  }, [list, data, setResult])



  const swipeIt = useSwipeable({
    onSwipedUp: () => setUsersList(true),
    onSwipedDown: () => setUsersList(false)
  })

  const showNavbar = useSwipeable({
    onSwipedLeft: () => handlers.open()
  })



  function Friends() {

    return (
      <>
        {result && result.map((data, index) => (
          <Group key={index} mb={'md'} position='center'>
            <Button onClick={() => setUserSelect(data)} size='md' variant='subtle' leftIcon={<img draggable={false} src={data.biofipProfile} style={{ borderRadius: '15px', width: '30px' }} />} styles={{ root: { width: '100%', display: 'flex' }, leftIcon: { marginRight: '32px' } }}>
              {data.username}
            </Button>
          </Group>
        ))}
      </>
    )
  }



  async function getProfileSingle() {

    const options = { method: 'GET' };
    const items = await fetch(`https://api.opensea.io/api/v1/asset/${userSelect.biofipProfileACA}/${userSelect.biofipProfileTI}/?include_orders=false`, options)
      .then(response => response.json())
      .catch(err => {
        console.error(err)
        return null
      });

    if (items == 0) {
      alert('your NFT was Empty')
    }

    setHero(items)

  }

  async function getProfileSingleOwn() {

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

    setHero(items)

  }





  async function getSelect() {
    if (userSelect.biofipProfile == 'https://firebasestorage.googleapis.com/v0/b/biofip-2022.appspot.com/o/Biofip-profile.png?alt=media&token=eb8d01d6-0c2c-47b0-b70a-759aeed82ff0') {
      setTimeout(() => {
        setHero(defaultProfile[0])
      }, 500);
    } else {
      setTimeout(() => {
        getProfileSingle()
      }, 500);
    }
  }

  async function getOwn() {
    if (biofipProfile == 'https://firebasestorage.googleapis.com/v0/b/biofip-2022.appspot.com/o/Biofip-profile.png?alt=media&token=eb8d01d6-0c2c-47b0-b70a-759aeed82ff0') {
      setTimeout(() => {
        setHero(defaultProfile[0])
      }, 500);
    } else {
      setTimeout(() => {
        getProfileSingleOwn()
      }, 500);
    }
  }










  return (
    <>



      {register && <UseRegister />}



      <Group {...showNavbar} position='center' direction='column'>

        {pageOn()}
        {navKeys()}

      </Group>



      {opened &&
        <motion.div style={{ position: 'fixed', backdropFilter: 'blur(3px)', width: '100%', height: '100%', left: '0%', top: '0%', right: '0%', bottom: '0%', zIndex: 30, backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: 'linear' }} />}

      {biofip &&
        <div ref={outOfToggle} style={{ marginRight: 25, position: 'fixed', top: 'auto', right: '5%', left: 'auto', bottom: '10%' }}>
          {popOpen &&
            <>
              <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 1.2 }} initial={{ y: 95, scale: 0.1 }} animate={{ y: 0, scale: 1 }} transition={{ ease: 'easeOut' }}>
                <ActionIcon onClick={() => {
                  if (!result) {
                    snapFriends().catch((e) => Error(e)).then(() => setUserFollowed(true))
                  } else {
                    setUserFollowed(true)
                  }
                }} sx={{ marginBottom: 15, padding: 25, borderRadius: '100%' }} variant='filled'><Users style={{ position: 'fixed' }} /></ActionIcon>
              </motion.div>
              <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 1.2 }} initial={{ y: 55 }} animate={{ y: 0 }} transition={{ ease: 'easeOut' }}>
                <ActionIcon onClick={domainQr} sx={{ marginBottom: 15, padding: 25, borderRadius: '100%' }} variant='filled'><Qrcode style={{ position: 'fixed' }} /></ActionIcon>
              </motion.div>
            </>}
          <MyBiofip onClick={openMyBiofip} />
        </div>}

      {hero &&
        <Hero value={hero} onClick={() => setHero(false)} />}



      {hero2 &&
        <div style={{ position: 'fixed', backdropFilter: 'blur(3px)', width: '100%', height: '100%', left: '0%', top: '0%', right: '0%', bottom: '0%', zIndex: 100, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          <ScrollArea style={{ maxHeight: '100%' }} scrollbarSize={5}>
            <motion.img draggable={false} whileHover={{ cursor: 'none' }} onClick={() => setHero2(false)} src={hero2} style={{ maxWidth: '100%', maxHeight: '100%' }} />
          </ScrollArea>
        </div>}





      {userFollowed &&
        <div style={{ position: 'fixed', backdropFilter: 'blur(3px)', width: '100%', height: '100%', left: '0%', top: '0%', right: '0%', bottom: '0%', zIndex: 50, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          <Paper sx={(theme) => ({ backgroundColor: theme.colorScheme == 'dark' ? '' : theme.colors.gray[1] })} ref={ref2} radius={'xl'} p={'md'} style={{ position: 'fixed', width: '100%', maxWidth: '1000px', bottom: 0, borderBottomLeftRadius: '0px', borderBottomRightRadius: '0px' }}>

            <div {...swipeIt}>
              <div style={{ height: rect2.width > 470 ? '300px' : '200px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <motion.img draggable={false} whileHover={{ cursor: 'zoom-in' }} onClick={() => {
                  if (userSelect) {
                    getSelect()
                  } else {
                    getOwn()
                  }
                }} src={userSelect ? userSelect.biofipProfile : biofipProfile} style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '16px' }} />
                <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginLeft: '16px' }}>
                  <Group position='right'>
                    <ActionIcon variant='transparent' onClick={() => setUserFollowed(false)} color={'red'}><X /></ActionIcon>
                  </Group>
                  <Group position='center'>
                    <Button onClick={() => location.href = `/${userSelect ? userSelect.username : username}`} size='md' variant='light' radius={'lg'} leftIcon={<Biofip style={{ position: 'static', height: '30px' }} />}>Biofip</Button>
                  </Group>
                </div>
              </div>

              <h2>{userSelect ? userSelect.username : username}</h2>

              {usersList ?
                <motion.div initial={{ y: '50vh' }} animate={{ y: '0vh' }} transition={{ ease: 'backOut' }}>

                  <Group mb={'md'} position='center'>
                    <ActionIcon variant='transparent' radius={'lg'} onClick={() => setUsersList(false)}><FontAwesomeIcon icon={faAngleDown} /></ActionIcon>
                  </Group>

                  <Card radius={'lg'} style={{ width: '100%', maxHeight: '100%', position: 'static' }}>
                    <ScrollArea style={{ height: '200px' }} scrollbarSize={5}>
                      <Friends />
                    </ScrollArea>
                  </Card>

                </motion.div> :
                <Group m={'xl'} position='center'>
                  <ActionIcon variant='transparent' radius={'lg'} onClick={() => setUsersList(true)}><FontAwesomeIcon icon={faAngleUp} /></ActionIcon>
                </Group>}
            </div>

          </Paper>
        </div>}





      <div className={classes.grid}>

        {opened ?
          <>
            <motion.nav
              style={{ height: '100%', display: 'flex', alignItems: 'center' }}
              initial={{ x: '50vh' }}
              animate={{ x: '0vh' }}
              exit={{ x: '50vh' }}
              transition={{ ease: 'backIn' }}>
              <ActionIcon variant='transparent' onClick={() => handlers.close()}><FontAwesomeIcon icon={faAngleRight} /></ActionIcon>
              <Navbar style={{ border: '0px', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px' }} ref={clickOutsideRef} position={{ right: 0 }} height={'100%'} width={{ base: 80 }} p="md">
                <br />
                <Center onClick={() => location.href = '/about'}>
                  <Biofip />
                </Center>
                <Navbar.Section grow mt={120}>
                  <Group onClick={() => handlers.toggle()} direction="column" align="center" spacing={0}>
                    {links}
                  </Group>
                </Navbar.Section>
                <Navbar.Section>
                  <Group position='center' sx={{ marginBottom: '50px' }}>
                    <NavbarLink icon={Maximize} onClick={toggle} />
                  </Group>
                  <Group direction="column" align="center" spacing={'md'}>
                    <Switcher />
                    {isUser ?
                      <NavbarLink icon={Logout} onClick={googleLogOut} /> :
                      <NavbarLink icon={Login} onClick={() => {
                        setModalOpened(true)
                        handlers.close()
                      }} />}
                  </Group>
                  <br />
                </Navbar.Section>
              </Navbar>
            </motion.nav>
          </> :
          <ActionIcon sx={{ padding: 16 }} variant='transparent' onClick={() => {
            if (isUser) {
              snapRegister().catch((e) => Error(e)).then(() => {
                handlers.open()
              })
            } else {
              handlers.open()
            }
          }}><FontAwesomeIcon icon={faAngleLeft} /></ActionIcon>}

      </div>

      {modalOpened &&
        <motion.div ref={ref} style={{ position: 'fixed', backdropFilter: 'blur(3px)', width: '100%', height: '100%', left: '0%', top: '0%', right: '0%', bottom: '0%', zIndex: 100, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: 'linear' }}>
          <motion.div className={classes.modal} ref={outOfModal}
            initial={{ y: '50vh' }}
            animate={{ y: '0vh' }}
            exit={{ y: '50vh' }}
            transition={{ ease: 'backOut' }}>
            <Group position='center' direction='column'>
              <Center>
                <Skeleton radius={'xl'} sx={{ width: '50px', height: '3px', borderRadius: '25px', marginTop: '-20px' }} />
              </Center>
              <Player
                autoplay
                loop
                src={Lottie}
                style={{ height: '200px', width: '200px' }} />
              <h2>Continue to Biofip</h2>
              <Group position='center'>
                <Button style={{ borderRadius: '32px' }} leftIcon={<Image src={google} width={'20px'} height={'20px'} />} onClick={() => googleLogIn()}>{rect.width < 461 ? 'Google' : 'Google Login'}</Button>
                <Button style={{ borderRadius: '32px' }} leftIcon={<Image src={meta} width={'25px'} height={'25px'} />} onClick={() => fbLogin()}>{rect.width < 461 ? 'Meta' : 'Meta Login'}</Button>
              </Group>
            </Group>
          </motion.div>
        </motion.div>}

    </>
  );
}