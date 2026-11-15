/*! ArcSite ROI by pricing plan (pricing page) calculator v0.3.3 | Styles map to the OW design system variables in Webflow. */
(function () {
  if (window.ArcsiteROIPricing) return;
  var VERSION = "0.3.3";
  var VARIANT = "pricing";
  var STYLE_ID = "arcsite-roi-pricing-styles";
  var CSS = ".aroi {\n  --canvas: var(--_ow-colors---surface--primary, #faf9f9);\n  --wash: var(--_ow-colors---surface--secondary, #efeeed);\n  --paper: #ffffff;\n  --ink: var(--_ow-colors---text--primary, #2d2b29);\n  --text-2: var(--_ow-colors---text--secondary, #68645f);\n  --text-3: var(--_ow-colors---text--secondary, #68645f);\n  --line: var(--_ow-colors---line--default, #d5d2cf);\n  --line-strong: var(--_ow-colors---line--strong, #bfbcb8);\n  --input: #958f88;\n  --input-bg: #ffffff;\n  --orange: var(--_ow-colors---brand--accent, #fc4c02);\n  --orange-600: var(--_ow-colors---interactive--primary--hover, #ca3d02);\n  --sky-600: var(--_ow-colors---focus--ring, #fc4c02);\n  --sky-100: #fedaca;\n  --green: var(--_ow-colors---tag--story--text, #0b8150);\n  --font: var(--font--brand, Inter), ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Arial, sans-serif;\n  --fs-title: var(--_type-scale---font-size--header-4, 21px);\n  --fs-title-lg: var(--_type-scale---font-size--header-3, 28px);\n  --fs-big: var(--_type-scale---font-size--header-2, 32px);\n  --fs-big-lg: var(--_type-scale---font-size--header-1, 40px);\n  --fs-body: var(--_type-scale---font-size--body, 16px);\n  --fs-small: var(--_type-scale---font-size--body-small, 14px);\n  --fs-caption: var(--_type-scale---font-size--caption, 12px);\n}\n.aroi label { margin-bottom: 0; font-weight: 400; }\n.aroi h3, .aroi p { margin: 0; }\n.aroi { container-type: inline-size; font-family: var(--font); color: var(--ink); }\n.aroi * { box-sizing: border-box; }\n.aroi .wrap { display: grid; grid-template-columns: 1fr; border: 1px solid var(--line-strong); background: var(--paper); }\n@container (min-width: 760px) { .aroi .wrap { grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr); } }\n.aroi .in { padding: 24px; display: grid; gap: 20px; align-content: start; }\n.aroi .out { padding: 24px; display: grid; gap: 18px; align-content: start; background: var(--wash); border-top: 1px solid var(--line); }\n@container (min-width: 760px) { .aroi .out { border-top: 0; border-left: 1px solid var(--line); } }\n.aroi .title { font-size: var(--fs-title); font-weight: 700; letter-spacing: -0.01em; line-height: 1.15; }\n@container (min-width: 760px) { .aroi .title { font-size: var(--fs-title-lg); } }\n.aroi .sub { font-size: var(--fs-small); color: var(--text-2); margin-top: -10px; }\n\n.aroi .seg { display: inline-grid; grid-auto-flow: column; grid-auto-columns: 1fr; border: 1px solid var(--input); border-radius: 4px; overflow: hidden; background: var(--paper); }\n.aroi .seg label { position: relative; text-align: center; padding: 10px 12px; font-size: var(--fs-small); cursor: pointer; border-left: 1px solid var(--line); white-space: nowrap; }\n.aroi .seg label:first-child { border-left: 0; }\n.aroi .seg input { position: absolute; opacity: 0; inset: 0; margin: 0; cursor: pointer; }\n.aroi .seg label:has(input:checked) { background: var(--ink); color: var(--canvas); font-weight: 600; }\n.aroi .seg label:has(input:focus-visible) { outline: 2px solid var(--sky-600); outline-offset: -2px; }\n.aroi .seg.full { display: grid; width: 100%; }\n@container (max-width: 420px) { .aroi .seg label { padding: 10px 4px; font-size: 13px; } .aroi .in, .aroi .out { padding: 20px 16px; } }\n.aroi .bill { display: flex; flex-direction: column; gap: 8px; align-items: flex-start; }\n.aroi .save { font-size: var(--fs-small); color: var(--text-2); min-height: 1.2em; }\n.aroi .save.off { visibility: hidden; }\n\n.aroi .row { display: grid; gap: 8px; }\n.aroi .lab { font-size: var(--fs-small); display: flex; justify-content: space-between; gap: 12px; align-items: baseline; }\n.aroi .lab b { font-variant-numeric: tabular-nums; white-space: nowrap; }\n.aroi .hint { font-size: var(--fs-caption); color: var(--text-3); line-height: 1.35; }\n.aroi input[type=\"range\"] { width: 100%; accent-color: var(--orange); margin: 0; }\n.aroi .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 14px 12px; }\n.aroi .grid > div { display: grid; }\n.aroi .f { display: grid; gap: 6px; min-width: 0; align-content: end; }\n.aroi .f label { line-height: 1.3; }\n.aroi details .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }\n.aroi .f label { font-size: 13px; color: var(--text-2); }\n.aroi .f input { height: 42px; width: 100%; border: 1px solid var(--input); border-radius: 4px; background: var(--input-bg); padding: 0 10px; font-family: var(--font); font-size: var(--fs-body); font-weight: 400; color: var(--ink); font-variant-numeric: tabular-nums; }\n.aroi .f input:focus { outline: none; border-color: var(--sky-600); box-shadow: 0 0 0 4px var(--sky-100); }\n.aroi details { border-top: 1px solid var(--line); padding-top: 14px; }\n.aroi summary { cursor: pointer; font-size: var(--fs-small); font-weight: 600; }\n.aroi details .grid { margin-top: 14px; }\n.aroi details .row { margin-top: 14px; }\n.aroi [hidden] { display: none !important; }\n\n.aroi .head { display: grid; gap: 10px; }\n.aroi .big { font-weight: 700; font-size: var(--fs-big); line-height: 1.05; font-family: var(--font); letter-spacing: -0.02em; font-variant-numeric: tabular-nums; }\n@container (min-width: 760px) { .aroi .big { font-size: var(--fs-big-lg); } }\n.aroi .big .plus { color: var(--text-3); font-weight: 500; }\n.aroi .worth { font-size: var(--fs-small); color: var(--text-2); }\n.aroi .period { display: flex; align-items: center; gap: 10px; font-size: 13px; color: var(--text-2); }\n.aroi .sw { position: relative; width: 44px; height: 24px; border-radius: 12px; background: var(--ink); border: 0; cursor: pointer; padding: 0; }\n.aroi .sw::after { content: \"\"; position: absolute; top: 3px; left: 3px; width: 18px; height: 18px; border-radius: 50%; background: var(--canvas); transition: left .15s; }\n.aroi .sw[aria-checked=\"true\"]::after { left: 23px; }\n.aroi .period .on { color: var(--ink); font-weight: 600; }\n@media (prefers-reduced-motion: reduce) { .aroi .sw::after { transition: none; } }\n\n.aroi .be { padding: 12px 14px; background: var(--paper); border-left: 3px solid var(--orange); font-size: var(--fs-small); line-height: 1.45; }\n.aroi .be b { font-variant-numeric: tabular-nums; }\n.aroi .lv { display: grid; }\n.aroi .lv > div { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 2px 12px; padding: 9px 0; border-bottom: 1px solid var(--line); font-size: var(--fs-small); align-items: baseline; }\n.aroi .lv > div:first-child { border-top: 1px solid var(--line); }\n.aroi .lv .v { font-weight: 600; font-variant-numeric: tabular-nums; white-space: nowrap; }\n.aroi .lv .off { color: var(--text-3); }\n.aroi .lv .off .v { font-weight: 500; }\n.aroi .lv .up { grid-column: 1 / -1; font-size: var(--fs-caption); color: #a83302; }\n.aroi .incl { display: grid; gap: 6px; font-size: 13px; color: var(--text-2); }\n.aroi .incl b { color: var(--ink); font-size: 13px; }\n.aroi .incl ul { margin: 0; padding: 0; list-style: none; display: grid; gap: 4px; }\n.aroi .incl li { padding-left: 18px; position: relative; line-height: 1.4; }\n.aroi .incl li::before { content: \"\"; position: absolute; left: 2px; top: 4px; width: 8px; height: 4px; border-left: 2px solid var(--green); border-bottom: 2px solid var(--green); transform: rotate(-45deg); }\n.aroi .cost { font-size: 13px; color: var(--text-2); line-height: 1.45; border-top: 1px solid var(--line); padding-top: 14px; }\n.aroi .cost b { color: var(--ink); font-variant-numeric: tabular-nums; }\n.aroi .ctas { display: flex; gap: 10px; flex-wrap: wrap; }\n.aroi .btn, .aroi .btn:visited { display: inline-flex; align-items: center; justify-content: center; height: 44px; padding: 0 18px; border-radius: 4px; font-family: var(--font); font-size: var(--fs-body); font-weight: 600; text-decoration: none; cursor: pointer; border: 1px solid #ca3d02; background: #ca3d02; color: #ffffff; }\n.aroi .btn:hover { background: #a83302; border-color: #a83302; }\n.aroi .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }\n.aroi .fine { font-size: var(--fs-caption); color: var(--text-3); line-height: 1.45; }\n.roi-demo-toggle { display: flex; flex-wrap: wrap; gap: 8px 16px; align-items: center; margin-bottom: 24px; font-family: var(--font--brand, Inter), system-ui, sans-serif; }\n.roi-demo-toggle .roi-demo-l { font-size: var(--_type-scale---font-size--caption, 12px); color: var(--_ow-colors---text--secondary, #68645f); width: 100%; }\n.roi-demo-toggle .seg { display: inline-grid; grid-auto-flow: column; border: 1px solid #958f88; border-radius: 4px; overflow: hidden; background: #fff; }\n.roi-demo-toggle label { position: relative; margin: 0; padding: 10px 14px; font-size: 14px; font-weight: 400; cursor: pointer; color: var(--_ow-colors---text--primary, #2d2b29); }\n.roi-demo-toggle label + label { border-left: 1px solid var(--_ow-colors---line--default, #d5d2cf); }\n.roi-demo-toggle input { position: absolute; inset: 0; opacity: 0; margin: 0; cursor: pointer; }\n.roi-demo-toggle label:has(input:checked) { background: var(--_ow-colors---text--primary, #2d2b29); color: var(--_ow-colors---surface--primary, #faf9f9); font-weight: 600; }\n.roi-demo-toggle .roi-demo-save { font-size: 14px; color: var(--_ow-colors---text--secondary, #68645f); }\n";
  /* ================= Config ================= */
  var PLANS = {
    drawpro:   { name: "Draw Pro",  monthly: 34.99,  yearly: 30,  steps: ["draw"],
                 incl: ["Satellite maps and AR room scanner", "Export to PDF, DXF, and DWG", "Shared team account and cloud backup"] },
    takeoff:   { name: "Takeoff",   monthly: 119.99, yearly: 99,  steps: ["draw", "takeoff", "material"],
                 incl: ["Digital price book and product bundles", "Forms and template libraries", "Reports and dashboards"] },
    estimates: { name: "Estimates", monthly: 159.99, yearly: 129, steps: ["draw", "takeoff", "material", "proposal", "speed"],
                 incl: ["Digital approvals and eSign", "Digital payments and client financing", "Change orders and invoicing"] }
  };
  var ORDER = ["drawpro", "takeoff", "estimates"];
  var SCEN = {
    conservative: { draw: 0.30, takeoff: 0.50, proposal: 0.40, material: 0.30, lift: 0.05 },
    expected:     { draw: 0.50, takeoff: 0.70, proposal: 0.60, material: 0.50, lift: 0.15 },
    optimistic:   { draw: 0.70, takeoff: 0.85, proposal: 0.80, material: 0.70, lift: 0.30 }
  };
  var SPLIT = { quotes: { draw: 0.4, takeoff: 0.3, proposal: 0.3 }, noquotes: { draw: 0.7, takeoff: 0.3, proposal: 0 } };
  var TRADES = {
    fence:      { label: "fence contractors",      jobs: 40, avg: 6500,  hours: 2.5, labor: 45, margin: 34, close: 30, inn: 4, mistakes: 400, src: "2026 Fence Business Report, case studies" },
    deck:       { label: "deck builders",          jobs: 25, avg: 18000, hours: 3.5, labor: 45, margin: 35, close: 30, inn: 4, mistakes: 600, src: "Placeholder" },
    foundation: { label: "foundation repair pros", jobs: 30, avg: 9000,  hours: 3,   labor: 50, margin: 45, close: 35, inn: 4, mistakes: 300, src: "Placeholder" },
    turf:       { label: "turf installers",        jobs: 30, avg: 12000, hours: 3,   labor: 45, margin: 40, close: 30, inn: 4, mistakes: 500, src: "Placeholder" },
    gutters:    { label: "gutter contractors",     jobs: 60, avg: 2500,  hours: 1.5, labor: 40, margin: 40, close: 40, inn: 5, mistakes: 200, src: "Placeholder" }
  };
  var LEVERS = [
    { id: "draw", name: "Measuring and drawing", plan: "drawpro" },
    { id: "takeoff", name: "Takeoff and pricing", plan: "takeoff" },
    { id: "proposal", name: "Proposals", plan: "estimates", q: true },
    { id: "material", name: "Fewer material mistakes", plan: "takeoff" },
    { id: "speed", name: "Potential wins from faster quotes", plan: "estimates", q: true }
  ];
  var LIMITS = { jobs: [0, 2000], avg: [0, 5000000], hours: [0, 24], labor: [0, 500], margin: [0, 100], close: [0, 100], mistakes: [0, 1000000] };

  /* ================= Helpers ================= */
  var usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  var usd2 = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 2 });
  var int = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
  function num(v) { var n = parseFloat(String(v).replace(/[^0-9.\-]/g, "")); return isNaN(n) ? 0 : n; }
  function clamp(n, r) { return Math.min(Math.max(n, r[0]), r[1]); }
  function one(n) { return n < 10 ? String(Math.round(n * 10) / 10) : int.format(n); }
  function track(ev, d) { var o = { event: ev, calculator: "plan_roi", model_version: VERSION }; for (var k in d) o[k] = d[k]; try { window.dataLayer = window.dataLayer || []; window.dataLayer.push(o); } catch (e) {} try { document.dispatchEvent(new CustomEvent("arcsite:roi", { detail: o })); } catch (e) {} }
  var uid = 0;

  /* ================= Component ================= */
  function mount(root, opts) {
    var id = "aroi-" + VARIANT + "-" + (++uid);
    var t = TRADES[opts.trade || "fence"];
    var st = {
      plan: opts.plan || "estimates", bill: opts.billing || "yearly", n: 3, quotes: true, scen: "expected", per: "year",
      jobs: t.jobs, avg: t.avg, hours: t.hours, labor: t.labor, margin: t.margin, close: t.close, inn: t.inn, mistakes: t.mistakes
    };
    var title = opts.variant === "pricing" ? "See how ArcSite pays for itself" : "See how ArcSite moves the needle for your bottom line";
    var sub = "Just choose a plan, add your specifics, and see the ROI.";
    var hl = Math.min(Math.max(parseInt(opts.headingLevel, 10) || 2, 2), 6);

    function field(k, label, im) { return '<div class="f"><label for="' + id + k + '">' + label + '</label><input id="' + id + k + '" data-k="' + k + '" inputmode="' + (im || "numeric") + '"></div>'; }

    root.className = "aroi";
    root.innerHTML =
      '<div class="wrap">' +
      '<div class="in">' +
        '<h' + hl + ' class="title">' + title + '</h' + hl + '><p class="sub">' + sub + '</p>' +
        '<div class="bill"><div class="seg" role="radiogroup" aria-label="Billing">' +
          '<label><input type="radio" name="' + id + 'b" value="monthly">Billed monthly</label>' +
          '<label><input type="radio" name="' + id + 'b" value="yearly">Billed yearly</label></div><span class="save" data-o="save"></span></div>' +
        '<div class="seg full" role="radiogroup" aria-label="Plan">' +
          ORDER.map(function (p) { return '<label><input type="radio" name="' + id + 'p" value="' + p + '">' + PLANS[p].name + '</label>'; }).join("") +
        '</div>' +
        '<div class="row"><div class="lab"><label for="' + id + 'n">People who use ArcSite</label><b data-o="nv"></b></div>' +
          '<input type="range" id="' + id + 'n" min="1" max="25" step="1"></div>' +
        '<div class="row"><span class="lab" id="' + id + 'ql">Do you send quotes or proposals?</span>' +
          '<div class="seg" role="radiogroup" aria-labelledby="' + id + 'ql" style="width:max-content">' +
          '<label><input type="radio" name="' + id + 'q" value="yes">Yes</label><label><input type="radio" name="' + id + 'q" value="no">No</label></div></div>' +
        '<div class="grid">' + field("jobs", "Jobs per month") + '<div data-q="1">' + field("avg", "Average job size ($)") + '</div>' + field("hours", "Hours per job", "decimal") + '</div>' +
        '<details open><summary>Fine-tune</summary>' +
          '<div class="grid">' + field("labor", "Labor cost per hour ($)") + field("mistakes", "Material mistakes per month ($)") +
          '<div data-q="1">' + field("margin", "Gross margin (%)", "decimal") + '</div><div data-q="1">' + field("close", "Close rate (%)", "decimal") + '</div></div>' +
          '<div class="row" data-q="1"><div class="lab"><label for="' + id + 'inn">Of your last 10 quotes, how many went out within 24 hours?</label><b data-o="innv"></b></div>' +
          '<input type="range" id="' + id + 'inn" min="0" max="10" step="1"></div>' +
        '</details>' +
      '</div>' +
      '<div class="out">' +
        '<p class="sr-only" aria-live="polite" data-o="live"></p>' +
        '<div class="head">' +
          '<div class="period"><span data-o="pm">per month</span><button type="button" class="sw" role="switch" aria-label="Show per year" data-o="sw"></button><span data-o="py">per year</span></div>' +
          '<div class="big" data-o="big"></div><div class="worth" data-o="worth"></div>' +
        '</div>' +
        '<div class="seg full" role="radiogroup" aria-label="Scenario">' +
          ["conservative", "expected", "optimistic"].map(function (s) { return '<label><input type="radio" name="' + id + 's" value="' + s + '">' + s.charAt(0).toUpperCase() + s.slice(1) + '</label>'; }).join("") +
        '</div>' +
        '<div class="be" data-o="be"></div>' +
        '<div class="lv" data-o="lv"></div>' +
        '<div class="incl"><b data-o="inclh"></b><ul data-o="incl"></ul></div>' +
        '<div class="cost" data-o="cost"></div>' +
        '<div class="ctas"><a class="btn" data-o="demo" href="https://www.arcsite.com/book-demo">Book a demo</a></div>' +
        '<p class="fine">Results are estimates, not guarantees. They represent the potential time and cost savings you could see by using ArcSite for the steps included in your selected plan, such as measuring, drawing, takeoffs, and proposals, based on the numbers you enter and the assumptions shown. Actual results depend on factors like your team, your processes, how fully ArcSite is used across those steps, and your market. Prices are from arcsite.com/pricing, exclude taxes and add-ons, and may change.</p>' +
      '</div></div>';

    function q(s) { return root.querySelector(s); }
    function o(k) { return root.querySelector('[data-o="' + k + '"]'); }
    var inputs = root.querySelectorAll("input[data-k]");
    inputs.forEach(function (inp) {
      var k = inp.dataset.k;
      inp.value = st[k] >= 1000 ? st[k].toLocaleString("en-US") : st[k];
      inp.addEventListener("input", function () { st[k] = clamp(num(inp.value), LIMITS[k]); change(); });
      inp.addEventListener("blur", function () { inp.value = st[k] >= 1000 ? st[k].toLocaleString("en-US") : st[k]; });
    });
    var nR = q("#" + id + "n"), innR = q("#" + id + "inn");
    nR.value = st.n; innR.value = st.inn;
    nR.addEventListener("input", function () { st.n = num(nR.value); change(); });
    innR.addEventListener("input", function () { st.inn = num(innR.value); change(); });
    function radios(name, key, ev) {
      root.querySelectorAll('input[name="' + id + name + '"]').forEach(function (r) {
        r.checked = (key === "quotes" ? (st.quotes ? "yes" : "no") : st[key]) === r.value;
        r.addEventListener("change", function () {
          if (key === "quotes") st.quotes = r.value === "yes"; else st[key] = r.value;
          if (ev) track(ev, { variant: opts.variant, value: r.value });
          change();
        });
      });
    }
    radios("b", "bill", "calc_billing_toggle"); radios("p", "plan", "calc_plan_select"); radios("s", "scen", "calc_scenario_select"); radios("q", "quotes", "calc_quotes_toggle");
    var sw = o("sw");
    sw.addEventListener("click", function () { st.per = st.per === "year" ? "month" : "year"; change(); });
    o("demo").addEventListener("click", function () { track("calc_demo_click", snapshot()); });

    var last = {};
    var liveTimer = null;
    function snapshot() { var s = {}; for (var k in last) s[k] = last[k]; s.variant = opts.variant; s.trade = opts.trade || ""; return s; }

    function render() {
      var P = PLANS[st.plan], S = SCEN[st.scen], sp = st.quotes ? SPLIT.quotes : SPLIT.noquotes;
      var has = function (k) { return P.steps.indexOf(k) > -1; };
      var base = st.jobs * st.hours;
      var lever = {
        draw: base * sp.draw * S.draw, takeoff: base * sp.takeoff * S.takeoff, proposal: base * sp.proposal * S.proposal
      };
      var late = st.quotes ? st.jobs * (10 - st.inn) / 10 : 0;
      var money = {
        draw: lever.draw * st.labor, takeoff: lever.takeoff * st.labor, proposal: lever.proposal * st.labor,
        material: st.mistakes * S.material,
        speed: late * (st.close / 100) * S.lift * st.avg * (st.margin / 100)
      };
      var hrsMo = (has("draw") ? lever.draw : 0) + (has("takeoff") ? lever.takeoff : 0) + (has("proposal") && st.quotes ? lever.proposal : 0);
      var cashMo = (has("material") ? money.material : 0) + (has("speed") && st.quotes ? money.speed : 0);
      var laborMo = hrsMo * st.labor;
      var costMo = (st.bill === "yearly" ? P.yearly : P.monthly) * st.n, costYr = costMo * 12;
      var m = st.per === "year" ? 12 : 1;

      // Headline
      o("big").innerHTML = int.format(hrsMo * m) + " hours" + (cashMo > 0 ? ' <span class="plus">+</span> ' + usd.format(cashMo * m) : "");
      o("worth").textContent = (cashMo > 0 ? "Potential hours back and added profit, " : "Potential hours back, ") + "which could be worth about " + usd.format((laborMo + cashMo) * m) + " a " + st.per + ".";
      sw.setAttribute("aria-checked", st.per === "year" ? "true" : "false");
      sw.setAttribute("aria-label", st.per === "year" ? "Show per month" : "Show per year");
      o("pm").className = st.per === "month" ? "on" : ""; o("py").className = st.per === "year" ? "on" : "";

      // Break-even
      var gpJob = st.avg * st.margin / 100;
      var beH = st.labor > 0 ? costMo / st.labor : 0;
      var parts = ["<b>" + one(beH) + " hours</b> saved a month"];
      if (st.quotes && gpJob > 0) { var bj = costYr / gpJob; parts.push("<b>" + one(bj) + (bj <= 1 ? " extra job" : " extra jobs") + "</b> a year"); }
      var net = (laborMo + cashMo) * 12 - costYr;
      o("be").innerHTML = "The plan could pay for itself with " + parts.join(" or ") + ". " +
        (net > 0 ? "Potential net return: <b>" + usd.format(net) + " a year</b>, about " + one((laborMo + cashMo) * 12 / costYr) + "x what you pay." : "At these numbers it may not pay back yet. A smaller plan could be a better fit.");

      // Levers
      o("lv").innerHTML = LEVERS.filter(function (l) { return !l.q || st.quotes; }).map(function (l) {
        var on = has(l.id), v = money[l.id];
        return '<div class="' + (on ? "" : "off") + '"><span>' + l.name + '</span><span class="v">' + (on ? "" : "+") + usd.format(v) + " / mo</span>" +
          (on ? "" : '<span class="up">Included in ' + PLANS[l.plan].name + "</span>") + "</div>";
      }).join("");

      // Included
      o("inclh").textContent = "Plus, included in " + P.name + ":";
      o("incl").innerHTML = P.incl.map(function (x) { return "<li>" + x + "</li>"; }).join("");

      // Cost line
      var save = (P.monthly - P.yearly) * st.n * 12;
      o("cost").innerHTML = "Plan cost: " + P.name + " for " + st.n + (st.n === 1 ? " person" : " people") + ": <b>" + usd.format(costMo) + " a month</b>, billed " + st.bill +
        " (" + usd.format(costYr) + " a year). " + (st.bill === "yearly" ? "Annual billing saves " + usd.format(save) + " a year on the subscription vs. monthly." : "Annual billing would save " + usd.format(save) + " a year on the subscription.");
      if (o("save")) { o("save").textContent = "Annual plans save up to ~20% on the subscription price"; o("save").className = "save" + (st.bill === "yearly" ? "" : " off"); }
      o("nv").textContent = st.n;
      if (o("innv")) o("innv").textContent = st.inn + " of 10";
      root.querySelectorAll("[data-q]").forEach(function (e) { e.hidden = !st.quotes; });

      var valueYr = (laborMo + cashMo) * 12;
      var tradeName = opts.trade ? opts.trade.charAt(0).toUpperCase() + opts.trade.slice(1) + " \u00b7 " : "";
      var summary = tradeName + P.name + " \u00b7 " + st.n + (st.n === 1 ? " seat" : " seats") + " \u00b7 billed " + st.bill +
        " | " + int.format(st.jobs) + " jobs/mo" + (st.quotes ? " at " + usd.format(st.avg) : "") + ", " + st.hours + " hrs/job" + (st.quotes ? "" : ", no quotes") +
        " | " + st.scen.charAt(0).toUpperCase() + st.scen.slice(1) + ": " + int.format(hrsMo * 12) + " hrs" + (cashMo > 0 ? " + " + usd.format(cashMo * 12) : "") +
        "/yr potential, net return " + usd.format(net) + "/yr";
      clearTimeout(liveTimer);
      liveTimer = setTimeout(function () {
        o("live").textContent = "Potential " + int.format(hrsMo * 12) + " hours back" + (cashMo > 0 ? " and " + usd.format(cashMo * 12) + " added profit" : "") +
          " per year with " + P.name + ". Potential net return " + usd.format(net) + " a year.";
      }, 1200);
      last = { plan: st.plan, plan_name: P.name, billing: st.bill, seats: st.n, scenario: st.scen, sends_quotes: st.quotes, jobs_per_month: st.jobs,
        avg_job_size: st.avg, hours_per_job: st.hours, labor_cost: st.labor, gross_margin: st.margin, close_rate: st.close,
        quotes_within_24h: st.inn, material_mistakes: st.mistakes,
        hours_saved_month: Math.round(hrsMo), value_year: Math.round(valueYr), plan_cost_year: Math.round(costYr), net_return_year: Math.round(net),
        summary: summary };
    }

    // calc_complete fires once per placement per visit (browser tab session),
    // after the visitor has changed something and left the result on screen for 3 seconds.
    // calc_complete fires once per calculator per page view: after the visitor has changed
    // something, and the result panel has then stayed on screen, unchanged, for 3 seconds.
    var started = false, completed = false, timer = null, inView = true;
    function armComplete() {
      clearTimeout(timer);
      if (!started || completed || !inView) return;
      timer = setTimeout(function () {
        if (completed || !inView) return;
        completed = true;
        track("calc_complete", snapshot());
      }, 3000);
    }
    if ("IntersectionObserver" in window) {
      inView = false;
      new IntersectionObserver(function (entries) {
        inView = entries[0].isIntersecting;
        armComplete();
      }, { threshold: 0.6 }).observe(o("big").parentNode);
    }
    function change() {
      if (!started) { started = true; track("calc_start", { variant: opts.variant }); }
      render();
      armComplete();
    }

    if (opts.syncBilling) {
      document.addEventListener("arcsite:billing", function (e) {
        if (e.detail !== "monthly" && e.detail !== "yearly") return;
        st.bill = e.detail;
        root.querySelectorAll('input[name="' + id + 'b"]').forEach(function (r) { r.checked = r.value === st.bill; });
        render();
      });
    }
    render();
  }

  /* ================= Styles ================= */
  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;
    var s = document.createElement("style");
    s.id = STYLE_ID;
    s.textContent = CSS;
    (document.head || document.documentElement).appendChild(s);
  }

  /* ================= Auto-mount ================= */
  function attr(el, k) { var v = el.getAttribute(k); return v === null || v === "" ? undefined : v; }
  function start() {
    injectStyles();
    document.querySelectorAll("[data-roi-demo-toggle]").forEach(function (el) {
      if (el.getAttribute("data-roi-mounted")) return;
      el.setAttribute("data-roi-mounted", "true");
      el.className = "roi-demo-toggle";
      el.innerHTML = '<span class="roi-demo-l">Test only: stands in for the pricing page billing toggle</span>' +
        '<div class="seg" role="radiogroup" aria-label="Pricing page billing"><label><input type="radio" name="roi-demo-bill" value="monthly">Billed monthly</label>' +
        '<label><input type="radio" name="roi-demo-bill" value="yearly" checked>Billed yearly</label></div>' +
        '<span class="roi-demo-save">Annual plans save up to ~20% on the subscription price</span>';
      el.querySelectorAll("input").forEach(function (r) {
        r.addEventListener("change", function () { document.dispatchEvent(new CustomEvent("arcsite:billing", { detail: r.value })); });
      });
    });
    document.querySelectorAll('[data-arcsite-roi="' + VARIANT + '"]').forEach(function (el) {
      if (el.getAttribute("data-roi-mounted")) return;
      el.setAttribute("data-roi-mounted", "true");
      mount(el, {
        variant: VARIANT,
        trade: attr(el, "data-trade") || "", // pricing page is trade-neutral; numbers fall back to the default preset
        plan: attr(el, "data-plan") || "estimates",
        billing: attr(el, "data-billing") || "yearly",
        headingLevel: attr(el, "data-heading-level"),
        syncBilling: attr(el, "data-sync-billing") !== "false"
      });
    });
  }
  window.ArcsiteROIPricing = { mount: function (el, opts) { injectStyles(); opts = opts || {}; opts.variant = VARIANT; mount(el, opts); }, start: start, version: VERSION };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
