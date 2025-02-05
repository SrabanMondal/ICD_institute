import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import {DrawerBackdrop,DrawerBody,DrawerCloseTrigger,DrawerContent,DrawerFooter,DrawerHeader,DrawerTitle,DrawerRoot,DrawerTrigger,} from "@/components/ui/drawer";
import { getTopics, TopicsType } from "@/lib/api";
import { Poppins } from "next/font/google";
const pop = Poppins({
  weight:'400',
  subsets:['latin']
})
type SideBarProps={
  subjectid:string|null,
  topic:string,
  setTopic:Dispatch<SetStateAction<string>>
}
const Sidebar:React.FC<SideBarProps> = ({ subjectid, topic, setTopic }) => {
  const [topics, settopics] = useState<TopicsType[]|null>(null)
  useEffect(() => {
   const fetchtopics= async (subjectid:string)=>{
    const data = await getTopics(subjectid);
    if(data){
      settopics(data)
    }
   }
   if(subjectid){
     fetchtopics(subjectid)
   }
  }, [subjectid])
  
  return (

    <div style={{fontFamily:pop.style.fontFamily}} className="flex h-full">
      {/* Sidebar for larger screens */}
      <aside className="hidden md:flex flex-col w-64 h-screen p-4 bg-gradient-to-b from-[#121212]/60 to-[#1A1A1A]/80 backdrop-blur-lg border-r space-y-2 border-gray-700 shadow-xl overflow-y-auto">
        <h2 className="text-xl font-semibold text-gray-300 mb-4 text-center tracking-wide">Topics</h2>
        {topics && topics.map((topi, index) => (
          <button
            key={index}
            style={{
      background:topic==topi.id ?"#424242":""
            }}
            className="w-full py-2 px-4 font-medium text-gray-300 tracking-wide rounded-lg border border-gray-600 transition-all duration-300 bg-gradient-to-r from-gray-900/40 via-gray-700/10 to-gray-900/40 shadow-md hover:from-gray-700/80 hover:to-gray-800/80 hover:shadow-lg hover:text-white"
            onClick={() => setTopic(topi.id)}>
            {topi.name}
          </button>
        ))}
      </aside>

      {/* Drawer for mobile screens */}
      <div className="md:hidden absolute h-full">
        <DrawerRoot  placement={'start'}>
          <DrawerTrigger className="flex pl-8 pr-5 py-3 text-md -translate-x-5 items-center justify-center bg-gradient-to-br from-gray-50/20 to-gray-900/80 backdrop-blur-lg border-gray-400/50 shadow-[0_2px_6px_rgba(0,0,0,0.6)] rounded-full active:scale-90 transition-all">
       Topics
          </DrawerTrigger>
          <DrawerBackdrop />
          <DrawerContent className=" text-[#d3d3d3] top-[10vh] absolute h-[90vh] w-[50vw] bg-gradient-to-b from-[#121212]/60 to-[#1A1A1A]/80 backdrop-blur-lg border-r border-gray-700 shadow-xl ">
            <DrawerHeader className="flex items-center p-4">
              <DrawerTitle className=" text-xl">Topics</DrawerTitle>
              <DrawerCloseTrigger/>
            </DrawerHeader>
            <DrawerBody className="flex-col py-2 px-4 overflow-y-auto space-y-2">
              { topics && topics.map((topi, index) => (
                <button
                  key={index}
                  style={{
                    background:topic==topi.id ?"#424242":""
                          }}
                          className="w-full py-2 px-4 font-medium text-gray-300 tracking-wide rounded-lg border border-gray-600 transition-all duration-300 bg-gradient-to-r from-gray-900/40 via-gray-700/10 to-gray-900/40 shadow-md hover:from-gray-700/80 hover:to-gray-800/80 hover:shadow-lg hover:text-white"
                  onClick={() => setTopic(topi.id)}
                >
                  {topi.name}
                </button>
              ))}
            </DrawerBody>
            <DrawerFooter>
              <DrawerCloseTrigger>
                <Button variant="outline" className="w-full">Close</Button>
              </DrawerCloseTrigger>
            </DrawerFooter>
          </DrawerContent>
        </DrawerRoot>
      </div>
    </div>
  );
};

export default Sidebar;