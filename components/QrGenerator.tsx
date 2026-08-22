"use client";
import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function QrGenerator() {
  const [businessName, setBusinessName] = useState("Your Business Name");
  const [reviewUrl, setReviewUrl] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    const canvas = cardRef.current?.querySelector("canvas");
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `${businessName.replace(/\s+/g, "-").toLowerCase()}-review-qr.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const qrValue = reviewUrl.trim() || "https://g.page/r/your-business/review";

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        <div>
          <label className="block text-[13px] font-bold text-black/60 mb-2">Business name</label>
          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="w-full border border-black/15 rounded-xl px-4 py-3 text-[14px] mb-5 focus:outline-none focus:border-aqua"
            placeholder="Your Business Name"
          />
          <label className="block text-[13px] font-bold text-black/60 mb-2">Google review link</label>
          <input
            type="url"
            value={reviewUrl}
            onChange={(e) => setReviewUrl(e.target.value)}
            className="w-full border border-black/15 rounded-xl px-4 py-3 text-[14px] mb-2 focus:outline-none focus:border-aqua"
            placeholder="https://g.page/r/your-business/review"
          />
          <p className="text-[12px] text-black/50 mb-6">
            Find this in your Google Business Profile under &quot;Get more reviews&quot;.
          </p>
          <button
            onClick={handleDownload}
            className="bg-aqua text-white font-bold text-xs tracking-widest uppercase px-8 py-3.5 rounded-xl hover:bg-ink transition-colors"
          >
            Download high-res PNG
          </button>
        </div>

        <div className="flex justify-center">
          <div ref={cardRef} className="bg-ink rounded-3xl p-8 w-full max-w-xs text-center text-white">
            <p className="text-[13px] font-semibold mb-2 opacity-80">{businessName}</p>
            <p className="text-aqua text-lg mb-4">&#9733;&#9733;&#9733;&#9733;&#9733;</p>
            <div className="bg-white rounded-2xl p-4 inline-block mb-4">
              <QRCodeCanvas value={qrValue} size={180} bgColor="#ffffff" fgColor="#0A0F1E" level="M" />
            </div>
            <p className="font-display font-bold text-[13px] tracking-wide mb-1">TAP TO REVIEW US ON</p>
            <p className="font-display font-extrabold text-lg mb-3">GOOGLE</p>
            <p className="text-[11px] opacity-60 tracking-widest uppercase">Scan me</p>
          </div>
        </div>
      </div>
    </section>
  );
}
