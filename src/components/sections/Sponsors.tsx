'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

// Sponsor tiers and logos
const sponsors = {
    title: [
        {
            name: 'CodeChef',
            logo: '/CodeChef_Logo.png',
            description: "Platform Partner empowering potential with exclusive competitive advantages and rewards."
        },
    ],
    associate: [
        {
            name: 'Aptech Solutions',
            logo: '/aptech_logo.png',
            description: "Knowledge Partner fueling intellectual exchange through resource curation and discussion frameworks."
        },
        {
            name: 'OKC Alumni Community',
            logo: '/okc_logo.png',
            description: "Community Partner fostering growth through mentorship and strategic support."
        },
    ],
    gold: [],
    community: []
};

function SponsorCard({ sponsor, size = 'medium' }: { sponsor: { name: string, logo: string, description?: string }, size?: 'large' | 'medium' | 'small' }) {
    const sizeClasses = {
        large: 'w-full max-w-4xl p-8 md:p-12',
        medium: 'w-full max-w-lg p-6 md:p-8',
        small: 'w-full p-4'
    };

    const logoSizes = {
        large: 'h-24 md:h-32 w-64 md:w-80',
        medium: 'h-20 md:h-24 w-48 md:w-60',
        small: 'h-12 w-32'
    };

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className={`glass-card rounded-3xl border border-white/10 hover:border-deep-cyan/30 transition-all ${sizeClasses[size]} group bg-white/5 backdrop-blur-sm relative overflow-hidden`}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-deep-cyan/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className={`relative z-10 flex flex-col ${size === 'large' ? 'md:flex-row md:justify-between md:items-center gap-8 md:gap-16' : 'items-center text-center gap-6'}`}>

                {/* Logo Container */}
                <div className={`relative shrink-0 ${logoSizes[size]} flex items-center justify-center`}>
                    <Image
                        src={sponsor.logo}
                        alt={sponsor.name}
                        fill
                        className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 drop-shadow-lg"
                    />
                </div>

                {/* Content */}
                {sponsor.description && (
                    <div className={`flex flex-col ${size === 'large' ? 'md:text-left text-center' : 'text-center'}`}>
                        <h4 className={`font-display font-bold text-white mb-2 ${size === 'large' ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
                            {sponsor.name}
                        </h4>
                        <p className="text-soft-white/70 leading-relaxed font-light text-sm md:text-base">
                            {sponsor.description}
                        </p>
                    </div>
                )}
            </div>
        </motion.div>
    );
}

export function Sponsors() {
    return (
        <section id="sponsors" className="relative py-16 md:py-24 bg-midnight-blue overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-0 w-96 h-96 bg-nebula-purple/5 rounded-full blur-[120px]" />
                <div className="absolute top-1/2 right-0 w-96 h-96 bg-deep-cyan/5 rounded-full blur-[120px]" />

                {/* Decorative Woodsprites - Bottom Right */}
                <div className="absolute top-20 right-0 opacity-10 rotate-180 transform scale-125 pointer-events-none">
                    <Image
                        src="/images/woodsprites.png"
                        alt=""
                        width={400}
                        height={400}
                        className="mix-blend-screen"
                    />
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 md:mb-24"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-deep-cyan to-electric-teal">Sponsors</span>
                    </h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-deep-cyan to-electric-teal mx-auto rounded-full mb-6" />
                    <p className="text-soft-white/60 max-w-2xl mx-auto text-base md:text-lg">
                        Proudly supported by industry leaders envisioning the future of technology
                    </p>
                </motion.div>

                {/* Title Sponsors */}
                {sponsors.title.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-20"
                    >
                        <h3 className="text-center text-xl md:text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-deep-cyan to-electric-teal mb-10 tracking-wide uppercase">
                            Title Sponsor
                        </h3>
                        <div className="flex justify-center items-center">
                            {sponsors.title.map((sponsor, idx) => (
                                <SponsorCard key={idx} sponsor={sponsor} size="large" />
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Associate Sponsors */}
                {sponsors.associate.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="mb-16"
                    >
                        <h3 className="text-center text-lg md:text-xl font-display font-bold text-soft-white/90 mb-10 tracking-wide uppercase">
                            Associate Sponsors
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            {sponsors.associate.map((sponsor, idx) => (
                                <SponsorCard key={idx} sponsor={sponsor} size="medium" />
                            ))}
                        </div>
                    </motion.div>
                )}


            </div>
        </section>
    );
}
