/* Case studies. case.html renders them; index.html uses name, tagline, category, year, thumb and summary.
   Image paths are relative to the repo root (one level up from /spatial). */
window.CASES = [
{
  slug: "lumoswap", name: "Lumoswap", category: "Web3 / DeFi", year: "2025",
  tagline: "DeFi, made effortless.",
  headline: "A DEX that feels as quick as a fintech app", flag: "Shipped · 40+ screens", logo: "logos/lumoswap.jpg", logoBg: "#0b0b0b", mark: "",
  summary: "A decentralised exchange on Creatorchain, a Layer 2 on Optimism’s Superchain. I designed the full product: landing page, swap, trading, liquidity, bridge, staking and farming.",
  meta: [["Role", "Lead product designer"], ["Year", "2025"], ["Platform", "Web app"], ["Scope", "40+ screens and a design system"]],
  context: [
    "Lumoswap launched at the same time as Creatorchain, so most people arriving had never used the chain, and many had never used a DEX. The team wanted swapping to feel as quick as converting on a centralised exchange, while everything stayed on-chain and visible.",
    "My job was to design the whole product and the component library it would be built from."
  ],
  problem: [
    "Most DEXs make you connect a wallet before they show you anything useful. Then they ask about slippage and transaction deadlines without explaining either. Fees and approvals appear late, and a lot of people open a block explorer afterwards to check the swap actually went through."
  ],
  before: ["Land on a page about the chain", "Connect a wallet to see anything", "Guess at slippage and deadline settings", "Approve and confirm, with fees shown late", "Check a block explorer to be sure"],
  role: [
    "I ran the competitive audit, defined the structure, designed every screen and built the component library. I worked with the founders on priorities, and with the frontend engineers on wallet states, live prices and contract calls."
  ],
  findings: [
    ["Most sessions are a single swap.", "People come to swap one token for another and leave. Every step between landing and that swap loses some of them."],
    ["Settings are where people hesitate.", "Slippage and deadlines confuse newcomers. The better products pick a safe default and explain it next to the field."],
    ["Most visitors haven’t connected a wallet.", "Prices, charts and pools need to be visible before anyone connects."]
  ],
  process: [
    ["Audit", "Compared Uniswap, PancakeSwap and the convert flows on centralised exchanges, and listed every decision each one asks for."],
    ["Structure", "Grouped the product into Trade, Earn and Bridge."],
    ["Swap", "Designed the swap on its own until it took three taps, then built the rest around it."],
    ["Visual language", "Yellow on black, a fine grid and large numerals."],
    ["Prototype", "Clickable flows for swapping, adding liquidity and staking, reviewed with the team."],
    ["Handoff", "Components, tokens and states documented for engineering."]
  ],
  decisions: [
    { t: "The swap sits on the landing page", d: "The marketing page’s hero contains a working swap widget with Swap, Liquidity and Bridge tabs, so someone can trade from the first screen they see.", tradeoff: "Features and the roadmap moved below the fold.", img: "lumoswap-1.jpg", cap: "Landing page with the swap widget under the headline" },
    { t: "A simple swap, and a separate trading view", d: "Most people get a single card: two amounts, a switch, the slippage default and one button. Traders get a separate view with candlestick charts, timeframes and indicators. Both are built from the same components.", tradeoff: "Two surfaces to design and keep in sync.", img: "lumoswap-4.jpg", cap: "The simple swap" },
    { t: "Staking details open inline", d: "Each pool row shows flexible and locked APY side by side. Expanding a row shows total locked, average lock duration, the performance fee and a link to the contract.", tradeoff: "Pages get longer than they would with a modal, but people can compare pools without opening and closing anything.", img: "lumoswap-3.jpg", cap: "Staking, with one pool expanded" }
  ],
  screens: [
    { img: "lumoswap-2.jpg", t: "Trade and liquidity", d: "Chart for traders next to the liquidity panel, which shows an empty state until a wallet is connected." }
  ],
  outcome: [
    ["Shipped end to end.", "Swap, trading, liquidity, bridge, staking and farming, across more than 40 screens."],
    ["One component library", "used across every surface."],
    ["Every screen works without a wallet", "so visitors can look around before they commit."]
  ],
  reflection: ["If I did this again, I’d design pending, failed and reverted transactions much earlier. Those states decide whether people come back, and they got less time than the main flow."]
},
{
  slug: "oaksjet", name: "Oaksjet", category: "Travel / Luxury", year: "2025",
  tagline: "A higher standard of travel.",
  headline: "Private jet charter, booked like a normal flight", flag: "Two-sided marketplace", logo: "", logoBg: "#1b2550", mark: "O",
  summary: "A private jet booking platform for Nigeria. I designed the traveller experience on mobile and desktop, and the tools operators use to list aircraft and manage bookings.",
  meta: [["Role", "Lead product designer"], ["Year", "2025"], ["Platform", "Mobile, desktop, operator app"], ["Scope", "UX, UI and design system"]],
  context: [
    "Chartering a jet in Nigeria usually goes through a broker. You describe the trip in a chat, wait for quotes and compare screenshots. Prices depend on who you ask, and it’s hard to find out who actually operates the aircraft.",
    "Oaksjet puts aircraft, prices and availability in one place. On mobile the flow is short: route, jet, confirm. Desktop has room to compare options, which suits travel managers booking for a company."
  ],
  problem: [
    "Travellers had no way to compare aircraft or prices side by side, and first-time flyers couldn’t tell a reputable operator from an unknown one. Operators received requests by phone, chat and email, with no single calendar to keep track of them."
  ],
  before: ["Find a broker through a contact", "Describe the trip in a chat", "Wait hours for quotes", "Compare screenshots", "Pay without knowing much about the operator"],
  role: [
    "I designed both sides of the marketplace: search and booking for travellers, the operator app and profile, and the design system they share. I worked with the founders on pricing, deals and verification rules."
  ],
  findings: [
    ["Travellers think in trips.", "Few people know one aircraft model from another. They know the route, the date and how many people are coming."],
    ["Hourly rates don’t answer the question.", "People want the total for this trip, and how long the flight takes."],
    ["Operators need one inbox.", "Requests arrived from everywhere, and calendars drifted out of date."]
  ],
  process: [
    ["Market map", "How brokers, operators and travellers deal with each other today."],
    ["Two journeys", "Traveller and operator flows designed separately, joined at the booking request."],
    ["Mobile first", "Search to booking with one hand."],
    ["Desktop", "The comparison grid, deals and the operator dashboard."],
    ["Verification", "Aircraft review, specs, amenities and photos."],
    ["System", "Shared components across all three surfaces."]
  ],
  decisions: [
    { t: "Search starts with the trip", d: "Travellers enter route, date and passengers, then cabin size and comfort level. Results list every suitable jet with flight time, capacity and a total estimate for the trip.", tradeoff: "People who want a specific aircraft have to find it in the results.", img: "oaks3.jpg", cap: "Available jets for a route, with total estimates" },
    { t: "Aircraft are reviewed before they’re listed", d: "Operators submit each aircraft for verification, and the app tells them what happens next: a 24–48 hour review, then a notification when it’s approved.", tradeoff: "Operator onboarding takes longer.", img: "oaks2.jpg", cap: "Operator app: dashboard, booking requests and submission" },
    { t: "Empty legs get their own page", d: "Discounted repositioning flights are listed by date and route, priced in naira. It’s the cheapest way to try a private flight.", tradeoff: "This inventory changes daily, so the page needed clear sold-out and expired states.", img: "oaks4.jpg", cap: "Current jet deals" }
  ],
  screens: [
    { img: "oaks1.jpg", t: "Traveller app", d: "Onboarding, a trip-first search, and a jet page with specs, amenities and photos." },
    { img: "oaks5.jpg", t: "Operator desktop", d: "Booking requests arrive as notifications with the payout already worked out." },
    { img: "oaks6.jpg", t: "Availability", d: "A month at a glance: scheduled flights, bookings and unavailable days." }
  ],
  outcome: [
    ["Three surfaces", "(mobile, desktop and the operator app) on one design system."],
    ["Booking without a broker:", "from route to a confirmed request inside the app."],
    ["Verified listings.", "Every aircraft is reviewed before it appears."]
  ],
  reflection: ["The next thing I’d design is everything after the booking: the days before the flight, changes and cancellations."]
},
{
  slug: "terrace", name: "Terrace", category: "Web3 / Gaming", year: "2025",
  tagline: "A little anticipation. A big reveal.",
  headline: "A rewards campaign that turns onboarding into a game", flag: "Shipped in 6 weeks", logo: "logos/terrace.jpg", logoBg: "#000", mark: "",
  summary: "A loot box campaign for Terrace, a crypto exchange. Users earn mystery boxes of $TRC for signing up, trading, referring friends and verifying their identity. I also designed the token launchpad.",
  meta: [["Role", "Lead product designer"], ["Year", "2025"], ["Platform", "Web and mobile"], ["Timeline", "6 weeks"]],
  context: [
    "Exchanges need new users to sign up, verify, make a first trade and invite friends, and each of those steps loses people. Terrace wanted a campaign around them that felt like a game, while every rule stayed easy to find."
  ],
  problem: [
    "Most exchange campaigns put the eligibility rules on a separate terms page. People don’t know what they’ve earned or why a reward is locked, and the campaign ends up creating support tickets."
  ],
  before: ["See a banner", "Read the terms", "Complete a task with no confirmation", "Wait for a reward that may not arrive", "Contact support"],
  role: [
    "I designed the user flows, the campaign components, the claim experience and the dashboard the team uses to run the campaign. We had six weeks and a fixed launch date."
  ],
  findings: [
    ["The reveal is the fun part.", "Seeing what you might get is what makes opening a box worth doing."],
    ["Progress has to be visible.", "People finish tasks when they can see what’s done, what’s left and what each one pays."],
    ["Locked rewards need a reason.", "Without one, people assume they’re being tricked."]
  ],
  process: [
    ["Rules", "Mapped each task to a reward, and each reward to a state: available, earned, claimed or locked."],
    ["Flows", "New, unverified, verified and referred users."],
    ["Reveal", "Storyboarded the opening: tiers, spin, reveal, claim."],
    ["Components", "Campaign UI on top of the exchange’s existing design."],
    ["Mobile", "Including an entry modal for returning users."],
    ["Operations", "The dashboard for running the campaign."]
  ],
  decisions: [
    { t: "The rules sit next to the boxes", d: "A How to earn panel stays beside the campaign. Each task shows its status (earned, claimed or locked), and the referral link can be copied straight from it.", tradeoff: "The page is busier than a clean hero with an FAQ link.", img: "terrace-1.jpg", cap: "Campaign home with the How to earn panel" },
    { t: "Every tier is shown before you open", d: "A carousel shows the Common, Epic, Legendary and Mythic boxes, with Spin to open in the middle.", tradeoff: "Showing the top tiers sets expectations, so the odds behind them had to be fair.", img: "terrace-2.jpg", cap: "The campaign on desktop, and the entry modal on mobile" },
    { t: "Verification raises the cap", d: "Unverified users can earn up to 10 boxes. Verifying identity removes the limit, so it becomes something people choose to do.", tradeoff: "Some people will stop at 10." }
  ],
  screens: [
    { img: "terrace-3.jpg", t: "Launchpad", d: "New, ongoing and completed token launches in three live columns, built for scanning." }
  ],
  outcome: [
    ["Shipped in six weeks:", "flows, components, the claim experience and the operator dashboard."],
    ["A status on every task:", "earned, claimed or locked, with a reason when it’s locked."],
    ["Components the team reuses", "for later campaigns."]
  ],
  reflection: ["I’d give the end of the campaign more attention: what happens to unclaimed boxes, and what keeps people trading once the boxes stop."]
},
{
  slug: "dreamspace", name: "Dreamspace", category: "AI / Data", year: "2024",
  tagline: "Complex data. Clear possibilities.",
  headline: "From a sentence to an on-chain app", flag: "Space and Time · MakeInfinite", logo: "logos/dreamspace.jpg", logoBg: "#0b0b0b", mark: "",
  summary: "A tool on Space and Time for generating data-driven dapps and dashboards from a prompt, backed by on-chain data and SQL. I designed the builder, the projects area, the developer docs and API key management.",
  meta: [["Role", "Product designer (part-time)"], ["Year", "Feb 2024 – Jan 2025"], ["Platform", "Web app"], ["Scope", "Builder, docs and API keys"]],
  context: [
    "Dreamspace has two kinds of users. Developers want SQL, schemas and APIs. Business users want a dashboard that answers a question. Both want to build on data they can verify.",
    "The product generates an app from a sentence. My job was to make sure developers could still see and edit what was generated, and that nobody lost work while trying changes."
  ],
  problem: [
    "Prompt-to-app tools look great in a demo and get frustrating once you want to change something. You can’t see what was generated, you can’t safely try an edit, and you can’t tell where the data came from."
  ],
  before: ["Write a prompt", "Get an app with no visible logic", "Re-prompt to change one thing", "Lose a version that worked", "Start over"],
  role: [
    "I designed the prompt experience, the generation panel, components and themes, page versions, the projects area, the developer docs and API key management. I worked with the AI and data engineers on what the model could generate reliably, and on how queries could be shown."
  ],
  findings: [
    ["Developers want to see the query.", "They trust generated output when they can read and edit the SQL behind it."],
    ["Visible history changes behaviour.", "People try more things when they can see how to get back."],
    ["Business users start with a question.", "They describe the result they want, not the tables."]
  ],
  process: [
    ["Audit", "AI builders, BI tools and developer consoles."],
    ["Layers", "Prompt, app, components, queries, data."],
    ["Builder concepts", "Full page, split screen and a docked panel."],
    ["Prototype", "The docked panel with live preview and versions."],
    ["Visual language", "Layered, translucent surfaces."],
    ["Docs and keys", "Designed alongside the product."]
  ],
  decisions: [
    { t: "Prompt first, SQL visible underneath", d: "The home screen asks one question: what do you want to build? Below it, a SQL editor and table view show what the platform is querying.", tradeoff: "SQL on the home screen can put off business users, so it’s secondary but never hidden.", img: "dreamspace-1.jpg", cap: "Prompt, chat and the query view underneath" },
    { t: "The builder is a docked panel", d: "Chat, Components and Flair & Themes sit in a panel beside the app, with a live preview toggle, so each change shows up as you make it.", tradeoff: "Less canvas than a full-screen editor.", img: "dreamspace-2.jpg", cap: "Components tab in the builder panel" },
    { t: "Page history uses thumbnails", d: "Every page keeps a visual version history, so getting back to a version that worked means recognising it.", tradeoff: "More storage and rendering for every change.", img: "dreamspace-3.jpg", cap: "Pages and version history" }
  ],
  screens: [
    { img: "dreamspace-4.jpg", t: "My projects", d: "Apps, dashboards and saved queries in one place." }
  ],
  outcome: [
    ["Prompt to app:", "a sentence becomes a working app or dashboard on verified data."],
    ["The query is one click away", "from anything generated."],
    ["Version history", "for every page."],
    ["Developer docs and API keys", "designed with the product."]
  ],
  reflection: ["I’d add a way for the AI to explain why it generated what it did. Showing the source helped people trust it. Showing the reasoning would help them steer it."]
},
{
  slug: "washpadi", name: "Washpadi", category: "Consumer / Mobile", year: "2025",
  tagline: "Everyday life, a little lighter.",
  headline: "One laundry service, three apps that fit their users", flag: "3 products, 1 system", logo: "logos/washpadi.jpg", logoBg: "#f2f2f2", mark: "",
  summary: "An on-demand laundry service. I designed the customer app, the vendor app laundries use to run their business, and the admin platform.",
  meta: [["Role", "Lead product designer"], ["Year", "2025"], ["Platform", "iOS, Android, web admin"], ["Scope", "3 products, 1 design system"]],
  context: [
    "Customers want laundry to work like food delivery: pick a service, see the price, schedule a pickup. Vendors are small laundries, often run from one Android phone. The admin team sits in between, handling verification, disputes and payments.",
    "All three products had to share a design system and still suit the people using them."
  ],
  problem: [
    "People find a laundry through word of mouth, agree prices in person and chase updates by phone. When items go missing, there’s nobody to escalate to. For vendors, paperwork and verification get in the way of taking orders."
  ],
  before: ["Find a laundry through neighbours", "Agree prices item by item", "Arrange pickup over calls", "Phone to ask when it’s ready", "Sort out missing items yourself"],
  role: [
    "I designed all three products and the shared design system. I worked with the founders and the ops team on operations and compliance, and with engineering on the build."
  ],
  findings: [
    ["Customers choose on price and turnaround,", "the same way they pick a restaurant."],
    ["Vendors open the app for orders and money.", "Everything else is secondary."],
    ["Admins need a queue:", "what needs attention right now, whether that’s a dispute, an approval or a stalled order."]
  ],
  process: [
    ["Service map", "Customer, vendor and admin journeys, including what happens when things fail."],
    ["Customer app", "Onboarding, browsing, booking, tracking and support."],
    ["Vendor app", "Onboarding, tiered KYC, orders and payouts."],
    ["Admin", "Dashboard, vendors, KYC review, disputes and the audit log."],
    ["System", "One set of type, colour and components."],
    ["Edge cases", "Errors, empty states and failed verification."]
  ],
  decisions: [
    { t: "Ordering works like food delivery", d: "The home screen lists categories (washing, dry cleaning, ironing, home and bedding) with starting prices, then nearby shops with ratings and turnaround times.", tradeoff: "The Washpadi brand takes a back seat to the shops.", img: "User 2.jpg", cap: "Customer home, support chat and a shop profile" },
    { t: "The vendor home is about orders and earnings", d: "Vendors see this week’s orders, revenue with a withdraw button, and a monthly goal that lowers their fees. New orders and pickup times follow.", tradeoff: "Settings and analytics live deeper in the app.", img: "Vendor 1.jpg", cap: "Vendor home, orders and order detail" },
    { t: "KYC comes in tiers", d: "Vendors verify their BVN, then NIN, then address. Each tier raises their limit, and errors such as a BVN mismatch explain how to fix them.", tradeoff: "The rules are more complicated, but vendors can start earning sooner.", img: "Vendor 2.jpg", cap: "Vendor onboarding, tiered KYC and a BVN mismatch" },
    { t: "The admin opens on what needs attention", d: "Escalated disputes, deactivation approvals, KYC reviews and stalled orders are listed first, with an audit log of every admin action below.", tradeoff: "Less room for charts.", img: "Admin 1.jpg", cap: "Admin dashboard" }
  ],
  screens: [
    { img: "User 1.jpg", t: "Customer onboarding", d: "Three screens: the service, pickup and delivery, tracking." },
    { img: "lumoswap-grid.jpg", t: "Booking and wallet", d: "Order tracking, a bucket priced per item, wallet top-ups and pickup scheduling." },
    { img: "dreamspace-grid.jpg", t: "Vendor services", d: "Order details, per-item pricing and the shop profile." },
    { img: "Admin 3.jpg", t: "Vendor management", d: "Performance, revenue, service areas and orders, with suspend and deactivate." },
    { img: "Admin 2.jpg", t: "Finding vendors", d: "Filter by service type, location, rating and completion rate." },
    { img: "Admin 4.jpg", t: "KYC review", d: "Documents and ID details in one panel, with approve and reject." }
  ],
  outcome: [
    ["Three products", "(customer app, vendor app and admin) on one design system."],
    ["Booking without phone calls:", "book, track and get support in the app."],
    ["Vendors go live sooner", "with tiered KYC."],
    ["An audit trail", "of every admin action."]
  ],
  reflection: ["I’d test the vendor app on budget phones and slow networks from the first wireframe. That’s where its hardest problems were, and I found them late."]
},
{
  slug: "glitch-market", name: "Glitch Market", category: "AI / Web3", year: "2025",
  tagline: "Making sense of what’s next.",
  headline: "A prediction market where AI agents take part", flag: "Sole designer", logo: "logos/glitch-market.jpg", logoBg: "#0e0e0f", mark: "",
  summary: "A prediction market where people stake on real-world and on-chain outcomes, with AI agents acting as market makers and helping resolve disputes. I led product design and the brand.",
  meta: [["Role", "UX/UI designer, sole designer"], ["Year", "Sept 2025 – Mar 2026"], ["Platform", "Web and mobile"], ["Scope", "Product and brand"]],
  confidential: "The product screens are confidential for now. I’m happy to walk through them on a call.",
  context: [
    "Prediction markets attract casual users betting on pop culture, and traders reading on-chain signals. Glitch Market adds AI agents that set prices and validate outcomes. The interface had to work for all of them."
  ],
  problem: [
    "If AI is setting prices and resolving outcomes, people need to see what it’s doing, or the market feels rigged. At the same time, placing a casual bet shouldn’t feel like using a trading terminal."
  ],
  before: ["Find a market among hundreds", "Read odds with no context", "Stake through an interface built for traders", "Wait without knowing how it resolves", "Dispute through an opaque process"],
  role: [
    "I designed market creation, the live betting interface, the AI signal feed and resolution review, along with the visual identity. I worked with the founders and protocol engineers on market mechanics and agent behaviour."
  ],
  findings: [
    ["Casual users want three things:", "the question, the odds and a button."],
    ["Traders want the signal:", "probability curves, volume and why the price moved."],
    ["Markets are judged on how they resolve.", "That’s where trust is won or lost."]
  ],
  process: [
    ["Mechanics", "How markets are created, priced, traded and resolved, and where agents take part."],
    ["Depth", "A casual layer and a trader layer over the same market."],
    ["Core flows", "Market creation, live betting, the signal feed and resolution review."],
    ["Brand", "Glitch effects, data noise and neon on dark."],
    ["System", "Components for probabilities, curves, agent activity and disputes."],
    ["Mobile", "The casual layer, for quick bets."]
  ],
  decisions: [
    { t: "Agents are visible participants", d: "Every agent action (a signal, liquidity, a resolution vote) appears in a live feed, attributed to a named agent with a track record.", tradeoff: "More on screen." },
    { t: "Two depths on the same market", d: "A market opens with the question, current odds and a stake button. Real-time probability curves and signals expand for people who want them.", tradeoff: "Traders take one extra step." },
    { t: "The brand leans into the glitch", d: "Chromatic offsets, data noise and neon on dark make the complexity look deliberate.", tradeoff: "It’s a polarising look, but it stands out in a category where products look alike." }
  ],
  screens: [],
  outcome: [
    ["Market creation", "with clear resolution rules."],
    ["Live betting", "with casual and pro depths."],
    ["An AI signal feed,", "with every action attributed."],
    ["Resolution review", "for disputed outcomes."]
  ],
  reflection: ["Glitch Market changed how I design AI features. I now treat an agent as a participant with a name and a record, so people can hold it accountable."]
}
];

/* The playground: interaction loops first, then shots from outside the case studies.
   Loops are muted videos (loops/<f>.mp4, with loops/<f>.jpg as the still); bg fills the space around a wide loop. */
window.PLAYGROUND = [
  { loop: "eikos-01-feed", t: "Market feed", by: "Eikos", bg: "#f0e6dc" },
  { loop: "eikos-02-live", t: "A live market", by: "Eikos", bg: "#8c3325" },
  { loop: "eikos-03-buy", t: "Buying a position", by: "Eikos", bg: "#050505" },
  { loop: "eikos-04-share", t: "Sharing a trade", by: "Eikos", bg: "#3b1411" },
  { loop: "eikos-05-portfolio", t: "Portfolio", by: "Eikos", bg: "#f0e6dc" },
  { loop: "eikos-06-ask", t: "Ask Eikos", by: "Eikos", bg: "#cab8a7" },
  { loop: "01-balance", t: "Wallet home", by: "Wallet", bg: "#f3eee5" },
  { loop: "02-chart", t: "Price chart", by: "Wallet", bg: "#111111" },
  { loop: "03-network", t: "Switching networks", by: "Wallet", bg: "#fe6b1f" },
  { loop: "04-send", t: "Sending ETH", by: "Wallet", bg: "#ffe2c7" },
  { loop: "05-credentials", t: "Zero-knowledge ID", by: "Wallet", bg: "#161616" },
  { loop: "06-score", t: "Points and activity", by: "Wallet", bg: "#12362a" },
  { loop: "02-leave-types", t: "Choosing a leave type", by: "CompCrafter", bg: "#263b0f" },
  { loop: "03-cee-books-leave", t: "Booking leave in a sentence", by: "CompCrafter", bg: "#f6f1e5" },
  { loop: "01-product-at-a-glance", t: "The product at a glance", by: "CompCrafter", bg: "#0f1906" },
  { loop: "05-sign-contract", t: "Signing a contract", by: "CompCrafter", bg: "#f6f1e5" },
  { loop: "04-clock-in", t: "Clocking in", by: "CompCrafter", bg: "#d9efbd" },
  { loop: "06-comp-worksheet", t: "The pay review worksheet", by: "CompCrafter", bg: "#0f1906" },
  { shot: "agentic-grid.jpg", t: "Hiring landing page", by: "Agentic" },
  { shot: "Frame 253.jpg", t: "Onboarding", by: "Orderly" },
  { shot: "supersocial-grid.jpg", t: "Social feed", by: "SuperSocial" },
  { shot: "feedpay-grid.jpg", t: "Payments", by: "Feedpay" },
  { shot: "terrace-grid.jpg", t: "Listings", by: "Terrace" },
  { shot: "Scene-16.jpg", t: "Laundry home", by: "Washpadi" }
];

/* Each cover's dark base colour, shown while its image loads */
window.COVER = {
  lumoswap: { base: "#0b0b08", pos: "14% 40%" },
  oaksjet: { base: "#1c2c52", pos: "50% 30%" },
  terrace: { base: "#070a06", pos: "14% 40%" },
  dreamspace: { base: "#2c1458", pos: "30% 40%" },
  washpadi: { base: "#123a2a", pos: "50% 30%" },
  "glitch-market": { base: "#0b0b0c", pos: "50% 50%" }
};

/* ---------- content from the CMS ----------
   /api/content (loaded just before this file) sets window.CMS once anything has been saved in the admin.
   Saved projects, playground and details replace the built-in ones above; until then the site shows those. */
(function(){
  var C = window.CMS || {};
  if (Array.isArray(C.cases) && C.cases.length) window.CASES = C.cases;
  if (Array.isArray(C.playground) && C.playground.length) window.PLAYGROUND = C.playground;
  if (C.cover) Object.keys(C.cover).forEach(function(k){ window.COVER[k] = C.cover[k]; });
  /* details shown around the site; the admin's Details tab edits these */
  window.SITE = Object.assign({
    email: "triumphohwojeheri@gmail.com",
    avail: "Available for select projects",
    calendly: "https://calendly.com/triumphohwojeheri/30min",
    x: "https://twitter.com/amazinglanky", instagram: "https://instagram.com/amazinglanky",
    dribbble: "https://dribbble.com/amazinglanky", linkedin: "https://linkedin.com/in/triumph-ohwojeheri",
    lead: ""
  }, C.site || {});
})();
/* a file path from the content: uploads are full links and used as they are; built-in files live in dir */
window.asset = function(f, dir){ return /^(https?:)?\/\/|^\//.test(f || "") ? f : (dir || "") + encodeURI(f || ""); };
/* the playground's media: a loop's video and still, or a shot */
/* ?v= changes whenever the files are re-exported, so browsers don't keep an old copy */
var LOOPV = "?v=2";
window.loopSrc = function(g){ return g.video || "loops/" + g.loop + ".mp4" + LOOPV; };
window.loopPoster = function(g){ return g.poster || (g.loop ? "loops/" + g.loop + ".jpg" + LOOPV : ""); };

/* ---------- details everywhere: email, availability and links, wherever the pages wrote the defaults ---------- */
document.addEventListener("DOMContentLoaded", function(){
  var S = window.SITE, D = { "twitter.com": S.x, "x.com": S.x, "instagram.com": S.instagram, "dribbble.com": S.dribbble, "linkedin.com": S.linkedin, "calendly.com": S.calendly };
  [].forEach.call(document.querySelectorAll("a[href]"), function(a){
    var h = a.getAttribute("href");
    if (/^mailto:/.test(h)) { a.setAttribute("href", "mailto:" + S.email); if (/@/.test(a.textContent)) a.textContent = S.email; return; }
    var m = h.match(/^https?:\/\/(?:www\.)?([^/]+)/);
    if (m && D[m[1]]) a.setAttribute("href", D[m[1]]);
  });
  [].forEach.call(document.querySelectorAll("[data-copy]"), function(b){ b.setAttribute("data-copy", S.email); });
  [].forEach.call(document.querySelectorAll(".avail, .sf-status"), function(el){ var t = el.lastChild; if (t && t.nodeType === 3) t.nodeValue = S.avail; });
  var lead = document.querySelector(".m-ab .lead");
  if (lead && S.lead) lead.textContent = S.lead;
});

/* ---------- visits, for the CMS's stats: one small beacon per page; never locally, inside the CMS, or in its previews ---------- */
document.addEventListener("DOMContentLoaded", function(){
  if (!navigator.sendBeacon || /^(localhost|127\.|\[::1\])/.test(location.hostname) || /^\/admin/.test(location.pathname)) return;
  var mode = /\/spatial\/(index\.html)?$/.test(location.pathname) ? (window.SPATIAL ? "spatial" : "normal") : "";
  try { navigator.sendBeacon("/api/track", new Blob([JSON.stringify({ p: location.pathname + location.search, r: document.referrer, m: mode })], { type: "text/plain" })); } catch (_) {}
});

/* The project card, shared by the room, its preview window and the case pages */
window.cardHTML = function(c, i, opt){
  opt = opt || {};
  function esc(s){ return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;"); }
  var cv = window.COVER[c.slug] || { base: c.base || '#111' }, role = ((c.meta || []).filter(function(m){ return m[0] === "Role"; })[0] || ["", ""])[1];
  var facts = (c.meta || []).filter(function(m){ return m[0] === "Platform" || m[0] === "Scope" || m[0] === "Timeline"; }).slice(0, 2);
  var logo = c.logo ? '<img src="' + asset(c.logo) + '" alt="">' : "<b>" + (c.mark || "") + "</b>";
  return '<article class="pcard">' +
    '<div class="pc-v" style="--base:' + cv.base + '"><img src="' + (c.card || c.cover ? asset(c.card || c.cover) : 'covers/card/' + c.slug + '.jpg') + '" alt="' + esc(c.name) + ' cover" draggable="false"></div>' +
    '<div class="pc-b">' +
      '<div class="pc-org"><span class="pc-lg" style="background:' + c.logoBg + '">' + logo + '</span>' +
        '<div class="pc-who"><b>' + c.name + '</b><span>' + role + '</span></div><span class="pc-yr">' + c.year + '</span></div>' +
      '<h3 class="pc-h">' + c.headline + '</h3>' +
      '<p class="pc-d">' + c.summary + '</p>' +
      '<div class="pc-f"><div class="pc-r">' + facts.map(function(f){ return '<div><b>' + f[1] + '</b><span>' + f[0] + '</span></div>'; }).join("") + '</div>' +
        (opt.extra || "") + '<a class="pc-go" href="case.html?p=' + c.slug + '" aria-label="Read the ' + esc(c.name) + ' case study">→</a></div>' +
    '</div></article>';
};

/* Where I've worked, from the resume: the about page's experience list and the row of company circles on the home page */
window.EXPERIENCE = [
  { co: 'Glitch Markets', role: 'UX/UI designer', when: 'Sept 2025 – Mar 2026', where: 'New York · remote', logo: 'logos/glitch-market.jpg', bg: '#0e0e0f', link: 'glitch-market', hero: 3,
    d: 'Led zero-to-one design for the whole trading app, from concept to high-fidelity prototypes. Ran fast design sprints and was the only designer on the team, so research and product direction ran through me.' },
  { co: 'Human Tech', was: 'Holonym Foundation', role: 'Visual designer', when: 'June 2024 – Feb 2025', where: 'Paris · remote', logo: 'logos/human-tech.jpg', bg: '#1f2a66', hero: 2,
    d: 'Designed Quests and Perks for Silk Wallet, and the Silk Points loyalty programme. Contributed to the Holonym-to-Human Tech rebrand, and made assets for blogs, social and pitch decks.' },
  { co: 'Space and Time', role: 'Product designer, part-time', when: 'Feb 2024 – Jan 2025', where: 'United States · remote', logo: 'logos/space-and-time.jpg', bg: '#000', link: 'dreamspace', hero: 1,
    d: 'Led end-to-end design of MakeInfinite, a dApp that combines zero-knowledge proofs, on-chain data and AI tools. Designed UI systems for Space and Tokens and Blaze, and go-to-market design assets.' },
  { co: 'NerfBot', role: 'Lead product designer', when: 'Mar 2023 – July 2023', where: 'California · remote', logo: 'logos/nerfbot.jpg', bg: '#000',
    d: 'Created user flows, high-fidelity wireframes and prototypes to communicate the product to partners, and fixed UX issues with developers and researchers.' },
  { co: 'Core DAO', was: 'Crest Protocol', role: 'Lead product designer', when: 'Jan 2023 – June 2023', where: 'Remote', logo: 'logos/core-dao.jpg', bg: '#141414',
    d: 'Led design from research to delivery, and validated new features through user research and usability testing.' }
];
/* the logo wall: everyone I've designed for (a mark stands in where there's no logo file yet) */
window.CLIENTS = [
  { n: 'Glitch Markets', logo: 'logos/glitch-market.jpg' }, { n: 'Human Tech', logo: 'logos/human-tech.jpg' },
  { n: 'Space and Time', logo: 'logos/space-and-time.jpg' }, { n: 'Dreamspace', logo: 'logos/dreamspace.jpg' },
  { n: 'Core DAO', logo: 'logos/core-dao.jpg' }, { n: 'Silk', mark: 'S', bg: '#18181b' }, { n: 'Bitazza', logo: 'logos/bitazza.jpg' },
  { n: 'Kryptos', logo: 'logos/kryptos.jpg' }, { n: 'Lumoswap', logo: 'logos/lumoswap.jpg' }, { n: 'Terrace', logo: 'logos/terrace.jpg' },
  { n: 'Washpadi', logo: 'logos/washpadi.jpg' }, { n: 'Oaksjet', mark: 'O', bg: '#1b2550' }, { n: 'NerfBot', logo: 'logos/nerfbot.jpg' }
];

/* Shared top navigation and footer for the home, case and about pages.
   A white bar: three tabs with icons (the grey pill springs between them, nav.js), then socials, then the theme and Spatial switches */
var NI = function(d, fill){ return '<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" ' + (fill ? 'fill="currentColor"' : 'fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"') + '>' + d + '</svg>'; };
var NAV_ICONS = {
  home: NI('<path d="M4 10.2 12 4l8 6.2V19a2 2 0 0 1-2 2h-3v-6.5H9V21H6a2 2 0 0 1-2-2z"/>'),
  work: NI('<rect x="8.5" y="8.5" width="12" height="12" rx="2.6"/><path d="M15.5 4.5H6.6a2.1 2.1 0 0 0-2.1 2.1v8.9"/>'),
  me: NI('<circle cx="12" cy="12" r="8.6"/><path d="M8.6 14.2a4.3 4.3 0 0 0 6.8 0"/><path d="M9.3 9.6h.01M14.7 9.6h.01" stroke-width="2.6"/>'),
  whatsapp: NI('<path d="M4.2 19.8l1.1-3.7a8.4 8.4 0 1 1 3.2 3z"/><path d="M9.2 8.3c-.4 2.9 3.1 6.7 6.4 6.5l.9-1.5-2-1-1 .8c-1-.4-2-1.4-2.4-2.4l.8-1-1-2z" stroke-width="1.5"/>'),
  x: NI('<path d="M17.4 3.5h3l-6.6 7.6 7.8 9.4h-6.1l-4.8-5.9-5.4 5.9H2.3l7-7.9L1.9 3.5h6.2l4.3 5.4zm-1 15.2h1.7L7.6 5.2H5.8z"/>', true),
  mail: NI('<rect x="3.2" y="5.2" width="17.6" height="13.6" rx="3"/><path d="m4.2 7.2 7.8 6 7.8-6"/>'),
  sun: NI('<circle cx="12" cy="12" r="3.6"/><path d="M12 2.8v2M12 19.2v2M2.8 12h2M19.2 12h2M5.5 5.5l1.4 1.4M17.1 17.1l1.4 1.4M5.5 18.5l1.4-1.4M17.1 6.9l1.4-1.4"/>'),
  moon: NI('<path d="M19.5 14.6A7.8 7.8 0 0 1 9.4 4.5a8 8 0 1 0 10.1 10.1z"/>'),
  contact: NI('<path d="M20.5 12a8.5 8.5 0 0 1-12.4 7.5L3.5 20.5l1.1-4.3A8.5 8.5 0 1 1 20.5 12z"/><path d="M8.5 12h.01M12 12h.01M15.5 12h.01" stroke-width="2.6"/>'),
  play: NI('<rect x="3.5" y="3.5" width="7" height="7" rx="2"/><rect x="13.5" y="3.5" width="7" height="7" rx="3.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="3.5"/><rect x="13.5" y="13.5" width="7" height="7" rx="2"/>'),
  cube: NI('<path d="M12 3.2 19.8 7.6v8.8L12 20.8l-7.8-4.4V7.6z"/><path d="m4.4 7.7 7.6 4.3 7.6-4.3M12 12v8.6"/>')
};
/* shared pieces for the home page (mobile.js) and the room (index.html) */
function escH(s){ return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }
/* a few of the teams I've worked with: overlapping circles; hovering (or tapping) one shows the company, my role and when */
window.companiesHTML = function(){
  var xp = window.EXPERIENCE.filter(function(x){ return x.hero; }).sort(function(a, b){ return a.hero - b.hero; });
  return '<div class="cos rv"><span class="cos-l">Worked with</span><span class="cos-g" role="list" aria-label="Teams I’ve worked with">' + xp.map(function(x, i){
    return '<button class="co" type="button" role="listitem" style="--c:' + x.bg + ';--z:' + (xp.length - i) + '" aria-label="' + escH(x.co + ', ' + x.role + ', ' + x.when) + '">' +
      '<span class="co-f">' + (x.logo ? '<img src="' + x.logo + '" alt="">' : escH(x.mark)) + '</span>' +
      '<span class="co-tip" aria-hidden="true"><b>' + escH(x.co) + '</b><span>' + escH(x.role) + '</span><small>' + escH(x.when) + ' · ' + escH(x.where) + '</small></span></button>';
  }).join('') + '</span></div>';
};
window.SKILLS = ['Research', 'Interaction design', 'UI and brand', 'Design systems', 'Prototyping'];
var TOOLS = [
  ['Claude', '<g stroke="#D97757" stroke-width="2.3" stroke-linecap="round">' + [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(function(a, i){ var r = a * Math.PI / 180, l = i % 2 ? 7.2 : 9.4; return '<path d="M' + (12 + Math.cos(r) * 2.6).toFixed(1) + ' ' + (12 + Math.sin(r) * 2.6).toFixed(1) + 'L' + (12 + Math.cos(r) * l).toFixed(1) + ' ' + (12 + Math.sin(r) * l).toFixed(1) + '"/>'; }).join('') + '</g>'],
  ['Figma', '<path d="M9 2h3v6.6H9a3.3 3.3 0 0 1 0-6.6z" fill="#F24E1E"/><path d="M12 2h3a3.3 3.3 0 0 1 0 6.6h-3z" fill="#FF7262"/><path d="M9 8.6h3v6.6H9a3.3 3.3 0 0 1 0-6.6z" fill="#A259FF"/><circle cx="15" cy="11.9" r="3.3" fill="#1ABCFE"/><path d="M9 15.2h3v3.3a3.3 3.3 0 1 1-3-3.3z" fill="#0ACF83"/>'],
  ['Framer', '<path d="M6 2.5h12v6.4h-6zM6 8.9h6l6 6.3h-6v6.3l-6-6.3z" fill="currentColor"/>'],
  ['Miro', '<rect x="2" y="2" width="20" height="20" rx="5" fill="#FFD02F"/><path d="M15.4 6h-2l1.7 3-3.8-3H9.4l1.9 3.8L7.4 6H5.5l2.4 5.4L5.5 18h1.9l3.9-8.2L9.4 18h1.9l3.6-9.1-1.6 9.1h1.9l3.3-12z" fill="#050038"/>'],
  ['Adobe', '<path d="M14.2 3H21v18zM9.8 3H3v18zM12 9.4 16.4 21h-2.9l-1.3-3.4H9z" fill="#FA0F00"/>']
];
window.toolsHTML = function(cls){
  return '<div class="' + cls + '">' + TOOLS.map(function(t){ return '<span class="sk-t"><svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">' + t[1] + '</svg>' + t[0] + '</span>'; }).join('') + '</div>';
};
window.aiNoteHTML = function(cls){
  return '<p class="' + cls + '"><svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5c.6 5.1 2.4 6.9 7.5 7.5-5.1.6-6.9 2.4-7.5 7.5-.6-5.1-2.4-6.9-7.5-7.5 5.1-.6 6.9-2.4 7.5-7.5zM19 15.5c.3 2.2 1 3 3 3.2-2 .3-2.7 1-3 3.3-.3-2.3-1-3-3-3.3 2-.2 2.7-1 3-3.2z" fill="currentColor"/></svg>' +
    '<span>AI is part of how I work. I research, explore and prototype with Claude, and vibe-code my designs into working builds, so ideas get tested in days rather than weeks.</span></p>';
};
window.footIconsHTML = function(cls){
  return '<span class="' + cls + '">' + FOOT_LINKS.map(function(l){ return '<a href="' + l[1] + '" target="_blank" rel="noopener" aria-label="' + l[0] + '" data-tip="' + l[0] + '">' + l[2] + '</a>'; }).join('') + '</span>';
};

window.navHTML = function(on){
  if (on === 'about') on = 'me';
  var tab =function(key, href, label){ return '<a class="nt' + (on === key ? ' on' : '') + '" href="' + href + '"' + (on === key ? ' aria-current="page"' : '') + '>' + NAV_ICONS[key] + '<span>' + label + '</span></a>'; };
  var icon = function(key, href, label){ return '<a class="ni" href="' + href + '"' + (/^http/.test(href) ? ' target="_blank" rel="noopener"' : '') + ' aria-label="' + label + '" title="' + label + '">' + NAV_ICONS[key] + '</a>'; };
  return '<nav class="navpill" aria-label="Main">' +
    tab('home', 'index.html', 'Home') + tab('work', 'index.html#work', 'Projects') + tab('me', 'index.html#about', 'Me') +
    '<i class="nsep" aria-hidden="true"></i>' +
    icon('whatsapp', 'https://wa.me/2349013417032', 'WhatsApp') + icon('x', 'https://twitter.com/amazinglanky', 'X') + icon('mail', 'mailto:triumphohwojeheri@gmail.com', 'Email') +
    '<i class="nsep" aria-hidden="true"></i>' +
    '<button class="ni themetg" type="button" aria-label="Switch light or dark mode" title="Light or dark">' + NAV_ICONS.sun.replace('<svg', '<svg class="i-sun"') + NAV_ICONS.moon.replace('<svg', '<svg class="i-moon"') + '</button>' +
    '<button class="ni modetg" type="button" role="switch" aria-checked="false" aria-label="Spatial mode: see the site as a 3D room" title="Spatial mode">' + NAV_ICONS.cube + '</button></nav>';
};
/* light or dark: remembered per visitor (the page's head applies it before anything draws) */
document.addEventListener('click', function(e){
  if (!(e.target.closest && e.target.closest('.themetg'))) return;
  var root = document.documentElement, dark = root.getAttribute('data-theme') !== 'dark';
  if (dark) root.setAttribute('data-theme', 'dark'); else root.removeAttribute('data-theme');
  try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (_) {}
});
/* the Spatial toggle (in the nav here, and in the room's top corner): flips between the scrolling site and the 3D room */
document.addEventListener('click', function(e){
  var t = e.target.closest && e.target.closest('.modetg'); if (!t) return;
  var on = t.getAttribute('aria-checked') !== 'true';
  t.setAttribute('aria-checked', on);
  setTimeout(function(){ location.href = 'index.html?mode=' + (on ? 'spatial#home' : 'normal'); }, 260);   /* let the knob slide first */
});
/* the footer's links, as icons */
var FOOT_LINKS = [
  ['Book a call', 'https://calendly.com/triumphohwojeheri/30min', NI('<rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/><path d="M9 15l2 2 4-4" stroke-width="1.9"/>')],
  ['Resume', 'resume.pdf', NI('<path d="M14 3.5H7.5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V8z"/><path d="M14 3.5V8h4.5M9 13h6M9 16.5h4"/>')],
  ['LinkedIn', 'https://linkedin.com/in/triumph-ohwojeheri', NI('<path d="M6.2 9.3h-3V21h3zM4.7 3a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6zM21 21h-3v-6c0-1.6-.6-2.7-2-2.7a2.2 2.2 0 0 0-2.1 1.5 3 3 0 0 0-.1 1V21h-3V9.3h2.9v1.6a3.2 3.2 0 0 1 2.9-1.6c2.1 0 3.4 1.4 3.4 4.3z"/>', true)],
  ['X', 'https://twitter.com/amazinglanky', NAV_ICONS.x],
  ['Dribbble', 'https://dribbble.com/amazinglanky', NI('<circle cx="12" cy="12" r="9"/><path d="M8.7 3.7c3.6 4.4 5.8 9.7 6.6 16.7M3.1 10.4c6 .2 10.6-1.2 14.8-4.8M5.4 18.3c3.4-4.2 8.4-5.6 15.5-3.8"/>')]
];
window.footerHTML = function(){
  /* dark, like Stanley's; the bottom row keeps Lagos time */
  return '<footer class="sfoot"><div class="sf-in">' +
    '<div class="sf-top rv"><span class="eyebrow">Get in touch</span><span class="sf-status"><i></i>Available for select projects</span></div>' +
    '<p class="sf-lead mask"><span class="ln"><span>Let’s make it something</span></span><span class="ln"><span><em>good</em>.</span></span></p>' +
    '<div class="sf-contact rv"><a class="sf-email" href="mailto:triumphohwojeheri@gmail.com">triumphohwojeheri@gmail.com</a><button class="sf-copy" data-copy="triumphohwojeheri@gmail.com">Copy</button>' +
      footIconsHTML('sf-links sf-icons') + '</div>' +
    '<div class="sf-bot"><span>© 2026 Triumph Ohwojeheri</span><span>Lagos, Nigeria <span class="lagos" data-lagos></span></span><a href="#" data-top>Back to top ↑</a></div>' +
  '</div></footer>';
};
