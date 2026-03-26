import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../CSS/SoftwareDesign.css";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const stats = [
    { label: "Projects Delivered", target: 500, suffix: "+", decimals: 0 },
    { label: "Client Satisfaction", target: 98, suffix: "%", decimals: 0 },
    { label: "Conversion Boost", target: 150, suffix: "%", decimals: 0 },
    { label: "Design Awards", target: 12, suffix: "", decimals: 0 },
];

const services = [
    { title: "UI/UX Architecture", icon: "bi-layers-half", desc: "Constructing intuitive, user-centric interfaces. We turn complex workflows into seamless, hyper-modern digital experiences." },
    { title: "Mobile Experience", icon: "bi-phone-vibrate", desc: "Pixel-perfect, fluid interactions tailored for iOS and Android, focusing on performance and micro-animations." },
    { title: "User Intelligence", icon: "bi-radar", desc: "Deep-dive analytical research mapping user behavior, cognitive load, and journey optimization." },
    { title: "Web Platforms", icon: "bi-window-fullscreen", desc: "Responsive, motion-rich web applications engineered for speed, massive scale, and high conversions." },
    { title: "Design Systems", icon: "bi-boxes", desc: "A unified, atomic design language with reusable components, typography scales, and seamless dark-mode support." },
    { title: "Interactive Prototypes", icon: "bi-lightning-charge", desc: "High-fidelity motion prototypes validating user flow and tactile response before development begins." },
];

const steps = [
    { id: "01", title: "Discovery & Strategy", icon: "bi-compass", label: "Research", desc: "We map the digital landscape, defining the problem space, audience needs, and strategic KPIs." },
    { id: "02", title: "Wireframing & Logic", icon: "bi-diagram-3", label: "Architecture", desc: "Structuring user flows and low-fidelity wireframes, prioritizing functionality and cognitive ease." },
    { id: "03", title: "Visual & Motion Design", icon: "bi-palette2", label: "UI / Motion", desc: "Injecting brand identity through premium typography, dynamic layouts, and subtle scroll-driven motion." },
    { id: "04", title: "Testing & Hand-off", icon: "bi-braces-asterisk", label: "Validation", desc: "Rigorous interactive testing and perfectly documented design tokens for frictionless developer hand-off." },
];

const tools = [
    { name: "Figma", icon: "bi-bezier", color: "#F24E1E" },
    { name: "Framer", icon: "bi-triangle-half", color: "#0055FF" },
    { name: "Spline", icon: "bi-badge-3d", color: "#FF007A" },
    { name: "React", icon: "bi-code-slash", color: "#61DAFB" },
    { name: "After Effects", icon: "bi-film", color: "#9999FF" },
    { name: "Webflow", icon: "bi-braces", color: "#4353FF" },
];

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15
        }
    }
};

const Counter = ({ target, suffix }) => {
    const [count, setCount] = useState(0);
    const nodeRef = useRef(null);

    useEffect(() => {
        let start = 0;
        const duration = 2000;
        let startTime = null;
        let observer = null;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percent = Math.min(progress / duration, 1);
            const ease = percent === 1 ? 1 : 1 - Math.pow(2, -10 * percent);
            setCount(Math.floor(ease * target));
            if (percent < 1) {
                window.requestAnimationFrame(animate);
            }
        };

        observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                window.requestAnimationFrame(animate);
                observer.disconnect();
            }
        }, { threshold: 0.5 });

        if (nodeRef.current) observer.observe(nodeRef.current);

        return () => {
            if (observer) observer.disconnect();
        };
    }, [target]);

    return (
        <span ref={nodeRef} className="sd-stat-number">
            {count}{suffix}
        </span>
    );
};

export default function SoftwareDesign() {
    const { scrollYProgress } = useScroll();
    const yHeroVal = useTransform(scrollYProgress, [0, 1], [0, 300]);

    return (
        <div className="sd-page-wrapper">
            {/* Background Effects */}
            <div className="sd-orb sd-orb-1"></div>
            <div className="sd-orb sd-orb-2"></div>
            <div className="sd-grid-overlay"></div>

            {/* HERO SECTION */}
            <section className="sd-hero">
                <div className="container position-relative z-3">
                    <div className="row align-items-center min-vh-100 py-5">
                        <motion.div
                            className="col-lg-7 sd-hero-content"
                            initial="hidden"
                            animate="visible"
                            variants={staggerContainer}
                        >
                            <motion.div variants={fadeInUp} className="sd-badge mb-4">
                                <span className="sd-badge-dot"></span> Next-Gen Interface Design
                            </motion.div>

                            <motion.h1 variants={fadeInUp} className="sd-display-title mb-4">
                                Architecting <span className="sd-gradient-text">Digital</span> <br />
                                Experiences
                            </motion.h1>

                            <motion.p variants={fadeInUp} className="sd-hero-subtitle mb-5">
                                We forge premium software interfaces through obsessive research,
                                cutting-edge motion, and atomic design systems. Beautifully engineered
                                for scale and conversion.
                            </motion.p>

                            <motion.div variants={fadeInUp} className="d-flex flex-wrap gap-4">
                                <button className="sd-btn-primary">
                                    Initiate Project <i className="bi bi-arrow-right ms-2"></i>
                                </button>
                                <button className="sd-btn-outline">
                                    Explore Case Studies
                                </button>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            className="col-lg-5 d-none d-lg-block"
                            style={{ y: yHeroVal }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                        >
                            <div className="sd-hero-visual">
                                <motion.div
                                    className="sd-glass-card sd-hero-card-1"
                                    animate={{ y: [0, -15, 0] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <div className="sd-card-header">
                                        <div className="sd-card-dots">
                                            <span></span><span></span><span></span>
                                        </div>
                                    </div>
                                    <div className="sd-card-body">
                                        <div className="sd-skeleton-line w-75"></div>
                                        <div className="sd-skeleton-line w-50"></div>
                                        <div className="sd-skeleton-line w-100"></div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="sd-glass-card sd-hero-card-2"
                                    animate={{ y: [0, 20, 0] }}
                                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                >
                                    <i className="bi bi-fingerprint sd-icon-glow"></i>
                                    <h5>Biometric Auth</h5>
                                    <p>Secure protocol active</p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* STATS SECTION */}
            <section className="sd-stats-section">
                <div className="container">
                    <motion.div
                        className="sd-stats-grid"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                    >
                        {stats.map((stat, i) => (
                            <motion.div key={i} variants={fadeInUp} className="sd-stat-box">
                                <Counter target={stat.target} suffix={stat.suffix} />
                                <div className="sd-stat-label">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* SERVICES SECTION */}
            <section className="sd-services-section pb-5 py-lg-5">
                <div className="container mt-5">
                    <motion.div
                        className="text-center mb-5 pb-4"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <div className="sd-badge mx-auto mb-3">Capabilities</div>
                        <h2 className="sd-section-title">Design <span className="sd-gradient-text-alt">Ecosystem</span></h2>
                    </motion.div>

                    <motion.div
                        className="row g-4"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                    >
                        {services.map((service, i) => (
                            <div className="col-md-6 col-lg-4" key={i}>
                                <motion.div variants={fadeInUp} className="sd-service-card h-100">
                                    <div className="sd-service-icon">
                                        <i className={`bi ${service.icon}`}></i>
                                    </div>
                                    <h4 className="sd-service-title">{service.title}</h4>
                                    <p className="sd-service-desc">{service.desc}</p>
                                </motion.div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* METHODOLOGY SECTION */}
            <section className="sd-process-section py-5 my-5">
                <div className="container">
                    <motion.div
                        className="row align-items-center g-5"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="col-lg-5">
                            <div className="sd-badge mb-3">Methodology</div>
                            <h2 className="sd-section-title mb-4">The <span className="sd-gradient-text">Blueprint</span></h2>
                            <p className="sd-process-intro mb-5">
                                A systematic, iterative approach driving clarity and precision.
                                We don't just design screens; we architect fluid spatial experiences
                                grounded in human psychology and business logic.
                            </p>

                            <div className="sd-tools-cluster d-flex gap-3 flex-wrap">
                                {tools.map((tool, i) => (
                                    <div className="sd-tool-pill" key={i}>
                                        <i className={`bi ${tool.icon}`} style={{ color: tool.color }}></i> {tool.name}
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <div className="col-lg-6 offset-lg-1">
                            <div className="sd-timeline">
                                {steps.map((step, i) => (
                                    <motion.div variants={fadeInUp} className="sd-timeline-item" key={i}>
                                        <div className="sd-timeline-number">{step.id}</div>
                                        <div className="sd-timeline-content">
                                            <div className="d-flex align-items-center gap-3 mb-2">
                                                <div className="sd-timeline-icon">
                                                    <i className={`bi ${step.icon}`}></i>
                                                </div>
                                                <h4 className="sd-timeline-title mb-0">{step.title}</h4>
                                            </div>
                                            <p className="sd-timeline-desc mb-0">{step.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="sd-cta-section py-5">
                <div className="container pb-5">
                    <motion.div
                        className="sd-cta-box"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <div className="sd-cta-blur-bg"></div>
                        <div className="position-relative z-3 text-center">
                            <h2 className="sd-cta-title mb-4">Ready to <span className="sd-gradient-text-alt">Elevate</span>?</h2>
                            <p className="sd-cta-desc mx-auto mb-5">
                                Transform your product into a market leader. Our design engineering team
                                is ready to craft your next monumental launch.
                            </p>
                            <button className="sd-btn-primary sd-btn-large">
                                Consult With Us <i className="bi bi-chat-left-text ms-2"></i>
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}