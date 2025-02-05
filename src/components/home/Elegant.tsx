import { Italianno } from "next/font/google";
const Italiano = Italianno({
    weight:'400',
    subsets:['latin']
})

const ElegantBanner = () => {
    return (
      <div 
        className="w-full flex justify-center items-center relative py-8"
        style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.3)), url('/whitey.webp')`,

          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.8) inset"
        }}
      >
        {/* PNG Design Element */}
        <div 
          className="absolute top-1/2 left-[5%] transform -translate-y-[40%] -rotate-12 z-10 opacity-60"
          style={{
            backgroundImage: `url('/bghelp.png')`, // Replace with your PNG design path
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            width: '150px',
            height: '150px',
            filter:'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2)) brightness(0.9) contrast(1.1)',
          }}
        ></div>
  
        {/* Semi-transparent Blur Overlay */}
        <div 
          className="relative w-[90%] sm:w-[80%] py-6 px-1 sm:px-3  rounded-xl border-[2px] border-white shadow-md z-20"
          style={{
            boxShadow: "0px  4px 6px rgba(34, 34, 34, 0.7),0 10px 15px rgba(51, 51, 51, 0.6),0 20px 25px rgba(68, 68, 68, 0.5),0 30px 35px rgba(85, 85, 85, 0.4)",
            background:"linear-gradient(140deg,rgba(245, 245, 245, 0.8),rgba(238, 238, 238, 0.6), rgba(224, 224, 224, 0.4),rgba(210, 210, 210, 0.2) )"

          }}
        >
          <h2 
            className="text-3xl sm:text-4xl tracking-widest text-gray-900 text-center"
            style={{
              textShadow: "0px 5px 10px rgba(0, 0, 0, 0.8)",
              fontFamily:Italiano.style.fontFamily
            }}
          >
            Study Smarter, Not Harder
          </h2>
        </div>
      </div>
    );
  };
  
  export default ElegantBanner;
  