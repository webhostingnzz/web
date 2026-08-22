import { blogPosts } from "@/lib/content";

export default function BlogList() {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-6">
        {blogPosts.map((post) => (
          <a key={post.href} href={post.href} className="block border border-black/10 rounded-2xl p-6 hover:border-aqua/40 hover:-translate-y-1 transition-all">
            <div className="flex items-center gap-2 text-[11.5px] text-aqua font-bold uppercase tracking-wide mb-3">
              <span>{post.category}</span>
              <span className="text-black/30">&middot;</span>
              <span className="text-black/40 font-medium normal-case tracking-normal">{post.date}</span>
            </div>
            <h3 className="font-display font-bold text-[16px] leading-snug mb-2.5">{post.title}</h3>
            <p className="text-[13.5px] text-black/70 leading-relaxed mb-4">{post.excerpt}</p>
            <span className="text-aqua text-[12.5px] font-bold">Read article &rarr;</span>
          </a>
        ))}
      </div>
    </section>
  );
}
