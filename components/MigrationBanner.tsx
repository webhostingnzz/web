import { migration } from "@/lib/content";

export default function MigrationBanner() {
  return (
    <section className="px-6 py-2">
      <div className="max-w-6xl mx-auto bg-aqua rounded-3xl px-8 sm:px-14 py-12 flex flex-col md:flex-row items-center justify-between gap-8 text-white">
        <div className="max-w-xl">
          <h3 className="font-display font-extrabold text-2xl mb-3">{migration.heading}</h3>
          <p className="text-[14.5px] opacity-95 mb-6 leading-relaxed">{migration.body}</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5">
            {migration.checklist.map((c) => (
              <li key={c} className="flex items-center gap-2 text-[13.5px] font-semibold">
                <span className="font-extrabold">&#10003;</span> {c}
              </li>
            ))}
          </ul>
        </div>
        <a
          href={migration.cta.href}
          className="flex-none bg-ink text-white font-bold text-xs tracking-widest uppercase px-8 py-4 rounded-xl hover:bg-black transition-colors whitespace-nowrap"
        >
          {migration.cta.label}
        </a>
      </div>
    </section>
  );
}
