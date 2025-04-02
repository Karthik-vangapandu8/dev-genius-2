'use client';

import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="w-full bg-[#171717] border-t border-gray-800 z-50">
            {/* Main footer content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                    {/* Company info */}
                    <div className="flex flex-col space-y-4">
                        {/* Logo Image */}
                        <Image
                            src="/logo-removebg-preview.png" // Place your logo inside the "public" folder
                            alt="ZOVX Labs Logo"
                            width={150} // Adjust as needed
                            height={50} // Adjust as needed
                            className="object-contain"
                        />

                        <p className="text-gray-400 text-sm max-w-md">
                            Empowering developers with cutting-edge AI tools and resources for enhanced learning and development.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex flex-col space-y-4">
                        <h4 className="text-white font-medium">Legal</h4>
                        <div className="flex flex-col space-y-2">
                            <Link href="/terms" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                                Terms of Service
                            </Link>
                            <Link href="/privacy" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                                Privacy Policy
                            </Link>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="flex flex-col space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-5 h-5 rounded-full overflow-hidden border-none shadow-md">
                                <Image
                                    src="/Flag_of_India.png"
                                    alt="Indian Flag"
                                    width={40}
                                    height={40}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <span className="text-gray-400 text-sm">India</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-sm">
                            &copy; {new Date().getFullYear()} ZOVX LABS. All rights reserved.
                        </p>

                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
