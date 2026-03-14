import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, ChevronRight, AlertCircle } from 'lucide-react';
import { loginAdmin } from '../../api/auth.js';
import { useAuthStore } from '../../hooks/useAuthStore';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await loginAdmin(email, password);
      setAuth(data.session);
      navigate('/admin'); // Redirect to dashboard on success
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Grid - Same as your landing page */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.4]" 
           style={{ backgroundImage: `radial-gradient(#83A3CB 0.8px, transparent 0.8px)`, backgroundSize: '32px 32px' }} />

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white border border-hudc-light/30 shadow-2xl rounded-sm overflow-hidden">
          {/* Terminal Header */}
          <div className="bg-[#F8FAFC] border-b border-hudc-light/30 px-6 py-4 flex justify-between items-center">
            <h3 className="text-xs font-mono font-bold text-hudc-dark uppercase tracking-widest">
              System_Auth_v1.0
            </h3>
            <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400/60 animate-[pulse_2s_infinite]"></div>
      <div className="w-3 h-3 rounded-full bg-amber-400/60 animate-[pulse_2s_infinite_200ms]"></div>
      <div className="w-3 h-3 rounded-full bg-green-400/60 animate-[pulse_2s_infinite_400ms]"></div>
          </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-hudc-dark tracking-tighter uppercase">
                Admin_<span className="text-hudc-blue">Portal</span>
              </h1>
              <p className="text-[10px] font-mono text-hudc-dark/40 mt-1 uppercase">
                // secure_entry_required
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 p-3 rounded-sm flex items-center gap-3 text-red-600">
                <AlertCircle className="w-4 h-4" />
                <p className="text-[10px] font-mono font-bold uppercase">{error}</p>
              </div>
            )}

            <div className="space-y-4">
              {/* Email Input */}
              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-hudc-dark/40 uppercase ml-1">Identity_ID</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hudc-dark/20" />
                  <input 
                    type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-hudc-bg/30 border border-hudc-light/20 rounded-sm py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-hudc-blue/50 font-mono transition-all"
                    placeholder="admin@hudc.dev"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-hudc-dark/40 uppercase ml-1">Access_Key</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hudc-dark/20" />
                  <input 
                    type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-hudc-bg/30 border border-hudc-light/20 rounded-sm py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-hudc-blue/50 font-mono transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit" disabled={loading}
              className="w-full bg-hudc-dark text-white py-3 rounded-sm font-mono text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-hudc-blue transition-colors group disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : (
                <>
                  Establish_Link
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="bg-hudc-bg/50 px-8 py-3 border-t border-hudc-light/20">
            <p className="text-[9px] font-mono text-hudc-dark/30 text-center uppercase tracking-tighter">
              warning: unauthorized access attempts are logged_to_syslog
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}