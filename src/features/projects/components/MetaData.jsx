import { ExternalLink } from "lucide-react";

// Helper for the Metadata Panel
const MetadataRow = ({ label, value, isLink }) => (
  <div className="space-y-1">
    <p className="text-[9px] font-mono font-bold text-hudc-blue uppercase tracking-tighter">{label}</p>
    {value ? (
        isLink ? (
            <a href={value} target="_blank" className="text-[11px] font-mono text-hudc-dark/80 hover:text-hudc-blue underline flex items-center gap-1 break-all">
                {value} <ExternalLink className="w-2.5 h-2.5 shrink-0" />
            </a>
        ) : (
            <p className="text-[11px] font-mono text-hudc-dark/80 break-all">{value}</p>
        )
    ) : (
        <p className="text-[11px] font-mono text-hudc-dark/20 uppercase font-bold italic">NOT_PROVIDED</p>
    )}
  </div>
);

export default MetadataRow;