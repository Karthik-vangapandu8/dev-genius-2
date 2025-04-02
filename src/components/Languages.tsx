"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const languages = [
  { name: "Python", logo: "/logos/python.svg", path: "/learn/python" },
  { name: "JavaScript", logo: "/logos/javascript.svg", path: "/learn/javascript" },
  { name: "React.js", logo: "/logos/react.svg", path: "/learn/react" },
  { name: "Next.js", logo: "/logos/nextjs.svg", path: "/learn/nextjs" },
  { name: "Node.js", logo: "/logos/nodejs.svg", path: "/learn/nodejs" },
  { name: "C", logo: "/logos/c.svg", path: "/learn/c" },
  { name: "Java", logo: "/logos/java.svg", path: "/learn/java" },
  { name: "HTML", logo: "/logos/html.svg", path: "/learn/html" },
  { name: "CSS", logo: "/logos/css.svg", path: "/learn/css" },
  { name: "Express.js", logo: "/logos/express.svg", path: "/learn/express" },
];

const LanguageCard = ({ name, logo, path }: { name: string; logo: string; path: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-xl dark:glass-dark p-6 hover:scale-105 transition-transform duration-300 border border-gray-300"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 dark:opacity-0 dark:group-hover:opacity-100 dark:transition-opacity duration-300" />
      <div className="flex flex-col items-center space-y-4">
        <div className="relative w-12 h-12 grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-200">
          <Image
            src={logo}
            alt={`${name} logo`}
            fill
            className="object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/logos/default.svg";
            }}
          />
        </div>
        <h3 className="text-lg font-medium text-foreground">{name}</h3>
        <Link 
          href={path}
          className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 group-hover:text-blue-400 dark:group-hover:text-purple-400 transition-colors duration-200"
        >
          Learn
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="group-hover:translate-x-1 transition-transform duration-200"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
};

const Languages = () => {
  return (
    <section id="languages" className="py-24 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">
            <span className="text-gradient">Languages</span> & Frameworks
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Master the most in-demand programming languages and frameworks with our interactive learning platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {languages.map((lang, index) => (
            <LanguageCard key={lang.name} {...lang} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Languages;
