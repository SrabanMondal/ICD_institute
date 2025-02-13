import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Flex, Text, IconButton } from "@chakra-ui/react";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import { ArrowBigLeftDash, ArrowBigRightDash } from "lucide-react";
import {Patrick_Hand } from "next/font/google";
import { Cabin_Sketch } from "next/font/google";

const chalkFont = Cabin_Sketch({
  weight: "700",
  subsets: ["latin"],
  display: "swap",
});
import "./cube.css"
import { AnnouncementType, getannouncements } from "@/lib/api";
const pat = Patrick_Hand({
    weight:'400',
    subsets:['latin']
})
const Chalkboard = () => {
    const isMobile = window.innerWidth <= 768;
  const [zoomedIn, setZoomedIn] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [randomQuote, setRandomQuote] = useState("");
  const scrollableDivRef = useRef<HTMLDivElement>(null);
  const [announcements, setannouncements] = useState<AnnouncementType[]|null>(null)
  
  // Pick a random quote on component mount
  useEffect(() => {
    const quotes = [
      "Education is the most powerful weapon.",
      "An investment in knowledge pays the best interest.",
      "Learning never exhausts the mind.",
      "The best way to predict your future is to create it.",
      "Your attitude, not your aptitude, will determine your altitude.",
    ];
    setRandomQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);
  useEffect(() => {
    const fetchannouncement = async ()=>{
      const res = await getannouncements();
      console.log(res)
      if(res){
        setannouncements(res);
      }
    }
    fetchannouncement();
  }, [])
  
  const handleZoomIn = () => setZoomedIn(true);
  const handleZoomOut = () => setZoomedIn(false);

  const handleNext = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if(currentIndex+2 === announcements?.length || announcements?.length==1) return;
    e.stopPropagation();
    if (announcements && currentIndex < announcements.length) {
      setCurrentIndex((prev) => prev + 1);
    }
    scrollToBottom();
  };

  const handlePrevious = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };
  const pastelColors = ["#FFD1DC", "#D4A5A5", "#A5D8D6", "#B8E1FF"];
const randomColor = pastelColors[Math.floor(Math.random() * pastelColors.length)];
const scrollToBottom = () => {
    const div = scrollableDivRef.current;
    if(!div) return;
    div.scrollTop = div.scrollHeight;
  };


  return (
    <div style={{fontFamily:pat.style.fontFamily}} className="overflow-hidden w-full h-[60vh] sm:h-[80vh]">
      <motion.div
      style={{backgroundImage:'url(/class.webp)'}}
        className={`overflow-hidden relative h-full w-full bg-cover bg-center flex items-start justify-center bg-no-repeat ${
          zoomedIn ? "cursor-pointer" : "cursor-default"
        }`}
        
        onClick={!zoomedIn ? undefined : handleZoomOut}
      >

<motion.div
  style={{
    boxShadow: isMobile
      ? "0 2px 6px rgba(0, 0, 0, 0.2)"
      : "inset 0 1px 4px rgba(255, 255, 255, 0.1), 0 8px 16px rgba(0, 0, 0, 0.4)",
    background: `linear-gradient(145deg, #383838, ${zoomedIn ? '#2e2e2e' : '#2e2e2e98'}, #434343)`,
    borderRadius: "12px",
    transformOrigin: "center center",
    willChange: "transform, box-shadow",
  }}
  className={`text-sm sm:text-2xl relative w-[60%] h-[50%] sm:h-[42%] overflow-hidden my-20 cursor-pointer border-8 border-[#5c4033]`}
  initial={{ scale: 0.8 }}
  animate={{ scale: zoomedIn ? 1.2 : 0.8 }}
  transition={{ duration: 0.4 }}
  whileHover={{
    boxShadow: "0 4px 10px rgba(255, 255, 255, 0.3)",
  }}
  onClick={!zoomedIn ? handleZoomIn : handleZoomOut}
>
          {/* Zoomed-in content */}
          {zoomedIn && (
            <div className="relative w-full h-full p-6 flex flex-col justify-between">
              {/* Quote or Announcement */}
                <div ref={scrollableDivRef} className="text-center h-[80%] overflow-scroll sm:overflow-hidden">
                  <h1 style={{background:'linear-gradient(90deg,#FFB6C1, #FFDAB9, #E6E6FA, #B0E0E6, #98FB98)',backgroundClip:'text',color:'transparent'}} className=" text-xl sm:text-4xl font-bold mb-2">
                    Announcements
                  </h1>
              {currentIndex === 0 ? (
                <>
                  <p style={{color:randomColor}} className={`text-sm sm:text-xl text-[${randomColor}] font-semibold`}>
                    &quot;{randomQuote}&quot;
                  </p>
                  <TextGenerateEffect className="text-sm sm:text-lg" key={currentIndex} words={announcements&& announcements.length>0?announcements[currentIndex].title:""} />
                </>
            ) : (
                <>
                <TextGenerateEffect className="text-sm sm:text-lg" key={currentIndex} words={announcements&& announcements.length>0?announcements[currentIndex].title:""} />
                <TextGenerateEffect className="text-sm sm:text-lg" key={currentIndex+1} words={announcements && announcements.length>0?announcements[currentIndex+1].title:""} /> 
              </>
            )}</div>
              <Flex justifyContent={"space-between"} mt={3}>
              <IconButton
                as={ArrowBigLeftDash}
                disabled={currentIndex === 0}
                onClick={(e)=>handlePrevious(e)}
                  size="xs"
                  variant="outline"
                  _hover={{boxShadow:"0 0 3px #dcdcdc"}}
                  />
                <Text>{currentIndex+1} of {announcements&& announcements.length>1?announcements.length-1:1}</Text>
                <IconButton
                as={ArrowBigRightDash}
                disabled={announcements?.length==1 ||currentIndex+2 === announcements?.length}
                onClick={(e)=>handleNext(e)}
                  size="xs"
                  variant="outline"
                  _hover={{boxShadow:"0 0 3px #dcdcdc"}}
                  />
              </Flex>
            </div>
          )}
          
          {!zoomedIn && (
              <div className="absolute inset-0 flex items-center justify-center h-full">

              <div style={{fontFamily:chalkFont.style.fontFamily}} className="text-white text-2xl sm:text-3xl font-bold text-center">
              Announcements Here!
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Chalkboard;
