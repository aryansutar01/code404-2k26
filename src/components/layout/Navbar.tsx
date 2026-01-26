'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Sponsors', href: '#sponsors' },
        { name: 'About', href: '#about' },
        { name: 'Events', href: '#events' },
        { name: 'Rulebook', href: '#rulebook' },
        { name: 'Register', href: '#register' },
    ];

    return (
        <nav className={cn(
            "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
            isScrolled ? "glass py-3 md:py-4 shadow-lg shadow-deep-cyan/5 border-b border-white/5" : "bg-transparent py-4 md:py-6"
        )}>
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-xl md:text-2xl font-bold font-display tracking-wider group">
                    <span className="text-deep-cyan group-hover:text-electric-teal transition-colors">CODE</span>
                    <span className="text-white"> 404</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-soft-white/80 hover:text-deep-cyan transition-all relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-deep-cyan to-electric-teal group-hover:w-full transition-all duration-300" />
                        </Link>
                    ))}
                    <a href="#register">
                        <Button
                            variant="default"
                            size="sm"
                            className="ml-4 bg-gradient-to-r from-deep-cyan to-electric-teal hover:shadow-[0_0_20px_rgba(0,255,198,0.5)]"
                        >
                            Register Now
                        </Button>
                    </a>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white hover:text-deep-cyan transition-colors"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass border-t border-white/10 overflow-hidden"
                    >
                        <div className="flex flex-col p-6 gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-lg font-medium text-soft-white hover:text-deep-cyan transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <a href="#register" onClick={() => setMobileMenuOpen(false)}>
                                <Button className="w-full bg-gradient-to-r from-deep-cyan to-electric-teal">
                                    Register Now
                                </Button>
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
