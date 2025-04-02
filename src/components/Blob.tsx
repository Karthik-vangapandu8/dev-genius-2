'use client';

import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const Blob = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {/* Main animated blob */}
      <motion.div
        className="absolute w-[800px] h-[800px] lg:w-[1200px] lg:h-[1200px] rounded-[40%] 
          bg-[conic-gradient(from_0deg,#8b5cf6,#ec4899,#6366f1,#8b5cf6)] dark:bg-[conic-gradient(from_0deg,#7c3aed,#db2777,#4f46e5,#7c3aed)]
          opacity-30 dark:opacity-20 blur-[80px] md:blur-[120px] lg:blur-[160px]"
        animate={{
          rotate: [0, 360],
          scale: [0.8, 1, 0.8],
          x: ["-5%", "5%", "-5%"],
          y: ["-5%", "5%", "-5%"],
          borderRadius: ["40%", "45%", "40%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Noise overlay */}
      <div 
        className="absolute inset-0 bg-noise opacity-[0.015] dark:opacity-[0.03] 
          mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default Blob;
