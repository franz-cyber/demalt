import floatMop from "@/assets/float-mop.png";
import floatSponge from "@/assets/float-sponge.png";
import floatBucket from "@/assets/float-bucket.png";
import floatGlove from "@/assets/float-glove.png";

const items = [
  // Large scattered elements
  { src: floatMop, size: 140, top: "3%", left: "2%", duration: 26, delay: 0, rotate: -15 },
  { src: floatSponge, size: 110, top: "55%", left: "1%", duration: 30, delay: 2, rotate: 10 },
  { src: floatBucket, size: 150, top: "10%", right: "3%", duration: 28, delay: 4, rotate: -8 },
  { src: floatGlove, size: 120, top: "65%", right: "2%", duration: 32, delay: 1, rotate: 15 },
  // Medium duplicates
  { src: floatMop, size: 90, top: "80%", left: "30%", duration: 24, delay: 5, rotate: -25 },
  { src: floatSponge, size: 85, top: "2%", left: "55%", duration: 29, delay: 6, rotate: 18 },
  { src: floatBucket, size: 95, top: "40%", left: "18%", duration: 22, delay: 2, rotate: 5 },
  { src: floatGlove, size: 80, top: "25%", left: "75%", duration: 31, delay: 4, rotate: -18 },
  // Extra fills
  { src: floatMop, size: 70, top: "48%", left: "85%", duration: 23, delay: 7, rotate: 30 },
  { src: floatSponge, size: 65, top: "88%", left: "80%", duration: 28, delay: 3, rotate: -22 },
  { src: floatBucket, size: 100, top: "15%", left: "35%", duration: 26, delay: 5, rotate: 8 },
  { src: floatGlove, size: 60, top: "90%", left: "10%", duration: 20, delay: 0, rotate: 20 },
  { src: floatMop, size: 75, top: "35%", left: "48%", duration: 27, delay: 3, rotate: -12 },
  { src: floatSponge, size: 70, top: "75%", left: "65%", duration: 25, delay: 1, rotate: 14 },
];

const FloatingElements = () => {
  return (
    <>
      {items.map((item, i) => (
        <img
          key={i}
          src={item.src}
          alt=""
          aria-hidden="true"
          className="absolute pointer-events-none select-none"
          style={{
            width: item.size,
            height: item.size,
            objectFit: "contain",
            top: item.top,
            left: (item as any).left,
            right: (item as any).right,
            opacity: 0.18,
            filter: "blur(0.5px)",
            transform: `rotate(${item.rotate}deg)`,
            animation: `float-drift-${i % 5} ${item.duration}s ease-in-out ${item.delay}s infinite`,
          }}
        />
      ))}

      <style>{`
        @keyframes float-drift-0 {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(15px, -22px) rotate(4deg); }
          50% { transform: translate(-10px, -35px) rotate(-3deg); }
          75% { transform: translate(18px, -14px) rotate(5deg); }
        }
        @keyframes float-drift-1 {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-18px, 14px) rotate(-4deg); }
          50% { transform: translate(12px, 28px) rotate(3deg); }
          75% { transform: translate(-22px, 10px) rotate(-5deg); }
        }
        @keyframes float-drift-2 {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(22px, -18px) rotate(6deg); }
          66% { transform: translate(-15px, 24px) rotate(-4deg); }
        }
        @keyframes float-drift-3 {
          0%, 100% { transform: translate(0, 0); }
          20% { transform: translate(-12px, -24px) rotate(-3deg); }
          40% { transform: translate(18px, -12px) rotate(4deg); }
          60% { transform: translate(-8px, 18px) rotate(-5deg); }
          80% { transform: translate(14px, 8px) rotate(3deg); }
        }
        @keyframes float-drift-4 {
          0%, 100% { transform: translate(0, 0); }
          30% { transform: translate(10px, 20px) rotate(3deg); }
          60% { transform: translate(-16px, -10px) rotate(-4deg); }
        }
      `}</style>
    </>
  );
};

export default FloatingElements;
