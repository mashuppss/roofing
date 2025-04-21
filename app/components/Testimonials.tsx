'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Import quote icons
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

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
    rating: 5
  },
  {
    quote: "Their team was courteous and cleaned up perfectly after the job was done. The repair was done quickly and effectively. Highly recommend their services!",
    name: "Sarah M.",
    location: "Winter Park, FL",
    rating: 5
  },
  {
    quote: "From the initial inspection to the final walkthrough, the process was seamless and stress-free. Very happy with the result and the professionalism.",
    name: "David R.",
    location: "Lake Mary, FL",
    rating: 5
  },
  {
    quote: "Found a leak that two other companies missed. They fixed it promptly and at a fair price. Excellent communication.",
    name: "Emily C.",
    location: "Altamonte Springs, FL",
    rating: 4
  },
  {
    quote: "The new roof looks fantastic and the installation crew was incredibly professional and efficient. Would definitely use them again.",
    name: "Michael B.",
    location: "Oviedo, FL",
    rating: 5
  },
  {
    quote: "Great value and excellent service. They explained all the options clearly and helped us choose the best roof for our budget.",
    name: "Jessica L.",
    location: "Casselberry, FL",
    rating: 5
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
              className="bg-card-light dark:bg-card-dark p-8 rounded-xl shadow-lg border border-border-light dark:border-border-dark
                         flex flex-col items-center text-center h-full
                         transform transition duration-300 ease-in-out hover:scale-[1.03] hover:shadow-xl
                         invisible translate-y-[50px]"
            >
              <Rating score={testimonial.rating} />
              <div className="relative flex-grow flex flex-col justify-center">
                <FaQuoteLeft className="absolute top-0 left-0 text-3xl text-gray-300 dark:text-gray-600 opacity-50" />
                <blockquote className="text-gray-800 dark:text-gray-200 italic text-lg my-4 px-8 z-10">
                  {testimonial.quote}
                </blockquote>
                <FaQuoteRight className="absolute bottom-0 right-0 text-3xl text-gray-300 dark:text-gray-600 opacity-50" />
              </div>
              <footer className="mt-auto pt-4">
                <p className="font-semibold text-text-light dark:text-text-dark">{testimonial.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.location}</p>
              </footer>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}