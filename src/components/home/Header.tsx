import React, { useEffect, useState } from "react";
import {  Grid, GridItem, Flex, useBreakpointValue } from "@chakra-ui/react";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import { Menu } from "lucide-react";
import Link from "next/link";
import {  Playfair_Display } from "next/font/google";
import { getSubject, SubjectType } from "@/lib/api";
import Image from "next/image";
//import { Provider } from "../ui/provider";
const inter2 = Playfair_Display({
  weight: "variable",
  subsets: ["latin"],
})
const Header = () => {
  const [subjects, setsubjects] = useState<SubjectType[]|null>(null)
  useEffect(() => {
   const fetchSubjects = async ()=>{
    const data = await getSubject();
    if(data){
      setsubjects(data)
    }
   }
   fetchSubjects();
  }, [])
  const isMobile = useBreakpointValue({base:true, md:false});

  return (
    <>
      <header style={{background:"radial-gradient(circle at 50% 50%,#1c1c1e,#0e0e0e, #191919)", fontFamily:inter2.style.fontFamily}} className="border-b-2 border-[#f9d084] sticky w-full top-0 text-[#e5e5e5] z-50 shadow-custom transition-shadow duration-300">
        <Flex
          className="container my-auto"
          alignItems="center"
          justifyContent="space-between"
          py={4}
          px={5}
        >
          <Flex justifyItems={'flex-start'} alignItems={'center'} gap={6}>

          {/* Logo and Home Title */}
          <Flex align="center" gap={3}>
             <Image src="/logo.png" alt="Logo" width={40} height={40} />
            <h1 className="text-xl font-bold text-shadow-custom" style={{ fontFamily:inter2.style.fontFamily }}>
              Home
            </h1>
          </Flex>
          <MenuRoot unmountOnExit={true}>
            <MenuTrigger _focus={{ outline: 'none', boxShadow: 'none' }} className=" transition-all ease-linear duration-300 text=[#9ca3af] hover:text-[#d4af37] transform hover:scale-110 hover:text-shadow-custom2">
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
                    }} value={subject.name} className=" focus:outline-none w-fit px-3 transition-all ease-linear duration-300 text=[#9ca3af] rounded-2xl text-center">
                      <Link href={"/"+subject.name.toLowerCase()} className=" focus:outline-none" >
                      {subject.name}
                      </Link>
                    </MenuItem>
                  </GridItem>
                ))}
              </Grid>
            </MenuContent>
          </MenuRoot>

          {/* Navigation Links */}
          {!isMobile && (
            <Flex as="nav" gap={6}>
              <Link href="/about" className=" transition-all ease-linear duration-300 text=[#9ca3af] hover:text-[#d4af37] transform hover:scale-110 hover:text-shadow-custom2">
                About Us
              </Link>
              <Link href="/adminlogin" className=" transition-all ease-linear duration-300 text=[#9ca3af] hover:text-[#d4af37] transform hover:scale-110 hover:text-shadow-custom2">
                Admin
              </Link>
            </Flex>
          )}

          </Flex>
          {/* Subjects Dropdown */}

          {/* Hamburger for Mobile */}
          {isMobile && (
            <MenuRoot>
              <MenuTrigger _focus={{outline:'none', boxShadow: 'none'}}>
                <Menu size={20}/>
              </MenuTrigger>
              <MenuContent  >
                <MenuItem  value="About" ><Link href="/about" className=" focus:outline-none">About</Link></MenuItem>
                <MenuItem value="support">
                 <Link href={'/adminlogin'}>Admin</Link>
                </MenuItem>
              </MenuContent>
            </MenuRoot>
          )}
        </Flex>
      </header>
    </>
  );
};

export default Header;
