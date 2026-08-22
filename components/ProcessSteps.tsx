export default function ProcessSteps({ heading, steps }: { heading: string; steps: { title: string; body: string }[] }) {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display font-extrabold text-3xl sm:text-[38px] text-center mb-12">{heading}</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {steps.map((s, i) => (
            <div key={s.title} className="flex gap-4">
              <span className="flex-none w-10 h-10 rounded-full bg-aqua text-white font-display font-bold flex items-center justify-center">{i + 1}</span>
              <div>
                <h3 className="font-display font-bold text-[16px] mb-1.5">{s.title}</h3>
                <p className="text-[13.5px] text-black/70 leading-relaxed">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
