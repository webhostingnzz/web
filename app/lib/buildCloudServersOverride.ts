import type { CustomPricingItem } from './getCustomPricing';

function renderRows(items: CustomPricingItem[]): string {
  return items
    .map(
      (item) => `
            <tr>
                <td>${item.item_name}</td>
                <td>${item.specs.cpu_ram || ''}</td>
                <td>${item.specs.storage || ''}</td>
                <td>${item.specs.bandwidth || ''}</td>
                <td>NZ$${item.price.toFixed(2)} / Monthly</td>
                <td><a href="${item.order_link || '#'}">Order Now</a></td>
            </tr>`
    )
    .join('\n');
}

// Regenerates the 3 pricing tables (Webhosting NZ Cloud, AWS, GCP) from
// live database data, in the same fixed order they appear in the original
// page. Each table's <tbody> is replaced independently — if a category has
// no database rows yet, that specific table is left completely untouched
// rather than guessing, so a partial data problem can never wipe out an
// entire table that was working fine.
export function applyCloudServersOverride(
  html: string,
  tiersByCategory: Record<string, CustomPricingItem[]>
): string {
  const categoriesInOrder = ['cloud_servers_webhosting_nz', 'cloud_servers_aws', 'cloud_servers_gcp'];
  let result = html;
  let searchFrom = 0;

  for (const category of categoriesInOrder) {
    const items = tiersByCategory[category];
    const tbodyStart = result.indexOf('<tbody>', searchFrom);
    const tbodyEnd = result.indexOf('</tbody>', tbodyStart);
    if (tbodyStart === -1 || tbodyEnd === -1) break;

    if (items && items.length > 0) {
      const newRows = renderRows(items);
      result = result.slice(0, tbodyStart + '<tbody>'.length) + '\n' + newRows + '\n        ' + result.slice(tbodyEnd);
    }

    // Advance the search position past wherever this table ended (using the
    // ORIGINAL html's tbody end position keeps this correct even if the
    // replacement text is a different length than the original).
    searchFrom = result.indexOf('</table>', tbodyStart) + '</table>'.length;
  }

  return result;
}
