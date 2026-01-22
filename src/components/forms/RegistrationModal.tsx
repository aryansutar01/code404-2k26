'use client';

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { X, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import Script from 'next/script';

/* -------------------- Validation Schema -------------------- */
const registrationSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    prn: z.string().min(1, "PRN is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().length(10, "Phone number must be exactly 10 digits"),
    department: z.string().min(1, "Please select a department"),
    year: z.string().min(1, "Please select a year"),
    eventName: z.string().min(1, "Please select an event"),
    category: z.string().optional(),
}).refine((data) => {
    // Category is required only if eventName is "Avatar: The Algo War"
    if (data.eventName === "Avatar: The Algo War") {
        return data.category && data.category.length > 0;
    }
    return true;
}, {
    message: "Please select a category",
    path: ["category"],
});

interface RegistrationModalProps {
    isOpen: boolean;
    onClose: () => void;
    preselectedEvent?: string;
}

declare global {
    interface Window {
        Razorpay: any;
    }
}

export function RegistrationModal({ isOpen, onClose, preselectedEvent }: RegistrationModalProps) {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        resolver: zodResolver(registrationSchema),
        defaultValues: {
            eventName: preselectedEvent || "",
        }
    });

    const [loading, setLoading] = useState(false);

    const selectedEvent = watch("eventName");

    // Clear category when event changes
    useEffect(() => {
        if (selectedEvent !== "Avatar: The Algo War") {
            setValue("category", "");
        }
    }, [selectedEvent, setValue]);

    // Update form when preselectedEvent changes
    useEffect(() => {
        if (preselectedEvent) {
            setValue("eventName", preselectedEvent);
        }
    }, [preselectedEvent, setValue]);

    const departmentOptions = [
        { value: "CSE", label: "Computer Science Engineering" },
        { value: "CSIT", label: "CS and IT" },
        { value: "MECH", label: "Mechanical Engineering" },
        { value: "METR", label: "Mechatronics" },
        { value: "ENTC", label: "Electronics and Telecom" },
        { value: "CIVIL", label: "Civil Engineering" },
        { value: "AIML", label: "AI and Machine Learning" },
        { value: "ROBOTICS", label: "Robotics" },
        { value: "BSC", label: "Bachelor of Science" },
        { value: "BCS", label: "Bachelor of CS" },
        { value: "BCA", label: "BCA" },
        { value: "MCA", label: "MCA" },
        { value: "Other", label: "Other" },
    ];

    const yearOptions = [
        { value: "FY", label: "First Year" },
        { value: "SY", label: "Second Year" },
        { value: "TY", label: "Third Year" },
        { value: "Final", label: "Final Year" },
    ];

    const eventOptions = [
        { value: "Avatar: The Algo War", label: "Avatar: The Algo War - ₹99" },
        { value: "Neural Link", label: "Neural Link - ₹149/team" },
        { value: "The Voice of Eywa", label: "The Voice of Eywa - ₹59" },
    ];

    const categoryOptions = [
        { value: "NOVICE", label: "Novice" },
        { value: "EXPERT", label: "Expert" },
    ];

    const getEventFee = (eventName: string) => {
        switch (eventName) {
            case "Avatar: The Algo War": return "₹99";
            case "Neural Link": return "₹149";
            case "The Voice of Eywa": return "₹59";
            default: return "";
        }
    };

    const getEventPrice = (eventName: string) => {
        switch (eventName) {
            case "Avatar: The Algo War": return 99;
            case "Neural Link": return 149;
            case "The Voice of Eywa": return 59;
            default: return 0;
        }
    };

    /* -------------------- Submit & Payment Handler -------------------- */
    async function onSubmit(data: any) {
        setLoading(true);
        try {
            const price = getEventPrice(data.eventName);

            if (price === 0) {
                toast.error("Invalid event details found");
                setLoading(false);
                return;
            }

            // 1. Create Order
            const response = await fetch('/api/razorpay', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: price,
                    currency: 'INR',
                    receipt: `receipt_${Date.now()}`
                })
            });

            const order = await response.json();

            if (!response.ok) {
                console.error('Order creation failed:', order);
                throw new Error(order.error || 'Failed to create order');
            }

            // 2. Initialize Razorpay
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: "Code404 2k26",
                description: `${data.eventName} Registration`,
                order_id: order.id,
                handler: async function (response: any) {
                    try {
                        const registrationData = {
                            ...data,
                            amount: price,
                            paymentId: response.razorpay_payment_id,
                            orderId: response.razorpay_order_id,
                            signature: response.razorpay_signature,
                            paymentStatus: 'success',
                            createdAt: serverTimestamp(),
                        };

                        await addDoc(collection(db, "registrations"), registrationData);

                        reset();
                        toast.success("Registration Successful!", {
                            description: "Payment verified. See you at the event!"
                        });
                        setTimeout(() => onClose(), 2000);

                    } catch (error) {
                        console.error("Firestore Error:", error);
                        toast.error("Payment successful but registration failed", {
                            description: "Please contact support with Payment ID: " + response.razorpay_payment_id
                        });
                    }
                },
                prefill: {
                    name: data.name,
                    email: data.email,
                    contact: data.phone
                },
                theme: {
                    color: "#00E5FF"
                }
            };

            if (!window.Razorpay) {
                throw new Error("Razorpay SDK not loaded");
            }

            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', function (response: any) {
                toast.error("Payment Failed", {
                    description: response.error.description
                });
            });
            rzp.open();

        } catch (error) {
            console.error("Payment Error:", error);
            toast.error("Something went wrong", {
                description: "Could not initiate payment. Please try again."
            });
        } finally {
            setLoading(false);
        }
    }

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
        >
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="glass-card p-8 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/10 relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                    <X className="w-5 h-5 text-soft-white/60" />
                </button>

                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
                        Register Now
                    </h2>
                    <p className="text-soft-white/60 text-sm md:text-base">
                        Unlock exclusive experiences. Fill in your details below.
                    </p>
                    {selectedEvent && (
                        <div className="mt-4 p-3 rounded-xl bg-deep-cyan/10 border border-deep-cyan/20">
                            <div className="flex justify-between items-center">
                                <span className="text-soft-white/70 text-sm">Registration Fee:</span>
                                <span className="text-deep-cyan text-xl font-bold">{getEventFee(selectedEvent)}</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-soft-white/80 mb-2">
                            Full Name *
                        </label>
                        <input
                            id="name"
                            {...register("name")}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-soft-white/30 focus:outline-none focus:border-deep-cyan/50 focus:ring-2 focus:ring-deep-cyan/20 transition-all"
                            placeholder="John Doe"
                        />
                        {errors.name && <span className="text-red-400 text-xs mt-1 block">{errors.name.message}</span>}
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-soft-white/80 mb-2">
                            Email Address *
                        </label>
                        <input
                            id="email"
                            type="email"
                            {...register("email")}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-soft-white/30 focus:outline-none focus:border-deep-cyan/50 focus:ring-2 focus:ring-deep-cyan/20 transition-all"
                            placeholder="john@example.com"
                        />
                        {errors.email && <span className="text-red-400 text-xs mt-1 block">{errors.email.message}</span>}
                    </div>

                    {/* Phone */}
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-soft-white/80 mb-2">
                            Phone Number *
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-soft-white/50 text-sm pointer-events-none">
                                🇮🇳 +91
                            </span>
                            <input
                                id="phone"
                                type="tel"
                                inputMode="numeric"
                                {...register("phone")}
                                className="w-full pl-20 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-soft-white/30 focus:outline-none focus:border-deep-cyan/50 focus:ring-2 focus:ring-deep-cyan/20 transition-all"
                                placeholder="98765 43210"
                            />
                        </div>
                        {errors.phone && <span className="text-red-400 text-xs mt-1 block">{errors.phone.message}</span>}
                    </div>

                    {/* Department & Year */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label htmlFor="department" className="block text-sm font-medium text-soft-white/80 mb-2">
                                Department *
                            </label>
                            <select
                                id="department"
                                {...register("department")}
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-deep-cyan/50 focus:ring-2 focus:ring-deep-cyan/20 transition-all"
                            >
                                <option value="" className="bg-midnight-blue">Select Department</option>
                                {departmentOptions.map(opt => (
                                    <option key={opt.value} value={opt.value} className="bg-midnight-blue">{opt.label}</option>
                                ))}
                            </select>
                            {errors.department && <span className="text-red-400 text-xs mt-1 block">{errors.department.message}</span>}
                        </div>

                        <div>
                            <label htmlFor="year" className="block text-sm font-medium text-soft-white/80 mb-2">
                                Year of Study *
                            </label>
                            <select
                                id="year"
                                {...register("year")}
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-deep-cyan/50 focus:ring-2 focus:ring-deep-cyan/20 transition-all"
                            >
                                <option value="" className="bg-midnight-blue">Select Year</option>
                                {yearOptions.map(opt => (
                                    <option key={opt.value} value={opt.value} className="bg-midnight-blue">{opt.label}</option>
                                ))}
                            </select>
                            {errors.year && <span className="text-red-400 text-xs mt-1 block">{errors.year.message}</span>}
                        </div>
                    </div>

                    {/* Event */}
                    <div>
                        <label htmlFor="eventName" className="block text-sm font-medium text-soft-white/80 mb-2">
                            Select Event *
                        </label>
                        <select
                            id="eventName"
                            {...register("eventName")}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-deep-cyan/50 focus:ring-2 focus:ring-deep-cyan/20 transition-all"
                        >
                            <option value="" className="bg-midnight-blue">Select Event</option>
                            {eventOptions.map(opt => (
                                <option key={opt.value} value={opt.value} className="bg-midnight-blue">{opt.label}</option>
                            ))}
                        </select>
                        {errors.eventName && <span className="text-red-400 text-xs mt-1 block">{errors.eventName.message}</span>}
                    </div>

                    {/* Category (conditional) */}
                    {selectedEvent === "Avatar: The Algo War" && (
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-soft-white/80 mb-2">
                                Category *
                            </label>
                            <select
                                id="category"
                                {...register("category")}
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-deep-cyan/50 focus:ring-2 focus:ring-deep-cyan/20 transition-all"
                            >
                                <option value="" className="bg-midnight-blue">Select Category</option>
                                {categoryOptions.map(opt => (
                                    <option key={opt.value} value={opt.value} className="bg-midnight-blue">{opt.label}</option>
                                ))}
                            </select>
                            {errors.category && <span className="text-red-400 text-xs mt-1 block">{errors.category.message}</span>}
                        </div>
                    )}

                    {/* PRN */}
                    <div>
                        <label htmlFor="prn" className="block text-sm font-medium text-soft-white/80 mb-2">
                            PRN / ID Number *
                        </label>
                        <input
                            id="prn"
                            {...register("prn")}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-soft-white/30 focus:outline-none focus:border-deep-cyan/50 focus:ring-2 focus:ring-deep-cyan/20 transition-all"
                            placeholder="Enter your college PRN"
                        />
                        {errors.prn && <span className="text-red-400 text-xs mt-1 block">{errors.prn.message}</span>}
                    </div>

                    {/* Submit */}
                    <div className="flex gap-4 pt-4">
                        <Button
                            type="button"
                            variant="glass"
                            onClick={() => {
                                reset();
                                onClose();
                            }}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting || loading}
                            className="flex-1"
                        >
                            {loading || isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                "Proceed to Payment"
                            )}
                        </Button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
}
