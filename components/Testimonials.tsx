import { testimonials } from "@/lib/content";

export default function Testimonials() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="font-display font-extrabold text-3xl sm:text-[38px] mb-4">{testimonials.heading}</h2>
          <p className="text-black/70">{testimonials.sub}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.items.map((t) => (
            <div key={t.name} className="bg-aqua/5 border border-aqua/20 rounded-2xl p-7">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-full bg-aqua/20 text-aqua font-display font-bold flex items-center justify-center">
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="font-bold text-[14px]">{t.name}</p>
                  <p className="text-[11.5px] text-aqua font-semibold">{t.role}</p>
                </div>
              </div>
              <p className="text-[13.5px] italic text-black/70 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
