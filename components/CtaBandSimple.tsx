export default function CtaBandSimple({ heading, cta }: { heading: string; cta: { label: string; href: string } }) {
  return (
    <section className="py-16 px-6">
      <div className="max-w-3xl mx-auto text-center bg-ink rounded-3xl px-8 py-14">
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white mb-7 leading-snug">{heading}</h2>
        <a href={cta.href} className="inline-flex bg-aqua text-white font-bold text-xs tracking-widest uppercase px-8 py-3.5 rounded-xl hover:bg-aqua-dark transition-colors">
          {cta.label}
        </a>
      </div>
    </section>
  );
}
