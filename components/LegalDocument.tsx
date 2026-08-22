export default function LegalDocument({
  intro, sections,
}: { intro?: string; sections: { heading: string; body: string }[] }) {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        {intro && <p className="text-[13.5px] text-black/50 mb-10">{intro}</p>}
        <div className="space-y-10">
          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="font-display font-bold text-[19px] mb-3">{s.heading}</h2>
              <p className="text-[14.5px] text-black/70 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
