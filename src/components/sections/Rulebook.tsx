'use client';

import { motion } from 'framer-motion';
import { BookOpen, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Rulebook() {
    return (
        <section id="rulebook" className="relative py-20 bg-gradient-to-b from-midnight-blue to-black/80 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <div className="glass-card p-10 md:p-14 rounded-3xl border border-white/10 hover:border-deep-cyan/30 transition-all duration-300 relative overflow-hidden group">
                        {/* Background Glow */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-deep-cyan/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />

                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-deep-cyan to-electric-teal p-4 mb-6 group-hover:scale-110 transition-transform duration-300">
                                <BookOpen className="w-full h-full text-midnight-blue" />
                            </div>

                            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
                                Event <span className="text-transparent bg-clip-text bg-gradient-to-r from-deep-cyan to-electric-teal">Rulebook</span>
                            </h2>

                            <div className="h-1 w-20 bg-gradient-to-r from-deep-cyan to-electric-teal rounded-full mb-6" />

                            <p className="text-soft-white/70 text-lg mb-8 max-w-2xl leading-relaxed">
                                To ensure a fair and competitive environment, we have established a set of guidelines. Please read the rulebook carefully before participating.
                            </p>

                            <a
                                href="/documents/Code404_RuleBook.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button
                                    size="lg"
                                    className="bg-gradient-to-r from-deep-cyan to-electric-teal hover:shadow-[0_0_25px_rgba(0,255,198,0.6)] text-midnight-blue font-bold px-8 h-12 text-base"
                                >
                                    <FileText className="mr-2 h-5 w-5" />
                                    Download Rulebook
                                </Button>
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
