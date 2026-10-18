(function () {
  const form = document.getElementById("filters");
  const list = document.getElementById("list");
  const count = document.getElementById("count");
  const blurb = document.getElementById("blurb");
  const categories = Object.keys(CATEGORIES);

  form.elements.category.replaceChildren(
    ...categories.map((id) => new Option(CATEGORIES[id].name, id)),
    new Option("All categories", "all")
  );

  function pixels(m) {
    const [w, h] = m.resolution.split("x").map(Number);
    return { w, h };
  }

  function ppi(m) {
    const { w, h } = pixels(m);
    return Math.round(Math.hypot(w, h) / m.size);
  }

  function is4k(m) {
    const { w, h } = pixels(m);
    return w * h >= 3840 * 2160 * 0.9;
  }

  function sellerLinks(m, country) {
    const seller = (m.sellers && m.sellers[country]) || {};
    return SELLERS[country].map((s) => ({
      name: s.name,
      url: seller[s.id] || s.search.replace("{q}", encodeURIComponent(m.query)),
    }));
  }

  function matches(m, f) {
    if (f.category !== "all" && m.category !== f.category) return false;
    if (f.country && !m.countries.includes(f.country)) return false;
    if (f.res === "4k" && !is4k(m)) return false;
    if (f.res === "qhd" && is4k(m)) return false;
    if (f.budget && m.priceUsd > Number(f.budget)) return false;
    if (f.q) {
      const hay = [m.brand, m.model, m.aspect, m.panel, m.resolution].join(" ").toLowerCase();
      if (!hay.includes(f.q.toLowerCase().trim())) return false;
    }
    return true;
  }

  const sorters = {
    rank: (a, b) => categories.indexOf(a.category) - categories.indexOf(b.category) || a.rank - b.rank,
    price: (a, b) => a.priceUsd - b.priceUsd,
    size: (a, b) => b.size - a.size,
    refresh: (a, b) => b.refresh - a.refresh,
  };

  function el(tag, attrs, children) {
    const node = document.createElement(tag);
    Object.entries(attrs || {}).forEach(([k, v]) => (k === "text" ? (node.textContent = v) : node.setAttribute(k, v)));
    (children || []).forEach((c) => node.appendChild(c));
    return node;
  }

  function card(m, country, showCategory) {
    const specs = [
      `${m.size}"`,
      `${m.resolution.replace("x", "×")} (${m.aspect})`,
      `${ppi(m)} PPI`,
      m.panel,
      `${m.refresh}Hz`,
      m.usbcWatts === 0 ? "No USB-C power" : m.usbcWatts ? `USB-C ${m.usbcWatts}W` : null,
      `~$${m.priceUsd}`,
    ].filter(Boolean);

    const countries = country ? [country] : m.countries;
    const buy = el("div", { class: "buy" }, countries.map((c) =>
      el("div", { class: "buy-row" }, [
        el("span", { class: "buy-country", text: `${COUNTRIES[c].flag} ${COUNTRIES[c].name}` }),
        ...sellerLinks(m, c).map((s) =>
          el("a", { href: s.url, target: "_blank", rel: "noopener", text: s.name })
        ),
      ])
    ));

    return el("li", { class: "card" }, [
      el("div", { class: "card-head" }, [
        el("span", { class: "rank", text: showCategory ? `${CATEGORIES[m.category].name} #${m.rank}` : `#${m.rank}` }),
        el("h2", {}, [
          el("a", { href: m.official, target: "_blank", rel: "noopener", text: `${m.brand} ${m.model}` }),
        ]),
      ]),
      el("ul", { class: "specs" }, specs.map((s) => el("li", { text: s }))),
      el("p", { class: "why", text: m.why }),
      buy,
    ]);
  }

  // Keep filters in the URL so a filtered view can be shared or bookmarked.
  function readUrl() {
    const params = new URLSearchParams(location.search);
    for (const [name, value] of params) {
      const field = form.elements[name];
      if (!field) continue;
      field.value = value;
      // A select ignores values it has no option for; fall back to its first option.
      if (field.value !== value) field.selectedIndex = 0;
    }
  }

  function writeUrl(f) {
    const params = new URLSearchParams();
    Object.entries(f).forEach(([k, v]) => {
      if (v && !(k === "sort" && v === "rank") && !(k === "category" && v === categories[0])) params.set(k, v);
    });
    const qs = params.toString();
    history.replaceState(null, "", qs ? `?${qs}` : location.pathname);
  }

  function render() {
    const f = Object.fromEntries(new FormData(form));
    writeUrl(f);
    const items = MONITORS.filter((m) => matches(m, f)).sort(sorters[f.sort] || sorters.rank);
    blurb.textContent = f.category === "all" ? "" : CATEGORIES[f.category].blurb;
    list.replaceChildren(...items.map((m) => card(m, f.country, f.category === "all")));
    count.textContent = items.length
      ? `${items.length} monitor${items.length === 1 ? "" : "s"}`
      : "No monitors match these filters.";
  }

  readUrl();
  form.addEventListener("input", render);
  form.addEventListener("submit", (e) => e.preventDefault());
  render();
})();
