'use client';

import React, { useRef, useEffect } from 'react';

interface StarFieldProps {
    count?: number;
    speed?: number;
    className?: string;
}

export const StarField: React.FC<StarFieldProps> = ({
    count = 1000,
    speed = 0.5,
    className
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;

        const stars: { x: number; y: number; z: number; size: number; color: string }[] = [];

        const colors = ['#ffffff', '#ffffff', '#EAFBFF', '#00E5FF', '#5B4B8A'];

        const init = () => {
            canvas.width = width;
            canvas.height = height;
            stars.length = 0;
            for (let i = 0; i < count; i++) {
                stars.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    z: Math.random() * 2 + 0.5, // Depth factor for parallax/speed
                    size: Math.random() * 2,
                    color: colors[Math.floor(Math.random() * colors.length)]
                });
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            stars.forEach((star) => {
                // Move star
                star.y += star.z * speed * 0.2;

                // Reset if out of bounds
                if (star.y > height) {
                    star.y = 0;
                    star.x = Math.random() * width;
                }

                // Draw star
                ctx.beginPath();
                ctx.fillStyle = star.color;
                ctx.globalAlpha = Math.random() * 0.5 + 0.5; // Twinkle
                ctx.arc(star.x, star.y, star.size * 0.8, 0, Math.PI * 2);
                ctx.fill();
            });

            requestAnimationFrame(animate);
        };

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            init();
        };

        init();
        animate();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [count, speed]);

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 pointer-events-none z-0 ${className}`}
        />
    );
};
