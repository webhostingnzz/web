import { domainActions } from "@/lib/content";

export default function DomainActions() {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="font-display font-extrabold text-3xl sm:text-[38px] mb-4">{domainActions.heading}</h2>
          <p className="text-black/70">{domainActions.sub}</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-5">
          {domainActions.cards.map((c) => (
            <div key={c.title} className="border border-black/10 rounded-2xl p-7 flex flex-col">
              <h3 className="font-display font-bold text-lg mb-2.5">{c.title}</h3>
              <p className="text-[13.5px] text-black/70 leading-relaxed mb-5">{c.body}</p>
              <ul className="grid grid-cols-2 gap-2 mb-6 flex-1">
                {c.perks.map((p) => (
                  <li key={p} className="text-[12px] font-semibold flex items-center gap-1.5">
                    <span className="text-aqua font-extrabold">&#10003;</span>{p}
                  </li>
                ))}
              </ul>
              <a href="/contact/" className="block text-center bg-aqua text-white font-bold text-[11px] tracking-widest uppercase py-3 rounded-xl hover:bg-ink transition-colors">
                {c.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
