'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Sparkles, Zap } from 'lucide-react';
import { InlineRegistrationForm } from '@/components/forms/InlineRegistrationForm';

import Image from 'next/image';

const benefits = [
    {
        icon: Zap,
        title: "Compete & Excel",
        desc: "Challenge yourself across coding, logic, and communication"
    },
    {
        icon: Sparkles,
        title: "Network & Grow",
        desc: "Connect with like-minded tech enthusiasts and mentors"
    },
    {
        icon: CheckCircle2,
        title: "Win Rewards",
        desc: "Earn certificates, prizes, and recognition"
    }
];

export function RegisterCTA() {
    return (
        <section id="register" className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-midnight-blue to-black">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-deep-cyan/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-electric-teal/10 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />

                {/* Decorative Woodsprites - Floating Up */}
                <div className="absolute bottom-0 left-10 opacity-10 rotate-12 transform scale-125 pointer-events-none">
                    <Image
                        src="/images/woodsprites.png"
                        alt=""
                        width={300}
                        height={300}
                        className="mix-blend-screen"
                    />
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12 md:mb-16"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-deep-cyan/10 border border-deep-cyan/20 mb-6">
                            <div className="w-2 h-2 rounded-full bg-bio-green animate-pulse" />
                            <span className="text-deep-cyan text-xs md:text-sm font-bold tracking-wider uppercase">
                                Limited Spots Available
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-deep-cyan via-electric-teal to-bio-green">Begin Your Journey?</span>
                        </h2>

                        <p className="text-soft-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                            Join hundreds of tech enthusiasts in the most anticipated event of the year. Register now and secure your spot.
                        </p>
                    </motion.div>

                    {/* Benefits Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                    >
                        {benefits.map((benefit, idx) => {
                            const Icon = benefit.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 * idx }}
                                    className="glass-card p-6 rounded-2xl border border-white/5 hover:border-deep-cyan/20 transition-all group"
                                >
                                    <Icon className="w-10 h-10 text-deep-cyan mb-4 group-hover:scale-110 transition-transform" />
                                    <h3 className="text-white font-display font-bold text-lg mb-2">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-soft-white/60 text-sm">
                                        {benefit.desc}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {/* Two Column: Info + Registration Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
                    >
                        {/* Left: Social Proof & Info */}
                        <div className="glass-card p-8 md:p-10 rounded-3xl border border-deep-cyan/20 relative overflow-hidden lg:sticky lg:top-24">
                            <div className="absolute inset-0 bg-gradient-to-br from-deep-cyan/5 via-transparent to-bio-green/5 opacity-50" />

                            <div className="relative z-10">
                                <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
                                    Why Register?
                                </h3>
                                <p className="text-soft-white/70 mb-8">
                                    Be part of an elite community of tech enthusiasts. Quick registration, instant confirmation.
                                </p>

                                {/* Social Proof */}
                                <div className="mb-8 p-6 rounded-2xl bg-white/5 border border-white/5">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="flex -space-x-2">
                                            {[1, 2, 3, 4].map(i => (
                                                <div
                                                    key={i}
                                                    className="w-10 h-10 rounded-full bg-gradient-to-br from-deep-cyan to-electric-teal border-2 border-midnight-blue flex items-center justify-center text-xs font-bold text-midnight-blue"
                                                >
                                                    {i}
                                                </div>
                                            ))}
                                        </div>
                                        <div>
                                            <p className="text-white font-bold">200+ Students</p>
                                            <p className="text-soft-white/50 text-sm">Already Registered</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Event Pricing */}
                                <div>
                                    <h4 className="text-white font-display font-bold mb-4">Event Pricing</h4>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center p-3 rounded-xl bg-white/5">
                                            <span className="text-soft-white/70">Algo War</span>
                                            <span className="text-deep-cyan font-bold">₹99</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 rounded-xl bg-white/5">
                                            <span className="text-soft-white/70">Neural Link</span>
                                            <span className="text-electric-teal font-bold">₹149/team</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 rounded-xl bg-white/5">
                                            <span className="text-soft-white/70">Voice of Eywa</span>
                                            <span className="text-bio-green font-bold">₹59</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Note */}
                                <div className="mt-8 p-4 rounded-xl bg-bio-green/10 border border-bio-green/20">
                                    <p className="text-bio-green text-sm">
                                        ✓ Payment details will be shared via email after registration
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right: Registration Form */}
                        <div>
                            <InlineRegistrationForm />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
