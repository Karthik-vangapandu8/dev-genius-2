'use client';

import { motion } from "framer-motion";
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import Languages from '@/components/Languages';
import IndustryProjects from '@/components/IndustryProjects';
import FoundingMembers from '@/components/FoundingMembers';
import Feedback from "@/components/Feedback";
import Subscription from "@/components/Subscription";
import FAQ from "@/components/FAQ";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Glassmorphism Background */}
      <div className="fixed inset-0 bg-white/50 dark:bg-black/50 backdrop-blur-lg" />

      {/* Content */}
      <div className="relative z-20">
        <Hero />
        <HowItWorks />
        <IndustryProjects />
        <Languages />
        <FoundingMembers />
        <Feedback />
        <Subscription />
        <FAQ />
      </div>
    </main>

  );
}
