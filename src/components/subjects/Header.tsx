"use client"
import React from "react";
import Image from "next/image";
import { Space_Grotesk } from "next/font/google";
const mont = Space_Grotesk({
  subsets: ["latin"],
  weight: "variable",
})
import {  Grid, GridItem } from "@chakra-ui/react";
import {MenuContent,MenuItem,MenuRoot,MenuTrigger,} from "@/components/ui/menu";
import Link from "next/link";
import { Provider } from "../ui/provider";
const SubjectHeader = ({ subject,subjects }:{subject:string,subjects:string[]|null}) => {

  return (
    <Provider>
    <header
      className="relative flex items-center justify-between sm:justify-start w-full px-6 py-4 shadow-lg gap-6 h-[10vh]"
      style={{
        background: "linear-gradient(135deg, #191919, #2c2c2c)",
      borderBottom: "2px solid transparent",
        borderImage: "linear-gradient(to right, #ffffff, #ffd700) 1",
        boxShadow: "0 2px 5px rgba(255, 255, 255, 0.5)"
        //boxShadow:"0px 5px 15px rgba(0, 0, 0, 0.8)"
        }}
        >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <Image src="/logo.png" alt="Logo" width={40} height={40} />
        <div className="text-2xl text-[#e5e5e5] font-extrabold"
            style={{//background: "linear-gradient(to bottom, #000, #aaa, #444)",
                //WebkitBackgroundClip: "text",
                //WebkitTextFillColor: "transparent",
                fontFamily:mont.style.fontFamily,
                fontWeight:700
                }}>
          {subject.toUpperCase()}
        </div>
      </div>
        
      <MenuRoot unmountOnExit={true}>
            <MenuTrigger _focus={{ outline: 'none', boxShadow: 'none' }} className="text-lg transition-all text-[#e5e5e5] ease-linear duration-300 hover:text-[#f5f5f5] transform hover:scale-110 hover:text-shadow-custom cursor-pointer"
            style={{//background: "linear-gradient(to bottom, #000, #aaa, #444)",
                //WebkitBackgroundClip: "text",
                //WebkitTextFillColor: "transparent",
                fontFamily:mont.style.fontFamily
                }}>
               Subjects
            </MenuTrigger>
            <MenuContent backdropBlur={'10px'} borderRadius={'8px'} bg={'rgba(25, 25, 25, 0.8)'} className="text-[#f5f5f5]">
              <Grid
                templateRows="repeat(3, 1fr)"
                autoFlow="column" 
                gap={4}
                >
                {subjects && subjects.map((subject, index) => (
                    <GridItem key={index} className="flex items-center justify-center">
                    <MenuItem _hover={{
                        background: "linear-gradient(135deg, #facc1580, #f9d08450)",
                        //color: "#000",
                        
                        transition: "all 0.3s ease"
                    }} value={subject} className=" focus:outline-none w-fit px-3 transition-all ease-linear duration-300 text=[#9ca3af] rounded-2xl text-center">
                      <Link href={'/'+subject.toLowerCase()} className=" focus:outline-none" >
                      {subject}
                      </Link>
                    </MenuItem>
                  </GridItem>
                ))}
              </Grid>
            </MenuContent>
          </MenuRoot>
    </header>
                </Provider>
  );
};

export default SubjectHeader;
