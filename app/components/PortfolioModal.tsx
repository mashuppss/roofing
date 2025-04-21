'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

// Define the type for the project data
interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  imageUrl: string; // Base URL
  textParam: string; // Text parameter
  description?: string; // Add more details if needed
  details?: string[];
}

interface PortfolioModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
}

// Simple Close Icon
const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default function PortfolioModal({ item, onClose }: PortfolioModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Animation for modal open/close
  useEffect(() => {
    const body = document.body;
    if (item) {
      // Prevent background scrolling when modal is open
      body.style.overflow = 'hidden';
      gsap.timeline()
        .to(backdropRef.current, { opacity: 1, duration: 0.3 })
        .to(contentRef.current, { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(1.7)' }, "-=0.2");
    } else {
      // Restore background scrolling
      body.style.overflow = 'auto';
      // Ensure elements exist before animating close
      if (backdropRef.current && contentRef.current) {
        gsap.timeline()
          .to(contentRef.current, { opacity: 0, scale: 0.9, duration: 0.2, ease: 'power2.in' })
          .to(backdropRef.current, { opacity: 0, duration: 0.2 }, "-=0.1");
      }
    }
    // Cleanup function
    return () => {
      body.style.overflow = 'auto';
    };
  }, [item]);

  // Handle clicks outside the content to close
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !contentRef.current?.contains(e.target as Node)) {
      onClose();
    }
  };

  // Handle Escape key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null; // Don't render if no item is selected

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4" // High z-index
      onClick={handleBackdropClick} // Close on backdrop click
      aria-labelledby="portfolio-modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm opacity-0" // Start hidden
      ></div>

      {/* Modal Content */}
      <div
        ref={contentRef}
        className="relative bg-card-light dark:bg-card-dark rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 md:p-8 opacity-0 scale-90" // Start hidden & scaled down
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark transition-colors z-10"
          aria-label="Close modal"
        >
          <CloseIcon />
        </button>

        {/* Project Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Image */}
          <div className="relative aspect-video md:aspect-auto md:h-full rounded-md overflow-hidden">
            <Image
              src={`${item.imageUrl}.png?text=${item.textParam}`} // Construct URL correctly
              alt={item.title}
              fill
              sizes="(max-width: 768px) 90vw, 40vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Text Content */}
          <div>
            <h2 id="portfolio-modal-title" className="text-2xl md:text-3xl font-bold mb-3 text-text-light dark:text-text-dark">{item.title}</h2>
            <p className="text-sm uppercase tracking-wider text-primary-light dark:text-primary-dark mb-4">{item.category}</p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {item.description || 'Detailed description of the project, highlighting the materials used, challenges overcome, and the final outcome. Lorem ipsum dolor sit amet consectetur adipisicing elit.'}
            </p>
            {item.details && item.details.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2 text-text-light dark:text-text-dark">Project Highlights:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  {item.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </div>
            )}
            {/* Add more details like client, date, etc. if available */}
          </div>
        </div>
      </div>
    </div>
  );
}