import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Sidebar from '../components/Sidebar'

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Spotimy</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

    <div className="bg-black h-screen overflow-hidden">
      <main>
        <Sidebar />
        {/* center */}
      </main>
    </div>

      <div>
        {/* Player */}
      </div>
    </div>
  )
}

export default Home
