'use client';

import React, { useState, useEffect, useRef } from 'react'; // Import useEffect, useRef
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { gsap } from 'gsap'; // Import GSAP
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Import ScrollTrigger

gsap.registerPlugin(ScrollTrigger); // Register plugin

// Define validation schema with Zod
const FormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(), // Example: Optional phone number
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

// Infer the type from the schema
type FormValues = z.infer<typeof FormSchema>;

// --- Google Form Configuration ---
// !! REPLACE THESE WITH YOUR ACTUAL VALUES !!
// Find these by inspecting your live Google Form's HTML source code
// or by following the instructions in google-form-submission-how-to.md
const GOOGLE_FORM_ACTION_URL = 'YOUR_GOOGLE_FORM_ACTION_URL_HERE'; // e.g., 'https://docs.google.com/forms/d/e/xxxx/formResponse'
const NAME_FIELD_ID = 'entry.YOUR_NAME_FIELD_ID';         // e.g., 'entry.123456789'
const EMAIL_FIELD_ID = 'entry.YOUR_EMAIL_FIELD_ID';       // e.g., 'entry.987654321'
const PHONE_FIELD_ID = 'entry.YOUR_PHONE_FIELD_ID';       // e.g., 'entry.112233445' (Optional)
const MESSAGE_FIELD_ID = 'entry.YOUR_MESSAGE_FIELD_ID';   // e.g., 'entry.556677889'
// ---------------------------------

export default function ContactForm() {
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [submissionMessage, setSubmissionMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });

  const sectionRef = useRef(null); // Ref for the section
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const formBoxRef = useRef(null); // Ref for the form container

  // GSAP Scroll Animation - Updated to use autoAlpha
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from([titleRef.current, textRef.current], {
        autoAlpha: 0, // Use autoAlpha
        y: 50,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
      });
      gsap.from(formBoxRef.current, {
        autoAlpha: 0, // Use autoAlpha
        y: 50,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setSubmissionStatus('submitting');
    setSubmissionMessage(''); // Clear previous messages

    const formData = new FormData();
    formData.append(NAME_FIELD_ID, data.name);
    formData.append(EMAIL_FIELD_ID, data.email);
    if (data.phone) { // Only append phone if provided
        formData.append(PHONE_FIELD_ID, data.phone);
    }
    formData.append(MESSAGE_FIELD_ID, data.message);

    try {
      const response = await fetch(GOOGLE_FORM_ACTION_URL, {
        method: 'POST',
        mode: 'no-cors', // Important: Google Forms blocks CORS, 'no-cors' prevents errors but hides response details
        body: formData,
      });

      // Since mode is 'no-cors', we can't reliably check response.ok or status.
      // We assume success if the fetch doesn't throw an error.
      setSubmissionStatus('success');
      setSubmissionMessage('Thank you! Your message has been sent successfully.');
      reset(); // Reset form fields

      // Optionally hide success message after a few seconds
      setTimeout(() => {
          setSubmissionStatus('idle');
          setSubmissionMessage('');
      }, 5000); // Hide after 5 seconds

    } catch (error) {
      console.error('Form submission error:', error);
      setSubmissionStatus('error');
      setSubmissionMessage('An error occurred while sending your message. Please try again later.');
    }
  };

  // Common input classes for consistent styling
  const inputClasses = "w-full p-3 rounded-md border bg-background-light dark:bg-card-dark text-text-light dark:text-text-dark placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none transition duration-300 ease-in-out"; // Removed focus:ring-2
  const borderClasses = "border-border-light dark:border-border-dark";
  // Define the glowing effect using box-shadow
  const focusClasses = "focus:border-primary-light dark:focus:border-primary-dark focus:shadow-[0_0_0_2px_rgba(0,122,255,0.5)] dark:focus:shadow-[0_0_0_2px_rgba(10,132,255,0.5)]"; // Adjusted shadow for light/dark
  const errorClasses = "border-red-500 dark:border-red-400 focus:shadow-[0_0_0_2px_rgba(239,68,68,0.5)] dark:focus:shadow-[0_0_0_2px_rgba(248,113,113,0.5)]"; // Error glow

  return (
    <section id="contact" ref={sectionRef} className="py-16 md:py-24 bg-background-light dark:bg-background-dark overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Remove opacity-0, add invisible */}
        <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold text-center mb-4 text-text-light dark:text-text-dark invisible">
          Get a Free Quote
        </h2>
        {/* Remove opacity-0, add invisible */}
        <p ref={textRef} className="text-center text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-xl mx-auto invisible">
          Ready to transform your roof? Fill out the form below, and we'll get back to you shortly.
        </p>
        {/* Remove opacity-0, add invisible */}
        <div ref={formBoxRef} className="max-w-lg mx-auto bg-card-light dark:bg-card-dark p-8 rounded-lg shadow-xl border border-border-light dark:border-border-dark invisible">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Your Full Name"
                {...register('name')}
                className={`${inputClasses} ${errors.name ? errorClasses : `${borderClasses} ${focusClasses}`}`}
                aria-invalid={errors.name ? "true" : "false"}
                disabled={submissionStatus === 'submitting'}
              />
              {errors.name && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.name.message}</p>}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                {...register('email')}
                className={`${inputClasses} ${errors.email ? errorClasses : `${borderClasses} ${focusClasses}`}`}
                aria-invalid={errors.email ? "true" : "false"}
                disabled={submissionStatus === 'submitting'}
              />
              {errors.email && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.email.message}</p>}
            </div>

            {/* Phone Field (Optional) */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone <span className="text-xs text-gray-500">(Optional)</span></label>
              <input
                id="phone"
                type="tel"
                placeholder="(123) 456-7890"
                {...register('phone')}
                className={`${inputClasses} ${errors.phone ? errorClasses : `${borderClasses} ${focusClasses}`}`}
                aria-invalid={errors.phone ? "true" : "false"}
                disabled={submissionStatus === 'submitting'}
              />
              {errors.phone && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.phone.message}</p>}
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
              <textarea
                id="message"
                placeholder="Tell us about your roofing needs..."
                rows={5}
                {...register('message')}
                className={`${inputClasses} ${errors.message ? errorClasses : `${borderClasses} ${focusClasses}`}`}
                aria-invalid={errors.message ? "true" : "false"}
                disabled={submissionStatus === 'submitting'}
              />
              {errors.message && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.message.message}</p>}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={submissionStatus === 'submitting'}
                className={`w-full bg-primary-light dark:bg-primary-dark text-white font-semibold py-3 px-6 rounded-lg shadow hover:opacity-90 transition-opacity duration-200 flex items-center justify-center ${submissionStatus === 'submitting' ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {submissionStatus === 'submitting' ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </div>

            {/* Submission Status Message */}
            {submissionMessage && (
              <div className={`mt-4 text-center text-sm p-3 rounded-md ${
                submissionStatus === 'success' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                submissionStatus === 'error' ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200' : ''
              }`}>
                {submissionMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}