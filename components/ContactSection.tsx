"use client";
import { contactMethods, contactForm } from "@/lib/content";

const icons: Record<string, JSX.Element> = {
  headset: <><path d="M4 12v-1a8 8 0 0116 0v1" /><rect x="3" y="12" width="4" height="6" rx="1" /><rect x="17" y="12" width="4" height="6" rx="1" /><path d="M19 18v1a3 3 0 01-3 3h-3" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>,
  pin: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></>,
};

export default function ContactSection() {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
        <div>
          <div className="space-y-5 mb-10">
            {contactMethods.map((m) => (
              <a key={m.title} href={m.href} className="flex items-start gap-4 border border-black/10 rounded-2xl p-5 hover:border-aqua/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-aqua/10 flex items-center justify-center flex-none">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-aqua fill-none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    {icons[m.icon]}
                  </svg>
                </div>
                <div>
                  <p className="font-display font-bold text-[14px] mb-0.5">{m.title}</p>
                  <p className="text-[13.5px] text-black/70">{m.value}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
        <div>
          <h2 className="font-display font-extrabold text-2xl mb-2">{contactForm.heading}</h2>
          <p className="text-[13.5px] text-black/60 mb-6">{contactForm.sub}</p>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input required type="text" placeholder="Your name" className="w-full border border-black/15 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-aqua" />
            <input required type="email" placeholder="Your email" className="w-full border border-black/15 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-aqua" />
            <textarea required placeholder="How can we help?" rows={5} className="w-full border border-black/15 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-aqua" />
            <button type="submit" className="bg-aqua text-white font-bold text-xs tracking-widest uppercase px-8 py-3.5 rounded-xl hover:bg-ink transition-colors">
              Send message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
