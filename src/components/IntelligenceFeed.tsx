import { useState, useEffect, useMemo } from 'react';
import { Terminal, ChevronLeft, ChevronRight, RefreshCcw } from 'lucide-react';
import { calculateDangerScore } from '../utils/dangerScore';
import type { Asteroid } from '../types/asteroid';

interface Props {
  processedData: Asteroid[];
}

const TypewriterText = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText("");
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 15);
    return () => clearInterval(timer);
  }, [text]);

  return (
    <span className="font-mono text-blue-400 text-xs md:text-sm tracking-widest uppercase leading-relaxed">
      {displayedText}
      <span className="animate-pulse text-white font-bold">_</span>
    </span>
  );
};

export const IntelligenceFeed = ({ processedData }: Props) => {
  const [factIndex, setFactIndex] = useState(0);

  const allFacts = useMemo(() => {
    if (processedData.length === 0) return ["Scanning deep space sectors... No telemetry data available."];
    
    const facts = [];
    const mostDangerous = [...processedData].sort((a, b) => calculateDangerScore(b) - calculateDangerScore(a))[0];
    const largest = [...processedData].sort((a, b) => b.estimatedDiameterMax - a.estimatedDiameterMax)[0];
    const fastest = [...processedData].sort((a, b) => parseFloat(b.velocityKmh) - parseFloat(a.velocityKmh))[0];

    facts.push(`THREAT ADVISORY: Object ${mostDangerous.name.replace(/[()]/g, '')} identified with Danger Score ${calculateDangerScore(mostDangerous)}/100.`);
    facts.push(`SIZE COMPARISON: The largest entity (${largest.name.replace(/[()]/g, '')}) is approx. ${(largest.estimatedDiameterMax / 105).toFixed(1)} football fields long.`);
    facts.push(`VELOCITY ALERT: Object ${fastest.name.replace(/[()]/g, '')} is traveling at ${Math.round(parseFloat(fastest.velocityKmh)).toLocaleString()} km/h.`);
    facts.push(`SYSTEM SUMMARY: Monitoring ${processedData.length} objects in current sector.`);

    return facts;
  }, [processedData]);

  const nextFact = () => setFactIndex((prev) => (prev + 1) % allFacts.length);
  const prevFact = () => setFactIndex((prev) => (prev - 1 + allFacts.length) % allFacts.length);

  useEffect(() => { setFactIndex(0); }, [processedData]);

  return (
    <div className="bg-[#0B0F19]/80 backdrop-blur-md p-6 md:p-8 rounded-xl border border-slate-700/50 shadow-2xl relative overflow-hidden mt-6 group">
      <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.5)]" />
      
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3 opacity-40">
          <Terminal size={18} className="text-blue-400" />
          <span className="text-[10px] font-black text-white tracking-[0.3em] uppercase">
            Active Intelligence Feed // Segment {factIndex + 1}
          </span>
        </div>

        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={prevFact} className="p-1 hover:bg-blue-500/20 rounded text-slate-400 hover:text-blue-400"><ChevronLeft size={20} /></button>
          <button onClick={nextFact} className="p-1 hover:bg-blue-500/20 rounded text-slate-400 hover:text-blue-400"><ChevronRight size={20} /></button>
        </div>
      </div>

      <div className="min-h-[60px] flex items-start justify-between gap-4">
        <TypewriterText text={allFacts[factIndex]} />
        <button onClick={() => setFactIndex(0)} className="text-slate-600 hover:text-blue-500"><RefreshCcw size={14} /></button>
      </div>
    </div>
  );
};