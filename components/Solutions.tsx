import { solutions } from "@/lib/content";

export default function Solutions() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="block text-aqua text-[11px] font-bold tracking-[0.18em] uppercase mb-3">{solutions.eyebrow}</span>
          <h2 className="font-display font-extrabold text-3xl sm:text-[38px]">{solutions.heading}</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {solutions.items.map((s) => (
            <div key={s.title} className="bg-white border border-black/10 rounded-2xl p-8 hover:border-aqua/40 hover:-translate-y-1 transition-all shadow-sm">
              <h3 className="font-display font-bold text-lg mb-2.5">{s.title}</h3>
              <p className="text-[14px] text-black/70 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
