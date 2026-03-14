import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, Home, AlertTriangle } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Auto-redirect logic
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    if (countdown === 0) {
      navigate('/');
    }

    return () => clearInterval(timer);
  }, [countdown, navigate]);

  return (
    <div className="min-h-screen bg-hudc-bg flex items-center justify-center p-6">
      <div className="max-w-md w-full border border-red-500/20 bg-white p-8 rounded-sm shadow-xl text-center relative overflow-hidden">
        
        {/* Subtle background icon */}
        <AlertTriangle className="absolute -top-10 -right-10 w-40 h-40 text-red-500/5 rotate-12" />

        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-50 rounded-full mb-6">
          <Terminal className="w-8 h-8 text-red-500" />
        </div>

        <h1 className="text-4xl font-bold text-hudc-dark font-sans tracking-tighter uppercase mb-2">
          404_<span className="text-red-500">Path_Not_Found</span>
        </h1>
        
        <p className="text-sm font-mono text-hudc-dark/60 mb-8 italic">
          // stack_trace: the requested resource does not exist on this server.
        </p>

        <div className="space-y-4">
          <button 
            onClick={() => navigate('/')}
            className="w-full py-3 bg-hudc-blue text-white rounded-sm font-mono text-xs font-bold flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all border-b-4 border-black/20 active:border-b-0 active:translate-y-0.5"
          >
            <Home className="w-4 h-4" />
            {'>'} return_to_base
          </button>

          <p className="text-[10px] font-mono text-hudc-dark/40 uppercase tracking-widest">
            Auto-redirecting in <span className="text-hudc-blue font-bold">{countdown}s</span>
          </p>
        </div>
      </div>
    </div>
  );
}