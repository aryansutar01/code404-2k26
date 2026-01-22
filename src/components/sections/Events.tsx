'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Code2, Users, Mic, Clock, IndianRupee, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { RegistrationModal } from '@/components/forms/RegistrationModal';
import Image from 'next/image';

const events = [
    {
        id: 'algo-war',
        title: 'Avatar: The Algo War',
        tagline: 'Where algorithms clash and the sharpest minds rise.',
        description: 'A high-intensity coding challenge crafted to evaluate participants across aptitude, debugging, and competitive coding. Designed for both novices and experts.',
        image: '/images/algo-war.png',
        icon: Code2,
        accentColor: 'from-deep-cyan to-electric-teal',
        borderColor: 'border-deep-cyan/30',
        glowColor: 'shadow-[0_0_20px_rgba(0,229,255,0.2)]',
        time: '11:30 AM – 4:00 PM',
        level: 'Novice + Expert',
        participants: '200',
        fee: '₹99',
        rounds: [
            { title: 'Aptitude Test', desc: 'Test your logical reasoning, problem-solving ability, and technical fundamentals.' },
            { title: 'Debugging', desc: 'Identify and fix real-world code errors under time pressure.' },
            { title: 'Competitive Coding', desc: 'Solve algorithmic challenges against the clock and competitors.' }
        ]
    },
    {
        id: 'neural-link',
        title: 'Neural Link',
        tagline: 'Two minds. One code. Zero compromise.',
        description: 'A duo-based coding challenge where pairs collaborate to solve logical and coding problems. Emphasizes communication, coordination, and shared problem-solving.',
        image: '/images/neural-link.png',
        icon: Users,
        accentColor: 'from-electric-teal to-nebula-purple',
        borderColor: 'border-electric-teal/30',
        glowColor: 'shadow-[0_0_20px_rgba(0,255,198,0.2)]',
        time: '11:00 AM – 2:00 PM',
        level: 'Teams of 2',
        participants: '50 Teams',
        fee: '₹149/team',
        badge: 'Best for teams that think alike, code apart.',
        requirement: '⚠ Laptop compulsory',
        rounds: [
            { title: 'Logical Question Solving', desc: 'Evaluate your combined reasoning and analytical skills.' },
            { title: 'Switch Coding', desc: 'One codes, the other thinks — and then you switch. A true test of teamwork.' }
        ]
    },
    {
        id: 'voice-eywa',
        title: 'The Voice of Eywa',
        tagline: 'Where ideas echo louder than code.',
        description: 'A multi-round group discussion challenge designed to test articulation, reasoning, leadership, and the ability to influence through ideas.',
        image: '/images/voice-of-eywa.png',
        icon: Mic,
        accentColor: 'from-bio-green to-electric-teal',
        borderColor: 'border-bio-green/30',
        glowColor: 'shadow-[0_0_20px_rgba(77,255,210,0.2)]',
        time: '10:00 AM – 2:30 PM',
        level: '10 per group',
        participants: '250',
        fee: '₹59',
        rounds: [
            { title: 'GD – Level 1', desc: 'Initial screening based on clarity and participation.' },
            { title: 'GD – Level 2', desc: 'Deeper evaluation of argument building and rebuttal.' },
            { title: 'GD – Level 3', desc: 'Final leadership and persuasion round.' }
        ]
    }
];

function EventCard({ event, index }: { event: typeof events[0], index: number }) {
    const Icon = event.icon;
    const [showDetails, setShowDetails] = useState(false);

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className={`glass-card p-6 md:p-8 rounded-2xl border ${event.borderColor} ${event.glowColor} hover:scale-[1.02] transition-all duration-300 flex flex-col h-full group cursor-pointer relative overflow-hidden`}
                onClick={() => setShowDetails(true)}
            >
                {/* Background Decoration */}
                <div className="absolute -right-10 -bottom-10 opacity-20 pointer-events-none transition-transform duration-700 group-hover:scale-110 group-hover:rotate-12">
                    <Image
                        src="/images/woodsprites.png"
                        alt=""
                        width={200}
                        height={200}
                        className="w-40 h-40 object-contain mix-blend-screen"
                    />
                </div>

                {/* Icon & Title */}
                <div className="flex items-start gap-4 mb-4 relative z-10">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${event.accentColor} shadow-lg`}>
                        <Icon className="w-6 h-6 text-midnight-blue" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-electric-teal transition-all">
                            {event.title}
                        </h3>
                        <p className="text-sm text-soft-white/60 italic">{event.tagline}</p>
                    </div>
                </div>

                {/* Description */}
                <p className="text-soft-white/70 text-sm md:text-base mb-6 leading-relaxed flex-1 relative z-10">
                    {event.description}
                </p>

                {/* Meta Info */}
                <div className="space-y-2 mb-6 relative z-10">
                    <div className="flex items-center gap-2 text-xs md:text-sm text-soft-white/60">
                        <Clock className="w-4 h-4 text-electric-teal" />
                        <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs md:text-sm text-soft-white/60">
                        <TrendingUp className="w-4 h-4 text-bio-green" />
                        <span>{event.level}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs md:text-sm text-soft-white/60">
                        <Users className="w-4 h-4 text-nebula-purple" />
                        <span>{event.participants} Participants</span>
                    </div>
                </div>

                {/* Badge if exists */}
                {event.badge && (
                    <div className="mb-4 px-3 py-2 rounded-lg bg-electric-teal/10 border border-electric-teal/20 relative z-10">
                        <p className="text-xs text-electric-teal font-medium">{event.badge}</p>
                    </div>
                )}

                {/* Fee & CTA */}
                <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/5 relative z-10">
                    <div className="flex items-center gap-1">
                        <IndianRupee className="w-5 h-5 text-deep-cyan" />
                        <span className="text-2xl font-bold text-white">{event.fee.replace('₹', '')}</span>
                    </div>
                    <Button
                        variant="default"
                        size="sm"
                        className="pointer-events-none"
                    >
                        View Event
                    </Button>
                </div>
            </motion.div>

            {/* Modal */}
            {showDetails && (
                <EventModal event={event} onClose={() => setShowDetails(false)} />
            )}
        </>
    );
}

function EventModal({ event, onClose }: { event: typeof events[0], onClose: () => void }) {
    const Icon = event.icon;
    const [showRegister, setShowRegister] = useState(false);

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    className="glass-card rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-hidden border border-white/10 flex flex-col md:flex-row relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button Mobile */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-[60] md:hidden w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center border border-white/20"
                    >
                        ✕
                    </button>

                    {/* Left Column: Content (Scrollable) */}
                    <div className="flex-1 p-8 md:p-10 overflow-y-auto max-h-[50vh] md:max-h-[90vh] order-2 md:order-1">
                        {/* Header */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className={`p-3 rounded-xl bg-gradient-to-br ${event.accentColor} shadow-lg shadow-${event.accentColor.split(' ')[2]}/20`}>
                                <Icon className="w-6 h-6 text-midnight-blue" />
                            </div>
                            <div>
                                <h2 className="text-2xl md:text-3xl font-display font-bold text-white">
                                    {event.title}
                                </h2>
                                <p className="text-soft-white/60 text-sm italic">{event.tagline}</p>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-soft-white/80 text-base mb-8 leading-relaxed border-l-2 border-deep-cyan/30 pl-4">
                            {event.description}
                        </p>

                        {/* Event Meta Grid */}
                        <div className="grid grid-cols-2 gap-3 mb-8">
                            <div className="glass p-3 rounded-xl border border-white/5">
                                <Clock className="w-4 h-4 text-electric-teal mb-1" />
                                <p className="text-[10px] text-soft-white/50 uppercase tracking-wider">Time</p>
                                <p className="text-sm text-white font-medium">{event.time}</p>
                            </div>
                            <div className="glass p-3 rounded-xl border border-white/5">
                                <TrendingUp className="w-4 h-4 text-bio-green mb-1" />
                                <p className="text-[10px] text-soft-white/50 uppercase tracking-wider">Level</p>
                                <p className="text-sm text-white font-medium">{event.level}</p>
                            </div>
                            <div className="glass p-3 rounded-xl border border-white/5">
                                <Users className="w-4 h-4 text-nebula-purple mb-1" />
                                <p className="text-[10px] text-soft-white/50 uppercase tracking-wider">Expected</p>
                                <p className="text-sm text-white font-medium">{event.participants}</p>
                            </div>
                            <div className="glass p-3 rounded-xl border border-white/5">
                                <IndianRupee className="w-4 h-4 text-deep-cyan mb-1" />
                                <p className="text-[10px] text-soft-white/50 uppercase tracking-wider">Entry Fee</p>
                                <p className="text-sm text-white font-medium">{event.fee}</p>
                            </div>
                        </div>

                        {/* Rounds */}
                        <div className="mb-8">
                            <h3 className="text-lg font-display font-bold text-white mb-4 flex items-center gap-2">
                                <span className="w-1 h-6 bg-electric-teal rounded-full" /> Event Rounds
                            </h3>
                            <div className="space-y-4">
                                {event.rounds.map((round, idx) => (
                                    <div key={idx} className="flex gap-4 group">
                                        <div className={`flex-shrink-0 w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-soft-white font-bold text-sm group-hover:border-${event.accentColor.split(' ')[2]} group-hover:text-${event.accentColor.split(' ')[2]} transition-colors`}>
                                            {idx + 1}
                                        </div>
                                        <div>
                                            <h4 className="text-white font-medium mb-1 group-hover:text-electric-teal transition-colors">{round.title}</h4>
                                            <p className="text-soft-white/60 text-sm">{round.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Requirement */}
                        {event.requirement && (
                            <div className="mb-8 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex gap-3 text-yellow-400 text-sm font-medium">
                                <span>⚠</span> {event.requirement}
                            </div>
                        )}

                        {/* CTA Buttons */}
                        <div className="flex gap-3 mt-auto sticky bottom-0 bg-midnight-blue/95 p-4 -mx-4 -mb-4 backdrop-blur-xl border-t border-white/10 md:static md:bg-transparent md:p-0 md:m-0 md:border-none">
                            <Button
                                variant="glass"
                                className="flex-1"
                                onClick={onClose}
                            >
                                Close
                            </Button>
                            <Button
                                className="flex-1 bg-gradient-to-r from-deep-cyan to-electric-teal text-midnight-blue hover:shadow-[0_0_20px_rgba(0,255,198,0.4)]"
                                onClick={() => setShowRegister(true)}
                            >
                                Register Now
                            </Button>
                        </div>
                    </div>

                    {/* Right Column: Image (Sticky on Desktop, Top on Mobile) */}
                    <div className="relative w-full md:w-[45%] h-[200px] md:h-auto order-1 md:order-2 overflow-hidden bg-black">
                        <div className="absolute inset-0 bg-gradient-to-t from-midnight-blue via-transparent to-transparent z-10 md:bg-gradient-to-l" />
                        <Image
                            src={event.image}
                            alt={event.title}
                            fill
                            className="object-cover object-center transform hover:scale-105 transition-transform duration-700"
                            priority
                        />

                        {/* Decorative Overlay for Text Contrast */}
                        <div className="absolute inset-0 bg-deep-cyan/10 mix-blend-overlay" />
                    </div>
                </motion.div>
            </motion.div>

            {/* Registration Modal */}
            <RegistrationModal
                isOpen={showRegister}
                onClose={() => setShowRegister(false)}
                preselectedEvent={event.title}
            />
        </>
    );
}

export function Events() {
    return (
        <section id="events" className="py-16 md:py-24 bg-midnight-blue relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 right-0 w-96 h-96 bg-deep-cyan/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-0 w-96 h-96 bg-nebula-purple/5 rounded-full blur-3xl" />

                {/* Decorative Woodsprites - Top Left */}
                <div className="absolute top-10 left-0 opacity-10 rotate-45 transform scale-150 pointer-events-none">
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
                    className="text-center mb-12 md:mb-16"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
                        Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-deep-cyan to-bio-green">Experience</span>
                    </h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-deep-cyan to-electric-teal mx-auto rounded-full mb-6" />
                    <p className="text-soft-white/60 max-w-2xl mx-auto text-base md:text-lg">
                        Compete. Collaborate. Conquer. Select your battlefield and prove your worth.
                    </p>
                </motion.div>

                {/* Event Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {events.map((event, index) => (
                        <EventCard key={event.id} event={event} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
