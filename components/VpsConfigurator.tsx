"use client";
import { useState } from "react";
import { vpsConfigurator } from "@/lib/content";

export default function VpsConfigurator() {
  const [i, setI] = useState(0);
  const tier = vpsConfigurator.tiers[i];
  const pct = (i / (vpsConfigurator.tiers.length - 1)) * 100;

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h2 className="font-display font-extrabold text-3xl sm:text-[38px] mb-4">{vpsConfigurator.heading}</h2>
        <p className="text-black/70">{vpsConfigurator.sub}</p>
      </div>
      <div className="max-w-2xl mx-auto border border-black/10 rounded-2xl p-8">
        <input
          type="range"
          min={0}
          max={vpsConfigurator.tiers.length - 1}
          step={1}
          value={i}
          onChange={(e) => setI(Number(e.target.value))}
          className="w-full accent-aqua mb-2"
          aria-label="Select VPS core count"
        />
        <div className="flex justify-between text-[12px] font-bold text-black/60 mb-6">
          {vpsConfigurator.tiers.map((t) => (
            <span key={t.cores}>{t.cores} core{t.cores > 1 ? "s" : ""}</span>
          ))}
        </div>
        <div className="bg-aqua rounded-xl px-5 py-4 flex flex-wrap gap-x-6 gap-y-2 text-white text-[13px] font-semibold mb-6">
          <span>CPU cores: <b>{tier.cores}</b></span>
          <span>Memory: <b>{tier.memory}</b></span>
          <span>Storage: <b>{tier.storage}</b></span>
          <span>Bandwidth: <b>{tier.bandwidth}</b></span>
        </div>
        <div className="flex items-center justify-center gap-5 mb-6">
          <span className="text-[14px]">
            Only <span className="font-display font-extrabold text-2xl">NZ${tier.price}</span> <span className="text-black/50 text-[12px]">/month</span>
          </span>
          <a href="/contact/" className="bg-ink text-white font-bold text-[11px] tracking-widest uppercase px-6 py-3 rounded-xl hover:bg-aqua transition-colors">
            Order now
          </a>
        </div>
        <p className="text-[12.5px] text-black/50 text-center">{vpsConfigurator.note}</p>
      </div>
    </section>
  );
}
