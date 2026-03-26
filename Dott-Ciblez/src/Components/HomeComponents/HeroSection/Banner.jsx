import React, { useState, useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight, FaStar, FaRocket, FaGlobe } from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs';
import { motion, AnimatePresence } from 'framer-motion';
import "./Banner.css";

const slides = [
    {
        id: 1,
        tag: "Innovative Software Solutions",
        title: "Welcome to Dott Ciblez Technologies",
        description: "Trusted by industry leaders for delivering excellence in every project. We turn complex problems into elegant software solutions.",
        bgImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
        icon: <FaStar className="dtt-banner-slide-icon" />,
        orb1Color: "rgba(35, 61, 254, 0.4)",
        orb2Color: "rgba(0, 229, 255, 0.3)",
        gradientStart: "rgba(0, 0, 0, 0.75)",
        gradientEnd: "rgba(8, 10, 16, 0.3)",
    },
    {
        id: 2,
        tag: "Cutting-Edge Development",
        title: "We Build Scalable Digital Products",
        description: "From concept to launch, we deliver quality software that drives business growth and transforms user experiences.",
        bgImage: "https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?q=80&w=1380&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        icon: <FaRocket className="dtt-banner-slide-icon" />,
        orb1Color: "rgba(168, 85, 247, 0.4)",
        orb2Color: "rgba(35, 61, 254, 0.3)",
        gradientStart: "rgba(5, 5, 10, 0.75)",
        gradientEnd: "rgba(15, 20, 40, 0.3)",
    },
    {
        id: 3,
        tag: "Your Technology Partner",
        title: "Empowering Businesses Worldwide",
        description: "Join our growing list of happy clients across the globe. We build systems engineered for speed and built for the future.",
        bgImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop",
        icon: <FaGlobe className="dtt-banner-slide-icon" />,
        orb1Color: "rgba(0, 229, 255, 0.4)",
        orb2Color: "rgba(35, 61, 254, 0.3)",
        gradientStart: "rgba(0, 5, 15, 0.75)",
        gradientEnd: "rgba(5, 30, 50, 0.3)",
    }
];

export default function Banner() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const intervalRef = useRef(null);

    const startTimer = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setDirection(1);
            setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 3000);
    };

    const handleNext = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        startTimer();
    };

    const handlePrev = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
        startTimer();
    };

    const handleDotClick = (index) => {
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
        startTimer();
    };

    useEffect(() => {
        startTimer();
        return () => clearInterval(intervalRef.current);
    }, []);

    const slideVariants = {
        enter: (dir) => ({
            opacity: 0,
            scale: 1.05,
        }),
        center: {
            zIndex: 1,
            opacity: 1,
            scale: 1,
            transition: {
                opacity: { duration: 0.4 },
                scale: { duration: 0.6, ease: "easeOut" }
            }
        },
        exit: (dir) => ({
            zIndex: 0,
            opacity: 0,
            transition: { duration: 0.4 }
        })
    };

    const contentVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.3, ease: "easeOut", staggerChildren: 0.1 } 
        },
        exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
    };

    const currentSlide = slides[currentIndex];

    return (
        <section className="dtt-banner-wrapper">
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="dtt-banner-background"
                    style={{ backgroundImage: `url(${currentSlide.bgImage})` }}
                >
                    <div 
                        className="dtt-banner-overlay"
                        style={{
                            background: `linear-gradient(to right, ${currentSlide.gradientStart} 20%, ${currentSlide.gradientEnd} 100%)`
                        }}
                    />
                </motion.div>
            </AnimatePresence>

            {/* Grid overlay for texture */}
            <div className="dtt-banner-grid-overlay"></div>

            {/* Glowing Orbs for ambiance */}
            <div 
                className="dtt-banner-orb dtt-orb-1" 
                style={{ background: `radial-gradient(circle, ${currentSlide.orb1Color} 0%, transparent 70%)` }}
            ></div>
            <div 
                className="dtt-banner-orb dtt-orb-2" 
                style={{ background: `radial-gradient(circle, ${currentSlide.orb2Color} 0%, transparent 70%)` }}
            ></div>

            <div className="container dtt-banner-container z-3 position-relative">
                <div className="row align-items-center min-vh-100 py-5">
                    <div className="col-lg-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                variants={contentVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="dtt-banner-content"
                            >
                                <motion.div variants={contentVariants} className="dtt-banner-badge mb-4">
                                    {currentSlide.icon}
                                    <span>{currentSlide.tag}</span>
                                </motion.div>

                                <motion.h1 variants={contentVariants} className="dtt-banner-title mb-4">
                                    {currentSlide.title}
                                </motion.h1>

                                <motion.p variants={contentVariants} className="dtt-banner-description mb-5">
                                    {currentSlide.description}
                                </motion.p>

                                <motion.div variants={contentVariants} className="dtt-banner-buttons">
                                    <a href="/contact" className="text-decoration-none">
                                        <button className="dtt-btn-primary">
                                            Partner With Us <BsArrowRight className="ms-2" />
                                        </button>
                                    </a>
                                    <a href="/about" className="text-decoration-none">
                                        <button className="dtt-btn-outline">
                                            Discover More
                                        </button>
                                    </a>
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Slider Controls */}
                <div className="dtt-banner-controls">
                    <div className="dtt-slider-arrows">
                        <button onClick={handlePrev} className="dtt-arrow-btn">
                            <FaChevronLeft />
                        </button>
                        <button onClick={handleNext} className="dtt-arrow-btn">
                            <FaChevronRight />
                        </button>
                    </div>

                    <div className="dtt-slider-dots">
                        {slides.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleDotClick(idx)}
                                className={`dtt-dot ${idx === currentIndex ? 'active' : ''}`}
                            >
                                {idx === currentIndex && (
                                    <motion.span 
                                        layoutId="dtt-dot-active"
                                        className="dtt-dot-active-bg"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom fading edge */}
            <div className="dtt-banner-bottom-fade"></div>
        </section>
    );
}