import { domainTlds } from "@/lib/content";

export default function TldPricing() {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display font-extrabold text-3xl sm:text-[38px] text-center mb-10">All domain names</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {domainTlds.map((t) => (
            <div key={t.tld} className="border border-black/10 rounded-2xl p-6 text-center hover:border-aqua/40 hover:-translate-y-1 transition-all">
              <p className="font-display font-extrabold text-xl mb-2">{t.tld}</p>
              <p className="font-display font-extrabold text-2xl text-aqua mb-0.5">NZ${t.price}<span className="text-[12px] text-black/50 font-body font-normal">/yr</span></p>
              <p className="text-[11.5px] text-black/40 line-through mb-4">Previously NZ${t.was}</p>
              <a href="/contact/" className="block text-center border-2 border-aqua/50 text-aqua font-bold text-[11px] tracking-widest uppercase py-2.5 rounded-xl hover:bg-aqua hover:text-white transition-colors">
                Register
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
