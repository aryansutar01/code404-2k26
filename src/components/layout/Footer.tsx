'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter, Globe } from 'lucide-react';

const footerLinks = {
    event: [
        { name: 'About', href: '#about' },
        { name: 'Events', href: '#events' },
        { name: 'Sponsors', href: '#sponsors' },
        { name: 'Register', href: '#register' },
    ],
    legal: [
        { name: 'Privacy Policy', href: '/documents/Code404_RuleBook.pdf' },
        { name: 'Terms & Conditions', href: '/documents/Code404_RuleBook.pdf' },
        { name: 'Code of Conduct', href: '/documents/Code404_RuleBook.pdf' },
        { name: 'Rulebook', href: '/documents/Code404_RuleBook.pdf' },
    ],
    contact: [
        { icon: Mail, text: 'oysterkode@ritindia.edu', href: 'mailto:oysterkode@ritindia.edu' },
        { icon: Phone, text: '+91 88620 61585', href: 'tel:+918862061585' },
        { icon: MapPin, text: 'RIT, Rajaramnagar, Ishwarpur, Walwa, Sangli 415414', href: 'https://maps.google.com/?q=RIT, Rajaramnagar, Ishwarpur, Walwa, Sangli 415414' },
    ],
    social: [
        { icon: Instagram, href: 'https://www.instagram.com/oyster_kode?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', name: 'Instagram' },
        { icon: Linkedin, href: 'https://www.linkedin.com/in/oyster-kode-club/', name: 'LinkedIn' },
        { icon: Globe, href: 'https://www.oysterkodeclub.com', name: 'Website' },
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
                    <div className="flex justify-center items-center text-sm text-soft-white/40">
                        <p>© 2026 CODE 404. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
