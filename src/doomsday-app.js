import { initBilateralSmokeSimulation } from './doomsday-smoke';
import { applyRegistrationTarget, handleRegisterClick } from './registration/eventMap';
import { EVENT_LEVELS, EVENT_LEVEL_ORDER } from './eventLevels';
const CDN = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/";
export const HAND = {
    IMG_AR: 16 / 9, // 1.7778 for broad widescreen desktop coverage
    EYES_Y: 0.18,
    EYES_X: [0.47, 0.53],
    HOOD_TOP_Y: 0.05,
    PALM: { x: 0.50 },
    REST_Y: 0.65,
    PALM_W: 0.48,
    FINGERS_Y: [0.56, 0.78],
    FRONT_FROM: 0.62,
};
// Wrist countdown anchor (fractions of the gauntlet image). Tune x/y/w/rot to move it.
export const WRIST = { x: 0.487, y: 0.86, w: 0.24, rot: 0 };
export const ITEMS = [
    {
        code: "SEC-01",
        title: "Junior Scientist",
        subtitle: "INC-001 // INNOVATION EXPO",
        desc: "Igniting next-generation intellect before timeline collapse. School students from across the country exhibit quantum models, automated rovers, and breakthrough bio-mechanical proofs under Doctor Doom's scrutiny.",
        id: "hf_20260922_194349_26ffdbfd-ac5e-49e9-a07d-c06d3f7cb4cb",
        threat: "CAT-3 // STABLE",
        tip: "Where young minds ignite",
        blurb: "Highlights, past memories and everything for the junior innovators.",
        chips: ["EXPO", "ROBOTICS", "AVIONICS"],
        subs: [
            { name: "Quantum Sparks Exhibition", tag: "EXPO", timeOrSpecs: "DAY 01   10:00 - 16:00 IST   MAIN HANGAR", details: "Middle and high school prodigies present working models spanning renewable energy, automation, and applied physics. Judged by senior Latverian researchers.", actionText: "REGISTER PROTO-UNIT" },
            { name: "Robo-Junior Arena", tag: "ROBOTICS", timeOrSpecs: "DAY 02   11:30 - 15:00 IST   SECTOR B", details: "Autonomous obstacle navigators and line-follower bots designed and deployed by young engineers under 16 years of age.", actionText: "ENTER ROBOT" },
            { name: "Aero-Glider Design Challenge", tag: "AVIONICS", timeOrSpecs: "DAY 02   14:00 - 17:30 IST   AIR STRIP", details: "Aerodynamic glider fabrication using balsa wood and carbon composite. Flight duration and stability determine victory.", actionText: "SUBMIT BLUEPRINT" }
        ]
    },
    {
        code: "SEC-02",
        title: "About",
        subtitle: "INC-002 // SYMPOSIUM CODEX",
        desc: "PRAGYAA 2027 is SGGS IE&T's flagship national technical symposium, re-engineered as an incursion battleground where code, steel, and intellect forge the future of the multiverse.",
        id: "hf_20260922_194350_5546ea3d-6336-42c7-a59f-06165c5802be",
        threat: "CAT-1 // ARCHIVE",
        tip: "The mission behind Pragya",
        blurb: "Our mission, vision and values.",
        chips: ["LEGACY", "MISSION", "ACADEMIA"],
        subs: [
            { name: "The Festival Legacy", tag: "LEGACY", timeOrSpecs: "EST. 1981   NANDED, MAHARASHTRA", details: "Over four decades of engineering supremacy. PRAGYA convenes thousands of innovators across 40+ engineering institutes annually.", actionText: "READ CHRONICLES" },
            { name: "The Doomsday Protocol", tag: "MISSION", timeOrSpecs: "TIMELINE RE-WRITING INITIATIVE", details: "In a fragmented multiverse of technologies, PRAGYA 2027 unites AI, robotics, cyber-warfare, and sustainable design under one imperial command.", actionText: "VIEW DIRECTIVE" },
            { name: "Host Institute // SGGSIE&T", tag: "ACADEMIA", timeOrSpecs: "SGGS CAMPUS   46 ACRE AUTONOMOUS ZONE", details: "Shri Guru Gobind Singhji Institute of Engineering & Technology   premier autonomous engineering institute known for research and world-class alumni.", actionText: "CAMPUS PORTAL" }
        ]
    },
    {
        code: "SEC-03",
        title: "Events",
        subtitle: "INC-003 // WARFARE & ARENAS",
        desc: "Combat zones across software, mechanical warfare, avionics, and quantum cryptography. High-stakes competition with massive bounty pools and national glory.",
        id: "hf_20260922_194349_b4533691-cb49-41d4-b56c-51f0fdcbe250",
        threat: "CAT-5 // HOSTILE",
        tip: "Compete. Create. Conquer.",
        blurb: "Flagship, departmental and creative events. Rulebook inside.",
        chips: ["WARFARE", "CYBER", "ALGO"],
        subs: [
            { name: "RoboWars // Heavyweight", tag: "WARFARE", timeOrSpecs: "60KG CLASS   STEEL CAGE   BOUNTY: ₹75,000", details: "Armor-crushing pneumatic flippers, hardened carbide spinning blades, and tracked destroyers battle in bulletproof Lexan containment.", actionText: "DEPLOY COMBAT BOT" },
            { name: "Incursion Hackathon 36H", tag: "CYBER", timeOrSpecs: "36 HOURS NON-STOP   BOUNTY: ₹1,00,000", details: "Build production-grade solutions tackling AI security, decentralized infrastructure, or disaster telemetry under extreme time pressure.", actionText: "REGISTER TEAM" },
            { name: "Code Blitz // Algo Wars", tag: "ALGORITHMS", timeOrSpecs: "SPEED CODING   3 ROUNDS   ALL RUNTIMES", details: "Competitive algorithmic programming contest testing raw speed, time complexity, and distributed system puzzles.", actionText: "ENTER ARENA" },
            { name: "Drone Racing League", tag: "FPV", timeOrSpecs: "MICRO-FPV OBSTACLE CIRCUIT   NIGHT RUN", details: "High-speed multi-rotor obstacle navigation through LED gates at speeds up to 120 km/h.", actionText: "REGISTER PILOT" }
        ]
    },
    {
        code: "SEC-04",
        title: "Team",
        subtitle: "INC-004 // CORE DIRECTORATE",
        desc: "The high council executing the festival protocols. Engineers, coordinators, and directors maintaining timeline integrity across all sectors.",
        id: "hf_20260922_194349_e588abd3-1bfa-4918-894f-05632cc51ccc",
        threat: "CAT-2 // COMMAND",
        tip: "The council behind the chaos",
        blurb: "Secretaries, coordinators and the web committee.",
        chips: ["DIRECTORATE", "CORE DEV", "LOGISTICS"],
        subs: [
            { name: "Festival Convenors", tag: "DIRECTORATE", timeOrSpecs: "EXECUTIVE DIRECTORS   STRATEGIC OPS", details: "Overseeing institutional governance, external liaisons, budget allocation, and festival-wide deployment vectors.", actionText: "CONTACT CONVENORS" },
            { name: "Technical Directorate", tag: "CORE ENGINES", timeOrSpecs: "SYSTEM ARCHITECTURE & ARENAS", details: "Architects of the 3D incursion portal, network grid, digital registration servers, and telemetry nodes.", actionText: "DEV LOGS" },
            { name: "Logistics & Public Relations", tag: "OPERATIONS", timeOrSpecs: "CAMPUS PROTOCOLS & HOSPITALITY", details: "Handling nationwide delegate escorts, accommodation, sound/light staging, and media broadcast units.", actionText: "CONTACT DISPATCH" }
        ]
    },
    {
        code: "SEC-05",
        title: "Schedule",
        subtitle: "INC-005 // TEMPORAL MATRIX",
        desc: "Three days of relentless innovation, hackathons, guest keynotes, and arena showdowns synchronized to the second across the campus.",
        id: "hf_20260922_194350_28d92c80-de66-41cb-911e-b3b44aebe1f5",
        threat: "CAT-2 // SYNCHRONIZED",
        tip: "Three days. One timeline.",
        blurb: "Day-by-day timings so you never miss a moment.",
        chips: ["DAY 01", "DAY 02", "DAY 03"],
        subs: [
            { name: "Day 01 // The Incursion Begins", tag: "OPENING", timeOrSpecs: "09:00 - 22:00 IST   CEREMONY & HACK LAUNCH", details: "Grand inauguration, keynotes, Hackathon sprint kickoff, Junior Scientist preliminary reviews, and drone qualifiers.", actionText: "VIEW DAY 1 TIMELINE" },
            { name: "Day 02 // Combat & Colloquium", tag: "MID-CYCLE", timeOrSpecs: "09:30 - 23:00 IST   ROBOWARS & PITCHES", details: "Heavyweight RoboWars tournament rounds, startup investor pitch sessions, technical paper symposium, and AI seminars.", actionText: "VIEW DAY 2 TIMELINE" },
            { name: "Day 03 // Battleworld Convergence", tag: "FINALE", timeOrSpecs: "10:00 - 21:30 IST   FINALS & PRIZE CEREMONY", details: "RoboWars Grand Finals, Hackathon top 10 demos, celebrity keynote address, and ₹5,00,000+ total prize distribution.", actionText: "VIEW FINALE TIMELINE" }
        ]
    },
    {
        code: "SEC-06",
        title: "Gallery",
        subtitle: "INC-006 // VISUAL ARCHIVES",
        desc: "Declassified photographic archives and footage from previous editions of PRAGYA and live feeds from the current staging zones.",
        id: "hf_20260922_194349_04e89718-4214-4aff-bac5-490462bbfe2f",
        threat: "CAT-1 // INTEL",
        tip: "Movements that define innovation",
        blurb: "Frames from past editions.",
        chips: ["STILLS", "CANDID", "AERIAL"],
        subs: [
            { name: "Arena Combat Archives", tag: "STILLS", timeOrSpecs: "HIGH-SPEED TELEMETRY PHOTOGRAPHY", details: "Sparks, metal shards, and high-impact clashes captured at 1000 FPS inside the RoboWars arena.", actionText: "LAUNCH ARCHIVE" },
            { name: "Hackathon Night Warfare", tag: "CANDID", timeOrSpecs: "03:00 AM COLD CODE SPRINTS", details: "Developers immersed in deep focus, glowing monitors, and architectural whiteboards during the 36-hour sprint.", actionText: "BROWSE REEL" },
            { name: "Drone & Avionic Displays", tag: "AERIAL", timeOrSpecs: "LONG EXPOSURE LIGHT TRAILS", details: "Night FPV races leaving luminescent emerald ribbons across the central courtyard sky.", actionText: "VIEW PRINTS" }
        ]
    },
    {
        code: "SEC-07",
        title: "eVenture",
        subtitle: "INC-007 // STARTUP CATALYST",
        desc: "The entrepreneurial epicenter connecting student startups, visionary founders, seed investors, and venture capitalists.",
        id: "hf_20260922_194417_2c031e22-2fad-4c81-a544-83cd6bba1c33",
        threat: "CAT-3 // COMMERCIAL",
        tip: "Pitch. Fund. Disrupt.",
        blurb: "Startup Expo, Lightning Pitch and the IPL Auction.",
        chips: ["PITCH", "KEYNOTE", "RECRUIT"],
        subs: [
            { name: "Elevator Pitch Arena", tag: "PITCH", timeOrSpecs: "3 MINUTES   ANGEL PANEL   25L SEED FUND", details: "Founders deliver rapid-fire pitches to an esteemed panel of VC partners and angel syndicate leads.", actionText: "SUBMIT DECK" },
            { name: "Founder Masterclass", tag: "KEYNOTE", timeOrSpecs: "SCALING FROM 0 TO 100K MAU", details: "Uncensored fireside sessions with unicorn founders on product-market fit, enterprise sales, and resilience.", actionText: "RESERVE SEAT" },
            { name: "Internship & Talent Expo", tag: "RECRUIT", timeOrSpecs: "50+ TECH STARTUPS HIRING", details: "Direct walk-in interviews and portfolio reviews for high-growth tech internships and early engineering roles.", actionText: "DROP RESUME" }
        ]
    },
    {
        code: "SEC-08",
        title: "FAQ",
        subtitle: "INC-008 // INTEL & GUIDELINES",
        desc: "Operational briefs, registration guidelines, accommodation protocols, and rules of engagement for all participants.",
        id: "hf_20260922_194349_a39c3226-7848-4b15-b840-98ad8aec467b",
        threat: "CAT-1 // GUIDELINES",
        tip: "Questions answered",
        blurb: "Accommodation, registration and common queries.",
        chips: ["ELIGIBILITY", "HOSPITALITY", "POLICY"],
        subs: [
            { name: "Who is eligible to participate?", tag: "ELIGIBILITY", timeOrSpecs: "UNDERGRADUATES & SCHOOL STUDENTS", details: "Students currently enrolled in any recognized school, diploma, undergraduate, or postgraduate program with valid institutional ID.", actionText: "VERIFY CREDENTIALS" },
            { name: "Campus Accommodation & Meals", tag: "HOSPITALITY", timeOrSpecs: "SGGS RESIDENTIAL QUARTERS", details: "Separate residential facilities for male and female delegates available with pre-booking. Full meals provided throughout the festival.", actionText: "BOOK LODGING" },
            { name: "Team Formation & Cross-College Rules", tag: "POLICY", timeOrSpecs: "INTER-COLLEGE TEAMS ALLOWED", details: "Hackathons and RoboWars allow cross-institutional squads. Maximum squad caps vary per event specification sheet.", actionText: "READ RULEBOOK" }
        ]
    },
    {
        code: "SEC-09",
        title: "Sponsors",
        subtitle: "INC-009 // SYNDICATE ALLIES",
        desc: "Industry leaders, cloud computing titans, and global hardware conglomerates fueling the PRAGYA 2027 ecosystem.",
        id: "hf_20260922_194417_555e4d90-f35f-4a1a-8c75-def1e8b71988",
        threat: "CAT-2 // ALLIED",
        tip: "Powered by visionaries",
        blurb: "Meet the five partners behind Pragya.",
        chips: ["PLATINUM", "HARDWARE", "BROADCAST"],
        subs: [
            { name: "Title Syndicate Partners", tag: "PLATINUM", timeOrSpecs: "CHIEF PATRONS & CLOUD PARTNERS", details: "Leading tech firms providing compute credits, mentorship, hardware evaluation units, and cash bounties.", actionText: "BECOME A SPONSOR" },
            { name: "Hardware & Robotics Sponsors", tag: "HARDWARE", timeOrSpecs: "TOOLS, MOTORS & COMPONENT RIGS", details: "Suppliers of ESCs, brushless motors, microcontrollers, and rapid prototyping 3D printers for participants.", actionText: "VIEW PARTNERS" },
            { name: "Media & Outreach Networks", tag: "BROADCAST", timeOrSpecs: "NATIONAL TECH MEDIA COVERAGE", details: "Broadcasting tournament streams, founder interviews, and live event leaderboards to over 100,000 online viewers.", actionText: "MEDIA KIT" }
        ]
    },
    {
        code: "SEC-10",
        title: "Guests",
        subtitle: "INC-010 // KEYNOTE DIGNITARY",
        desc: "Distinguished scientists, defense technologists, aerospace engineers, and visionaries addressing the convocation.",
        id: "hf_20260922_194417_e525a243-03c8-454b-83b4-60f541baf70a",
        threat: "CAT-1 // DIGNITARY",
        tip: "Voices from beyond",
        blurb: "Speakers and special guests of Pragya 2027.",
        chips: ["KEYNOTE", "TALK", "SYMPOSIUM"],
        subs: [
            { name: "Chief Defense Technologist", tag: "KEYNOTE", timeOrSpecs: "DRDO / AEROSPACE DIRECTOR", details: "Keynote address on autonomous missile interception and quantum secure communications in contested airspaces.", actionText: "SET REMINDER" },
            { name: "AI Research Fellow", tag: "TALK", timeOrSpecs: "FRONTIER NEURAL ARCHITECTURES", details: "Deep dive into sub-billion parameter reasoning models and neuromorphic silicon architectures.", actionText: "SEAT RESERVATION" },
            { name: "Industrial Robotics Pioneer", tag: "SYMPOSIUM", timeOrSpecs: "AUTOMOTIVE MEGACONSORTIUM", details: "Masterclass on high-speed kinetic kinematics, servo feedback loops, and human-collaborative assembly lines.", actionText: "SESSION PASS" }
        ]
    },
    {
        code: "SEC-11",
        title: "Flagship Events",
        subtitle: "INC-011 // PRIME DIRECTIVES",
        desc: "The signature battlegrounds of PRAGYA 2027. Three premier experiences engineered to challenge intelligence, creativity, and the limits of emerging technology.",
        id: "flagship-events",
        threat: "CAT-5 // PRIORITY",
        tip: "The main event. The ultimate challenge.",
        blurb: "Innovers, Vision Edge and AI Bootcamp.",
        chips: ["INNOVATION", "VISION", "ARTIFICIAL INTELLIGENCE"],
        subs: [
            {
                name: "Innovers",
                tag: "INNOVATION",
                timeOrSpecs: "FLAGSHIP EVENT // DETAILS TO BE ANNOUNCED",
                details: "A premier platform for innovative ideas, technical excellence, and next-generation engineering solutions.",
                actionText: "EXPLORE INNOVERS"
            },
            {
                name: "Vision Edge",
                tag: "VISION",
                timeOrSpecs: "FLAGSHIP EVENT // DETAILS TO BE ANNOUNCED",
                details: "An experience focused on forward-thinking ideas, emerging technologies, and the next frontier of innovation.",
                actionText: "EXPLORE VISION EDGE"
            },
            {
                name: "AI Bootcamp",
                tag: "ARTIFICIAL INTELLIGENCE",
                timeOrSpecs: "LEARN // BUILD // DEPLOY",
                details: "A hands-on learning experience introducing participants to artificial intelligence concepts, tools, and practical applications.",
                actionText: "ENTER AI BOOTCAMP"
            }
        ]
    },
    {
        code: "SEC-12",
        title: "Departmental Events",
        subtitle: "INC-012 // DEPARTMENTAL OPERATIONS",
        desc: "Every department opens its own competitive zone, bringing specialized challenges, technical showcases, and creative engineering experiences to the PRAGYA arena.",
        id: "departmental-events",
        threat: "CAT-4 // MULTI-SECTOR",
        tip: "Ten events. Multiple disciplines. One arena.",
        blurb: "Explore competitions organized by the different departments.",
        chips: ["TECHNICAL", "ENGINEERING", "DEPARTMENTAL"],
        subs: [
            {
                name: "Chemtrek",
                tag: "CHEMICAL",
                timeOrSpecs: "DEPARTMENTAL EVENT // DETAILS TBA",
                details: "Explore chemical engineering challenges, scientific experimentation, and problem-solving.",
                actionText: "EXPLORE CHEMTREK"
            },
            {
                name: "Mechaverse",
                tag: "MECHANICAL",
                timeOrSpecs: "DEPARTMENTAL EVENT // DETAILS TBA",
                details: "Enter a mechanical engineering zone built around design, mechanisms, and engineering challenges.",
                actionText: "EXPLORE MECHAVERSE"
            },
            {
                name: "Pesa",
                tag: "DEPARTMENTAL",
                timeOrSpecs: "DEPARTMENTAL EVENT // DETAILS TBA",
                details: "Discover the competitions and activities organized under Pesa.",
                actionText: "EXPLORE PESA"
            },
            {
                name: "Tessa Texplorer",
                tag: "TEXTILE",
                timeOrSpecs: "DEPARTMENTAL EVENT // DETAILS TBA",
                details: "Discover textile-focused innovation, exploration, and creative technical challenges.",
                actionText: "EXPLORE TESSA"
            },
            {
                name: "Sessa",
                tag: "DEPARTMENTAL",
                timeOrSpecs: "DEPARTMENTAL EVENT // DETAILS TBA",
                details: "Explore Sessa's featured activities, competitions, and departmental experiences.",
                actionText: "EXPLORE SESSA"
            },
            {
                name: "Senfest",
                tag: "DEPARTMENTAL",
                timeOrSpecs: "DEPARTMENTAL EVENT // DETAILS TBA",
                details: "Participate in an engaging mix of departmental activities and competitive experiences.",
                actionText: "EXPLORE SENFEST"
            },
            {
                name: "Essa",
                tag: "DEPARTMENTAL",
                timeOrSpecs: "DEPARTMENTAL EVENT // DETAILS TBA",
                details: "Discover the activities, challenges, and experiences presented by Essa.",
                actionText: "EXPLORE ESSA"
            },
            {
                name: "Extrospark",
                tag: "INNOVATION",
                timeOrSpecs: "DEPARTMENTAL EVENT // DETAILS TBA",
                details: "Spark new ideas through interactive challenges and innovative departmental experiences.",
                actionText: "EXPLORE EXTROSPARK"
            },
            {
                name: "Itza",
                tag: "DEPARTMENTAL",
                timeOrSpecs: "DEPARTMENTAL EVENT // DETAILS TBA",
                details: "Enter Itza's event zone to discover its featured activities and competitions.",
                actionText: "EXPLORE ITZA"
            },
            {
                name: "Hackit",
                tag: "HACKATHON",
                timeOrSpecs: "CODE // CREATE // COMPETE",
                details: "Put your programming, logical reasoning, and rapid prototyping skills to the test in a competitive technical environment.",
                actionText: "ENTER HACKIT"
            }
        ]
    },
    {
        code: "SEC-13",
        title: "Creative Events",
        subtitle: "INC-013 // CREATIVE PROTOCOLS",
        desc: "A creative sector where imagination meets expression. Discover artistic challenges, interactive experiences, and unconventional ideas beyond traditional engineering.",
        id: "creative-events",
        threat: "CAT-3 // CREATIVE",
        tip: "Think differently. Create boldly.",
        blurb: "Math, E-Magic, FAR, Auth 6.0, Pragya Movie Night and more.",
        chips: ["CREATIVITY", "ART", "ENTERTAINMENT"],
        subs: [
            {
                name: "Math",
                tag: "LOGIC",
                timeOrSpecs: "CREATIVE EVENT // DETAILS TBA",
                details: "Challenge your mathematical thinking, logical reasoning, and problem-solving abilities.",
                actionText: "EXPLORE MATH"
            },
            {
                name: "E-Magic",
                tag: "ELECTRONICS",
                timeOrSpecs: "CREATIVE EVENT // DETAILS TBA",
                details: "Discover an engaging experience blending creativity, technology, and interactive challenges.",
                actionText: "EXPLORE E-MAGIC"
            },
            {
                name: "FAR",
                tag: "CREATIVE",
                timeOrSpecs: "CREATIVE EVENT // DETAILS TBA",
                details: "Explore the activities and creative challenges featured under FAR.",
                actionText: "EXPLORE FAR"
            },
            {
                name: "Auth 6.0",
                tag: "INNOVATION",
                timeOrSpecs: "CREATIVE EVENT // DETAILS TBA",
                details: "Discover Auth 6.0, a platform for creative participation and engaging festival experiences.",
                actionText: "EXPLORE AUTH 6.0"
            },
            {
                name: "Pragya Movie Night",
                tag: "ENTERTAINMENT",
                timeOrSpecs: "CAMPUS SCREENING // TIMINGS TBA",
                details: "Take a break from the competition and enjoy a shared movie-night experience with the PRAGYA community.",
                actionText: "VIEW MOVIE NIGHT"
            }
        ]
    },
    {
        code: "SEC-14",
        title: "Startup Expo",
        subtitle: "INC-014 // STARTUP ECOSYSTEM",
        desc: "A showcase of emerging ventures, ambitious founders, innovative products, and student-led businesses connecting ideas with real-world opportunities.",
        id: "startup-expo",
        threat: "CAT-4 // VENTURE",
        tip: "Ideas become ventures here.",
        blurb: "Discover startups, products, founders and emerging innovations.",
        chips: ["STARTUPS", "INNOVATION", "NETWORKING"],
        subs: [
            {
                name: "Startup Showcase",
                tag: "EXHIBITION",
                timeOrSpecs: "STARTUP EXHIBITION // DETAILS TBA",
                details: "Explore startup booths showcasing products, prototypes, business ideas, and emerging technologies.",
                actionText: "EXPLORE STARTUPS"
            },
            {
                name: "Founder Connect",
                tag: "NETWORKING",
                timeOrSpecs: "FOUNDER INTERACTIONS // DETAILS TBA",
                details: "Connect with founders, exchange ideas, and discover the journeys behind emerging ventures.",
                actionText: "MEET THE FOUNDERS"
            },
            {
                name: "Innovation Showcase",
                tag: "PRODUCTS",
                timeOrSpecs: "LIVE DEMONSTRATIONS // DETAILS TBA",
                details: "Experience product demonstrations, prototypes, and innovative solutions designed to solve real-world problems.",
                actionText: "VIEW INNOVATIONS"
            }
        ]
    },
    {
        code: "SEC-15",
        title: "Lightning Pitch",
        subtitle: "INC-015 // RAPID-FIRE VENTURES",
        desc: "A high-energy pitching arena where founders transform bold ideas into compelling opportunities through concise presentations and sharp thinking.",
        id: "lightning-pitch",
        threat: "CAT-4 // HIGH VELOCITY",
        tip: "One idea. One pitch. Make it count.",
        blurb: "Present your idea, impress the panel and stand out.",
        chips: ["PITCHING", "STARTUPS", "INVESTORS"],
        subs: [
            {
                name: "Pitch Arena",
                tag: "PRESENTATION",
                timeOrSpecs: "PITCH FORMAT // DURATION TBA",
                details: "Present your startup concept, explain the problem you solve, and communicate your proposed solution in a concise pitch.",
                actionText: "ENTER PITCH ARENA"
            },
            {
                name: "Jury Evaluation",
                tag: "EVALUATION",
                timeOrSpecs: "JUDGING CRITERIA // DETAILS TBA",
                details: "Ideas are evaluated on clarity, originality, feasibility, market potential, and presentation.",
                actionText: "VIEW EVALUATION"
            },
            {
                name: "Pitch Finale",
                tag: "FINALE",
                timeOrSpecs: "FINAL ROUND // DETAILS TBA",
                details: "Finalists present their ideas and compete for recognition in the Lightning Pitch arena.",
                actionText: "EXPLORE THE FINALE"
            }
        ]
    },
    {
        code: "SEC-16",
        title: "IPL Auction",
        subtitle: "INC-016 // CRICKET WAR ROOM",
        desc: "Enter the ultimate cricket strategy arena. Build your dream squad, evaluate player value, manage your virtual purse, and outsmart competing bidders in the IPL auction experience.",
        id: "ipl-auction",
        threat: "CAT-4 // STRATEGIC",
        tip: "Bid smart. Build your team. Own the auction.",
        blurb: "Strategy, cricket knowledge, bidding wars and team building.",
        chips: ["CRICKET", "AUCTION", "STRATEGY"],
        subs: [
            {
                name: "Team Registration",
                tag: "REGISTRATION",
                timeOrSpecs: "TEAM ENTRY // DETAILS TBA",
                details: "Register to participate in the IPL auction simulation and prepare your strategy before bidding begins.",
                actionText: "REGISTER TEAM"
            },
            {
                name: "Player Auction",
                tag: "LIVE BIDDING",
                timeOrSpecs: "AUCTION FORMAT // DETAILS TBA",
                details: "Compete with other participants to acquire players while managing your available budget and building a balanced squad.",
                actionText: "ENTER AUCTION"
            },
            {
                name: "Squad Evaluation",
                tag: "STRATEGY",
                timeOrSpecs: "TEAM COMPOSITION // RULES TBA",
                details: "Evaluate your final squad based on the competition's rules, budget constraints, and team-building strategy.",
                actionText: "VIEW SQUAD"
            }
        ]
    }
];

// Navigation buttons ONLY — independent of sphere cards
const NAV_ITEMS = [
    { code: "SEC-01", title: "Junior Scientist", badge: "INNOVATION EXPO",      desc: "Robo-Junior • Quantum Sparks • Gliders", cardIdx: 0 },
    { code: "SEC-02", title: "About",            badge: "SYMPOSIUM CODEX",      desc: "40+ Yrs Legacy • SGGSIE&T Nanded",      cardIdx: 1 },
    { code: "SEC-03", title: "Events",           badge: "WARFARE & ARENAS",     desc: "RoboWars • 36h Hack • Drone FPV",       cardIdx: 2 },
    { code: "SEC-04", title: "Team",             badge: "CORE DIRECTORATE",     desc: "Convenors • Tech Leads • Operations",   cardIdx: 3 },
    { code: "SEC-05", title: "Schedule",         badge: "TEMPORAL MATRIX",     desc: "Day 01–03 Keynotes & Final Battles",   cardIdx: 4 },
    { code: "SEC-06", title: "Gallery",          badge: "VISUAL ARCHIVES",      desc: "Arena Action • Stills • Aerial Trails", cardIdx: 5 },
    { code: "SEC-07", title: "eVenture",         badge: "STARTUP CATALYST",     desc: "Pitch Arena • ₹25L Seed • IPL Auction", cardIdx: 6 },
    { code: "SEC-08", title: "FAQ",              badge: "INTEL & GUIDELINES",   desc: "Eligibility • Lodging • Rulebooks",   cardIdx: 7 },
    { code: "SEC-09", title: "Sponsors",         badge: "SYNDICATE ALLIES",     desc: "Title Partners • Hardware • Cloud",     cardIdx: 8 },
    { code: "SEC-10", title: "Guests",           badge: "KEYNOTE DIGNITARIES",  desc: "DRDO Technologists • AI Leaders",    cardIdx: 9 }
];

export function initDoomsdayPortal() {
          const SPHERE_IDX = ITEMS.map((_, i) => i);
    const M = SPHERE_IDX.length;
    const GA = Math.PI * (3 - Math.sqrt(5));
    const cardsData = [];
    SPHERE_IDX.forEach((itemIdx, i) => {
        const y = 1 - (2 * i + 1) / M;
        const rad = Math.sqrt(Math.max(0, 1 - y * y));
        const theta = i * GA;
        const x = Math.cos(theta) * rad;
        const z = Math.sin(theta) * rad;
        const lat = Math.asin(y) * (180 / Math.PI);
        const lon = Math.atan2(x, z) * (180 / Math.PI);
        cardsData.push({
            index: itemIdx,
            item: ITEMS[itemIdx],
            ux: x,
            uy: -y,
            uz: z,
            lat,
            lon,
            dom: null,
            imgDom: null,
            lastOpacity: null,
            lastDim: null,
            lastInteractive: null
        });
    });
    const getCard = (idx) => cardsData.find(c => c.index === idx);
        function getItemImgSrc(item, highRes = false) {
        if (item.img) return item.img;
        if (highRes)
            return `${CDN}${item.id}.png`;
        return `${CDN}${item.id}_min.webp`;
    }
    // DOM Elements
    const stageEl = document.getElementById('stage');
    const worldEl = document.getElementById('world');
    const incursionConeEl = document.getElementById('incursionCone');
    const doomHandEl = document.getElementById('doomHand');
    const doomHandFrontEl = document.getElementById('doomHandFront');
    const dhShadowEl = doomHandEl ? doomHandEl.querySelector('.dh-shadow') : null;
    const dhGlowEl = doomHandEl ? doomHandEl.querySelector('.dh-glow') : null;
    const wristHudEl = document.getElementById('wristHud');
    const orbEl = document.getElementById('orb');
    const headlineEl = document.getElementById('headline');
    const gridRowsEl = document.getElementById('gridRows');
    const headerEl = document.getElementById('mainHeader');
    const gridBtn = document.getElementById('gridBtn');
    const litEl = document.getElementById('lit');
    const litPlateEl = document.getElementById('litPlate');
    const litHeroImg = document.getElementById('litHeroImg');
    const litHeroCode = document.getElementById('litHeroCode');
    const litHeroSub = document.getElementById('litHeroSub');
    const litHeroSubCodename = document.getElementById('litHeroSubCodename');
    const litHeroTitle = document.getElementById('litHeroTitle');
    const litHeroThreat = document.getElementById('litHeroThreat');
    const litMasterDesc = document.getElementById('litMasterDesc');
    const litMasterTag = document.getElementById('litMasterTag');
    const litSubList = document.getElementById('litSubList');
    const litDetailTag = document.getElementById('litDetailTag');
    const litDetailName = document.getElementById('litDetailName');
    const litDetailSpecsText = document.getElementById('litDetailSpecsText');
    const litDetailDossier = document.getElementById('litDetailDossier');
    const litActionBtn = document.getElementById('litActionBtn');
    const litActionBtnText = document.getElementById('litActionBtnText');
    const introEl = document.getElementById('intro');
    const smokeCanvas = document.getElementById('smokeCanvas');
    const tMonths = document.getElementById('tMonths');
    const tDays = document.getElementById('tDays');
    const tHours = document.getElementById('tHours');
    const tMinutes = document.getElementById('tMinutes');
    const tSeconds = document.getElementById('tSeconds');
    const splashEl = document.getElementById('splash');
    const barEl = document.getElementById('bar');
    const dotEl = document.getElementById('dot');
    const dotTrail1 = document.getElementById('dotTrail1');
    const dotTrail2 = document.getElementById('dotTrail2');
    const dotTrail3 = document.getElementById('dotTrail3');
    const emberCanvas = document.getElementById('emberCanvas');
    const litThreatVal = document.getElementById('litThreatVal');
    const litThreatBar = document.getElementById('litThreatBar');
    const litDetailCard = document.getElementById('litDetailCard');
    const dzToast = document.getElementById('dzToast');
    // Anatomy Callouts
    const calloutEl = document.getElementById('callout');
    const calloutLineEl = document.getElementById('calloutLine');
    const calloutLeaderPath = calloutLineEl ? calloutLineEl.querySelector('.callout-leader') : null;
    const calloutAnchorDot = calloutLineEl ? calloutLineEl.querySelector('.callout-anchor') : null;
    const calloutBoxSquare = calloutLineEl ? calloutLineEl.querySelector('.callout-square') : null;
    const calloutHeader = document.getElementById('calloutHeader');
    const calloutTitle = document.getElementById('calloutTitle');
    const calloutTagline = document.getElementById('calloutTagline');
    const calloutBlurb = document.getElementById('calloutBlurb');
    const calloutChips = document.getElementById('calloutChips');
    let activeCalloutCard = null;
    let calloutRafId = null;
    function showCallout(cardData, cardElem) {
        if (!calloutEl || !calloutLineEl)
            return;
        if (document.body.classList.contains('lit') || document.body.classList.contains('gridview') || !document.body.classList.contains('deep') || isDragging)
            return;
        if (window.matchMedia('(hover: none)').matches)
            return;
        const item = cardData.item;
        if (!item)
            return;
        activeCalloutCard = cardElem;
        if (calloutHeader) {
            const incPart = (item.subtitle || '').split('//')[0].trim() || `INC-00${cardData.index + 1}`;
            calloutHeader.textContent = `${item.code} // ${incPart}`;
        }
        if (calloutTitle)
            calloutTitle.textContent = item.title;
        if (calloutTagline)
            calloutTagline.textContent = item.tip || '';
        if (calloutBlurb)
            calloutBlurb.textContent = item.blurb || '';
        if (calloutChips) {
            const chipsList = item.chips && item.chips.length
                ? item.chips
                : (item.subs ? item.subs.slice(0, 3).map(s => s.tag || s.name.slice(0, 8)) : []);
            calloutChips.innerHTML = chipsList.map(c => `<span class="callout-chip">${c}</span>`).join('');
        }
        calloutEl.classList.add('is-active');
        calloutLineEl.classList.add('is-active');
        if (calloutRafId)
            cancelAnimationFrame(calloutRafId);
        updateCalloutPosition();
    }
    function hideCallout() {
        activeCalloutCard = null;
        if (calloutRafId) {
            cancelAnimationFrame(calloutRafId);
            calloutRafId = null;
        }
        if (calloutEl)
            calloutEl.classList.remove('is-active');
        if (calloutLineEl)
            calloutLineEl.classList.remove('is-active');
    }
    function updateCalloutPosition() {
        if (!activeCalloutCard || !calloutEl || !calloutLineEl)
            return;
        if (document.body.classList.contains('lit') || document.body.classList.contains('gridview') || !document.body.classList.contains('deep') || isDragging) {
            hideCallout();
            return;
        }
        const rect = activeCalloutCard.getBoundingClientRect();
        const cardOpacity = parseFloat(window.getComputedStyle(activeCalloutCard).opacity || '1');
        if (rect.width === 0 || rect.height === 0 || cardOpacity < 0.25) {
            calloutEl.classList.remove('is-active');
            calloutLineEl.classList.remove('is-active');
            calloutRafId = requestAnimationFrame(updateCalloutPosition);
            return;
        }
        else {
            calloutEl.classList.add('is-active');
            calloutLineEl.classList.add('is-active');
        }
        const orbRect = orbEl ? orbEl.getBoundingClientRect() : null;
        const sphereCx = orbRect && orbRect.width > 0 ? (orbRect.left + orbRect.width / 2) : (window.innerWidth / 2);
        const sphereCy = orbRect && orbRect.height > 0 ? (orbRect.top + orbRect.height / 2) : (window.innerHeight / 2);
        const cardCx = rect.left + rect.width / 2;
        const cardCy = rect.top + rect.height / 2;
        const dx = cardCx - sphereCx;
        const dy = cardCy - sphereCy;
        const boxW = 240;
        const boxH = calloutEl.offsetHeight || 155;
        const margin = 16;
        const gap = 36;
        let dir = 'right';
        let anchorX = 0;
        let anchorY = 0;
        let boxX = 0;
        let boxY = 0;
        let boxEdgeX = 0;
        let boxEdgeY = 0;
        let elbowX = 0;
        let elbowY = 0;
        const isVertical = Math.abs(dy) > Math.abs(dx) * 1.35;
        if (isVertical) {
            if (dy < 0) {
                dir = 'top';
                anchorX = cardCx;
                anchorY = rect.top;
                boxX = cardCx - boxW / 2;
                boxY = rect.top - gap - boxH;
                if (boxY < margin + 44) {
                    dir = dx >= 0 ? 'right' : 'left';
                }
            }
            else {
                dir = 'bottom';
                anchorX = cardCx;
                anchorY = rect.bottom;
                boxX = cardCx - boxW / 2;
                boxY = rect.bottom + gap;
                if (boxY + boxH > window.innerHeight - margin - 30) {
                    dir = dx >= 0 ? 'right' : 'left';
                }
            }
        }
        if (dir === 'left' || (!isVertical && dx < 0)) {
            dir = 'left';
            anchorX = rect.left;
            anchorY = cardCy;
            boxX = rect.left - gap - boxW;
            boxY = cardCy - boxH / 2;
        }
        else if (dir === 'right' || (!isVertical && dx >= 0)) {
            dir = 'right';
            anchorX = rect.right;
            anchorY = cardCy;
            boxX = rect.right + gap;
            boxY = cardCy - boxH / 2;
        }
        const railLRect = railL ? railL.getBoundingClientRect() : null;
        const railRRect = railR ? railR.getBoundingClientRect() : null;
        if (window.innerWidth > 900 && railLRect && railRRect && railLRect.width > 0 && railRRect.width > 0) {
            const minX = railLRect.right + margin;
            const maxX = railRRect.left - boxW - margin;
            if (maxX > minX) {
                if (dir === 'left' && boxX < minX && rect.right + gap <= maxX) {
                    dir = 'right';
                    anchorX = rect.right;
                    boxX = rect.right + gap;
                }
                else if (dir === 'right' && boxX > maxX && rect.left - gap - boxW >= minX) {
                    dir = 'left';
                    anchorX = rect.left;
                    boxX = rect.left - gap - boxW;
                }
                boxX = Math.max(minX, Math.min(maxX, boxX));
            }
        }
        boxX = Math.max(margin, Math.min(window.innerWidth - boxW - margin, boxX));
        boxY = Math.max(margin + 48, Math.min(window.innerHeight - boxH - margin - 24, boxY));
        calloutEl.classList.remove('dir-left', 'dir-right', 'dir-top', 'dir-bottom');
        calloutEl.classList.add(`dir-${dir}`);
        calloutEl.style.transform = `translate3d(${Math.round(boxX)}px, ${Math.round(boxY)}px, 0)`;
        if (dir === 'left') {
            boxEdgeX = boxX + boxW;
            boxEdgeY = boxY + 28;
            elbowX = Math.max(anchorX - 22, boxEdgeX + 8);
            if (calloutLeaderPath) {
                calloutLeaderPath.setAttribute('d', `M ${anchorX.toFixed(1)} ${anchorY.toFixed(1)} L ${elbowX.toFixed(1)} ${boxEdgeY.toFixed(1)} L ${boxEdgeX.toFixed(1)} ${boxEdgeY.toFixed(1)}`);
            }
            if (calloutBoxSquare) {
                calloutBoxSquare.setAttribute('x', (boxEdgeX - 2).toFixed(1));
                calloutBoxSquare.setAttribute('y', (boxEdgeY - 2).toFixed(1));
            }
        }
        else if (dir === 'right') {
            boxEdgeX = boxX;
            boxEdgeY = boxY + 28;
            elbowX = Math.min(anchorX + 22, boxEdgeX - 8);
            if (calloutLeaderPath) {
                calloutLeaderPath.setAttribute('d', `M ${anchorX.toFixed(1)} ${anchorY.toFixed(1)} L ${elbowX.toFixed(1)} ${boxEdgeY.toFixed(1)} L ${boxEdgeX.toFixed(1)} ${boxEdgeY.toFixed(1)}`);
            }
            if (calloutBoxSquare) {
                calloutBoxSquare.setAttribute('x', (boxEdgeX - 2).toFixed(1));
                calloutBoxSquare.setAttribute('y', (boxEdgeY - 2).toFixed(1));
            }
        }
        else if (dir === 'top') {
            boxEdgeX = boxX + boxW / 2;
            boxEdgeY = boxY + boxH;
            elbowX = boxEdgeX;
            elbowY = Math.max(anchorY - 18, boxEdgeY + 8);
            if (calloutLeaderPath) {
                calloutLeaderPath.setAttribute('d', `M ${anchorX.toFixed(1)} ${anchorY.toFixed(1)} L ${elbowX.toFixed(1)} ${elbowY.toFixed(1)} L ${boxEdgeX.toFixed(1)} ${boxEdgeY.toFixed(1)}`);
            }
            if (calloutBoxSquare) {
                calloutBoxSquare.setAttribute('x', (boxEdgeX - 2).toFixed(1));
                calloutBoxSquare.setAttribute('y', (boxEdgeY - 2).toFixed(1));
            }
        }
        else if (dir === 'bottom') {
            boxEdgeX = boxX + boxW / 2;
            boxEdgeY = boxY;
            elbowX = boxEdgeX;
            elbowY = Math.min(anchorY + 18, boxEdgeY - 8);
            if (calloutLeaderPath) {
                calloutLeaderPath.setAttribute('d', `M ${anchorX.toFixed(1)} ${anchorY.toFixed(1)} L ${elbowX.toFixed(1)} ${elbowY.toFixed(1)} L ${boxEdgeX.toFixed(1)} ${boxEdgeY.toFixed(1)}`);
            }
            if (calloutBoxSquare) {
                calloutBoxSquare.setAttribute('x', (boxEdgeX - 2).toFixed(1));
                calloutBoxSquare.setAttribute('y', (boxEdgeY - 2).toFixed(1));
            }
        }
        if (calloutAnchorDot) {
            calloutAnchorDot.setAttribute('cx', anchorX.toFixed(1));
            calloutAnchorDot.setAttribute('cy', anchorY.toFixed(1));
        }
        calloutRafId = requestAnimationFrame(updateCalloutPosition);
    }
    window.addEventListener('pointerdown', () => {
        hideCallout();
    }, { passive: true });
    // Populate Orb Cards
    cardsData.forEach((c) => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.dataset.idx = String(c.index);
        cardDiv.innerHTML = `
      <figure>
        <img alt="${c.item.title}" />
        <div class="card-overlay">
          <div class="hud-corner top-left"></div>
          <div class="hud-corner top-right"></div>
          <div class="hud-corner bottom-left"></div>
          <div class="hud-corner bottom-right"></div>
          <div class="card-badge">${c.item.code}</div>
          <div class="card-threat"><span class="bar-fill"></span></div>
          <div class="card-info">
            <div class="card-subtitle">${c.item.subtitle}</div>
            <div class="card-title">${c.item.title}</div>
          </div>
          <div class="scanline-sweep"></div>
        </div>
      </figure>
    `;
       c.dom = cardDiv;
c.imgDom = cardDiv.querySelector('img');

if (orbEl) {
    orbEl.appendChild(cardDiv);
}
        cardDiv.addEventListener('pointerenter', (e) => {
            if (e.pointerType === 'touch')
                return;
            showCallout(c, cardDiv);
        });
        cardDiv.addEventListener('pointerleave', (e) => {
            if (e.pointerType === 'touch')
                return;
            hideCallout();
        });
    });
    // Populate Flat Grid with 10 Festival Sections
    // Section buttons: used in grid view and on the side rails
    const HEX_CHARS = "ABCDEF0123456789#$%@/;:=+*";
    const hexNoise = (n) => Array.from({ length: n }, () => HEX_CHARS[Math.floor(Math.random() * HEX_CHARS.length)]).join('');
    
function createSecButton(item, idx) {
    const wrap = document.createElement('div');
    wrap.className = 'sec-wrap';
    wrap.style.setProperty('--o', String(idx));

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'sec';
    btn.dataset.cardIdx = String(idx);

    const txt = hexNoise(110);
    const fullItem = (typeof ITEMS !== 'undefined' && ITEMS[idx]) ? ITEMS[idx] : item;
    const badge = item.badge || (fullItem && fullItem.subtitle ? fullItem.subtitle.split('//')[1]?.trim() : `SEC-0${idx + 1}`);
    const desc = item.desc || (fullItem && fullItem.blurb ? fullItem.blurb : '');
    btn.setAttribute('aria-label', `${item.title} — ${badge}: ${desc}`);

    btn.innerHTML = `
      <span class="sec-in">
        <span class="glyph" aria-hidden="true">${txt}</span>
        <span class="glyph lit" aria-hidden="true">${txt}</span>
        <span class="sec-meta">
          <span class="sec-code"><i></i>${item.code}</span>
          <span class="sec-sub">${badge}</span>
        </span>
        <span class="sec-label">${item.title}</span>
        <span class="sec-desc">${desc}</span>
        <span class="sec-arrow" aria-hidden="true"></span>
        <span class="mask"></span>
      </span>`;

    btn.addEventListener('pointerenter', (e) => {
        if (e.pointerType === 'mouse')
            document.body.classList.add('hover');
    });

    btn.addEventListener('pointerleave', () =>
        document.body.classList.remove('hover')
    );

    btn.addEventListener('pointermove', (e) => {
        const r = btn.getBoundingClientRect();
        btn.style.setProperty('--mx', `${e.clientX - r.left}px`);
        btn.style.setProperty('--my', `${e.clientY - r.top}px`);
    });

    btn.addEventListener('click', () => {
        document.body.classList.remove('hover');
        openLightbox(idx, btn, 'rail');
    });

    wrap.appendChild(btn);
    return wrap;
}

    // Grid view: all 10 in order
    if (gridRowsEl) {
        gridRowsEl.innerHTML = '';

        NAV_ITEMS.forEach((item) => {
            gridRowsEl.appendChild(
                createSecButton(item, item.cardIdx)
            );
        });
    }

    const railL = document.getElementById('railL');
    const railR = document.getElementById('railR');

    const LEFT = [0, 5, 6, 7, 8];
    const RIGHT = [1, 2, 3, 9, 4];

    function buildRailWing(railEl, indices, isRight) {
        if (!railEl) return;
        railEl.innerHTML = '';

        // HUD Panel Header
        const header = document.createElement('div');
        header.className = 'rail-header';
        header.setAttribute('aria-hidden', 'true');
        header.innerHTML = isRight ? `
          <div class="rh-top">
            <span class="rh-status"><i class="rh-led"></i>ONLINE</span>
            <span class="rh-tag">// WING-R //</span>
          </div>
          <div class="rh-title">WARFARE & DIRECTIVES</div>
          <div class="rh-bar"><span class="rh-fill"></span></div>
        ` : `
          <div class="rh-top">
            <span class="rh-tag">// WING-L //</span>
            <span class="rh-status"><i class="rh-led"></i>ACTIVE</span>
          </div>
          <div class="rh-title">TIMELINE PROTOCOLS</div>
          <div class="rh-bar"><span class="rh-fill"></span></div>
        `;
        railEl.appendChild(header);

        // Body container for the 5 buttons
        const body = document.createElement('div');
        body.className = 'rail-body';
        indices.forEach((navIndex, position) => {
            const item = NAV_ITEMS[navIndex];
            if (!item) return;
            const el = createSecButton(item, item.cardIdx);
            el.style.setProperty('--i', String(position));
            body.appendChild(el);
        });
        railEl.appendChild(body);

        // HUD Panel Footer
        const footer = document.createElement('div');
        footer.className = 'rail-footer';
        footer.setAttribute('aria-hidden', 'true');
        footer.innerHTML = isRight ? `
          <div class="rf-metric"><span>ORBIT</span><b>LOCKED</b></div>
          <div class="rf-divider"></div>
          <div class="rf-metric"><span>THREAT</span><b>SECURED</b></div>
        ` : `
          <div class="rf-metric"><span>LATENCY</span><b>0.14ms</b></div>
          <div class="rf-divider"></div>
          <div class="rf-metric"><span>CHRONO</span><b>SYNC 100%</b></div>
        `;
        railEl.appendChild(footer);
    }

    buildRailWing(railL, LEFT, false);
    buildRailWing(railR, RIGHT, true);

    // live hex-noise refresh behind the labels
    const noiseReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    setInterval(() => {
        if (document.hidden || noiseReduce.matches || !document.body.classList.contains('revealed'))
            return;
        document.querySelectorAll('.sec-in').forEach((el) => {
            const t = hexNoise(110);
            el.querySelectorAll('.glyph').forEach((g) => { g.textContent = t; });
        });
    }, 320);
    // Layout Dimensions & Sphere Geometry
    let R = 320;
    let currentPerspective = 1150;
    let lastLayoutW = window.innerWidth;
    let lastLayoutH = window.innerHeight;
    function computeLayoutDimensions() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Give the sphere more room
    const hr = width <= 380 ? 0.36 : (width <= 640 ? 0.43 : 0.48);
    const wr = width <= 380 ? 0.50 : (width <= 640 ? 0.58 : 0.64);
    const floor = width <= 380 ? 155 : (width <= 640 ? 190 : 235);

    R = Math.max(
        floor,
        Math.min(520, height * hr, width * wr)
    );

    // Smaller cards = less overlap
    const scale = width <= 380 ? 0.52
                : width <= 640 ? 0.58
                : 0.64;

    const cw = Math.round(Math.max(76, R * scale));

    currentPerspective = width <= 380 ? 640
                      : width <= 640 ? 780
                      : width <= 900 ? 940
                      : 1150;

    document.documentElement.style.setProperty(
        '--persp',
        `${currentPerspective}px`
    );

    document.documentElement.style.setProperty('--cw', `${cw}px`);

    return { R, cw };
}
    function updateDoomHandAndSphereRig() {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const isMobile = vw < 640;
        const D = isMobile ? Math.min(0.86 * vw, 0.52 * vh) : Math.min(0.50 * vh, 0.85 * vw);
        let imgH = D / (HAND.REST_Y - HAND.EYES_Y - 0.04);
        if (!isMobile && imgH < vh * 1.02) {
            imgH = vh * 1.02;
        }
        let imgW = imgH * HAND.IMG_AR;
        if (!isMobile && imgW < vw) {
            imgW = vw;
            imgH = imgW / HAND.IMG_AR;
        }
        const imgLeft = vw / 2 - HAND.PALM.x * imgW;
        const imgTop = 0.08 * vh - HAND.EYES_Y * imgH;
        const palmY = imgTop + HAND.REST_Y * imgH;
        const palmX = vw / 2;
        // Elevated slightly so the sphere hovers rested on top of the volumetric light cone
        const floatGap = isMobile ? D * 0.10 : D * 0.16;
        const sphereCenterY = palmY - D / 2 - floatGap;
        const D0 = Math.max(1, 2 * R);
        const sphereScale = D / D0;
        const offsetY = sphereCenterY - (vh / 2);
        if (worldEl) {
            worldEl.style.setProperty('--world-x', '0px');
            worldEl.style.setProperty('--world-y', `${offsetY.toFixed(2)}px`);
            worldEl.style.setProperty('--world-scale', `${sphereScale.toFixed(4)}`);
            worldEl.style.setProperty('--cone-h', `${(palmY - sphereCenterY).toFixed(2)}px`);
        }
        if (incursionConeEl) {
            const coneTop = sphereCenterY + D * 0.16;
            const coneHeight = Math.max(50, palmY - coneTop);
            const coneWidth = D * 0.90;
            const coneLeft = palmX - coneWidth / 2;

            incursionConeEl.style.setProperty('--cone-x', `${coneLeft.toFixed(2)}px`);
            incursionConeEl.style.setProperty('--cone-y', `${coneTop.toFixed(2)}px`);
            incursionConeEl.style.setProperty('--cone-w', `${coneWidth.toFixed(2)}px`);
            incursionConeEl.style.setProperty('--cone-h', `${coneHeight.toFixed(2)}px`);
            incursionConeEl.style.setProperty('--cone-palm-y', `${palmY.toFixed(2)}px`);
            incursionConeEl.style.setProperty('--cone-top-y', `${coneTop.toFixed(2)}px`);

            incursionConeEl.style.left = `${coneLeft.toFixed(2)}px`;
            incursionConeEl.style.top = `${coneTop.toFixed(2)}px`;
            incursionConeEl.style.width = `${coneWidth.toFixed(2)}px`;
            incursionConeEl.style.height = `${coneHeight.toFixed(2)}px`;
        }
        if (doomHandEl) {
            doomHandEl.style.width = `${imgW.toFixed(2)}px`;
            doomHandEl.style.height = `${imgH.toFixed(2)}px`;
            doomHandEl.style.left = `${imgLeft.toFixed(2)}px`;
            doomHandEl.style.top = `${imgTop.toFixed(2)}px`;
        }
        if (doomHandFrontEl) {
            doomHandFrontEl.style.width = `${imgW.toFixed(2)}px`;
            doomHandFrontEl.style.height = `${imgH.toFixed(2)}px`;
            doomHandFrontEl.style.left = `${imgLeft.toFixed(2)}px`;
            doomHandFrontEl.style.top = `${imgTop.toFixed(2)}px`;
        }
        if (dhShadowEl) {
            const shadowW = 0.72 * D;
            const shadowH = 0.14 * D;
            const shadowX = HAND.PALM.x * imgW;
            const shadowY = HAND.REST_Y * imgH + 0.01 * imgH;
            dhShadowEl.style.width = `${shadowW.toFixed(2)}px`;
            dhShadowEl.style.height = `${shadowH.toFixed(2)}px`;
            dhShadowEl.style.left = `${shadowX.toFixed(2)}px`;
            dhShadowEl.style.top = `${shadowY.toFixed(2)}px`;
        }
        if (dhGlowEl) {
            const glowW = 0.85 * D;
            const glowH = 0.35 * D;
            const glowX = HAND.PALM.x * imgW;
            const glowY = HAND.REST_Y * imgH;
            dhGlowEl.style.width = `${glowW.toFixed(2)}px`;
            dhGlowEl.style.height = `${glowH.toFixed(2)}px`;
            dhGlowEl.style.left = `${glowX.toFixed(2)}px`;
            dhGlowEl.style.top = `${glowY.toFixed(2)}px`;
        }
        if (wristHudEl) {
            const whW = Math.max(240, Math.min(WRIST.w * imgW, isMobile ? vw * 0.86 : 340));
            wristHudEl.style.setProperty('--wh-w', `${whW.toFixed(1)}px`);
            wristHudEl.style.setProperty('--wh-x', `${(imgLeft + WRIST.x * imgW).toFixed(1)}px`);
            wristHudEl.style.setProperty('--wh-y', `${Math.min(imgTop + WRIST.y * imgH, vh - 140).toFixed(1)}px`);
            wristHudEl.style.setProperty('--wh-rot', `${WRIST.rot}deg`);
        }
    }

    let hasEmergenceTriggered = false;
    function triggerSphereEmergence(force = false) {
        if (hasEmergenceTriggered && !force) return;
        hasEmergenceTriggered = true;

        if (incursionConeEl) {
            incursionConeEl.classList.remove('cone-active');
            incursionConeEl.classList.remove('cone-emerging');
            void incursionConeEl.offsetWidth;
            incursionConeEl.classList.add('cone-emerging');
        }
        if (worldEl) {
            worldEl.classList.remove('sphere-resting');
            worldEl.classList.remove('sphere-emerging');
            void worldEl.offsetWidth;
            worldEl.classList.add('sphere-emerging');
        }

        setTimeout(() => {
            if (incursionConeEl) {
                incursionConeEl.classList.remove('cone-emerging');
                incursionConeEl.classList.add('cone-active');
            }
            if (worldEl) {
                worldEl.classList.remove('sphere-emerging');
                worldEl.classList.add('sphere-resting');
            }
        }, 2400);
    }
    window.__replayEmergence = () => triggerSphereEmergence(true);

    function layoutSphere() {
        computeLayoutDimensions();
        cardsData.forEach(c => {
            if (c.dom) {
                c.dom.style.transform = `translate3d(${(c.ux * R).toFixed(2)}px, ${(c.uy * R).toFixed(2)}px, ${(c.uz * R).toFixed(2)}px) rotateY(${c.lon.toFixed(2)}deg) rotateX(${c.lat.toFixed(2)}deg)`;
            }
        });
        updateDoomHandAndSphereRig();
    }
    let rigDebounceTimer = null;
    function handleResize(force = false) {
        const w = window.innerWidth;
        const h = window.innerHeight;
        if (!force && Math.abs(w - lastLayoutW) < 20 && Math.abs(h - lastLayoutH) < 20) {
            return;
        }
        lastLayoutW = w;
        lastLayoutH = h;
        clearTimeout(rigDebounceTimer);
        rigDebounceTimer = setTimeout(() => {
            layoutSphere();
        }, 100);
    }
    let resizingTimer = null;
    window.addEventListener('resize', () => {
        document.body.classList.add('resizing');
        clearTimeout(resizingTimer);
        resizingTimer = setTimeout(() => document.body.classList.remove('resizing'), 250);
        handleResize(false);
    });
    window.addEventListener('orientationchange', () => {
        setTimeout(() => handleResize(true), 120);
    });
    // Shared parallax pointer listener
    let parallaxTicking = false;
    let targetPx = 0;
    let targetPy = 0;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!prefersReduced.matches) {
        window.addEventListener('pointermove', (e) => {
            if (document.body.classList.contains('lit') || document.body.classList.contains('gridview'))
                return;
            const vw = window.innerWidth;
            const vh = window.innerHeight;
            targetPx = Math.max(-8, Math.min(8, ((e.clientX / vw) - 0.5) * 16));
            targetPy = Math.max(-8, Math.min(8, ((e.clientY / vh) - 0.5) * 16));
            if (!parallaxTicking) {
                parallaxTicking = true;
                requestAnimationFrame(() => {
                    if (stageEl) {
                        stageEl.style.setProperty('--px', `${targetPx.toFixed(2)}px`);
                        stageEl.style.setProperty('--py', `${targetPy.toFixed(2)}px`);
                    }
                    parallaxTicking = false;
                });
            }
        }, { passive: true });
    }
    // Graceful fallback if hand image is not present
    document.querySelectorAll('.dh-art').forEach((imgEl) => {
        imgEl.addEventListener('error', () => {
            if (worldEl) {
                worldEl.style.removeProperty('--world-x');
                worldEl.style.removeProperty('--world-y');
                worldEl.style.removeProperty('--world-scale');
            }
            if (doomHandEl)
                doomHandEl.style.display = 'none';
            if (doomHandFrontEl)
                doomHandFrontEl.style.display = 'none';
        });
    });
    // Camera Render Loop
    const spin = 0;
    const tilt = -4;
    const camZ = 0;
    let dragX = 0;
    let dragY = 0;
    let velX = 0;
    let velY = 0;
    const pitchLimit = 32;
    let focusedIndex = -1;
    let isDragging = false;
    let lastStage3 = false;
    // Small screens use a stepped stage model (not native scroll):
    // 0 = PRAGYA hero, 1 = Doom hand + sphere, 2 = section buttons.
    // The green hero (stage 0) is shown only once: after the visitor scrolls
    // past it, it doesn't come back for the rest of the browser session.
    let heroDone = false;
    try { heroDone = sessionStorage.getItem('pragya_hero_done') === '1'; } catch (e) { /* storage unavailable */ }
    function markHeroDone() {
        if (heroDone) return;
        heroDone = true;
        try { sessionStorage.setItem('pragya_hero_done', '1'); } catch (e) { /* storage unavailable */ }
    }
    function minStage() {
        return heroDone ? 1 : 0;
    }
    let stageIdx = heroDone ? 1 : 0;
    let stageP = heroDone ? 1 : 0;
    let stageLockUntil = 0;
    let stageLastDir = 0;
    function maxStage() {
        return isCompactNav() ? 2 : 1;
    }
    function goStage(n) {
        stageIdx = Math.max(minStage(), Math.min(maxStage(), n));
        if (stageIdx >= 1)
            markHeroDone();
        stageLockUntil = performance.now() + 450;
    }
    function stepStage(dir) {
        const now = performance.now();
        if (now < stageLockUntil) {
            if (dir === stageLastDir)
                stageLockUntil = Math.max(stageLockUntil, now + 120);
            return;
        }
        stageLastDir = dir;
        const n = Math.max(minStage(), Math.min(maxStage(), stageIdx + dir));
        if (n !== stageIdx)
            goStage(n);
    }
    function stageGesturesActive() {
        const b = document.body;
        return b.classList.contains('revealed') && !b.classList.contains('locked')
            && !b.classList.contains('lit') && !b.classList.contains('gridview') && !b.classList.contains('navopen');
    }
    {
        let gY = null;
        let gX = null;
        let gDone = false;
        let wheelAcc = 0;
        let wheelAt = 0;
        window.addEventListener('touchstart', (e) => {
            if (!stageGesturesActive() || e.touches.length !== 1) {
                gY = null;
                return;
            }
            gY = e.touches[0].clientY;
            gX = e.touches[0].clientX;
            gDone = false;
        }, { passive: true });
        window.addEventListener('touchmove', (e) => {
            if (gY === null || gDone)
                return;
            const dy = e.touches[0].clientY - gY;
            const dx = e.touches[0].clientX - gX;
            if (Math.abs(dy) > 38 && Math.abs(dy) > Math.abs(dx) * 1.2) {
                gDone = true;
                stepStage(dy < 0 ? 1 : -1);
                if (e.cancelable)
                    e.preventDefault();
            }
        }, { passive: false });
        window.addEventListener('touchend', () => { gY = null; }, { passive: true });
        window.addEventListener('wheel', (e) => {
            if (!stageGesturesActive() || !e.deltaY)
                return;
            if (e.cancelable)
                e.preventDefault();
            const now = performance.now();
            const dy = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
            if (now - wheelAt > 220 || Math.sign(dy) !== Math.sign(wheelAcc))
                wheelAcc = 0;
            wheelAt = now;
            wheelAcc += dy;
            if (Math.abs(wheelAcc) >= 20) {
                stepStage(wheelAcc > 0 ? 1 : -1);
                wheelAcc = 0;
            }
        }, { passive: false });
        window.addEventListener('keydown', (e) => {
            if (!stageGesturesActive())
                return;
            if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
                stepStage(1);
                e.preventDefault();
            }
            else if (['ArrowUp', 'PageUp'].includes(e.key)) {
                stepStage(-1);
                e.preventDefault();
            }
        });
    }
    function isCompactNav() {
        return window.matchMedia('(max-width: 900px)').matches;
    }
    function renderFrame() {
        const isLit = document.body.classList.contains('lit');
        if (!isDragging && !isLit) {
            dragX += velX;
            dragY += velY;
            velX *= 0.94;
            velY *= 0.94;
            if (Math.abs(velX) < 0.002)
                velX = 0;
            if (Math.abs(velY) < 0.002)
                velY = 0;
            if (tilt + dragY > pitchLimit) {
                dragY = pitchLimit - tilt;
                velY = 0;
            }
            else if (tilt + dragY < -pitchLimit) {
                dragY = -pitchLimit - tilt;
                velY = 0;
            }
        }
        // Desktop: 0 = hero, 1 = sphere + rails (native scroll).
        // Phones/tablets (<= 900px): stepped stages, see stageIdx above.
        const compactNav = isCompactNav();
        if (stageIdx > maxStage())
            stageIdx = maxStage();
        if (window.scrollY !== 0)
            window.scrollTo(0, 0);
        stageP += ((stageIdx >= 1 ? 1 : 0) - stageP) * 0.18;
        if (Math.abs(stageP - (stageIdx >= 1 ? 1 : 0)) < 0.002)
            stageP = stageIdx >= 1 ? 1 : 0;
        const p = stageP;
        const isDeep = stageIdx >= 1;
        const wasDeep = document.body.classList.contains('deep');
        document.body.classList.toggle('deep', isDeep);
        if (isDeep && !wasDeep) {
            triggerSphereEmergence();
        }
        if (compactNav) {
            const s3 = stageIdx === 2;
            if (s3 !== lastStage3) {
                lastStage3 = s3;
                setNavOpen(s3, true);
            }
        }
        else {
            lastStage3 = false;
        }
        const sx = tilt + dragY;
        const sy = spin + dragX;
        if (worldEl)
            worldEl.style.transform = `translateZ(${camZ.toFixed(2)}px) rotateY(${sy.toFixed(3)}deg) rotateX(${sx.toFixed(3)}deg)`;
        if (headlineEl) {
            headlineEl.style.transform = `rotateX(${-sx.toFixed(3)}deg) rotateY(${-sy.toFixed(3)}deg) translateZ(${(R * 0.62).toFixed(2)}px)`;
            headlineEl.style.opacity = Math.max(0, 1 - p * 0.55).toFixed(3);
        }
        const radX = sx * (Math.PI / 180);
        const radY = sy * (Math.PI / 180);
        const cosX = Math.cos(radX);
        const sinX = Math.sin(radX);
        const cosY = Math.cos(radY);
        const sinY = Math.sin(radY);
        const shade = 1 - Math.min(1, p * 1.6);
        const near = currentPerspective * 0.66;
             for (let i = 0; i < cardsData.length; i++) {
            const c = cardsData[i];
            if (!c.dom)
                continue;
            const y1 = c.uy * cosX - c.uz * sinX;
            const z1 = c.uy * sinX + c.uz * cosX;
            const z2 = -c.ux * sinY + z1 * cosY;
            const zf = z2;
            const base = 0.14 + 0.86 * Math.pow(Math.max(0, (zf + 1) / 2), 0.85);
            let dim = shade * (1 - base);
            const absZ = zf * R + camZ;
            let fade = 1;
            if (absZ > near) {
                fade = Math.max(0, 1 - (absZ - near) / 190);
            }
            if (focusedIndex >= 0) {
                dim = Math.min(1, dim + 0.78);
                 if (c.index === focusedIndex) {
                    fade = 0;
                }
            }
            const dimStr = dim.toFixed(3);
            if (c.lastDim !== dimStr) {
                c.dom.style.setProperty('--d', dimStr);
                c.lastDim = dimStr;
            }
            const fadeStr = fade.toFixed(3);
            if (c.lastOpacity !== fadeStr) {
                c.dom.style.opacity = fadeStr;
                c.lastOpacity = fadeStr;
            }
            const interactive = zf > 0 && fade >= 0.25;
            if (c.lastInteractive !== interactive) {
                c.dom.style.pointerEvents = interactive ? 'auto' : 'none';
                c.lastInteractive = interactive;
            }
        }
        requestAnimationFrame(renderFrame);
    }
    layoutSphere();
    renderFrame();
    // Pointer Dragging for Multiverse Sphere
    let pointerStartX = 0;
    let pointerStartY = 0;
    let lastPointerX = 0;
    let lastPointerY = 0;
    let pointerDownCard = null;
    let pointerCaptured = false;
    let touchDecided = false;
    let touchCancelled = false;
    let activePointerId = null;
    if (stageEl) {
        stageEl.addEventListener('pointerdown', (e) => {
            if (document.body.classList.contains('lit') || document.body.classList.contains('gridview'))
                return;
            if (e.target.closest('.sec, .rails-m'))
                return;
            const card = e.target.closest('.card');
            pointerDownCard = card;
            pointerStartX = e.clientX;
            pointerStartY = e.clientY;
            lastPointerX = e.clientX;
            lastPointerY = e.clientY;
            activePointerId = e.pointerId;
            velX = 0;
            velY = 0;
            if (e.pointerType === 'mouse' || e.pointerType === 'pen') {
                isDragging = true;
                pointerCaptured = true;
                try {
                    stageEl.setPointerCapture(e.pointerId);
                }
                catch (err) { }
            }
            else {
                isDragging = false;
                pointerCaptured = false;
                touchDecided = false;
                touchCancelled = false;
            }
        });
        stageEl.addEventListener('pointermove', (e) => {
            if (e.pointerId !== activePointerId)
                return;
            const dx = e.clientX - lastPointerX;
            const dy = e.clientY - lastPointerY;
            const totalDx = e.clientX - pointerStartX;
            const totalDy = e.clientY - pointerStartY;
            const dist = Math.hypot(totalDx, totalDy);
            if (e.pointerType === 'touch') {
                if (touchCancelled)
                    return;
                if (!touchDecided) {
                    if (dist >= 10) {
                        touchDecided = true;
                        if (Math.abs(totalDy) > Math.abs(totalDx) * 1.15) {
                            touchCancelled = true;
                            isDragging = false;
                            return;
                        }
                        else {
                            isDragging = true;
                            pointerCaptured = true;
                            try {
                                stageEl.setPointerCapture(e.pointerId);
                            }
                            catch (err) { }
                        }
                    }
                    else {
                        return;
                    }
                }
            }
            if (isDragging) {
                const yawDelta = dx * 0.13;
                const pitchDelta = dy * 0.13;
                dragX += yawDelta;
                dragY += pitchDelta;
                if (tilt + dragY > pitchLimit) {
                    dragY = pitchLimit - tilt;
                }
                else if (tilt + dragY < -pitchLimit) {
                    dragY = -pitchLimit - tilt;
                }
                velX = yawDelta;
                velY = pitchDelta;
                lastPointerX = e.clientX;
                lastPointerY = e.clientY;
            }
        });
        const handlePointerUpOrCancel = (e) => {
            if (e.pointerId !== activePointerId)
                return;
            const totalDx = e.clientX - pointerStartX;
            const totalDy = e.clientY - pointerStartY;
            const dist = Math.hypot(totalDx, totalDy);
            const isCoarse = window.matchMedia('(pointer: coarse)').matches || e.pointerType === 'touch';
            const clickSlop = isCoarse ? 14 : 6;
            if (pointerCaptured) {
                try {
                    stageEl.releasePointerCapture(e.pointerId);
                }
                catch (err) { }
            }
            if (e.type === 'pointerup' && dist < clickSlop && pointerDownCard) {
                const idx = parseInt(pointerDownCard.dataset.idx || '', 10);
                if (!isNaN(idx)) {
                    openLightbox(idx, pointerDownCard);
                }
            }
            isDragging = false;
            pointerCaptured = false;
            touchDecided = false;
            touchCancelled = false;
            pointerDownCard = null;
            activePointerId = null;
        };
        stageEl.addEventListener('pointerup', handlePointerUpOrCancel);
        stageEl.addEventListener('pointercancel', handlePointerUpOrCancel);
    }
    // Lightbox & FLIP Transition
    let currentOpenToken = 0;
    let sourceCardElement = null;
    let plateTimer = null;
    const decodedBlobUrls = {};
    let threatAnimId = null;
    function animateThreatBar(targetPercent) {
        if (threatAnimId)
            cancelAnimationFrame(threatAnimId);
        if (litThreatBar) {
            litThreatBar.classList.remove('is-low', 'is-med');
            if (targetPercent <= 40) {
                litThreatBar.classList.add('is-low');
                if (litThreatVal)
                    litThreatVal.className = 'dz-threat-val low';
            }
            else if (targetPercent <= 70) {
                litThreatBar.classList.add('is-med');
                if (litThreatVal)
                    litThreatVal.className = 'dz-threat-val med';
            }
            else {
                if (litThreatVal)
                    litThreatVal.className = 'dz-threat-val high';
            }
        }
        const startPercent = 0;
        const startTime = performance.now();
        const duration = 420;
        function step(now) {
            const progress = Math.min(1, (now - startTime) / duration);
            const ease = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.round(startPercent + (targetPercent - startPercent) * ease);
            if (litThreatVal)
                litThreatVal.textContent = currentVal + '%';
            if (litThreatBar)
                litThreatBar.style.height = (targetPercent * ease).toFixed(1) + '%';
            if (progress < 1) {
                threatAnimId = requestAnimationFrame(step);
            }
        }
        threatAnimId = requestAnimationFrame(step);
    }
    function selectSubItem(cardIdx, subIdx) {
        const item = ITEMS[cardIdx];
        if (!item || !item.subs || !item.subs[subIdx])
            return;
        const sub = item.subs[subIdx];
        document.querySelectorAll('#litSubList .lit-sub-btn').forEach((btn, idx) => {
            btn.classList.toggle('active', idx === subIdx);
        });
        if (litDetailTag)
            litDetailTag.textContent = sub.tag || 'ACTIVE';
        if (litDetailName)
            litDetailName.textContent = sub.name;
        if (litDetailSpecsText)
            litDetailSpecsText.textContent = sub.timeOrSpecs;
        if (litDetailCard) {
            litDetailCard.classList.remove('scanning');
            void litDetailCard.offsetWidth;
            litDetailCard.classList.add('scanning');
        }
        const targetThreat = 28 + ((cardIdx * 17 + subIdx * 23) % 68);
        animateThreatBar(targetThreat);
        if (litActionBtnText)
            litActionBtnText.textContent = sub.actionText || 'REGISTER / DEPLOY';
        // Registrable events: point the button at the real registration page.
        applyRegistrationTarget(sub.name);
    }
    if (litActionBtn) {
        litActionBtn.addEventListener('click', (e) => {
            // Registrable event: open the real registration page in a new tab (no fake success).
            if (handleRegisterClick(litActionBtn)) {
                e.stopPropagation();
                return;
            }
            if (dzToast) {
                dzToast.classList.add('show');
                setTimeout(() => dzToast.classList.remove('show'), 2400);
            }
            const prev = litActionBtnText ? litActionBtnText.textContent : '';
            if (litActionBtnText)
                litActionBtnText.textContent = 'ACCESS GRANTED // TRANSMISSION SENT';
            litActionBtn.style.background = 'var(--white)';
            litActionBtn.style.color = 'var(--black)';
            litActionBtn.style.borderColor = 'var(--emerald)';
            setTimeout(() => {
                if (litActionBtnText)
                    litActionBtnText.textContent = prev;
                litActionBtn.style.background = '';
                litActionBtn.style.color = '';
                litActionBtn.style.borderColor = '';
            }, 2000);
        });
    }
    function openLightbox(idx, sourceElem , from, opts = {}) {
        hideCallout();
        const item = ITEMS[idx];
        if (!item)
            return;
        // Sections that have their own page instead of the popup
        const OWN_PAGE = { 'Team': '/team.html', 'Junior Scientist': '/junior-scientist.html' };
        if (OWN_PAGE[item.title]) {
            window.location.href = OWN_PAGE[item.title];
            return;
        }
        // "Events" opens a small dropdown: Department Level / Institute Level
        if (item.title === 'Events' && !opts.level) {
            toggleEventLevels(sourceElem || getCard(idx)?.dom || null);
            return;
        }
        // dossier.js reads this to show the chosen level's events as tabs
        if (opts.level)
            document.body.dataset.litLevel = opts.level;
        else
            delete document.body.dataset.litLevel;
                focusedIndex = from === 'rail' ? -1 : idx;
                sourceCardElement = sourceElem || getCard(idx)?.dom || null;
        clearTimeout(plateTimer);
        const token = ++currentOpenToken;
        if (litHeroCode)
            litHeroCode.textContent = item.code;
        if (litHeroSub)
            litHeroSub.textContent = item.subtitle;
        if (litHeroSubCodename)
            litHeroSubCodename.textContent = (item.subtitle || '').split('// ')[1] || 'VECTOR';
        if (litHeroTitle)
            litHeroTitle.textContent = item.title;
        if (litHeroThreat)
            litHeroThreat.textContent = `INCURSION // ${item.threat || 'CONFIRMED'}`;
        if (litMasterDesc)
            litMasterDesc.textContent = item.desc;
        if (litMasterTag)
            litMasterTag.textContent = item.threat || 'CLASSIFIED';
        if (litSubList) {
            litSubList.innerHTML = '';
            if (item.subs && item.subs.length) {
                item.subs.forEach((sub, subIdx) => {
                    const btn = document.createElement('button');
                    btn.className = `lit-sub-btn${subIdx === 0 ? ' active' : ''}`;
                    btn.innerHTML = `
            <span class="sub-btn-idx">0${subIdx + 1}</span>
            <span class="sub-btn-info">
              <span class="sub-btn-name">${sub.name}</span>
              <span class="sub-btn-tag">${sub.tag}</span>
            </span>
            <span class="sub-btn-arrow">&rarr;</span>
          `;
                    btn.addEventListener('click', () => {
                        selectSubItem(idx, subIdx);
                    });
                    litSubList.appendChild(btn);
                });
                selectSubItem(idx, 0);
            }
        }
        const decodedSrc = decodedBlobUrls[idx] || getItemImgSrc(item);
        if (litHeroImg)
            litHeroImg.src = decodedSrc;
        const fullPngUrl = getItemImgSrc(item, true);
        const highResImg = new Image();
        highResImg.onload = () => {
            if (currentOpenToken === token && litHeroImg) {
                litHeroImg.src = fullPngUrl;
            }
        };
        highResImg.src = fullPngUrl;
        document.body.dataset.litIdx = String(idx);
        document.body.classList.add('lit');
        document.documentElement.style.overflow = 'hidden';
        const cardRect = sourceCardElement ? sourceCardElement.getBoundingClientRect() : null;
        if (litPlateEl) {
            litPlateEl.classList.add('flipping');
            litPlateEl.style.transition = 'none';
            litPlateEl.style.transform = 'none';
            const plateRect = litPlateEl.getBoundingClientRect();
            if (cardRect && plateRect.width > 0) {
                const cardCenterX = cardRect.left + cardRect.width / 2;
                const cardCenterY = cardRect.top + cardRect.height / 2;
                const plateCenterX = plateRect.left + plateRect.width / 2;
                const plateCenterY = plateRect.top + plateRect.height / 2;
                const dx = cardCenterX - plateCenterX;
                const dy = cardCenterY - plateCenterY;
                const scale = Math.max(0.04, cardRect.width / plateRect.width);
                litPlateEl.style.transform = `translate(${dx.toFixed(2)}px, ${dy.toFixed(2)}px) scale(${scale.toFixed(4)})`;
                litPlateEl.style.opacity = '0';
                void litPlateEl.offsetWidth;
                litPlateEl.style.transition = '';
                litPlateEl.style.transform = '';
                litPlateEl.style.opacity = '';
                clearTimeout(plateTimer);
                plateTimer = setTimeout(() => {
                    litPlateEl.classList.remove('flipping');
                }, 360);
            }
            else {
                litPlateEl.classList.remove('flipping');
            }
        }
    }
    // ----- Events: Department Level / Institute Level dropdown -----
    // A small panel that pops out next to the Events button (like a dropdown
    // menu). Not a separate page or popup.
    let evFlyout = null;
    let evAnchor = null;
    function buildEventFlyout() {
        const el = document.createElement('div');
        el.id = 'evFlyout';
        el.className = 'ev-flyout';
        el.setAttribute('role', 'menu');
        el.setAttribute('aria-label', 'Event levels');
        el.innerHTML = EVENT_LEVEL_ORDER.map((key) => `
          <button type="button" class="ev-flyout-item" role="menuitem" data-level="${key}">
            <span>${EVENT_LEVELS[key].label}</span>
            <small>${EVENT_LEVELS[key].hint}</small>
          </button>`).join('');
        el.addEventListener('click', (e) => {
            const btn = e.target.closest('.ev-flyout-item');
            if (!btn)
                return;
            const level = btn.dataset.level;
            closeEventFlyout(false);
            openEventLevel(level, evAnchor);
        });
        document.body.appendChild(el);
        // Close on outside click, scroll or resize
        document.addEventListener('pointerdown', (e) => {
            if (!document.body.classList.contains('evlevels'))
                return;
            if (el.contains(e.target) || (evAnchor && evAnchor.contains(e.target)))
                return;
            closeEventFlyout(false);
        }, true);
        window.addEventListener('resize', () => closeEventFlyout(false));
        document.addEventListener('scroll', () => closeEventFlyout(false), true);
        return el;
    }
    function placeEventFlyout(anchor) {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const pad = 12;
        const r = anchor && anchor.getBoundingClientRect ? anchor.getBoundingClientRect() : null;
        const fw = evFlyout.offsetWidth;
        const fh = evFlyout.offsetHeight;
        let left;
        let top;
        if (!r || !r.width) {
            left = (vw - fw) / 2;
            top = (vh - fh) / 2;
        }
        else if (isCompactNav()) {
            // Phone menu: drop down right under the Events button
            left = r.left + 24;
            top = r.bottom + 8;
            if (top + fh > vh - pad)
                top = r.top - fh - 8;
        }
        else {
            // Desktop: open on the side facing the middle of the screen
            left = (r.left + r.width / 2 > vw / 2) ? r.left - fw - 14 : r.right + 14;
            top = r.top;
        }
        left = Math.max(pad, Math.min(left, vw - fw - pad));
        top = Math.max(pad, Math.min(top, vh - fh - pad));
        evFlyout.style.left = `${Math.round(left)}px`;
        evFlyout.style.top = `${Math.round(top)}px`;
    }
    function openEventFlyout(anchor) {
        if (!evFlyout)
            evFlyout = buildEventFlyout();
        evAnchor = anchor || null;
        if (evAnchor && evAnchor.setAttribute)
            evAnchor.setAttribute('aria-expanded', 'true');
        document.body.classList.add('evlevels');
        placeEventFlyout(evAnchor);
        requestAnimationFrame(() => evFlyout.querySelector('.ev-flyout-item')?.focus({ preventScroll: true }));
    }
    function closeEventFlyout(restoreFocus = true) {
        if (!document.body.classList.contains('evlevels'))
            return;
        document.body.classList.remove('evlevels');
        if (evAnchor && evAnchor.setAttribute)
            evAnchor.setAttribute('aria-expanded', 'false');
        if (restoreFocus && evAnchor && evAnchor.focus)
            evAnchor.focus({ preventScroll: true });
    }
    function toggleEventLevels(anchor) {
        if (document.body.classList.contains('evlevels') && evAnchor === anchor)
            closeEventFlyout(false);
        else
            openEventFlyout(anchor);
    }
    function openEventLevel(level, sourceElem) {
        const cfg = EVENT_LEVELS[level];
        if (!cfg)
            return;
        // Open the popup on the level's first section; dossier.js fills in all its events
        const idx = ITEMS.findIndex((it) => it.title === cfg.sections[0]);
        if (document.body.classList.contains('navopen'))
            setNavOpen(false);
        if (idx >= 0)
            openLightbox(idx, sourceElem || null, 'rail', { level });
    }

    function closeLightbox() {
        if (!document.body.classList.contains('lit'))
            return;
        delete document.body.dataset.litLevel;
        if (threatAnimId) {
            cancelAnimationFrame(threatAnimId);
            threatAnimId = null;
        }
        focusedIndex = -1;
        document.body.classList.remove('lit');
        document.documentElement.style.overflow = '';
        if (sourceCardElement && litPlateEl) {
            const cardRect = sourceCardElement.getBoundingClientRect();
            const plateRect = litPlateEl.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            const plateCenterX = plateRect.left + plateRect.width / 2;
            const plateCenterY = plateRect.top + plateRect.height / 2;
            const dx = cardCenterX - plateCenterX;
            const dy = cardCenterY - plateCenterY;
            const scale = Math.max(0.04, cardRect.width / plateRect.width);
            litPlateEl.style.transform = `translate(${dx.toFixed(2)}px, ${dy.toFixed(2)}px) scale(${scale.toFixed(4)})`;
            litPlateEl.style.opacity = '0';
            clearTimeout(plateTimer);
            plateTimer = setTimeout(() => {
                litPlateEl.style.transition = 'none';
                litPlateEl.style.transform = '';
                litPlateEl.style.opacity = '';
                void litPlateEl.offsetWidth;
                litPlateEl.style.transition = '';
            }, 580);
        }
        else if (litPlateEl) {
            litPlateEl.style.transform = '';
            litPlateEl.style.opacity = '';
        }
        sourceCardElement = null;
    }
    document.querySelectorAll('[data-close]').forEach(el => {
        el.addEventListener('click', closeLightbox);
    });
    const heroScrollBtn = document.getElementById('heroScroll');
    if (heroScrollBtn) {
        heroScrollBtn.addEventListener('click', () => {
            goStage(1);
        });
    }
    if (gridBtn) {
        gridBtn.addEventListener('click', () => {
            hideCallout();
            document.body.classList.toggle('gridview');
        });
    }
    const navBtn = document.getElementById('navBtn');
    const railsM = document.querySelector('.rails-m');
    function setNavOpen(open, fromScroll = false) {
        document.body.classList.toggle('navopen', open);
        // Closing the buttons panel on small screens also steps the page back to the hand stage.
        if (!open && !fromScroll && isCompactNav() && stageIdx === 2) {
            goStage(1);
        }
        if (navBtn) {
            navBtn.setAttribute('aria-expanded', String(open));
            navBtn.setAttribute('aria-label', open ? 'Close sections' : 'Open sections');
        }
        if (open)
            hideCallout();
    }
    if (navBtn) {
        navBtn.addEventListener('click', () => {
            const open = document.body.classList.contains('navopen');
            if (isCompactNav()) {
                // On small screens the panel is driven by scroll position (stage 3).
                goStage(open ? 1 : 2);
                return;
            }
            setNavOpen(!open);
        });
    }
    if (railsM) {
        railsM.addEventListener('click', (e) => {
            const sec = e.target.closest('.sec');
            if (!sec)
                return;
            // Events keeps the menu open: its Department/Institute dropdown shows inside it
            const evIdx = String(ITEMS.findIndex((it) => it.title === 'Events'));
            if (sec.dataset.cardIdx === evIdx)
                return;
            setNavOpen(false);
        });
    }
    if (railsM) {
        let navTouchY = null;
        let navTouchTop = 0;
        railsM.addEventListener('touchstart', (e) => {
            navTouchY = e.touches[0].clientY;
            navTouchTop = railsM.scrollTop;
        }, { passive: true });
        railsM.addEventListener('touchend', (e) => {
            if (navTouchY === null)
                return;
            const dy = e.changedTouches[0].clientY - navTouchY;
            navTouchY = null;
            if (isCompactNav() && document.body.classList.contains('navopen') && navTouchTop <= 0 && dy > 70) {
                setNavOpen(false);
            }
        }, { passive: true });
        railsM.addEventListener('wheel', (e) => {
            if (isCompactNav() && document.body.classList.contains('navopen') && railsM.scrollTop <= 0 && e.deltaY < -20) {
                setNavOpen(false);
            }
        }, { passive: true });
    }
    if (stageEl) {
        stageEl.addEventListener('click', (e) => {
            if (document.body.classList.contains('navopen') && !e.target.closest('.rails-m .rail'))
                setNavOpen(false);
        });
    }
    window.matchMedia('(min-width: 901px)').addEventListener('change', (e) => {
        if (e.matches)
            setNavOpen(false);
    });
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (document.body.classList.contains('evlevels')) {
                closeEventFlyout();
                return;
            }
            if (document.body.classList.contains('navopen')) {
                setNavOpen(false);
                return;
            }
            if (document.body.classList.contains('lit')) {
                closeLightbox();
                return;
            }
            if (document.body.classList.contains('gridview')) {
                document.body.classList.remove('gridview');
            }
        }
    });
    // Custom Cursor
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let dotX = mouseX;
    let dotY = mouseY;
    let trail1X = mouseX;
    let trail1Y = mouseY;
    let trail2X = mouseX;
    let trail2Y = mouseY;
    let trail3X = mouseX;
    let trail3Y = mouseY;
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    window.addEventListener('pointermove', (e) => {
        if (e.pointerType === 'mouse' || e.pointerType === 'pen') {
            mouseX = e.clientX;
            mouseY = e.clientY;
        }
    });
    function updateCursor() {
        if (isFinePointer && dotEl && !document.hidden) {
            dotX += (mouseX - dotX) * 0.28;
            dotY += (mouseY - dotY) * 0.28;
            dotEl.style.transform = `translate3d(${dotX.toFixed(2)}px, ${dotY.toFixed(2)}px, 0)`;
            if (dotTrail1) {
                trail1X += (dotX - trail1X) * 0.38;
                trail1Y += (dotY - trail1Y) * 0.38;
                dotTrail1.style.transform = `translate3d(${trail1X.toFixed(2)}px, ${trail1Y.toFixed(2)}px, 0)`;
            }
            if (dotTrail2) {
                trail2X += (trail1X - trail2X) * 0.30;
                trail2Y += (trail1Y - trail2Y) * 0.30;
                dotTrail2.style.transform = `translate3d(${trail2X.toFixed(2)}px, ${trail2Y.toFixed(2)}px, 0)`;
            }
            if (dotTrail3) {
                trail3X += (trail2X - trail3X) * 0.24;
                trail3Y += (trail2Y - trail3Y) * 0.24;
                dotTrail3.style.transform = `translate3d(${trail3X.toFixed(2)}px, ${trail3Y.toFixed(2)}px, 0)`;
            }
        }
        requestAnimationFrame(updateCursor);
    }
    requestAnimationFrame(updateCursor);
    document.addEventListener('pointerover', (e) => {
        if (!isFinePointer || !dotEl)
            return;
        const target = e.target;
        if (target.closest('.card, a, button, #grid figure, .lit-sub-btn, [data-close], [data-grid], [data-teaser], .gridbtn')) {
            dotEl.classList.add('wide');
        }
        else {
            dotEl.classList.remove('wide');
        }
    });
    // Assets Loader & Splash
    let loadedCount = 0;
    const totalAssets = ITEMS.length + 1;
    let splashDismissed = false;
    const splashBirth = Date.now();
    function assetReported() {
        loadedCount++;
        const prog = Math.min(1, loadedCount / totalAssets);
        if (barEl) {
            barEl.style.transform = `scaleX(${prog})`;
        }
        if (loadedCount >= totalAssets) {
            finishSplash();
        }
    }
    function finishSplash() {
        if (splashDismissed)
            return;
        splashDismissed = true;
        const elapsed = Date.now() - splashBirth;
        const remaining = Math.max(0, 1150 - elapsed);
        setTimeout(() => {
            if (barEl)
                barEl.style.transform = 'scaleX(1)';
            setTimeout(() => {
                if (splashEl) {
                    splashEl.classList.add('out');
                    setTimeout(() => splashEl.remove(), 950);
                }
                startCountdownScene();
            }, 200);
        }, remaining);
    }
    setTimeout(() => {
        finishSplash();
    }, 9000);
    ITEMS.forEach((item, index) => {
        const thumbUrl = getItemImgSrc(item);
        decodedBlobUrls[index] = thumbUrl;
                const cardImg = getCard(index)?.imgDom;
        if (cardImg) {
            cardImg.onerror = () => { cardImg.src = '/doom/doom_sphere_bg.jpg'; };
            cardImg.src = thumbUrl;
            cardImg.onload = () => cardImg.classList.add('in');
            if (cardImg.complete)
                cardImg.classList.add('in');
        }
        const gridImg = document.querySelector(`#grid figure[data-idx="${index}"] img`);
        if (gridImg) {
            gridImg.src = thumbUrl;
        }
        assetReported();
    });
    // Ember Backdrop in Sphere Stage
    function initEmberBackdrop() {
        if (!emberCanvas)
            return;
        const ctx = emberCanvas.getContext('2d');
        if (!ctx)
            return;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        let width = window.innerWidth;
        let height = window.innerHeight;
        function resizeEmber() {
            width = window.innerWidth;
            height = window.innerHeight;
            emberCanvas.width = width * dpr;
            emberCanvas.height = height * dpr;
            emberCanvas.style.width = width + 'px';
            emberCanvas.style.height = height + 'px';
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(dpr, dpr);
        }
        resizeEmber();
        window.addEventListener('resize', resizeEmber);
        const puffCanvas = document.createElement('canvas');
        puffCanvas.width = 120;
        puffCanvas.height = 120;
        const pCtx = puffCanvas.getContext('2d');
        if (pCtx) {
            const pGrad = pCtx.createRadialGradient(60, 60, 0, 60, 60, 60);
            pGrad.addColorStop(0, 'rgba(210, 218, 226, 0.12)');
            pGrad.addColorStop(0.35, 'rgba(138, 153, 168, 0.08)');
            pGrad.addColorStop(0.7, 'rgba(21, 26, 32, 0.04)');
            pGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
            pCtx.fillStyle = pGrad;
            pCtx.beginPath();
            pCtx.arc(60, 60, 60, 0, Math.PI * 2);
            pCtx.fill();
        }
        const emberDotCanvas = document.createElement('canvas');
        emberDotCanvas.width = 32;
        emberDotCanvas.height = 32;
        const eCtx = emberDotCanvas.getContext('2d');
        if (eCtx) {
            const eGrad = eCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
            eGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
            eGrad.addColorStop(0.25, 'rgba(210, 218, 226, 0.8)');
            eGrad.addColorStop(0.6, 'rgba(138, 153, 168, 0.3)');
            eGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
            eCtx.fillStyle = eGrad;
            eCtx.beginPath();
            eCtx.arc(16, 16, 16, 0, Math.PI * 2);
            eCtx.fill();
        }
        const emberEmeraldCanvas = document.createElement('canvas');
        emberEmeraldCanvas.width = 32;
        emberEmeraldCanvas.height = 32;
        const emCtx = emberEmeraldCanvas.getContext('2d');
        if (emCtx) {
            const emGrad = emCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
            emGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
            emGrad.addColorStop(0.2, 'rgba(0, 255, 136, 0.85)');
            emGrad.addColorStop(0.6, 'rgba(5, 223, 114, 0.25)');
            emGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
            emCtx.fillStyle = emGrad;
            emCtx.beginPath();
            emCtx.arc(16, 16, 16, 0, Math.PI * 2);
            emCtx.fill();
        }
        class EmberParticle {
            constructor(isSmoke = false, isEmerald = false) {
                this.x = 0;
                this.y = 0;
                this.vx = 0;
                this.vy = 0;
                this.size = 0;
                this.life = 0;
                this.maxLife = 0;
                this.maxAlpha = 0;
                this.waveSpeed = 0;
                this.waveAmp = 0;
                this.isSmoke = isSmoke;
                this.isEmerald = isEmerald;
                this.reset(true);
            }
            reset(initial = false) {
                this.x = Math.random() * width;
                this.y = initial ? Math.random() * height : height + (this.isSmoke ? 80 : 20);
                if (this.isSmoke) {
                    this.vx = (Math.random() - 0.5) * 0.35;
                    this.vy = -(Math.random() * 0.45 + 0.2);
                    this.size = 120 + Math.random() * 160;
                    this.maxLife = 400 + Math.random() * 300;
                    this.life = initial ? Math.floor(Math.random() * this.maxLife) : 0;
                    this.maxAlpha = 0.25 + Math.random() * 0.25;
                    this.waveSpeed = 0.008 + Math.random() * 0.012;
                    this.waveAmp = 0.4 + Math.random() * 0.6;
                }
                else {
                    this.vx = (Math.random() - 0.5) * 0.5;
                    this.vy = -(Math.random() * 0.8 + 0.35);
                    this.size = 6 + Math.random() * 14;
                    this.maxLife = 240 + Math.random() * 220;
                    this.life = initial ? Math.floor(Math.random() * this.maxLife) : 0;
                    this.maxAlpha = 0.45 + Math.random() * 0.45;
                    this.waveSpeed = 0.018 + Math.random() * 0.024;
                    this.waveAmp = 0.6 + Math.random() * 0.8;
                }
            }
            update() {
                this.life++;
                if (this.life >= this.maxLife || this.y < -this.size || this.x < -100 || this.x > width + 100) {
                    this.reset(false);
                    return;
                }
                this.x += this.vx + Math.sin(this.life * this.waveSpeed) * this.waveAmp;
                this.y += this.vy;
            }
            draw(c) {
                const prog = this.life / this.maxLife;
                let a = 0;
                if (prog < 0.2)
                    a = (prog / 0.2) * this.maxAlpha;
                else if (prog > 0.7)
                    a = (1 - (prog - 0.7) / 0.3) * this.maxAlpha;
                else
                    a = this.maxAlpha;
                c.save();
                c.globalAlpha = Math.max(0, Math.min(1, a));
                if (this.isSmoke) {
                    c.drawImage(puffCanvas, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
                }
                else if (this.isEmerald) {
                    c.drawImage(emberEmeraldCanvas, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
                }
                else {
                    c.drawImage(emberDotCanvas, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
                }
                c.restore();
            }
        }
        const emberParticles = [];
        const isMob = window.innerWidth < 640;
        const smokeCount = isMob ? 6 : 14;
        const emberCount = isMob ? 12 : 26;
        for (let i = 0; i < smokeCount; i++)
            emberParticles.push(new EmberParticle(true, false));
        for (let i = 0; i < emberCount; i++) {
            emberParticles.push(new EmberParticle(false, i % 7 === 0));
        }
        function emberLoop() {
            if (!document.hidden && !document.body.classList.contains('lit')) {
                ctx.clearRect(0, 0, width, height);
                ctx.globalCompositeOperation = 'screen';
                for (let i = 0; i < emberParticles.length; i++) {
                    emberParticles[i].update();
                    emberParticles[i].draw(ctx);
                }
            }
            requestAnimationFrame(emberLoop);
        }
        requestAnimationFrame(emberLoop);
    }
    initEmberBackdrop();
    // Green Avengers Intro, Smoke Simulation & Live Countdown
    let sceneStarted = false;
    let revealTriggered = false;
    let smokeCtrl = null;
    // Background probe
    const avengersBgProbe = new Image();
    avengersBgProbe.onload = () => assetReported();
    avengersBgProbe.onerror = () => assetReported();
    avengersBgProbe.src = '/avengers_bg.jpg';
    // Live Countdown calculation
    // Live Countdown calculation with true Avengers: Doomsday release date
    const RELEASE = new Date('2026-12-29T00:00:00+05:30');
    let timerInterval = null;
    function updateCountdown() {
        const now = Date.now();
        const diffSec = Math.max(0, Math.floor((RELEASE.getTime() - now) / 1000));
        const sec = diffSec % 60;
        const totalMin = Math.floor(diffSec / 60);
        const min = totalMin % 60;
        const totalHr = Math.floor(totalMin / 60);
        const hr = totalHr % 24;
        const totalDays = Math.floor(totalHr / 24);
        const days = totalDays % 30;
        const months = Math.floor(totalDays / 30);
        const pad = (n) => String(n).padStart(2, '0');
        if (tMonths)
            tMonths.textContent = pad(months);
        if (tDays)
            tDays.textContent = pad(days);
        if (tHours)
            tHours.textContent = pad(hr);
        if (tMinutes)
            tMinutes.textContent = pad(min);
        if (tSeconds) {
            tSeconds.textContent = pad(sec);
            tSeconds.classList.add('tick');
            setTimeout(() => tSeconds.classList.remove('tick'), 160);
        }
    }
    function startCountdownTimer() {
        updateCountdown();
        if (timerInterval)
            clearInterval(timerInterval);
        timerInterval = setInterval(updateCountdown, 1000);
    }
    function initWristCountdown() {
    if (!wristHudEl) return;
    const w = {
        m: document.getElementById('wMonths'),
        d: document.getElementById('wDays'),
        h: document.getElementById('wHours'),
        n: document.getElementById('wMinutes'),
        s: document.getElementById('wSeconds'),
    };
    const pad = (n) => String(n).padStart(2, '0');
    function tick() {
        if (document.hidden) return;
        const diff = Math.max(0, Math.floor((RELEASE.getTime() - Date.now()) / 1000));
        const sec = diff % 60;
        const totalMin = Math.floor(diff / 60);
        const min = totalMin % 60;
        const totalHr = Math.floor(totalMin / 60);
        const hr = totalHr % 24;
        const totalDays = Math.floor(totalHr / 24);
        const days = totalDays % 30;
        const months = Math.floor(totalDays / 30);
        if (w.m) w.m.textContent = pad(months);
        if (w.d) w.d.textContent = pad(days);
        if (w.h) w.h.textContent = pad(hr);
        if (w.n) w.n.textContent = pad(min);
        if (w.s) w.s.textContent = pad(sec);
        wristHudEl.classList.toggle('done', diff === 0);
    }
    tick();
    setInterval(tick, 1000);
    document.addEventListener('visibilitychange', tick);
}
    initWristCountdown();
    // Web Audio Synthesizer: Preserved Realistic Timer Tick & Glass Break Sound
    let audioCtx = null;
    let isSoundPlaying = false;
    let audioActivated = false;
    let droneOsc1 = null;
    let droneOsc2 = null;
    let droneGain = null;
    function playTimerTickSound(isUrgent = false) {
        if (!isSoundPlaying || !audioCtx || audioCtx.state !== 'running')
            return;
        try {
            const t = audioCtx.currentTime;
            const clickBuf = audioCtx.createBuffer(1, Math.floor(audioCtx.sampleRate * 0.016), audioCtx.sampleRate);
            const clickData = clickBuf.getChannelData(0);
            for (let i = 0; i < clickData.length; i++) {
                clickData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (clickData.length * 0.18));
            }
            const clickSrc = audioCtx.createBufferSource();
            clickSrc.buffer = clickBuf;
            const clickFilter = audioCtx.createBiquadFilter();
            clickFilter.type = 'bandpass';
            clickFilter.frequency.setValueAtTime(isUrgent ? 3600 : 2700, t);
            clickFilter.Q.setValueAtTime(4.2, t);
            const clickGain = audioCtx.createGain();
            clickGain.gain.setValueAtTime(isUrgent ? 0.65 : 0.45, t);
            clickGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.015);
            clickSrc.connect(clickFilter);
            clickFilter.connect(clickGain);
            clickGain.connect(audioCtx.destination);
            clickSrc.start(t);
        }
        catch (error) {
            console.error('Unable to play countdown sound.', error);
        }
    }
    function startSubBassDrone() {
        if (!audioCtx || audioCtx.state !== 'running' || !isSoundPlaying || revealTriggered)
            return;
        if (droneGain)
            return;
        try {
            const t = audioCtx.currentTime;
            droneGain = audioCtx.createGain();
            droneGain.gain.setValueAtTime(0.0001, t);
            droneGain.gain.exponentialRampToValueAtTime(0.22, t + 1.2);
            const droneFilter = audioCtx.createBiquadFilter();
            droneFilter.type = 'lowpass';
            droneFilter.frequency.setValueAtTime(95, t);
            droneFilter.Q.setValueAtTime(3.2, t);
            droneOsc1 = audioCtx.createOscillator();
            droneOsc1.type = 'sawtooth';
            droneOsc1.frequency.setValueAtTime(46, t);
            droneOsc2 = audioCtx.createOscillator();
            droneOsc2.type = 'sine';
            droneOsc2.frequency.setValueAtTime(46.65, t);
            droneOsc1.connect(droneFilter);
            droneOsc2.connect(droneFilter);
            droneFilter.connect(droneGain);
            droneGain.connect(audioCtx.destination);
            droneOsc1.start(t);
            droneOsc2.start(t);
        }
        catch (error) {
            console.error('Unable to start ambient sound.', error);
        }
    }
    function stopSubBassDrone(fadeSec = 0.6) {
        if (!droneGain || !audioCtx)
            return;
        try {
            const t = audioCtx.currentTime;
            droneGain.gain.setValueAtTime(Math.max(0.0001, droneGain.gain.value), t);
            droneGain.gain.exponentialRampToValueAtTime(0.0001, t + fadeSec);
            const o1 = droneOsc1;
            const o2 = droneOsc2;
            const g = droneGain;
            setTimeout(() => {
                try {
                    if (o1)
                        o1.stop();
                    if (o2)
                        o2.stop();
                    if (g)
                        g.disconnect();
                }
                catch (error) {
                    console.error('Unable to stop ambient sound.', error);
                }
            }, fadeSec * 1000 + 80);
        }
        catch (error) {
            console.error('Unable to fade ambient sound.', error);
        }
        droneOsc1 = null;
        droneOsc2 = null;
        droneGain = null;
    }
    // Realistic Physical Glass Break Audio Synthesis
    function playGlassBreakSound() {
        if (!isSoundPlaying || !audioCtx || audioCtx.state !== 'running')
            return;
        try {
            const t = audioCtx.currentTime;
            // 1. Heavy low-end impact & pressure breach pop
            const boomOsc = audioCtx.createOscillator();
            const boomGain = audioCtx.createGain();
            boomOsc.type = 'sine';
            boomOsc.frequency.setValueAtTime(145, t);
            boomOsc.frequency.exponentialRampToValueAtTime(24, t + 1.75);
            boomGain.gain.setValueAtTime(0.85, t);
            boomGain.gain.exponentialRampToValueAtTime(0.001, t + 1.75);
            boomOsc.connect(boomGain);
            boomGain.connect(audioCtx.destination);
            boomOsc.start(t);
            boomOsc.stop(t + 1.8);
            // 2. High-frequency ceramic shattering noise burst
            const noiseBuffer = audioCtx.createBuffer(1, audioCtx.sampleRate * 0.45, audioCtx.sampleRate);
            const output = noiseBuffer.getChannelData(0);
            for (let i = 0; i < noiseBuffer.length; i++) {
                output[i] = Math.random() * 2 - 1;
            }
            const whiteNoise = audioCtx.createBufferSource();
            whiteNoise.buffer = noiseBuffer;
            const noiseFilter = audioCtx.createBiquadFilter();
            noiseFilter.type = 'highpass';
            noiseFilter.frequency.setValueAtTime(1800, t);
            noiseFilter.frequency.linearRampToValueAtTime(7500, t + 0.35);
            const noiseGain = audioCtx.createGain();
            noiseGain.gain.setValueAtTime(0.68, t);
            noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.42);
            whiteNoise.connect(noiseFilter);
            noiseFilter.connect(noiseGain);
            noiseGain.connect(audioCtx.destination);
            whiteNoise.start(t);
            // 3. Sustained high-frequency crystal resonance ring
            const ringOsc = audioCtx.createOscillator();
            const ringGain = audioCtx.createGain();
            ringOsc.type = 'triangle';
            ringOsc.frequency.setValueAtTime(3200, t);
            ringOsc.frequency.exponentialRampToValueAtTime(1900, t + 1.75);
            ringGain.gain.setValueAtTime(0.35, t);
            ringGain.gain.exponentialRampToValueAtTime(0.0001, t + 1.75);
            ringOsc.connect(ringGain);
            ringGain.connect(audioCtx.destination);
            ringOsc.start(t);
            ringOsc.stop(t + 1.78);
            // 4. Cascading crystal tinkles matching slow-motion shard tumble
            const delays = [0.08, 0.16, 0.28, 0.44, 0.62, 0.82, 1.05, 1.30];
            const freqs = [4200, 5400, 3600, 6800, 4800, 5900, 7200, 4100];
            delays.forEach((delay, idx) => {
                const shardOsc = audioCtx.createOscillator();
                const shardGain = audioCtx.createGain();
                shardOsc.type = 'sine';
                shardOsc.frequency.setValueAtTime(freqs[idx % freqs.length], t + delay);
                shardGain.gain.setValueAtTime(0.18, t + delay);
                shardGain.gain.exponentialRampToValueAtTime(0.0001, t + delay + 0.22);
                shardOsc.connect(shardGain);
                shardGain.connect(audioCtx.destination);
                shardOsc.start(t + delay);
                shardOsc.stop(t + delay + 0.24);
            });
        }
        catch (error) {
            console.error('Unable to play glass-break sound.', error);
        }
    }
    // Realistic 3D Prism Extruded Glass Shards Simulation with Bullet-Time Hero Shard
    let shardAnimId = null;
    function explodeGlassShards() {
        const gCanvas = document.getElementById('glassCanvas');
        if (!gCanvas)
            return;
        const gCtx = gCanvas.getContext('2d');
        if (!gCtx)
            return;
        const w = (gCanvas.width = window.innerWidth);
        const h = (gCanvas.height = window.innerHeight);
        const originX = w * 0.5;
        const originY = h * 0.46;
        const fov = 440;
        const glassZ = 520;
        const colorPalettes = [
            {
                fillTop: 'rgba(240, 255, 250, 0.92)',
                fillBottom: 'rgba(74, 222, 128, 0.78)',
                stroke: 'rgba(255, 255, 255, 0.95)',
                edgeWall: 'rgba(6, 78, 59, 0.88)',
                edgeStroke: 'rgba(52, 211, 153, 0.75)',
                trailHead: 'rgba(134, 239, 172, 0.45)',
                trailMid: 'rgba(34, 197, 94, 0.22)'
            },
            {
                fillTop: 'rgba(230, 255, 245, 0.88)',
                fillBottom: 'rgba(34, 197, 94, 0.72)',
                stroke: 'rgba(240, 255, 250, 0.9)',
                edgeWall: 'rgba(2, 44, 34, 0.85)',
                edgeStroke: 'rgba(74, 222, 128, 0.7)',
                trailHead: 'rgba(74, 222, 128, 0.4)',
                trailMid: 'rgba(22, 101, 52, 0.2)'
            },
            {
                fillTop: 'rgba(255, 255, 255, 0.95)',
                fillBottom: 'rgba(167, 243, 208, 0.8)',
                stroke: 'rgba(255, 255, 255, 1)',
                edgeWall: 'rgba(6, 95, 70, 0.9)',
                edgeStroke: 'rgba(110, 231, 183, 0.8)',
                trailHead: 'rgba(240, 255, 250, 0.5)',
                trailMid: 'rgba(74, 222, 128, 0.25)'
            }
        ];
        const crackStruts = [];
        const strutCount = 18;
        for (let i = 0; i < strutCount; i++) {
            const baseAngle = (i / strutCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.2;
            const length = Math.max(w, h) * (0.35 + Math.random() * 0.45);
            const points = [{ x: originX, y: originY }];
            let currentR = 0;
            let curAngle = baseAngle;
            const subSegments = 4 + Math.floor(Math.random() * 3);
            for (let s = 0; s < subSegments; s++) {
                currentR += length / subSegments;
                curAngle += (Math.random() - 0.5) * 0.35;
                points.push({
                    x: originX + Math.cos(curAngle) * currentR,
                    y: originY + Math.sin(curAngle) * currentR
                });
            }
            const crossSegments = [];
            for (let s = 1; s < points.length; s++) {
                if (Math.random() > 0.4) {
                    const crossAngle = baseAngle + (Math.random() > 0.5 ? 1 : -1) * (Math.PI * 0.35 + Math.random() * 0.3);
                    const crossLen = 25 + Math.random() * 55;
                    crossSegments.push({
                        x1: points[s].x,
                        y1: points[s].y,
                        x2: points[s].x + Math.cos(crossAngle) * crossLen,
                        y2: points[s].y + Math.sin(crossAngle) * crossLen
                    });
                }
            }
            crackStruts.push({ points, crossSegments });
        }
        const warpBeams = [];
        const beamCount = w < 640 ? 14 : 26;
        for (let i = 0; i < beamCount; i++) {
            const bAngle = Math.random() * Math.PI * 2;
            warpBeams.push({
                angle: bAngle,
                width: Math.random() * 2.8 + 1.2,
                speed: Math.random() * 2.2 + 1.4,
                maxDist: Math.max(w, h) * (0.6 + Math.random() * 0.55),
                color: Math.random() > 0.3 ? 'rgba(74, 222, 128, ' : 'rgba(240, 255, 250, '
            });
        }
        const shards = [];
        const shardCount = w < 640 ? 110 : 185;
        for (let i = 0; i < shardCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.pow(Math.random(), 1.6) * (Math.max(w, h) * 0.42);
            const isNeedle = Math.random() < 0.28;
            const isChunk = !isNeedle && Math.random() < 0.22;
            const baseSize = isNeedle
                ? (Math.random() * 12 + 6)
                : (isChunk ? (Math.random() * 28 + 18) : (Math.random() * 18 + 8));
            const verts = [];
            const numVerts = isNeedle ? 3 : (isChunk ? (5 + Math.floor(Math.random() * 2)) : (3 + Math.floor(Math.random() * 2)));
            for (let v = 0; v < numVerts; v++) {
                const vAngle = (v / numVerts) * Math.PI * 2 + (Math.random() - 0.5) * 0.45;
                const vRad = isNeedle && v === 1 ? baseSize * 2.6 : baseSize * (0.65 + Math.random() * 0.65);
                verts.push({
                    x: Math.cos(vAngle) * vRad,
                    y: Math.sin(vAngle) * vRad
                });
            }
            const thickness = Math.max(1.8, baseSize * (isChunk ? 0.35 : 0.22));
            // Realistic slow-motion velocity vectors
            const speed = (Math.random() * 6.5 + 3.8);
            const forwardPush = -(Math.random() * 10 + 6);
            const rotVelocity = (Math.random() - 0.5) * 0.045;
            let internalCrack = null;
            if (isChunk && Math.random() < 0.6) {
                internalCrack = {
                    x1: verts[0].x * 0.7,
                    y1: verts[0].y * 0.7,
                    x2: verts[2].x * 0.65,
                    y2: verts[2].y * 0.65
                };
            }
            shards.push({
                x: Math.cos(angle) * dist,
                y: Math.sin(angle) * dist,
                z: glassZ + (Math.random() - 0.5) * 35,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                vz: forwardPush,
                verts,
                thickness,
                isNeedle,
                isChunk,
                baseSize,
                rotX: Math.random() * Math.PI * 2,
                rotY: Math.random() * Math.PI * 2,
                rotZ: Math.random() * Math.PI * 2,
                vRotX: rotVelocity * (Math.random() * 1.2 + 0.4),
                vRotY: rotVelocity * (Math.random() * 1.2 + 0.4),
                vRotZ: rotVelocity * (Math.random() * 1.2 + 0.4),
                prevScreenX: null,
                prevScreenY: null,
                palette: colorPalettes[i % colorPalettes.length],
                internalCrack,
                glintOffset: Math.random() * 6.28
            });
        }
        // Featured bullet-time foreground Hero Glass Shard
        const heroVerts = [
            { x: -32, y: -22 },
            { x: 26, y: -34 },
            { x: 38, y: 12 },
            { x: 6, y: 36 },
            { x: -28, y: 18 }
        ];
        const heroShard = {
            x: -45,
            y: -25,
            z: glassZ - 30,
            vx: -1.2,
            vy: -0.85,
            vz: -6.2,
            thickness: 14,
            verts: heroVerts,
            rotX: 0.2,
            rotY: 0.4,
            rotZ: 0.1,
            vRotX: 0.012,
            vRotY: 0.016,
            vRotZ: 0.009,
            prevScreenX: null,
            prevScreenY: null,
            veins: [
                { x1: -24, y1: -14, x2: 18, y2: 4 },
                { x1: 2, y1: -22, x2: -12, y2: 24 }
            ]
        };
        let startTime = null;
        function renderShatterFrame(now) {
            if (startTime === null)
                startTime = now;
            const elapsed = Math.max(0, now - startTime);
            gCtx.clearRect(0, 0, w, h);
            gCtx.globalCompositeOperation = 'screen';
            // 1. Central Impact Flash & Spiderweb Cracks (0 - 450ms)
            if (elapsed < 450) {
                const crackProgress = Math.max(0, Math.min(1, elapsed / 280));
                const crackAlpha = elapsed < 260 ? Math.max(0, Math.min(1, elapsed / 80)) : Math.max(0, 1 - (elapsed - 260) / 190);
                gCtx.save();
                const flashRadius = Math.max(1, 190 * crackProgress);
                const flashGrad = gCtx.createRadialGradient(originX, originY, 0, originX, originY, flashRadius);
                flashGrad.addColorStop(0, 'rgba(255, 255, 255, ' + (crackAlpha * 0.95).toFixed(3) + ')');
                flashGrad.addColorStop(0.2, 'rgba(167, 243, 208, ' + (crackAlpha * 0.8).toFixed(3) + ')');
                flashGrad.addColorStop(0.5, 'rgba(34, 197, 94, ' + (crackAlpha * 0.4).toFixed(3) + ')');
                flashGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
                gCtx.fillStyle = flashGrad;
                gCtx.beginPath();
                gCtx.arc(originX, originY, flashRadius, 0, Math.PI * 2);
                gCtx.fill();
                for (let i = 0; i < crackStruts.length; i++) {
                    const strut = crackStruts[i];
                    const pts = strut.points;
                    const strutLen = Math.floor(pts.length * crackProgress);
                    if (strutLen < 2)
                        continue;
                    gCtx.beginPath();
                    gCtx.moveTo(pts[0].x, pts[0].y);
                    for (let p = 1; p < strutLen; p++) {
                        gCtx.lineTo(pts[p].x, pts[p].y);
                    }
                    gCtx.strokeStyle = 'rgba(255, 255, 255, ' + crackAlpha.toFixed(3) + ')';
                    gCtx.lineWidth = 2.4;
                    gCtx.stroke();
                    const strutAlpha = Math.max(0, crackAlpha * 0.65);
                    gCtx.beginPath();
                    for (let c = 0; c < strut.crossSegments.length; c++) {
                        const cs = strut.crossSegments[c];
                        if (crackProgress > 0.45) {
                            gCtx.moveTo(cs.x1, cs.y1);
                            gCtx.lineTo(cs.x2, cs.y2);
                        }
                    }
                    gCtx.strokeStyle = 'rgba(167, 243, 208, ' + (strutAlpha * 0.88).toFixed(3) + ')';
                    gCtx.lineWidth = 1.6;
                    gCtx.stroke();
                }
                const ringProgress = Math.max(0, Math.min(1, elapsed / 260));
                for (let r = 1; r <= 6; r++) {
                    const ringR = Math.max(0, r * 54 * ringProgress);
                    if (ringR > 0) {
                        gCtx.beginPath();
                        gCtx.arc(originX, originY, ringR, 0, Math.PI * 2);
                        gCtx.strokeStyle = 'rgba(167, 243, 208, ' + (crackAlpha * (0.85 / r)).toFixed(3) + ')';
                        gCtx.lineWidth = 1.3;
                        gCtx.stroke();
                    }
                }
                gCtx.restore();
            }
            // 2. Volumetric Forward Light Rays
            if (elapsed >= 120 && elapsed < 1200) {
                const warpProgress = Math.min(1, (elapsed - 120) / 950);
                const warpAlpha = Math.max(0, Math.sin(warpProgress * Math.PI));
                gCtx.save();
                for (let b = 0; b < warpBeams.length; b++) {
                    const beam = warpBeams[b];
                    const startDist = Math.max(2, warpProgress * beam.maxDist * 0.25);
                    const endDist = Math.min(beam.maxDist, startDist + warpProgress * beam.maxDist * 0.75);
                    const x1 = originX + Math.cos(beam.angle) * startDist;
                    const y1 = originY + Math.sin(beam.angle) * startDist;
                    const x2 = originX + Math.cos(beam.angle) * endDist;
                    const y2 = originY + Math.sin(beam.angle) * endDist;
                    gCtx.beginPath();
                    gCtx.moveTo(x1, y1);
                    gCtx.lineTo(x2, y2);
                    gCtx.strokeStyle = beam.color + (warpAlpha * 0.72).toFixed(3) + ')';
                    gCtx.lineWidth = Math.min(13, beam.width * (1 + warpProgress * 2.8));
                    gCtx.stroke();
                }
                gCtx.restore();
            }
            // 3. Regular 3D Glass Shards with Extruded Prism Facets & Ballistic Slow Motion
            if (elapsed >= 100) {
                const surgeProgress = Math.min(1, (elapsed - 100) / 1400);
                const camZ = Math.pow(surgeProgress, 2.5) * 980;
                for (let i = 0; i < shards.length; i++) {
                    const s = shards[i];
                    s.x += s.vx;
                    s.y += s.vy;
                    s.z += s.vz;
                    s.rotX += s.vRotX;
                    s.rotY += s.vRotY;
                    s.rotZ += s.vRotZ;
                    s.vx *= 0.996;
                    s.vy = (s.vy + 0.035) * 0.996; // Physical gravity drift
                    const relZ = s.z - camZ;
                    if (relZ <= 6)
                        continue;
                    const projScale = fov / Math.max(6, relZ);
                    const screenX = originX + s.x * projScale;
                    const screenY = originY + s.y * projScale;
                    const currentSize = s.baseSize * projScale;
                    if (screenX < -380 || screenX > w + 380 || screenY < -380 || screenY > h + 380) {
                        continue;
                    }
                    // Volumetric Motion Blur Trail
                    if (s.prevScreenX !== null && projScale > 1.1) {
                        const mdx = screenX - s.prevScreenX;
                        const mdy = screenY - s.prevScreenY;
                        const mDist = Math.hypot(mdx, mdy);
                        if (mDist > 2.2) {
                            const unx = -mdy / mDist;
                            const uny = mdx / mDist;
                            const halfHead = Math.min(22, Math.max(2, currentSize * 0.38));
                            const halfTail = Math.min(10, Math.max(0.8, currentSize * 0.1));
                            const stretchFactor = Math.min(2.4, 1 + (projScale * 0.08));
                            const tailX = screenX - mdx * stretchFactor;
                            const tailY = screenY - mdy * stretchFactor;
                            const trailGrad = gCtx.createLinearGradient(tailX, tailY, screenX, screenY);
                            trailGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
                            trailGrad.addColorStop(0.5, s.palette.trailMid);
                            trailGrad.addColorStop(1, s.palette.trailHead);
                            gCtx.beginPath();
                            gCtx.moveTo(tailX + unx * halfTail, tailY + uny * halfTail);
                            gCtx.lineTo(screenX + unx * halfHead, screenY + uny * halfHead);
                            gCtx.lineTo(screenX - unx * halfHead, screenY - uny * halfHead);
                            gCtx.lineTo(tailX - unx * halfTail, tailY - uny * halfTail);
                            gCtx.closePath();
                            gCtx.fillStyle = trailGrad;
                            gCtx.fill();
                        }
                    }
                    // 3D Euler Matrix Rotation
                    const cosX = Math.cos(s.rotX), sinX = Math.sin(s.rotX);
                    const cosY = Math.cos(s.rotY), sinY = Math.sin(s.rotY);
                    const cosZ = Math.cos(s.rotZ), sinZ = Math.sin(s.rotZ);
                    const vLen = s.verts.length;
                    const halfThick = s.thickness * 0.5;
                    const frontPts = [];
                    const backPts = [];
                    for (let v = 0; v < vLen; v++) {
                        const vx = s.verts[v].x;
                        const vy = s.verts[v].y;
                        // Front vertex (+halfThick)
                        const fy1 = vy * cosX - halfThick * sinX;
                        const fz1 = vy * sinX + halfThick * cosX;
                        const fx2 = vx * cosY + fz1 * sinY;
                        const fx3 = fx2 * cosZ - fy1 * sinZ;
                        const fy3 = fx2 * sinZ + fy1 * cosZ;
                        frontPts.push({ x: screenX + fx3 * projScale, y: screenY + fy3 * projScale });
                        // Back vertex (-halfThick)
                        const by1 = vy * cosX - (-halfThick) * sinX;
                        const bz1 = vy * sinX + (-halfThick) * cosX;
                        const bx2 = vx * cosY + bz1 * sinY;
                        const bx3 = bx2 * cosZ - by1 * sinZ;
                        const by3 = bx2 * sinZ + by1 * cosZ;
                        backPts.push({ x: screenX + bx3 * projScale, y: screenY + by3 * projScale });
                    }
                    // A. Draw 3D Beveled Edge Walls
                    if (s.isChunk || projScale > 0.8) {
                        for (let v = 0; v < vLen; v++) {
                            const nextV = (v + 1) % vLen;
                            gCtx.beginPath();
                            gCtx.moveTo(frontPts[v].x, frontPts[v].y);
                            gCtx.lineTo(frontPts[nextV].x, frontPts[nextV].y);
                            gCtx.lineTo(backPts[nextV].x, backPts[nextV].y);
                            gCtx.lineTo(backPts[v].x, backPts[v].y);
                            gCtx.closePath();
                            gCtx.fillStyle = s.palette.edgeWall;
                            gCtx.fill();
                            gCtx.strokeStyle = s.palette.edgeStroke;
                            gCtx.lineWidth = Math.max(0.7, 0.9 * projScale);
                            gCtx.stroke();
                        }
                    }
                    // B. Draw Front Facet
                    gCtx.beginPath();
                    gCtx.moveTo(frontPts[0].x, frontPts[0].y);
                    for (let v = 1; v < vLen; v++) {
                        gCtx.lineTo(frontPts[v].x, frontPts[v].y);
                    }
                    gCtx.closePath();
                    const faceGrad = gCtx.createLinearGradient(frontPts[0].x, frontPts[0].y, frontPts[Math.floor(vLen / 2)].x, frontPts[Math.floor(vLen / 2)].y);
                    faceGrad.addColorStop(0, s.palette.fillTop);
                    faceGrad.addColorStop(1, s.palette.fillBottom);
                    gCtx.fillStyle = faceGrad;
                    gCtx.fill();
                    // C. Crisp Razor-Sharp White Perimeter Highlight
                    gCtx.strokeStyle = s.palette.stroke;
                    gCtx.lineWidth = Math.min(2.4, Math.max(0.8, 1.1 * Math.min(2.8, projScale)));
                    gCtx.stroke();
                    // D. Internal Stress Fracture Vein for large chunks
                    if (s.internalCrack && projScale > 0.6) {
                        const c = s.internalCrack;
                        const cy1 = c.y1 * cosX;
                        const cx2 = c.x1 * cosY + (c.y1 * sinX) * sinY;
                        const cx3 = cx2 * cosZ - cy1 * sinZ;
                        const cy3 = cx2 * sinZ + cy1 * cosZ;
                        const c2y1 = c.y2 * cosX;
                        const c2x2 = c.x2 * cosY + (c.y2 * sinX) * sinY;
                        const c2x3 = c2x2 * cosZ - c2y1 * sinZ;
                        const c2y3 = c2x2 * sinZ + c2y1 * cosZ;
                        gCtx.beginPath();
                        gCtx.moveTo(screenX + cx3 * projScale, screenY + cy3 * projScale);
                        gCtx.lineTo(screenX + c2x3 * projScale, screenY + c2y3 * projScale);
                        gCtx.strokeStyle = 'rgba(255, 255, 255, 0.72)';
                        gCtx.lineWidth = Math.max(0.8, 1.1 * projScale);
                        gCtx.stroke();
                    }
                    // E. Dynamic Specular Diamond Star Glint on Sharpest Vertex
                    if (s.isChunk && projScale > 1.25 && ((elapsed + s.glintOffset * 35) % 180 < 70)) {
                        const glintLen = Math.min(16, 5 * projScale);
                        const gx = frontPts[0].x;
                        const gy = frontPts[0].y;
                        gCtx.beginPath();
                        gCtx.moveTo(gx - glintLen, gy);
                        gCtx.lineTo(gx + glintLen, gy);
                        gCtx.moveTo(gx, gy - glintLen);
                        gCtx.lineTo(gx, gy + glintLen);
                        gCtx.strokeStyle = 'rgba(255, 255, 255, 0.98)';
                        gCtx.lineWidth = 1.6;
                        gCtx.stroke();
                    }
                    s.prevScreenX = screenX;
                    s.prevScreenY = screenY;
                }
                // 4. Central Emerald Energy Shockwave
                if (elapsed > 180 && elapsed < 980) {
                    const burstProgress = Math.max(0, (elapsed - 180) / 800);
                    const burstRadius = Math.max(0.1, burstProgress * Math.max(w, h) * 1.5);
                    const burstAlpha = Math.max(0, 1 - burstProgress) * 0.38;
                    gCtx.save();
                    const burstGrad = gCtx.createRadialGradient(originX, originY, 0, originX, originY, burstRadius);
                    burstGrad.addColorStop(0, 'rgba(240, 255, 250, ' + (burstAlpha * 1.3).toFixed(3) + ')');
                    burstGrad.addColorStop(0.22, 'rgba(74, 222, 128, ' + (burstAlpha * 0.88).toFixed(3) + ')');
                    burstGrad.addColorStop(0.55, 'rgba(22, 101, 52, ' + (burstAlpha * 0.36).toFixed(3) + ')');
                    burstGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
                    gCtx.fillStyle = burstGrad;
                    gCtx.beginPath();
                    gCtx.arc(originX, originY, burstRadius, 0, Math.PI * 2);
                    gCtx.fill();
                    gCtx.restore();
                }
                // 5. Hero Glass Piece in Cinematic Slow Motion (Bullet-Time Focus)
                if (elapsed >= 80) {
                    heroShard.x += heroShard.vx;
                    heroShard.y += heroShard.vy;
                    heroShard.z += heroShard.vz;
                    heroShard.rotX += heroShard.vRotX;
                    heroShard.rotY += heroShard.vRotY;
                    heroShard.rotZ += heroShard.vRotZ;
                    const heroRelZ = heroShard.z - (camZ * 0.42);
                    if (heroRelZ > 10) {
                        const hScale = fov / Math.max(14, heroRelZ);
                        const hsX = originX + heroShard.x * hScale;
                        const hsY = originY + heroShard.y * hScale;
                        const hcX = Math.cos(heroShard.rotX), hsXRot = Math.sin(heroShard.rotX);
                        const hcY = Math.cos(heroShard.rotY), hsYRot = Math.sin(heroShard.rotY);
                        const hcZ = Math.cos(heroShard.rotZ), hsZRot = Math.sin(heroShard.rotZ);
                        const frontPts = [];
                        const backPts = [];
                        const thick = heroShard.thickness;
                        for (let v = 0; v < heroShard.verts.length; v++) {
                            const vx = heroShard.verts[v].x;
                            const vy = heroShard.verts[v].y;
                            const fy1 = vy * hcX - (thick * 0.5) * hsXRot;
                            const fz1 = vy * hsXRot + (thick * 0.5) * hcX;
                            const fx2 = vx * hcY + fz1 * hsYRot;
                            const fx3 = fx2 * hcZ - fy1 * hsZRot;
                            const fy3 = fx2 * hsZRot + fy1 * hcZ;
                            frontPts.push({ x: hsX + fx3 * hScale, y: hsY + fy3 * hScale });
                            const by1 = vy * hcX - (-thick * 0.5) * hsXRot;
                            const bz1 = vy * hsXRot + (-thick * 0.5) * hcX;
                            const bx2 = vx * hcY + bz1 * hsYRot;
                            const bx3 = bx2 * hcZ - by1 * hsZRot;
                            const by3 = bx2 * hsZRot + by1 * hcZ;
                            backPts.push({ x: hsX + bx3 * hScale, y: hsY + by3 * hScale });
                        }
                        // A. Slow-Motion Ethereal Refraction Wake
                        if (heroShard.prevScreenX !== null && heroShard.prevScreenY !== null) {
                            const hdx = hsX - heroShard.prevScreenX;
                            const hdy = hsY - heroShard.prevScreenY;
                            const hGrad = gCtx.createLinearGradient(hsX - hdx * 4, hsY - hdy * 4, hsX, hsY);
                            hGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
                            hGrad.addColorStop(0.55, 'rgba(74, 222, 128, 0.22)');
                            hGrad.addColorStop(1, 'rgba(167, 243, 208, 0.52)');
                            gCtx.beginPath();
                            gCtx.arc(hsX, hsY, Math.max(1, 38 * hScale), 0, Math.PI * 2);
                            gCtx.fillStyle = hGrad;
                            gCtx.fill();
                        }
                        // B. Beveled Edge Walls
                        for (let i = 0; i < frontPts.length; i++) {
                            const nextI = (i + 1) % frontPts.length;
                            gCtx.beginPath();
                            gCtx.moveTo(frontPts[i].x, frontPts[i].y);
                            gCtx.lineTo(frontPts[nextI].x, frontPts[nextI].y);
                            gCtx.lineTo(backPts[nextI].x, backPts[nextI].y);
                            gCtx.lineTo(backPts[i].x, backPts[i].y);
                            gCtx.closePath();
                            gCtx.fillStyle = 'rgba(6, 78, 59, 0.92)';
                            gCtx.fill();
                            gCtx.strokeStyle = 'rgba(52, 211, 153, 0.78)';
                            gCtx.lineWidth = Math.max(1, 1.3 * hScale);
                            gCtx.stroke();
                        }
                        // C. Front Facet
                        gCtx.beginPath();
                        gCtx.moveTo(frontPts[0].x, frontPts[0].y);
                        for (let i = 1; i < frontPts.length; i++) {
                            gCtx.lineTo(frontPts[i].x, frontPts[i].y);
                        }
                        gCtx.closePath();
                        const faceGrad = gCtx.createLinearGradient(frontPts[0].x, frontPts[0].y, frontPts[3].x, frontPts[3].y);
                        faceGrad.addColorStop(0, 'rgba(240, 255, 250, 0.94)');
                        faceGrad.addColorStop(0.35, 'rgba(134, 239, 172, 0.88)');
                        faceGrad.addColorStop(0.75, 'rgba(16, 185, 129, 0.85)');
                        faceGrad.addColorStop(1, 'rgba(5, 150, 105, 0.9)');
                        gCtx.fillStyle = faceGrad;
                        gCtx.fill();
                        // Outer Bevel Stroke
                        gCtx.strokeStyle = 'rgba(255, 255, 255, 0.98)';
                        gCtx.lineWidth = Math.max(1.5, 2.2 * hScale);
                        gCtx.stroke();
                        // D. Internal Stress Fracture Veins Inside Crystal
                        gCtx.beginPath();
                        for (let k = 0; k < heroShard.veins.length; k++) {
                            const vn = heroShard.veins[k];
                            const vx1 = vn.x1 * hcY * hcZ;
                            const vy1 = vn.y1 * hcX * hcZ;
                            const vx2 = vn.x2 * hcY * hcZ;
                            const vy2 = vn.y2 * hcX * hcZ;
                            gCtx.moveTo(hsX + vx1 * hScale, hsY + vy1 * hScale);
                            gCtx.lineTo(hsX + vx2 * hScale, hsY + vy2 * hScale);
                        }
                        gCtx.strokeStyle = 'rgba(240, 255, 250, 0.82)';
                        gCtx.lineWidth = Math.max(1, 1.5 * hScale);
                        gCtx.stroke();
                        // E. Traveling Knife-Edge Specular Glint
                        const sweepPhase = (elapsed * 0.0012) % 1;
                        const glintX = frontPts[1].x + (frontPts[2].x - frontPts[1].x) * sweepPhase;
                        const glintY = frontPts[1].y + (frontPts[2].y - frontPts[1].y) * sweepPhase;
                        const gSize = 16 * hScale;
                        gCtx.beginPath();
                        gCtx.moveTo(glintX - gSize, glintY);
                        gCtx.lineTo(glintX + gSize, glintY);
                        gCtx.moveTo(glintX, glintY - gSize);
                        gCtx.lineTo(glintX, glintY + gSize);
                        gCtx.strokeStyle = 'rgba(255, 255, 255, 1)';
                        gCtx.lineWidth = 2.4;
                        gCtx.stroke();
                        heroShard.prevScreenX = hsX;
                        heroShard.prevScreenY = hsY;
                    }
                }
            }
            if (elapsed < 2050) {
                shardAnimId = requestAnimationFrame(renderShatterFrame);
            }
            else {
                gCtx.clearRect(0, 0, w, h);
            }
        }
        shardAnimId = requestAnimationFrame(renderShatterFrame);
    }
    // Reveal & Transition Timing
    let countdownAutoTimer = null;
    let tickTimeouts = [];
    if ('scrollRestoration' in history)
        history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    const INTRO_SEEN_KEY = 'pragya_intro_seen';
    const introControlsText = document.querySelector('.intro-controls span');
    const introDefaultText = introControlsText ? introControlsText.textContent : '';
    function hasSeenIntro() {
        try {
            return localStorage.getItem(INTRO_SEEN_KEY) === '1';
        }
        catch {
            return false;
        }
    }
    function markIntroSeen() {
        try {
            localStorage.setItem(INTRO_SEEN_KEY, '1');
        }
        catch {
        }
    }
    function skipIntro(e) {
        if (revealTriggered || !sceneStarted)
            return;
        if (e && e.type === 'keydown' && !['Enter', ' ', 'Escape'].includes(e.key))
            return;
        triggerReveal();
    }
    function enableIntroSkip() {
        if (introEl)
            introEl.classList.add('skippable');
        if (introControlsText)
            introControlsText.textContent = 'TAP ANYWHERE TO SKIP';
        window.addEventListener('pointerdown', skipIntro);
        window.addEventListener('keydown', skipIntro);
    }
    function disableIntroSkip() {
        if (introEl)
            introEl.classList.remove('skippable');
        if (introControlsText)
            introControlsText.textContent = introDefaultText;
        window.removeEventListener('pointerdown', skipIntro);
        window.removeEventListener('keydown', skipIntro);
    }
    function triggerReveal() {
        if (revealTriggered)
            return;
        revealTriggered = true;
        disableIntroSkip();
        markIntroSeen();
        if (countdownAutoTimer)
            clearTimeout(countdownAutoTimer);
        tickTimeouts.forEach(clearTimeout);
        tickTimeouts = [];
        if (introEl)
            introEl.classList.add('shattering');
        if (isSoundPlaying)
            playGlassBreakSound();
        stopSubBassDrone(1.5);
        explodeGlassShards();
        if (smokeCtrl) {
            smokeCtrl.triggerBurst();
        }
        document.body.classList.remove('locked');
        document.documentElement.style.overflow = '';
        window.scrollTo(0, 0);
        stageIdx = minStage();
        stageP = stageIdx;
        if (!stageIdx)
            document.body.classList.remove('deep');
        layoutSphere();
        requestAnimationFrame(() => layoutSphere());
        tickTimeouts.push(setTimeout(() => {
            layoutSphere();
            document.body.classList.add('revealed');
            if (introEl)
                introEl.classList.add('closing');
        }, 1150));
        tickTimeouts.push(setTimeout(() => {
            if (introEl) {
                introEl.classList.add('gone');
                introEl.classList.remove('shattering', 'closing');
            }
            if (timerInterval) {
                clearInterval(timerInterval);
                timerInterval = null;
            }
        }, 1750));
    }
    function startCountdownScene(force = false) {
        if (sceneStarted)
            return;
        sceneStarted = true;
        // Returning visitor: skip countdown + glass break, reveal the site instantly.
        if (!force && hasSeenIntro()) {
            revealTriggered = true;
            if (introEl) {
                introEl.classList.add('gone');
                introEl.style.display = 'none';
            }
            document.body.classList.remove('locked', 'deep');
            document.documentElement.style.overflow = '';
            window.scrollTo(0, 0);
            layoutSphere();
            requestAnimationFrame(() => {
                layoutSphere();
                document.body.classList.add('revealed');
            });
            return;
        }
        // First visit: remember it right away so a refresh mid-intro counts as seen.
        markIntroSeen();
        if (smokeCanvas) {
            if (smokeCtrl)
                smokeCtrl.destroy();
            smokeCtrl = initBilateralSmokeSimulation(smokeCanvas);
        }
        startCountdownTimer();
        try {
            if (!audioCtx)
                audioCtx = new AudioContext();
            void resumeAudioContext(audioCtx);
        }
        catch (error) {
            console.error('Unable to initialize countdown audio.', error);
        }
        tickTimeouts.forEach(clearTimeout);
        tickTimeouts = [];
        const tickDelays = [0, 900, 1800, 2700, 3600, 4200, 4800, 5400];
        tickDelays.forEach((delay, idx) => {
            const tid = setTimeout(() => {
                if (!revealTriggered) {
                    if (isSoundPlaying)
                        playTimerTickSound(idx >= 3);
                    if (tSeconds) {
                        tSeconds.classList.add('tick');
                        setTimeout(() => tSeconds.classList.remove('tick'), 140);
                    }
                }
            }, delay);
            tickTimeouts.push(tid);
        });
        countdownAutoTimer = setTimeout(() => {
            if (!revealTriggered) {
                triggerReveal();
            }
        }, 6500);
        if (force)
            enableIntroSkip();
    }
    function resumeAudioContext(context) {
        return context.resume().then(() => {
            if (context.state !== 'running')
                return;
            isSoundPlaying = true;
            if (!audioActivated && !revealTriggered) {
                audioActivated = true;
                playTimerTickSound(true);
                startSubBassDrone();
            }
        }).catch((error) => {
            isSoundPlaying = false;
            console.error('Unable to resume countdown audio.', error);
        });
    }
    function unlockAudioFromGesture() {
        if (!audioCtx) {
            try {
                audioCtx = new AudioContext();
            }
            catch (error) {
                console.error('Unable to initialize countdown audio.', error);
                return;
            }
        }
        void resumeAudioContext(audioCtx);
    }
    window.addEventListener('pointerdown', unlockAudioFromGesture, { once: true, passive: true });
    window.addEventListener('keydown', unlockAudioFromGesture, { once: true });
    window.openTeaserCountdown = function () {
        revealTriggered = false;
        sceneStarted = false;
        audioActivated = false;
        if (shardAnimId) {
            cancelAnimationFrame(shardAnimId);
            shardAnimId = null;
        }
        if (countdownAutoTimer)
            clearTimeout(countdownAutoTimer);
        tickTimeouts.forEach(clearTimeout);
        tickTimeouts = [];
        document.documentElement.classList.remove('intro-seen');
        document.body.classList.remove('revealed');
        document.body.classList.add('locked');
        document.documentElement.style.overflow = 'hidden';
        if (introEl) {
            introEl.classList.remove('gone', 'closing', 'shattering');
            introEl.style.display = 'grid';
            introEl.style.opacity = '';
        }
        const introCam = document.getElementById('introCamera');
        if (introCam)
            introCam.style.transform = '';
        const gCanvas = document.getElementById('glassCanvas');
        if (gCanvas) {
            const gCtx = gCanvas.getContext('2d');
            if (gCtx)
                gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
        }
        startCountdownScene(true);
    };
}