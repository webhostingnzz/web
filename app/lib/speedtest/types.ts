// Shared shapes for the NZ Website Speed Test. Kept free of server-only
// imports so client components can use them too.

export type Fix = {
  key: string;
  title: string;
  tip: string;
  savingsMs?: number;
};

export type FieldData = {
  // Real-user data from the Chrome UX Report (only for sites with enough traffic).
  lcpMs: number | null;
  cls: number | null;
  inpMs: number | null;
  ttfbMs: number | null;
  category: string | null;
  scope: 'page' | 'origin';
};

export type StrategyResult = {
  score: number;
  lcpMs: number | null;
  cls: number | null;
  tbtMs: number | null;
  fcpMs: number | null;
  speedIndexMs: number | null;
  serverResponseMs: number | null;
  pageBytes: number | null;
  requests: number | null;
  field: FieldData | null;
  fixes: Fix[];
};

export type HostingInfo = {
  ip: string;
  country: string | null;
  countryCode: string | null;
  city: string | null;
  provider: string | null;
  asn: string | null;
  lat: number | null;
  lon: number | null;
  distanceKm: number | null;
  // Rough extra round-trip time from Auckland, from distance alone.
  estRttMs: number | null;
  // Set when the site sits behind a CDN / hosted platform, where the IP is
  // an edge node rather than the real server.
  cdn: string | null;
};

// Placeholder for a future timing probe run from a server in New Zealand.
export type NzProbeResult = {
  location: string;
  dnsMs: number | null;
  connectMs: number | null;
  tlsMs: number | null;
  ttfbMs: number | null;
  totalMs: number | null;
};

export type PublicResult = {
  id: string;
  status: 'running' | 'done' | 'failed';
  error: string | null;
  url: string;
  host: string;
  finalUrl: string | null;
  createdAt: string;
  grade: string | null;
  score: number | null;
  mobile: StrategyResult | null;
  desktop: StrategyResult | null;
  hosting: HostingInfo | null;
  hostedInNz: boolean | null;
  nzDomain: boolean;
  nzProbe: NzProbeResult | null;
  percentile: { fasterThan: number; sites: number } | null;
};
