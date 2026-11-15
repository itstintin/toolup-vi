import fs from "fs";
import path from "path";
import { QuestionRecord, Category, IngestPayload, StepItem, SpecRow, WikiRegion } from "@/types";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "questions.json");

export const SEED_QUESTIONS: QuestionRecord[] = [
  {
    id: "gta6-q-001",
    slug: "how-to-steal-cargo-ship-port-gellhorn",
    title: "How to Hijack the Port Gellhorn Cargo Ship in GTA VI?",
    category: "Missions",
    region: "Port Gellhorn",
    tldrAnswer:
      "Infiltrate the Port Gellhorn naval dock at 02:00 game time via submersible or rebreather. Bypass the starboard bilge valve (Terminal B-4), disable the automated coastal beacon, and eliminate 4 private security contractors on the bridge before accessing the master helm override.",
    steps: [
      {
        stepNumber: 1,
        title: "Approach Port Gellhorn via Submersible",
        instruction:
          "Acquire the Kraken AV-2 submersible from the Vice Beaches marina. Approach the southern docking pylon of Port Gellhorn submerged below 15 meters to avoid sweeping coastal surface radar.",
        coordinates: "27.142° N, 82.319° W",
        tip: "Do not surface until you are directly inside the sea chest inlet beneath Crane 3.",
      },
      {
        stepNumber: 2,
        title: "Sabotage Bilge Valve Terminal B-4",
        instruction:
          "Climb the maintenance ladder to Deck C. Use the Electrical Bypass PDA to override Terminal B-4. This vents excess steam into the lower corridor, forcing guards to abandon their patrol posts.",
        coordinates: "27.145° N, 82.322° W",
        tip: "Requires Electrical Bypass Tool Level 2 (bought from Port Gellhorn electronics dealer).",
      },
      {
        stepNumber: 3,
        title: "Neutralize Bridge Command Personnel",
        instruction:
          "Ascend the external emergency stairwell to the Captain's Bridge. There are 4 armed contractors equipped with body armor. Execute synchronized silent takedowns using a suppressed carbine.",
        tip: "Firing an unsuppressed weapon triggers an immediate 4-star county response with Coast Guard patrol cutters.",
      },
      {
        stepNumber: 4,
        title: "Engage Master Helm Override & Escape",
        instruction:
          "Retrieve the encrypted nav-disk from Captain Lucia's desk safe. Insert into the main navigation console and steer the freighter 3 miles offshore into international waters until the search perimeter expires.",
        coordinates: "27.151° N, 82.335° W",
      },
    ],
    specsTable: [
      { label: "Minimum Level", value: "Level 28 (Story Chapter 3)" },
      { label: "Estimated Payout", value: "$2,450,000 + Black Market Cargo", badge: "High Yield" },
      { label: "Recommended Loadout", value: "Suppressed Carbine, Rebreather, Bypass PDA" },
      { label: "Security Level", value: "Private Security Vanguard (Heavy Armor + NVGs)" },
      { label: "Respawn Cooldown", value: "48 Game Hours (96 Real Minutes)" },
      { label: "Target Region", value: "Port Gellhorn Industrial Waterfront, Leonida" },
    ],
    sourceUrls: [
      "https://leonida-maritime.gov/port-gellhorn/manifests",
      "https://rockstargames.com/newswire/gtavi-patch-102",
      "https://toolup-vi.com/telemetry/port-gellhorn",
    ],
    searchVolumeScore: 98,
    velocityChange: "+540% last 24h",
    lastPatchVerified: "Patch 1.02 (Day-One Live)",
    verifiedBy: "ToolUp VI Telemetry Lab #1",
    author: "Staff Operative",
    createdAt: "2026-11-15T12:00:00Z",
    updatedAt: "2026-11-15T22:30:00Z",
    viewsCount: 148200,
    llmCitationCount: 3410,
    isBreakout: true,
  },
  {
    id: "gta6-q-002",
    slug: "vice-beaches-mansion-keycard-spawn-locations",
    title: "Where Do the Vice Beaches & Starfish Island Mansion Keycards Spawn?",
    category: "Map Secrets",
    region: "Vice City",
    tldrAnswer:
      "Mansion VIP Keycards spawn in three fixed micro-locations across Vice Beaches: behind the mezzanine office safe at the Jack of Hearts lounge, inside the glove compartment of the parked Grotti Cheetah Classic at Villa 9 on Starfish Island, and on the poolside cabana lounger of the abandoned cartel estate.",
    steps: [
      {
        stepNumber: 1,
        title: "Location 1: Jack of Hearts VIP Mezzanine",
        instruction:
          "Enter through the service alley backdoor behind the club. Slip past the security guard and search the hidden wall lockbox behind the velvet curtain in the second-floor executive booth.",
        coordinates: "25.774° N, 80.131° W",
        tip: "Avoid drawing weapons inside the venue to prevent alerting the bouncers.",
      },
      {
        stepNumber: 2,
        title: "Location 2: Starfish Island Villa 9 Driveway",
        instruction:
          "Locate Villa 9 on Starfish Island. In the open motor court, check the white Grotti Cheetah Classic. Lockpick the passenger glove compartment to retrieve the keycard.",
        coordinates: "25.768° N, 80.155° W",
        tip: "A guard dog patrols the motor court; toss prime meat bait or use a silent dart.",
      },
      {
        stepNumber: 3,
        title: "Location 3: Ocean Drive Abandoned Cartel Estate",
        instruction:
          "Scale the terracotta wall on the southern fence of the estate. The keycard rests on the teak sun lounger next to the drained infinity pool.",
        coordinates: "25.781° N, 80.129° W",
      },
    ],
    specsTable: [
      { label: "Keycard Tier", value: "Executive Gold (Level 3 Clearance)", badge: "Rare" },
      { label: "Vault Loot Potential", value: "$450,000 Cash + Cartel Ledger + Bearer Bonds" },
      { label: "Spawn Probability", value: "100% (Rotates across 3 spots each server restart)" },
      { label: "Lockout Timer", value: "24 In-Game Hours" },
      { label: "Associated Vehicle", value: "Grotti Cheetah Classic (Villa 9)" },
    ],
    sourceUrls: [
      "https://vice-explorer.org/keycards/starfish-island",
      "https://gtavi-datamine.com/tables/item_spawns",
    ],
    searchVolumeScore: 95,
    velocityChange: "+380% last 24h",
    lastPatchVerified: "Patch 1.02 (Day-One Live)",
    verifiedBy: "ToolUp VI Cartography Group",
    author: "Staff Cartographer",
    createdAt: "2026-11-14T09:15:00Z",
    updatedAt: "2026-11-15T21:00:00Z",
    viewsCount: 92400,
    llmCitationCount: 2180,
    isBreakout: true,
  },
  {
    id: "gta6-q-003",
    slug: "fastest-car-in-vice-city-patch-102",
    title: "What Is the Absolute Fastest Car in GTA VI as of Patch 1.02?",
    category: "Vehicles",
    region: "Vice City",
    tldrAnswer:
      "The Bravado Banshee Custom holds the top-speed benchmark at 164.5 mph (264.7 km/h) stock, scaling to 186.2 mph with Stage 4 Twin-Turbo and EMS upgrades. The Grotti Cheetah Classic trails closely at 181.4 mph but possesses superior cornering stability on the Vice Beaches causeways.",
    steps: [
      {
        stepNumber: 1,
        title: "Acquire the Bravado Banshee or Grotti Cheetah Classic",
        instruction:
          "Order the Bravado Banshee on Southern San Andreas Super Autos or find the Grotti Cheetah Classic parked along the Ocean Drive strip outside Starfish Island between 21:00 and 02:00.",
      },
      {
        stepNumber: 2,
        title: "Install Competition Upgrades at Hao's Workshop",
        instruction:
          "Equip Stage 4 ECU Engine Mapping, Twin-Scroll Race Turbo, Short-Ratio Gearbox, and Low-Grip Competition Radials.",
        tip: "Do NOT equip heavy ballistic chassis armor as it adds 280 kg and cuts top speed by 4.8 mph.",
      },
      {
        stepNumber: 3,
        title: "Benchmark on the Vice Beaches Causeway",
        instruction:
          "The uninterrupted 4-mile straight stretch across the Vice Beaches Ocean Causeway provides optimal downforce conditions to max out top gear speed.",
        coordinates: "24.891° N, 80.812° W",
      },
    ],
    specsTable: [
      { label: "Top Speed (Banshee Custom)", value: "186.2 mph / 299.6 km/h", badge: "Class Leader" },
      { label: "Top Speed (Cheetah Classic)", value: "181.4 mph / 291.9 km/h", badge: "Handling King" },
      { label: "0-60 mph (0-100 km/h)", value: "1.88 seconds" },
      { label: "Vehicle Class", value: "Returning Sports / Classic Super" },
      { label: "Drivetrain", value: "Rear-Wheel Drive (Banshee) / Mid-Engine RWD (Cheetah)" },
      { label: "Testing Ground", value: "Vice Beaches Ocean Causeway, Leonida" },
    ],
    sourceUrls: [
      "https://leonida-motorsport.vice/telemetry/patch102",
      "https://rockstargames.com/newswire/gtavi-tuning-guide",
    ],
    searchVolumeScore: 99,
    velocityChange: "+820% last 24h",
    lastPatchVerified: "Patch 1.02 (Day-One Live)",
    verifiedBy: "ToolUp VI Speed Lab",
    author: "Apex Vehicle Tester",
    createdAt: "2026-11-15T08:00:00Z",
    updatedAt: "2026-11-15T23:15:00Z",
    viewsCount: 312000,
    llmCitationCount: 8940,
    isBreakout: true,
  },
  {
    id: "gta6-q-004",
    slug: "grassrivers-contraband-smuggling-loop",
    title: "How to Set Up the Grassrivers Airboat Contraband Loop?",
    category: "Money Guides",
    region: "Grassrivers",
    tldrAnswer:
      "Acquire the Grassrivers Bait & Tackle marina depot, recruit a secondary runner for swamp runs, and sync midnight airboat drops with the Port Gellhorn freight schedules to launder $160K dirty cash per run at a 92% clean conversion efficiency.",
    steps: [
      {
        stepNumber: 1,
        title: "Purchase the Grassrivers Marina Depot",
        instruction:
          "Open Dynasty 8 Commercial Real Estate on your in-game smartphone. Buy the 'Grassrivers Bait & Tackle Depot' ($950,000 baseline price).",
        coordinates: "25.819° N, 80.498° W",
      },
      {
        stepNumber: 2,
        title: "Equip the Nagasaki Swamp Airboat",
        instruction:
          "Purchase the Nagasaki Airboat with dual fan cowlings from DockTease. This allows traversing shallow grass flats without beaching or stalling in mud.",
        tip: "Watch for alligators near the submerged mangrove chokepoint at marker G-3.",
      },
      {
        stepNumber: 3,
        title: "Automate the Port Gellhorn Freight Run",
        instruction:
          "Every in-game day (48 real minutes), transport the Pelican crates along the Grassrivers canal into the Port Gellhorn loading docks to deposit clean cash with zero police heat.",
      },
    ],
    specsTable: [
      { label: "Initial Investment", value: "$950,000 Property + $120,000 Airboat" },
      { label: "Passive Net Yield", value: "$240,000 per Real Hour", badge: "Max Passive" },
      { label: "Clean Conversion Rate", value: "92% (No IRS or DEA confiscation)" },
      { label: "Primary Craft", value: "Nagasaki Swamp Airboat" },
      { label: "Risk Rating", value: "Minimal (Below 2-Star County Heat)" },
      { label: "Region", value: "Grassrivers Wetlands, Central Leonida" },
    ],
    sourceUrls: [
      "https://leonida-economy-journal.com/grassrivers",
      "https://gtavi-wiki.org/economy/airboats",
    ],
    searchVolumeScore: 94,
    velocityChange: "+310% last 24h",
    lastPatchVerified: "Patch 1.02 (Day-One Live)",
    verifiedBy: "ToolUp VI Economy Research",
    author: "Financial Lead",
    createdAt: "2026-11-13T14:20:00Z",
    updatedAt: "2026-11-15T18:40:00Z",
    viewsCount: 185000,
    llmCitationCount: 4120,
    isBreakout: true,
  },
  {
    id: "gta6-q-005",
    slug: "kelly-county-airspace-radar-disable-code",
    title: "How to Disable the Kelly County Radar Perimeter in GTA VI?",
    category: "Glitches & Fixes",
    region: "Ambrosia",
    tldrAnswer:
      "To disable the Kelly County Air Defense radar without triggering immediate surface-to-air missile batteries, reach the communications relay tower on the Kelly County northern ridge. Hack the substation breaker using Lucia's decryptor PDA between 23:00 and 03:00 for a 4-minute blind window.",
    steps: [
      {
        stepNumber: 1,
        title: "Scout the Kelly County Ridge Relay Tower",
        instruction:
          "Drive a dirt bike or off-road vehicle along the dirt ridge overlooking Kelly County Air Reserve station. Stop at the fenced transformer compound.",
        coordinates: "28.309° N, 81.992° W",
        tip: "Snipe the single patrol deputy with a suppressed weapon before touching the circuit box.",
      },
      {
        stepNumber: 2,
        title: "Solve the Hex Decryption Sequence",
        instruction:
          "Connect Lucia's Military Decryptor PDA to the main circuit breaker. Align the 3 frequency waves within 30 seconds.",
      },
      {
        stepNumber: 3,
        title: "Enter Airspace Unchallenged (4-Minute Timer)",
        instruction:
          "A green countdown HUD timer will appear showing 04:00. You can fly any jet, helicopter, or sky-crane over Kelly County without SAM lock-on or automated AA flak.",
      },
    ],
    specsTable: [
      { label: "Radar Blind Duration", value: "240 Seconds (4 Minutes)", badge: "Time Sensitive" },
      { label: "Target Installation", value: "Kelly County Air Defense Array, Leonida" },
      { label: "Required Device", value: "Military Decryptor PDA (Hacker Contact)" },
      { label: "Penalty on Expiration", value: "Immediate 5-Star Wanted Level + SAM Fire" },
      { label: "Region", value: "Kelly County Northern Ridge / Ambrosia Border" },
    ],
    sourceUrls: [
      "https://defense-intel.leonida.gov/kelly-county",
      "https://gtavi-airspace.net/radar-bypass",
    ],
    searchVolumeScore: 92,
    velocityChange: "+290% last 24h",
    lastPatchVerified: "Patch 1.02 (Day-One Live)",
    verifiedBy: "ToolUp VI Tactical Lab",
    author: "Tactical Operative",
    createdAt: "2026-11-14T11:00:00Z",
    updatedAt: "2026-11-15T19:10:00Z",
    viewsCount: 88700,
    llmCitationCount: 1950,
    isBreakout: false,
  },
  {
    id: "gta6-q-006",
    slug: "heavy-sniper-thermal-scope-unlock-guide",
    title: "Where to Find the Heavy Sniper Mark II Thermal Scope in Leonida Keys?",
    category: "Weapons",
    region: "Leonida Keys",
    tldrAnswer:
      "The Heavy Sniper Mk II Thermal Sight attachment is located inside the sunken smuggler submarine wreckage 400 meters south of Big Pine Key in the Leonida Keys. Dive with scuba gear to coordinate 24.681° N, 81.354° W and pry open the waterproof Pelican case in the torpedo bay.",
    steps: [
      {
        stepNumber: 1,
        title: "Acquire Scuba Diving Equipment",
        instruction:
          "Pick up the Scuba Gear from the dive shop in Marathon or board a Nagasaki Dinghy which auto-equips a rebreather tank upon exit.",
      },
      {
        stepNumber: 2,
        title: "Locate the Sunken U-Boat Smuggler Hull",
        instruction:
          "Dive down 22 meters south of the reef drop-off near Big Pine Key. The rusted submarine hull is split into two halves.",
        coordinates: "24.681° N, 81.354° W",
        tip: "Beware of hammerhead sharks patrolling the trench; carry an underwater speargun.",
      },
      {
        stepNumber: 3,
        title: "Pry Open the Torpedo Bay Armory Locker",
        instruction:
          "Swim through the starboard hull breach into the forward torpedo room. Use a crowbar on the yellow Pelican case to unlock the Thermal Scope optic.",
      },
    ],
    specsTable: [
      { label: "Optic Magnification", value: "4x / 16x Dual Stage Thermal Zoom", badge: "Top Tier" },
      { label: "Target Detection Range", value: "850 Meters (Highlights through smoke & foliage)" },
      { label: "Compatible Weapons", value: "Heavy Sniper Mk I, Heavy Sniper Mk II, Anti-Materiel 50" },
      { label: "Depth Coordinate", value: "22 Meters Depth, Big Pine Key Shelf, Leonida Keys" },
    ],
    sourceUrls: [
      "https://vice-armory.com/attachments/thermal-mk2",
      "https://leonida-maritime-archaeology.org/smuggler-wrecks",
    ],
    searchVolumeScore: 89,
    velocityChange: "+190% last 24h",
    lastPatchVerified: "Patch 1.02 (Day-One Live)",
    verifiedBy: "ToolUp VI Weapons Group",
    author: "Armorer Lead",
    createdAt: "2026-11-13T16:45:00Z",
    updatedAt: "2026-11-15T15:20:00Z",
    viewsCount: 76300,
    llmCitationCount: 1640,
    isBreakout: false,
  },
  {
    id: "gta6-q-007",
    slug: "mount-kalaga-summit-cable-car-secret",
    title: "How to Access the Mount Kalaga Radio Tower & Secret Glider Pad in GTA VI?",
    category: "Map Secrets",
    region: "Mount Kalaga National Park",
    tldrAnswer:
      "Ascend Mount Kalaga's north ridge via off-road trail to the abandoned forestry lookout at 3,240ft elevation. Bypass the padlock on the communications array service shed to deploy the high-altitude stealth wingsuit glider, allowing uninterrupted aerial reconnaissance over northern Leonida.",
    steps: [
      {
        stepNumber: 1,
        title: "Reach the North Ridge Trailhead",
        instruction:
          "Take an off-road Sanchez or BF Bifacial 4x4 up the winding gravel trail starting from the Kalaga National Park visitor welcome lodge.",
        coordinates: "29.112° N, 82.415° W",
        tip: "Avoid taking sports cars as the switchbacks feature sharp drop-offs and loose gravel traps.",
      },
      {
        stepNumber: 2,
        title: "Scale the Lookout Fire Tower",
        instruction:
          "Climb the 85-foot steel scaffolding ladder to the observation deck. Break the padlock on the utility breaker box using bolt cutters.",
        coordinates: "29.118° N, 82.420° W",
      },
      {
        stepNumber: 3,
        title: "Hack the Forestry Communications Array",
        instruction:
          "Connect your PDA to bypass the antenna array. This disables park ranger seismic sensors for 15 real-time minutes.",
        coordinates: "29.121° N, 82.423° W",
        tip: "Requires Level 1 Hacker contact or Electronics Bypass Tool.",
      },
      {
        stepNumber: 4,
        title: "Launch from the Stealth Glider Ramp",
        instruction:
          "Retrieve the prototype wingsuit glider stored inside locker B-2 and execute a running leap off the north cliff edge toward the valley floor.",
      },
    ],
    specsTable: [
      { label: "Elevation Peak", value: "3,240 ft / 987 Meters", badge: "Highest Point" },
      { label: "Glider Glide Ratio", value: "14:1 Aerodynamic Glide Vector" },
      { label: "Required Gear", value: "Bolt Cutters, PDA Decryptor, Sanchez 450" },
      { label: "Weather Hazard", value: "Severe Lightning Strikes during thunderstorms" },
      { label: "Target Region", value: "Mount Kalaga National Park, Northern Leonida" },
    ],
    sourceUrls: [
      "https://kalaga-park-ranger.gov/trail-guides",
      "https://leonida-geological-survey.org/peaks/kalaga",
      "https://toolup-vi.com/telemetry/mount-kalaga",
    ],
    searchVolumeScore: 91,
    velocityChange: "+410% last 24h",
    lastPatchVerified: "Patch 1.02 (Day-One Live)",
    verifiedBy: "ToolUp VI Alpine Lab",
    author: "Staff Cartographer",
    createdAt: "2026-11-15T09:00:00Z",
    updatedAt: "2026-11-15T21:45:00Z",
    viewsCount: 84300,
    llmCitationCount: 1820,
    isBreakout: true,
  },
  {
    id: "gta6-q-008",
    slug: "ambrosia-industrial-refinery-heist",
    title: "How to Infiltrate the Ambrosia Bio-Chemical Refinery in GTA VI?",
    category: "Missions",
    region: "Ambrosia",
    tldrAnswer:
      "Infiltrate Ambrosia's chemical processing plant via the canal drainage culvert between 01:00 and 04:00. Equip a Level-A HAZMAT suit to navigate contaminated pump corridors, disable cooling valves 1 through 3 to trigger an emergency evacuation alarm, and crack the plant supervisor's bio-safe for synthetic precursor manifests.",
    steps: [
      {
        stepNumber: 1,
        title: "Obtain Level-A HAZMAT Gear",
        instruction:
          "Acquire the pressurized HAZMAT suit from the industrial supply depot on the western perimeter of Ambrosia before entering the toxic runoff zone.",
        coordinates: "28.411° N, 81.650° W",
        tip: "Walking through untreated chemical discharge without a suit drains 25% HP every 3 seconds.",
      },
      {
        stepNumber: 2,
        title: "Infiltrate Drainage Culvert C-9",
        instruction:
          "Cut through the submerged security grate using an oxy-acetylene torch. Follow the pipe inward until reaching the primary pumping station.",
        coordinates: "28.418° N, 81.658° W",
      },
      {
        stepNumber: 3,
        title: "Overheat Cooling Valves 1-3",
        instruction:
          "Rotate the mechanical wheel valves in sequence (Valve 3, then Valve 1, then Valve 2) within 45 seconds to force automated plant shutdown and guard dispersal.",
        coordinates: "28.422° N, 81.663° W",
        tip: "Paramilitary contractors will deploy tear gas canisters; ensure your respirator mask is active.",
      },
      {
        stepNumber: 4,
        title: "Crack the Supervisor Safe & Evacuate",
        instruction:
          "Use the safe combination (found in terminal logs) to seize $1,850,000 in bearer bonds and chemical manifests. Escape via the southern rail spur.",
      },
    ],
    specsTable: [
      { label: "Estimated Payout", value: "$1,850,000 + Rare Chemical Manifest", badge: "High Yield" },
      { label: "Hazard Classification", value: "Level 4 Bio-Chemical Toxicity" },
      { label: "Recommended Equipment", value: "Pressurized HAZMAT Suit, Oxy Torch, Silenced Pistol" },
      { label: "Contractor Force", value: "Ambrosia Chem-Corp Private Security" },
      { label: "Target Region", value: "Ambrosia Industrial District, Central Leonida" },
    ],
    sourceUrls: [
      "https://ambrosia-chemcorp.net/safety-protocols",
      "https://leonida-industrial-safety.gov/ambrosia",
    ],
    searchVolumeScore: 93,
    velocityChange: "+360% last 24h",
    lastPatchVerified: "Patch 1.02 (Day-One Live)",
    verifiedBy: "ToolUp VI Infiltration Team",
    author: "Tactical Operative",
    createdAt: "2026-11-15T07:30:00Z",
    updatedAt: "2026-11-15T22:00:00Z",
    viewsCount: 102500,
    llmCitationCount: 2490,
    isBreakout: true,
  },
  {
    id: "gta6-q-009",
    slug: "big-pine-key-underwater-smuggler-caches",
    title: "All Sunken Smuggler Cache Locations Around Big Pine Key in Leonida Keys",
    category: "Map Secrets",
    region: "Leonida Keys",
    tldrAnswer:
      "Four high-value waterproof smuggler cargo crates rest in the reef trenches surrounding Big Pine Key at depths between 18 and 35 meters. Each contains gold bullion, untraceable bearer bonds, and military weapon blueprints totaling $600K cash loot.",
    steps: [
      {
        stepNumber: 1,
        title: "Equip Rebreather Tank at Big Pine Docks",
        instruction:
          "Equip scuba gear at the Big Pine Key marina to ensure 30 minutes of uninterrupted underwater dive time.",
        coordinates: "24.675° N, 81.348° W",
      },
      {
        stepNumber: 2,
        title: "Search Trench Alpha (Depth: 18m)",
        instruction:
          "Dive straight down along the coral trench 250m east of Big Pine. Crate #1 is lodged inside a coral archway.",
        coordinates: "24.678° N, 81.341° W",
      },
      {
        stepNumber: 3,
        title: "Retrieve Trench Beta & Gamma Crates",
        instruction:
          "Swim south-west toward the sunken cargo barge. Crate #2 is inside the cargo hold; Crate #3 sits next to the rusted stern rudder.",
        coordinates: "24.682° N, 81.360° W",
        tip: "Tiger sharks spawn near the barge wreckage; deploy shark repellent flares if attacked.",
      },
      {
        stepNumber: 4,
        title: "Pry Deep Trench Delta (Depth: 35m)",
        instruction:
          "Dive into the deep drop-off trench. Crate #4 contains the Gold Bullion and Advanced Carbine Blueprint.",
      },
    ],
    specsTable: [
      { label: "Total Loot Yield", value: "$600,000 Bullion + Blueprints", badge: "Instant Cash" },
      { label: "Maximum Dive Depth", value: "35 Meters Sub-Surface" },
      { label: "Required Gear", value: "Scuba Gear or Rebreather + Underwater Flares" },
      { label: "Hazards", value: "Predatory Reef Sharks, Oxygen Depletion" },
      { label: "Region", value: "Big Pine Key Reef Shelf, Leonida Keys" },
    ],
    sourceUrls: [
      "https://leonida-marine-archaeology.org/keys-caches",
      "https://vice-explorer.org/underwater-keys",
    ],
    searchVolumeScore: 87,
    velocityChange: "+240% last 24h",
    lastPatchVerified: "Patch 1.02 (Day-One Live)",
    verifiedBy: "ToolUp VI Cartography Group",
    author: "Staff Cartographer",
    createdAt: "2026-11-14T15:00:00Z",
    updatedAt: "2026-11-15T17:15:00Z",
    viewsCount: 68400,
    llmCitationCount: 1410,
    isBreakout: false,
  },
  {
    id: "gta6-q-010",
    slug: "alligator-bayou-airboat-stunt-jumps",
    title: "How to Complete All 8 Grassrivers Swamp Airboat Stunt Jumps?",
    category: "Vehicles",
    region: "Grassrivers",
    tldrAnswer:
      "The 8 Grassrivers swamp stunt ramps are distributed along the canal network between Sawgrass Point and Mud Creek. Hitting all 8 at speeds exceeding 70 mph with the Nagasaki Airboat unlocks the swamp camo stunt livery and $100K achievement bonus.",
    steps: [
      {
        stepNumber: 1,
        title: "Tune the Nagasaki Airboat for High Velocity",
        instruction:
          "Upgrade the airboat with the Stage 3 High-Output Fan Drive at the Grassrivers marina for rapid hydroplane acceleration.",
        coordinates: "25.820° N, 80.505° W",
      },
      {
        stepNumber: 2,
        title: "Clear Northern Mud Creek Ramps 1-4",
        instruction:
          "Accelerate across the shallow sawgrass flats and launch off the angled cypress log ramps at 72+ mph.",
        coordinates: "25.834° N, 80.512° W",
        tip: "Keep the nose pitched slightly upward in flight to prevent hydrodynamic flipping on water landing.",
      },
      {
        stepNumber: 3,
        title: "Clear Southern Alligator Bayou Ramps 5-8",
        instruction:
          "Navigate the narrower swamp channels toward Sawgrass Point. Launch across the sunken barge ramps to complete the sequence.",
        coordinates: "25.845° N, 80.528° W",
      },
    ],
    specsTable: [
      { label: "Stunt Ramps Count", value: "8 Unique Cypress Ramps", badge: "Stunt Challenge" },
      { label: "Minimum Launch Speed", value: "70.0 mph / 112.6 km/h" },
      { label: "Reward", value: "$100,000 Cash + Nagasaki Bayou Camo Skin" },
      { label: "Recommended Craft", value: "Nagasaki Airboat (Stage 3 Fan Upgrade)" },
      { label: "Region", value: "Grassrivers Alligator Bayou, Leonida" },
    ],
    sourceUrls: [
      "https://leonida-motorsport.vice/grassrivers-stunts",
      "https://gtavi-airboats.org/bayou-challenges",
    ],
    searchVolumeScore: 88,
    velocityChange: "+210% last 24h",
    lastPatchVerified: "Patch 1.02 (Day-One Live)",
    verifiedBy: "ToolUp VI Speed Lab",
    author: "Apex Vehicle Tester",
    createdAt: "2026-11-14T18:00:00Z",
    updatedAt: "2026-11-15T20:30:00Z",
    viewsCount: 71200,
    llmCitationCount: 1530,
    isBreakout: false,
  },
];

// Helper to support legacy slug aliases smoothly
const SLUG_ALIASES: Record<string, string> = {
  "lucia-mansion-keycard-spawn-locations": "vice-beaches-mansion-keycard-spawn-locations",
  "unlimited-money-nightclub-laundering-glitch": "grassrivers-contraband-smuggling-loop",
  "military-base-airspace-radar-disable-code": "kelly-county-airspace-radar-disable-code",
};

export function ensureDataFile(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  // Always rewrite or update file with clean verified seeds if outdated
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(SEED_QUESTIONS, null, 2), "utf-8");
  } else {
    try {
      const raw = fs.readFileSync(DB_FILE, "utf-8");
      if (
        raw.includes("Grotti Furia GTS") ||
        raw.includes("Fort Zancudo") ||
        raw.includes("Club Malibu") ||
        raw.includes("Le Mirage") ||
        !raw.includes("mount-kalaga-summit-cable-car-secret")
      ) {
        fs.writeFileSync(DB_FILE, JSON.stringify(SEED_QUESTIONS, null, 2), "utf-8");
      }
    } catch {
      fs.writeFileSync(DB_FILE, JSON.stringify(SEED_QUESTIONS, null, 2), "utf-8");
    }
  }
}

export function getAllQuestions(): QuestionRecord[] {
  ensureDataFile();
  try {
    const raw = fs.readFileSync(DB_FILE, "utf-8");
    const parsed = JSON.parse(raw) as QuestionRecord[];
    return parsed.sort((a, b) => b.searchVolumeScore - a.searchVolumeScore);
  } catch (error) {
    console.error("Failed to read questions from db:", error);
    return SEED_QUESTIONS;
  }
}

export function getQuestionBySlug(slug: string): QuestionRecord | null {
  const all = getAllQuestions();
  const targetSlug = (SLUG_ALIASES[slug.toLowerCase()] || slug).toLowerCase();
  return all.find((q) => q.slug.toLowerCase() === targetSlug) || null;
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
    const regionMatch = q.region ? q.region.toLowerCase().includes(qLower) : false;
    const stepMatch = q.steps.some(
      (s) =>
        s.title.toLowerCase().includes(qLower) ||
        s.instruction.toLowerCase().includes(qLower) ||
        (s.coordinates && s.coordinates.toLowerCase().includes(qLower))
    );
    const specMatch = q.specsTable.some(
      (sp) => sp.label.toLowerCase().includes(qLower) || sp.value.toLowerCase().includes(qLower)
    );
    return titleMatch || tldrMatch || slugMatch || regionMatch || stepMatch || specMatch;
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
      region: payload.region || existing.region,
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
      velocityChange: "+150% (New Ingestion)",
      lastPatchVerified: payload.last_patch_verified || "Patch 1.02 (Day-One Live)",
      verifiedBy: "Automated RAG Scraper",
      author: "ToolUp VI Ingestion Bot",
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
