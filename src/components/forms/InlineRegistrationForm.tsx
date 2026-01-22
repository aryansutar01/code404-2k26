'use client';

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

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
    if (data.eventName === "Avatar: The Algo War") {
        return data.category && data.category.length > 0;
    }
    return true;
}, {
    message: "Please select a category",
    path: ["category"],
});

export function InlineRegistrationForm() {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        resolver: zodResolver(registrationSchema),
    });

    const selectedEvent = watch("eventName");

    useEffect(() => {
        if (selectedEvent !== "Avatar: The Algo War") {
            setValue("category", "");
        }
    }, [selectedEvent, setValue]);

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

    async function saveRegistration(data: any) {
        try {
            const registrationData = {
                ...data,
                paymentStatus: 'pending',
                createdAt: serverTimestamp(),
            };

            await addDoc(collection(db, "registrations"), registrationData);

            reset();
            toast.success("Registration Successful!", {
                description: "We'll contact you for payment and event details via email."
            });

            return true;
        } catch (error) {
            console.error("Firestore Error:", error);
            toast.error("Registration Failed", {
                description: "Something went wrong. Please try again later."
            });
            return false;
        }
    }

    async function onSubmit(data: any) {
        await saveRegistration(data);
    }

    return (
        <div className="glass-card p-6 md:p-8 rounded-3xl border border-white/10 relative">
            {/* Header */}
            <div className="mb-6">
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
                    Register Now
                </h3>
                <p className="text-soft-white/60 text-sm md:text-base">
                    Fill in your details to secure your spot
                </p>
                {selectedEvent && (
                    <div className="mt-4 p-3 rounded-xl bg-deep-cyan/10 border border-deep-cyan/20">
                        <div className="flex justify-between items-center">
                            <span className="text-soft-white/70 text-sm">Registration Fee:</span>
                            <span className="text-deep-cyan text-lg font-bold">{getEventFee(selectedEvent)}</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name */}
                <div>
                    <label htmlFor="name" className="block text-xs md:text-sm font-medium text-soft-white/80 mb-1.5">
                        Full Name *
                    </label>
                    <input
                        id="name"
                        {...register("name")}
                        className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm md:text-base placeholder:text-soft-white/30 focus:outline-none focus:border-deep-cyan/50 focus:ring-2 focus:ring-deep-cyan/20 transition-all"
                        placeholder="John Doe"
                    />
                    {errors.name && <span className="text-red-400 text-xs mt-1 block">{errors.name.message}</span>}
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email" className="block text-xs md:text-sm font-medium text-soft-white/80 mb-1.5">
                        Email Address *
                    </label>
                    <input
                        id="email"
                        type="email"
                        {...register("email")}
                        className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm md:text-base placeholder:text-soft-white/30 focus:outline-none focus:border-deep-cyan/50 focus:ring-2 focus:ring-deep-cyan/20 transition-all"
                        placeholder="john@example.com"
                    />
                    {errors.email && <span className="text-red-400 text-xs mt-1 block">{errors.email.message}</span>}
                </div>

                {/* Phone */}
                <div>
                    <label htmlFor="phone" className="block text-xs md:text-sm font-medium text-soft-white/80 mb-1.5">
                        Phone Number *
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-soft-white/50 text-xs md:text-sm pointer-events-none">
                            🇮🇳 +91
                        </span>
                        <input
                            id="phone"
                            type="tel"
                            inputMode="numeric"
                            {...register("phone")}
                            className="w-full pl-16 md:pl-20 pr-3 md:pr-4 py-2.5 md:py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm md:text-base placeholder:text-soft-white/30 focus:outline-none focus:border-deep-cyan/50 focus:ring-2 focus:ring-deep-cyan/20 transition-all"
                            placeholder="98765 43210"
                        />
                    </div>
                    {errors.phone && <span className="text-red-400 text-xs mt-1 block">{errors.phone.message}</span>}
                </div>

                {/* Department & Year */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="department" className="block text-xs md:text-sm font-medium text-soft-white/80 mb-1.5">
                            Department *
                        </label>
                        <select
                            id="department"
                            {...register("department")}
                            className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm md:text-base focus:outline-none focus:border-deep-cyan/50 focus:ring-2 focus:ring-deep-cyan/20 transition-all"
                        >
                            <option value="" className="bg-midnight-blue">Select Department</option>
                            {departmentOptions.map(opt => (
                                <option key={opt.value} value={opt.value} className="bg-midnight-blue">{opt.label}</option>
                            ))}
                        </select>
                        {errors.department && <span className="text-red-400 text-xs mt-1 block">{errors.department.message}</span>}
                    </div>

                    <div>
                        <label htmlFor="year" className="block text-xs md:text-sm font-medium text-soft-white/80 mb-1.5">
                            Year of Study *
                        </label>
                        <select
                            id="year"
                            {...register("year")}
                            className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm md:text-base focus:outline-none focus:border-deep-cyan/50 focus:ring-2 focus:ring-deep-cyan/20 transition-all"
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
                    <label htmlFor="eventName" className="block text-xs md:text-sm font-medium text-soft-white/80 mb-1.5">
                        Select Event *
                    </label>
                    <select
                        id="eventName"
                        {...register("eventName")}
                        className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm md:text-base focus:outline-none focus:border-deep-cyan/50 focus:ring-2 focus:ring-deep-cyan/20 transition-all"
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
                        <label htmlFor="category" className="block text-xs md:text-sm font-medium text-soft-white/80 mb-1.5">
                            Category *
                        </label>
                        <select
                            id="category"
                            {...register("category")}
                            className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm md:text-base focus:outline-none focus:border-deep-cyan/50 focus:ring-2 focus:ring-deep-cyan/20 transition-all"
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
                    <label htmlFor="prn" className="block text-xs md:text-sm font-medium text-soft-white/80 mb-1.5">
                        PRN / ID Number *
                    </label>
                    <input
                        id="prn"
                        {...register("prn")}
                        className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm md:text-base placeholder:text-soft-white/30 focus:outline-none focus:border-deep-cyan/50 focus:ring-2 focus:ring-deep-cyan/20 transition-all"
                        placeholder="Enter your college PRN"
                    />
                    {errors.prn && <span className="text-red-400 text-xs mt-1 block">{errors.prn.message}</span>}
                </div>

                {/* Submit */}
                <div className="pt-2">
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-12 md:h-14 text-base md:text-lg"
                    >
                        {isSubmitting ? "Submitting..." : "Complete Registration"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
