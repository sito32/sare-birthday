import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Star, Camera, ArrowRight, ShieldAlert, Image as ImageIcon } from 'lucide-react';

const Butterfly = ({ color, size, delay, startX, startY, duration }: any) => {
  return (
    <motion.div
      initial={{ left: startX, top: startY, opacity: 0 }}
      animate={{
        left: `calc(${startX} + ${Math.random() * 40 - 20}vw)`,
        top: `-10vh`,
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "linear"
      }}
      className={`fixed pointer-events-none z-40 ${color}`}
      style={{ width: size, height: size }}
    >
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 15, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="w-full h-full flex justify-center items-center drop-shadow-[0_0_15px_currentColor]"
        style={{ perspective: '1000px' }}
      >
        {/* Left Wing */}
        <motion.svg 
          animate={{ rotateY: [0, 70, 0] }} 
          transition={{ duration: 0.15 + Math.random() * 0.1, repeat: Infinity, ease: "easeInOut" }} 
          style={{ transformOrigin: 'right center' }} 
          viewBox="0 0 32 64" 
          className="w-1/2 h-full opacity-90"
        >
          <path d="M32,32 C15,5 0,15 5,32 C0,49 15,59 32,32 Z" fill="currentColor" />
          <path d="M32,32 C20,15 10,20 12,32 C10,44 20,49 32,32 Z" fill="#ffffff" opacity="0.4" />
        </motion.svg>
        {/* Right Wing */}
        <motion.svg 
          animate={{ rotateY: [0, -70, 0] }} 
          transition={{ duration: 0.15 + Math.random() * 0.1, repeat: Infinity, ease: "easeInOut" }} 
          style={{ transformOrigin: 'left center' }} 
          viewBox="0 0 32 64" 
          className="w-1/2 h-full opacity-90"
        >
          <path d="M0,32 C17,5 32,15 27,32 C32,49 17,59 0,32 Z" fill="currentColor" />
          <path d="M0,32 C12,15 22,20 20,32 C22,44 12,49 0,32 Z" fill="#ffffff" opacity="0.4" />
        </motion.svg>
      </motion.div>
    </motion.div>
  );
};

// Fallback Image Component
const ImageWithFallback = ({ src, alt, className, fallbackText }: { src: string, alt: string, className: string, fallbackText: string }) => {
  const [error, setError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [attempts, setAttempts] = useState(0);

  const handleError = () => {
    if (attempts === 0) {
      setCurrentSrc(src.replace('.jpg', '.jpeg'));
      setAttempts(1);
    } else if (attempts === 1) {
      setCurrentSrc(src.replace('.jpg', '.png'));
      setAttempts(2);
    } else if (attempts === 2) {
      setCurrentSrc(src.replace('.jpg', '.JPG'));
      setAttempts(3);
    } else if (attempts === 3) {
      setCurrentSrc(src.replace('.jpg', '.JPEG'));
      setAttempts(4);
    } else if (attempts === 4) {
      setCurrentSrc(src.replace('.jpg', '.webp'));
      setAttempts(5);
    } else if (attempts === 5) {
      setCurrentSrc(src.replace('.jpg', '.heic'));
      setAttempts(6);
    } else if (attempts === 6 && src.includes('flowers')) {
      // Just in case it was named "flower" instead of "flowers"
      setCurrentSrc(src.replace('flowers.jpg', 'flower.jpg'));
      setAttempts(7);
    } else if (attempts === 7 || (attempts === 6 && !src.includes('flowers'))) {
      if (src.includes('sara-')) {
        setCurrentSrc(src.replace('sara-', 'sare-'));
        setAttempts(8);
      } else {
        setError(true);
      }
    } else {
      setError(true);
    }
  };

  if (error) {
    return (
      <div className={`flex flex-col items-center justify-center bg-[#1a0b2e]/80 border border-[#ff00a0]/30 text-center p-4 ${className}`}>
        <ImageIcon className="w-8 h-8 text-[#00f0ff] mb-2 opacity-50" />
        <p className="text-[#ff00a0] font-mono text-xs mb-1">Missing Image</p>
        <p className="text-white/60 text-xs">{fallbackText}</p>
      </div>
    );
  }

  return (
    <img 
      src={currentSrc} 
      alt={alt} 
      className={className}
      onError={handleError}
    />
  );
};

export default function App() {
  const [accessGranted, setAccessGranted] = useState(false);
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.toLowerCase().includes('born') || answer.toLowerCase().includes('birth') || answer.toLowerCase().includes('me') || answer.toLowerCase().includes('i was') || answer.length > 2) {
      setAccessGranted(true);
      triggerConfetti();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  const triggerConfetti = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#ff003c', '#ff00a0', '#b200ff', '#00f0ff', '#00ffb2']
      });
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#ff003c', '#ff00a0', '#b200ff', '#00f0ff', '#00ffb2']
      });
    }, 250);
  };

  const colors = ['text-[#ff003c]', 'text-[#ff00a0]', 'text-[#b200ff]', 'text-[#00f0ff]', 'text-[#00ffb2]'];
  const butterflies = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    color: colors[Math.floor(Math.random() * colors.length)],
    size: Math.random() * 40 + 20,
    delay: Math.random() * 5,
    startX: `${Math.random() * 100}vw`,
    startY: `120vh`,
    duration: Math.random() * 10 + 10
  }));

  const points = [
    { title: "Effortless Grace", desc: "You move through life with an elegance that turns ordinary moments into something cinematic." },
    { title: "Radiant Kindness", desc: "The depth of your compassion shines through your eyes, making everyone feel seen and cherished." },
    { title: "Impeccable Style", desc: "Your sense of fashion and poise is breathtaking, leaving a lasting impression wherever you go." },
    { title: "Luminous Smile", desc: "A single smile from you has the power to instantly brighten the darkest of days." },
    { title: "Gentle Soul", desc: "Your beautiful spirit brings peace and joy to everyone lucky enough to know you." },
    { title: "Quiet Confidence", desc: "You carry yourself with a captivating aura of strength, dignity, and grace." },
    { title: "Breathtaking Beauty", desc: "Your stunning outward beauty is only outshined by the incredible heart you hold within." }
  ];

  const gallery = [
    { id: 1, span: "col-span-2 row-span-2", src: "/sara-purple-dress.jpg", alt: "Sara in purple dress", fallback: "Add sara-purple-dress.jpg to public folder" },
    { id: 2, span: "col-span-1 row-span-1", src: "/sara-blue-floral.jpg", alt: "Sara in blue floral dress", fallback: "Add sara-blue-floral.jpg to public folder" },
    { id: 3, span: "col-span-1 row-span-2", src: "/sara-dark-blue-night.jpg", alt: "Sara in dark blue dress at night", fallback: "Add sara-dark-blue-night.jpg to public folder" },
    { id: 4, span: "col-span-1 row-span-1", src: "/sara-light-blue-close.jpg", alt: "Sara close up in light blue", fallback: "Add sara-light-blue-close.jpg to public folder" },
    { id: 5, span: "col-span-2 row-span-1", src: "/sara-blue-dupatta-wind.jpg", alt: "Sara with blue dupatta in wind", fallback: "Add sara-blue-dupatta-wind.jpg to public folder" },
    { id: 6, span: "col-span-1 row-span-1", src: "/sara-dark-blue-pink-flowers.jpg", alt: "Sara with pink flowers", fallback: "Add sara-dark-blue-pink-flowers.jpg to public folder" },
    { id: 7, span: "col-span-1 row-span-1", src: "/sara-green-dress-selfie.jpg", alt: "Sara in green dress selfie", fallback: "Add sara-green-dress-selfie.jpg to public folder" },
  ];

  return (
    <div className="relative min-h-screen font-sans overflow-x-hidden selection:bg-[#ff00a0]/30 selection:text-[#00f0ff]">
      
      <AnimatePresence mode="wait">
        {!accessGranted && (
          <motion.div 
            key="auth"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050014]/80 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="w-full max-w-lg glass-popup p-8 md:p-12 rounded-3xl relative overflow-hidden"
            >
              <div className="flex items-center gap-4 mb-8">
                <ShieldAlert className="w-8 h-8 text-[#00f0ff]" />
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">SECURITY OVERRIDE</h3>
                  <p className="text-xs font-mono text-[#ff00a0] tracking-widest">AWAITING INPUT</p>
                </div>
              </div>

              <p className="text-lg md:text-xl text-white mb-8 font-light leading-relaxed">
                What happened on <span className="text-[#00ffb2] font-medium">March 7, 2004?</span>
              </p>

              <form onSubmit={handleUnlock} className="relative">
                <input 
                  type="text" 
                  autoFocus
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Enter decryption key..."
                  className={`w-full bg-transparent border-b-2 ${error ? 'border-[#ff003c] text-[#ff003c]' : 'border-[#b200ff] text-[#00f0ff]'} pb-4 text-xl md:text-2xl font-mono placeholder:text-white/30 focus:outline-none focus:border-[#00f0ff] transition-colors`}
                />
                <button 
                  type="submit"
                  className="absolute right-0 bottom-4 text-[#ff00a0] hover:text-[#00f0ff] transition-colors"
                >
                  <ArrowRight className="w-6 h-6" />
                </button>
              </form>
              
              {error && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-4 left-8 md:left-12 text-[#ff003c] text-xs font-mono"
                >
                  INVALID KEY. RETRY.
                </motion.p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Butterflies */}
      {accessGranted && butterflies.map(b => (
        <Butterfly key={b.id} {...b} />
      ))}

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 px-6">
        {accessGranted && (
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 w-full max-w-6xl mx-auto z-30">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex-1 text-center md:text-left"
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#1a0b2e]/60 text-[#00f0ff] font-semibold tracking-widest uppercase mb-6 shadow-sm border border-[#00f0ff]/30"
              >
                <Sparkles className="w-4 h-4 text-[#ff00a0]" /> A Magical Day
              </motion.div>
              
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#ff00a0] via-[#b200ff] to-[#00f0ff] drop-shadow-[0_0_20px_rgba(255,0,160,0.3)] pb-4 leading-tight">
                Happy Birthday<br/>Sara!
              </h1>
              
              <p className="text-xl md:text-2xl text-white/80 font-light max-w-xl mx-auto md:mx-0 leading-relaxed">
                Wishing the most beautiful, vibrant, and wonderful person an equally magical birthday. 🦋✨
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30, rotate: 5 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex-1 relative w-full max-w-md"
            >
              <div className="aspect-[4/5] w-full rounded-[2rem] overflow-hidden glass-card p-3 shadow-[0_0_40px_rgba(178,0,255,0.3)] border border-[#00f0ff]/30">
                <ImageWithFallback 
                  src="/sara-hero.jpg" 
                  alt="Sara" 
                  className="w-full h-full object-cover rounded-[1.5rem]" 
                  fallbackText="Add sara-hero.jpg to public folder"
                />
              </div>
              <motion.div 
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -right-6 glass-card p-4 rounded-full border border-[#ff00a0]/50 shadow-[0_0_20px_rgba(255,0,160,0.4)]"
              >
                <Heart className="w-8 h-8 text-[#ff00a0] fill-[#ff00a0]" />
              </motion.div>
            </motion.div>
          </div>
        )}
      </section>

      {/* 7 Points of Grace Section */}
      {accessGranted && (
        <section className="py-24 relative z-20">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00ffb2] to-[#00f0ff] mb-6 pb-2 drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                7 Things We Adore About You
              </h2>
              <p className="text-lg text-white/60 max-w-2xl mx-auto">
                A celebration of your grace, your beauty, and the incredible light you bring into the world.
              </p>
            </div>

            <div className="flex flex-col gap-12 md:gap-16">
              {points.map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className={`flex flex-row items-center gap-4 md:gap-12 ${i % 2 === 0 ? '' : 'flex-row-reverse'}`}
                >
                  <div className="text-6xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-transparent select-none shrink-0">
                    0{i + 1}
                  </div>
                  <div className={`glass-card p-6 md:p-10 rounded-3xl flex-1 border-l-4 ${i % 2 === 0 ? 'border-[#ff00a0]' : 'border-[#00f0ff]'} relative overflow-hidden group hover:shadow-[0_0_30px_rgba(178,0,255,0.3)] transition-all duration-500`}>
                    <div className="absolute top-0 right-0 p-4 md:p-6 opacity-10 group-hover:opacity-30 transition-opacity duration-500">
                      <Sparkles className={`w-8 h-8 md:w-12 md:h-12 ${i % 2 === 0 ? 'text-[#ff00a0]' : 'text-[#00f0ff]'}`} />
                    </div>
                    <h3 className="text-xl md:text-3xl font-serif font-bold text-white mb-2 md:mb-4">{point.title}</h3>
                    <p className="text-white/80 font-light text-sm md:text-xl leading-relaxed">
                      {point.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {accessGranted && (
        <section className="py-24 relative z-20">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
              <div>
                <h2 className="text-4xl md:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff003c] to-[#ff00a0] mb-4 text-center md:text-left pb-2 drop-shadow-[0_0_15px_rgba(255,0,160,0.3)]">
                  Gallery of Grace
                </h2>
                <p className="text-lg text-white/60 text-center md:text-left">
                  Capturing the beauty and elegance of Sara.
                </p>
              </div>
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#1a0b2e] shadow-[0_0_20px_rgba(255,0,160,0.3)] text-[#ff00a0] border border-[#ff00a0]/30">
                <Camera className="w-8 h-8" />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[150px] md:auto-rows-[250px]">
              {gallery.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`${item.span} rounded-3xl overflow-hidden relative group glass-card p-2 border border-white/10`}
                >
                  <ImageWithFallback 
                    src={item.src} 
                    alt={item.alt} 
                    className="w-full h-full object-cover rounded-[1.5rem] transition-transform duration-700 group-hover:scale-110"
                    fallbackText={item.fallback}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050014]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[1.5rem] flex items-end p-6 pointer-events-none">
                    <p className="text-white font-serif text-xl">Beautiful Memory {item.id}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      {accessGranted && (
        <footer className="py-12 text-center relative z-20">
          <p className="text-white/40 font-medium flex items-center justify-center gap-2">
            <Star className="w-4 h-4 text-[#ff00a0]" /> 
            Made with love for Sara 
            <Star className="w-4 h-4 text-[#ff00a0]" />
          </p>
        </footer>
      )}
    </div>
  );
}

