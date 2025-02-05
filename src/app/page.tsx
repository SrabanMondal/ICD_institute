"use client"
import { useState } from "react";
import ChalkboardAnimation from "../components/Loading";
import Header from "@/components/home/Header";
import { Provider } from "@/components/ui/provider";
import Chalkboard from "@/components/home/Announcement";
import SubjectBox from "@/components/home/Subjects";
import ElegantBanner from "@/components/home/Elegant";
import Design from "@/components/home/Design";
import Footer from "@/components/home/Footer";

export default function Home() {
  const [showMainPage, setShowMainPage] = useState(false);

  const handleAnimationComplete = () => {
    setShowMainPage(true);
  };

  return (
    <>
      {!showMainPage && <ChalkboardAnimation onComplete={handleAnimationComplete} />}
      {showMainPage && (
        <main>
          <Provider>
            {/* Provider components */}
          <Header/>
          <Chalkboard />
          <ElegantBanner/>
          <SubjectBox/>
          <Design/>
          <Footer/>
          </Provider>
          {/* Main content goes here */}
        </main>
      )}
    </>
  );
}
