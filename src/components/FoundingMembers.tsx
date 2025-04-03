'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const members = [
  {
    name: "Vangapandu Lokeswara Karthik",
    role: "Founder & CEO",
    image: "/team/founder1.jpg",
    company: "DEV Genius",
    companyLogo: "/logos/company-logo.svg"
  },
  {
    name: "Doddi Sai Syamanth",
    role: "Co-founder & CTO",
    image: "/team/founder2.jpg",
    company: "DEV Genius",
    companyLogo: "/logos/company-logo.svg"
  },
  {
    name: "Hanumanthu Sandeep",
    role: "Co-founder & CFO",
    image: "/team/founder3.jpg",
    company: "DEV Genius",
    companyLogo: "/logos/company-logo.svg"
  },
  {
    name: "VECHALAPU JNANA SAI NAIDU",
    role: "founder & CMO",
    image: "/team/001.jpeg",
    company: "DEV Genius",
    companyLogo: "/logos/company-logo.svg"
  }
];

const MemberCard = ({ name, role, image, company, companyLogo }: {
  name: string;
  role: string;
  image: string;
  company: string;
  companyLogo: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <div className="relative bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl overflow-hidden">
        {/* Glowing border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Card content */}
        <div className="relative p-6">
          {/* Image container */}
          <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
            <Image
              src={image}
              alt={name}
              fill
              sizes="(max-width: 768px) 128px, 128px"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          {/* Text content */}
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
              {name}
            </h3>
            <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">{role}</p>
            
            {/* Company info */}
            <div className="flex items-center justify-center space-x-2 opacity-75">
              <div className="w-5 h-5 relative">
                <Image
                  src={companyLogo}
                  alt={company}
                  fill
                  sizes="20px"
                  className="object-contain"
                />
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">{company}</span>
            </div>
          </div>

          {/* Hover effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </div>
    </motion.div>
  );
};

const FoundingMembers = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Meet Our Founding Team
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            The visionaries behind DEV Genius, committed to revolutionizing tech education
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((member, index) => (
            <MemberCard key={member.name} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoundingMembers;