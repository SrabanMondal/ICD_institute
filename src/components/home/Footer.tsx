import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer
    style={{backgroundImage:'url(/footer.jpg)', }}
      className="w-full text-white"
    ><div className="w-full h-full px-6 sm:px-12 py-8 bg-[#19191970] backdrop-blur-sm" style={{boxShadow:'0px 15px 15px #111111 inset'}}>

      <div className="px-5 flex flex-col md:flex-row justify-between items-center text-center md:text-left" >
        {/* Logo & Name */}
        <div className="mb-6 md:mb-0">
          <Image width={64} height={64} src="/logo.png" alt="Institute Logo" className="w-16 h-16 mx-auto md:mx-0" />
          <h2 className="text-xl font-bold mt-2">ICD Institute</h2>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-6 text-gray-300 text-sm">
          <a href="/math" className="hover:text-purple-400 transition duration-300">Math</a>
          <a href="/reasoning" className="hover:text-purple-400 transition duration-300">Reasoning</a>
          <a href="#english" className="hover:text-purple-400 transition duration-300">English</a>
          <a href="#about" className="hover:text-purple-400 transition duration-300">About</a>
          <a href="#contact" className="hover:text-purple-400 transition duration-300">Contact</a>
        </div>

        {/* Contact Info */}
        <div className="text-sm text-gray-400 mt-6 md:mt-0">
          <p>Email: contact@elitelearning.com</p>
          <p>Phone: +123 456 7890</p>
        </div>
      </div>

      {/* Copyright Notice */}
      <div className="text-center text-[#dcdcdc] text-xs mt-8 border-t border-[#d3d3d3] pt-4">
        &copy; {new Date().getFullYear()} ICD Institute. All rights reserved.
      </div>
    </div>
    </footer>
  );
};

export default Footer;