import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ControlBar } from './components/ControlBar';
import { StoryNav } from './components/StoryNav';
import { StakeholderBanner } from './components/StakeholderBanner';
import { ModeIndicator } from './components/ModeIndicator';
import { HeroScene } from './scenes/HeroScene';
import { Scene1InvisibleFactory } from './scenes/Scene1InvisibleFactory';
import { Scene2Visibility } from './scenes/Scene2Visibility';
import { Scene3OperationalGraph } from './scenes/Scene3OperationalGraph';
import { Scene4DigitalTwin } from './scenes/Scene4DigitalTwin';
import { Scene5Autonomous } from './scenes/Scene5Autonomous';
import { SceneBigPicture } from './scenes/SceneBigPicture';
import { Scene6ServicesInABox } from './scenes/Scene6ServicesInABox';
import { Scene7GlobalControlPlane } from './scenes/Scene7GlobalControlPlane';
import { Scene8UseCaseStudio } from './scenes/Scene8UseCaseStudio';
import { CIOCommandCenter } from './scenes/CIOCommandCenter';
import { SceneFactoryFuture } from './scenes/SceneFactoryFuture';
import { SceneTargetState } from './scenes/SceneTargetState';
import { SceneRoadmap } from './scenes/SceneRoadmap';
import { SceneDeloitte } from './scenes/SceneDeloitte';

function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className="fixed top-14 left-0 right-0 z-40 h-0.5 bg-[rgba(0,94,184,0.07)]">
      <motion.div
        className="h-full origin-left"
        style={{ background: 'linear-gradient(90deg, #005EB8, #00A3E0, #12B3A8)', width: `${progress}%` }}
        transition={{ ease: 'linear' }}
      />
    </div>
  );
}

function SceneDivider() {
  return <div className="scene-divider mx-auto" style={{ maxWidth: '80%' }} />;
}

function App() {
  return (
    <div className="min-h-screen">
      <ControlBar />
      <ModeIndicator />
      <StakeholderBanner />
      <ScrollProgress />
      <StoryNav />
      <main>
        <HeroScene />
        <SceneDivider />
        <Scene1InvisibleFactory />
        <SceneDivider />
        <Scene2Visibility />
        <SceneDivider />
        <Scene3OperationalGraph />
        <SceneDivider />
        <Scene4DigitalTwin />
        <SceneDivider />
        <Scene5Autonomous />
        <SceneDivider />
        <SceneBigPicture />
        <SceneDivider />
        <SceneFactoryFuture />
        <SceneDivider />
        <SceneTargetState />
        <SceneDivider />
        <Scene6ServicesInABox />
        <SceneDivider />
        <Scene7GlobalControlPlane />
        <SceneDivider />
        <SceneRoadmap />
        <SceneDivider />
        <SceneDeloitte />
        <SceneDivider />
        <Scene8UseCaseStudio />
        <SceneDivider />
        <CIOCommandCenter />
      </main>
    </div>
  );
}

export default App;
