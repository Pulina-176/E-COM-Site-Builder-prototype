import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa'; // Social Icons
import { HiMiniArrowUpRight } from "react-icons/hi2";

const Footer = ({ socialLinks, contactDetails }) => {
  return (
    <footer className="bg-gray-200 text-blue-900 py-10 mt-10">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-6 pl-[80px] pr-[80px]">
          {/* Links to Pages with Arrow Icons */}
          <div className="flex flex-col items-start space-y-2 w-[200px]">
            <a href="/products" className="flex items-center text-blue-900 hover:text-blue-700">
              <HiMiniArrowUpRight className="mr-2" /> Products
            </a>
            <a href="/services" className="flex items-center text-blue-900 hover:text-blue-700">
              <HiMiniArrowUpRight className="mr-2" /> Services
            </a>
            <a href="/contact-us" className="flex items-center text-blue-900 hover:text-blue-700">
              <HiMiniArrowUpRight className="mr-2" /> Contact Us
            </a>
            <a href="/about-us" className="flex items-center text-blue-900 hover:text-blue-700">
              <HiMiniArrowUpRight className="mr-2" /> About Us
            </a>
          </div>

          {/* Social Links Centered */}
          <div className="flex flex-col items-center space-y-4">
            {/* Social Links */}
            <div className="flex space-x-6 gap-4">
              {socialLinks.facebook && (
                <a href={socialLinks.facebook} target="_blank" rel="noreferrer" className="text-blue-900 hover:text-blue-700">
                  <FaFacebookF className="h-6 w-6" />
                </a>
              )}
              {socialLinks.instagram && (
                <a href={socialLinks.instagram} target="_blank" rel="noreferrer" className="text-blue-900 hover:text-blue-700">
                  <FaInstagram className="h-6 w-6" />
                </a>
              )}
              {socialLinks.twitter && (
                <a href={socialLinks.twitter} target="_blank" rel="noreferrer" className="text-blue-900 hover:text-blue-700">
                  <FaTwitter className="h-6 w-6" />
                </a>
              )}
            </div>
          </div>

          {/* Contact Details on the Right */}
          <div className="flex flex-col text-right pr-10 w-[200px]">
            {contactDetails.email && <p className="whitespace-nowrap">{contactDetails.email}</p>}
            {contactDetails.phone && <p className="whitespace-nowrap">{contactDetails.phone}</p>}
          </div>
        </div>

        {/* Centering the copyright */}
        <div className="text-center text-sm text-blue-900 mt-6">&copy; 2024 Trendenshi. All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;
