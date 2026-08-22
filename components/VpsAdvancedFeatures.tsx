import { vpsAdvanced } from "@/lib/content";

export default function VpsAdvancedFeatures() {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-display font-extrabold text-3xl sm:text-[38px] mb-4">{vpsAdvanced.heading}</h2>
          <p className="text-black/70">{vpsAdvanced.sub}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {vpsAdvanced.items.map((item) => (
            <div key={item.title} className="border border-black/10 rounded-2xl p-6 hover:border-aqua/40 hover:-translate-y-1 transition-all">
              <h3 className="font-display font-bold text-[15px] mb-2">{item.title}</h3>
              <p className="text-[13px] text-black/70 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
