import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Loading from "./components/Loading";
import CursorGlow from "./components/atmosphere/CursorGlow";
import ProgressDots from "./components/primitives/ProgressDots";
import Hero from "./components/sections/Hero";
import SectionNineteen from "./components/sections/SectionNineteen";
import SectionFarYouveCome from "./components/sections/SectionFarYouveCome";
import SectionThisDay from "./components/sections/SectionThisDay";
import SkySection from "./components/sections/SkySection";
import SectionYourYear from "./components/sections/SectionYourYear";
import BirthdaySection from "./components/sections/BirthdaySection";
import GiftSection from "./components/sections/GiftSection";
import Finale from "./components/sections/Finale";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [activeId, setActiveId] = useState("hero");

  const handleActive = useCallback((id: string) => setActiveId(id), []);

  return (
    <>
      <AnimatePresence>
        {!loaded && <Loading onDone={() => setLoaded(true)} />}
      </AnimatePresence>

      {/* Global cinematic overlays */}
      <div className="vignette" aria-hidden="true" />
      <div className="grain-overlay" aria-hidden="true" />
      <CursorGlow />

      {loaded && <ProgressDots activeId={activeId} />}

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full"
      >
        <Hero onActive={handleActive} />
        <SectionNineteen onActive={handleActive} />
        <SectionFarYouveCome onActive={handleActive} />
        <SectionThisDay onActive={handleActive} />
        <SkySection onActive={handleActive} />
        <SectionYourYear onActive={handleActive} />
        <BirthdaySection onActive={handleActive} />
        <GiftSection onActive={handleActive} />
        <Finale onActive={handleActive} />
      </motion.main>
    </>
  );
}
