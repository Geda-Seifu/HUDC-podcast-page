import { Lock, Unlock } from 'lucide-react';

function StatusIndicator({ open }) {
  return (
    <div className={`absolute -top-3 -left-3 flex items-center gap-2 px-2 py-1 bg-white border ${open ? 'border-green-500/50' : 'border-red-500/50'} rounded-sm shadow-sm z-10`}>
      <div className={`h-2 w-2 rounded-full ${open ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
      {open ? <Unlock className="w-4 h-4 text-green-600" /> : <Lock className="w-4 h-4 text-red-600" />}
    </div>
  );
}


export default StatusIndicator