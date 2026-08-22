import { security } from "@/lib/content";

export default function Security() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="block text-aqua text-[11px] font-bold tracking-[0.18em] uppercase mb-3">{security.eyebrow}</span>
          <h2 className="font-display font-extrabold text-3xl sm:text-[38px] mb-4">{security.heading}</h2>
          <p className="text-black/70">{security.sub}</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {security.items.map((s) => (
            <div key={s.title} className="bg-white border border-black/10 rounded-2xl p-7 hover:border-aqua/40 transition-colors">
              <h3 className="font-display font-bold text-[16px] mb-2">{s.title}</h3>
              <p className="text-[13.5px] text-black/70 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
        <div className="bg-aqua rounded-2xl px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6 text-white">
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Security at a glance</h3>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-[13px] font-semibold">
              {security.banner.map((b) => (
                <li key={b} className="flex items-center gap-2"><span className="font-extrabold">&#10003;</span>{b}</li>
              ))}
            </ul>
          </div>
          <a href="#hosting-plans" className="flex-none bg-white text-aqua font-extrabold text-xs tracking-widest uppercase px-8 py-3.5 rounded-xl">
            Get protected today
          </a>
        </div>
      </div>
    </section>
  );
}
