'use client';

import { motion } from "framer-motion";
import { Suspense } from 'react';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import Languages from '@/components/Languages';
import IndustryProjects from '@/components/IndustryProjects';
import FoundingMembers from '@/components/FoundingMembers';
import Feedback from "@/components/Feedback";
import Subscription from "@/components/Subscription";
import FAQ from "@/components/FAQ";
import dynamic from 'next/dynamic';

const CodingEnvironment = dynamic(() => import('@/components/CodingEnvironment'), {
  loading: () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  ),
  ssr: false
});

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

        {/* IDE Modal */}
        <Suspense>
          <div id="ide-modal" className="fixed inset-0 z-50 hidden">
            <CodingEnvironment />
          </div>
        </Suspense>
      </div>
    </main>

  );
}
