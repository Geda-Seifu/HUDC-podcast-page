

import { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchAllGuests, fetchAllProjects } from '../../api/admin';

// --- NEW: Reusable CountUp Component ---
const CountUp = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);
 

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <span>{count}</span>;
};

export default function Hero() {
  const [text, setText] = useState("");
  const fullText = "/hudc/podcast";

   // Fetches EVERYTHING regardless of status
const { data: allGuests = [] } = useQuery({ 
  queryKey: ['public_stats_guests'], 
  queryFn: fetchAllGuests 
});

const { data: allProjects = [] } = useQuery({ 
  queryKey: ['public_stats_projects'], 
  queryFn: fetchAllProjects 
});

// These variables now represent every single 'click' or 'submission'
const totalSubmissions = allGuests.length;
const totalBuildsSent = allProjects.length;
  
  // Typing logic for the brand span
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden bg-white pt-16 pb-24 lg:pt-32 lg:pb-40 border-b border-hudc-light/20">
      {/* Subtle Dev Grid */}
      <div className="absolute inset-0 opacity-[0.15] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(var(--color-hudc-light) 1px, transparent 1px)`, backgroundSize: '24px 24px' }}>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          
          {/* GREEN BLINK STATUS */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-hudc-light/30 mb-8 shadow-sm rounded-sm">
            <span className="font-mono text-[10px] font-bold text-hudc-blue uppercase tracking-wider">
              status: online
            </span>
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border border-white"></span>
            </div>
            <span className="font-mono text-[10px] text-hudc-dark/40 border-l border-hudc-light/30 pl-2 uppercase tracking-tighter">
              v1.0.4-stable
            </span>
          </div>

          {/* HEADING WITH TYPING EFFECT */}
          <h1 className="text-4xl md:text-7xl font-bold text-hudc-dark tracking-tighter mb-6 font-sans">
            Shape the <span className="text-hudc-blue font-mono font-medium min-h-[1em]">
              {text}
              <span className="animate-pulse ml-1 inline-block w-1 h-8 md:h-12 bg-hudc-blue align-middle"></span>
            </span> <br className="hidden md:block" /> 
            Experience.
          </h1>

          <p className="max-w-2xl mx-auto text-base md:text-lg text-hudc-dark/70 mb-10 leading-relaxed font-sans">
            A community-driven platform for Haramaya University developers. 
            Help us source the next guest or showcase your latest <code className="bg-hudc-bg px-1.5 py-0.5 rounded-sm text-hudc-blue font-mono text-sm">builds</code>.
          </p>

          {/* COMMAND-STYLE BUTTONS */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a 
              href="#suggest" 
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-hudc-blue text-white px-6 py-3 rounded-sm font-mono text-sm hover:bg-opacity-90 transition-all border-b-4 border-black/20 active:border-b-0 active:translate-y-0.5"
            >
              <span className="opacity-50">{'>'}</span> suggest-guest
            </a>
            
            <a 
              href="#showcase" 
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-hudc-dark border border-hudc-light/30 px-6 py-3 rounded-sm font-mono text-sm hover:bg-hudc-bg transition-all border-b-4 active:border-b-0 active:translate-y-0.5"
            >
              <span className="opacity-50">$</span> showcase-project
            </a>
          </div>

          {/* TERMINAL STATS CONTAINER */}
          <div className="mt-20 w-full max-w-4xl bg-white border border-hudc-light/30 rounded-sm shadow-sm overflow-hidden">
            <div className="bg-[#F8FAFC] border-b border-hudc-light/30 px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400/60 animate-[pulse_2s_infinite]"></div>
      <div className="w-3 h-3 rounded-full bg-amber-400/60 animate-[pulse_2s_infinite_200ms]"></div>
      <div className="w-3 h-3 rounded-full bg-green-400/60 animate-[pulse_2s_infinite_400ms]"></div>
                <span className="ml-2 font-mono text-[10px] text-hudc-dark/40 uppercase tracking-widest">community_metrics.json</span>
              </div>
              <Terminal className="w-3 h-3 text-hudc-light/40" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2  divide-y md:divide-y-0 md:divide-x divide-hudc-light/20">
              <div className="p-6">
                <p className="font-mono text-[10px] text-hudc-blue uppercase mb-1">Incoming Suggestions</p>
                <p className="text-3xl font-bold text-hudc-dark"><CountUp end={totalSubmissions} /></p>
              </div>
              <div className="p-6">
                <p className="font-mono text-[10px] text-hudc-blue uppercase mb-1">Submitted Projects</p>
                <p className="text-3xl font-bold text-hudc-dark"><CountUp end={totalBuildsSent} /></p>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}