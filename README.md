# monitors

A simple, filterable list of monitors that you can buy in **India**, **UAE** and **Pakistan**, with links to sellers in each country.

It starts with the **top 5 monitors for coding**:

| # | Monitor | Size | Resolution | Why it's good for code |
|---|---------|------|------------|------------------------|
| 1 | BenQ RD280U | 28.2" | 3840×2560 (3:2) | Made for programmers; the tall screen shows more lines |
| 2 | Dell UltraSharp U2723QE | 27" | 3840×2160 | Sharp 4K text; USB-C hub with Ethernet and KVM |
| 3 | LG DualUp 28MQ780-B | 27.6" | 2560×2880 (16:18) | Like two stacked QHD screens; editor above terminal |
| 4 | LG 27UP850N-W | 27" | 3840×2160 | Affordable 4K with 96W USB-C |
| 5 | Dell P2723DE | 27" | 2560×1440 | Budget QHD with USB-C hub |

## Where to buy

| Country | Sellers |
|---------|---------|
| 🇮🇳 India | Amazon.in, Flipkart |
| 🇦🇪 UAE | Amazon.ae, Noon |
| 🇵🇰 Pakistan | Daraz.pk, Czone |

Each seller link opens that store's search for the exact model, so the link keeps working when listings change. You can also pin a specific product page per monitor (see below).

> Stock and prices change often and were not checked live. Confirm on the seller page before you buy. The USD price is an approximate list price, used only for sorting and the budget filter.

## Using it

No build step. Open `index.html` in a browser to use it locally.

### Deploying to GitHub Pages

The workflow `.github/workflows/pages.yml` publishes the site on every push to `main`. One-time setup: go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**. The site will be at `https://fahdi.github.io/monitors/`.

Filters: country, resolution (QHD / 4K+), max price, search, and sort by rank, price or size.

## Adding or updating a monitor

All data lives in [`data/monitors.js`](data/monitors.js). Add an entry to `MONITORS`:

```js
{
  id: "brand-model",
  rank: 6,
  brand: "Brand",
  model: "Model",
  query: "Brand Model",          // used to build seller search links
  category: "coding",
  size: 27,
  resolution: "3840x2160",
  aspect: "16:9",
  panel: "IPS",
  refresh: 60,
  usbcWatts: 90,                 // 0 if no USB-C power delivery
  priceUsd: 499,
  why: "One line on why it's good.",
  countries: ["IN", "AE", "PK"],
  official: "https://brand.com/product-page",
  // optional: direct product pages that override the search links
  sellers: { IN: { "amazon-in": "https://www.amazon.in/dp/..." } },
}
```

To add a store, add it to `SELLERS` for that country.
