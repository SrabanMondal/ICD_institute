import React, { useEffect, useState } from "react";
import {AccordionRoot,AccordionItem,AccordionItemTrigger,AccordionItemContent,} from "@/components/ui/accordion";
import { getLevels, LevelData } from "@/lib/api";
import { Montserrat } from "next/font/google";

const mont = Montserrat({
  subsets:['latin'],
  weight:'variable'
})
const MainArea = ({ topic }:{topic:string|null}) => {
  const [levels, setlevels] = useState<LevelData[]|null>(null)
  useEffect(() => {
    const fetchtopics = async (topic:string) =>{
     const data = await getLevels(topic)
      if(data){
        setlevels(data)
      }
    }
    if(topic){
      fetchtopics(topic);
    }
  }, [topic])
  return (
    <div style={{backgroundImage:'url("https://img.pikbest.com/wp/202347/immersive-education-3d-books-against-blurred-background-with-modern-flat-isometric-design-back-to-school-theme_9761108.jpg!w700wp")',backgroundRepeat:'no-repeat',backgroundSize:'cover', backgroundPosition:"center"}} className="flex-1 ">
      <div style={{fontFamily:mont.style.fontFamily}} className="bg-[#000000] w-full h-full p-4 overflow-y-auto bg-opacity-80">

      <div  className="text-center w-full text-2xl mb-3">Levels</div>
      <AccordionRoot collapsible className="flex flex-col gap-2">
        {levels && levels.map((level, index) => (
          <AccordionItem key={index} value={level.name}>
            <AccordionItemTrigger style={{boxShadow:'0px 4px 8px rgba(0, 0, 0, 1)', background:'linear-gradient(100deg, #19191970, rgba(255, 255, 255, 0.05),#19191980)',border:'1px solid rgba(255, 255, 255, 0.2)'}} 
            className="text-lg font-bold text-[#d3d3d3] p-3 rounded-lg">
              {level.name}
            </AccordionItemTrigger>
            <AccordionItemContent style={{background:'#19191990'}} className=" p-3 rounded-lg backdrop-blur-md shadow-custom">
              <ul className="list-disc px-5 text-[#f0f0f0]">
                {level.materials.map((material, idx) => (
                  <li key={idx} className="mb-2 ">
                  <div className="flex justify-between items-center">
        <a
          href={`${material.link}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400 hover:underline"
        >
          {material.name}
        </a>
        <a
          download={true}
          href={`https://drive.google.com/uc?export=download&id=${material.link.split("/d/")[1].split("/")[0]}`}
          className="text-blue-500 text-sm hover:text-blue-400 ml-4"
        >
          Download
        </a>
      </div>
                  </li>
                ))}
              </ul>
            </AccordionItemContent>
          </AccordionItem>
        ))}
      </AccordionRoot>
        </div>
    </div>
  );
};

export default MainArea;