import { useEffect, useRef } from "react";
import { Cabin_Sketch } from "next/font/google";

const chalkFont = Cabin_Sketch({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const ChalkboardAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      window.addEventListener('resize', resizeCanvas);
      resizeCanvas();
    
    const chalkboardImage = new Image();
    chalkboardImage.src = "/chalk2.webp";
    chalkboardImage.onload = () => {
      ctx.drawImage(chalkboardImage, 0, 0, canvas.width , canvas.height);

      //drawFrame();
      runAnimation();
    };
    const rocket = new Image();
    rocket.src = "/rocket_doodle.png";
    rocket.onload = () => {
        const scalingFactor = (1280)/canvas.width
        ctx.globalAlpha = 0.5;
      ctx.drawImage(rocket, 100 - scalingFactor**3, canvas.height - 200, 100, 100);
      ctx.globalAlpha = 1;
    };
    const heart = new Image();
    heart.src = "/heart_doodle.webp"; 
    heart.onload = () => {
        const scalingFactor = (1280)/canvas.width
        ctx.globalAlpha = 0.5;
      ctx.drawImage(heart, canvas.width- 200 + scalingFactor**3, 200 - scalingFactor**3, 100, 100);
      ctx.globalAlpha = 1;
    };
    
    const drawSymbols = () => {
        const symbols = ["∑", "π", "√", "A", "B", "?", "≠", "∴"];
        const n = Math.floor(14 - (1280)/canvas.width)
        for (let i = 0; i < n; i++) {
            const scalingFactor = (1280)/canvas.width
            const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
            const randomX = 100 + Math.random() * (canvas.width - 200+scalingFactor**3);
            const randomY = 100 + Math.random() * (canvas.height - 200+scalingFactor**3);
            //console.log(scalingFactor)
            ctx.font = ""+(80-scalingFactor)+"px " + chalkFont.style.fontFamily; // Use the custom font
            ctx.fillStyle = "rgba(255, 255, 255, 0.3)"; // Chalk effect with low opacity
            ctx.fillText(randomSymbol, randomX, randomY);
        }
    };
    
    const drawText = (text: string, x: number, y: number, callback?: () => void) => {
        let i = 0;
        const interval = setInterval(() => {
            const scalingFactor = (1280)/canvas.width;
            if (i < text.length) {
                ctx.save();
                const pastelColors = ["#FFB6C1", "#FFDAB9", "#E6E6FA", "#B0E0E6", "#98FB98"];
                ctx.fillStyle = pastelColors[Math.floor(Math.random() * pastelColors.length)];
                ctx.shadowColor = "rgba(60, 60, 60, 0.5)";
                ctx.shadowBlur = 5;
                ctx.shadowOffsetX = 2;
                ctx.shadowOffsetY = 2;
                ctx.font = ""+(40-scalingFactor)+"px " + chalkFont.style.fontFamily; 
                const offsetX = Math.random() * 3 - 1;
                const offsetY = Math.random() * 3 - 1;
                ctx.fillText(text[i], x + ctx.measureText(text.slice(0, i)).width+offsetX, y+offsetY);
                ctx.restore();
                i++;
            } else {
                clearInterval(interval);
                if (callback) callback();
            }
        }, 100);
    };
    
    
    let step = 0;
    const messages = [
        "ICD Institute", 
        "Empowering Minds", 
        "Let the future begin",
    ];
    
    const runAnimation = () => {
        const scalingFactor = 1280/canvas.width;
        if (step === 0) {
            drawSymbols();
            drawText(messages[0], canvas.width / 2 - (150- scalingFactor**2.5) , canvas.height / 2 - 100, () => {
                step++;
                runAnimation();
            });
        } else if (step === 1) {
            drawText(messages[1], canvas.width / 2 - (155 - scalingFactor**2.5), canvas.height / 2, () => {
                step++;
                runAnimation();
            });
        } else if (step === 2) {
            drawText(messages[2], canvas.width / 2 - (175-scalingFactor**2.5), canvas.height / 2 + 100, () => {
                step++;
                setTimeout(() => {
                    canvas.style.transition = "opacity 1.5s ease-out";
                    canvas.style.opacity = "0";
                    setTimeout(onComplete,1000); 
                }, 1500);
            });
        }
    };
}, [onComplete]);

  return (
    <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full"></canvas>
  );
};

export default ChalkboardAnimation;
