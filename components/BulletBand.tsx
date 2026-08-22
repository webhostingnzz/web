export default function BulletBand({ heading, items }: { heading: string; items: string[] }) {
  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto bg-ink rounded-3xl px-8 sm:px-14 py-12 text-center">
        <h2 className="font-display font-extrabold text-2xl sm:text-[32px] text-white mb-8">{heading}</h2>
        <ul className="grid sm:grid-cols-3 gap-5">
          {items.map((item) => (
            <li key={item} className="text-white/90 text-[14px] leading-relaxed">
              <span className="text-aqua font-extrabold mr-1">&#10003;</span>{item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
