// Checks data/monitors.js for mistakes. Run with: node scripts/validate.js
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const window = {};
vm.runInNewContext(fs.readFileSync(path.join(__dirname, "../data/monitors.js"), "utf8"), { window });
const { MONITORS, SELLERS, COUNTRIES, CATEGORIES } = window;

const errors = [];
const ids = new Set();
const ranks = new Set();
const required = ["id", "rank", "brand", "model", "query", "category", "size", "resolution", "aspect", "panel", "refresh", "priceUsd", "why", "countries", "official"];

for (const m of MONITORS) {
  const name = m.id || JSON.stringify(m).slice(0, 40);
  for (const key of required) if (m[key] === undefined || m[key] === "") errors.push(`${name}: missing ${key}`);
  if (!("usbcWatts" in m)) errors.push(`${name}: missing usbcWatts (use 0 for none, null if unknown)`);
  if (ids.has(m.id)) errors.push(`${name}: duplicate id`);
  ids.add(m.id);
  if (!CATEGORIES[m.category]) errors.push(`${name}: unknown category "${m.category}"`);
  const rankKey = `${m.category}#${m.rank}`;
  if (ranks.has(rankKey)) errors.push(`${name}: duplicate rank ${m.rank} in ${m.category}`);
  ranks.add(rankKey);
  if (!/^\d+x\d+$/.test(m.resolution || "")) errors.push(`${name}: resolution must look like 2560x1440`);
  if (!/^https:\/\//.test(m.official || "")) errors.push(`${name}: official must be an https URL`);
  for (const c of m.countries || []) if (!COUNTRIES[c]) errors.push(`${name}: unknown country "${c}"`);
  for (const [c, links] of Object.entries(m.sellers || {})) {
    for (const [sellerId, url] of Object.entries(links)) {
      if (!(SELLERS[c] || []).some((s) => s.id === sellerId)) errors.push(`${name}: unknown seller "${sellerId}" for ${c}`);
      if (!/^https:\/\//.test(url)) errors.push(`${name}: seller link for ${sellerId} must be https`);
    }
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`OK: ${MONITORS.length} monitors in ${Object.keys(CATEGORIES).length} categories`);
