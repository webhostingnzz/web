import { vpsManagement } from "@/lib/content";

export default function VpsManagement() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display font-extrabold text-3xl sm:text-[38px] text-center mb-12">{vpsManagement.heading}</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {vpsManagement.tiers.map((tier) => (
            <div key={tier.name} className="bg-white border border-black/10 rounded-2xl p-8">
              <h3 className="font-display font-bold text-xl mb-1.5">{tier.name}</h3>
              <p className="text-[13.5px] text-aqua font-semibold mb-5">{tier.tagline}</p>
              <ul className="space-y-2.5">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-[14px] font-semibold">
                    <span className="w-5 h-5 rounded-full bg-aqua/15 border border-aqua/40 text-aqua flex items-center justify-center text-[10px] font-extrabold flex-none">
                      &#10003;
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="/contact/" className="block text-center border-2 border-aqua/50 text-aqua font-bold text-[11px] tracking-widest uppercase py-3 rounded-xl mt-6 hover:bg-aqua hover:text-white transition-colors">
                Order now
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
