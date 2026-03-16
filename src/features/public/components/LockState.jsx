import {Lock} from 'lucide-react';

function LockedState({head, text}) {
  return (
    <div className="max-w-3xl mx-auto p-12 bg-white border border-hudc-light/30 text-center rounded-sm">
      <Lock className="w-8 h-8 text-red-500 mx-auto mb-4" />
      <h3 className="text-lg font-bold text-hudc-dark uppercase tracking-tight">{head}</h3>
      <p className="text-xs font-mono text-hudc-dark/40 mt-2">{text}</p>
    </div>
  );
}


export default LockedState;