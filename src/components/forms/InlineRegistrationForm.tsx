'use client';

import { AlertCircle } from "lucide-react";

export function InlineRegistrationForm() {
    return (
        <div className="glass-card p-8 md:p-12 rounded-3xl border border-white/10 relative flex flex-col items-center justify-center text-center h-full min-h-[400px]">
            <div className="mb-6 p-4 rounded-full bg-red-500/10 border border-red-500/20">
                <AlertCircle className="w-12 h-12 text-red-400" />
            </div>

            <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                Registrations Closed
            </h3>

            <p className="text-soft-white/60 text-lg max-w-md mx-auto mb-8">
                Thank you for your overwhelming response! We have reached our capacity for this event.
            </p>

            <div className="p-4 rounded-xl bg-deep-cyan/5 border border-deep-cyan/10">
                <p className="text-deep-cyan text-sm font-medium">
                    Already registered? Check your email for confirmation details.
                </p>
            </div>
        </div>
    );
}
