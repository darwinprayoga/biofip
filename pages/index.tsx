import Head from 'next/head';

import UseNavbar from '../components/useNavbar';

import type { NextPage } from 'next'
const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Biofip</title>
      </Head>
      
      <UseNavbar isBiofip />
    </>
  )
}

export default Home
