import { hero } from "@/lib/content";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-6 px-6 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(12,192,223,0.15) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 border border-aqua/40 bg-aqua/5 rounded-full pl-2 pr-4 py-1.5 text-xs font-bold mb-7">
            <span className="w-5 h-5 rounded-full bg-aqua text-white flex items-center justify-center text-[10px]">&#10003;</span>
            {hero.tag}
          </div>
          <h1 className="font-display font-extrabold text-[44px] sm:text-[60px] leading-[1.05] tracking-tight mb-5">
            {hero.headline}
            <br />
            <span className="text-aqua">{hero.headlineAccent}</span>
          </h1>
          <p className="text-[17px] text-black/70 leading-relaxed max-w-md mb-9">{hero.sub}</p>
          <div className="flex flex-wrap gap-3.5">
            <a
              href={hero.primaryCta.href}
              className="bg-aqua text-white font-bold text-xs tracking-wider uppercase px-8 py-3.5 rounded-xl shadow-[0_8px_24px_rgba(12,192,223,0.3)] hover:bg-ink transition-colors"
            >
              {hero.primaryCta.label}
            </a>
            <a
              href={hero.secondaryCta.href}
              className="border-2 border-ink text-ink font-bold text-xs tracking-wider uppercase px-8 py-3.5 rounded-xl hover:border-aqua hover:text-aqua transition-colors"
            >
              {hero.secondaryCta.label}
            </a>
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          <svg viewBox="0 0 320 260" className="w-64 md:w-80" role="img" aria-label={hero.imageAlt}>
            <rect x="40" y="30" width="180" height="34" rx="8" fill="#0A0F1E" />
            <rect x="52" y="42" width="90" height="10" rx="2" fill="#0CC0DF" />
            <circle cx="200" cy="47" r="5" fill="#fff" opacity="0.6" />
            <rect x="40" y="76" width="180" height="34" rx="8" fill="#0A0F1E" opacity="0.85" />
            <rect x="52" y="88" width="70" height="10" rx="2" fill="#0CC0DF" opacity="0.7" />
            <circle cx="200" cy="93" r="5" fill="#fff" opacity="0.5" />
            <rect x="40" y="122" width="180" height="34" rx="8" fill="#0A0F1E" opacity="0.7" />
            <rect x="52" y="134" width="100" height="10" rx="2" fill="#0CC0DF" opacity="0.5" />
            <circle cx="200" cy="139" r="5" fill="#fff" opacity="0.4" />
            <path d="M60 180 Q160 220 260 180" stroke="#0CC0DF" strokeWidth="2" fill="none" opacity="0.5" strokeDasharray="4 4" />
          </svg>
        </div>
      </div>
    </section>
  );
}
