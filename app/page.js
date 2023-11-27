
import { Footer } from '@/components'
import Header2 from '@/components/Header2'
import Hero from '@/components/Hero'
import MobileMenu from '@/components/MobileMenu'
import PersistLogin from "@/components/PersistLogin";
import Image from 'next/image'

export default function Home() {
  

  return (
    <PersistLogin>
      <div>
    <Header2 />
    <MobileMenu />
    <main >
      <Hero />
    </main>
    <Footer />
    </div>
    </ PersistLogin>
    
    
  )
}
