export default function Countdown() {
  return (
    <div className="flex gap-4 rounded-xl border border-white/10 bg-white/5 p-4 w-fit">
      {["02", "14", "45", "30"].map((v, i) => (
        <div key={i} className="text-center">
          <div className="text-xl font-semibold">{v}</div>
          <div className="text-[10px] uppercase text-white/50">
            {["Days", "Hours", "Mins", "Secs"][i]}
          </div>
        </div>
      ))}
    </div>
  );
}