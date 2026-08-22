import { footer, nav } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="bg-ink text-white/70 pt-16 pb-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="font-display font-extrabold text-lg text-white mb-3">
              Webhosting<span className="text-aqua">.nz</span>
            </div>
            <p className="text-[13.5px] leading-relaxed max-w-xs">{footer.tagline}</p>
          </div>
          <div>
            <h5 className="text-white text-[12px] font-bold tracking-widest uppercase mb-4">Services</h5>
            <ul className="space-y-2">
              {footer.services.map((s) => (
                <li key={s.label}><a href={s.href} className="text-[13.5px] hover:text-white transition-colors">{s.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-white text-[12px] font-bold tracking-widest uppercase mb-4">Useful links</h5>
            <ul className="space-y-2">
              {footer.links.map((l) => (
                <li key={l.label}><a href={l.href} className="text-[13.5px] hover:text-white transition-colors">{l.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-white text-[12px] font-bold tracking-widest uppercase mb-4">Contact</h5>
            <ul className="space-y-2.5 text-[13.5px]">
              <li>{footer.contact.address}</li>
              <li><a href={`tel:${footer.contact.phone}`} className="hover:text-white transition-colors">{footer.contact.phone}</a></li>
              <li><a href={`mailto:${footer.contact.email}`} className="hover:text-white transition-colors">{footer.contact.email}</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12.5px]">
          <span>{footer.copyright}</span>
          <div className="flex gap-4">
            {footer.social.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
