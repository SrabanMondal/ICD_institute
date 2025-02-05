"use client";
import { Orbitron } from "next/font/google"; // Importing Epic Font

const orbitron = Orbitron({ subsets: ["latin"], weight: "700" });
const AdminHeader = () => {
  return (
    <header className="relative bg-gradient-to-r from-black via-gray-900 to-gray-800 
      bg-opacity-80 backdrop-blur-lg border border-gray-700 shadow-lg 
      text-white py-4 px-6 flex justify-between items-center 
      "
    >
      <h1 style={{fontFamily:orbitron.style.fontFamily}} className="text-2xl font-extrabold tracking-wide 
        text-white drop-shadow-md"
      >
        Admin Panel
      </h1>
    </header>
  );
};

export default AdminHeader;
