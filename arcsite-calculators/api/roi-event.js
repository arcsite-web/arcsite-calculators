// Forwards ROI calculator events from arcsite.com to HubSpot custom events.
// The HubSpot private app token lives ONLY in Vercel env vars (HUBSPOT_TOKEN). Never commit it.

const EVENTS = {
  completed: "pe1608094_roi_calculator_completed",
  demo_requested: "pe1608094_roi_calculator_demo_requested",
};

// HubSpot event property internal names we accept (everything else is dropped)
const ALLOWED = [
  "calculator_variant", "trade", "plan", "billing", "seats", "scenario", "sends_quotes",
  "jobs_per_month", "avg_job_size", "hours_saved_per_month", "plan_cost_per_year",
  "net_return_per_year", "model_version",
];
const NUMBERS = new Set(["seats", "jobs_per_month", "avg_job_size", "hours_saved_per_month", "plan_cost_per_year", "net_return_per_year"]);

// Optional: HubSpot property that stores the page URL (set PAGE_URL_PROPERTY in Vercel once confirmed, e.g. hs_url)
const PAGE_URL_PROPERTY = process.env.PAGE_URL_PROPERTY || "";

const ORIGINS = [/^https:\/\/(www\.)?arcsite\.com$/, /^https:\/\/[a-z0-9-]+\.webflow\.io$/, /^https:\/\/[a-z0-9-]+\.canvas\.webflow\.com$/];

function cors(req, res) {
  const origin = req.headers.origin || "";
  if (ORIGINS.some((r) => r.test(origin))) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return true;
  }
  return false;
}

async function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") return JSON.parse(req.body);
  const chunks = [];
  for await (const c of req) chunks.push(c);
  return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
}

module.exports = async (req, res) => {
  const allowed = cors(req, res);
  if (req.method === "OPTIONS") return res.status(allowed ? 204 : 403).end();
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });
  if (!allowed) return res.status(403).json({ error: "Origin not allowed" });

  let body;
  try { body = await readBody(req); } catch (e) { return res.status(400).json({ error: "Bad JSON" }); }

  const eventName = EVENTS[body.event];
  if (!eventName) return res.status(400).json({ error: "Unknown event" });

  const email = typeof body.email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email) ? body.email : "";
  const utk = typeof body.utk === "string" && /^[a-f0-9]{32}$/i.test(body.utk) ? body.utk : "";
  if (!email && !utk) return res.status(202).json({ skipped: "No email or HubSpot cookie to attach the event to" });

  const properties = {};
  for (const k of ALLOWED) {
    if (body.properties && body.properties[k] !== undefined && body.properties[k] !== null) {
      const v = body.properties[k];
      properties[k] = NUMBERS.has(k) ? Number(v) || 0 : String(v).slice(0, 255);
    }
  }
  if (PAGE_URL_PROPERTY && typeof body.page_url === "string") properties[PAGE_URL_PROPERTY] = body.page_url.slice(0, 500);

  const token = process.env.HUBSPOT_TOKEN;
  if (!token) return res.status(503).json({ error: "HUBSPOT_TOKEN not set", wouldSend: { eventName, email: !!email, utk: !!utk, properties } });

  const payload = { eventName, properties, occurredAt: new Date().toISOString() };
  if (email) payload.email = email; else payload.utk = utk;

  try {
    const r = await fetch("https://api.hubapi.com/events/v3/send", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!r.ok) {
      const detail = await r.text();
      console.error("HubSpot rejected event", r.status, detail);
      return res.status(502).json({ error: "HubSpot rejected the event", status: r.status, detail });
    }
    return res.status(204).end();
  } catch (e) {
    console.error("HubSpot request failed", e);
    return res.status(502).json({ error: "HubSpot request failed" });
  }
};
