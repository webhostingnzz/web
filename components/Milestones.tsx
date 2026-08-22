export default function Milestones({ heading, items }: { heading: string; items: { year: string; title: string; body: string }[] }) {
  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display font-extrabold text-3xl sm:text-[38px] text-center mb-12">{heading}</h2>
        <div className="relative pl-8 border-l-2 border-aqua/25 space-y-10">
          {items.map((m) => (
            <div key={m.year} className="relative">
              <span className="absolute -left-[38px] top-1 w-5 h-5 rounded-full bg-aqua border-4 border-white shadow" />
              <p className="text-aqua font-display font-extrabold text-lg mb-1">{m.year}</p>
              <h3 className="font-display font-bold text-[16px] mb-1.5">{m.title}</h3>
              <p className="text-[13.5px] text-black/70 leading-relaxed">{m.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
