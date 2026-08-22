export default function PageHero({ heading, sub }: { heading: string; sub: string }) {
  return (
    <section className="relative pt-32 pb-14 px-6 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(12,192,223,0.15) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <h1 className="font-display font-extrabold text-[40px] sm:text-[54px] leading-[1.05] mb-5">{heading}</h1>
        <p className="text-[16px] text-black/70 leading-relaxed max-w-xl mx-auto">{sub}</p>
      </div>
    </section>
  );
}
