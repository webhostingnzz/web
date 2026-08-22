import { plans } from "@/lib/content";

export default function Plans() {
  return (
    <section id="hosting-plans" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="block text-aqua text-[11px] font-bold tracking-[0.18em] uppercase mb-3">{plans.eyebrow}</span>
          <h2 className="font-display font-extrabold text-3xl sm:text-[42px]">{plans.heading}</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {plans.items.map((plan) => (
            <div key={plan.name} className="bg-white/60 border-2 border-aqua/20 rounded-2xl p-6 flex flex-col hover:border-aqua/50 hover:-translate-y-2 transition-all shadow-sm">
              <h3 className="font-display font-bold text-lg text-center mb-2">{plan.name}</h3>
              <p className="text-[13px] text-black/70 text-center mb-4 leading-relaxed">{plan.desc}</p>
              <div className="h-px bg-black/10 mb-4" />
              <ul className="space-y-1.5 mb-5 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-[12.5px] font-semibold">
                    <span className="w-4 h-4 rounded-full bg-aqua/15 border border-aqua/40 text-aqua flex items-center justify-center text-[9px] font-extrabold flex-none">
                      &#10003;
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="flex items-baseline justify-center gap-1 mb-4">
                <span className="text-aqua font-display font-bold text-xs mt-1">NZ$</span>
                <span className="font-display font-extrabold text-[38px] leading-none">{plan.price}</span>
                <span className="text-black/50 text-[11px] ml-1">/mo</span>
              </div>
              <a
                href={plan.href}
                className="block text-center border-2 border-aqua/50 text-aqua font-bold text-[11px] tracking-widest uppercase py-3 rounded-xl hover:bg-aqua hover:text-white hover:border-aqua transition-colors"
              >
                View plans
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
