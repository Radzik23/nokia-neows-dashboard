// src/components/StatCard.tsx
interface StatCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  color: 'blue' | 'coral' | 'white';
  trend?: string;
}

export const StatCard = ({ label, value, subValue, color, trend }: StatCardProps) => {
  const colorMap = {
    blue: 'border-blue-500 text-blue-400',
    coral: 'border-[#FF7E67] text-[#FF7E67]',
    white: 'border-slate-400 text-white'
  };

  return (
    <div className="bg-[#111827] p-5 rounded-lg border border-slate-800/40 relative overflow-hidden shadow-2xl">
      <div className={`absolute left-0 top-4 bottom-4 w-[3px] rounded-r-full border-l-[3px] ${colorMap[color]}`} />
      <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.15em] mb-2 pl-2">
        {label}
      </p>
      <div className="flex items-baseline gap-2 pl-2">
        <span className="text-3xl font-mono font-bold text-white tracking-tighter">{value}</span>
        {trend && <span className="text-[9px] text-slate-500 font-mono">{trend}</span>}
      </div>
      {subValue && (
        <p className={`text-[9px] mt-3 pl-2 uppercase font-bold tracking-tighter ${colorMap[color]} opacity-80`}>
          {subValue}
        </p>
      )}
    </div>
  );
};