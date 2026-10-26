/* Case studies. One entry per project; case.html renders them and index.html uses the summary fields.
   Image paths are relative to the repo root (one level up from /spatial). */
window.CASES = [
{
  slug: "lumoswap", name: "Lumoswap", category: "Web3 / DeFi", year: "2025",
  tagline: "DeFi, made effortless.",
  cover: "Lumoswap cover.jpg",
  statement: "Making a decentralised exchange feel as fast and trustworthy as a fintech app.",
  intro: "Lumoswap is a decentralised exchange on Creatorchain, a Layer 2 built on Optimism’s Superchain. I designed the whole product: the landing page, swap, trading, liquidity, bridge, staking and farming, across 40+ screens on a single component system.",
  meta: [["Role", "Lead Product Designer"], ["Year", "2025"], ["Sector", "Web3 / DeFi"], ["Deliverables", "UX research, UI, prototyping, design system"], ["Scope", "40+ unique screens"]],
  overview: {
    title: "A new chain, a new exchange, and users who had never touched either",
    paras: [
      "Lumoswap launched alongside a brand-new chain. That meant almost every visitor was new twice: new to Creatorchain, and often new to swapping on a DEX at all. The people it had to win over were comparing it to Binance and Bybit, apps that feel instant and safe, not to other DEXs.",
      "The brief was to compete with centralised exchanges on experience without giving up what makes DeFi worth using: self-custody and transparency. In practice, that meant presenting complex financial data without overwhelming anyone, with sensible defaults and power-user controls one tap deeper."
    ]
  },
  problem: {
    title: "DEXs ask for trust before they’ve earned it",
    paras: ["The typical DEX flow puts every scary decision up front. You connect a wallet before you can see anything, you’re asked about slippage and deadlines you don’t understand, and the confirmation screen speaks in contract addresses. People who are used to fintech apps leave at the first unfamiliar word."],
    journey: [
      { t: "Land", d: "A marketing page that explains the chain, not what you can do right now." },
      { t: "Connect first", d: "Most screens are empty until a wallet is connected." },
      { t: "Guess the settings", d: "Slippage and deadlines hide behind a cog with no explanation." },
      { t: "Confirm blind", d: "Approvals and swaps look the same, and fees appear late." },
      { t: "Verify elsewhere", d: "Users open a block explorer to check that it actually worked." }
    ]
  },
  role: [
    { label: "What I owned", t: "Research through handoff", d: "Competitive audit, information architecture, flows, every UI screen, prototypes and the component library used by engineering." },
    { label: "Who I worked with", t: "Founders and frontend engineers", d: "Scope and priorities with the founding team; feasibility of live data, wallet states and contract calls with the engineers." },
    { label: "Constraint", t: "Useful before a wallet is connected", d: "Every screen needed an honest pre-wallet state, because that is the first thing most visitors see." },
    { label: "Constraint", t: "A young chain with thin liquidity", d: "Prices, APYs and pool sizes had to be shown truthfully, even when the numbers were small." }
  ],
  research: {
    title: "What the audit kept showing",
    intro: "I audited the products Lumoswap would be measured against: Uniswap, PancakeSwap and other leading DEXs, alongside the convert and trade flows on centralised exchanges, then mapped where each one asked for a decision.",
    insights: [
      { label: "Behaviour", t: "Most visits are just a swap", d: "The majority of sessions on a DEX are one swap and leave. Anything that delays that first swap is friction." },
      { label: "Anxiety", t: "Settings cause the most doubt", d: "Slippage tolerance and deadlines are where newcomers hesitate. Good products pick a safe default and explain it in place." },
      { label: "Empty states", t: "Pre-wallet is the default state", d: "The best products are still useful before you connect: prices, charts and pools are visible to everyone." }
    ],
    insight: "People don’t need fewer controls. They need the right control at the right moment, with the safe choice already made."
  },
  process: [
    { t: "Audit & map", d: "Benchmarked DEXs and CEX convert flows; mapped every decision a user is asked to make." },
    { t: "Structure", d: "Split the product into Trade, Earn and Bridge so each mode has one clear job." },
    { t: "Swap first", d: "Wireframed the swap in isolation until it worked in three taps, then built everything around it." },
    { t: "Visual language", d: "Yellow on black, a quiet grid and generous numerals: a brand that reads as fast and precise." },
    { t: "Prototype & refine", d: "Clickable flows for swap, add-liquidity and staking, refined in reviews with the team." },
    { t: "System & handoff", d: "Components, tokens and states documented so engineering could build 40+ screens consistently." }
  ],
  decisions: [
    { t: "Put the swap on the landing page", call: "The hero of the marketing page holds a working swap widget, with Swap, Liquidity and Bridge as tabs. Your first action is one scroll away from your first impression.", tradeoff: "It took space from storytelling. Features, roadmap and the chain’s pitch moved below the fold, a fair trade for a product whose best argument is using it.", img: "lumoswap-1.jpg" },
    { t: "Two densities of the same trade", call: "A calm, single-purpose swap for most people, and a full trading view with candlestick charts, indicators and timeframes for traders. Both run on the same components.", tradeoff: "Two surfaces to design and maintain. Sharing one component set kept them in sync and let users graduate from one to the other without relearning anything.", img: "lumoswap-4.jpg" },
    { t: "Staking rows that explain themselves", call: "Flexible and locked APY sit side by side in every row. Expanding a row reveals total locked, average lock duration, fees and the contract link, right where the decision is made.", tradeoff: "Longer pages than hiding details in modals. Inline expansion won because people compare pools, and modals make comparing impossible.", img: "lumoswap-3.jpg" }
  ],
  screens: {
    title: "Lumoswap, end to end",
    intro: "The core surfaces, in the order a new user meets them.",
    items: [
      { img: "lumoswap-1.jpg", t: "Landing", d: "The pitch and the product in one view: a working swap sits right under the headline." },
      { img: "lumoswap-4.jpg", t: "Swap", d: "Two amounts, one switch, a visible slippage default and a single primary action." },
      { img: "lumoswap-2.jpg", t: "Trade & liquidity", d: "Charts for traders next to a liquidity panel that is honest about its empty state." },
      { img: "lumoswap-3.jpg", t: "Staking", d: "Pools you can compare at a glance, with the details one tap deeper." }
    ]
  },
  outcome: {
    title: "A complete exchange on one coherent system",
    items: [
      { t: "40+ screens", d: "Swap, trade, liquidity, bridge, staking and farming, designed end to end." },
      { t: "Swap in three taps", d: "From landing to confirmation without leaving the first screen." },
      { t: "Useful before connecting", d: "Every surface has a designed pre-wallet state that sells the product." },
      { t: "One identity", d: "Yellow on black, carried from the logo to the Proceed button." }
    ]
  },
  reflection: {
    quote: "In DeFi, clarity is a security feature.",
    text: "If I did Lumoswap again, I’d put pending, failed and reverted transactions in front of users much earlier. Those moments decide whether someone trusts an exchange, and they deserve as much care as the happy path."
  }
},
{
  slug: "oaksjet", name: "Oaksjet", category: "Travel / Luxury", year: "2025",
  tagline: "A higher standard of travel.",
  cover: "Oakjets cover.jpg",
  statement: "Making a private jet charter feel as simple as booking a commercial flight.",
  intro: "Oaksjet is a private jet booking platform for the Nigerian market. I designed both sides of it: the traveller experience on mobile and desktop, and the operator tools charter companies use to list aircraft, accept bookings and manage availability.",
  meta: [["Role", "Lead Product Designer"], ["Year", "2025"], ["Sector", "Travel / Luxury"], ["Deliverables", "UX, UI, design system"], ["Surfaces", "Mobile, desktop, operator app"]],
  overview: {
    title: "A luxury purchase that still ran on phone calls",
    paras: [
      "For most people in Nigeria, chartering a jet means knowing a broker. Trips are described over WhatsApp, quotes arrive as screenshots, and the price depends on who you asked. It’s slow for travellers and expensive for operators, who lose time to back-and-forth that never turns into a booking.",
      "Oaksjet had to make that market legible: real aircraft, real prices, real availability. Mobile is built for speed: route, jet, confirm. Desktop opens up a richer experience for corporate travel managers comparing options."
    ]
  },
  problem: {
    title: "Opaque pricing and no way to judge an operator",
    paras: ["Travellers couldn’t compare aircraft or prices side by side, and first-time flyers had no way to tell a reputable operator from an unknown one. Operators, meanwhile, had no single place to receive requests, confirm them and keep their calendar honest."],
    journey: [
      { t: "Find a broker", d: "Through a contact, a referral or social media." },
      { t: "Describe the trip", d: "Dates, passengers and preferences typed out in chat." },
      { t: "Wait for quotes", d: "Prices arrive hours later, in different formats." },
      { t: "Compare screenshots", d: "No consistent way to weigh aircraft, time and cost." },
      { t: "Pay and hope", d: "Little visibility of who actually operates the flight." }
    ]
  },
  role: [
    { label: "What I owned", t: "Both sides of the marketplace", d: "Traveller flows on mobile and desktop, the operator app, the operator profile and the shared design system." },
    { label: "Who I worked with", t: "Founders and the build team", d: "Business rules for pricing, deals and verification with the founders; feasibility and data with engineering." },
    { label: "Constraint", t: "Trust before the first booking", d: "Most users had never chartered before; the product had to answer “who is flying me?” before asking for money." },
    { label: "Constraint", t: "Local by default", d: "Naira pricing, local routes and the way people here actually plan trips." }
  ],
  research: {
    title: "What shaped the design",
    intro: "I studied how charters are booked today, through brokers, operator websites and international platforms, and looked at the decision a traveller is really making.",
    insights: [
      { label: "Travellers", t: "People think in trips, not aircraft", d: "Very few know a Citation from a Gulfstream. They know where, when and how many." },
      { label: "Pricing", t: "Hourly rates hide the real cost", d: "What people want to know is the total for this trip, and how long the flight takes." },
      { label: "Operators", t: "Requests arrive everywhere", d: "Bookings come through calls, chats and email, with no calendar keeping them honest." }
    ],
    insight: "Start from the trip, show the total, and let the operator’s credibility do the persuading."
  },
  process: [
    { t: "Map the market", d: "Charted how brokers, operators and travellers interact today, and where money and trust get lost." },
    { t: "Two journeys", d: "Defined the traveller and operator flows separately, then found where they meet: the booking request." },
    { t: "Mobile first", d: "Designed search to booking for one hand: route, jet, confirm." },
    { t: "Desktop depth", d: "Expanded to comparison grids, deals and dashboards for planners and operators." },
    { t: "Trust layer", d: "Operator verification, aircraft specs, amenities and photos as first-class content." },
    { t: "System", d: "A calm, premium visual language and a shared component set across all three surfaces." }
  ],
  decisions: [
    { t: "Ask for the trip, not the aircraft", call: "Search starts with route, date and passengers, then cabin size and comfort level. Results show every suitable jet with flight time, passenger count and a total estimate, not just an hourly rate.", tradeoff: "Enthusiasts who want a specific aircraft browse second. That’s the right order for a market where most buyers are first-timers.", img: "oaks3.jpg" },
    { t: "Make operators earn their listing", call: "Operators submit each aircraft for verification. They get a clear “what’s next” with a 24–48 hour review window and a notification when it’s approved.", tradeoff: "It slows operator onboarding. A marketplace selling trust can’t afford unverified inventory.", img: "oaks2.jpg" },
    { t: "Empty legs as a front door", call: "A Current Jet Deals page lists discounted repositioning flights in naira, with dates and routes up front: the most affordable way to try private flying.", tradeoff: "Deals inventory changes constantly and needed its own states and freshness cues, but it gives first-time flyers a reason to start.", img: "oaks4.jpg" }
  ],
  screens: {
    title: "Oaksjet, both sides",
    intro: "From a traveller’s first search to an operator’s calendar.",
    items: [
      { img: "oaks1.jpg", t: "Traveller app", d: "Onboarding, a trip-first search, and a jet page with specs, amenities and photos." },
      { img: "oaks3.jpg", t: "Available jets", d: "Every option compared on what matters: time, capacity and total estimate." },
      { img: "oaks4.jpg", t: "Jet deals", d: "Empty-leg flights, priced in naira, sorted by date." },
      { img: "oaks2.jpg", t: "Operator app", d: "Active aircraft, pending requests and payouts, with confirm and decline one tap away." },
      { img: "oaks5.jpg", t: "Operator desktop", d: "Booking requests arrive as notifications with the payout already calculated." },
      { img: "oaks6.jpg", t: "Availability", d: "A month at a glance: scheduled flights, bookings and unavailable days." }
    ]
  },
  outcome: {
    title: "A marketplace that works for both sides",
    items: [
      { t: "Three surfaces", d: "Mobile, desktop and the operator app, on one design system." },
      { t: "Trip-first booking", d: "From route to a confirmed request without talking to a broker." },
      { t: "Verified supply", d: "Every listed aircraft goes through a visible review." },
      { t: "Operator calendar", d: "Requests, bookings and availability in one place." }
    ]
  },
  reflection: {
    quote: "Luxury isn’t more features. It’s fewer questions.",
    text: "Next time I’d spend more time on what happens after the booking: the days before a flight, changes and cancellations. That’s where a premium service is really judged."
  }
},
{
  slug: "terrace", name: "Terrace", category: "Web3 / Gaming", year: "2025",
  tagline: "A little anticipation. A big reveal.",
  cover: "terrace cover.jpg",
  statement: "Turning an exchange’s onboarding tasks into something people actually want to finish.",
  intro: "Terrace is a crypto exchange with spot trading, a token launchpad and a portfolio dashboard. I designed its Loot Box Launch Campaign, a gamified rewards programme that pays out mystery boxes of $TRC for signing up, trading, referring friends and verifying identity, along with the launchpad.",
  meta: [["Role", "Lead Product Designer"], ["Year", "2025"], ["Sector", "Web3 / Gaming"], ["Deliverables", "UX, UI, design system"], ["Duration", "6 weeks"]],
  overview: {
    title: "Growth goals that users experience as chores",
    paras: [
      "Every exchange needs the same things from new users: sign up, verify identity, make a first trade, invite a friend. Each step is a drop-off point, and a percentage-off banner rarely moves anyone.",
      "Terrace wanted a campaign that made those steps feel like a game, and it had to stay transparent enough that it never felt like a trick, especially for people new to Web3. Every interaction was choreographed around tension and reveal."
    ]
  },
  problem: {
    title: "Rewards campaigns usually hide the rules",
    paras: ["Most exchange campaigns bury eligibility in a terms page. Users don’t know what they’ve earned, what’s left, or why a reward is locked, so excitement turns into support tickets. The campaign needed to be thrilling on the surface and boringly clear underneath."],
    journey: [
      { t: "See a banner", d: "A big promise with the details somewhere else." },
      { t: "Read the terms", d: "Rules written for lawyers, not people." },
      { t: "Do the task", d: "No feedback that it counted." },
      { t: "Wonder", d: "Rewards appear late, or not at all, without explanation." },
      { t: "Ask support", d: "The campaign creates tickets instead of trades." }
    ]
  },
  role: [
    { label: "What I owned", t: "The full campaign scope", d: "User flows, the component system, the end-user claim experience and the operator dashboard that runs the campaign." },
    { label: "Who I worked with", t: "Growth, product and engineering", d: "Reward economics and eligibility with growth; animation and state handling with engineering." },
    { label: "Constraint", t: "Six weeks, launch-date fixed", d: "The campaign was tied to a launch moment, so scope was cut to what made the loop work." },
    { label: "Constraint", t: "Exciting, never misleading", d: "Rarity, rewards and unlock rules had to be visible and honest." }
  ],
  research: {
    title: "What makes reward loops work",
    intro: "I studied reward mechanics in games, loyalty programmes and other exchange campaigns, looking at what keeps people engaged and what makes them feel cheated.",
    insights: [
      { label: "Motivation", t: "Anticipation beats the prize", d: "The moment before a reveal is what people remember. Showing what you might get makes opening worth it." },
      { label: "Clarity", t: "Progress needs to be visible", d: "People finish tasks when they can see what’s done, what’s next and what each step is worth." },
      { label: "Trust", t: "Locked needs a reason", d: "A locked reward without an explanation reads as a bait-and-switch." }
    ],
    insight: "Put the rules right next to the reward, and let the reveal do the selling."
  },
  process: [
    { t: "Define the loop", d: "Mapped every task to a reward and every reward to a state: available, earned, claimed, locked." },
    { t: "Flows", d: "Designed the paths for new, unverified, verified and referred users." },
    { t: "Reveal choreography", d: "Storyboarded the box-opening moment: tiers, spin, reveal and claim." },
    { t: "System", d: "Built a campaign component set that sits on top of the exchange’s existing UI." },
    { t: "Responsive", d: "Adapted the experience for mobile, including an entry modal for returning users." },
    { t: "Operator tools", d: "Designed the dashboard the team uses to monitor and run the campaign." }
  ],
  decisions: [
    { t: "Show the rules next to the reward", call: "A “How to earn lootboxes” panel stays beside the campaign, listing every task with its own status: Earned, Claimed or Locked, plus an inline referral link to copy.", tradeoff: "A busier page than a clean hero with an FAQ link. Clarity won because confusion is what kills campaigns.", img: "terrace-1.jpg" },
    { t: "Rarity as a visible ladder", call: "Before you open anything, a carousel shows every tier, from Common to Epic, Legendary and Mythic, with a single “Spin to open” action at the centre.", tradeoff: "Showing the top tiers sets expectations, so the odds and rewards behind them had to be honest. That honesty is the point.", img: "terrace-2.jpg" },
    { t: "Verification as an unlock, not a gate", call: "Unverified users can earn up to 10 boxes. Verifying identity removes the cap, so KYC becomes something you choose to do because you want more.", tradeoff: "Some users will stop at 10. Those who verify do it willingly, which is better for the exchange than forced KYC at sign-up.", img: "terrace-1.jpg" }
  ],
  screens: {
    title: "The campaign, and beyond",
    intro: "Desktop and mobile, plus the launchpad built on the same system.",
    items: [
      { img: "terrace-1.jpg", t: "Campaign home", d: "Your boxes, your $TRC, the tier ladder and how to earn more, all on one screen." },
      { img: "terrace-2.jpg", t: "Desktop & mobile", d: "The campaign on both, with a mobile entry modal that invites the first box." },
      { img: "terrace-3.jpg", t: "Launchpad", d: "New, ongoing and completed token launches in three live columns, built for scanning." }
    ]
  },
  outcome: {
    title: "A growth loop people enjoy",
    items: [
      { t: "Shipped in 6 weeks", d: "Flows, components, claim experience and operator dashboard." },
      { t: "Every task, one status", d: "Earned, claimed or locked, always visible and always explained." },
      { t: "KYC by choice", d: "Verification reframed as an unlock instead of a wall." },
      { t: "Reusable system", d: "Campaign components the team can reuse for future drops." }
    ]
  },
  reflection: {
    quote: "Delight works best when the rules are boring and clear.",
    text: "With more time I’d have designed the end of the campaign as carefully as the start: what happens to unclaimed boxes, and how to keep people trading once the boxes stop."
  }
},
{
  slug: "dreamspace", name: "Dreamspace", category: "AI / Data", year: "2024",
  tagline: "Complex data. Clear possibilities.",
  cover: "Dreamspace cover.jpg",
  statement: "From a sentence to an on-chain app, without losing the developers along the way.",
  intro: "Dreamspace, built on Space and Time, lets anyone generate data-driven dapps and dashboards from a prompt, backed by verifiable on-chain data and SQL. I designed the builder, the project space and the developer surfaces around them.",
  meta: [["Role", "Product Designer"], ["Year", "2024"], ["Sector", "Web3 / AI / Data"], ["Deliverables", "UX, UI, design system, docs"], ["Audience", "Developers & enterprise"]],
  overview: {
    title: "Two audiences who want the same thing in different languages",
    paras: [
      "Dreamspace serves two very different people. Developers want SQL, schemas and APIs. Business users want a dashboard that answers their question. Both want an app built on data they can trust.",
      "AI made it possible to go from a sentence to a working app. The design challenge was keeping that magic without hiding the machinery, so that developers could always see, edit and verify what was generated. I built a layered information architecture: clear results up front, technical depth one click deeper. I also led the developer docs and API key management flows."
    ]
  },
  problem: {
    title: "AI builders feel magic until you need to change something",
    paras: ["Prompt-to-app tools are impressive in a demo and frustrating on day two. You can’t see what was generated, you can’t safely try a change, and you can’t prove where the data came from. For a platform whose promise is verifiable data, that black box was unacceptable."],
    journey: [
      { t: "Prompt", d: "Describe what you want and wait." },
      { t: "Get a result", d: "A finished-looking app with no visible logic." },
      { t: "Try to adjust", d: "Re-prompt and hope nothing else breaks." },
      { t: "Lose a version", d: "A good state is overwritten by a worse one." },
      { t: "Start again", d: "Or give up and write it by hand." }
    ]
  },
  role: [
    { label: "What I owned", t: "Builder, projects and developer surfaces", d: "The prompt experience, the generation panel, components and themes, versioning, the projects space, docs and API key flows." },
    { label: "Who I worked with", t: "Product, AI and data engineers", d: "What the model could reliably generate, and how queries and data sources could be exposed." },
    { label: "Constraint", t: "Verifiable by design", d: "Every app had to stay traceable to the queries and data behind it." },
    { label: "Constraint", t: "Two levels of expertise", d: "One product for people who write SQL and people who never will." }
  ],
  research: {
    title: "What we learned about building with AI",
    intro: "I reviewed AI app builders, BI tools and developer consoles, and walked through each with both audiences in mind.",
    insights: [
      { label: "Developers", t: "Trust needs a view of the source", d: "Developers accept generated output when they can see and edit the query underneath it." },
      { label: "Everyone", t: "Iteration needs a safety net", d: "People experiment more when going back is easy and visible." },
      { label: "Business users", t: "Start with a question, not a schema", d: "Non-technical users describe outcomes. The interface should meet them there." }
    ],
    insight: "Let people start with words, but always let them see, and own, what the words produced."
  },
  process: [
    { t: "Audit", d: "Mapped AI builders, BI tools and developer consoles against both audiences." },
    { t: "Layered IA", d: "Defined the levels: prompt, generated app, components, queries and data." },
    { t: "Builder concepts", d: "Explored full-page, split-screen and docked-panel builders." },
    { t: "Prototype", d: "Prototyped the docked panel with live preview and version history." },
    { t: "Visual language", d: "A layered, translucent aesthetic that makes depth literal." },
    { t: "Docs & keys", d: "Designed the developer docs and API key management alongside the product." }
  ],
  decisions: [
    { t: "Prompt first, query underneath", call: "The home screen is a single question: “What do you want to build?”. Beneath it, a live SQL editor and data tables show exactly what the platform is querying.", tradeoff: "Showing SQL on a home screen risks intimidating business users. Keeping it secondary, but visible, earned developers’ trust without blocking anyone.", img: "dreamspace-1.jpg" },
    { t: "The builder is a panel, not a page", call: "Generation lives in a docked panel with Chat, Components and Flair & Themes tabs, and a live preview toggle, so you watch the app change as you talk to it.", tradeoff: "A narrower canvas than a full-screen editor. Seeing cause and effect side by side mattered more.", img: "dreamspace-2.jpg" },
    { t: "Versions as pictures", call: "Every page keeps a visual version history with thumbnails, so going back to “the one that worked” is a glance, not a guess.", tradeoff: "More storage and rendering for every change, in exchange for the confidence to experiment.", img: "dreamspace-3.jpg" }
  ],
  screens: {
    title: "Dreamspace, from prompt to project",
    intro: "The builder and the space that holds everything you make.",
    items: [
      { img: "dreamspace-1.jpg", t: "Prompt & chat", d: "Describe the app; the conversation and its result stay side by side." },
      { img: "dreamspace-2.jpg", t: "Components", d: "Data visualisation, featured and community components to drop into any page." },
      { img: "dreamspace-3.jpg", t: "Pages & versions", d: "Every page of your app, with a visual history of each one." },
      { img: "dreamspace-4.jpg", t: "My projects", d: "Apps, dashboards and saved queries in one place." }
    ]
  },
  outcome: {
    title: "A builder developers could trust",
    items: [
      { t: "Prompt to app", d: "A sentence becomes a working, data-backed app or dashboard." },
      { t: "Always inspectable", d: "Queries and data stay one click away from what was generated." },
      { t: "Safe iteration", d: "Visual version history for every page." },
      { t: "Developer ready", d: "Docs and API key management designed as part of the product." }
    ]
  },
  reflection: {
    quote: "The best AI interfaces show their work.",
    text: "If I revisited Dreamspace, I’d design clearer ways to explain why the AI produced what it did. Showing the source made people trust it, and showing the reasoning would help them steer it."
  }
},
{
  slug: "washpadi", name: "Washpadi", category: "Consumer / Mobile", year: "2025",
  tagline: "Everyday life, a little lighter.",
  cover: "Washpadi cover.jpg",
  statement: "One laundry service, three very different people to design for.",
  intro: "Washpadi is an on-demand laundry service. I designed all three surfaces: the customer app for booking pickups, the vendor app laundries use to run their business, and the admin platform that keeps the marketplace safe and moving.",
  meta: [["Role", "Lead Product Designer"], ["Year", "2025"], ["Sector", "Consumer / On-demand"], ["Deliverables", "UX, UI, design system"], ["Surfaces", "Customer app, vendor app, admin"]],
  overview: {
    title: "A marketplace is only as good as its weakest side",
    paras: [
      "Customers want laundry to feel like ordering food: pick a service, see a price, schedule a pickup, and forget about it. Vendors are small laundry businesses, often run from a single Android phone by people who don’t think of themselves as tech users. The admin team sits between them, handling verification, disputes and payments.",
      "The challenge was building one design language across all three surfaces without flattening their differences. Each had to feel native to the person using it."
    ]
  },
  problem: {
    title: "Laundry runs on trust, and trust breaks easily",
    paras: ["Today, people find a laundry through word of mouth, negotiate prices in person and chase updates by phone. Items go missing, deliveries slip, and there’s nobody to complain to. For vendors, paperwork, payments and verification feel like obstacles, not opportunities."],
    journey: [
      { t: "Find a laundry", d: "Through neighbours, with no reviews or prices." },
      { t: "Agree a price", d: "Item by item, often differently each time." },
      { t: "Drop off", d: "Or arrange pickup over calls and texts." },
      { t: "Chase updates", d: "No way to know when clothes will be ready." },
      { t: "Resolve issues", d: "Missing or damaged items with nobody to escalate to." }
    ]
  },
  role: [
    { label: "What I owned", t: "Three products, one system", d: "Customer app, vendor app, admin platform and the shared design system beneath them." },
    { label: "Who I worked with", t: "Founders, ops and engineering", d: "Operations and compliance rules with the founders and ops team; build feasibility with engineering." },
    { label: "Constraint", t: "Low-end Android, patchy data", d: "The vendor app had to work for non-technical users on budget phones." },
    { label: "Constraint", t: "Regulatory KYC", d: "Vendors handle money, so BVN and NIN verification were non-negotiable." }
  ],
  research: {
    title: "What each side needed",
    intro: "I mapped the service end to end, from a customer’s booking through a vendor’s day to an admin resolving a dispute, and designed around the moments where each side loses trust.",
    insights: [
      { label: "Customers", t: "Price and timing first", d: "Customers decide on starting price, turnaround and ratings, the same way they choose food." },
      { label: "Vendors", t: "Money and the next job", d: "Vendors open the app to see new orders and what they’ve earned. Everything else is secondary." },
      { label: "Admins", t: "Triage, not browsing", d: "Admins need to know what needs them now: disputes, approvals, stalled orders." }
    ],
    insight: "Same system, different centres of gravity: the order for customers, the money for vendors, the queue for admins."
  },
  process: [
    { t: "Service map", d: "Mapped the whole service across customer, vendor and admin, including failure paths." },
    { t: "Customer flows", d: "Onboarding, browse, book, track and support, modelled on food delivery." },
    { t: "Vendor flows", d: "Onboarding, tiered KYC, orders and payouts for non-technical users." },
    { t: "Admin platform", d: "Dashboards, vendor management, KYC review, disputes and audit logs." },
    { t: "Design system", d: "One type scale, colour and component set, tuned per surface." },
    { t: "Edge cases", d: "Errors, empty states and verification failures designed as carefully as the happy path." }
  ],
  decisions: [
    { t: "Order laundry like ordering food", call: "The home screen leads with service categories (washing, dry cleaning, ironing, home and bedding), each with a starting price, followed by rated shops with distance and turnaround.", tradeoff: "A marketplace-first home puts the Washpadi brand in the background. Familiarity was worth more than novelty for an everyday service.", img: "User 2.jpg" },
    { t: "A vendor app built around money", call: "The vendor home opens on this week’s orders, revenue with an instant withdraw, and a monthly goal that lowers fees. New orders follow, each with its pickup schedule.", tradeoff: "Analytics and settings are deeper in the app. For a small business owner, earnings and the next job are the whole point.", img: "Vendor 1.jpg" },
    { t: "KYC in tiers, errors that explain the fix", call: "Verification is split into tiers (BVN, then NIN, then address), each raising the vendor’s limit. When something fails, like a BVN mismatch, the app says what happened and how to fix it.", tradeoff: "Tiers add complexity to the rules. They let vendors start earning sooner instead of abandoning a long form.", img: "Vendor 2.jpg" },
    { t: "An admin that triages", call: "The admin dashboard leads with a Needs attention queue (escalated disputes, deactivation approvals, KYC reviews, stalled orders) and a full audit log of who did what.", tradeoff: "Less space for charts. Admins don’t need to be impressed; they need to know what to do next.", img: "Admin 1.jpg" }
  ],
  screens: {
    title: "Three surfaces, one language",
    intro: "Customer, vendor and admin, in that order.",
    items: [
      { img: "crest-grid.jpg", t: "Customer & vendor", d: "Onboarding, the customer home and the vendor dashboard side by side.", wide: true },
      { img: "lumoswap-grid.jpg", t: "Booking & wallet", d: "Order tracking, a bucket priced per item, wallet top-ups and a pickup scheduler." },
      { img: "dreamspace-grid.jpg", t: "Vendor services", d: "Order details, per-item service pricing and the vendor’s shop profile." },
      { img: "User 1.jpg", t: "Customer onboarding", d: "Three promises: hassle-free, pickup and delivery, and tracking." },
      { img: "User 2.jpg", t: "Customer app", d: "Categories with prices, featured shops, support with quick replies, and shop profiles." },
      { img: "Vendor 2.jpg", t: "Vendor onboarding", d: "A business pitch, tiered KYC and clear error recovery." },
      { img: "Vendor 1.jpg", t: "Vendor app", d: "Revenue, goals, orders by status and a full order timeline." },
      { img: "Admin 1.jpg", t: "Admin dashboard", d: "Orders, vendors, volume and revenue, with a triage queue and audit log." },
      { img: "Admin 3.jpg", t: "Vendor management", d: "Performance, revenue, service areas and orders, with suspend and deactivate controls." },
      { img: "Admin 2.jpg", t: "Finding vendors", d: "Filter vendors by service type, location, rating and completion rate." },
      { img: "Admin 4.jpg", t: "KYC review", d: "Submitted documents and ID details in one panel, with approve and reject side by side." }
    ]
  },
  outcome: {
    title: "A full service, designed end to end",
    items: [
      { t: "3 surfaces", d: "Customer app, vendor app and admin platform on one design system." },
      { t: "Food-delivery ease", d: "Book, track and get support without a phone call." },
      { t: "Vendors earn sooner", d: "Tiered KYC gets laundries live before full verification." },
      { t: "Accountable ops", d: "A triage-first admin with a complete audit trail." }
    ]
  },
  reflection: {
    quote: "A shared design system shouldn’t make different people feel the same.",
    text: "Next time I’d test the vendor app on real budget devices and real networks from the first wireframe, rather than at the end. That’s where its hardest design problems were hiding."
  }
},
{
  slug: "glitch-market", name: "Glitch Market", category: "AI / Web3", year: "2024",
  tagline: "Making sense of what’s next.",
  cover: "Glitch markets cover.jpg",
  statement: "A prediction market where AI agents don’t just assist. They trade, signal and resolve.",
  intro: "Glitch Market is an AI-powered prediction market where people stake on real-world and on-chain outcomes. AI agents act as market makers, generate signals and help resolve disputes. I led product design and the brand.",
  meta: [["Role", "Lead Product Designer"], ["Year", "2024"], ["Sector", "AI / Web3 / DeFi"], ["Deliverables", "UX, UI, brand, design system"], ["Platform", "Web app + mobile"]],
  confidential: "Full screens are under wraps for now. I’m happy to walk through them on a call.",
  overview: {
    title: "A genuinely complex system that had to feel legible and exciting",
    paras: [
      "Prediction markets attract two very different crowds: casual users betting on pop culture, and sophisticated traders analysing on-chain signals. Glitch Market adds a third participant, AI agents that make markets and validate outcomes.",
      "The interface had to serve all of them, with completely different information densities available at different levels of engagement."
    ]
  },
  problem: {
    title: "When the agents are players, users need to see the game",
    paras: ["If AI is setting prices and resolving outcomes, people need to understand what it’s doing and why, or the market feels rigged. And none of that can make a casual bet feel like homework."],
    journey: [
      { t: "Find a market", d: "Hundreds of questions, with no sense of what’s live or trusted." },
      { t: "Read the odds", d: "Probabilities without context on who set them." },
      { t: "Stake", d: "A trade-terminal flow for a casual opinion." },
      { t: "Wait", d: "No visibility into how resolution will happen." },
      { t: "Dispute", d: "An opaque process when the outcome looks wrong." }
    ]
  },
  role: [
    { label: "What I owned", t: "Product and brand", d: "Market creation, the live betting interface, the AI signal feed, resolution review and the visual identity." },
    { label: "Who I worked with", t: "Founders and protocol engineers", d: "Market mechanics, agent behaviour and resolution rules." },
    { label: "Constraint", t: "Two crowds, one interface", d: "Casual bettors and serious traders using the same markets." },
    { label: "Constraint", t: "Explainable AI", d: "Every agent action had to be visible and attributable." }
  ],
  research: {
    title: "What shaped the approach",
    intro: "I studied existing prediction markets, trading terminals and AI agent products to understand how each builds, or loses, trust.",
    insights: [
      { label: "Casual users", t: "One question, one tap", d: "Casual users want the question, the odds and a stake button, and nothing else." },
      { label: "Traders", t: "Signal is the product", d: "Traders want probability curves, volume and the reasoning behind moves." },
      { label: "Trust", t: "Resolution is the moment of truth", d: "Markets are judged by how fairly they end, not how they start." }
    ],
    insight: "Make the AI a visible participant, with a name, a history and a record, not an invisible hand."
  },
  process: [
    { t: "Mechanics", d: "Mapped how markets are created, priced, traded and resolved, and where agents participate." },
    { t: "Levels of depth", d: "Defined a casual layer and a trader layer over the same market." },
    { t: "Core flows", d: "Market creation, live betting, the signal feed and resolution review." },
    { t: "Brand", d: "Controlled chaos: glitch aesthetics, data noise and neon on dark." },
    { t: "System", d: "Components for probabilities, curves, agent activity and disputes." },
    { t: "Mobile", d: "The casual layer adapted for quick bets on the go." }
  ],
  decisions: [
    { t: "Agents as visible participants", call: "Agent actions (signals, liquidity and resolution votes) appear in a live feed, attributed to named agents with track records.", tradeoff: "More on screen. Without it, AI-driven prices would read as manipulation." },
    { t: "Two densities on the same market", call: "A market opens with the question, current odds and a stake action. Real-time probability curves and signals expand for those who want them.", tradeoff: "Traders take one extra step. Casual users never see a terminal they didn’t ask for." },
    { t: "A brand that embraces the noise", call: "The identity leans into glitch: chromatic offsets, data noise and neon on dark, so complexity feels intentional rather than broken.", tradeoff: "A polarising look. It makes Glitch Market instantly recognisable in a category of look-alikes." }
  ],
  screens: { title: "Under wraps", intro: "The brand is public. The product screens aren’t, yet.", items: [{ img: "Glitch markets cover.jpg", t: "Brand", d: "The Glitch Markets mark: friendly, a little unstable, very on brand." }] },
  outcome: {
    title: "What was designed",
    items: [
      { t: "Market creation", d: "Anyone can propose a market with clear resolution rules." },
      { t: "Live betting", d: "Real-time probability curves with casual and pro depths." },
      { t: "AI signal feed", d: "Agent activity, attributed and explained." },
      { t: "Resolution review", d: "A transparent path when outcomes are disputed." }
    ]
  },
  reflection: {
    quote: "When machines are in the market, transparency is the product.",
    text: "Glitch Market taught me to design AI as a character with accountability, not a feature. That idea has shaped every AI product I’ve worked on since."
  }
}
];

/* Shots outside the case studies */
window.SHOTS = ["agentic-grid.jpg", "supersocial-grid.jpg", "feedpay-grid.jpg", "terrace-grid.jpg", "Frame 253.jpg", "Scene-16.jpg"];
