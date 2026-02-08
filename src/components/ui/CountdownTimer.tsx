'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

interface CountdownTimerProps {
    targetDate: Date;
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = +targetDate - +new Date();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    const timeUnits = [
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Minutes', value: timeLeft.minutes },
        { label: 'Seconds', value: timeLeft.seconds },
    ];

    return (
        <div className="flex gap-4 md:gap-8 justify-center items-center">
            {timeUnits.map((unit, index) => (
                <div key={index} className="flex flex-col items-center">
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1 * index, type: "spring", stiffness: 100 }}
                        className="w-16 h-16 md:w-24 md:h-24 flex items-center justify-center bg-black/40 backdrop-blur-md border border-deep-cyan/30 rounded-xl shadow-[0_0_15px_rgba(0,229,255,0.1)] relative overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-deep-cyan/10 to-transparent opacity-50" />
                        <span className="text-2xl md:text-4xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-b from-white to-deep-cyan/80 z-10">
                            {String(unit.value).padStart(2, '0')}
                        </span>

                        {/* Glow effect */}
                        <div className="absolute -inset-1 bg-deep-cyan/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </motion.div>
                    <span className="mt-2 text-[10px] md:text-xs tracking-[0.2em] text-deep-cyan/60 uppercase font-medium">
                        {unit.label}
                    </span>
                </div>
            ))}
        </div>
    );
}
