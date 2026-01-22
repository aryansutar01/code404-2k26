import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { Sponsors } from '@/components/sections/Sponsors';
import { About } from '@/components/sections/About';
import { Events } from '@/components/sections/Events';
import { RegisterCTA } from '@/components/sections/RegisterCTA';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  return (
    <main className="bg-midnight-blue min-h-screen text-soft-white selection:bg-deep-cyan selection:text-midnight-blue">
      <Navbar />
      <Hero />

      <Sponsors />

      <About />

      <Events />

      <RegisterCTA />

      <Footer />
    </main>
  );
}
