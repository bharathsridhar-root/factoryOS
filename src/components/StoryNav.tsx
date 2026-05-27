import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { storyScenes } from '../content';

export function StoryNav() {
  const [activeScene, setActiveScene] = useState('hero');
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const sectionIds = storyScenes.map(s => s.id);

    const findActive = () => {
      const mid = window.innerHeight / 2 + 56; // offset for control bar
      let best = sectionIds[0];
      let bestDist = Infinity;

      sectionIds.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        // Use distance from viewport center to section center
        const sectionMid = rect.top + rect.height / 2;
        const dist = Math.abs(sectionMid - mid);
        // Prefer sections whose top edge is above viewport mid (already entered)
        if (rect.top <= mid && dist < bestDist) {
          bestDist = dist;
          best = id;
        }
      });

      setActiveScene(best);
    };

    window.addEventListener('scroll', findActive, { passive: true });
    findActive();
    return () => window.removeEventListener('scroll', findActive);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const activeIndex = storyScenes.findIndex(s => s.id === activeScene);

  return (
    <motion.nav
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-start gap-1"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      {/* Story progress line */}
      <div className="absolute left-[7px] top-0 bottom-0 w-px" style={{ background: 'rgba(0,94,184,0.12)' }}>
        <motion.div
          className="absolute top-0 left-0 w-full rounded-full"
          style={{ background: 'linear-gradient(180deg, #005EB8, #00A3E0)' }}
          animate={{ height: `${(activeIndex / (storyScenes.length - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {storyScenes.map((scene, i) => {
        const isActive = activeScene === scene.id;
        const isPast = i < activeIndex;

        return (
          <button
            key={scene.id}
            onClick={() => scrollTo(scene.id)}
            className="relative flex items-center gap-3 py-1 group"
            title={scene.label}
          >
            {/* Dot */}
            <motion.div
              className="relative z-10 rounded-full border-2 border-white shrink-0 transition-all duration-300"
              style={{
                width: isActive ? 16 : 10,
                height: isActive ? 16 : 10,
                background: isActive ? '#005EB8' : isPast ? '#00A3E0' : 'rgba(0,94,184,0.2)',
                boxShadow: isActive ? '0 0 12px rgba(0,94,184,0.5)' : 'none',
              }}
              animate={isActive ? { scale: [1, 1.1, 1] } : { scale: 1 }}
              transition={{ duration: 1.5, repeat: isActive ? Infinity : 0 }}
            />

            {/* Label */}
            <AnimatePresence>
              {(expanded || isActive) && (
                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.2 }}
                  className="glass rounded-lg px-3 py-1.5 min-w-[130px]"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{scene.icon}</span>
                    <div>
                      <div
                        className="text-xs font-semibold leading-none"
                        style={{ color: isActive ? '#005EB8' : isPast ? '#4A6B8A' : '#9CA3AF' }}
                      >
                        {expanded ? scene.label : scene.short}
                      </div>
                      {isActive && !expanded && (
                        <div className="text-[10px] text-[#9CA3AF] mt-0.5">← You are here</div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        );
      })}
    </motion.nav>
  );
}
