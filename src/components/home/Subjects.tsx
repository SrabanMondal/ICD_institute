import React from "react";
import { Patrick_Hand } from "next/font/google";
const subjects = [
  { name: "Math", link: "/math" },
  { name: "Reasoning", link: "/reasoning" },
  { name: "English", link: "/english" },
];
const pat = Patrick_Hand({
  weight: "400",
  subsets:['latin']
}
)

const StickyNoticeBoard = () => {
  const stickyimg = ["url('/sticky2.png')","url('/sticky.png')","url('/sticky3.png')","url('/sticky4.png')"
                      ,"url('/sticky6.png')","url('/sticky8.png')"]
  return (
    <div
      className="relative w-full h-[70vh] flex justify-center items-center"
      style={{
        backgroundImage: window.innerWidth<768?`url('/studybg.jpg')`:'url(/studybg.webp)', // Replace with your background image
        backgroundSize: "cover",
        backgroundPosition: "center",
        boxShadow: "inset 0 0 15px rgba(0, 0, 0, 0.6)",
        fontFamily:pat.style.fontFamily
      }}
    >
      {/* Noticeboard */}
      <div style={{background:"linear-gradient(135deg, rgba(189,189,189,0.4), rgba(158,158,158,0.8))",
      border: '2px dashed rgba(0,0,0,0.8)'}} className="bg-studymob sm:bg-studylap relative w-[80%] sm:w-[60%] h-[80%] rounded-xl shadow-lg p-6 overflow-hidden backdrop-blur-[2px]">
        <h1 style={{textShadow: '1px 1px 2px rgba(0,0,0,0.9)'}} className="text-3xl font-bold text-white text-center mb-4 border-b-2 border-white">
          Subjects
        </h1>

        {/* Sticky Notes */}
        <div className="relative w-full h-full">
          {subjects.map((subject, index) => (
            <a
              key={index}
              href={subject.link}
              className={`absolute w-[100px] h-[100px]  sm:w-[130px] sm:h-[130px] flex justify-center items-center rounded-lg p-2`}
              style={{
                position: "absolute",
                top: `${ ((index % 4) * 20 - Math.random() * 5)%90}%`,
                left: `${((index % 5) * 15 - Math.random() * 8) % 74+6}%`,
                transform: `rotate(${Math.random() * 10 - 5}deg)`,
                backgroundImage: stickyimg[Math.floor(Math.random()*6)], // Replace with your sticky note image
                backgroundSize: "cover",
                backgroundPosition: "center",
                textAlign: "center",
              }}
            >
              <p className="text-md md:text-md font-bold text-[#2c3e50]">{subject.name}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StickyNoticeBoard;
