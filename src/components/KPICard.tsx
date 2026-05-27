import { motion } from 'framer-motion';
import type { KPI } from '../types';

interface Props extends KPI {
  delay?: number;
}

export function KPICard({ label, value, unit, trend, delta, delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="glass rounded-2xl p-5 card-lift"
    >
      <div className="text-xs font-medium text-[#6B7E9E] mb-2 uppercase tracking-wide">{label}</div>
      <div className="flex items-end gap-2">
        <span className="text-3xl font-bold text-[#003B73]">{value}</span>
        {unit && <span className="text-sm text-[#6B7E9E] mb-1">{unit}</span>}
      </div>
      {delta && (
        <div className={`flex items-center gap-1 mt-2 text-xs font-semibold ${
          trend === 'up' ? 'text-[#12B3A8]' : trend === 'down' ? 'text-[#12B3A8]' : 'text-[#F5A623]'
        }`}>
          <span>{trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}</span>
          <span>{delta} vs. baseline</span>
        </div>
      )}
    </motion.div>
  );
}
