const icons: Record<string, JSX.Element> = {
  layers: <><path d="M12 2 2 7l10 5 10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></>,
  shield: <><path d="M12 2 3 6v6c0 5 4 8.5 9 10 5-1.5 9-5 9-10V6z" /></>,
  server: <><rect x="3" y="4" width="18" height="6" rx="1" /><rect x="3" y="14" width="18" height="6" rx="1" /><circle cx="7" cy="7" r="0.6" fill="currentColor" /><circle cx="7" cy="17" r="0.6" fill="currentColor" /></>,
  dashboard: <><rect x="3" y="3" width="7" height="9" rx="1" /><rect x="14" y="3" width="7" height="5" rx="1" /><rect x="14" y="12" width="7" height="9" rx="1" /><rect x="3" y="16" width="7" height="5" rx="1" /></>,
  bolt: <><path d="M13 2 4 14h7l-1 8 9-12h-7z" /></>,
  headset: <><path d="M4 12v-1a8 8 0 0116 0v1" /><rect x="3" y="12" width="4" height="6" rx="1" /><rect x="17" y="12" width="4" height="6" rx="1" /><path d="M19 18v1a3 3 0 01-3 3h-3" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>,
  search: <><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 010 18 14 14 0 010-18z" /></>,
  cart: <><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.7 13.4a2 2 0 002 1.6h9.7a2 2 0 002-1.6L23 6H6" /></>,
  file: <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6" /></>,
};

export default function FeatureGrid({
  heading, sub, items, columns = 3,
}: { heading: string; sub?: string; items: { title: string; body: string; icon?: string }[]; columns?: 2 | 3 | 4 }) {
  const colClass = columns === 4 ? "lg:grid-cols-4" : columns === 2 ? "" : "lg:grid-cols-3";
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-display font-extrabold text-3xl sm:text-[38px] mb-4">{heading}</h2>
          {sub && <p className="text-black/70">{sub}</p>}
        </div>
        <div className={`grid sm:grid-cols-2 ${colClass} gap-4`}>
          {items.map((item) => (
            <div key={item.title} className="border border-black/10 rounded-2xl p-7 hover:border-aqua/40 hover:-translate-y-1 transition-all">
              {item.icon && (
                <div className="w-11 h-11 rounded-xl bg-aqua/10 flex items-center justify-center mb-4">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-aqua fill-none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    {icons[item.icon] || icons.layers}
                  </svg>
                </div>
              )}
              <h3 className="font-display font-bold text-[16px] mb-2">{item.title}</h3>
              <p className="text-[13.5px] text-black/70 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
