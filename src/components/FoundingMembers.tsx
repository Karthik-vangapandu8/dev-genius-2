"use client";
import { motion } from "framer-motion";
import Image from "next/image";

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
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl"
    >
      <div className="relative h-48 sm:h-56">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4 sm:p-6">
        <h3 className="font-semibold text-base sm:text-lg text-gray-900 mb-1">{name}</h3>
        <p className="text-sm text-gray-600 mb-3">{role}</p>
        <div className="flex items-center space-x-2">
          <Image
            src={companyLogo}
            alt={company}
            width={24}
            height={24}
            className="rounded-full"
          />
          <span className="text-xs sm:text-sm text-gray-500">{company}</span>
        </div>
      </div>
    </motion.div>
  );
};

const FoundingMembers = () => {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-4">
        <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Meet Our Founding Team
        </span>
      </h2>
      <p className="text-gray-600 text-center text-sm sm:text-base mb-12">The visionaries behind DEV Genius</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {members.map((member, index) => (
          <MemberCard key={index} {...member} />
        ))}
      </div>
    </section>
  );
};

export default FoundingMembers;
