import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface TicketProps {
    title: string;
    price: string;
    benefits: string[];
    featured?: boolean;
}

const TicketCard = ({ title, price, benefits, featured = false }: TicketProps) => (
    <div className={`relative p-8 rounded-2xl border ${featured ? 'bg-white/5 border-deep-cyan shadow-[0_0_30px_rgba(0,229,255,0.15)] scale-105 z-10' : 'glass-card border-white/10 opacity-90 hover:opacity-100'} flex flex-col transition-all duration-300`}>
        {featured && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-deep-cyan text-midnight-blue px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">Recommended</div>}
        <h3 className="text-xl font-bold font-display mb-2 text-white">{title}</h3>
        <div className="text-4xl font-bold mb-6 font-display text-electric-teal">{price}</div>
        <ul className="space-y-4 mb-8 flex-1">
            {benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-soft-white/80">
                    <Check className="w-5 h-5 text-bio-green shrink-0 drop-shadow-[0_0_5px_rgba(77,255,210,0.5)]" />
                    {b}
                </li>
            ))}
        </ul>
        <Button variant={featured ? 'default' : 'outline'} className="w-full">Select Pass</Button>
    </div>
);

export default function RegisterPage() {
    return (
        <main className="min-h-screen bg-midnight-blue text-soft-white selection:bg-deep-cyan selection:text-midnight-blue">
            <Navbar />
            <div className="pt-32 pb-20 container mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-display font-bold mb-4">
                        Secure Your <span className="text-deep-cyan text-glow">Spot</span>
                    </h1>
                    <p className="text-soft-white/60">Choose your journey into Bioluminescent Futurism.</p>
                </div>

                {/* Tickets */}
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20 items-center">
                    <TicketCard
                        title="Student Pass"
                        price="₹499"
                        benefits={['Access to all talks', 'Hackathon participation', 'Swag kit', 'Digital Certificate', 'Refreshments']}
                    />
                    <TicketCard
                        title="Pro Pass"
                        price="₹999"
                        featured
                        benefits={['All Student perks', 'Priority seating', 'Networking dinner', 'Workshop access', 'Premium Swag Box', 'Mentor Connect']}
                    />
                    <TicketCard
                        title="VIP Pass"
                        price="₹2499"
                        benefits={['All Pro perks', 'Backstage access', 'Private mentor session', 'VIP Lounge access', 'Exclusive After-party']}
                    />
                </div>

                {/* Form Placeholder */}
                <div className="max-w-2xl mx-auto glass p-8 md:p-12 rounded-2xl border border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-deep-cyan/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                    <h2 className="text-2xl font-bold mb-8 relative z-10">Registration Details</h2>
                    <form className="space-y-6 relative z-10">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-soft-white/80">Full Name</label>
                                <input className="w-full bg-midnight-blue/50 border border-white/10 rounded-md p-3 focus:border-deep-cyan focus:ring-1 focus:ring-deep-cyan outline-none transition-all placeholder:text-white/20" placeholder="John Doe" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-soft-white/80">Email</label>
                                <input type="email" className="w-full bg-midnight-blue/50 border border-white/10 rounded-md p-3 focus:border-deep-cyan focus:ring-1 focus:ring-deep-cyan outline-none transition-all placeholder:text-white/20" placeholder="john@example.com" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-soft-white/80">Phone</label>
                                <input type="tel" className="w-full bg-midnight-blue/50 border border-white/10 rounded-md p-3 focus:border-deep-cyan focus:ring-1 focus:ring-deep-cyan outline-none transition-all placeholder:text-white/20" placeholder="+91 98765 43210" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-soft-white/80">Organization / College</label>
                                <input className="w-full bg-midnight-blue/50 border border-white/10 rounded-md p-3 focus:border-deep-cyan focus:ring-1 focus:ring-deep-cyan outline-none transition-all placeholder:text-white/20" placeholder="XYZ University" />
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button size="lg" className="w-full py-6 text-lg font-bold shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:shadow-[0_0_30px_rgba(0,229,255,0.5)]">
                                Proceed to Payment
                            </Button>
                            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-soft-white/40">
                                <span>Secured by Razorpay</span>
                                <span className="w-1 h-1 rounded-full bg-white/20" />
                                <span>UPI Accepted</span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}
