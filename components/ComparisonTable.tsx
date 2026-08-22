import { webHostingComparison } from "@/lib/content";

export default function ComparisonTable() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-display font-extrabold text-3xl sm:text-[38px] mb-4">{webHostingComparison.heading}</h2>
          <p className="text-black/70 max-w-xl mx-auto">{webHostingComparison.sub}</p>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-black/10 bg-white">
          <table className="w-full text-sm border-collapse min-w-[640px]">
            <thead>
              <tr className="bg-ink text-white">
                <th className="text-left px-5 py-3.5 font-display font-bold text-[13px]">Feature</th>
                {webHostingComparison.planNames.map((n) => (
                  <th key={n} className="px-4 py-3.5 font-display font-bold text-[13px] text-center">{n}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {webHostingComparison.rows.map((row, i) => (
                <tr key={row.feature} className={i % 2 === 0 ? "bg-white" : "bg-aqua/5"}>
                  <td className="px-5 py-3 text-[13px] font-semibold border-t border-black/5">{row.feature}</td>
                  {row.values.map((v, j) => (
                    <td key={j} className="px-4 py-3 text-center text-[13px] border-t border-black/5">
                      {v === "Yes" ? <span className="text-aqua font-bold">&#10003;</span> : v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
