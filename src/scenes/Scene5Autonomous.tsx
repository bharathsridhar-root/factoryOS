import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '../components/SectionHeader';
import { SceneLens } from '../components/SceneLens';
import { autonomousScenarios } from '../content';

function ScenarioTimeline({ steps, color }: { steps: string[]; color: string }) {
  const [activeStep, setActiveStep] = useState(-1);

  const runSimulation = () => {
    setActiveStep(-1);
    let i = 0;
    const run = () => {
      if (i < steps.length) {
        setActiveStep(i);
        i++;
        setTimeout(run, 700);
      }
    };
    setTimeout(run, 200);
  };

  return (
    <div>
      <button
        onClick={runSimulation}
        className="mb-4 text-xs font-semibold px-4 py-2 rounded-lg text-white transition-all hover:opacity-90"
        style={{ background: color, boxShadow: `0 4px 12px ${color}50` }}
      >
        ▶ Run Autonomous Simulation
      </button>
      <div className="space-y-2">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            className="flex items-start gap-3 p-3 rounded-xl"
            style={{
              background: activeStep >= i ? `${color}10` : 'rgba(234,244,255,0.5)',
              border: `1px solid ${activeStep >= i ? color + '30' : 'transparent'}`,
            }}
            animate={{ opacity: activeStep >= i ? 1 : 0.4 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 transition-all"
              style={{
                background: activeStep >= i ? color : 'rgba(0,94,184,0.1)',
                color: activeStep >= i ? 'white' : '#9CA3AF',
              }}
            >
              {activeStep >= i ? '✓' : i + 1}
            </div>
            <span className="text-xs text-[#4A6B8A] leading-relaxed">{step}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const autonomousCapabilities = [
  { label: 'AI-Assisted Operations', icon: '🤖', desc: 'LLM-powered decision support with operational context' },
  { label: 'Autonomous Maintenance', icon: '🔧', desc: 'Zero-touch work order generation and parts staging' },
  { label: 'Event-Driven Orchestration', icon: '🔄', desc: 'Real-time event streams triggering operational workflows' },
  { label: 'Self-Healing OT', icon: '💊', desc: 'Automatic configuration restoration and fault recovery' },
  { label: 'Operational Resilience', icon: '🛡', desc: 'Continuous health monitoring with proactive mitigation' },
  { label: 'Intelligent Workflows', icon: '⚡', desc: 'Context-aware automation that adapts to operational state' },
];

export function Scene5Autonomous() {
  const [activeScenario, setActiveScenario] = useState(0);
  const scenario = autonomousScenarios[activeScenario];

  const severityColors = { warning: '#F5A623', critical: '#D64545' };
  const color = severityColors[scenario.severity as keyof typeof severityColors];

  return (
    <section id="scene5" className="relative py-32 overflow-hidden" style={{ background: '#F7FAFC' }}>
      <div className="absolute inset-0 grid-lines opacity-30 pointer-events-none" />

      <div className="max-w-screen-xl mx-auto px-6">
        <SectionHeader
          scene={5}
          tag="Autonomous Operations"
          title="Self-healing industrial systems."
          subtitle="When visibility, context, and intelligence converge — the factory responds autonomously. No operator intervention required. No delays. No blind spots."
          accent="#12B3A8"
        />

        <SceneLens sceneId={5} />

        {/* Scenario selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {autonomousScenarios.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActiveScenario(i)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all"
              style={{
                background: activeScenario === i ? (s.severity === 'critical' ? '#D64545' : '#F5A623') : 'white',
                borderColor: activeScenario === i ? (s.severity === 'critical' ? '#D64545' : '#F5A623') : 'rgba(0,94,184,0.15)',
                color: activeScenario === i ? 'white' : '#4A6B8A',
              }}
            >
              <span>{s.icon}</span>
              <span>{s.title}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Trigger + simulation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeScenario}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="glass rounded-2xl p-6"
            >
              {/* Trigger alert */}
              <motion.div
                className="flex items-start gap-3 p-4 rounded-xl mb-6"
                style={{ background: `${color}12`, border: `1px solid ${color}30` }}
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-2xl">{scenario.icon}</span>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color }}>
                    Anomaly Detected
                  </div>
                  <div className="text-sm font-semibold text-[#003B73]">{scenario.trigger}</div>
                </div>
              </motion.div>

              <ScenarioTimeline steps={scenario.steps} color={color} />

              {/* Outcome */}
              <motion.div
                className="mt-4 p-4 rounded-xl"
                style={{ background: 'rgba(18,179,168,0.08)', border: '1px solid rgba(18,179,168,0.2)' }}
              >
                <div className="flex items-center gap-2">
                  <span>✅</span>
                  <span className="text-sm font-semibold text-[#12B3A8]">{scenario.outcome}</span>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* System diagram */}
          <div>
            <div className="glass rounded-2xl p-6 mb-6">
              <h3 className="text-sm font-bold text-[#003B73] mb-4">Autonomous Response Architecture</h3>
              <div className="space-y-3">
                {[
                  { label: 'Correlate Topology', icon: '🔗', desc: 'Trace impact through operational graph' },
                  { label: 'Evaluate Impact', icon: '📊', desc: 'Calculate production, quality, and safety risk' },
                  { label: 'Simulate Outcomes', icon: '🧮', desc: 'Digital twin runs failure trajectory models' },
                  { label: 'Trigger Remediation', icon: '⚡', desc: 'Autonomous action or human escalation' },
                  { label: 'Update Twin', icon: '🔄', desc: 'Operational state reflected in real time' },
                  { label: 'Inform Stakeholders', icon: '📣', desc: 'Contextual alerts with recommended actions' },
                ].map((step, i) => (
                  <motion.div
                    key={step.label}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-3 p-3 rounded-xl"
                    style={{ background: 'rgba(234,244,255,0.7)', border: '1px solid rgba(0,94,184,0.08)' }}
                  >
                    <span className="text-xl w-8 text-center">{step.icon}</span>
                    <div>
                      <div className="text-sm font-semibold text-[#003B73]">{step.label}</div>
                      <div className="text-xs text-[#6B7E9E]">{step.desc}</div>
                    </div>
                    <div className="ml-auto w-2 h-2 rounded-full status-online" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Capabilities grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {autonomousCapabilities.map((cap, i) => (
            <motion.div
              key={cap.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-2xl p-5 card-lift"
            >
              <div className="text-3xl mb-3">{cap.icon}</div>
              <div className="font-semibold text-[#003B73] mb-1 text-sm">{cap.label}</div>
              <div className="text-xs text-[#6B7E9E]">{cap.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
