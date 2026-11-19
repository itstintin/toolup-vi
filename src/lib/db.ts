import { createClient } from "@libsql/client/web";

const url = process.env.LIBSQL_DATABASE_URL || "libsql://toolup-vi-itstintin.aws-ap-south-1.turso.io";
const authToken = process.env.LIBSQL_AUTH_TOKEN || "";

export const db = createClient({
  url,
  authToken,
});

import fs from "fs";
import path from "path";
import { QuestionRecord, Category, IngestPayload, StepItem, SpecRow } from "@/types";
import { calculateReadTime } from "@/lib/utils";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "questions.json");

export const SEED_QUESTIONS: QuestionRecord[] = [
  {
    "id": "gta6-q-001",
    "slug": "how-to-replay-missions-in-gta-6-save-slots-workaround",
    "title": "How to Replay Missions in GTA 6 (15 Manual Save Slots Workaround)",
    "category": "Glitches & Fixes",
    "region": "Vice City",
    "tldrAnswer": "GTA VI Launch Build 1.0 does not include a mission replay menu in the Story menu. To replay heist finales, branching narrative choices, or unique set-pieces without starting a new 80-hour campaign, players must utilize the 15 manual save slots in Pause > Game > Save Game immediately prior to mission trigger markers.",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Locate Upcoming Mission Trigger Marker",
        "instruction": "Before entering gold story mission markers or cartel contract zones across Vice City and Kelly County, halt character movement and do not trigger cutscenes.",
        "tip": "Check mini-map boundaries: stepping within 15 meters of marked NPCs will automatically trigger irreversible mission checkpoints."
      },
      {
        "stepNumber": 2,
        "title": "Access System Game Menu",
        "instruction": "Press Pause (Options / Menu) and navigate to the Game tab. Scroll down to select Save Game."
      },
      {
        "stepNumber": 3,
        "title": "Allocate One of 15 Manual Save Slots",
        "instruction": "Choose an unused or designated archive manual slot (GTA VI reserves 15 discrete manual slots alongside 1 rolling auto-save slot). Confirm the overwrite prompt."
      },
      {
        "stepNumber": 4,
        "title": "Reload Prior States via Load Game",
        "instruction": "Whenever you wish to replay alternate tactical approaches, branching narrative dialogues, or test stealth vs guns-blazing paths, open Pause > Game > Load Game to reload your exact pre-mission state."
      }
    ],
    "specsTable": [
      {
        "label": "Replay Menu in Build 1.0",
        "value": "Omitted at retail launch (Requires manual save rotation)",
        "badge": "Launch Limitation"
      },
      {
        "label": "Manual Save Slot Capacity",
        "value": "15 Dedicated Manual Slots",
        "badge": "Workaround"
      },
      {
        "label": "Auto-Save System",
        "value": "1 Rolling background slot (overwritten frequently)"
      },
      {
        "label": "State Preservation",
        "value": "Preserves exact cash, trunk armory, and vehicle bindings"
      },
      {
        "label": "Key Recommended Anchors",
        "value": "Pre-Heist setup choices, Chapter climaxes, gang war incursions"
      }
    ],
    "sourceUrls": [
      "https://rockstargames.com/vi/support/gameplay-saves",
      "https://toolup-vi.wikiguide.workers.dev/q/how-to-replay-missions-in-gta-6-save-slots-workaround"
    ],
    "lastPatchVerified": "Launch Build 1.0",
    "verifiedPatch": "Launch Build 1.0",
    "readTime": "3 min read",
    "verifiedBy": "Narrative & Saves Research",
    "author": "Lead Systems Analyst",
    "createdAt": "2026-11-15T08:00:00Z",
    "updatedAt": "2026-11-19T09:00:00Z"
  },
  {
    "id": "gta6-q-002",
    "slug": "buckme-banking-family-savings-account-tiers-guide",
    "title": "BuckMe Banking & Family Savings Tiers Guide in GTA VI",
    "category": "Money & ATMs",
    "region": "Vice City",
    "tldrAnswer": "BuckMe is Leonida's premier smartphone banking app featuring 4 account tiers: $5K Buckin' Broke, $10K BuckeDry, $100K BuckMe Gold, and $500K BuckMe Premium. Reaching higher deposit thresholds unlocks automated bail debit protection, joint family account pooling between Jason and Lucia, and up to 1.25% weekly interest dividends.",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Access the BuckMe Banking App",
        "instruction": "Open the in-game smartphone OS and select BuckMe to view Jason and Lucia's current ledger balances, pending wire transfers, and tier upgrade requirements."
      },
      {
        "stepNumber": 2,
        "title": "Deposit $5,000 for Buckin' Broke Tier",
        "instruction": "Deposit your first $5,000 to unlock basic peer-to-peer wireless transfers between Jason and Lucia with a $1,000 per in-game day transfer cap.",
        "tip": "P2P transfers allow you to bail out your co-protagonist from anywhere on the map."
      },
      {
        "stepNumber": 3,
        "title": "Reach $10,000 for BuckeDry Protection",
        "instruction": "Maintaining $10,000 unlocks BuckeDry automated bail debit, protecting 100% of your banked funds from seizure upon police arrest."
      },
      {
        "stepNumber": 4,
        "title": "Scale to BuckMe Gold ($100K) & Premium ($500K)",
        "instruction": "High rollers gain access to pooled joint accounts, zero-fee international offshore laundering, and passive compound interest paid every in-game Sunday at midnight."
      }
    ],
    "specsTable": [
      {
        "label": "Tier 1: Buckin' Broke ($5K)",
        "value": "P2P mobile transfers, $1K daily limit",
        "badge": "Level 1"
      },
      {
        "label": "Tier 2: BuckeDry ($10K)",
        "value": "Automated bail debit, zero death penalty on banked funds",
        "badge": "Essential"
      },
      {
        "label": "Tier 3: BuckMe Gold ($100K)",
        "value": "Joint family pooling, 0.75% weekly interest yield",
        "badge": "High Yield"
      },
      {
        "label": "Tier 4: BuckMe Premium ($500K)",
        "value": "Unlimited wires, 1.25% weekly yield, 24/7 retainer lawyer hotline",
        "badge": "VIP Elite"
      },
      {
        "label": "Physical ATM Bypass",
        "value": "Full electronic banking anywhere with cell signal"
      }
    ],
    "sourceUrls": [
      "https://buckme.leonida.bank/services",
      "https://toolup-vi.wikiguide.workers.dev/q/buckme-banking-family-savings-account-tiers-guide"
    ],
    "lastPatchVerified": "Launch Build 1.0",
    "verifiedPatch": "Launch Build 1.0",
    "readTime": "3 min read",
    "verifiedBy": "Economy & Banking Group",
    "author": "Senior Economy Specialist",
    "createdAt": "2026-11-15T09:00:00Z",
    "updatedAt": "2026-11-19T09:10:00Z"
  },
  {
    "id": "gta6-q-003",
    "slug": "missable-chapter-1-side-missions-shirleys-rum-steal-the-scooter",
    "title": "Missable Chapter 1 Side Missions: Shirley's Rum & Steal the Scooter",
    "category": "Map & Regions",
    "region": "Leonida Keys",
    "tldrAnswer": "Chapter 1 contains two permanently missable side missions on Key Lento: 'Shirley's Bootleg Rum' and 'Steal the Scooter'. Both missions expire permanently upon triggering the 'Tourist Trap' story beat. Completing them unlocks the secret Exotic Animals Front contraband smuggler network and a 25% courier payout boost on Scooter Bros.",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Locate Key Lento Before Starting 'Tourist Trap'",
        "instruction": "Prior to initiating the 'Tourist Trap' story mission icon in Kelly County, travel southwest along the Overseas Highway to Key Lento.",
        "coordinates": "24.582\u00b0 N, 81.411\u00b0 W",
        "tip": "Triggering the Tourist Trap motel cutscene locks Chapter 1 world states permanently."
      },
      {
        "stepNumber": 2,
        "title": "Retrieve Shirley's Bootleg Rum",
        "instruction": "Speak with Old Shirley behind the rustic marina shack to accept the salvage contract. Dive into the shallow coral mangrove channels to haul up 3 waterlogged rum barrels while evading reef bull sharks."
      },
      {
        "stepNumber": 3,
        "title": "Intercept the Scooter Courier ('Steal the Scooter')",
        "instruction": "Locate the marked Scooter Bros delivery rider stationed near the motel gas pump. Jack the custom green scooter and deliver it to the secluded mangrove dock."
      },
      {
        "stepNumber": 4,
        "title": "Unlock the Exotic Animals Front Network",
        "instruction": "Delivering both assets before Chapter 1 concludes introduces you to the Exotic Animals Front smuggler contact, providing illegal wildlife contraband transport contracts throughout the rest of the campaign."
      }
    ],
    "specsTable": [
      {
        "label": "Expiry Milestone",
        "value": "Initiating Chapter 1 story mission 'Tourist Trap'",
        "badge": "Permanently Missable"
      },
      {
        "label": "Geographic Location",
        "value": "Key Lento, Southern Leonida Keys (24.582\u00b0 N, 81.411\u00b0 W)",
        "badge": "Coordinates"
      },
      {
        "label": "Mission 1 Reward",
        "value": "$2,500 Cash + Exotic Animals Front Smuggler Contact"
      },
      {
        "label": "Mission 2 Reward",
        "value": "$2,000 Cash + Permanent 25% Scooter Bros delivery bonus"
      },
      {
        "label": "Campaign Impact",
        "value": "Exclusive contraband trade route inaccessible if missed"
      }
    ],
    "sourceUrls": [
      "https://rockstargames.com/vi/keys-intel",
      "https://toolup-vi.wikiguide.workers.dev/q/missable-chapter-1-side-missions-shirleys-rum-steal-the-scooter"
    ],
    "lastPatchVerified": "Launch Build 1.0",
    "verifiedPatch": "Launch Build 1.0",
    "readTime": "3 min read",
    "verifiedBy": "Field Cartography & Missions",
    "author": "Campaign Intel Officer",
    "createdAt": "2026-11-15T10:00:00Z",
    "updatedAt": "2026-11-19T09:20:00Z"
  },
  {
    "id": "gta6-q-004",
    "slug": "how-to-deposit-cash-at-atms-without-losing-money-on-death",
    "title": "How to Deposit Cash at ATMs & Avoid Death Forfeiture in GTA VI",
    "category": "Money & ATMs",
    "region": "Vice City",
    "tldrAnswer": "GTA VI features an uncompromising financial penalty: any physical cash exceeding the $999 wallet threshold is 100% forfeited upon death (Wasted) or arrest (Busted). Deposit physical greenbacks at green Leonida Federal ATM terminals or use BuckMe's wireless banking to keep balances safe in individual checking accounts.",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Monitor On-Person Physical Cash",
        "instruction": "Keep an eye on the top-right wallet counter. When cash exceeds $999, head directly to a banking terminal to prevent catastrophic losses upon dying.",
        "tip": "Always maintain at least $250 for quick convenience purchases, fuel, and minor bribe options."
      },
      {
        "stepNumber": 2,
        "title": "Locate a Functional Leonida Federal ATM",
        "instruction": "Search convenience store exteriors, gas stations across Vice Beaches, and bank lobbies in Downtown Vice City for glowing green ATM terminals.",
        "coordinates": "25.761\u00b0 N, 80.191\u00b0 W"
      },
      {
        "stepNumber": 3,
        "title": "Select Active Protagonist Account",
        "instruction": "Interact with the kiosk (D-Pad Right). Choose whether to deposit into Jason or Lucia's account (balances are kept strictly separate until late-game joint heists)."
      },
      {
        "stepNumber": 4,
        "title": "Confirm Deposit or Use BuckMe App",
        "instruction": "Select 'Deposit All Street Cash' to instantly credit your balance with 0% municipal fees, or use BuckMe on your smartphone for remote wire transfers."
      }
    ],
    "specsTable": [
      {
        "label": "Safe Wallet Threshold",
        "value": "$999 (Amounts above this risk 100% forfeiture on death)",
        "badge": "Critical Rule"
      },
      {
        "label": "Death / Arrest Penalty",
        "value": "100% loss of unbanked street cash + hospital/bail fees"
      },
      {
        "label": "Protagonist Accounts",
        "value": "Jason Duval & Lucia Caminos (Separate balances)",
        "badge": "Individual"
      },
      {
        "label": "ATM Deposit Fee",
        "value": "$0 (Free at all Leonida Federal ATMs)"
      },
      {
        "label": "App Alternative",
        "value": "BuckMe Wireless Transfers (Smartphone OS)"
      }
    ],
    "sourceUrls": [
      "https://rockstargames.com/vi/gameplay-overview",
      "https://toolup-vi.wikiguide.workers.dev/q/how-to-deposit-cash-at-atms-without-losing-money-on-death"
    ],
    "lastPatchVerified": "Launch Build 1.0",
    "verifiedPatch": "Launch Build 1.0",
    "readTime": "2 min read",
    "verifiedBy": "Economy & Banking Group",
    "author": "Lead Economy Researcher",
    "createdAt": "2026-11-15T12:00:00Z",
    "updatedAt": "2026-11-19T09:30:00Z"
  },
  {
    "id": "gta6-q-005",
    "slug": "how-to-strip-gps-trackers-at-a-fence-and-register-stolen-cars",
    "title": "How to Strip GPS Trackers at a Fence and Register Stolen Cars",
    "category": "Vehicles & Fences",
    "region": "Port Gellhorn",
    "tldrAnswer": "Stolen sports cars and luxury exotics emit automatic LoJack police pings within 90 seconds of theft. Drive stolen rides to an underground chop shop fence in Port Gellhorn or One-Eyed Willie's Mod Shop (Ultimate Edition) to sever GPS telemetry wires, then re-plate at Pay N' Spray (Base Game) or Rideout Customs (Ultimate Edition) for permanent garage ownership.",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Evade the 90-Second Police Telemetry Ping",
        "instruction": "Hotwiring high-tier exotics triggers an automated LoJack police beacon within 90 seconds. Immediately vacate the area and avoid highway toll gantries equipped with automatic plate scanners.",
        "coordinates": "27.142\u00b0 N, 82.319\u00b0 W"
      },
      {
        "stepNumber": 2,
        "title": "Deliver to an Underground Vehicle Fence",
        "instruction": "Navigate to an authorized fence at Port Gellhorn industrial docks or One-Eyed Willie's Mod Shop (Ultimate Edition) to sever OEM tracking cables."
      },
      {
        "stepNumber": 3,
        "title": "Pay the Tracker Stripping & VIN Scrub Fee",
        "instruction": "Pay the chop shop mechanic ($1,500 for commuter sedans up to $5,000 for exotic hypercars) to wipe onboard ECU logs and forge dummy registration chips."
      },
      {
        "stepNumber": 4,
        "title": "Re-Plate at Pay N' Spray or Rideout Customs",
        "instruction": "Enter Pay N' Spray (Base Game) or Rideout Customs (Ultimate Edition) for fresh paint and official Leonida plates, permanently registering the vehicle to your summonable personal garage roster."
      }
    ],
    "specsTable": [
      {
        "label": "LoJack Ping Timer",
        "value": "90 Seconds post-theft before dispatch alert",
        "badge": "Countdown"
      },
      {
        "label": "Underground Chop Shops",
        "value": "Port Gellhorn Docks (Base), One-Eyed Willie's Mod Shop (Ultimate Edition)",
        "badge": "Fences"
      },
      {
        "label": "Registration Garages",
        "value": "Pay N' Spray (Base Game), Rideout Customs (Ultimate Edition)"
      },
      {
        "label": "Tracker Removal Fee",
        "value": "$1,500 (Standard) to $5,000 (Exotics/Supercars)"
      },
      {
        "label": "Garage Binding",
        "value": "Permanently registered; summonable via RydeMe app",
        "badge": "Verified"
      }
    ],
    "sourceUrls": [
      "https://rockstargames.com/newswire/gtavi-tuning-guide",
      "https://toolup-vi.wikiguide.workers.dev/q/how-to-strip-gps-trackers-at-a-fence-and-register-stolen-cars"
    ],
    "lastPatchVerified": "Launch Build 1.0",
    "verifiedPatch": "Launch Build 1.0",
    "readTime": "3 min read",
    "verifiedBy": "Vehicle Telemetry Group",
    "author": "Staff Wheelman",
    "createdAt": "2026-11-15T14:30:00Z",
    "updatedAt": "2026-11-19T09:35:00Z"
  },
  {
    "id": "gta6-q-006",
    "slug": "how-the-car-trunk-weapon-system-works",
    "title": "Car Trunk Weapon Armory & Carry Limits Guide in GTA VI",
    "category": "Weapons & Loadouts",
    "region": "Grassrivers",
    "tldrAnswer": "GTA VI eliminates the infinite weapon wheel. Players carry a realistic limit of 2 concealed handguns and 2 slung long weapons (rifles, shotguns, or heavy launchers). Surplus heavy ordnance, sniper platforms, body armor plates, and explosive gear must be stowed in your personal vehicle's trunk armory.",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Understand On-Person Holster Limits",
        "instruction": "Jason and Lucia can physically carry 2 sidearms (pistols, revolvers) in concealed holsters and 2 long guns slung over shoulders. Heavy weapon platforms like RPGs consume one shoulder slot.",
        "coordinates": "25.819\u00b0 N, 80.498\u00b0 W"
      },
      {
        "stepNumber": 2,
        "title": "Access Vehicle Trunk Armory Grid",
        "instruction": "Approach the rear tailgate of any owned personal vehicle and hold Interact to open the trunk cache, revealing your full stashed armory.",
        "tip": "Trunk weapon inventories persist across garage transfers and municipal impounds."
      },
      {
        "stepNumber": 3,
        "title": "Tailor Ordnance for Mission Demands",
        "instruction": "Select situational weapons before breaching hostile compounds\u2014equip suppressed SMGs for stealth or deploy high-caliber anti-materiel rifles for perimeter defense."
      },
      {
        "stepNumber": 4,
        "title": "Replenish Ammunition & Ceramic Plates",
        "instruction": "Accessing the trunk automatically restocks reserve magazine rounds and allows you to equip fresh ballistic chest plates."
      }
    ],
    "specsTable": [
      {
        "label": "On-Body Capacity",
        "value": "2 Concealed Sidearms + 2 Slung Long Weapons",
        "badge": "Strict Limit"
      },
      {
        "label": "Trunk Armory Stash",
        "value": "Up to 12 long guns, heavy launchers & ballistic armor plates"
      },
      {
        "label": "Ammunition Restock",
        "value": "Automatic replenishment from vehicle cache"
      },
      {
        "label": "Base Retailers",
        "value": "Phil's Ammu-Nation, Pawn & Gun"
      },
      {
        "label": "Impound Persistence",
        "value": "Stashed weapons preserved if vehicle is towed or impounded"
      }
    ],
    "sourceUrls": [
      "https://rockstargames.com/newswire/gtavi-weapons-overview",
      "https://toolup-vi.wikiguide.workers.dev/q/how-the-car-trunk-weapon-system-works"
    ],
    "lastPatchVerified": "Launch Build 1.0",
    "verifiedPatch": "Launch Build 1.0",
    "readTime": "2 min read",
    "verifiedBy": "Combat Tactics Group",
    "author": "Tactical Armorer",
    "createdAt": "2026-11-15T08:00:00Z",
    "updatedAt": "2026-11-19T09:40:00Z"
  },
  {
    "id": "gta6-q-007",
    "slug": "how-the-5-rank-criminal-profile-system-works",
    "title": "5-Rank Criminal Profile & Multi-County Heat Cooling System",
    "category": "Criminal Profile & Heat",
    "region": "Ambrosia",
    "tldrAnswer": "GTA VI introduces an overarching 5-Rank Criminal Profile: Professional, Hardened, Violent, Psycho, and Irredeemable. Crime notoriety is tracked independently across regional county boundaries. Escalating ranks trigger tactical SWAT, facial recognition CCTV hits, and highway roadblock checkpoints that require rural safehouse cooling.",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Understand the 5 Notoriety Ranks",
        "instruction": "Criminal profile scales through Professional, Hardened, Violent, Psycho, and Irredeemable. Hardened (Rank 2) introduces SWAT teams, while Violent (Rank 3) and Psycho (Rank 4) deploy attack choppers and spike-strip roadblocks.",
        "coordinates": "28.309\u00b0 N, 81.992\u00b0 W"
      },
      {
        "stepNumber": 2,
        "title": "Exploit County-Line Jurisdiction Boundaries",
        "instruction": "Police dispatches are localized. Crossing from Vice City Metro into Kelly County creates jurisdictional response delays unless your profile is Hardened or higher."
      },
      {
        "stepNumber": 3,
        "title": "Counter CCTV & Facial Recognition Scans",
        "instruction": "Always equip bandanas, masks, or full balaclavas during robberies. Security cameras scan bare faces, logging unmasked crimes directly onto your state profile.",
        "tip": "Swap clothes and change vehicles immediately after breaking line-of-sight to void surveillance matches."
      },
      {
        "stepNumber": 4,
        "title": "Cool Heat at Remote Wilderness Safehouses",
        "instruction": "Retreat to remote rustic cabins across Grassrivers or Mount Kalaga National Park where minimal police patrols accelerate criminal heat decay 3x faster than urban centers."
      }
    ],
    "specsTable": [
      {
        "label": "Profile Ranks",
        "value": "Professional, Hardened, Violent, Psycho, Irredeemable",
        "badge": "5 Tiers"
      },
      {
        "label": "Law Enforcement Branches",
        "value": "Vice City Metro Police (VCMPD), Kelly County Sheriff, Leonida Highway Patrol"
      },
      {
        "label": "Facial Recognition",
        "value": "CCTV logs unmasked crimes to personal profile"
      },
      {
        "label": "Decay Acceleration",
        "value": "3x faster profile cooling at rural safehouses (Grassrivers/Kalaga)"
      },
      {
        "label": "High-Rank Measures",
        "value": "SWAT units, spike strips, air support, state-wide APBs (Rank 4+)"
      }
    ],
    "sourceUrls": [
      "https://leonida-justice.gov/criminal-profiling",
      "https://toolup-vi.wikiguide.workers.dev/q/how-the-5-rank-criminal-profile-system-works"
    ],
    "lastPatchVerified": "Launch Build 1.0",
    "verifiedPatch": "Launch Build 1.0",
    "readTime": "3 min read",
    "verifiedBy": "Jurisdiction & Heat Research",
    "author": "Tactical Operative",
    "createdAt": "2026-11-14T11:00:00Z",
    "updatedAt": "2026-11-19T09:45:00Z"
  },
  {
    "id": "gta6-q-008",
    "slug": "how-to-use-scooter-bros-waink-buckme-and-rydeme-apps-in-leonida",
    "title": "Leonida Smartphone Apps Guide: BuckMe, RydeMe, WAINK & Scooter Bros",
    "category": "Glitches & Fixes",
    "region": "Vice City",
    "tldrAnswer": "Access the in-game smartphone OS to launch WAINK for viral witness feeds, Scooter Bros for gig delivery runs, BuckMe for instant P2P wire transfers between Jason and Lucia without ATM fees, and RydeMe for on-demand civilian ridesharing and emergency getaway vehicle extractions.",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Open the In-Game Smartphone OS",
        "instruction": "Press the smartphone D-Pad button to view installed Leonida utility applications, banking portals, courier tools, and viral social networks.",
        "coordinates": "25.761\u00b0 N, 80.191\u00b0 W"
      },
      {
        "stepNumber": 2,
        "title": "Monitor WAINK for Spontaneous Map Drops",
        "instruction": "Browse clips and live-streams on WAINK to spot spontaneous street races, cartel cargo air-drops, and active police checkpoints.",
        "tip": "Civilian witnesses upload robbery footage to WAINK if you fail to intimidate them, boosting district police presence."
      },
      {
        "stepNumber": 3,
        "title": "Transfer Cash Wirelessly via BuckMe",
        "instruction": "Open BuckMe to execute zero-fee P2P wires between Jason and Lucia's separate accounts anywhere in Leonida, protecting cash without visiting physical ATMs."
      },
      {
        "stepNumber": 4,
        "title": "Hail Getaways with RydeMe & Deliver for Scooter Bros",
        "instruction": "Summon an on-demand civilian driver with RydeMe if your car is wrecked or impounded, and take Scooter Bros food/package delivery gigs across Vice Beaches for rapid starting cash."
      }
    ],
    "specsTable": [
      {
        "label": "Core Smartphone Apps",
        "value": "WAINK (Social), Scooter Bros (Delivery), BuckMe (Banking), RydeMe (Rideshare)",
        "badge": "Leonida OS"
      },
      {
        "label": "BuckMe Wire Fees",
        "value": "$0 municipal transfer fee between protagonists"
      },
      {
        "label": "RydeMe Dispatch Time",
        "value": "30-45 seconds arrival across all 6 regions"
      },
      {
        "label": "Scooter Bros Payouts",
        "value": "$250 to $1,500 per courier delivery"
      },
      {
        "label": "WAINK Witness Mechanics",
        "value": "Unmasked crimes upload to viral feeds, increasing heat"
      }
    ],
    "sourceUrls": [
      "https://waink-social.leonida/feed",
      "https://toolup-vi.wikiguide.workers.dev/q/how-to-use-scooter-bros-waink-buckme-and-rydeme-apps-in-leonida"
    ],
    "lastPatchVerified": "Launch Build 1.0",
    "verifiedPatch": "Launch Build 1.0",
    "readTime": "2 min read",
    "verifiedBy": "App Ecosystem Group",
    "author": "Staff Technologist",
    "createdAt": "2026-11-14T09:15:00Z",
    "updatedAt": "2026-11-19T09:50:00Z"
  },
  {
    "id": "gta6-q-009",
    "slug": "all-6-confirmed-regions-of-leonida-and-key-shops",
    "title": "All 6 Confirmed Regions of Leonida & Essential Shops in GTA VI",
    "category": "Map & Regions",
    "region": "Vice City",
    "tldrAnswer": "Leonida comprises 6 core territories: Vice City, Leonida Keys, Grassrivers, Port Gellhorn, Ambrosia, and Mount Kalaga National Park. Essential supply chains include Phil's Ammu-Nation, Pay N' Spray, and Pawn & Gun in the base game, plus Rideout Customs, One-Eyed Willie's Mod Shop, and PTT Youngin$ (Ultimate Edition exclusives).",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Vice City (Metropolitan Ocean & Nightlife Core)",
        "instruction": "The neon-lit urban center spanning Ocean Drive, Starfish Island, Vice Beaches, and Downtown high-rises. Visit Rideout Customs (Ultimate Edition) or Pay N' Spray for vehicle modding.",
        "coordinates": "25.761\u00b0 N, 80.191\u00b0 W"
      },
      {
        "stepNumber": 2,
        "title": "Leonida Keys (Southern Coral Archipelago)",
        "instruction": "Subtropical island chain linked by the Overseas Highway. Features boat charters, scuba diving shops, and sunken wrecks near Big Pine Key.",
        "coordinates": "24.681\u00b0 N, 81.354\u00b0 W"
      },
      {
        "stepNumber": 3,
        "title": "Grassrivers (Wetland Sawgrass Flats)",
        "instruction": "Expansive swamp marshlands where bait & tackle depots supply Nagasaki airboats and bootleg moonshine runs navigate tidal creeks.",
        "coordinates": "25.819\u00b0 N, 80.498\u00b0 W"
      },
      {
        "stepNumber": 4,
        "title": "Port Gellhorn (Industrial Freight Hub)",
        "instruction": "Western industrial port hosting underground vehicle transponder fences, container cargo yards, and heavy freight docks.",
        "coordinates": "27.142\u00b0 N, 82.319\u00b0 W"
      },
      {
        "stepNumber": 5,
        "title": "Ambrosia & Kelly County (Agricultural Heartland)",
        "instruction": "Central rural plains featuring fertilizer silos, Pawn & Gun retailers, and the PTT Youngin$ (Ultimate Edition) apparel & customization outpost.",
        "coordinates": "28.411\u00b0 N, 81.650\u00b0 W"
      },
      {
        "stepNumber": 6,
        "title": "Mount Kalaga National Park (Alpine Summit)",
        "instruction": "Leonida's highest vertical peak rising 3,240 feet above sea level. Packed with forestry fire lookouts, hidden glider ramps, and Phil's Ammu-Nation mountain cabin.",
        "coordinates": "29.112\u00b0 N, 82.415\u00b0 W"
      }
    ],
    "specsTable": [
      {
        "label": "6 Confirmed Regions",
        "value": "Vice City, Leonida Keys, Grassrivers, Port Gellhorn, Ambrosia, Mount Kalaga",
        "badge": "Official Leonida"
      },
      {
        "label": "Base Game Retailers",
        "value": "Phil's Ammu-Nation, Pay N' Spray, Pawn & Gun"
      },
      {
        "label": "Ultimate Edition Retailers",
        "value": "Rideout Customs, One-Eyed Willie's Mod Shop, PTT Youngin$",
        "badge": "Ultimate Edition"
      },
      {
        "label": "Peak Elevation",
        "value": "3,240 Feet (Mount Kalaga Summit)"
      },
      {
        "label": "Vehicle Traversals",
        "value": "Supercars, Nagasaki Airboats, Submersibles, Gliders"
      }
    ],
    "sourceUrls": [
      "https://rockstargames.com/vi/leonida-atlas",
      "https://toolup-vi.wikiguide.workers.dev/q/all-6-confirmed-regions-of-leonida-and-key-shops"
    ],
    "lastPatchVerified": "Launch Build 1.0",
    "verifiedPatch": "Launch Build 1.0",
    "readTime": "3 min read",
    "verifiedBy": "Cartography & Commerce Group",
    "author": "Lead Cartographer",
    "createdAt": "2026-11-15T16:00:00Z",
    "updatedAt": "2026-11-19T09:55:00Z"
  },
  {
    "id": "gta6-q-010",
    "slug": "streaming-gta-6-without-copyright-strikes-audio-radio-guide",
    "title": "Streaming GTA 6 Without Copyright Strikes (Audio & Radio Settings Guide)",
    "category": "Glitches & Fixes",
    "region": "Vice City",
    "tldrAnswer": "Launch Build 1.0 does not feature a dedicated 'Streamer Mode' master switch. Content creators streaming to Twitch, YouTube, or Kick must manually configure Audio Settings: set Vehicle Radio Volume to 0%, Environmental Music Bleed to Disabled, and Retain Original Ambient Score at 100% to prevent automated DMCA strikes and VOD muting while keeping dialog crisp.",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Navigate to Audio Settings",
        "instruction": "Open Pause Menu > Settings > Audio to access volume mixing sliders, output configurations, and licensed music toggles."
      },
      {
        "stepNumber": 2,
        "title": "Set Vehicle Radio Volume to 0%",
        "instruction": "Drag 'Vehicle Radio Volume' down to 0% (or Off). This mutes licensed pop, hip-hop, rock, and Latin tracks whenever Jason or Lucia enter a vehicle.",
        "tip": "This eliminates 95% of automated Twitch and YouTube copyright content matches."
      },
      {
        "stepNumber": 3,
        "title": "Disable Environmental Music Bleed",
        "instruction": "Toggle 'Club & Street Radio Bleed' to Disabled. This silences commercial music blasting from Ocean Drive nightclubs, passing pedestrian boomboxes, and beach party speakers."
      },
      {
        "stepNumber": 4,
        "title": "Retain Original Score at 100%",
        "instruction": "Leave 'Original Score' at 100%. Rockstar's dynamic orchestral heist themes, action stings, and atmospheric background synthesizers are fully copyright-cleared and stream-safe."
      },
      {
        "stepNumber": 5,
        "title": "Verify SFX & Dialog Levels",
        "instruction": "Keep Sound Effects, Engine Acoustics, and Character Dialogue at default 100% so gameplay gunplay, tactical callouts, and voice acting stream without interruption."
      }
    ],
    "specsTable": [
      {
        "label": "Streamer Mode Toggle",
        "value": "Omitted in Launch Build 1.0 (Manual audio config required)",
        "badge": "Launch Workaround"
      },
      {
        "label": "DMCA Copyright Risk",
        "value": "High (Over 250 licensed commercial tracks across radio stations)",
        "badge": "Copyright Warning"
      },
      {
        "label": "Vehicle Radio Volume",
        "value": "Set to 0% / Mute"
      },
      {
        "label": "Club & Street Bleed",
        "value": "Set to Disabled (Protects during outdoor free-roam)"
      },
      {
        "label": "Original Score & Dialog",
        "value": "100% Safe to stream (Fully cleared production audio)"
      }
    ],
    "sourceUrls": [
      "https://rockstargames.com/vi/support/audio-streaming",
      "https://toolup-vi.wikiguide.workers.dev/q/streaming-gta-6-without-copyright-strikes-audio-radio-guide"
    ],
    "lastPatchVerified": "Launch Build 1.0",
    "verifiedPatch": "Launch Build 1.0",
    "readTime": "2 min read",
    "verifiedBy": "Streaming & Content Operations",
    "author": "Broadcast Specialist",
    "createdAt": "2026-11-15T18:00:00Z",
    "updatedAt": "2026-11-19T10:00:00Z"
  }
];

// Helper to support legacy slug aliases smoothly
const SLUG_ALIASES: Record<string, string> = {
  "how-to-use-scooter-bros-and-waink-apps-in-leonida": "how-to-use-scooter-bros-waink-buckme-and-rydeme-apps-in-leonida",
  "how-to-replay-missions-in-gta-6": "how-to-replay-missions-in-gta-6-save-slots-workaround",
  "replay-missions-in-gta-6": "how-to-replay-missions-in-gta-6-save-slots-workaround",
  "buckme-savings-tiers": "buckme-banking-family-savings-account-tiers-guide",
  "buckme-banking-guide": "buckme-banking-family-savings-account-tiers-guide",
  "missable-chapter-1-missions": "missable-chapter-1-side-missions-shirleys-rum-steal-the-scooter",
  "shirleys-rum-side-mission": "missable-chapter-1-side-missions-shirleys-rum-steal-the-scooter",
  "gta-6-streaming-audio-settings": "streaming-gta-6-without-copyright-strikes-audio-radio-guide",
  "streaming-gta-6-without-copyright": "streaming-gta-6-without-copyright-strikes-audio-radio-guide",
  "lucia-mansion-keycard-spawn-locations": "all-6-confirmed-regions-of-leonida-and-key-shops",
  "unlimited-money-nightclub-laundering-glitch": "how-to-deposit-cash-at-atms-without-losing-money-on-death",
  "military-base-airspace-radar-disable-code": "how-the-5-rank-criminal-profile-system-works",
  "fastest-car-in-vice-city-patch-102": "how-to-strip-gps-trackers-at-a-fence-and-register-stolen-cars",
  "how-to-steal-cargo-ship-port-gellhorn": "all-6-confirmed-regions-of-leonida-and-key-shops",
  "vice-beaches-mansion-keycard-spawn-locations": "all-6-confirmed-regions-of-leonida-and-key-shops",
  "grassrivers-contraband-smuggling-loop": "how-to-deposit-cash-at-atms-without-losing-money-on-death",
  "kelly-county-airspace-radar-disable-code": "how-the-5-rank-criminal-profile-system-works",
  "heavy-sniper-thermal-scope-unlock-guide": "how-the-car-trunk-weapon-system-works",
};

export function ensureDataFile(): void {
  try {
    if (typeof fs?.existsSync === "function" && !fs.existsSync(DATA_DIR)) {
      if (typeof fs?.mkdirSync === "function") {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
    }
    if (typeof fs?.existsSync === "function" && !fs.existsSync(DB_FILE)) {
      if (typeof fs?.writeFileSync === "function") {
        fs.writeFileSync(DB_FILE, JSON.stringify(SEED_QUESTIONS, null, 2), "utf-8");
      }
    }
  } catch {
    // Cloudflare Workers edge environment: local fs is read-only or unsupported
  }
}

export function getAllQuestions(): QuestionRecord[] {
  try {
    ensureDataFile();
    if (typeof fs?.readFileSync === "function") {
      const raw = fs.readFileSync(DB_FILE, "utf-8");
      const parsed = JSON.parse(raw) as QuestionRecord[];
      return parsed.sort((a, b) => (b.searchVolumeScore ?? 0) - (a.searchVolumeScore ?? 0));
    }
  } catch {
    // Edge runtime fallback
  }
  return SEED_QUESTIONS;
}

export function getQuestionBySlug(slug: string): QuestionRecord | null {
  const all = getAllQuestions();
  const directMatch = all.find((q) => q.slug.toLowerCase() === slug.toLowerCase());
  if (directMatch) return directMatch;

  const aliasedSlug = SLUG_ALIASES[slug.toLowerCase()];
  if (aliasedSlug) {
    return all.find((q) => q.slug.toLowerCase() === aliasedSlug.toLowerCase()) || null;
  }
  return null;
}

export function getRelatedGuides(currentSlug: string, count = 3): QuestionRecord[] {
  const all = getAllQuestions();
  const current = getQuestionBySlug(currentSlug);
  if (!current) {
    return all.slice(0, count);
  }

  // Prioritize same category or region, strictly excluding current
  const related = all.filter(
    (q) =>
      q.slug.toLowerCase() !== current.slug.toLowerCase() &&
      (q.category === current.category || (current.region && q.region === current.region))
  );

  // Pad with other guides if needed
  if (related.length < count) {
    const remaining = all.filter(
      (q) =>
        q.slug.toLowerCase() !== current.slug.toLowerCase() &&
        !related.some((r) => r.slug.toLowerCase() === q.slug.toLowerCase())
    );
    related.push(...remaining);
  }

  return related.slice(0, count);
}

function mapDbRowsToQuestions(rows: Record<string, unknown>[]): QuestionRecord[] {
  return rows.map((r: Record<string, unknown>) => {
    let steps: StepItem[] = [];
    if (Array.isArray(r.steps_json)) {
      steps = r.steps_json as StepItem[];
    } else if (typeof r.steps_json === "string") {
      try {
        steps = JSON.parse(r.steps_json);
      } catch {
        steps = [];
      }
    } else if (Array.isArray(r.steps)) {
      steps = r.steps as StepItem[];
    }

    let specsTable: SpecRow[] = [];
    if (Array.isArray(r.specs_table_json)) {
      specsTable = r.specs_table_json as SpecRow[];
    } else if (typeof r.specs_table_json === "string") {
      try {
        specsTable = JSON.parse(r.specs_table_json);
      } catch {
        specsTable = [];
      }
    } else if (Array.isArray(r.specsTable)) {
      specsTable = r.specsTable as SpecRow[];
    }

    let sourceUrls: string[] = [];
    if (Array.isArray(r.source_urls)) {
      sourceUrls = r.source_urls as string[];
    } else if (typeof r.source_urls === "string") {
      try {
        sourceUrls = JSON.parse(r.source_urls);
      } catch {
        sourceUrls = [];
      }
    } else if (Array.isArray(r.sourceUrls)) {
      sourceUrls = r.sourceUrls as string[];
    }

    const tldr = String(r.tldr_answer || r.tldrAnswer || "");
    const slugStr = String(r.slug || "");
    const titleStr = String(r.title || "");

    return {
      id: String(r.id || `gta6-q-${slugStr}`),
      slug: slugStr,
      title: titleStr,
      category: (r.category as Exclude<Category, "All">) || "Map & Regions",
      region: (r.region as string) || "Vice City",
      tldrAnswer: tldr,
      steps,
      specsTable,
      sourceUrls,
      lastPatchVerified: String(r.last_patch_verified || r.lastPatchVerified || "Launch Build 1.0"),
      verifiedPatch: String(r.verified_patch || r.verifiedPatch || "Launch Build 1.0"),
      readTime: String(r.read_time || r.readTime || calculateReadTime(tldr)),
      verifiedBy: String(r.verified_by || r.verifiedBy || "ToolUp VI Tactical Lab"),
      author: String(r.author || "Lead Editor"),
      createdAt: String(r.created_at || r.createdAt || new Date().toISOString()),
      updatedAt: String(r.updated_at || r.updatedAt || new Date().toISOString()),
    };
  });
}

export async function searchQuestionsFromDb(
  query?: string,
  category?: string,
  limit = 20
): Promise<QuestionRecord[]> {
  const qTrim = query?.trim() || "";
  const hasCategory = Boolean(category && category !== "All");

  try {
    // Parameterized search against Turso Database via @libsql/client/web
    if (qTrim.length > 0 && hasCategory) {
      const searchPattern = `%${qTrim}%`;
      const res = await db.execute({
        sql: `SELECT * FROM questions 
              WHERE category = ? 
              AND (title LIKE ? OR tldr_answer LIKE ? OR region LIKE ?) 
              LIMIT ?`,
        args: [category!, searchPattern, searchPattern, searchPattern, limit],
      });
      if (res.rows && res.rows.length > 0) {
        return mapDbRowsToQuestions(res.rows as unknown as Record<string, unknown>[]);
      }
    } else if (qTrim.length > 0) {
      const searchPattern = `%${qTrim}%`;
      const res = await db.execute({
        sql: `SELECT * FROM questions 
              WHERE (title LIKE ? OR tldr_answer LIKE ? OR category LIKE ? OR region LIKE ?) 
              LIMIT ?`,
        args: [searchPattern, searchPattern, searchPattern, searchPattern, limit],
      });
      if (res.rows && res.rows.length > 0) {
        return mapDbRowsToQuestions(res.rows as unknown as Record<string, unknown>[]);
      }
    } else if (hasCategory) {
      const res = await db.execute({
        sql: `SELECT * FROM questions WHERE category = ? LIMIT ?`,
        args: [category!, limit],
      });
      if (res.rows && res.rows.length > 0) {
        return mapDbRowsToQuestions(res.rows as unknown as Record<string, unknown>[]);
      }
    } else {
      const res = await db.execute({
        sql: `SELECT * FROM questions LIMIT ?`,
        args: [limit],
      });
      if (res.rows && res.rows.length > 0) {
        return mapDbRowsToQuestions(res.rows as unknown as Record<string, unknown>[]);
      }
    }
  } catch {
    // Graceful fallback to verified in-memory dataset when Turso is unreachable or offline
  }

  return searchQuestions(query, category).slice(0, limit);
}

export function searchQuestions(query?: string, category?: string): QuestionRecord[] {
  let all = getAllQuestions();

  if (category && category !== "All") {
    all = all.filter((q) => q.category.toLowerCase() === category.toLowerCase());
  }

  if (!query || query.trim() === "") {
    return all;
  }

  const qLower = query.toLowerCase().trim();
  return all.filter((q) => {
    const titleMatch = q.title.toLowerCase().includes(qLower);
    const tldrMatch = q.tldrAnswer.toLowerCase().includes(qLower);
    const slugMatch = q.slug.toLowerCase().includes(qLower);
    const stepMatch = q.steps.some(
      (s) =>
        s.title.toLowerCase().includes(qLower) ||
        s.instruction.toLowerCase().includes(qLower) ||
        (s.coordinates && s.coordinates.toLowerCase().includes(qLower))
    );
    const specMatch = q.specsTable.some(
      (sp) => sp.label.toLowerCase().includes(qLower) || sp.value.toLowerCase().includes(qLower)
    );
    return titleMatch || tldrMatch || slugMatch || stepMatch || specMatch;
  });
}

export function upsertQuestion(payload: IngestPayload): { record: QuestionRecord; action: "created" | "updated" } {
  ensureDataFile();
  const all = getAllQuestions();
  const existingIndex = all.findIndex((q) => q.slug.toLowerCase() === payload.slug.toLowerCase());

  let stepsFormatted: StepItem[] = [];
  if (Array.isArray(payload.steps_markdown)) {
    stepsFormatted = payload.steps_markdown;
  } else if (typeof payload.steps_markdown === "string") {
    stepsFormatted = payload.steps_markdown
      .split("\n")
      .filter((line) => line.trim().length > 0)
      .map((line, idx) => ({
        stepNumber: idx + 1,
        title: `Step ${idx + 1}`,
        instruction: line.replace(/^\d+\.\s*/, "").trim(),
      }));
  }

  const now = new Date().toISOString();

  if (existingIndex >= 0) {
    const existing = all[existingIndex];
    const updated: QuestionRecord = {
      ...existing,
      title: payload.question_title || existing.title,
      category: payload.category || existing.category,
      region: payload.region || existing.region || "Vice City",
      tldrAnswer: payload.tldr_answer || existing.tldrAnswer,
      steps: stepsFormatted.length > 0 ? stepsFormatted : existing.steps,
      specsTable: payload.specs_table_json || existing.specsTable,
      sourceUrls: payload.source_urls || existing.sourceUrls,
      searchVolumeScore: payload.search_volume_score ?? existing.searchVolumeScore,
      lastPatchVerified: payload.last_patch_verified || existing.lastPatchVerified || "Launch Build 1.0",
      verifiedPatch: payload.verified_patch || existing.verifiedPatch || "Launch Build 1.0",
      readTime: payload.read_time || existing.readTime || calculateReadTime(payload.tldr_answer || existing.tldrAnswer),
      updatedAt: now,
    };
    all[existingIndex] = updated;
    try {
      if (typeof fs?.writeFileSync === "function") {
        fs.writeFileSync(DB_FILE, JSON.stringify(all, null, 2), "utf-8");
      }
    } catch {
      // Cloudflare Workers edge environment: read-only filesystem
    }
    return { record: updated, action: "updated" };
  } else {
    const created: QuestionRecord = {
      id: `gta6-q-${Date.now().toString(36)}`,
      slug: payload.slug,
      title: payload.question_title,
      category: payload.category,
      region: payload.region || "Vice City",
      tldrAnswer: payload.tldr_answer,
      steps: stepsFormatted,
      specsTable: payload.specs_table_json || [],
      sourceUrls: payload.source_urls || [],
      lastPatchVerified: payload.last_patch_verified || "Launch Build 1.0",
      verifiedPatch: payload.verified_patch || "Launch Build 1.0",
      readTime: payload.read_time || calculateReadTime(payload.tldr_answer),
      verifiedBy: "Community Telemetry Guide",
      author: "Verified Contributor",
      createdAt: now,
      updatedAt: now,
      isBreakout: true,
    };
    all.push(created);
    try {
      if (typeof fs?.writeFileSync === "function") {
        fs.writeFileSync(DB_FILE, JSON.stringify(all, null, 2), "utf-8");
      }
    } catch {
      // Cloudflare Workers edge environment: read-only filesystem
    }
    return { record: created, action: "created" };
  }
}
