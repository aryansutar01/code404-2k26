# Razorpay Integration Implementation Plan

## Overview
Integrated Razorpay payment gateway into the Code404 2k26 event registration flow. The integration ensures that users must complete payment before their registration is saved to Firebase.

## Changes Made
1.  **Backend API (`src/app/api/razorpay/route.ts`)**:
    *   Created a Next.js API route to secure the order creation process.
    *   Uses `razorpay` Node.js SDK to generate orders with specific amounts based on event selection.

2.  **Frontend Components**:
    *   **RegistrationModal (`src/components/forms/RegistrationModal.tsx`)**:
        *   Updated to handle the payment flow.
        *   `onSubmit` now creates an order -> opens Razorpay modal -> saves to Firebase on success.
    *   **InlineRegistrationForm (`src/components/forms/InlineRegistrationForm.tsx`)**:
        *   Mirrored the same payment logic as the modal for consistency.

3.  **Environment Configuration**:
    *   Moved Firebase config to `.env`.
    *   Added Razorpay keys to `.env`.

4.  **Cleanup**:
    *   Removed the standalone `/register` page and directory as it is no longer needed.

## User Actions Required
1.  **Update Environment Variables**:
    *   Open `.env` file.
    *   Replace `YOUR_RAZORPAY_KEY_ID` and `YOUR_RAZORPAY_KEY_SECRET` with your actual Razorpay Test Mode keys.
    *   Ensure Firebase variables are correct.

2.  **Restart Server**:
    *   Run `npm run dev` (or restart the current process) to load the new environment variables.

3.  **Verify**:
    *   Go to `http://localhost:3000`.
    *   Click on an event card -> "Register Now".
    *   Fill the form and click "Proceed to Payment".
    *   Complete a test payment.
    *   Check Firestore to see the registration with `paymentStatus: 'success'`.
