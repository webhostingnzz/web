import { whyChooseUs } from "@/lib/content";

const icons: Record<string, JSX.Element> = {
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></>,
  shield: <><path d="M12 2 3 6v6c0 5 4 8.5 9 10 5-1.5 9-5 9-10V6z" /></>,
  pin: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></>,
  search: <><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></>,
  users: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></>,
  chevrons: <><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></>,
};

export default function WhyChooseUs() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="block text-aqua text-[11px] font-bold tracking-[0.18em] uppercase mb-3">{whyChooseUs.eyebrow}</span>
          <h2 className="font-display font-extrabold text-3xl sm:text-[40px] leading-tight mb-4">{whyChooseUs.heading}</h2>
          <p className="text-black/70">{whyChooseUs.sub}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {whyChooseUs.items.map((item) => (
            <div key={item.title} className="bg-white/70 border-2 border-aqua/15 rounded-2xl p-8 hover:border-aqua/40 hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 rounded-xl bg-aqua/10 border-2 border-aqua/30 flex items-center justify-center mb-5">
                <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-aqua fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {icons[item.icon]}
                </svg>
              </div>
              <h3 className="font-display font-bold text-[17px] mb-2">{item.title}</h3>
              <p className="text-[13.5px] text-black/70 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
