"use client";
import { useState } from "react";
import { cloudProviders } from "@/lib/content";

export default function CloudProviderTables() {
  const [active, setActive] = useState(0);
  const provider = cloudProviders[active];

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center gap-2 mb-8">
          {cloudProviders.map((p, i) => (
            <button
              key={p.name}
              onClick={() => setActive(i)}
              className={`px-5 py-2.5 rounded-lg text-[13px] font-bold border-2 transition-colors ${
                active === i ? "bg-aqua text-white border-aqua" : "border-black/10 text-black/60 hover:border-aqua/40"
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
        <div className="overflow-x-auto rounded-2xl border border-black/10">
          <table className="w-full text-sm border-collapse min-w-[720px]">
            <thead>
              <tr className="bg-ink text-white">
                <th className="text-left px-5 py-3.5 font-display font-bold text-[13px]">Plan</th>
                <th className="text-left px-4 py-3.5 font-display font-bold text-[13px]">CPU / RAM</th>
                <th className="text-left px-4 py-3.5 font-display font-bold text-[13px]">Storage</th>
                <th className="text-left px-4 py-3.5 font-display font-bold text-[13px]">Bandwidth</th>
                <th className="text-right px-5 py-3.5 font-display font-bold text-[13px]">Price</th>
                <th className="px-4 py-3.5"></th>
              </tr>
            </thead>
            <tbody>
              {provider.tiers.map((t, i) => (
                <tr key={t.plan} className={i % 2 === 0 ? "bg-white" : "bg-aqua/5"}>
                  <td className="px-5 py-3 text-[13px] font-bold border-t border-black/5">{t.plan}</td>
                  <td className="px-4 py-3 text-[13px] border-t border-black/5">{t.cpuRam}</td>
                  <td className="px-4 py-3 text-[13px] border-t border-black/5">{t.storage}</td>
                  <td className="px-4 py-3 text-[13px] border-t border-black/5">{t.bandwidth}</td>
                  <td className="px-5 py-3 text-[13px] font-bold text-right border-t border-black/5 whitespace-nowrap">NZ${t.price}/mo</td>
                  <td className="px-4 py-3 border-t border-black/5 text-right">
                    <a href="/contact/" className="inline-block bg-aqua text-white text-[11px] font-bold px-4 py-1.5 rounded-lg hover:bg-ink transition-colors whitespace-nowrap">
                      Order now
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
