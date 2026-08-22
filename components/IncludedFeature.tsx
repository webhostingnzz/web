export default function IncludedFeature({ eyebrow, heading, body }: { eyebrow: string; heading: string; body: string }) {
  return (
    <section className="py-16 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <span className="block text-aqua text-[11px] font-bold tracking-[0.18em] uppercase mb-3">{eyebrow}</span>
        <h2 className="font-display font-extrabold text-3xl sm:text-[38px] mb-5">{heading}</h2>
        <p className="text-[15px] text-black/70 leading-relaxed">{body}</p>
      </div>
    </section>
  );
}
