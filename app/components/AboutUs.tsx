'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Simple icon for timeline points
const TimelineIcon = () => (
    <div className="absolute left-[-8px] top-1/2 transform -translate-y-1/2 w-4 h-4 bg-primary-light dark:bg-primary-dark rounded-full border-2 border-background-light dark:border-background-dark"></div>
);

const timelineData = [
    { year: '2010', title: 'Foundation Laid', description: 'RoofReplacementsLLC founded with a commitment to quality and customer service.' },
    { year: '2015', title: 'Expansion', description: 'Expanded services to cover the wider Central Florida region.' },
    { year: '2018', title: 'Milestone', description: 'Completed our 500th successful roof replacement project.' },
    { year: '2022', title: 'Innovation', description: 'Integrated drone technology for advanced roof inspections.' },
    { year: 'Present', title: 'Continued Growth', description: 'Consistently recognized for excellence and reliability in roofing.' },
];

export default function AboutUs() {
    const sectionRef = useRef(null);
    const topImageRef = useRef(null); // Ref for the top image
    const leftColRef = useRef(null); // Ref for left column content
    const rightColRef = useRef(null); // Ref for right column (timeline)
    const timelineItemsRef = useRef<(HTMLDivElement | null)[]>([]); // Ref for individual timeline items

    useEffect(() => {
        // Ensure refs are available
        if (!topImageRef.current || !leftColRef.current || !rightColRef.current) return;

        const timelineItems = timelineItemsRef.current.filter(el => el !== null);

        const ctx = gsap.context(() => {
            // Animate top image
            gsap.to(topImageRef.current, {
                autoAlpha: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
            });

            // Animate left column
            gsap.to(leftColRef.current, {
                autoAlpha: 1,
                x: 0,
                duration: 0.8,
                delay: 0.2, // Stagger slightly after image
                ease: 'power3.out',
                scrollTrigger: { trigger: topImageRef.current, start: 'bottom 90%', toggleActions: 'play none none none' }, // Trigger when bottom of image is visible
            });

            // Animate right column (timeline container)
            gsap.to(rightColRef.current, {
                autoAlpha: 1,
                x: 0,
                duration: 0.8,
                delay: 0.3, // Stagger slightly after left column
                ease: 'power3.out',
                scrollTrigger: { trigger: topImageRef.current, start: 'bottom 90%', toggleActions: 'play none none none' },
            });

            // Animate timeline items individually (optional, if needed)
            if (timelineItems.length > 0) {
                gsap.to(timelineItems, {
                    autoAlpha: 1,
                    x: 0,
                    duration: 0.5,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: rightColRef.current, start: 'top 80%', toggleActions: 'play none none none' }, // Trigger when timeline column starts entering
                });
            }

        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        // Keep section relative for background image
        <section id="about" ref={sectionRef} className="relative py-16 md:py-24 bg-card-light dark:bg-card-dark overflow-hidden">
            {/* Background Image Container */}
            <div className="absolute inset-0">
                <Image
                    src="/assets/inspection/Best-Roofing-Contractors-In-Your-Area-scaled-1.jpeg"
                    alt="Roofing background"
                    fill
                    className="object-cover opacity-15 dark:opacity-5"
                    priority
                />
                <div className="absolute inset-0 bg-card-light/85 dark:bg-card-dark/95"></div>
            </div>

            {/* Content Container */}
            <div className="container mx-auto px-4 relative z-10">

                {/* Top Image */}
                <div ref={topImageRef} className="mb-12 md:mb-16 h-64 md:h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-xl invisible translate-y-[50px]">
                    <div className="relative w-full h-full">
                        <Image
                            src="/assets/homepage09.jpg"
                            alt="Roofing team working on a roof"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px" // Adjust sizes
                            className="object-cover"
                            unoptimized
                        />
                    </div>
                </div>

                {/* Two-Column Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left Column */}
                    <div ref={leftColRef} className="invisible translate-x-[-50px]">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-text-light dark:text-text-dark">About RoofReplacementsLLC</h2>
                        <div className="space-y-6 text-gray-700 dark:text-gray-300">
                            <p>
                                Founded on the principles of quality, integrity, and reliability, RoofReplacementsLLC has become a trusted leader in the roofing industry. We are dedicated to providing homeowners and businesses with superior roofing solutions that protect their properties and enhance their value.
                            </p>
                            <div>
                                <h3 className="text-xl font-semibold mb-2 text-text-light dark:text-text-dark">Our Mission</h3>
                                <p>To deliver exceptional roofing services through expert craftsmanship, high-quality materials, and unparalleled customer service, ensuring complete satisfaction and peace of mind for every client.</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2 text-text-light dark:text-text-dark">Our Values</h3>
                                <ul className="list-disc list-inside space-y-1 ml-4">
                                    <li>Quality Craftsmanship</li>
                                    <li>Customer Satisfaction</li>
                                    <li>Integrity and Honesty</li>
                                    <li>Safety First</li>
                                    <li>Continuous Improvement</li>
                                </ul>
                            </div>
                        </div>
                        {/* Optional CTA Example */}
                        {/* <Link href="#contact" className="mt-8 inline-block bg-primary-light dark:bg-primary-dark text-white font-semibold py-2 px-6 rounded hover:opacity-90 transition-opacity">
                            Get In Touch
                        </Link> */}
                    </div>

                    {/* Right Column (Timeline) */}
                    <div ref={rightColRef} className="invisible translate-x-[50px]">
                        <h3 className="text-2xl md:text-3xl font-bold mb-6 text-text-light dark:text-text-dark">Our Journey</h3>
                        <div className="relative border-l-2 border-primary-light/30 dark:border-primary-dark/30 pl-6 space-y-8">
                            {timelineData.map((item, index) => (
                                <div
                                    key={index}
                                    ref={el => { timelineItemsRef.current[index] = el; }} // Assign ref to each item
                                    className="timeline-item relative invisible translate-x-[-30px]" // Initial state for item animation
                                >
                                    <TimelineIcon />
                                    <span className="font-bold text-lg text-primary-light dark:text-primary-dark">{item.year}</span>
                                    <h4 className="text-lg font-medium mt-1 mb-1 text-text-light dark:text-text-dark">{item.title}</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}