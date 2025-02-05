import React from "react";
import { motion } from "framer-motion";
import { BackgroundBeams } from "../ui/background-beams";

const elements = [
  { src: "/bulb.png", top: "15%", left: "15%", delay: 0 },
  { src: "/book.png", top: "18%", left: "70%", delay: 0.5 },
  { src: "/globe.png", top: "53%", left: "7%", delay: 1 },
  { src: "/lamp.png", top: "68%", left: "70%", delay: 1.5 },
  { src: "/though.png", top: "75%", left: "20%", delay: 2 },
  { src: "/form.png", top: "10%", left: "40%", delay: 2.5 },
  { src: "/pen.png", top: "40%", left: "77%", delay: 3 }
];

const quote2 = "a path to success.";
const quote1 = "A gateway to wisdom,";
const FloatingKnowledgeGalaxy = () => {
  return (
    <div
      className="relative w-full h-[60vh] sm:h-[75vh] flex justify-center items-center overflow-hidden"
      style={{
        background: "linear-gradient(167deg, #000000, #0a0a0a, #111111, #000000)",
        //borderImage: "linear-gradient(180deg, #8000ff, #6600cc,#8A2BE2) 1",
        //boxShadow: "inset 1px 7px 7px rgba(255, 255, 255, 0.5), 0px 7px 12px rgba(0,0, 0, 1)",
        borderRadius: "5px"
      }}
    >
      {/* Floating Elements */}
      {elements.map((el, index) => (
        <motion.img
          key={index}
          src={el.src}
          loading="lazy"
          alt="Knowledge Item"
          className="absolute w-[80px] sm:w-[100px] md:w-[120px]"
          style={{ top: el.top, left: el.left }}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 3, delay: el.delay, ease: "easeInOut" }}
        />
      ))}

      {/* Centered Text - Letter by Letter Effect */}
      <div 
        className="text-center flex-col justify-center translate-y-4"
      >
        <div className="text-center flex justify-center">
        {quote1.split("").map((char, index) => (
          <span
          key={index}
          className="text-2xl sm:text-3xl md:text-5xl font-extrabold mx-[2px]"
          style={{
            fontFamily: "'Cinzel', serif",
            background: "linear-gradient(to bottom, #dcdcdc, #434343)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            //textShadow: "2px 4px 10px rgba(138, 43, 226, 0.8)"
          }}
          >
            {char}
          </span>
        ))}
        </div>
        <div className="text-center flex justify-center mt-3 text-2xl sm:text-3xl md:text-5xl font-extrabold mx-[2px]"style={{
            fontFamily: "'Cinzel', serif",
            background: "linear-gradient(to bottom, #dcdcdc, #191919)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            //textShadow: "2px 4px 10px rgba(138, 43, 226, 0.8)"
          }}>

        
            {quote2}
         
        </div>
        <div className="text-center flex justify-center mt-4 text-xl sm:text-3xl md:text-4xl font-extrabold mx-[2px]" style={{
            fontFamily: "'Cinzel', serif",
            background: "linear-gradient(to bottom, #d3d3d3, #191919)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            //textShadow: "2px 4px 10px rgba(138, 43, 226, 0.8)"
          }}>
        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;--ICD Institute
        </div>
      </div>

      <BackgroundBeams />
    </div>
  );
};

export default FloatingKnowledgeGalaxy;
