'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import Image from 'next/image'; // Import Image component
import nextConfig from '../../next.config.mjs'; // Import the config

gsap.registerPlugin(ScrollTrigger);

// Get basePath from config
const basePath = nextConfig.basePath || '';

// Star Icon Component - Suggestion: Use yellow-500 for better contrast
const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg className={`w-6 h-6 ${filled ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> {/* Changed to yellow-500 */}
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

// Rating Component
const Rating = ({ score }: { score: number }) => (
  <div className="flex items-center mb-4"> {/* Added margin-bottom */}
    {[...Array(5)].map((_, i) => (
      <StarIcon key={i} filled={i < score} />
    ))}
  </div>
);

const testimonialsData = [
  {
    quote: "RoofReplacementsLLC did an outstanding job on our new roof. Professional, efficient, and the quality is top-notch! We felt informed throughout the whole process.",
    name: "John D.",
    location: "Orlando, FL",
    rating: 5,
    imageUrl: `${basePath}/assets/customers/1.png` // Added image URL
  },
  {
    quote: "Their team was courteous and cleaned up perfectly after the job was done. The repair was done quickly and effectively. Highly recommend their services!",
    name: "David R.",
    location: "Winter Park, FL",
    rating: 5,
    imageUrl: `${basePath}/assets/customers/2.png` // Added image URL
  },
  {
    quote: "From the initial inspection to the final walkthrough, the process was seamless and stress-free. Very happy with the result and the professionalism.",
    name: "Sarah M.",
    location: "Lake Mary, FL",
    rating: 5,
    imageUrl: `${basePath}/assets/customers/3.png` // Added image URL
  },
  {
    quote: "Found a leak that two other companies missed. They fixed it promptly and at a fair price. Excellent communication.",
    name: "Emily C.",
    location: "Altamonte Springs, FL",
    rating: 4,
    imageUrl: `${basePath}/assets/customers/4.png` // Added image URL
  },
  {
    quote: "The new roof looks fantastic and the installation crew was incredibly professional and efficient. Would definitely use them again.",
    name: "Jessica L.",
    location: "Oviedo, FL",
    rating: 5,
    imageUrl: `${basePath}/assets/customers/5.png` // Added image URL
  },
  {
    quote: "Great value and excellent service. They explained all the options clearly and helped us choose the best roof for our budget.",
    name: "Michael B.",
    location: "Casselberry, FL",
    rating: 5,
    imageUrl: `${basePath}/assets/customers/6.png` // Added image URL
  }
];

export default function Testimonials() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !textRef.current || cardsRef.current.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.to([titleRef.current, textRef.current], {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
      });
      gsap.to(cardsRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="testimonials" ref={sectionRef} className="py-16 md:py-24 bg-background-light dark:bg-background-dark overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Title and Subtitle */}
        <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold text-center mb-4 text-text-light dark:text-text-dark invisible translate-y-[50px]">
          What Our Clients Say
        </h2>
        <p ref={textRef} className="text-center text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto invisible translate-y-[50px]">
          Hear directly from homeowners who trusted us with their roofing needs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <div
              key={index}
              ref={el => { cardsRef.current[index] = el; }}
              className="bg-card-light dark:bg-card-dark p-6 md:p-8 rounded-xl shadow-lg border border-border-light dark:border-border-dark
                         flex flex-col items-center text-center
                         transform transition duration-300 ease-in-out hover:scale-[1.03] hover:shadow-xl
                         invisible translate-y-[50px]" // Keep h-full if needed for alignment, otherwise remove
            >
              {/* Customer Image and Info Section */}
              <div className="mb-6 flex flex-col items-center">
                <div className="relative w-24 h-24 rounded-full overflow-hidden bg-primary-light/10 dark:bg-primary-dark/20 ring-2 ring-primary-light/30 dark:ring-primary-dark/40 mb-3">
                  <Image
                    src={testimonial.imageUrl}
                    alt={`Photo of ${testimonial.name}`}
                    fill
                    sizes="96px" // Corresponds to w-24
                    className="object-contain p-1" // Use contain if images aren't square, adjust padding if needed
                    unoptimized // Important due to static export config
                  />
                </div>
                <p className="font-semibold text-lg text-text-light dark:text-text-dark">{testimonial.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.location}</p>
              </div>

              {/* Rating */}
              <Rating score={testimonial.rating} />

              {/* Quote Section */}
              <div className="relative flex-grow mt-4"> {/* Added margin-top */}
                <FaQuoteLeft className="absolute -top-2 -left-2 text-3xl text-gray-300 dark:text-gray-600 opacity-50" />
                <blockquote className="text-gray-700 dark:text-gray-300 italic text-base md:text-lg px-4 z-10"> {/* Adjusted text size and padding */}
                  {testimonial.quote}
                </blockquote>
                <FaQuoteRight className="absolute -bottom-2 -right-2 text-3xl text-gray-300 dark:text-gray-600 opacity-50" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}