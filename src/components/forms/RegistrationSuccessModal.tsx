'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, MessageCircle, X } from 'lucide-react';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';

interface RegistrationSuccessModalProps {
    eventName: string;
    onClose: () => void;
}

const eventWhatsAppLinks: Record<string, { link: string; image: string }> = {
    "Avatar: The Algo War": {
        link: "https://chat.whatsapp.com/HfND48GrOqnCYC0IauZbcG?mode=gi_t",
        image: "/images/algo-war.png"
    },
    "Neural Link": {
        link: "https://chat.whatsapp.com/DrLrY5cRFHOLkD3e6yNsUa?mode=gi_t",
        image: "/images/neural-link.png"
    },
    "The Voice of Eywa": {
        link: "https://chat.whatsapp.com/F6QjSwv0N1V7FI0THRoOUS?mode=gi_t",
        image: "/images/voice-of-eywa.png"
    }
};

export function RegistrationSuccessModal({ eventName, onClose }: RegistrationSuccessModalProps) {
    const eventData = eventWhatsAppLinks[eventName] || { link: "#", image: "/images/algo-war.png" };
    useBodyScrollLock(true);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                className="max-w-md w-full bg-midnight-blue border border-white/10 rounded-3xl p-6 md:p-8 relative overflow-hidden text-center"
            >
                {/* Background Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-green-500/20 rounded-full blur-[80px]" />

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors z-20"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="relative z-10 flex flex-col items-center">
                    {/* Success Icon */}
                    <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-6 border border-green-500/20">
                        <CheckCircle2 className="w-8 h-8 text-green-400" />
                    </div>

                    <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
                        Registration Successful!
                    </h2>
                    <p className="text-soft-white/70 mb-6">
                        You have successfully registered for <br />
                        <span className="text-electric-teal font-bold">{eventName}</span>
                    </p>

                    {/* Event Image */}
                    <div className="relative w-full h-40 rounded-xl overflow-hidden mb-6 border border-white/10">
                        <Image
                            src={eventData.image}
                            alt={eventName}
                            fill
                            className="object-cover"
                        />
                    </div>

                    <p className="text-sm text-soft-white/60 mb-4">
                        Join the official WhatsApp group for updates and coordination.
                    </p>

                    <a
                        href={eventData.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full"
                    >
                        <Button className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold h-12 text-base">
                            <MessageCircle className="mr-2 w-5 h-5" />
                            Join WhatsApp Group
                        </Button>
                    </a>
                </div>
            </motion.div>
        </motion.div>
    );
}
