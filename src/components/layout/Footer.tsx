'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';

const footerLinks = {
    event: [
        { name: 'About', href: '#about' },
        { name: 'Events', href: '#events' },
        { name: 'Sponsors', href: '#sponsors' },
        { name: 'Register', href: '#register' },
    ],
    legal: [
        { name: 'Privacy Policy', href: '#' },
        { name: 'Terms & Conditions', href: '#' },
        { name: 'Code of Conduct', href: '#' },
        { name: 'Refund Policy', href: '#' },
    ],
    contact: [
        { icon: Mail, text: 'code404@example.com', href: 'mailto:code404@example.com' },
        { icon: Phone, text: '+91 98765 43210', href: 'tel:+919876543210' },
        { icon: MapPin, text: 'Your College, City, State', href: '#' },
    ],
    social: [
        { icon: Instagram, href: '#', name: 'Instagram' },
        { icon: Linkedin, href: '#', name: 'LinkedIn' },
        { icon: Twitter, href: '#', name: 'Twitter' },
        { icon: Facebook, href: '#', name: 'Facebook' },
    ]
};

export function Footer() {
    return (
        <footer className="relative bg-gradient-to-b from-midnight-blue to-black border-t border-white/5 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-deep-cyan/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-nebula-purple/5 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Main Footer Content */}
                <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="inline-block mb-6">
                            <h3 className="text-2xl md:text-3xl font-display font-bold">
                                <span className="text-deep-cyan">CODE</span>
                                <span className="text-white"> 404</span>
                            </h3>
                        </Link>
                        <p className="text-soft-white/60 text-sm md:text-base mb-6 leading-relaxed">
                            Where innovation meets opportunity. Join us for a day of coding challenges, networking, and tech excellence.
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-3">
                            {footerLinks.social.map((social, idx) => {
                                const Icon = social.icon;
                                return (
                                    <motion.a
                                        key={idx}
                                        href={social.href}
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-deep-cyan/50 hover:bg-deep-cyan/10 transition-all group"
                                        aria-label={social.name}
                                    >
                                        <Icon className="w-4 h-4 text-soft-white/60 group-hover:text-deep-cyan transition-colors" />
                                    </motion.a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-display font-bold text-lg mb-6">Quick Links</h4>
                        <ul className="space-y-3">
                            {footerLinks.event.map((link, idx) => (
                                <li key={idx}>
                                    <Link
                                        href={link.href}
                                        className="text-soft-white/60 hover:text-deep-cyan transition-colors text-sm md:text-base inline-flex items-center group"
                                    >
                                        <span className="w-0 h-0.5 bg-deep-cyan group-hover:w-4 mr-0 group-hover:mr-2 transition-all duration-300" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-white font-display font-bold text-lg mb-6">Legal</h4>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link, idx) => (
                                <li key={idx}>
                                    <Link
                                        href={link.href}
                                        className="text-soft-white/60 hover:text-deep-cyan transition-colors text-sm md:text-base inline-flex items-center group"
                                    >
                                        <span className="w-0 h-0.5 bg-deep-cyan group-hover:w-4 mr-0 group-hover:mr-2 transition-all duration-300" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-display font-bold text-lg mb-6">Contact Us</h4>
                        <ul className="space-y-4">
                            {footerLinks.contact.map((contact, idx) => {
                                const Icon = contact.icon;
                                return (
                                    <li key={idx}>
                                        <a
                                            href={contact.href}
                                            className="text-soft-white/60 hover:text-deep-cyan transition-colors text-sm md:text-base flex items-start gap-3 group"
                                        >
                                            <Icon className="w-5 h-5 flex-shrink-0 mt-0.5 group-hover:text-deep-cyan transition-colors" />
                                            <span>{contact.text}</span>
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="py-6 border-t border-white/5">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-soft-white/40">
                        <p>© 2026 CODE 404. All rights reserved.</p>
                        <div className="flex items-center gap-2">
                            <span>Made with</span>
                            <span className="text-red-400 animate-pulse">♥</span>
                            <span>by Oyster Kode Club</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
