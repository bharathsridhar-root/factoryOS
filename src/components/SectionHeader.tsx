import { motion } from 'framer-motion';

interface Props {
  scene: number;
  tag: string;
  title: string;
  subtitle: string;
  accent?: string;
}

export function SectionHeader({ scene, tag, title, subtitle, accent = '#005EB8' }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="text-center max-w-3xl mx-auto mb-16"
    >
      <div className="flex items-center justify-center gap-3 mb-5">
        <div className="h-px flex-1 max-w-16" style={{ background: `linear-gradient(90deg, transparent, ${accent})` }} />
        <span
          className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
          style={{ color: accent, background: `${accent}18`, border: `1px solid ${accent}30` }}
        >
          Section {scene} · {tag}
        </span>
        <div className="h-px flex-1 max-w-16" style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />
      </div>
      <h2
        className="text-4xl md:text-5xl font-bold mb-5 leading-tight"
        style={{ color: '#003B73' }}
      >
        {title}
      </h2>
      <p className="text-lg text-[#4A6B8A] leading-relaxed">{subtitle}</p>
    </motion.div>
  );
}
