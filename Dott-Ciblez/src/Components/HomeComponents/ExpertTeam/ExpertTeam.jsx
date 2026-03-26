import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedinIn, FaTwitter, FaEnvelope } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ExpertTeam.css';

const teamMembers = [
    {
        name: 'Alex Thompson',
        position: 'Chief Executive Officer',
        image: 'https://randomuser.me/api/portraits/men/1.jpg',
        bio: '15+ years of experience in tech leadership and business strategy',
        accent: '#4facfe',
        social: { linkedin: '#', twitter: '#', email: '#' }
    },
    {
        name: 'Jessica Lee',
        position: 'Chief Technology Officer',
        image: 'https://randomuser.me/api/portraits/women/2.jpg',
        bio: 'Expert in cloud architecture and scalable enterprise solutions',
        accent: '#a78bfa',
        social: { linkedin: '#', twitter: '#', email: '#' }
    },
    {
        name: 'Marcus Brown',
        position: 'Lead Developer',
        image: 'https://randomuser.me/api/portraits/men/3.jpg',
        bio: 'Full-stack developer with passion for clean code and innovation',
        accent: '#34d399',
        social: { linkedin: '#', twitter: '#', email: '#' }
    },
    {
        name: 'Sarah Chen',
        position: 'Product Manager',
        image: 'https://randomuser.me/api/portraits/women/4.jpg',
        bio: 'Agile expert ensuring smooth delivery of complex projects',
        accent: '#f59e0b',
        social: { linkedin: '#', twitter: '#', email: '#' }
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.13 } }
};

const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 70, damping: 18 } }
};

const ExpertTeam = () => {
    const [hovered, setHovered] = useState(null);

    return (
        <section className="tm-section">
            {/* Background layers */}
            <div className="tm-orb tm-orb--1" />
            <div className="tm-orb tm-orb--2" />
            <div className="tm-grid" />

            <div className="container">
                {/* Header */}
                <motion.div
                    className="tm-header"
                    initial={{ opacity: 0, y: -24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="tm-eyebrow">
                        <span className="tm-eyebrow__dash" />
                        <span className="tm-eyebrow__label">Our People</span>
                        <span className="tm-eyebrow__dash" />
                    </div>
                    <h1 className="tm-title">
                        Meet the <span className="tm-title__accent">Experts</span>
                    </h1>
                    <p className="tm-desc">
                        Talented professionals dedicated to delivering exceptional results for your business.
                    </p>
                </motion.div>

                {/* Cards */}
                <motion.div
                    className="row g-3"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            className="col-lg-3 col-md-6"
                            variants={itemVariants}
                        >
                            <div
                                className="tm-card"
                                style={{ '--accent': member.accent, '--accent-20': member.accent + '33' }}
                                onMouseEnter={() => setHovered(index)}
                                onMouseLeave={() => setHovered(null)}
                            >
                                {/* Image area */}
                                <div className="tm-img-wrap">
                                    <img src={member.image} alt={member.name} className="tm-img" />

                                    {/* Overlay gradient */}
                                    <div className="tm-img-overlay" />

                                    {/* Index number watermark */}
                                    <span className="tm-index">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>

                                    {/* Social icons slide up */}
                                    <div className="tm-social">
                                        {[
                                            { icon: <FaLinkedinIn />, href: member.social.linkedin },
                                            { icon: <FaTwitter />, href: member.social.twitter },
                                            { icon: <FaEnvelope />, href: member.social.email },
                                        ].map((s, i) => (
                                            <motion.a
                                                key={i}
                                                href={s.href}
                                                className="tm-social__link"
                                                whileHover={{ y: -4, scale: 1.1 }}
                                                transition={{ type: 'spring', stiffness: 300 }}
                                            >
                                                {s.icon}
                                            </motion.a>
                                        ))}
                                    </div>

                                    {/* Accent corner strip */}
                                    <div className="tm-img-strip" />
                                </div>

                                {/* Info */}
                                <div className="tm-info">
                                    <div className="tm-info__top">
                                        <div>
                                            <h3 className="tm-name">{member.name}</h3>
                                            <p className="tm-position">{member.position}</p>
                                        </div>
                                        <div className="tm-dot" />
                                    </div>

                                    <div className="tm-divider" />

                                    <p className="tm-bio">{member.bio}</p>

                                    <a href="#" className="tm-link">
                                        View Profile
                                        <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                                            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6"
                                                strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </a>
                                </div>

                                {/* Bottom bar sweep */}
                                <div className="tm-card__bar" />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default ExpertTeam;