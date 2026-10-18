// Monitor catalogue. Edit this file to add or update monitors.
//
// Each monitor lists the countries it is sold in. Seller links are built from
// the templates in SELLERS (see below) using `query`, unless a monitor gives an
// explicit `url` for a seller.
//
// `priceUsd` is the approximate launch/list price in USD, used only to sort and
// filter by budget. Local prices change often, so always check the seller page.

window.SELLERS = {
  IN: [
    { id: "amazon-in", name: "Amazon.in", search: "https://www.amazon.in/s?k={q}" },
    { id: "flipkart", name: "Flipkart", search: "https://www.flipkart.com/search?q={q}" },
  ],
  AE: [
    { id: "amazon-ae", name: "Amazon.ae", search: "https://www.amazon.ae/s?k={q}" },
    { id: "noon", name: "Noon", search: "https://www.noon.com/uae-en/search/?q={q}" },
  ],
  PK: [
    { id: "daraz", name: "Daraz.pk", search: "https://www.daraz.pk/catalog/?q={q}" },
    { id: "czone", name: "Czone", search: "https://www.czone.com.pk/search.aspx?kw={q}" },
  ],
};

window.COUNTRIES = {
  IN: { name: "India", flag: "🇮🇳" },
  AE: { name: "UAE", flag: "🇦🇪" },
  PK: { name: "Pakistan", flag: "🇵🇰" },
};

window.MONITORS = [
  {
    id: "benq-rd280u",
    rank: 1,
    brand: "BenQ",
    model: "RD280U",
    query: "BenQ RD280U",
    category: "coding",
    size: 28.2,
    resolution: "3840x2560",
    aspect: "3:2",
    panel: "IPS",
    refresh: 60,
    usbcWatts: 90,
    priceUsd: 599,
    why: "Built for programmers: a tall 3:2 screen shows more lines of code, with a matte anti-glare coating, coding colour modes, and a backlight on the rear wall.",
    countries: ["IN", "AE", "PK"],
    official: "https://www.benq.com/en-us/monitor/programming/rd280u.html",
  },
  {
    id: "dell-u2723qe",
    rank: 2,
    brand: "Dell",
    model: "UltraSharp U2723QE",
    query: "Dell U2723QE",
    category: "coding",
    size: 27,
    resolution: "3840x2160",
    aspect: "16:9",
    panel: "IPS Black",
    refresh: 60,
    usbcWatts: 90,
    priceUsd: 579,
    why: "Very sharp 4K text with strong contrast. Its USB-C hub with Ethernet and KVM switch makes it a one-cable desk for a laptop.",
    countries: ["IN", "AE", "PK"],
    official: "https://www.dell.com/en-in/shop/dell-ultrasharp-27-4k-usb-c-hub-monitor-u2723qe/apd/210-bcxk/monitors-monitor-accessories",
  },
  {
    id: "lg-28mq780",
    rank: 3,
    brand: "LG",
    model: "DualUp 28MQ780-B",
    query: "LG 28MQ780",
    category: "coding",
    size: 27.6,
    resolution: "2560x2880",
    aspect: "16:18",
    panel: "Nano IPS",
    refresh: 60,
    usbcWatts: 90,
    priceUsd: 699,
    why: "Equal to two stacked 21.5\" QHD screens. Works well for an editor above a terminal or long files, and pairs nicely beside a laptop.",
    countries: ["IN", "AE", "PK"],
    official: "https://www.lg.com/us/monitors/lg-28mq780-b-dualup-monitor",
  },
  {
    id: "lg-27up850n",
    rank: 4,
    brand: "LG",
    model: "27UP850N-W",
    query: "LG 27UP850N",
    category: "coding",
    size: 27,
    resolution: "3840x2160",
    aspect: "16:9",
    panel: "IPS",
    refresh: 60,
    usbcWatts: 96,
    priceUsd: 449,
    why: "Affordable 27\" 4K with 96W USB-C charging. Gets you most of the UltraSharp's text clarity for less money.",
    countries: ["IN", "AE", "PK"],
    official: "https://www.lg.com/in/monitors/uhd-4k-5k/27up850n-w/",
  },
  {
    id: "dell-p2723de",
    rank: 5,
    brand: "Dell",
    model: "P2723DE",
    query: "Dell P2723DE",
    category: "coding",
    size: 27,
    resolution: "2560x1440",
    aspect: "16:9",
    panel: "IPS",
    refresh: 60,
    usbcWatts: 90,
    priceUsd: 399,
    why: "Budget pick: 27\" QHD at 100% scaling (about 109 PPI) with a USB-C hub and Ethernet. Text is crisp enough for all-day coding without paying for 4K.",
    countries: ["IN", "AE", "PK"],
    official: "https://www.dell.com/en-in/shop/dell-27-usb-c-hub-monitor-p2723de/apd/210-bdmp/monitors-monitor-accessories",
  },
];
