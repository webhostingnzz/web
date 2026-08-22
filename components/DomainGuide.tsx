import { domainGuide } from "@/lib/content";

export default function DomainGuide() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display font-extrabold text-3xl sm:text-[36px] mb-5">{domainGuide.heading}</h2>
        <p className="text-[15px] text-black/70 leading-relaxed mb-6">{domainGuide.body}</p>
        <div className="bg-aqua/5 border border-aqua/20 rounded-2xl p-6 mb-10">
          <h3 className="font-display font-bold text-[15px] mb-2">Brand protection tip</h3>
          <p className="text-[14px] text-black/70 leading-relaxed">{domainGuide.tip}</p>
        </div>
        <h3 className="font-display font-bold text-xl mb-5">Mini-guide: how to choose the right domain extension in NZ</h3>
        <ol className="space-y-4">
          {domainGuide.steps.map((s, i) => (
            <li key={s.title} className="flex gap-4">
              <span className="flex-none w-8 h-8 rounded-full bg-aqua text-white font-display font-bold text-sm flex items-center justify-center">{i + 1}</span>
              <div>
                <p className="font-display font-bold text-[15px] mb-1">{s.title}</p>
                <p className="text-[13.5px] text-black/70 leading-relaxed">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
