/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Play, RotateCcw, Heart, Pause, SkipForward, SkipBack } from 'lucide-react';

const PLAYLIST = [
  {
    title: "Ordinary - Alex Warren",
    url: "https://www.dropbox.com/scl/fi/oueetus8tmdq99ho2ye5w/Alex-Warren-Ordinary-Official-Video.mp3?rlkey=pd8c6x1a41n9y04qph8ny47k9&st=xhnktyom&raw=1"
  },
  {
    title: "Morenikeji - Konstant",
    url: "https://www.dropbox.com/scl/fi/w5gmn0mrrst5xao0fm79n/MORENIKEJI.mp3?rlkey=0ckaxetg3w1oi9yehz709e3r8&st=svieaw1t&raw=1"
  },
  {
    title: "Eternity - Alex Warren",
    url: "https://www.dropbox.com/scl/fi/rimo8qkkgslmugboq0eil/Eternity.mp3?rlkey=bxkr16a3uwu67q02vnsbp00cg&st=h0i5p3fs&raw=1"
  },
  {
    title: "Baby Jowo - RMD",
    url: "https://www.dropbox.com/scl/fi/zt9l3jfencznio0rkg73j/Baby-Jowo.mp3?rlkey=jfm3s9pudzto8sy1wnkensjop&st=1f1qoty6&raw=1"
  },
  {
    title: "SuperFuji GOBE - oSHAMO",
    url: "https://www.dropbox.com/scl/fi/66rr1iayp6u3qnsyvykaf/oSHAMO-SuperFuji-GOBE.mp3?rlkey=6bf9no0r7tslvagdtkd29zsrc&st=hbhh5wzh&raw=1"
  }
];

const MESSAGES = [
  "Happy Anniversary To Us, Moh ❤️",
  "Since 2019… our story began.",
  "7 years together… through every high and every low.",
  "84 months of chasing the same dawn.",
  "Through the storms and the silences.",
  "Even when we drifted, my heart never moved.",
  "We found our way back, time and time again.",
  "Because at the end of every road, it was always you.",
  "We grew, we parted, we healed, we returned.",
  "Seven years of resilient, untameable love.",
  "We grew together, fought together, laughed together, healed together.",
  "You're the melody in my favorite song.",
  "In a sea of people, my eyes will always search for you.",
  "You are still my safest place.",
  "Every moment with you became part of my favorite memories.",
  "I still choose you. Again and again.",
  "I love you more than words can explain.",
  "Thank you for staying.",
  "Thank you for loving me.",
  "I look forward to doing life with you forever.",
  "No matter what life brings, I want us.",
  "You are my home.",
  "Forever starts every day with you."
];

const Flower = ({ className, delay = 0 }: { className?: string, delay?: number }) => (
  <div className={`flower ${className}`}>
    <div className="flower__leafs">
      <div className="flower__leaf flower__leaf--1" style={{ animationDelay: `${delay + 1.1}s` }}></div>
      <div className="flower__leaf flower__leaf--2" style={{ animationDelay: `${delay + 1.4}s` }}></div>
      <div className="flower__leaf flower__leaf--3" style={{ animationDelay: `${delay + 1.7}s` }}></div>
      <div className="flower__leaf flower__leaf--4" style={{ animationDelay: `${delay + 2}s` }}></div>
      <div className="flower__white-circle"></div>
      {[...Array(8)].map((_, i) => (
        <div key={i} className={`flower__light flower__light--${i + 1}`} style={{ animationDelay: `${delay + i * 0.5}s` }}></div>
      ))}
    </div>
    <div className="flower__line" style={{ animationDelay: `${delay}s` }}></div>
  </div>
);

const PetalRain = () => {
  const petals = useMemo(() => [...Array(20)].map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: Math.random() * 10 + 10,
    delay: Math.random() * 5,
    duration: Math.random() * 5 + 5,
    rotation: Math.random() * 360,
  })), []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {petals.map(p => (
        <motion.div
          key={p.id}
          initial={{ y: -20, x: `${p.x}vw`, opacity: 0, rotate: p.rotation }}
          animate={{
            y: '110vh',
            x: [`${p.x}vw`, `${p.x + (Math.random() * 20 - 10)}vw`],
            opacity: [0, 0.6, 0.6, 0],
            rotate: p.rotation + 360,
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear"
          }}
          className="rose-petal"
          style={{
            width: p.size,
            height: p.size * 1.2,
            backgroundColor: '#8B0000',
            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
            filter: 'blur(0.5px)',
            boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)',
          }}
        />
      ))}
    </div>
  );
};

const Particles = () => {
  const particles = useMemo(() => [...Array(40)].map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
  })), []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="particle"
          initial={{ opacity: 0, y: 0 }}
          animate={{
            opacity: [0, 0.4, 0],
            y: [-20, -200],
            x: [0, (Math.random() - 0.5) * 50]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear"
          }}
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            filter: 'blur(1px)',
            backgroundColor: 'var(--rose-gold)',
          }}
        />
      ))}
    </div>
  );
};

export default function App() {
  const [scene, setScene] = useState<'idle' | 'opening' | 'playing' | 'closing' | 'credits' | 'ended'>('idle');
  const [currentMessageIndex, setCurrentMessageIndex] = useState(-1);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showTrackInfo, setShowTrackInfo] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!audioRef.current) return;

    const handlePlayback = async () => {
      if ((scene !== 'idle' && !isPaused) || isPreviewing) {
        try {
          // Ensure we don't call play() if the source is still empty
          if (audioRef.current?.src) {
            await audioRef.current.play();
          }
        } catch (e: any) {
          if (e.name !== 'AbortError') {
            console.warn("Audio playback failed", e);
          }
        }
        
        if (scene !== 'idle') {
          setShowTrackInfo(true);
          const timer = setTimeout(() => setShowTrackInfo(false), 3000);
          return () => clearTimeout(timer);
        }
      } else {
        audioRef.current.pause();
      }
    };

    handlePlayback();
  }, [currentTrackIndex, scene, isPreviewing, isPaused]);

  useEffect(() => {
    if (scene === 'playing' && !isPaused) {
      const interval = setInterval(() => {
        setCurrentMessageIndex(prev => {
          if (prev >= MESSAGES.length - 1) {
            clearInterval(interval);
            setTimeout(() => setScene('closing'), 4000);
            return prev;
          }
          return prev + 1;
        });
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [scene, isPaused]);

  useEffect(() => {
    if (scene === 'closing') {
      setTimeout(() => setScene('credits'), 4000);
    }
  }, [scene]);

  const nextTrack = () => {
    setCurrentTrackIndex(prev => (prev + 1) % PLAYLIST.length);
  };

  const prevTrack = () => {
    setCurrentTrackIndex(prev => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
  };

  const togglePreview = (index: number) => {
    if (currentTrackIndex === index) {
      setIsPreviewing(!isPreviewing);
    } else {
      setCurrentTrackIndex(index);
      setIsPreviewing(true);
    }
  };

  const startExperience = () => {
    setIsPreviewing(false);
    setIsPaused(false);
    setScene('opening');
    setTimeout(() => setScene('playing'), 4000);
    setTimeout(() => setCurrentMessageIndex(0), 5000);
  };

  const resetExperience = () => {
    setScene('idle');
    setCurrentMessageIndex(-1);
    setIsPreviewing(false);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden select-none">
      {/* Background Audio */}
      <audio
        ref={audioRef}
        loop
        src={PLAYLIST[currentTrackIndex].url}
        onError={(e) => console.warn("Audio failed to load:", e)}
      />

      <AnimatePresence>
        {scene === 'idle' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[2000] flex flex-col items-center justify-center bg-black px-6"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="text-rose-900/20 mb-8"
            >
              <Heart size={80} fill="currentColor" />
            </motion.div>
            
            <div className="text-center mb-8">
              <h1 className="font-serif text-[var(--rose-gold)] text-2xl tracking-[0.3em] uppercase mb-2">Our Story</h1>
              <p className="font-serif italic text-white/40 text-sm">Since 2019</p>
            </div>

            <div className="w-full max-w-md mb-10">
              <p className="text-[var(--rose-gold)]/40 text-[10px] uppercase tracking-[0.2em] mb-4 text-center">Select your background music</p>
              <div className="flex flex-col gap-2">
                {PLAYLIST.map((track, index) => (
                  <button
                    key={index}
                    onClick={() => togglePreview(index)}
                    className={`flex items-center justify-between px-4 py-3 rounded-lg border transition-all duration-300 ${
                      currentTrackIndex === index 
                        ? 'border-[var(--rose-gold)] bg-[var(--rose-gold)]/10 text-[var(--rose-gold)]' 
                        : 'border-white/5 bg-white/5 text-white/40 hover:bg-white/10'
                    }`}
                  >
                    <span className="text-xs uppercase tracking-widest truncate mr-4">{track.title}</span>
                    {currentTrackIndex === index && isPreviewing ? (
                      <Pause size={14} fill="currentColor" />
                    ) : (
                      <Play size={14} fill="currentColor" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={startExperience}
              className="px-10 py-3 border border-[var(--rose-gold)] bg-[var(--rose-gold)] text-black rounded-full font-serif text-sm tracking-[0.2em] uppercase hover:scale-105 active:scale-95 transition-all duration-500 mb-4"
            >
              Begin Journey
            </button>
            <p className="text-white/20 text-[9px] uppercase tracking-widest italic">Best experienced with sound</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Experience Layer */}
      <div className="absolute inset-0">
        <div className="night" />
        
        <PetalRain />
        <Particles />

        {/* Stage Lighting */}
        <motion.div 
          animate={{ opacity: scene === 'playing' ? 1 : 0 }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,200,0.1)_0%,transparent_70%)] pointer-events-none z-10"
        />

        <div className="flowers opacity-20">
          <Flower className="flower--1 left-[5%] bottom-[-10vmin]" delay={0} />
          <Flower className="flower--2 right-[5%] bottom-[-5vmin]" delay={1} />
          <Flower className="flower--3 left-[20%] bottom-[-15vmin]" delay={2} />
          <Flower className="flower--1 right-[25%] bottom-[-12vmin]" delay={1.5} />
          <Flower className="flower--2 left-[40%] bottom-[-8vmin]" delay={0.5} />
          <Flower className="flower--3 right-[45%] bottom-[-18vmin]" delay={2.5} />
          
          {/* New background flowers */}
          <Flower className="flower--1 left-[15%] bottom-[-20vmin] scale-75" delay={3} />
          <Flower className="flower--2 right-[35%] bottom-[-22vmin] scale-50" delay={1.2} />
          <Flower className="flower--3 left-[60%] bottom-[-25vmin] scale-90" delay={0.8} />
          <Flower className="flower--1 right-[15%] bottom-[-18vmin] scale-110" delay={2.2} />
          <Flower className="flower--2 left-[75%] bottom-[-15vmin] scale-60" delay={1.7} />
          
          <div className="grass" />
        </div>

        {/* Ambient Lights/Glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-900/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-[100px]" />
        </div>

        {/* Messaging Logic */}
        <div className="absolute inset-0 flex items-center justify-center z-50 text-center px-6">
          <AnimatePresence mode="wait">
            {scene === 'playing' && currentMessageIndex >= 0 && (
              <motion.div
                key={currentMessageIndex}
                initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="max-w-3xl"
              >
                <div className="credit-role mb-4 text-[var(--rose-gold)]/60">Since 2019</div>
                <h1 className={`text-4xl md:text-5xl lg:text-6xl font-serif leading-tight cinematic-text ${MESSAGES[currentMessageIndex].includes('Moh') ? 'font-cursive text-rose-200 text-6xl md:text-7xl lg:text-8xl' : 'italic'}`}>
                  {MESSAGES[currentMessageIndex]}
                </h1>
                <div className="w-20 h-[1px] bg-[var(--rose-gold)]/50 mx-auto mt-8" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Curtain Layer */}
      <div className="curtain-container">
        <motion.div
          animate={{ x: scene === 'opening' || scene === 'playing' ? '-100%' : '0%' }}
          transition={{ duration: 4, ease: [0.77, 0, 0.175, 1] }}
          className="curtain-part curtain-left"
        >
          {[...Array(10)].map((_, i) => (
            <div key={i} className="curtain-fold" style={{ left: `${i * 10}%` }} />
          ))}
        </motion.div>
        <motion.div
          animate={{ x: scene === 'opening' || scene === 'playing' ? '100%' : '0%' }}
          transition={{ duration: 4, ease: [0.77, 0, 0.175, 1] }}
          className="curtain-part curtain-right"
        >
          {[...Array(10)].map((_, i) => (
            <div key={i} className="curtain-fold" style={{ left: `${i * 10}%` }} />
          ))}
        </motion.div>
      </div>

      {/* Credits Scene */}
      <AnimatePresence>
        {scene === 'credits' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[1500] bg-black"
          >
            <motion.div
              initial={{ y: '100vh' }}
              animate={{ y: '-150vh' }}
              transition={{ duration: 25, ease: "linear" }}
              className="credits-container flex flex-col items-center justify-center min-h-screen"
              onAnimationComplete={() => setScene('ended')}
            >
              <div className="credit-role">Dedicated to</div>
              <div className="credit-name">Mololuwa ❤️</div>
              
              <div className="credit-role">Starring</div>
              <div className="credit-name">Moh & Temi</div>
              
              <div className="credit-role">Directed by</div>
              <div className="credit-name">Temidayo</div>
              
              <div className="credit-role">Assistant Director</div>
              <div className="credit-name">Destiny</div>
              
              <div className="credit-role">Music by</div>
              <div className="credit-name">Our Shared Heartbeat</div>
              
              <div className="mt-20">
                <Heart size={48} className="text-red-600 mx-auto" />
                <div className="font-serif italic text-white/50 mt-4">Happy Anniversary, My Queen.</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Final Scene / Replay */}
      <AnimatePresence>
        {scene === 'ended' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-[2000] flex flex-col items-center justify-center bg-black px-6 text-center"
          >
             <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="text-red-900/20 mb-8"
            >
              <Heart size={80} fill="currentColor" />
            </motion.div>
            <h2 className="font-serif text-lg md:text-2xl mb-8 text-[var(--rose-gold)] uppercase tracking-[0.05em] md:tracking-[0.3em] leading-relaxed max-w-[280px] md:max-w-none mx-auto">
              To many more years...
            </h2>
            <button
              onClick={resetExperience}
              className="px-8 py-2 border border-[var(--rose-gold)] rounded-full text-[var(--rose-gold)] text-xs uppercase tracking-[0.2em] hover:bg-[var(--rose-gold)]/10 transition-all"
            >
              Replay Journey
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Controls */}
      <div className="music-control flex flex-col gap-4 items-end">
        <AnimatePresence>
          {showTrackInfo && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 text-[10px] uppercase tracking-[0.2em] text-[var(--rose-gold)]"
            >
              Playing: {PLAYLIST[currentTrackIndex].title}
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="flex gap-4">
          {scene !== 'idle' && scene !== 'ended' && (
            <>
              <button
                onClick={prevTrack}
                className="w-12 h-12 flex items-center justify-center bg-black/40 border border-white/10 rounded-full text-white/60 hover:bg-white/20 transition-all"
              >
                <SkipBack size={20} />
              </button>
              <button
                onClick={() => {
                  setIsPaused(!isPaused);
                }}
                className="w-12 h-12 flex items-center justify-center bg-black/40 border border-white/10 rounded-full text-white/60 hover:bg-white/20 transition-all"
              >
                {!isPaused ? <Pause size={20} /> : <Play size={20} fill="currentColor" />}
              </button>
              <button
                onClick={nextTrack}
                className="w-12 h-12 flex items-center justify-center bg-black/40 border border-white/10 rounded-full text-white/60 hover:bg-white/20 transition-all"
              >
                <SkipForward size={20} />
              </button>
              <button
                onClick={() => {
                  setIsMuted(!isMuted);
                  if (audioRef.current) audioRef.current.muted = !isMuted;
                }}
                className="w-12 h-12 flex items-center justify-center bg-black/40 border border-white/10 rounded-full text-white/60 hover:bg-white/20 transition-all"
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
