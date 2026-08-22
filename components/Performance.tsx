import { performance } from "@/lib/content";

export default function Performance() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-start">
        <div>
          <span className="block text-aqua text-[11px] font-bold tracking-[0.18em] uppercase mb-3">{performance.eyebrow}</span>
          <h2 className="font-display font-extrabold text-3xl sm:text-[38px] leading-tight mb-5">{performance.heading}</h2>
          {performance.body.map((p, i) => (
            <p key={i} className="text-[15px] text-black/70 leading-relaxed mb-4">{p}</p>
          ))}
          <div className="bg-aqua/5 border border-aqua/20 rounded-2xl p-6 mt-6">
            <h4 className="font-display font-bold text-[15px] mb-2.5">&#8599; {performance.caseStudy.label}</h4>
            <p className="text-[14px] italic text-black/70 leading-relaxed">{performance.caseStudy.quote}</p>
          </div>
        </div>
        <div className="bg-white border border-black/10 rounded-2xl p-8 shadow-lg">
          <h3 className="font-display font-bold text-xl mb-6">{performance.comparison.heading}</h3>
          <div className="grid grid-cols-3 text-[10.5px] font-bold tracking-wider uppercase text-black/40 pb-2.5 mb-1 border-b-2 border-black/10">
            <span>Factor</span>
            <span>Offshore</span>
            <span className="text-aqua">Webhosting.nz</span>
          </div>
          {performance.comparison.rows.map((r) => (
            <div key={r.factor} className="grid grid-cols-3 text-[13px] py-3 border-b border-black/5 items-center">
              <span className="pr-2">{r.factor}</span>
              <span className="text-black/60">{r.offshore}</span>
              <span className="text-aqua font-bold">{r.nz}</span>
            </div>
          ))}
          <a
            href="#hosting-plans"
            className="block text-center bg-aqua text-white font-bold text-xs tracking-widest uppercase py-3.5 rounded-xl mt-6 hover:bg-ink transition-colors"
          >
            View hosting plans
          </a>
        </div>
      </div>
    </section>
  );
}
