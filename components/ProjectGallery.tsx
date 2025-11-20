
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";
import { Project } from '../types';
import HolographicCard from './HolographicCard';

interface ProjectGalleryProps {
  projects: Project[];
}

export default function ProjectGallery({ projects }: ProjectGalleryProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Find the active project data safely
  const selectedProject = projects.find((p) => p.slug === selectedId);

  // Handle Scroll Locking & URL State
  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = "hidden";
      // Update URL purely for visual feedback
      const targetPath = `/projects/${selectedId}`;
      if (window.location.pathname !== targetPath) {
         window.history.pushState(null, '', targetPath);
      }
    } else {
      document.body.style.overflow = "auto";
      // Revert URL if closing
      if (window.location.pathname.includes('/projects/')) {
         window.history.pushState(null, '', '/');
      }
    }
  }, [selectedId]);

  // Initial URL Check (with decoding)
  useEffect(() => {
    const match = window.location.pathname.match(/^\/projects\/([^\/]+)$/);
    if (match && match[1]) {
        try {
            // Decode URI component in case slug has special chars
            const decodedSlug = decodeURIComponent(match[1]);
            setSelectedId(decodedSlug);
        } catch (e) {
            console.error("Failed to decode URL slug:", e);
            // Fallback: Do not select a project if slug is malformed
            setSelectedId(null);
        }
    }
  }, []);

  // Check if ID exists but project does not (404 case)
  const isNotFound = selectedId && !selectedProject;

  return (
    <div id="projects" className="relative w-full py-20 px-4">
      
      {/* 1. THE GRID (Thumbnail View) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {projects.map((project) => (
          <motion.div
            layoutId={`card-${project.slug}`}
            key={project.slug}
            onClick={() => setSelectedId(project.slug)}
            className={`rounded-3xl cursor-pointer ${project.slug === 'unistack-student-dashboard' ? 'md:col-span-2' : ''}`}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <HolographicCard className="h-full">
              {/* Card Content */}
              <div className="p-8 h-full flex flex-col min-h-[200px]">
                <motion.h3 layoutId={`title-${project.slug}`} className="text-2xl font-bold text-white mb-2">
                  {project.title}
                </motion.h3>
                <motion.p layoutId={`desc-${project.slug}`} className="text-zinc-400 text-sm line-clamp-2">
                  {project.shortDesc}
                </motion.p>
                
                {/* Visual Footer inside card */}
                <div className="mt-auto pt-6 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium border border-blue-500/20">
                    {project.downloadCount} Downloads
                  </span>
                  <ArrowRight className="text-zinc-600 group-hover:text-white transition-colors" size={20} />
                </div>
              </div>
            </HolographicCard>
          </motion.div>
        ))}
      </div>

      {/* 2. THE EXPANDED VIEW (Modal Overlay) */}
      <AnimatePresence>
        {selectedId && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />

            {/* Full Screen Card or 404 */}
            <div key="modal-container" className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-8 pointer-events-none">
              
              {isNotFound ? (
                /* 404 UI - Handles missing projects gracefully */
                <motion.div
                   key="404"
                   initial={{ scale: 0.9, opacity: 0 }}
                   animate={{ scale: 1, opacity: 1 }}
                   exit={{ scale: 0.9, opacity: 0 }}
                   className="bg-zinc-950 border border-white/10 p-8 rounded-3xl shadow-2xl pointer-events-auto text-center max-w-md w-full relative overflow-hidden flex flex-col items-center"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />
                    <h1 className="text-4xl font-bold mb-4 text-red-500">Error 404</h1>
                    <p className="text-zinc-400 mb-8 leading-relaxed">
                        المشروع الذي تبحث عنه غير موجود<br/>أو تم تغيير رابطه.
                    </p>
                    <button 
                        onClick={() => setSelectedId(null)}
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors flex items-center justify-center gap-2 font-bold"
                    >
                        <ArrowLeft size={20} />
                        <span>العودة للمشاريع</span>
                    </button>
                </motion.div>
              ) : (
                /* Valid Project Content */
                selectedProject && (
                  <motion.div
                    key="content"
                    layoutId={`card-${selectedId}`}
                    className="w-full max-w-4xl max-h-[90vh] bg-zinc-950 border border-white/10 rounded-3xl overflow-hidden shadow-2xl pointer-events-auto flex flex-col md:flex-row relative"
                  >
                    {/* Close Button (Absolute) */}
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                      className="absolute top-4 right-4 z-50 p-2 bg-black/50 rounded-full text-white hover:bg-red-500 transition-colors"
                    >
                      <X size={20} />
                    </button>

                    {/* CONTENT: Left Side (Details) */}
                    <div className="flex-1 p-8 md:p-10 overflow-y-auto scrollbar-hide">
                      <motion.h2 layoutId={`title-${selectedId}`} className="text-3xl md:text-4xl font-bold text-white mb-4 mt-6 md:mt-0">
                        {selectedProject.title}
                      </motion.h2>
                      <motion.p layoutId={`desc-${selectedId}`} className="text-zinc-400 text-lg mb-8 leading-relaxed">
                        {selectedProject.fullDesc}
                      </motion.p>

                      {/* Features List (Animates in) */}
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-4 mb-8"
                      >
                        <h4 className="text-white font-semibold border-b border-white/10 pb-2">Key Features</h4>
                        <ul className="space-y-3">
                          {selectedProject.features?.map((feat, i) => (
                            <li key={i} className="flex items-start gap-3 text-zinc-300 text-sm">
                              <CheckCircle2 className="text-blue-500 shrink-0" size={18} />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    </div>

                    {/* CONTENT: Right Side (Action & Stats) */}
                    <div className="w-full md:w-80 bg-zinc-900/50 md:border-l border-t md:border-t-0 border-white/5 p-8 flex flex-col justify-center shrink-0">
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-6"
                      >
                        <div className="text-center">
                            <p className="text-zinc-500 text-sm uppercase tracking-wider mb-1">Total Downloads</p>
                            <p className="text-4xl font-bold text-white">{selectedProject.downloadCount}</p>
                        </div>
                        
                        <a 
                          href={selectedProject.externalLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all active:scale-95"
                        >
                          <span>Get Template</span>
                          <ExternalLink size={18} />
                        </a>
                        
                        <p className="text-xs text-center text-zinc-500">
                          Secure checkout via Notion / Gumroad.
                          <br/>Instant digital delivery.
                        </p>
                      </motion.div>
                    </div>

                  </motion.div>
                )
              )}
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
