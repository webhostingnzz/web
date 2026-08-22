import { faq as defaultFaq } from "@/lib/content";

type FaqItem = { q: string; a: string };

export default function Faq({
  heading = defaultFaq.heading,
  items = defaultFaq.items as FaqItem[],
}: {
  heading?: string;
  items?: FaqItem[];
}) {
  return (
    <section className="py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-display font-extrabold text-3xl sm:text-[38px] text-center mb-10">{heading}</h2>
        <div className="space-y-3">
          {items.map((item) => (
            <details key={item.q} className="bg-white border border-black/10 rounded-xl overflow-hidden group">
              <summary className="px-6 py-4 font-display font-bold text-[15px] cursor-pointer list-none flex justify-between items-center gap-4">
                {item.q}
                <span className="text-black/40 group-open:rotate-180 transition-transform flex-none">&#8964;</span>
              </summary>
              <div className="px-6 pb-5 text-[14px] text-black/70 leading-relaxed border-t border-black/5 pt-4">{item.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
