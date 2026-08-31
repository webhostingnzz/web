// Renders a JSON-LD <script> tag. JSON.stringify already escapes quotes
// correctly for this context — the one extra thing worth guarding against
// is a literal "</script>" appearing inside string content (e.g. in a
// blog post title), which would prematurely close the tag and break the
// page. Replacing "<" with its unicode escape neutralizes that risk
// without changing how the data reads to search engines.
export default function JsonLd({ data }: { data: object | object[] }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
