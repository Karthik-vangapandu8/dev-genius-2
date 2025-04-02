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
      className="bg-gray-400/30 dark:bg-[#171717]/30 backdrop-blur-xl p-8 rounded-xl border border-gray-800/30"
    >
      <div className="flex flex-col items-center text-center">
        <div className="relative w-56 h-52 mb-6">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <h3 className="text-2xl font-bold dark:text-white mb-2">{name}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{role}</p>
        <div className="flex items-center space-x-2">
          <div className="relative w-6 h-6">
            <Image
              src={companyLogo}
              alt={company}
              fill
              className="object-contain"
            />
          </div>
          <span className="text-gray-600 dark:text-gray-400">{company}</span>
        </div>
      </div>
    </motion.div>
  );
};

const FoundingMembers = () => {
  return (
    <div className="relative py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl font-bold dark:text-white mb-4">
            <span className="text-gradient">Founding</span> Members
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Meet the visionaries behind DEV Genius who are passionate about transforming coding education.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {members.map((member) => (
            <MemberCard key={member.name} {...member} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoundingMembers;
