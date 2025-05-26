import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { imageAndBg } from '../assets/index.js';
import { Link } from 'react-router';
import { useLocalStorage } from 'react-use';

export default function Welcome() {
    const illustrationRef = useRef(null);
    const controls = useAnimation();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const bgRef = useRef(null);
    const [token, _] = useLocalStorage("token", "");

    // Floating animation for illustration
    useEffect(() => {
        const floatAnimation = async () => {
            while (true) {
                await controls.start({
                    y: -20,
                    transition: { duration: 3, ease: "easeInOut" }
                });
                await controls.start({
                    y: 0,
                    transition: { duration: 3, ease: "easeInOut" }
                });
            }
        };
        floatAnimation();
        return () => controls.stop();
    }, [controls]);

    // Mouse position tracking for parallax effect
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: e.clientX / window.innerWidth,
                y: e.clientY / window.innerHeight
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Background gradient animation
    useEffect(() => {
        const animateBackground = () => {
            if (bgRef.current) {
                const x = mousePosition.x * 20;
                const y = mousePosition.y * 20;
                bgRef.current.style.backgroundPosition = `${50 + x}% ${50 + y}%`;
            }
            requestAnimationFrame(animateBackground);
        };
        animateBackground();
    }, [mousePosition]);

    return (
        <div
            ref={bgRef}
            className="relative min-h-screen overflow-hidden flex items-center justify-center p-4"
            style={{
                background: `
                    radial-gradient(
                        circle at center,
                        rgba(17, 24, 39, 0.9) 0%,
                        rgba(17, 24, 39, 0.95) 50%,
                        rgba(0, 0, 0, 1) 100%
                    ),
                    linear-gradient(
                        45deg,
                        rgba(31, 41, 55, 0.7) 0%,
                        rgba(17, 24, 39, 0.9) 50%,
                        rgba(31, 41, 55, 0.7) 100%
                    )`,
                backgroundSize: '200% 200%',
                transition: 'background-position 0.5s ease-out'
            }}
        >
            {/* Animated floating particles */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-white/10"
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                            width: Math.random() * 5 + 1,
                            height: Math.random() * 5 + 1,
                            opacity: Math.random() * 0.5 + 0.1
                        }}
                        animate={{
                            y: [null, (Math.random() - 0.5) * 100],
                            x: [null, (Math.random() - 0.5) * 100],
                            transition: {
                                duration: Math.random() * 10 + 10,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut"
                            }
                        }}
                    />
                ))}
            </div>

            <motion.div
                className="animate-fade-in backdrop-blur-lg rounded-2xl shadow-custom w-full max-w-4xl flex flex-col md:flex-row"
                whileHover={{
                    backdropFilter: 'blur(12px)',
                    boxShadow: '0 20px 50px -10px rgb(255, 255, 255)'
                }}
                transition={{ duration: 0.3 }}
            >
                {/* Illustration Section */}
                <div className="flex-1 flex items-center justify-center p-6 md:p-10 bg-white">
                    <motion.div
                        ref={illustrationRef}
                        animate={controls}
                        className="relative w-full h-64 md:h-auto"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                        <img
                            src={imageAndBg}
                            alt="People connecting illustration"
                            className="w-full h-full object-contain"
                        />
                    </motion.div>
                </div>

                {/* Text Content Section with enhanced glassmorphism */}
                <motion.div
                    className="backdrop-blur-md flex-1 flex flex-col justify-center rounded-xl p-8 shadow-lg  "
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    whileHover={{
                        backgroundColor: 'rgba(31, 41, 55, 0.7)',
                        borderColor: 'rgba(255, 255, 255, 0.2)'
                    }}
                >
                    <div className="text-left">
                        <motion.h1
                            className="text-4xl md:text-5xl font-bold text-sky-100 mb-4 leading-tight"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            Welcome to Your <span className="text-sky-400">Ultimate</span> Contact Hub
                        </motion.h1>

                        <motion.p
                            className="text-xl text-white/90 mb-8"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            Where meaningful connections meet effortless organization in one powerful platform
                        </motion.p>

                        <div className="space-y-5 text-gray-300/90 mb-10">
                            {[
                                {
                                    icon: 'fas fa-users',
                                    color: 'blue',
                                    title: 'Expanded Contact Management',
                                    desc: 'Store and organize thousands of contacts with generous storage capacity'
                                },
                                {
                                    icon: 'fas fa-map-marker-alt',
                                    color: 'purple',
                                    title: 'Comprehensive Address Handling',
                                    desc: 'Save multiple addresses per contact with complete details'
                                }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="flex items-start group"
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.8 + index * 0.2 }}
                                    whileHover={{ x: 5 }}
                                >
                                    <div className={`bg-${item.color}-500/20 p-2 rounded-lg mr-4 group-hover:bg-${item.color}-500/30 transition-colors`}>
                                        <i className={`${item.icon} text-${item.color}-400 text-lg`} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg text-gray-100 group-hover:text-white transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="group-hover:text-gray-200 transition-colors">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {!token ? (
                            <motion.div
                                className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.4 }}
                            >
                                <Link to="/login">
                                    <motion.button
                                        className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-8 rounded-lg font-medium hover:opacity-90 transition-all shadow-lg hover:shadow-xl group"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <span className="relative z-10">Get Started Now</span>
                                        <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    </motion.button>
                                </Link>
                            </motion.div>
                        ) : (
                            <motion.div
                                className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.4 }}
                            >
                                <Link to="/dashboard/contacts">
                                    <motion.button
                                        className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-8 rounded-lg font-medium hover:opacity-90 transition-all shadow-lg hover:shadow-xl group"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <span className="relative z-10">Back to Dashboard</span>
                                        <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    </motion.button>
                                </Link>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </div>
    )
}