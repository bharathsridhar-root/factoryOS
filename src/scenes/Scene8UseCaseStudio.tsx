import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '../components/SectionHeader';
import { useCases } from '../content';
import type { UseCase } from '../types';

const complexityColors = { Low: '#12B3A8', Medium: '#F5A623', High: '#D64545' };
const maturityColors = {
  Fragmented: '#D64545', Visible: '#F5A623',
  Contextual: '#00A3E0', Intelligent: '#005EB8', Autonomous: '#12B3A8',
};

function UseCaseFlow({ uc }: { uc: UseCase }) {
  const [activePhase, setActivePhase] = useState<string | null>(null);

  const phases = [
    { id: 'inputs', label: 'Sensor / Input', items: uc.inputs, color: '#003B73', icon: '📡' },
    { id: 'edge', label: 'Edge Processing', items: uc.edgeProcessing, color: '#005EB8', icon: '🖥' },
    { id: 'cloud', label: 'Cloud Analytics', items: uc.cloudAnalytics, color: '#00A3E0', icon: '☁' },
    { id: 'decision', label: 'Decision Logic', items: uc.decisionLogic, color: '#12B3A8', icon: '🧠' },
    { id: 'outcomes', label: 'Action / Outcome', items: uc.outcomes, color: '#F5A623', icon: '⚡' },
  ];

  return (
    <div>
      <div className="flex items-stretch gap-1.5 mb-4 overflow-x-auto pb-1">
        {phases.map((phase, i) => (
          <div key={phase.id} className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => setActivePhase(activePhase === phase.id ? null : phase.id)}
              className="flex flex-col items-center justify-center p-3 rounded-xl text-center transition-all"
              style={{
                background: activePhase === phase.id ? `${phase.color}15` : 'rgba(234,244,255,0.5)',
                border: `1px solid ${activePhase === phase.id ? phase.color + '40' : 'rgba(0,94,184,0.1)'}`,
                minWidth: 90,
              }}
            >
              <span className="text-xl mb-1">{phase.icon}</span>
              <span className="text-[10px] font-semibold" style={{ color: phase.color }}>{phase.label}</span>
            </button>
            {i < phases.length - 1 && (
              <span className="text-[#005EB8] opacity-30 text-sm shrink-0">→</span>
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activePhase && (
          <motion.div
            key={activePhase}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex flex-wrap gap-2 mb-4"
          >
            {phases.find(p => p.id === activePhase)?.items.map(item => (
              <span
                key={item}
                className="text-xs px-3 py-1.5 rounded-full font-medium"
                style={{
                  background: `${phases.find(p => p.id === activePhase)?.color}12`,
                  color: phases.find(p => p.id === activePhase)?.color,
                  border: `1px solid ${phases.find(p => p.id === activePhase)?.color}25`,
                }}
              >
                {item}
              </span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Scene8UseCaseStudio() {
  const [selectedUseCase, setSelectedUseCase] = useState<UseCase>(useCases[0]);

  return (
    <section id="scene8" className="relative py-32 overflow-hidden" style={{ background: 'linear-gradient(180deg, #F7FAFC 0%, #EAF4FF 100%)' }}>
      <div className="absolute inset-0 grid-lines opacity-20 pointer-events-none" />

      <div className="max-w-screen-xl mx-auto px-6">
        <SectionHeader
          scene={8}
          tag="Use Case Transformation Studio"
          title="Interactive use-case simulation and ROI analysis."
          subtitle="Every transformation use case deconstructed — from sensor signal to business outcome. Explore complexity, ROI, and deployment feasibility for each."
          accent="#005EB8"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Use case selector */}
          <div>
            <h3 className="text-sm font-bold text-[#6B7E9E] uppercase tracking-wide mb-4">Select Use Case</h3>
            <div className="space-y-2">
              {useCases.map((uc) => (
                <motion.button
                  key={uc.id}
                  onClick={() => setSelectedUseCase(uc)}
                  className="w-full text-left p-4 rounded-xl transition-all"
                  style={{
                    background: selectedUseCase.id === uc.id ? 'rgba(0,94,184,0.08)' : 'white',
                    border: selectedUseCase.id === uc.id ? '1px solid rgba(0,94,184,0.25)' : '1px solid rgba(0,94,184,0.08)',
                  }}
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-[#003B73] leading-tight">{uc.title}</span>
                    <span
                      className="text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0"
                      style={{
                        background: `${complexityColors[uc.complexity]}15`,
                        color: complexityColors[uc.complexity],
                      }}
                    >
                      {uc.complexity}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span
                      className="text-[10px] px-1.5 py-0.5 rounded-full"
                      style={{
                        background: `${maturityColors[uc.maturityRequired]}12`,
                        color: maturityColors[uc.maturityRequired],
                      }}
                    >
                      {uc.maturityRequired}
                    </span>
                    <span className="text-[10px] text-[#9CA3AF]">{uc.industries.slice(0, 2).join(', ')}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Use case detail */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedUseCase.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="glass rounded-2xl p-6 mb-5">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-[#003B73] mb-1">{selectedUseCase.title}</h3>
                      <p className="text-sm text-[#4A6B8A]">{selectedUseCase.description}</p>
                    </div>
                    <div className="text-right shrink-0 ml-4">
                      <div className="text-xs text-[#6B7E9E] mb-0.5">Estimated ROI</div>
                      <div className="text-sm font-bold text-[#12B3A8]">{selectedUseCase.roi}</div>
                    </div>
                  </div>

                  {/* Flow visualization */}
                  <UseCaseFlow uc={selectedUseCase} />

                  {/* Meta info */}
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    <div className="bg-[#EAF4FF] rounded-xl p-3 text-center">
                      <div className="text-xs text-[#6B7E9E] mb-1">Complexity</div>
                      <div className="font-bold text-sm" style={{ color: complexityColors[selectedUseCase.complexity] }}>
                        {selectedUseCase.complexity}
                      </div>
                    </div>
                    <div className="bg-[#EAF4FF] rounded-xl p-3 text-center">
                      <div className="text-xs text-[#6B7E9E] mb-1">OT Maturity</div>
                      <div className="font-bold text-sm" style={{ color: maturityColors[selectedUseCase.maturityRequired] }}>
                        {selectedUseCase.maturityRequired}
                      </div>
                    </div>
                    <div className="bg-[#EAF4FF] rounded-xl p-3 text-center">
                      <div className="text-xs text-[#6B7E9E] mb-1">Industries</div>
                      <div className="font-bold text-sm text-[#003B73]">{selectedUseCase.industries.length}+</div>
                    </div>
                  </div>
                </div>

                {/* Industries */}
                <div className="glass rounded-2xl p-5">
                  <h4 className="text-sm font-bold text-[#003B73] mb-3">Industry Applicability</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedUseCase.industries.map(industry => (
                      <span
                        key={industry}
                        className="text-xs px-3 py-1.5 rounded-full font-medium bg-white border border-[rgba(0,94,184,0.15)] text-[#4A6B8A]"
                      >
                        {industry}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 p-4 rounded-xl" style={{ background: 'rgba(0,94,184,0.06)' }}>
                    <div className="text-xs font-bold text-[#005EB8] mb-1">Deployment Prerequisite</div>
                    <div className="text-xs text-[#4A6B8A]">
                      This use case requires <span className="font-semibold" style={{ color: maturityColors[selectedUseCase.maturityRequired] }}>{selectedUseCase.maturityRequired}</span> OT maturity level.
                      Ensure OT asset visibility, segmentation governance, and telemetry normalization are in place before deployment.
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ROI summary strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-4"
        >
          {useCases.slice(0, 5).map((uc) => (
            <button
              key={uc.id}
              onClick={() => setSelectedUseCase(uc)}
              className="glass rounded-2xl p-4 text-center card-lift"
            >
              <div className="text-xs font-semibold text-[#003B73] mb-1 line-clamp-2 leading-tight">{uc.title}</div>
              <div className="text-[11px] font-bold text-[#12B3A8]">{uc.roi.split(' ')[0]} {uc.roi.split(' ')[1]}</div>
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
