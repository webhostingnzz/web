import { webHostingApps } from "@/lib/content";

export default function OneClickApps() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto text-center mb-14">
        <h2 className="font-display font-extrabold text-3xl sm:text-[38px] mb-4">{webHostingApps.heading}</h2>
        <p className="text-black/70 max-w-xl mx-auto">{webHostingApps.body}</p>
      </div>
      <div className="max-w-3xl mx-auto bg-white border border-black/10 rounded-2xl p-8">
        <h3 className="font-display font-bold text-lg mb-4">{webHostingApps.includedHeading}</h3>
        <ul className="grid sm:grid-cols-2 gap-3">
          {webHostingApps.included.map((f) => (
            <li key={f} className="flex items-center gap-2.5 text-[14px] font-semibold">
              <span className="w-5 h-5 rounded-full bg-aqua/15 border border-aqua/40 text-aqua flex items-center justify-center text-[10px] font-extrabold flex-none">
                &#10003;
              </span>
              {f}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
