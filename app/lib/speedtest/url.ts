import { promises as dns } from 'dns';
import net from 'net';

// Turns what a visitor typed ("example.co.nz", "https://www.example.co.nz/page")
// into a clean absolute URL, or returns an error message.
export function normaliseUrl(input: string): { url: string; host: string } | { error: string } {
  let raw = String(input || '').trim();
  if (!raw) return { error: 'Please enter a website address.' };
  if (raw.length > 500) return { error: 'That address is too long.' };
  if (!/^[a-z][a-z0-9+.-]*:\/\//i.test(raw)) raw = `https://${raw}`;
  let u: URL;
  try {
    u = new URL(raw);
  } catch {
    return { error: 'That does not look like a website address.' };
  }
  if (u.protocol !== 'http:' && u.protocol !== 'https:') return { error: 'Only http and https addresses can be tested.' };
  if (u.username || u.password) return { error: 'Please remove any login details from the address.' };
  if (u.port && u.port !== '80' && u.port !== '443') return { error: 'Only standard web ports can be tested.' };
  const host = u.hostname.toLowerCase().replace(/\.$/, '');
  if (net.isIP(host.replace(/^\[|\]$/g, ''))) return { error: 'Please enter a domain name rather than an IP address.' };
  if (!/^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(host) || host.length > 253) return { error: 'That does not look like a valid domain name.' };
  if (/(^|\.)(localhost|local|internal|lan|home|corp)$/.test(host)) return { error: 'That address is not on the public internet.' };
  u.hash = '';
  return { url: u.toString(), host };
}

export function isPublicIp(ip: string): boolean {
  if (net.isIPv4(ip)) {
    const [a, b] = ip.split('.').map(Number);
    if (a === 10 || a === 127 || a === 0 || a >= 224) return false;
    if (a === 169 && b === 254) return false;
    if (a === 172 && b >= 16 && b <= 31) return false;
    if (a === 192 && b === 168) return false;
    if (a === 100 && b >= 64 && b <= 127) return false;
    if (a === 192 && b === 0) return false;
    if (a === 198 && (b === 18 || b === 19)) return false;
    return true;
  }
  if (net.isIPv6(ip)) {
    const l = ip.toLowerCase();
    if (l === '::1' || l === '::' || l.startsWith('fc') || l.startsWith('fd') || l.startsWith('fe8') || l.startsWith('fe9') || l.startsWith('fea') || l.startsWith('feb')) return false;
    if (l.startsWith('::ffff:')) return isPublicIp(l.slice(7));
    return true;
  }
  return false;
}

// Resolves the host and makes sure every address is public, so the server
// never makes requests into private networks.
export async function resolvePublic(host: string): Promise<{ ip: string } | { error: string }> {
  let addrs: { address: string; family: number }[];
  try {
    addrs = await dns.lookup(host, { all: true });
  } catch {
    return { error: 'We could not find that domain. Check the spelling and try again.' };
  }
  if (!addrs.length) return { error: 'We could not find that domain. Check the spelling and try again.' };
  if (addrs.some((a) => !isPublicIp(a.address))) return { error: 'That address is not on the public internet.' };
  const v4 = addrs.find((a) => a.family === 4);
  return { ip: (v4 || addrs[0]).address };
}
