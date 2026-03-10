"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { AppButton } from '@/components/button';

const ComingSoon = () => {
    return (
        /* Wrapper div: Isse page ke beech mein content aayega */
        <div className=" flex flex-col items-center justify-center min-h-[75vh] w-full px-4">

            <div className=" w-full  flex items-center justify-center p-12 bg-card text-card-foreground rounded-2xl border border-border shadow-lg transition-all duration-300">
                <div className="w-full text-center">

                    {/* Animated Icon/Graphic */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="mb-10 flex justify-center"
                    >

                        <div className="w-28 h-28 bg-accent/10 rounded-full flex items-center justify-center">
                            <div className="w-14 h-14 bg-accent rounded-xl rotate-12 animate-pulse shadow-[0_0_20px_rgba(255,131,0,0.3)]" />
                        </div>
                    </motion.div>

                    {/* Text Content */}
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl md:text-3xl font-bold tracking-tight mb-6 bg-linear-to-b from-foreground to-foreground/70 bg-clip-text"
                    >
                        Coming Soon
                    </motion.h1>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-lg md:text-xl mb-10 text-muted-foreground leading-relaxed max-w-md mx-auto"
                    >
                        We&apos;re currently working hard on this page. <br />
                        Stay tuned for something amazing!
                    </motion.p>

                    {/* Action Button */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex justify-center"
                    >
                        <AppButton
                            href='/'
                            title='Go Back Home'
                            className="px-10 rounded-full orange-glow"
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ComingSoon;