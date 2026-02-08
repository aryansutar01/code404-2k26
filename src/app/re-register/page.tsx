import { Suspense } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ReRegistrationForm } from '@/components/forms/ReRegistrationForm';
import Image from 'next/image';

export default function ReRegisterPage() {
    return (
        <main className="bg-midnight-blue min-h-screen text-soft-white selection:bg-deep-cyan selection:text-midnight-blue flex flex-col">
            <Navbar />

            <div className="flex-grow relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-midnight-blue to-black">
                {/* Background Effects */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-deep-cyan/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-electric-teal/10 rounded-full blur-[120px]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />

                    {/* Decorative Woodsprites */}
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
                    <div className="max-w-2xl mx-auto">
                        <Suspense fallback={<div className="text-center text-soft-white/60">Loading...</div>}>
                            <ReRegistrationForm />
                        </Suspense>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
