import { Terminal } from 'lucide-react';


function ModeIndicator() {
  return (
    <div className="flex items-center gap-2 px-3 py-1 bg-hudc-bg/50 border border-hudc-light/20 rounded-xs">
      <Terminal className="w-3 h-3 text-hudc-blue" />
      <span className="font-mono text-[10px] font-bold text-hudc-blue uppercase tracking-widest">
        mode: manual_review
      </span>
    </div>
  );
}

export default ModeIndicator;