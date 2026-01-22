'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

// Sponsor tiers and logos - You can replace these with actual sponsor logos
const sponsors = {
    title: [
        { name: 'Tech Corp', logo: '/sponsors/placeholder-1.png' },
    ],
    platinum: [
        { name: 'Cloud Solutions', logo: '/sponsors/placeholder-2.png' },
        { name: 'AI Innovations', logo: '/sponsors/placeholder-3.png' },
    ],
    gold: [
        { name: 'Code Academy', logo: '/sponsors/placeholder-4.png' },
        { name: 'Dev Tools Inc', logo: '/sponsors/placeholder-5.png' },
        { name: 'Tech Start', logo: '/sponsors/placeholder-6.png' },
    ],
    community: [
        { name: 'Local DevOps', logo: '/sponsors/placeholder-7.png' },
        { name: 'Hackathon Hub', logo: '/sponsors/placeholder-8.png' },
        { name: 'Code Community', logo: '/sponsors/placeholder-9.png' },
        { name: 'Tech Meetup', logo: '/sponsors/placeholder-10.png' },
    ]
};

function SponsorCard({ sponsor, size = 'medium' }: { sponsor: { name: string, logo: string }, size?: 'large' | 'medium' | 'small' }) {
    const sizeClasses = {
        large: 'h-32 md:h-40',
        medium: 'h-24 md:h-32',
        small: 'h-20 md:h-24'
    };

    return (
        <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className={`glass-card p-6 md:p-8 rounded-2xl border border-white/10 hover:border-deep-cyan/30 transition-all ${sizeClasses[size]} flex items-center justify-center group`}
        >
            <div className="relative w-full h-full flex items-center justify-center">
                {/* Placeholder Logo - Replace with actual Image component when you have logos */}
                <div className="text-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-2 rounded-xl bg-gradient-to-br from-deep-cyan/20 to-electric-teal/20 flex items-center justify-center border border-deep-cyan/20 group-hover:border-deep-cyan/40 transition-all">
                        <span className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-deep-cyan to-electric-teal">
                            {sponsor.name[0]}
                        </span>
                    </div>
                    <p className="text-soft-white/50 text-xs md:text-sm font-medium group-hover:text-soft-white/80 transition-colors">
                        {sponsor.name}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

export function Sponsors() {
    return (
        <section className="relative py-16 md:py-24 bg-midnight-blue overflow-hidden">
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
                    className="text-center mb-12 md:mb-16"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-deep-cyan to-electric-teal">Sponsors</span>
                    </h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-deep-cyan to-electric-teal mx-auto rounded-full mb-6" />
                    <p className="text-soft-white/60 max-w-2xl mx-auto text-base md:text-lg">
                        Proudly supported by industry leaders and innovators who believe in fostering tech talent
                    </p>
                </motion.div>

                {/* Title Sponsors */}
                {sponsors.title.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12"
                    >
                        <h3 className="text-center text-lg md:text-xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-deep-cyan to-electric-teal mb-6">
                            Title Sponsor
                        </h3>
                        <div className="max-w-md mx-auto">
                            {sponsors.title.map((sponsor, idx) => (
                                <SponsorCard key={idx} sponsor={sponsor} size="large" />
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Platinum Sponsors */}
                {sponsors.platinum.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="mb-12"
                    >
                        <h3 className="text-center text-base md:text-lg font-display font-bold text-soft-white/70 mb-6">
                            Platinum Sponsors
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-3xl mx-auto">
                            {sponsors.platinum.map((sponsor, idx) => (
                                <SponsorCard key={idx} sponsor={sponsor} size="medium" />
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Gold Sponsors */}
                {sponsors.gold.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mb-12"
                    >
                        <h3 className="text-center text-base md:text-lg font-display font-bold text-soft-white/60 mb-6">
                            Gold Sponsors
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                            {sponsors.gold.map((sponsor, idx) => (
                                <SponsorCard key={idx} sponsor={sponsor} size="medium" />
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Community Partners */}
                {sponsors.community.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <h3 className="text-center text-base md:text-lg font-display font-bold text-soft-white/50 mb-6">
                            Community Partners
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
                            {sponsors.community.map((sponsor, idx) => (
                                <SponsorCard key={idx} sponsor={sponsor} size="small" />
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Become a Sponsor CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-16 text-center"
                >
                    <div className="glass-card p-8 md:p-10 rounded-3xl border border-deep-cyan/20 max-w-2xl mx-auto">
                        <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-3">
                            Interested in Sponsoring?
                        </h3>
                        <p className="text-soft-white/60 mb-6">
                            Partner with us to reach 200+ talented students and showcase your brand
                        </p>
                        <a
                            href="mailto:sponsor@code404.com"
                            className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-deep-cyan to-electric-teal text-midnight-blue font-bold hover:shadow-[0_0_30px_rgba(0,255,198,0.6)] transition-all duration-300"
                        >
                            Get in Touch
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
