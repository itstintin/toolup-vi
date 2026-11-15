import { QuestionRecord, WikiRegion } from "@/types";

export interface RegionMetadata {
  id: string;
  name: WikiRegion;
  subtitle: string;
  description: string;
  coordinates: string;
  riskRating: "Low" | "Medium" | "High" | "Extreme";
  accentColor: string;
  keyPOIs: string[];
}

export const WIKI_REGIONS: RegionMetadata[] = [
  {
    id: "vice-city",
    name: "Vice City",
    subtitle: "Metropolitan Ocean & Nightlife Core",
    description:
      "Neon-drenched urban center spanning Ocean Drive, Starfish Island, Vice Beaches, and Downtown high-rises. Ground zero for luxury vehicle benching and cartel safehouses.",
    coordinates: "25.761° N, 80.191° W",
    riskRating: "Medium",
    accentColor: "#FF2E93",
    keyPOIs: ["Ocean Drive", "Starfish Island Mansions", "Jack of Hearts Club", "Vice Beaches Causeway"],
  },
  {
    id: "leonida-keys",
    name: "Leonida Keys",
    subtitle: "Southern Archipelago & Smuggler Reefs",
    description:
      "A chain of subtropical islands connected by the Overseas Highway. Features deep coral reefs, sunken U-boat wrecks, and military-grade armory caches.",
    coordinates: "24.681° N, 81.354° W",
    riskRating: "Medium",
    accentColor: "#00F0FF",
    keyPOIs: ["Big Pine Key Shelf", "Sunken Smuggler U-Boat", "Marathon Dive Outpost", "Overseas Bridge"],
  },
  {
    id: "grassrivers",
    name: "Grassrivers",
    subtitle: "Central Wetland Marshes & Contraband Flats",
    description:
      "Vast alligator-infested sawgrass flats cut by winding tidal channels. Ideal for high-yield airboat laundering operations and hidden moonshine airfields.",
    coordinates: "25.819° N, 80.498° W",
    riskRating: "High",
    accentColor: "#10B981",
    keyPOIs: ["Bait & Tackle Marina Depot", "Sawgrass Point Ramps", "Alligator Bayou Canal", "Mud Creek Flats"],
  },
  {
    id: "port-gellhorn",
    name: "Port Gellhorn",
    subtitle: "Heavy Industrial Maritime & Freight Docks",
    description:
      "High-security industrial deep-water seaport and freight terminal in Western Leonida. Patrolled by private paramilitary contractors with automated coastal radar arrays.",
    coordinates: "27.142° N, 82.319° W",
    riskRating: "Extreme",
    accentColor: "#F59E0B",
    keyPOIs: ["Naval Dock Pylons", "Crane 3 Sea Chest", "Deck C Terminal B-4", "Container Rail Yard"],
  },
  {
    id: "ambrosia",
    name: "Ambrosia",
    subtitle: "Agricultural Heartland & Chemical Refineries",
    description:
      "Inland agricultural manufacturing district featuring chemical processing plants, secure Kelly County radar towers, and underground precursor storage silos.",
    coordinates: "28.411° N, 81.650° W",
    riskRating: "High",
    accentColor: "#9D4EDD",
    keyPOIs: ["Chem-Corp Bio-Refinery", "Kelly County Ridge Array", "Drainage Culvert C-9", "Southern Rail Spur"],
  },
  {
    id: "mount-kalaga-national-park",
    name: "Mount Kalaga National Park",
    subtitle: "Alpine Wilderness & High-Altitude Ridge",
    description:
      "Leonida's highest vertical peak rising 3,240 feet above sea level. Packed with forestry fire lookouts, hidden glider launch ramps, and off-road ridge switchbacks.",
    coordinates: "29.112° N, 82.415° W",
    riskRating: "Extreme",
    accentColor: "#38BDF8",
    keyPOIs: ["North Ridge Trailhead", "3,240ft Summit Radio Tower", "Forestry Array Shed", "Stealth Glider Ramp"],
  },
];

export interface WikiTreeNode {
  region: RegionMetadata;
  guides: QuestionRecord[];
}

export interface HubChecklistItem {
  id: string;
  label: string;
  region: WikiRegion;
  difficulty: "Easy" | "Medium" | "Hard" | "Extreme";
  reward: string;
}

export const LAUNCH_COMPLETIONIST_CHECKLIST: HubChecklistItem[] = [
  {
    id: "checklist-01",
    label: "Obtain Scuba Diving Rebreather at Marathon Marina",
    region: "Leonida Keys",
    difficulty: "Easy",
    reward: "Unlimited Sub-Surface Dive Time",
  },
  {
    id: "checklist-02",
    label: "Retrieve Starfish Island Villa 9 Cheetah Keycard",
    region: "Vice City",
    difficulty: "Medium",
    reward: "$450,000 Cash + Cartel Ledger",
  },
  {
    id: "checklist-03",
    label: "Purchase Grassrivers Bait & Tackle Marina ($950K)",
    region: "Grassrivers",
    difficulty: "Medium",
    reward: "$240,000/hr Passive Laundering",
  },
  {
    id: "checklist-04",
    label: "Hijack the Port Gellhorn Cargo Ship via Submersible",
    region: "Port Gellhorn",
    difficulty: "Hard",
    reward: "$2,450,000 + Black Market Cargo",
  },
  {
    id: "checklist-05",
    label: "Hack Kelly County Radar Substation Breaker",
    region: "Ambrosia",
    difficulty: "Medium",
    reward: "4-Minute SAM-Free Airspace Window",
  },
  {
    id: "checklist-06",
    label: "Reach 3,240ft Mount Kalaga Summit & Deploy Glider",
    region: "Mount Kalaga National Park",
    difficulty: "Extreme",
    reward: "Stealth Wingsuit Recon Glider",
  },
  {
    id: "checklist-07",
    label: "Recover Mk II Heavy Sniper Thermal Scope from U-Boat Wreck",
    region: "Leonida Keys",
    difficulty: "Hard",
    reward: "850m Thermal Optic Magnification",
  },
  {
    id: "checklist-08",
    label: "Tune Bravado Banshee Custom to Stage 4 EMS Benchmark",
    region: "Vice City",
    difficulty: "Hard",
    reward: "186.2 mph Verified Top Speed",
  },
];
