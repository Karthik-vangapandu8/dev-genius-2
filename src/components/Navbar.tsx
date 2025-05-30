'use client';

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import ComingSoon from "./ComingSoon";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {showComingSoon && <ComingSoon onClose={() => setShowComingSoon(false)} />}
      <nav className={`fixed top-2 left-1/2 transform -translate-x-1/2 bg-opacity-80 backdrop-blur-md rounded-lg px-6 py-3 shadow-gray-800 shadow-md w-[90%] md:w-[80%] lg:w-[70%] flex justify-between items-center z-50 ${isScrolled ? 'bg-[#171717]/70 dark:bg-gray-800/70 backdrop-blur-lg shadow-lg' : 'bg-[#171717]/50 dark:bg-gray-800/50'}`}>
        {/* Logo Image */}
        <Link href="/">
          <Image
            src="/logo-removebg-preview.png"
            alt="Dev Genius"
            width={150}
            height={50}
            priority
            className="w-auto h-8"
          />
        </Link>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowComingSoon(true)}
            className="text-white dark:text-white hover:bg-gray-700 px-3 py-2 rounded-md text-md"
          >
            Try IDE
          </button>
          <Link href="/hiring" className="text-white dark:text-white hover:bg-gray-700 px-3 py-2 rounded-md text-md">
            Hiring
          </Link>
          <Link href="/leaderboard" className="text-white dark:text-white hover:bg-gray-700 px-3 py-2 rounded-md text-md">
            Leaderboard
          </Link>

          {/* Theme Toggle Button */}
          <motion.button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-md hover:bg-gray-700 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: theme === "dark" ? 0 : 180 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-white" />
              ) : (
                <Moon className="h-5 w-5 text-white" />
              )}
            </motion.div>
          </motion.button>

          {/* Get Started Button */}
          <Link
            href="/subscribe"
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white px-4 py-2 rounded-md text-md font-medium transition-all duration-200 transform hover:scale-105"
          >
            Get Started
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
