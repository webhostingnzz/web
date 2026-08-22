type Plan = {
  name: string;
  priceMonthly: string;
  priceAnnual?: string;
  features: string[];
  href: string;
  featured?: boolean;
};

export default function PlanGrid({
  eyebrow, heading, sub, plans, anchorId, priceSuffix = "/mo",
}: { eyebrow: string; heading: string; sub?: string; plans: Plan[]; anchorId?: string; priceSuffix?: string }) {
  return (
    <section id={anchorId} className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="block text-aqua text-[11px] font-bold tracking-[0.18em] uppercase mb-3">{eyebrow}</span>
          <h2 className="font-display font-extrabold text-3xl sm:text-[42px] mb-4">{heading}</h2>
          {sub && <p className="text-black/70 max-w-lg mx-auto">{sub}</p>}
        </div>
        <div className={`grid sm:grid-cols-2 gap-4 ${plans.length >= 4 ? "lg:grid-cols-4" : plans.length === 3 ? "lg:grid-cols-3" : ""}`}>
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-white/60 border-2 rounded-2xl p-6 flex flex-col hover:-translate-y-2 transition-all shadow-sm relative ${
                plan.featured ? "border-aqua" : "border-aqua/20 hover:border-aqua/50"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-6 bg-aqua text-white text-[10.5px] font-mono px-3 py-1 rounded-full">Most popular</div>
              )}
              <h3 className="font-display font-bold text-lg text-center mb-4">{plan.name}</h3>
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
              <div className="flex items-baseline justify-center gap-1 mb-1">
                <span className="text-aqua font-display font-bold text-xs mt-1">NZ$</span>
                <span className="font-display font-extrabold text-[38px] leading-none">{plan.priceMonthly}</span>
                <span className="text-black/50 text-[11px] ml-1">{priceSuffix}</span>
              </div>
              {plan.priceAnnual && <p className="text-center text-[11px] text-black/40 mb-4">NZ${plan.priceAnnual}/yr billed annually</p>}
              <a
                href={plan.href}
                className="block text-center border-2 border-aqua/50 text-aqua font-bold text-[11px] tracking-widest uppercase py-3 rounded-xl hover:bg-aqua hover:text-white hover:border-aqua transition-colors mt-2"
              >
                Order now
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
