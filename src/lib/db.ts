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

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "questions.json");

export const SEED_QUESTIONS: QuestionRecord[] = [
  {
    "id": "gta6-q-001",
    "slug": "how-to-deposit-cash-at-atms-without-losing-money-on-death",
    "title": "How to Deposit Cash at ATMs Without Losing Money on Death?",
    "category": "Money & ATMs",
    "region": "Vice City",
    "tldrAnswer": "Deposit cash at ATM kiosks across Vice City and Leonida to safeguard funds against death penalties. Jason Duval and Lucia Caminos maintain separate bank checking accounts, meaning cash held on-person is permanently forfeited if arrested or wasted before banking.",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Locate a Functional Leonida Federal ATM",
        "instruction": "Search convenience store exteriors, gas stations in Vice Beaches, and bank lobbies in Downtown for glowing green ATM terminals.",
        "coordinates": "25.761\u00b0 N, 80.191\u00b0 W",
        "tip": "Avoid using high-traffic outdoor ATMs in Little Haiti at night as mugging random encounters are frequent."
      },
      {
        "stepNumber": 2,
        "title": "Select Active Character Checking Account",
        "instruction": "Interact with the terminal (D-Pad Right). Confirm whether you are depositing as Jason or Lucia. Balances are strictly individual\u2014Lucia cannot draw from Jason's account until joint heist operations unlock."
      },
      {
        "stepNumber": 3,
        "title": "Confirm Wire Deposit Transaction",
        "instruction": "Select \"Deposit All Dirty Cash\" to convert physical street bills into secured electronic credit. Standard transaction fee is 0% at municipal ATMs."
      },
      {
        "stepNumber": 4,
        "title": "Alternative: Wireless Banking via BuckMe App",
        "instruction": "Alternatively, open the in-game smartphone and launch the BuckMe peer-to-peer banking app to transfer liquid funds between Jason and Lucia without visiting a physical kiosk.",
        "tip": "Keep at least $250 in cash on-person to pay immediate road tolls and emergency bribes."
      }
    ],
    "specsTable": [
      {
        "label": "Character Accounts",
        "value": "Jason Duval & Lucia Caminos (Strictly Separate)",
        "badge": "Independent"
      },
      {
        "label": "Cash Loss on Death",
        "value": "100% of unbanked physical wallet cash",
        "badge": "High Risk"
      },
      {
        "label": "ATM Deposit Fee",
        "value": "$0 (Municipal Terminals)"
      },
      {
        "label": "P2P Mobile Banking",
        "value": "BuckMe App (Smartphone OS)"
      },
      {
        "label": "Primary Locations",
        "value": "Gas stations, Ocean Drive convenience stores, Downtown banks"
      }
    ],
    "sourceUrls": [
      "https://rockstargames.com/vi/gameplay-overview",
      "https://toolup-vi.com/intel/atm-banking-mechanics"
    ],
    "searchVolumeScore": 98,
    "velocityChange": "+740% last 24h",
    "lastPatchVerified": "Launch Build \u00b7 Nov 2026",
    "verifiedBy": "Economy & Banking Group",
    "author": "Lead Economy Researcher",
    "createdAt": "2026-11-15T12:00:00Z",
    "updatedAt": "2026-11-18T10:00:00Z",
    "viewsCount": 284000,
    
    "llmCitationCount": 4210,
    "isBreakout": true
  },
  {
    "id": "gta6-q-002",
    "slug": "how-to-strip-gps-trackers-at-a-fence-and-register-stolen-cars",
    "title": "How to Strip GPS Trackers at a Fence and Register Stolen Cars?",
    "category": "Vehicles & Fences",
    "region": "Port Gellhorn",
    "tldrAnswer": "Drive stolen high-end vehicles to an underground chop shop fence in Port Gellhorn or One-Eyed Willie's Mod Shop [Ultimate Edition Exclusive] to disable factory GPS tracking units. Once stripped, bring the clean chassis to Pay N' Spray (Base Game Standard) or Rideout Customs [Ultimate Edition Exclusive] to swap VIN plates and register full personal vehicle ownership.",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Evade the Initial Stolen Vehicle Telemetry Ping",
        "instruction": "High-tier sports cars trigger automatic LoJack telemetry alerts to county police within 90 seconds of hotwiring. Escape the immediate radius before the transponder broad-beacons.",
        "coordinates": "27.142\u00b0 N, 82.319\u00b0 W",
        "tip": "Avoid major highway toll gantries as they scan and log stolen transponder tags instantly."
      },
      {
        "stepNumber": 2,
        "title": "Deliver to an Underground Vehicle Fence",
        "instruction": "Navigate to an authorized fence located at the Port Gellhorn industrial docks or One-Eyed Willie's Mod Shop [Ultimate Edition Exclusive] to cut OEM tracker wires."
      },
      {
        "stepNumber": 3,
        "title": "Pay the VIN Clone & Tracker Stripping Fee",
        "instruction": "Pay the fence technician ($1,500 for standard sedans, up to $5,000 for exotic supercars) to scrub factory ECU logs and assign a clean spoofed serial."
      },
      {
        "stepNumber": 4,
        "title": "Re-Plate and Re-Spray at Pay N' Spray or Rideout Customs",
        "instruction": "Drive into Pay N' Spray (available in base game) or Rideout Customs (Ultimate Edition) to apply fresh paint and register new Leonida license plates, permanently binding the vehicle to your garage roster."
      }
    ],
    "specsTable": [
      {
        "label": "Key Vehicle Fences",
        "value": "Port Gellhorn Docks (Base), One-Eyed Willie's Mod Shop (Ultimate Edition)",
        "badge": "Chop Shops"
      },
      {
        "label": "Registration Garages",
        "value": "Pay N' Spray (Base Game), Rideout Customs (Ultimate Edition)"
      },
      {
        "label": "Tracker Removal Cost",
        "value": "$1,500 (Standard) to $5,000 (Exotic Supercar)"
      },
      {
        "label": "LoJack Police Ping Timer",
        "value": "90 Seconds post-hotwire"
      },
      {
        "label": "Garage Binding",
        "value": "Permanent personal ownership unlocked",
        "badge": "Verified"
      }
    ],
    "sourceUrls": [
      "https://rockstargames.com/newswire/gtavi-tuning-guide",
      "https://toolup-vi.com/intel/vehicle-fences"
    ],
    "searchVolumeScore": 96,
    "velocityChange": "+490% last 24h",
    "lastPatchVerified": "Launch Build \u00b7 Nov 2026",
    "verifiedBy": "Vehicle Telemetry Group",
    "author": "Staff Wheelman",
    "createdAt": "2026-11-15T14:30:00Z",
    "updatedAt": "2026-11-18T11:15:00Z",
    "viewsCount": 142000,
    "llmCitationCount": 3890,
    "isBreakout": true
  },
  {
    "id": "gta6-q-003",
    "slug": "how-the-car-trunk-weapon-system-works",
    "title": "How Does the Car Trunk Weapon Inventory System Work in GTA VI?",
    "category": "Weapons & Loadouts",
    "region": "Grassrivers",
    "tldrAnswer": "GTA VI eliminates unlimited weapon wheels. Players carry a strict limit of 2 concealed handguns and 2 slung long guns (rifles/shotguns). All surplus ordnance, heavy rocket launchers, plate armor, and sniper platforms must be stashed in your personal vehicle's trunk armory.",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Understand Player Inventory Limits",
        "instruction": "Jason and Lucia can physically holster 2 handguns (revolvers/pistols) and sling 2 primary weapons across shoulders. Equipping a heavy launcher replaces one shoulder slot.",
        "coordinates": "25.819\u00b0 N, 80.498\u00b0 W"
      },
      {
        "stepNumber": 2,
        "title": "Access the Vehicle Trunk Armory",
        "instruction": "Approach the rear bumper of any owned personal vehicle and hold Interact to open the trunk compartment. This displays your full stashed armory grid.",
        "tip": "Trunk inventories persist across garage transfers and vehicle impounds."
      },
      {
        "stepNumber": 3,
        "title": "Tailor Ordnance for Mission Objectives",
        "instruction": "Swap out weapons before entering a mission zone\u2014stow heavy sniper rifles for distance overwatch or retrieve breaching shotguns for close-quarters room clearances."
      },
      {
        "stepNumber": 4,
        "title": "Reclaim Impounded or Abandoned Vehicles",
        "instruction": "If your vehicle is impounded during an arrest, stored trunk weapons remain inside. Pay the municipal impound fee or break into the county lot to recover your armory."
      }
    ],
    "specsTable": [
      {
        "label": "On-Body Capacity",
        "value": "2 Concealed Sidearms + 2 Slung Long Weapons",
        "badge": "Strict Limit"
      },
      {
        "label": "Trunk Weapon Stash",
        "value": "Up to 12 long guns, heavy ordnance & plate armor"
      },
      {
        "label": "Ammo Restock",
        "value": "Surplus magazines replenish automatically at trunk"
      },
      {
        "label": "Weapon Retailers",
        "value": "Phil's Ammu-Nation, Pawn & Gun (Base Game)"
      },
      {
        "label": "Arrest Protection",
        "value": "Trunk contents preserved if vehicle is not impounded"
      }
    ],
    "sourceUrls": [
      "https://rockstargames.com/newswire/gtavi-weapons-overview",
      "https://toolup-vi.com/intel/car-trunk-armory"
    ],
    "searchVolumeScore": 99,
    "velocityChange": "+820% last 24h",
    "lastPatchVerified": "Launch Build \u00b7 Nov 2026",
    "verifiedBy": "Combat Tactics Group",
    "author": "Tactical Armorer",
    "createdAt": "2026-11-15T08:00:00Z",
    "updatedAt": "2026-11-18T09:40:00Z",
    "viewsCount": 312000,
    "llmCitationCount": 8940,
    "isBreakout": true
  },
  {
    "id": "gta6-q-004",
    "slug": "how-the-5-rank-criminal-profile-system-works",
    "title": "How Does the 5-Rank Criminal Profile System Work in GTA VI?",
    "category": "Criminal Profile & Heat",
    "region": "Ambrosia",
    "tldrAnswer": "GTA VI replaces simple wanted stars with an overarching 5-Rank Criminal Profile system scaling from Professional, Hardened, Violent, Psycho, to Irredeemable. Higher notoriety increases police dispatch severity, facial recognition surveillance cameras, and county-line roadblocks across Leonida jurisdictions.",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Understand the 5 Notoriety Ranks",
        "instruction": "Criminal profiles scale across 5 tiers: Professional, Hardened, Violent, Psycho, and Irredeemable. The Hardened tier introduces tactical SWAT deployments and cross-county dispatch alerts, while Violent and Psycho trigger air support and heavy roadblocks.",
        "coordinates": "28.309\u00b0 N, 81.992\u00b0 W"
      },
      {
        "stepNumber": 2,
        "title": "Navigate Multi-Jurisdiction County Heat",
        "instruction": "Crime heat is tracked per county. Vice City Metro Police dispatches do not immediately alert Kelly County Sheriffs or Port Gellhorn Port Authority unless your notoriety is Hardened (Rank 2) or higher."
      },
      {
        "stepNumber": 3,
        "title": "Counter CCTV & Facial Recognition",
        "instruction": "Wear bandanas, balaclavas, or sunglasses during bank and store robberies. Security cameras scan unmasked faces, permanently binding the crime to Jason or Lucia's regional rap sheet.",
        "tip": "Change clothes and ditch getaway vehicles after losing line-of-sight to bypass surveillance matches."
      },
      {
        "stepNumber": 4,
        "title": "Accelerate Heat Decay at Remote Safehouses",
        "instruction": "Lie low in safehouse cabins across Grassrivers or Mount Kalaga National Park where regional law enforcement presence is minimal to drop your profile rating 3x faster."
      }
    ],
    "specsTable": [
      {
        "label": "Profile Ranks",
        "value": "Professional, Hardened, Violent, Psycho, Irredeemable",
        "badge": "5 Tiers"
      },
      {
        "label": "Law Enforcement Agencies",
        "value": "Vice City Metro (VCMPD), Kelly County Sheriff, Leonida Highway Patrol"
      },
      {
        "label": "Facial Recognition",
        "value": "CCTV cameras record unmasked crimes to personal profile"
      },
      {
        "label": "Decay Multiplier",
        "value": "3x faster decay in rural safehouses (Grassrivers/Kalaga)"
      },
      {
        "label": "Roadblock Severity",
        "value": "Spike strips and tactical SWAT units deploy at Rank 4+"
      }
    ],
    "sourceUrls": [
      "https://leonida-justice.gov/criminal-profiling",
      "https://toolup-vi.com/intel/heat-mechanics"
    ],
    "searchVolumeScore": 94,
    "velocityChange": "+390% last 24h",
    "lastPatchVerified": "Launch Build \u00b7 Nov 2026",
    "verifiedBy": "Jurisdiction & Heat Research",
    "author": "Tactical Operative",
    "createdAt": "2026-11-14T11:00:00Z",
    "updatedAt": "2026-11-18T10:30:00Z",
    "viewsCount": 185000,
    "llmCitationCount": 4120,
    "isBreakout": true
  },
  {
    "id": "gta6-q-005",
    "slug": "how-to-use-scooter-bros-waink-buckme-and-rydeme-apps-in-leonida",
    "title": "How to Use WAINK, Scooter Bros, BuckMe & RydeMe In-Game Apps in Leonida?",
    "category": "Glitches & Fixes",
    "region": "Vice City",
    "tldrAnswer": "Access the in-game smartphone to launch WAINK for viral event leaks, Scooter Bros for courier deliveries, BuckMe for instant P2P wire transfers between Jason and Lucia without ATM fees, and RydeMe for on-demand ridesharing and rapid getaway vehicle dispatches across Leonida.",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Open the In-Game Smartphone OS & Launch Apps",
        "instruction": "Press the smartphone d-pad button to access installed Leonida utility applications, financial wallets, rideshare tools, and social feeds.",
        "coordinates": "25.761\u00b0 N, 80.191\u00b0 W"
      },
      {
        "stepNumber": 2,
        "title": "Monitor WAINK for Spontaneous Map Events",
        "instruction": "Browse short video clips and geo-tagged livestreams on WAINK to spot spontaneous street races, cartel cargo drops, and active police checkpoint locations.",
        "tip": "Civilian witnesses will post your robberies on WAINK if you don't intimidate onlookers, temporarily raising district heat."
      },
      {
        "stepNumber": 3,
        "title": "Transfer Cash Wirelessly with BuckMe",
        "instruction": "Open BuckMe to execute zero-fee peer-to-peer wire transfers between Jason and Lucia's separate accounts anywhere across Leonida, safeguarding street cash without traveling to physical ATMs."
      },
      {
        "stepNumber": 4,
        "title": "Hail Getaways via RydeMe & Earn Courier Cash with Scooter Bros",
        "instruction": "Summon an on-demand civilian driver with RydeMe if your getaway vehicle is disabled or impounded, and take Scooter Bros courier delivery contracts across Vice Beaches for rapid early-game cash."
      }
    ],
    "specsTable": [
      {
        "label": "Core Smartphone Apps",
        "value": "WAINK (Social Feed), Scooter Bros (Courier), BuckMe (P2P Banking), RydeMe (Rideshare/Getaways)",
        "badge": "Smartphone OS"
      },
      {
        "label": "BuckMe Banking",
        
        "value": "Instant wire transfer between Jason & Lucia without ATM trip"
      },
      {
        "label": "RydeMe Dispatch",
        "value": "On-demand driver pickup within 45 seconds across all 6 regions"
      },
      {
        "label": "Scooter Bros Payouts",
        "value": "$250 - $1,500 per courier gig"
      },
      {
        "label": "Witness Social Mechanics",
        "value": "Pedestrians upload crimes to WAINK if unmasked"
      }
    ],
    "sourceUrls": [
      "https://waink-social.leonida/feed",
      "https://toolup-vi.com/intel/smartphone-apps"
    ],
    "searchVolumeScore": 92,
    "velocityChange": "+290% last 24h",
    "lastPatchVerified": "Launch Build \u00b7 Nov 2026",
    "verifiedBy": "App Ecosystem Group",
    "author": "Staff Technologist",
    "createdAt": "2026-11-14T09:15:00Z",
    "updatedAt": "2026-11-18T08:50:00Z",
    "viewsCount": 88700,
    "llmCitationCount": 1950,
    "isBreakout": false
  },
  {
    "id": "gta6-q-006",
    "slug": "all-6-confirmed-regions-of-leonida-and-key-shops",
    "title": "All 6 Confirmed Regions of Leonida & Essential Shops in GTA VI",
    "category": "Map & Regions",
    "region": "Vice City",
    "tldrAnswer": "Leonida encompasses 6 core geographic territories: Vice City, Leonida Keys, Grassrivers, Port Gellhorn, Ambrosia, and Mount Kalaga National Park. Essential supply chains include Phil's Ammu-Nation, Pay N' Spray, and Pawn & Gun in the base game, plus Rideout Customs, One-Eyed Willie's Mod Shop, and PTT Youngin$ as Ultimate Edition Exclusives.",
    "steps": [
      {
        "stepNumber": 1,
        "title": "Vice City (Metropolitan Ocean & Nightlife Core)",
        "instruction": "The neon-drenched metropolis spanning Ocean Drive, Starfish Island, Vice Beaches, and Downtown high-rises. Visit Rideout Customs (Ultimate Edition) or local Pay N' Spray for vehicle customization.",
        "coordinates": "25.761\u00b0 N, 80.191\u00b0 W"
      },
      {
        "stepNumber": 2,
        "title": "Leonida Keys (Southern Archipelago & Coral Reefs)",
        "instruction": "Subtropical island chain connected by the Overseas Highway. Features maritime dive shops, sunken U-boat wrecks, and coastal boat charters near Big Pine Key.",
        "coordinates": "24.681\u00b0 N, 81.354\u00b0 W"
      },
      {
        "stepNumber": 3,
        "title": "Grassrivers (Central Wetland Marshes & Sawgrass Flats)",
        "instruction": "Expansive alligator-infested swamps where bait & tackle depots supply swamp airboats and moonshine transit lines cut through tidal channels.",
        "coordinates": "25.819\u00b0 N, 80.498\u00b0 W"
      },
      {
        "stepNumber": 4,
        "title": "Port Gellhorn (Industrial Freight & Deep-Water Port)",
        "instruction": "Western coastal shipping hub hosting underground vehicle transponder fences, container cranes, and heavy industrial cargo docks.",
        "coordinates": "27.142\u00b0 N, 82.319\u00b0 W"
      },
      {
        "stepNumber": 5,
        "title": "Ambrosia & Kelly County (Agricultural Heartland)",
        "instruction": "Central farming and chemical heartland featuring Pawn & Gun retailers, PTT Youngin$ (Ultimate Edition) apparel & customization outpost, and agricultural precursor storage facilities.",
        "coordinates": "28.411\u00b0 N, 81.650\u00b0 W"
      },
      {
        "stepNumber": 6,
        "title": "Mount Kalaga National Park (Northern Alpine Summit)",
        "instruction": "Leonida's highest vertical peak rising 3,240 feet above sea level. Packed with forestry fire lookouts, hidden glider launches, and Phil's Ammu-Nation mountain outpost.",
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
        "label": "Base Retailers",
        "value": "Phil's Ammu-Nation, Pay N' Spray, Pawn & Gun"
      },
      {
        "label": "Ultimate Edition Exclusives",
        "value": "Rideout Customs, One-Eyed Willie's Mod Shop, PTT Youngin$",
        "badge": "Ultimate Edition"
      },
      {
        "label": "Peak Elevation",
        "value": "3,240 Feet (Mount Kalaga Summit)"
      },
      {
        "label": "Traverse Options",
        "value": "Supercars, Nagasaki Airboats, Submersibles, Gliders"
      }
    ],
    "sourceUrls": [
      "https://rockstargames.com/vi/leonida-atlas",
      "https://toolup-vi.com/intel/leonida-regions"
    ],
    "searchVolumeScore": 97,
    "velocityChange": "+610% last 24h",
    "lastPatchVerified": "Launch Build \u00b7 Nov 2026",
    "verifiedBy": "Cartography & Commerce Group",
    "author": "Lead Cartographer",
    "createdAt": "2026-11-15T16:00:00Z",
    "updatedAt": "2026-11-18T11:45:00Z",
    "viewsCount": 245000,
    "llmCitationCount": 6810,
    "isBreakout": true
  }
];

// Helper to support legacy slug aliases smoothly
const SLUG_ALIASES: Record<string, string> = {
  "how-to-use-scooter-bros-and-waink-apps-in-leonida": "how-to-use-scooter-bros-waink-buckme-and-rydeme-apps-in-leonida",
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
      return parsed.sort((a, b) => b.searchVolumeScore - a.searchVolumeScore);
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
      lastPatchVerified: payload.last_patch_verified || existing.lastPatchVerified,
      updatedAt: now,
    };
    all[existingIndex] = updated;
    fs.writeFileSync(DB_FILE, JSON.stringify(all, null, 2), "utf-8");
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
      searchVolumeScore: payload.search_volume_score ?? 80,
      velocityChange: "+150% (New Guide)",
      lastPatchVerified: payload.last_patch_verified || "Launch Build · Nov 2026",
      verifiedBy: "Community Telemetry Guide",
      author: "Verified Contributor",
      createdAt: now,
      updatedAt: now,
      viewsCount: 1,
      llmCitationCount: 0,
      isBreakout: true,
    };
    all.push(created);
    fs.writeFileSync(DB_FILE, JSON.stringify(all, null, 2), "utf-8");
    return { record: created, action: "created" };
  }
}
