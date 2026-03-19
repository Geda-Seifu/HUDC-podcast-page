import React, { useEffect } from 'react';
import { Terminal, X, CheckCircle, AlertCircle } from 'lucide-react';

export default function Toast({ message, type = "info", onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000); // Auto-close after 4s
    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    info: <Terminal className="w-4 h-4 text-hudc-blue" />,
    success: <CheckCircle className="w-4 h-4 text-green-500" />,
    error: <AlertCircle className="w-4 h-4 text-red-500" />
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] animate-in slide-in-from-right-10 duration-300">
      <div className="bg-hudc-dark/90 backdrop-blur-md border border-hudc-light/20 p-4 rounded-sm shadow-2xl min-w-[300px] flex items-center gap-4">
        
        {/* Icon & Status Segment */}
        <div className="flex-shrink-0">
          {icons[type]}
        </div>

        {/* Message Content */}
        <div className="flex-grow">
          <p className="text-[11px] font-mono font-bold text-white uppercase tracking-tighter">
            System_Message::
          </p>
          <p className="text-[13px] text-white/80 leading-tight">
            {message}
          </p>
        </div>

        {/* Manual Close */}
        <button onClick={onClose} className="hover:text-white text-white/30 transition-colors">
          <X className="w-4 h-4" />
        </button>

        {/* Animated Progress Bar */}
        <div className="absolute bottom-0 left-0 h-[2px] bg-hudc-blue animate-shrink" />
      </div>
    </div>
  );
}