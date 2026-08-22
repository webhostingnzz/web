import { logoPartners } from "@/lib/content";

export default function LogoMarquee() {
  const doubled = [...logoPartners, ...logoPartners];
  return (
    <section className="py-6 overflow-hidden">
      <div className="flex gap-6 w-max animate-[marquee_28s_linear_infinite]">
        {doubled.map((p, i) => (
          <div
            key={i}
            className="flex-none w-40 h-16 flex items-center justify-center text-sm font-bold text-black/40 grayscale"
          >
            {p.name}
          </div>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0);} to { transform: translateX(-50%);} }`}</style>
    </section>
  );
}
