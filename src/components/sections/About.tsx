'use client';

import { motion } from 'framer-motion';
import { Award, Briefcase, Code2, Lightbulb, Network, Rocket, TrendingUp, Users } from 'lucide-react';

import Image from 'next/image';

const reasons = [
    {
        icon: Code2,
        title: "Hands-On Challenges",
        description: "Test your skills across aptitude, debugging, and competitive coding in real-world scenarios",
        gradient: "from-deep-cyan to-electric-teal"
    },
    {
        icon: Network,
        title: "Network with Peers",
        description: "Connect with 200+ tech enthusiasts, industry mentors, and like-minded innovators",
        gradient: "from-electric-teal to-bio-green"
    },
    {
        icon: Award,
        title: "Win Recognition",
        description: "Earn certificates, prizes, and showcase your achievements to potential recruiters",
        gradient: "from-nebula-purple to-deep-cyan"
    },
    {
        icon: Briefcase,
        title: "Industry Exposure",
        description: "Interact with sponsors and learn about cutting-edge technologies from experts",
        gradient: "from-bio-green to-electric-teal"
    },
    {
        icon: Lightbulb,
        title: "Learn & Grow",
        description: "Gain insights into emerging tech trends, best practices, and problem-solving techniques",
        gradient: "from-deep-cyan to-nebula-purple"
    },
    {
        icon: Rocket,
        title: "Launch Your Journey",
        description: "Whether you're a beginner or expert, this is your platform to shine and level up",
        gradient: "from-electric-teal to-deep-cyan"
    }
];

const stats = [
    { number: "200+", label: "Participants" },
    { number: "3", label: "Events" },
    { number: "₹10K+", label: "Worth Prizes" },
    { number: "1", label: "Day of Excellence" }
];

export function About() {
    return (
        <section id="about" className="relative py-20 md:py-28 bg-gradient-to-b from-black to-midnight-blue overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-deep-cyan/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-20 right-10 w-72 h-72 bg-nebula-purple/10 rounded-full blur-[100px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-electric-teal/5 rounded-full blur-[120px]" />

                {/* Decorative Woodsprites - Top Left */}
                <div className="absolute top-20 left-0 opacity-10 rotate-90 transform scale-150 pointer-events-none">
                    <Image
                        src="/images/woodsprites.png"
                        alt=""
                        width={500}
                        height={500}
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
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                        Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-deep-cyan via-electric-teal to-bio-green">Attend?</span>
                    </h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-deep-cyan to-electric-teal mx-auto rounded-full mb-6" />
                    <p className="text-soft-white/60 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
                        CODE 404 isn't just another tech event—it's where innovation meets opportunity. Here's what makes it unmissable.
                    </p>
                </motion.div>

                {/* Stats Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16 max-w-4xl mx-auto"
                >
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * idx }}
                            className="glass-card p-6 rounded-2xl border border-white/10 text-center hover:border-deep-cyan/30 transition-all group"
                        >
                            <div className="text-3xl md:text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-deep-cyan to-electric-teal mb-2 group-hover:scale-110 transition-transform">
                                {stat.number}
                            </div>
                            <div className="text-soft-white/60 text-sm md:text-base font-medium">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Reasons Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
                    {reasons.map((reason, idx) => {
                        const Icon = reason.icon;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * idx }}
                                className="glass-card p-8 rounded-3xl border border-white/10 hover:border-deep-cyan/30 transition-all duration-300 group relative overflow-hidden"
                            >
                                {/* Gradient Hover Effect */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${reason.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                                <div className="relative z-10">
                                    {/* Icon */}
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${reason.gradient} p-3 mb-5 group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon className="w-full h-full text-midnight-blue" />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-deep-cyan group-hover:to-electric-teal transition-all">
                                        {reason.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-soft-white/70 text-sm md:text-base leading-relaxed">
                                        {reason.description}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="mt-16 text-center"
                >
                    <div className="glass-card p-8 md:p-10 rounded-3xl border border-deep-cyan/20 max-w-3xl mx-auto bg-gradient-to-br from-deep-cyan/5 to-transparent">
                        <TrendingUp className="w-12 h-12 text-electric-teal mx-auto mb-4" />
                        <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-3">
                            Ready to Experience CODE 404?
                        </h3>
                        <p className="text-soft-white/70 mb-6 max-w-xl mx-auto">
                            Join the movement where innovation meets opportunity. Don't just watch the future—be part of creating it.
                        </p>
                        <a
                            href="#register"
                            className="inline-block px-8 md:px-10 py-3 md:py-4 rounded-full bg-gradient-to-r from-deep-cyan to-electric-teal text-midnight-blue font-bold text-base md:text-lg hover:shadow-[0_0_40px_rgba(0,255,198,0.8)] transition-all duration-300"
                        >
                            Register Now
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
