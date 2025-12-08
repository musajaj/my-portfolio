import React, { useState, useEffect } from 'react';
import { Language, Profile, Project } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
// Replaced ProjectGallery with ProductStore
import ProductStore from './components/ProductStore';
import { Articles } from './components/Articles';
import { Services } from './components/Services';
import { About } from './components/About';
import BentoFooter from './components/BentoFooter';
import { CosmicBackground } from './components/CosmicBackground';
import StatsSection from './components/StatsSection';
import ScrollProgress from './components/ScrollProgress';
import ROICalculator from './components/ROICalculator';
import ValueScale from './components/ValueScale';
import WallOfLove from './components/WallOfLove';
import CommitmentSwitch from './components/CommitmentSwitch';
import PainMatrix from './components/PainMatrix';
import { client } from './sanity/client';
import { profileQuery } from './sanity/queries';
import { PROFILE as DEFAULT_PROFILE } from './constants';

export default function App() {
  // Default to Arabic as per content requirement
  const [lang, setLang] = useState<Language>(Language.AR);
  
  // Data State (Initialize with constants for SSR-like behavior/Fallback)
  const [profileData, setProfileData] = useState<Profile>(DEFAULT_PROFILE);

  // Fetch Sanity Data (Profile Only - Projects are now static in lib/data.ts)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedProfile = await client.fetch(profileQuery);

        if (fetchedProfile) {
          // Merge with defaults to ensure safety
          setProfileData({ ...DEFAULT_PROFILE, ...fetchedProfile });
        }
      } catch (error) {
        console.warn("Sanity Fetch Failed (Using Fallback Data):", error);
        // Silent failure: App continues using constants
      }
    };

    fetchData();
  }, []);

  // Update HTML direction based on language
  useEffect(() => {
    document.documentElement.dir = lang === Language.AR ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const handleNavigate = (target: string) => {
    if (target === '#') {
      // Explicitly handle "Home" / "Scroll to Top"
      window.history.pushState(null, '', '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target.startsWith('#')) {
      const elementId = target.replace('#', '');
      const element = document.getElementById(elementId);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen text-white selection:bg-blue-500/30 selection:text-blue-200 overflow-x-hidden">
      <CosmicBackground />
      <div className="relative z-10">
        <Navbar 
          lang={lang} 
          setLang={setLang} 
          onNavigate={handleNavigate} 
          profile={profileData} 
        />
        
        <main className="relative w-full">
          <Hero lang={lang} profile={profileData} />
          <StatsSection />
          <PainMatrix lang={lang} />
          <WallOfLove />
          {/* NEW STORE SECTION */}
          <ProductStore />
          <Articles lang={lang} />
          <Services lang={lang} />
          <About lang={lang} profile={profileData} />
          <ROICalculator />
          <ValueScale />
          <CommitmentSwitch />
        </main>
        
        <BentoFooter profile={profileData} />
      </div>
      <ScrollProgress />
    </div>
  );
}