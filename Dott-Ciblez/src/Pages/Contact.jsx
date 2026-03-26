import React, { useState, useRef, useEffect } from "react";
import { IoSendOutline, IoLocationOutline, IoCallOutline, IoMailOutline } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import "../CSS/Contact.css"; 

const COUNTRIES = [
    {
        code: "IN", name: "India", flag: "🇮🇳",
        city: "Bhubaneswar, India",
        address: "DLF Cyber City, Bhubaneswar, Odisha 751024",
        phone: "+91 (674) 123-4567", timezone: "IST · UTC+5:30",
        mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3741.928!2d85.80554!3d20.34904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a190908258c4c55%3A0xee1fcd1f11e55141!2sDLF%20Cyber%20City%2C%20Bhubaneswar!5e0!3m2!1sen!2sin!4v1709000000000",
    },
    {
        code: "AE", name: "Dubai", flag: "🇦🇪",
        city: "Dubai, UAE",
        address: "Dubai Internet City, Al Sufouh, Dubai 500001",
        phone: "+971 4 123 4567", timezone: "GST · UTC+4:00",
        mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.178!2d55.1484!3d25.0957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6b5402d6e2bd%3A0x8f10c12de9b12f7!2sDubai%20Internet%20City!5e0!3m2!1sen!2sae!4v1709000000001",
    },
    {
        code: "US", name: "New York", flag: "🇺🇸",
        city: "New York, USA",
        address: "One World Trade Center, Manhattan, NY 10007",
        phone: "+1 (212) 123-4567", timezone: "EST · UTC−5:00",
        mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.656!2d-74.0134!3d40.7128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a197c06b7cb%3A0x40a06c78f79e5de6!2sOne%20World%20Trade%20Center!5e0!3m2!1sen!2sus!4v1709000000002",
    },
    {
        code: "GB", name: "London", flag: "🇬🇧",
        city: "London, UK",
        address: "Canary Wharf, One Canada Square, London E14 5AB",
        phone: "+44 20 7123 4567", timezone: "GMT · UTC+0:00",
        mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.458!2d-0.0197!3d51.5055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487602b7b2f08f39%3A0xf10c1d3a07dcae72!2sOne%20Canada%20Square!5e0!3m2!1sen!2sgb!4v1709000000003",
    },
];

const CONTACTS = [
    { icon: <IoMailOutline />, title: "Sales Support", sub: "Mon–Fri · 9 am – 6 pm EST", email: "sales@dottciblez.com", phone: "+1 (888) 123-4567" },
    { icon: <IoCallOutline />, title: "Technical NOC", sub: "Priority support · 24 / 7", email: "noc@dottciblez.com", phone: "+1 (888) 999-0000" },
    { icon: <IoLocationOutline />, title: "General Inquiries", sub: "Partnerships & corporate", email: "hello@dottciblez.com", phone: "+1 (888) 555-4433" },
];

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function Contact() {
    const [form, setForm] = useState({ name: "", company: "", email: "", message: "" });
    const [country, setCountry] = useState(COUNTRIES[0]);
    const [dropOpen, setDropOpen] = useState(false);
    const [mapKey, setMapKey] = useState(0);
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const dropRef = useRef(null);

    const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    
    const pick = (c) => { 
        setCountry(c); 
        setDropOpen(false); 
        setMapKey(k => k + 1); 
    };

    const send = (e) => {
        e.preventDefault();
        setSending(true);
        setTimeout(() => { 
            setSending(false); 
            setSent(true); 
            setForm({ name: "", company: "", email: "", message: "" });
            setTimeout(() => setSent(false), 3000); 
        }, 1600);
    };

    useEffect(() => {
        const handleClickOutside = (e) => { 
            if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false); 
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="cnt-page-wrapper">
            {/* Background Orbs */}
            <div className="cnt-glow-orb cnt-orb-blue"></div>
            <div className="cnt-glow-orb cnt-orb-cyan"></div>
            <div className="cnt-grid-bg"></div>

            <section className="cnt-hero-section">
                <div className="container position-relative z-3">
                    <div className="row g-5 align-items-center min-vh-100 py-5 pt-lg-5 mt-lg-5">
                        
                        {/* LEFT COLUMN: Info */}
                        <motion.div 
                            className="col-lg-5"
                            initial="hidden"
                            animate="visible"
                            variants={staggerContainer}
                        >
                            <motion.div variants={fadeInUp} className="cnt-premium-badge mb-4">
                                <IoLocationOutline className="me-2" /> Global Presence
                            </motion.div>
                            
                            <motion.h1 variants={fadeInUp} className="cnt-title mb-4">
                                Get in <br />
                                <span className="cnt-text-gradient">Touch.</span>
                            </motion.h1>
                            
                            <motion.p variants={fadeInUp} className="cnt-subtitle mb-5">
                                Enterprise-grade colocation & connectivity solutions. 
                                Our experts are available around the clock to assist you.
                            </motion.p>
                            
                            <div className="cnt-cards-wrapper">
                                {CONTACTS.map((c, i) => (
                                    <motion.div variants={fadeInUp} key={c.title} className="cnt-info-card">
                                        <div className="cnt-info-icon">
                                            {c.icon}
                                        </div>
                                        <div className="cnt-info-content">
                                            <h4 className="cnt-info-title">{c.title}</h4>
                                            <p className="cnt-info-sub">{c.sub}</p>
                                            <p className="cnt-info-email">{c.email}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* RIGHT COLUMN: Form */}
                        <motion.div 
                            className="col-lg-7"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="cnt-form-container">
                                <div className="cnt-form-header">
                                    <h3 className="cnt-form-heading">Send a Message</h3>
                                    <p className="cnt-form-subheading">We respond within one business day</p>
                                </div>

                                <form onSubmit={send} className="cnt-form">
                                    <div className="row g-4">
                                        <div className="col-md-6">
                                            <div className="cnt-input-group">
                                                <input 
                                                    type="text" 
                                                    name="name" 
                                                    value={form.name} 
                                                    onChange={handle} 
                                                    required 
                                                />
                                                <label>Full Name</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="cnt-input-group">
                                                <input 
                                                    type="text" 
                                                    name="company" 
                                                    value={form.company} 
                                                    onChange={handle} 
                                                />
                                                <label>Company (Optional)</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="cnt-input-group">
                                                <input 
                                                    type="email" 
                                                    name="email" 
                                                    value={form.email} 
                                                    onChange={handle} 
                                                    required 
                                                />
                                                <label>Email Address</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="cnt-input-group">
                                                <textarea 
                                                    name="message" 
                                                    value={form.message} 
                                                    onChange={handle} 
                                                    rows="4" 
                                                    required 
                                                />
                                                <label>Tell us about your requirements...</label>
                                            </div>
                                        </div>
                                        <div className="col-12 mt-4">
                                            <button 
                                                type="submit" 
                                                className={`cnt-submit-btn ${sent ? 'sent' : ''}`}
                                                disabled={sending}
                                            >
                                                {sending ? (
                                                    <span className="cnt-spinner"></span>
                                                ) : sent ? (
                                                    <span>Message Sent Successfully!</span>
                                                ) : (
                                                    <span>Send Message <IoSendOutline className="ms-2" /></span>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* MAP SECTION */}
            <section className="cnt-map-section position-relative">
                <motion.div 
                    className="cnt-map-wrapper container"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="cnt-map-controls">
                        <div className="cnt-map-info">
                            <h4>{country.flag} {country.city}</h4>
                            <p>{country.address}</p>
                            <span className="cnt-map-timezone">{country.timezone}</span>
                        </div>
                        
                        <div className="cnt-custom-dropdown" ref={dropRef}>
                            <button 
                                className="cnt-dropdown-toggle"
                                onClick={() => setDropOpen(!dropOpen)}
                            >
                                <span>{country.flag} {country.name}</span>
                                <span className={`dropdown-arrow ${dropOpen ? 'open' : ''}`}>▼</span>
                            </button>
                            
                            <AnimatePresence>
                                {dropOpen && (
                                    <motion.ul 
                                        className="cnt-dropdown-menu"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {COUNTRIES.map(c => (
                                            <li 
                                                key={c.code} 
                                                className={c.code === country.code ? 'active' : ''}
                                                onClick={() => pick(c)}
                                            >
                                                <span className="dropdown-flag">{c.flag}</span>
                                                <div className="dropdown-details">
                                                    <strong>{c.name}</strong>
                                                    <span>{c.timezone}</span>
                                                </div>
                                            </li>
                                        ))}
                                    </motion.ul>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                    
                    <div className="cnt-iframe-container">
                        <iframe
                            key={mapKey}
                            title={`Map – ${country.city}`}
                            src={country.mapSrc}
                            allowFullScreen="" 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </motion.div>
            </section>
        </div>
    );
}