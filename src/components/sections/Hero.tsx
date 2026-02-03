'use client';

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { StarField } from "@/components/ui/star-field";
import dynamic from 'next/dynamic';
import { useRouter } from "next/navigation";

const BioTree = dynamic(() => import('@/components/three/BioTree'), {
    ssr: false,
    loading: () => <div className="w-full h-full flex items-center justify-center text-deep-cyan/30 animate-pulse">Loading...</div>
});

export function Hero() {
    const router = useRouter();

    return (
        <>
            <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black">

                {/* Background Star Field */}
                <div className="absolute inset-0 z-0">
                    <StarField count={3000} speed={0.5} />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_70%,rgba(0,229,255,0.03)_100%)]" />
                </div>

                {/* 3D Tree - Full Screen Centered Background - Adjusted for mobile */}
                <div className="absolute inset-0 z-10 flex items-center justify-center translate-y-[8vh] md:translate-y-[8vh] scale-110 md:scale-100">
                    <div className="w-full h-full">
                        <BioTree />
                    </div>

                    {/* Enhanced vignette overlay - stronger on mobile for text readability */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,rgba(0,0,0,0.6)_40%,rgba(0,0,0,0.92)_100%)] md:bg-[radial-gradient(circle_at_center,transparent_15%,rgba(0,0,0,0.45)_45%,rgba(0,0,0,0.88)_100%)] pointer-events-none" />
                </div>

                {/* Text Overlay Content - Centered - Mobile optimized padding */}
                <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4 md:px-6 pointer-events-none">
                    {/* Top Badge - Smaller on mobile */}
                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="mb-6 md:mb-8"
                    >
                        <div className="inline-flex items-center gap-2 md:gap-3 px-3 md:px-5 py-1.5 md:py-2 rounded-full bg-black/60 backdrop-blur-xl border border-deep-cyan/30 shadow-[0_0_20px_rgba(0,229,255,0.1)]">
                            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-bio-green animate-pulse shadow-[0_0_10px_rgba(77,255,210,0.8)]" />
                            <span className="text-deep-cyan text-[10px] md:text-xs lg:text-sm font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase">
                                Oyster Kode Club
                            </span>
                        </div>
                    </motion.div>

                    {/* Main Title - Responsive sizing */}
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="font-display font-black leading-[0.85] mb-6 md:mb-8"
                    >
                        <span className="block text-[18vw] sm:text-[16vw] md:text-[14vw] lg:text-[12rem] xl:text-[14rem] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-soft-white/90 to-deep-cyan/70 filter drop-shadow-[0_0_40px_rgba(0,229,255,0.5)] mix-blend-screen">
                            CODE 404
                        </span>
                    </motion.h1>

                    {/* Tagline */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="text-sm md:text-xl font-light tracking-[0.5em] text-soft-white/70 uppercase mb-16 drop-shadow-[0_0_10px_rgba(0,229,255,0.3)]"
                    >
                        Code to Change
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 1 }}
                        className="flex flex-col sm:flex-row gap-5 pointer-events-auto"
                    >
                        <Button
                            size="lg"
                            variant="glass"
                            className="min-w-[180px] h-14 rounded-full border border-white/20 hover:border-deep-cyan/60 hover:bg-white/5 transition-all text-soft-white backdrop-blur-md shadow-lg hover:shadow-[0_0_25px_rgba(0,229,255,0.3)]"
                            onClick={() => window.open("https://www.instagram.com/reels/DT1n9dVkSi4/", "_blank")}
                        >
                            <Play className="mr-2 w-5 h-5 fill-current" /> Watch Teaser
                        </Button>
                        <Button
                            size="lg"
                            className="min-w-[180px] h-14 rounded-full bg-gradient-to-r from-deep-cyan to-electric-teal text-midnight-blue hover:shadow-[0_0_35px_rgba(0,255,198,0.7)] font-bold tracking-wide transition-all duration-300"
                            onClick={() => router.push('#register')}
                        >
                            REGISTER NOW
                        </Button>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <span className="text-[10px] uppercase tracking-[0.3em] text-deep-cyan/50 font-medium">Scroll</span>
                    <div className="w-[2px] h-16 bg-gradient-to-b from-deep-cyan/60 via-bio-green/40 to-transparent rounded-full" />
                </motion.div>
            </section>

        </>
    )
}
