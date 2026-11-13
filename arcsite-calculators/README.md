# ArcSite calculators

Hosted scripts for the calculators on arcsite.com (Webflow). Static files only, no build step.

| Calculator | Used on | Pinned version (live pages) | Latest (testing only) |
| --- | --- | --- | --- |
| ROI by pricing plan | Pricing page, below the plans | `/roi-pricing/0.2.0.js` | `/roi-pricing/latest.js` |
| ROI by vertical | Industry pages | `/roi-vertical/0.2.0.js` | `/roi-vertical/latest.js` |

Version files are cached for a year and never change. `latest.js` is cached for 5 minutes. Test pages: `/pricing` and `/vertical`.

Each script adds its own styles, which read the OW design system variables from Webflow, with fallbacks so it also renders off-site.

## Deploy (first time)

1. On github.com, create a new repository, e.g. `arcsite-calculators`.
2. On the empty repo page, click "uploading an existing file", drag in everything inside this folder (including the `roi-pricing` and `roi-vertical` folders), and commit.
3. In Vercel, click Add New, then Project, and import that repository.
4. Set Framework Preset to Other. Leave Build Command and Output Directory empty. Click Deploy.
5. Open the deployment URL. The home page links to `/pricing` and `/vertical`; both should show a working calculator.

## Add to a Webflow page

**Pricing page.** Add a Div Block where the calculator goes. In its Settings, add the custom attribute `data-arcsite-roi` = `pricing`. Then add to the page's custom code, before `</body>`:

```html
<script src="https://YOUR-DOMAIN/roi-pricing/0.2.0.js" defer></script>
```

It follows the page's billing toggle automatically. The toggle's code tells it about changes with:

```js
document.dispatchEvent(new CustomEvent("arcsite:billing", { detail: "yearly" })); // or "monthly"
```

To turn that off, add `data-sync-billing` = `false` to the Div Block.

**Industry page.** Add a Div Block with `data-arcsite-roi` = `vertical` and `data-trade` = the industry. Then:

```html
<script src="https://YOUR-DOMAIN/roi-vertical/0.2.0.js" defer></script>
```

Optional attributes on either Div Block:

| Attribute | Values | Default |
| --- | --- | --- |
| `data-trade` | `fence`, `deck`, `foundation`, `turf`, `gutters` | `fence` |
| `data-plan` | `drawpro`, `takeoff`, `estimates` | `estimates` |
| `data-billing` | `monthly`, `yearly` | `yearly` |

## Release a new version

1. Edit the calculator's `latest.js` and change `VERSION` near the top.
2. Save a copy as `<new-version>.js` in the same folder. Never edit an existing version file.
3. Commit to GitHub. Vercel deploys automatically.
4. Check the test page, then change the script URL in Webflow to the new version and publish.

To roll back, point Webflow at the previous version file.
