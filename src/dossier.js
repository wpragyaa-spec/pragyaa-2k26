// Schedule dossier modal logic (ported verbatim from the inline script in index.html)
export function initDossier() {
      // 10 Festival Sections Data Model with subs and rich blocks
      const DOSSIER_ITEMS = [
        {
          code: "SEC-01",
          title: "Junior Scientist",
          subtitle: "INC-001 // PROTO-LAB",
          codename: "PROTO-LAB",
          threat: "CAT-3 // STABLE",
          statusWord: "STABLE",
          desc: "Igniting next-generation intellect before timeline collapse. School students from across the country exhibit quantum models, automated rovers, and breakthrough bio-mechanical proofs under Doctor Doom's scrutiny.",
          subs: [
            {
              name: "Quantum Sparks Exhibition",
              tag: "EXPO",
              timeOrSpecs: "DAY 01 — 10:00 - 16:00 IST",
              secSpec: "MAIN HANGAR // SECTOR A",
              summary: "Middle and high school prodigies present working models spanning renewable energy, automation, and applied physics.",
              actionText: "TRANSMIT WARNING TO AVENGERS",
              blocks: [
                {
                  featured: true,
                  badge: "// SPEC: 10:00 - 12:30 IST",
                  tagChip: "PROTO-EXPO",
                  meta: "MAIN HANGAR // BAY 01",
                  title: "Bio-Mechanical & Renewable Energy Prove-Outs",
                  desc: "Senior Latverian researchers evaluate working prototypes of low-cost atmospheric carbon scrubbers, solar tracking photovoltaic arrays, and micro-hydro power turbines fabricated by young prodigies.",
                  access: "ACCESS: LEVEL-01",
                  status: "CONFIRMED"
                },
                {
                  featured: false,
                  badge: "// SPEC: 13:30 - 16:00 IST",
                  meta: "CENTRAL ROTUNDA // BENCH 04",
                  title: "Automated Micro-Rovers & Sensor Nodes",
                  desc: "Autonomous obstacle avoidance rovers traversing synthetic Martian regolith terrains with ultrasonic mapping, thermal infrared sensors, and local telemetry broadcasting.",
                  access: "ACCESS: OPEN",
                  status: "CONFIRMED"
                },
                {
                  featured: false,
                  badge: "// SPEC: 16:15 IST",
                  meta: "STAGE A // AUDITORIUM",
                  title: "Jury Colloquium & Innovation Laurels",
                  desc: "Citation awards and seed grants distributed to the top three prototypes evaluated across scientific rigor, scalability, and material resourcefulness.",
                  access: "ACCESS: PUBLIC",
                  status: "CONFIRMED"
                }
              ]
            },
            {
              name: "Robo-Junior Arena",
              tag: "ROBOTICS",
              timeOrSpecs: "DAY 02 — 11:30 - 15:00 IST",
              secSpec: "SECTOR B // LEXAN PIT",
              summary: "Autonomous obstacle navigators and line-follower bots designed and deployed by young engineers under 16.",
              actionText: "REGISTER PROTO-UNIT",
              blocks: [
                {
                  featured: true,
                  badge: "// SPEC: 11:30 - 13:00 IST",
                  tagChip: "SPEED TRACK",
                  meta: "SECTOR B // GRID 02",
                  title: "High-Precision Optical Line Follower League",
                  desc: "Microcontroller bots executing PID trajectory corrections at over 2.4 meters/second across serpentine courses with hairpin 90-degree junctions and elevated ramps.",
                  access: "ACCESS: LEVEL-02",
                  status: "CONFIRMED"
                },
                {
                  featured: false,
                  badge: "// SPEC: 13:30 - 15:00 IST",
                  meta: "ARENA RING // CAGE",
                  title: "Micro-Pugilist Bot Demolition & Sumo Clash",
                  desc: "Autonomous and RC mini-combatants below 1.5kg competing in non-destructive ring-out pushes with high-traction rubber treads and angled wedge chassis.",
                  access: "ACCESS: OPEN",
                  status: "CONFIRMED"
                }
              ]
            },
            {
              name: "Aero-Glider Design Challenge",
              tag: "AVIONICS",
              timeOrSpecs: "DAY 02 — 14:00 - 17:30 IST",
              secSpec: "CENTRAL AIR STRIP // RUNWAY",
              summary: "Aerodynamic glider fabrication using balsa wood and carbon composite. Flight duration and stability determine victory.",
              actionText: "SUBMIT BLUEPRINT",
              blocks: [
                {
                  featured: true,
                  badge: "// SPEC: 14:00 - 15:30 IST",
                  tagChip: "FABRICATION",
                  meta: "AVIONICS HANGAR 3",
                  title: "Airframe Fabrication & Laser-Cut Balancing",
                  desc: "On-spot airframe assembly utilizing high-density balsa ribs, carbon spars, and thin monokote film with precise center-of-gravity ballast placement.",
                  access: "ACCESS: LEVEL-01",
                  status: "CONFIRMED"
                },
                {
                  featured: false,
                  badge: "// SPEC: 16:00 - 17:30 IST",
                  meta: "AIR STRIP LAUNCH DECK",
                  title: "Hand-Launch Duration & Thermal Drift Trials",
                  desc: "High-angle hand launches measuring glide ratio, dead-air hangtime, and trajectory recovery under shifting courtyard wind shear.",
                  access: "ACCESS: OPEN",
                  status: "CONFIRMED"
                }
              ]
            }
          ]
        },
        {
          code: "SEC-02",
          title: "About",
          subtitle: "INC-002 // CODEX LATVERIA",
          codename: "CODEX LATVERIA",
          threat: "CAT-1 // ARCHIVE",
          statusWord: "ARCHIVE",
          desc: "PRAGYA 2027 is SGGS IE&T's flagship national technical symposium, re-engineered as an incursion battleground where code, steel, and intellect forge the future of the multiverse.",
          subs: [
            {
              name: "The Festival Legacy",
              tag: "LEGACY",
              timeOrSpecs: "EST. 1981 — 46-ACRE CAMPUS",
              secSpec: "NANDED // MAHARASHTRA",
              summary: "Over four decades of engineering supremacy, convening thousands of innovators across 40+ engineering institutes annually.",
              actionText: "READ CHRONICLES",
              blocks: [
                {
                  featured: true,
                  badge: "// SPEC: 40+ YEARS OF SUPREMACY",
                  tagChip: "HISTORIC CODEX",
                  meta: "AUTONOMOUS INSTITUTE",
                  title: "Four Decades of Engineering Supremacy",
                  desc: "Founded as a beacon of technological excellence in Maharashtra, PRAGYA has evolved into a premier national technical festival attracting thousands of undergraduates, researchers, and venture catalysts.",
                  access: "ACCESS: PUBLIC",
                  status: "OPEN"
                },
                {
                  featured: false,
                  badge: "// SPEC: THE 2027 INCURSION RE-WRITE",
                  meta: "LATVERIAN PROTOCOL",
                  title: "Convergence of Mechanical, Silicon, and Cyber Frontiers",
                  desc: "Re-imagined under Doctor Doom's tactical aesthetic, PRAGYA 2027 bridges advanced robotics, quantum computational algorithms, autonomous avionics, and deep cyber warfare into a unified battleground.",
                  access: "ACCESS: PUBLIC",
                  status: "OPEN"
                }
              ]
            },
            {
              name: "The Doomsday Directive",
              tag: "DIRECTIVE",
              timeOrSpecs: "TIMELINE RE-WRITING INITIATIVE",
              secSpec: "LATVERIA CORE PROTOCOL",
              summary: "Uniting code, steel, and intellect under one imperial command to survive the multi-timeline collapse.",
              actionText: "VIEW DIRECTIVE",
              blocks: [
                {
                  featured: true,
                  badge: "// SPEC: SECTOR GOVERNANCE",
                  tagChip: "IMPERIAL ORDER",
                  meta: "INNER SANCTUM",
                  title: "Rule of Absolute Competence",
                  desc: "Every competition is governed by rigorous automated test suites, transparent judging rubrics, and high-impact industry benchmarks with zero room for mediocrity.",
                  access: "ACCESS: LEVEL-03",
                  status: "CONFIRMED"
                }
              ]
            }
          ]
        },
        {
          code: "SEC-03",
          title: "Events",
          subtitle: "INC-003 // THE ARENA",
          codename: "THE ARENA",
          threat: "CAT-5 // HOSTILE",
          statusWord: "HOSTILE",
          desc: "Combat zones across software, mechanical warfare, avionics, and quantum cryptography. High-stakes competition with massive bounty pools and national glory.",
          subs: [
            {
              name: "RoboWars // Heavyweight 60KG",
              tag: "WARFARE",
              timeOrSpecs: "60KG CLASS — STEEL CAGE",
              secSpec: "BOUNTY: ₹75,000 // FULL LEXAN SHIELD",
              summary: "Armor-crushing pneumatic flippers, hardened carbide spinning blades, and tracked destroyers battle in bulletproof Lexan containment.",
              actionText: "DEPLOY COMBAT BOT",
              blocks: [
                {
                  featured: true,
                  badge: "// SPEC: 60KG HEAVYWEIGHT COMBAT",
                  tagChip: "STEEL WARFARE",
                  meta: "ARENA LEXAN ENCLOSURE",
                  title: "Armor-Crushing Pneumatics & Kinetic Spinners",
                  desc: "Bots armored in Hardox 500 steel and aircraft-grade 7075 aluminum engage in full-contact kinetic combat. Features dual hazards: arena pit drop and reciprocating perimeter spikes.",
                  access: "ACCESS: HAZARDOUS",
                  status: "CONFIRMED"
                },
                {
                  featured: false,
                  badge: "// SPEC: TECHNICAL SAFETY INSPECTION",
                  meta: "TECH PIT // BAY 02",
                  title: "Failsafe Radio Links & Pneumatic De-Pressurization",
                  desc: "Mandatory tech inspection enforcing radio frequency isolation, mechanical master switches, removable weapon locks, and 12-bar pressure certification.",
                  access: "ACCESS: RESTRICTED",
                  status: "CONFIRMED"
                }
              ]
            },
            {
              name: "Incursion Hackathon 36H",
              tag: "CYBER",
              timeOrSpecs: "36 HOURS NON-STOP",
              secSpec: "BOUNTY: ₹1,00,000 // 100 SQUADS",
              summary: "Build production-grade solutions tackling AI security, decentralized infrastructure, or disaster telemetry under extreme time pressure.",
              actionText: "REGISTER TEAM",
              blocks: [
                {
                  featured: true,
                  badge: "// SPEC: 36 HOURS CONTINUOUS",
                  tagChip: "CORE HACK",
                  meta: "LABS COMPLEX // SERVER CORE",
                  title: "Frontier AI & Secure Decentralized Protocols",
                  desc: "Squads develop and deploy functional full-stack architectures tackling zero-knowledge telemetry, resilient edge AI for austere environments, or autonomous drone mesh networks.",
                  access: "ACCESS: LEVEL-02",
                  status: "CONFIRMED"
                },
                {
                  featured: false,
                  badge: "// SPEC: EVALUATION MATRIX",
                  meta: "COMM PANEL REVIEW",
                  title: "Git Commit Velocity & Architectural Defense",
                  desc: "Judged by senior architects on codebase modularity, test coverage, API security hardening, real-world utility, and live end-to-end demonstrations.",
                  access: "ACCESS: PUBLIC",
                  status: "OPEN"
                }
              ]
            },
            {
              name: "Code Blitz // Algo Wars",
              tag: "ALGORITHMS",
              timeOrSpecs: "SPEED CODING — 3 ROUNDS",
              secSpec: "ALL RUNTIMES // STRICT MEMORY CAPS",
              summary: "Competitive algorithmic programming contest testing raw speed, time complexity, and distributed system puzzles.",
              actionText: "ENTER ARENA",
              blocks: [
                {
                  featured: true,
                  badge: "// SPEC: 3 PROGRESSIVE ROUNDS",
                  tagChip: "ALGO DUEL",
                  meta: "CCF LAB 1 & 2",
                  title: "Sub-Second Dynamic Programming & Graph Theory",
                  desc: "Head-to-head competitive coding rounds. Real-time leaderboard updates with automated test suites verifying time and memory complexity down to the millisecond.",
                  access: "ACCESS: OPEN",
                  status: "CONFIRMED"
                }
              ]
            },
            {
              name: "Drone Racing League",
              tag: "FPV",
              timeOrSpecs: "NIGHT FPV CIRCUIT",
              secSpec: "5.8GHZ MESH // LED GATES",
              summary: "High-speed multi-rotor obstacle navigation through LED gates at speeds up to 120 km/h.",
              actionText: "REGISTER PILOT",
              blocks: [
                {
                  featured: true,
                  badge: "// SPEC: NIGHT RUN // SPEED GATES",
                  tagChip: "FPV CIRCUIT",
                  meta: "CENTRAL COURTYARD",
                  title: "Multi-Rotor Precision High-G Trajectory Races",
                  desc: "Pilots navigate 5-inch carbon quadcopters through illuminated emerald neon gates, hairpin dive loops, and split-S chicanes with live HD video streaming to ground stations.",
                  access: "ACCESS: PILOT ONLY",
                  status: "CONFIRMED"
                }
              ]
            }
          ]
        },
        {
          code: "SEC-04",
          title: "Team",
          subtitle: "INC-004 // INNER SANCTUM",
          codename: "INNER SANCTUM",
          threat: "CAT-2 // COMMAND",
          statusWord: "COMMAND",
          desc: "The high council executing the festival protocols. Engineers, coordinators, and directors maintaining timeline integrity across all sectors.",
          subs: [
            {
              name: "Executive Directorate",
              tag: "DIRECTORS",
              timeOrSpecs: "GOVERNANCE & SYMPOSIUM LEADERSHIP",
              secSpec: "ADMINISTRATIVE CHAMBER",
              summary: "Institutional convenors, faculty patrons, and chief coordinators overseeing nationwide student delegations.",
              actionText: "CONTACT CONVENORS",
              blocks: [
                {
                  featured: true,
                  badge: "// SPEC: PATRON & DIRECTORATE",
                  tagChip: "COUNCIL LEAD",
                  meta: "DIRECTOR'S OFFICE",
                  title: "Director & Dean of Student Affairs",
                  desc: "Executive patrons providing institutional governance, festival infrastructure, academic accreditations, and nationwide university liaison protocols.",
                  access: "ACCESS: LEVEL-04",
                  status: "CONFIRMED"
                },
                {
                  featured: false,
                  badge: "// SPEC: STUDENT SECRETARIAT",
                  meta: "SAC MAIN DESK",
                  title: "General Secretary & Core Student Convenors",
                  desc: "Student directors heading event operations, arena schedules, corporate sponsorships, guest hospitality, and delegate dispatch across Maharashtra and neighboring states.",
                  access: "ACCESS: OPEN",
                  status: "CONFIRMED"
                }
              ]
            },
            {
              name: "Technical Directorate",
              tag: "SYSTEMS",
              timeOrSpecs: "ARCHITECTURE & INFRASTRUCTURE",
              secSpec: "SERVER CORE // TELEMETRY",
              summary: "Engineers of the 3D incursion portal, network grid, digital registration servers, and arena telemetry nodes.",
              actionText: "VIEW DEV LOGS",
              blocks: [
                {
                  featured: true,
                  badge: "// SPEC: SYSTEM ARCHITECTS",
                  tagChip: "CORE DEV",
                  meta: "INFRASTRUCTURE CLUSTER",
                  title: "Portal Engineers & Distributed Systems Leads",
                  desc: "Architects responsible for high-throughput registration microservices, real-time arena scoring feeds, and the 3D Latverian portal client.",
                  access: "ACCESS: LEVEL-03",
                  status: "CONFIRMED"
                }
              ]
            }
          ]
        },
        {
          code: "SEC-05",
          title: "Schedule",
          subtitle: "INC-005 // TEMPORAL DISPLACEMENT",
          codename: "TEMPORAL DISPLACEMENT",
          threat: "CAT-2 // SYNCHRONIZED",
          statusWord: "SYNCHRONIZED",
          desc: "The multiverse fractures at an exponential rate. Three days of relentless innovation, quantum hackathons, guest keynotes, and arena showdowns synchronized across all campus nodes.",
          subs: [
            {
              name: "Day 01 // The Incursion Begins",
              tag: "DAY 01",
              tabTitle: "DAY 01 // THE INCURSION",
              tabSub: "Chassis Alloy: V5b-71 90 // Hack Launch",
              tabStatus: "ACTIVE VECTOR",
              timeOrSpecs: "09:00 - 22:00 IST",
              secSpec: "CEREMONY & HACK LAUNCH",
              intelChip: "OPENING // ACTIVE",
              actionText: "TRANSMIT WARNING TO AVENGERS",
              actionLinks: [
                { text: "INSPECT SCHEMATICS / SYNC", href: "#sync" },
                { text: "CALIBRATE FREQUENCY", href: "#calibrate" },
                { text: "ACCESS RESTRICTED CIPHER [.PDF]", href: "#cipher" }
              ],
              blocks: [
                {
                  featured: false,
                  badge: "// SPEC: 09:00 - 11:30 IST",
                  meta: "AUDITORIUM OMEGA // MAIN SANCTUM",
                  title: "SOVEREIGN COMMENCEMENT & IMPERIAL KEYNOTE",
                  desc: "Official opening ceremony of PRAGYA 2027. Inaugural address by festival chairs, chancellor of research, and invited industry luminaries. Global broadcast stream goes hot.",
                  access: "[ ACCESS: LEVEL-01 ]",
                  status: "CONFIRMED"
                },
                {
                  featured: true,
                  badge: "// SPEC: 11:30 - 14:00 IST",
                  meta: "SECTOR 7 // INNOVATION LABS",
                  tagChip: "CORE HACK",
                  title: "HACKATHON LAUNCH: PROJECT BATTLEWORLD",
                  desc: "Unveiling of the 36-hour hackathon problem statements. Quantum sandbox provisioning, mentor sync-ops, repository initialization, and team workspace assignments.",
                  access: "[ DEV CLUSTER ]",
                  status: "36-HR MARATHON"
                },
                {
                  featured: false,
                  badge: "// SPEC: 14:30 - 17:00 IST",
                  meta: "HALL OF DIRECTIVES // CHAMBER B",
                  title: "ARCANE TECH SYMPOSIUM: AI & QUANTUM SYSTEMS",
                  desc: "Specialized tech masterclasses spanning generative AI architectures, distributed quantum algorithms, robotics swarm demos, and autonomous aerial hardware testing.",
                  access: "[ MASTERCLASS ]",
                  status: "SEATS RESTRICTED"
                },
                {
                  featured: false,
                  badge: "// SPEC: 18:00 - 22:00 IST",
                  meta: "CYBER-COLOSSEUM // ARENA 01",
                  title: "NEURAL ARENA SHOWDOWN & CODEX REVEAL",
                  desc: "Competitive algorithmic battles, live CTF qualifiers, robotics combat heats, followed by the Day 01 conclusion: the ceremonial Codex projection & synth-wave concert.",
                  access: "[ COMPETITIVE ]",
                  status: "SPECTATOR ACTIVE"
                }
              ]
            },
            {
              name: "Day 02 // Multiverse Convergence",
              tag: "DAY 02",
              tabTitle: "DAY 02 // MULTIVERSE CONVERGENCE",
              tabSub: "Phase Drift: ±0.0003 Sec // Keynotes",
              tabStatus: "STANDBY",
              timeOrSpecs: "09:30 - 23:00 IST",
              secSpec: "ROBOWARS & KEYNOTE SESSIONS",
              intelChip: "CONVERGENCE // ACTIVE",
              actionText: "TRANSMIT WARNING TO AVENGERS",
              actionLinks: [
                { text: "INSPECT SCHEMATICS / SYNC", href: "#sync" },
                { text: "CALIBRATE FREQUENCY", href: "#calibrate" },
                { text: "ACCESS RESTRICTED CIPHER [.PDF]", href: "#cipher" }
              ],
              blocks: [
                {
                  featured: true,
                  badge: "// SPEC: 09:30 - 13:30 IST",
                  meta: "STEEL PIT // ARENA 1",
                  tagChip: "ARENA COMBAT",
                  title: "ROBOWARS 60KG HEAVYWEIGHT ELIMINATORS",
                  desc: "Full-contact kinetic clashing. Hardox-armored spinners, pneumatics, and carbide blades clash inside the bulletproof Lexan containment zone.",
                  access: "[ ACCESS: HAZARDOUS ]",
                  status: "CONFIRMED"
                },
                {
                  featured: false,
                  badge: "// SPEC: 14:00 - 17:00 IST",
                  meta: "INCUBATION FORUM // AUDI 2",
                  title: "EVENTURE ANGEL SYNDICATE & LIGHTNING PITCH STAGE",
                  desc: "Top 15 collegiate tech startups deliver rapid 3-minute pitches to venture capitalists and angel investors competing for ₹25 Lakhs seed capital.",
                  access: "[ ACCESS: LEVEL-02 ]",
                  status: "CONFIRMED"
                },
                {
                  featured: false,
                  badge: "// SPEC: 17:30 - 19:30 IST",
                  meta: "CCF LABS // SPRINT ARENA",
                  title: "CODE BLITZ ALGORITHMIC DUEL — SEMIFINALS",
                  desc: "High-speed speed coding rounds testing optimal sub-second runtime performance under extreme memory constraints and adversarial test suites.",
                  access: "[ ACCESS: OPEN ]",
                  status: "CONFIRMED"
                },
                {
                  featured: false,
                  badge: "// SPEC: 20:00 - 23:00 IST",
                  meta: "OPEN AMPHITHEATER // BROADCAST",
                  title: "COSMIC KEYNOTE & MULTIVERSE SYMPHONY",
                  desc: "Celebrity keynotes from deep-tech pioneers followed by visual projection mapping on the central dome.",
                  access: "[ BROADCAST ]",
                  status: "CONFIRMED"
                }
              ]
            },
            {
              name: "Day 03 // Battleworld Protocol",
              tag: "DAY 03",
              tabTitle: "DAY 03 // BATTLEWORLD PROTOCOL",
              tabSub: "Cipher Entropy: Restricted // Grand Finale",
              tabStatus: "CLASSIFIED",
              timeOrSpecs: "10:00 - 22:30 IST",
              secSpec: "GRAND FINALS & VALEDICTION",
              intelChip: "FINALE // ACTIVE",
              actionText: "TRANSMIT WARNING TO AVENGERS",
              actionLinks: [
                { text: "INSPECT SCHEMATICS / SYNC", href: "#sync" },
                { text: "CALIBRATE FREQUENCY", href: "#calibrate" },
                { text: "ACCESS RESTRICTED CIPHER [.PDF]", href: "#cipher" }
              ],
              blocks: [
                {
                  featured: true,
                  badge: "// SPEC: 10:00 - 13:30 IST",
                  meta: "STEEL ARENA // CAGE A",
                  tagChip: "CHAMPIONSHIP",
                  title: "ROBOWARS ULTIMATE SHOWDOWN & GRAND FINALE",
                  desc: "The surviving heavyweight titans battle in the final championship rumble for institutional glory and national accolades.",
                  access: "[ ACCESS: ARENA ]",
                  status: "CONFIRMED"
                },
                {
                  featured: false,
                  badge: "// SPEC: 14:00 - 16:30 IST",
                  meta: "MAIN SANCTUM // JURY PANEL",
                  title: "HACKATHON FINAL JURY EVALUATION & REVEAL",
                  desc: "Top 10 shortlisted squads pitch working prototypes to CTOs and defense researchers. Code commits locked.",
                  access: "[ ACCESS: JURY ]",
                  status: "CONFIRMED"
                },
                {
                  featured: false,
                  badge: "// SPEC: 17:00 - 20:00 IST",
                  meta: "AUDITORIUM OMEGA // MAIN STAGE",
                  title: "IMPERIAL VALEDICTORY & PRAGYA 2027 TROPHY PROTOCOL",
                  desc: "Felicitation of winners across all 10 festival categories, distribution of cash awards, and the grand culmination address.",
                  access: "[ ACCESS: ALL ]",
                  status: "CONFIRMED"
                },
                {
                  featured: false,
                  badge: "// SPEC: 20:30 - 22:30 IST",
                  meta: "CAMPUS ESPLANADE // STAGE 0",
                  title: "CHRONO DISSOLUTION & CELEBRATION CONCERT",
                  desc: "The incursion tethers close with an electrifying EDM and synth-wave festival performance.",
                  access: "[ ACCESS: ALL ]",
                  status: "OPEN"
                }
              ]
            }
          ]
        },
        {
          code: "SEC-06",
          title: "Gallery",
          subtitle: "INC-006 // VISUAL SURVEILLANCE",
          codename: "VISUAL SURVEILLANCE",
          threat: "CAT-1 // INTEL",
          statusWord: "INTEL",
          desc: "Declassified photographic archives and footage from previous editions of PRAGYA and live feeds from the current staging zones.",
          subs: [
            {
              name: "Arena Combat Archives",
              tag: "COMBAT",
              timeOrSpecs: "1000 FPS TELEMETRY STILLS",
              secSpec: "DE-CLASSIFIED FOOTAGE",
              summary: "High-speed photography of metal impacts, pneumatic flips, and kinetic blade collisions.",
              actionText: "LAUNCH ARCHIVE",
              blocks: [
                {
                  featured: true,
                  badge: "// SPEC: HIGH-SPEED TELEMETRY",
                  tagChip: "INTEL STILLS",
                  meta: "STEEL PIT ENCLOSURE",
                  title: "Kinetic Impacts & Fragment Trajectory Captures",
                  desc: "Photographic series capturing high-energy spark bursts, titanium armor shearing, and pneumatic launches at micro-second exposure times.",
                  access: "ACCESS: PUBLIC",
                  status: "OPEN"
                }
              ]
            },
            {
              name: "Hackathon Night Warfare",
              tag: "DEVELOPERS",
              timeOrSpecs: "03:00 AM COLD SPRINT RECORDS",
              secSpec: "LABORATORY INTEL",
              summary: "Developers immersed in deep architectural focus, dual-monitor arrays, and algorithmic whiteboards.",
              actionText: "BROWSE REEL",
              blocks: [
                {
                  featured: true,
                  badge: "// SPEC: CODE WARFARE REEL",
                  tagChip: "NIGHT SPRINT",
                  meta: "CCF LABS COMPLEX",
                  title: "Midnight Architectural Breakthroughs",
                  desc: "Candid photo chronicles of squads building through the 36-hour sprint, debugging neural model weights and hardware micro-controller pinouts.",
                  access: "ACCESS: PUBLIC",
                  status: "OPEN"
                }
              ]
            }
          ]
        },
        {
          code: "SEC-07",
          title: "eVenture",
          subtitle: "INC-007 // VENTURE CATALYST",
          codename: "VENTURE CATALYST",
          threat: "CAT-3 // COMMERCIAL",
          statusWord: "COMMERCIAL",
          desc: "The entrepreneurial epicenter connecting student startups, visionary founders, seed investors, and venture capitalists.",
          subs: [
            {
              name: "Elevator Pitch Arena",
              tag: "PITCH",
              timeOrSpecs: "3 MINUTES — ANGEL PANEL",
              secSpec: "25L SEED FUND POOL",
              summary: "Founders deliver rapid-fire pitches to an esteemed panel of VC partners and angel syndicate leads.",
              actionText: "SUBMIT DECK",
              blocks: [
                {
                  featured: true,
                  badge: "// SPEC: 3-MINUTE PITCH PROTOCOL",
                  tagChip: "SEED ARENA",
                  meta: "INCUBATION AUDITORIUM",
                  title: "Seed Capital Syndicate & Term Sheet Offers",
                  desc: "Early-stage deeptech, robotics, and SaaS student ventures present product-market fit metrics, revenue trajectories, and patent defensibility to a panel of accredited angels.",
                  access: "ACCESS: LEVEL-02",
                  status: "CONFIRMED"
                }
              ]
            },
            {
              name: "Talent & Internship Expo",
              tag: "RECRUIT",
              timeOrSpecs: "50+ TECH STARTUPS",
              secSpec: "ON-SPOT PORTFOLIO AUDITS",
              summary: "Direct walk-in interviews and portfolio reviews for high-growth tech internships and early engineering roles.",
              actionText: "DROP RESUME",
              blocks: [
                {
                  featured: true,
                  badge: "// SPEC: TECHNICAL RECRUITING",
                  tagChip: "TALENT EXPO",
                  meta: "CAREER PLAZA",
                  title: "Direct Engineering Interviews & Core Roles",
                  desc: "Fast-track technical interviews for AI engineers, embedded systems programmers, backend architects, and mechanical CAD specialists.",
                  access: "ACCESS: OPEN",
                  status: "CONFIRMED"
                }
              ]
            }
          ]
        },
        {
          code: "SEC-08",
          title: "FAQ",
          subtitle: "INC-008 // QUERY INTERFACE",
          codename: "QUERY INTERFACE",
          threat: "CAT-1 // GUIDELINES",
          statusWord: "GUIDELINES",
          desc: "Operational briefs, registration guidelines, accommodation protocols, and rules of engagement for all participants.",
          subs: [
            {
              name: "General & Registration FAQ",
              tag: "FAQ",
              timeOrSpecs: "OPERATIONAL DIRECTIVES",
              secSpec: "DELEGATE HELP DESK",
              summary: "Eligibility, team composition, cross-college rules, and festival entry requirements.",
              actionText: "VERIFY CREDENTIALS",
              blocks: [
                {
                  isFaq: true,
                  featured: true,
                  badge: "// FAQ: ELIGIBILITY & ROSTER",
                  meta: "RULES CODEX",
                  title: "Who is eligible to compete in PRAGYA 2027?",
                  desc: "Any student actively enrolled in a recognized school, polytechnic, undergraduate, or postgraduate program holding a valid student ID card is eligible across all events.",
                  access: "ACCESS: PUBLIC",
                  status: "OPEN"
                },
                {
                  isFaq: true,
                  featured: false,
                  badge: "// FAQ: CROSS-COLLEGE SQUADS",
                  meta: "RULES CODEX",
                  title: "Can squads consist of members from different colleges?",
                  desc: "Yes! Flagship events including the 36-Hour Hackathon and RoboWars Heavyweight allow cross-institutional collaboration with no penalty.",
                  access: "ACCESS: PUBLIC",
                  status: "OPEN"
                },
                {
                  isFaq: true,
                  featured: false,
                  badge: "// FAQ: CAMPUS LODGING",
                  meta: "HOSPITALITY PROTOCOL",
                  title: "Is residential accommodation provided on the campus?",
                  desc: "Yes. Separate well-equipped hostel facilities for male and female delegates are available on campus with pre-booking, including meals and transport shuttles.",
                  access: "ACCESS: PUBLIC",
                  status: "OPEN"
                }
              ]
            }
          ]
        },
        {
          code: "SEC-09",
          title: "Sponsors",
          subtitle: "INC-009 // SYNDICATE ALLIANCE",
          codename: "SYNDICATE ALLIANCE",
          threat: "CAT-2 // ALLIED",
          statusWord: "ALLIED",
          desc: "Industry leaders, cloud computing titans, and global hardware conglomerates fueling the PRAGYA 2027 ecosystem.",
          subs: [
            {
              name: "Syndicate Alliance Partners",
              tag: "PARTNERS",
              timeOrSpecs: "TITLE & PLATINUM PATRONS",
              secSpec: "GLOBAL TECH ECOSYSTEM",
              summary: "Leading tech firms providing compute credits, hardware evaluation kits, cash bounties, and direct recruitment.",
              actionText: "BECOME A SPONSOR",
              blocks: [
                {
                  featured: true,
                  badge: "// SPEC: COMPUTING & CLOUD INFRASTRUCTURE",
                  tagChip: "TITLE PATRON",
                  meta: "ALLIED ENTERPRISE",
                  title: "Global Cloud & AI Compute Syndicate",
                  desc: "Supplying GPU cluster credits, model fine-tuning compute, and developer API vouchers for all Hackathon participants.",
                  access: "ACCESS: VERIFIED",
                  status: "CONFIRMED"
                },
                {
                  featured: false,
                  badge: "// SPEC: HARDWARE & SENSOR TOOLING",
                  meta: "HARDWARE LABS",
                  title: "Robotics Precision Components & 3D Prototyping",
                  desc: "Providing high-torque brushless motors, ESCs, carbon sheets, and rapid additive manufacturing facilities inside the pit area.",
                  access: "ACCESS: VERIFIED",
                  status: "CONFIRMED"
                }
              ]
            }
          ]
        },
        {
          code: "SEC-10",
          title: "Guests",
          subtitle: "INC-010 // DIGNITARIES",
          codename: "DIGNITARIES",
          threat: "CAT-1 // DIGNITARY",
          statusWord: "DIGNITARY",
          desc: "Distinguished scientists, defense technologists, aerospace engineers, and visionaries addressing the convocation.",
          subs: [
            {
              name: "Keynote Dignitaries",
              tag: "DIGNITARIES",
              timeOrSpecs: "PLENARY KEYNOTES & COLLOQUIA",
              secSpec: "CONVOCATION STAGE",
              summary: "National research directors and industry pioneers sharing frontier perspectives on aerospace and artificial intelligence.",
              actionText: "RESERVE SEAT",
              blocks: [
                {
                  featured: true,
                  badge: "// SPEC: PLENARY KEYNOTE",
                  tagChip: "DEFENSE TECH",
                  meta: "AUDITORIUM A // 10:00 IST",
                  title: "Chief Aerospace & Autonomous Systems Scientist",
                  desc: "Pioneering discourse on autonomous aerial interception, fly-by-wire fault recovery, and quantum encrypted satellite constellations.",
                  access: "ACCESS: DELEGATES",
                  status: "CONFIRMED"
                },
                {
                  featured: false,
                  badge: "// SPEC: SPECIAL LECTURE",
                  meta: "AUDITORIUM B // 15:00 IST",
                  title: "Frontier Neuromorphic Silicon Architect",
                  desc: "Deep exploration of sub-watt edge reasoning chips, bio-mimetic spike neural networks, and tactile sensor integration for advanced humanoid robotics.",
                  access: "ACCESS: DELEGATES",
                  status: "CONFIRMED"
                }
              ]
            }
          ]
        }
      ];

      // Active state
      let activeSectionIdx = 4; // Schedule (SEC-05) default
      let activeSubIdx = 0;
      let typewriterTimer = null;
      let threatBarTimer = null;

      // Typewriter utility for spec pill
      function typeSpecText(element, text) {
        if (!element) return;
        if (typewriterTimer) clearInterval(typewriterTimer);
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          element.textContent = text;
          return;
        }
        element.textContent = '';
        let i = 0;
        typewriterTimer = setInterval(() => {
          element.textContent += text.charAt(i);
          i++;
          if (i >= text.length) {
            clearInterval(typewriterTimer);
            typewriterTimer = null;
          }
        }, 16);
      }

      // Animate threat percentage bar
      function animateThreat(targetPercent) {
        const valEl = document.getElementById('litThreatVal');
        const barEl = document.getElementById('litThreatBar');
        if (!valEl && !barEl) return;

        let current = 0;
        if (barEl) {
          barEl.classList.toggle('high', targetPercent >= 70);
        }
        if (threatBarTimer) clearInterval(threatBarTimer);

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          if (valEl) valEl.textContent = targetPercent + '%';
          if (barEl) barEl.style.width = targetPercent + '%';
          return;
        }

        const stepTime = 16;
        const totalSteps = 24;
        let step = 0;
        threatBarTimer = setInterval(() => {
          step++;
          const progress = Math.min(1, step / totalSteps);
          const ease = 1 - Math.pow(1 - progress, 3);
          const currentVal = Math.round(targetPercent * ease);
          if (valEl) valEl.textContent = currentVal + '%';
          if (barEl) barEl.style.width = (targetPercent * ease).toFixed(1) + '%';
          if (step >= totalSteps) {
            clearInterval(threatBarTimer);
            threatBarTimer = null;
          }
        }, stepTime);
      }

      // Render info cards stack for the selected sub
      function renderCardsStack(sub) {
        const stackEl = document.getElementById('litDetailDossier');
        if (!stackEl) return;

        // Apply 200ms glitch-fade transition
        stackEl.classList.add('dz2-glitch-fade');
        setTimeout(() => {
          stackEl.innerHTML = '';
          const blocks = sub.blocks && sub.blocks.length ? sub.blocks : [
            {
              featured: true,
              badge: `// SPEC: ${sub.timeOrSpecs || 'ACTIVE'}`,
              tagChip: sub.tag || 'SPEC',
              meta: sub.secSpec || 'SECURE NODE',
              title: sub.name,
              desc: sub.summary || sub.details || 'Specification verified and monitored under Latverian protocol.',
              access: 'ACCESS: LEVEL-01',
              status: 'CONFIRMED'
            }
          ];

          blocks.forEach((blk, idx) => {
            const isFeatured = blk.featured || (idx === 0);
            const card = document.createElement('article');
            card.className = `dz2-card${isFeatured ? ' featured' : ''} dz2-enter`;
            card.style.animationDelay = `${idx * 70}ms`;

            if (blk.isFaq) {
              card.innerHTML = `
                <div class="dz2-card-row1">
                  <div class="dz2-card-left">
                    <span class="dz2-spec-badge">${blk.badge || '// SPEC: FAQ'}</span>
                    <span class="dz2-card-meta">${blk.meta || 'QUERY'}</span>
                  </div>
                  <div class="dz2-card-right">
                    <span class="dz2-access-lvl">${blk.access || 'ACCESS: PUBLIC'}</span>
                    <span class="dz2-card-status">${blk.status || 'OPEN'}</span>
                  </div>
                </div>
                <div class="dz2-accordion-item open">
                  <div class="dz2-accordion-hdr">
                    <h3 class="dz2-card-title">${blk.title}</h3>
                    <span class="dz2-accordion-marker">−</span>
                  </div>
                  <p class="dz2-accordion-body" style="display:block;">${blk.desc}</p>
                </div>
              `;
              const hdr = card.querySelector('.dz2-accordion-hdr');
              const body = card.querySelector('.dz2-accordion-body');
              const marker = card.querySelector('.dz2-accordion-marker');
              if (hdr && body && marker) {
                hdr.addEventListener('click', () => {
                  const isOpen = body.style.display !== 'none';
                  body.style.display = isOpen ? 'none' : 'block';
                  marker.textContent = isOpen ? '+' : '−';
                });
              }
            } else {
              card.innerHTML = `
                <div class="dz2-card-row1">
                  <div class="dz2-card-left">
                    <span class="dz2-spec-badge">${blk.badge || `// SPEC: ${sub.timeOrSpecs}`}</span>
                    <span class="dz2-card-meta">${blk.meta || 'STAGING ZONE'}</span>
                    ${blk.tagChip ? `<span class="dz2-tag-chip">${blk.tagChip}</span>` : ''}
                  </div>
                  <div class="dz2-card-right">
                    <span class="dz2-access-lvl">${blk.access || 'ACCESS: LEVEL-01'}</span>
                    <span class="dz2-card-status ${blk.status === 'RESTRICTED' || blk.status === 'SEATS RESTRICTED' ? 'restricted' : ''}">${blk.status || 'CONFIRMED'}</span>
                  </div>
                </div>
                <h3 class="dz2-card-title">${blk.title}</h3>
                <p class="dz2-card-desc">${blk.desc}</p>
              `;
            }
            stackEl.appendChild(card);
          });

          stackEl.classList.remove('dz2-glitch-fade');
        }, 150);
      }

      // Select a sub tab
      function selectSub(subIdx) {
        const item = DOSSIER_ITEMS[activeSectionIdx];
        if (!item || !item.subs || !item.subs[subIdx]) return;
        activeSubIdx = subIdx;
        const sub = item.subs[subIdx];

        // Update tab button states
        const tabs = document.querySelectorAll('#litSubList .dz2-sub-tab');
        tabs.forEach((tab, idx) => {
          const isActive = (idx === subIdx);
          tab.classList.toggle('active', isActive);
          tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
          const s = item.subs[idx];
          const statusEl = tab.querySelector('.dz2-tab-status');
          if (statusEl) {
            statusEl.textContent = `[ ${isActive ? 'ACTIVE VECTOR' : (s.tabStatus || 'STANDBY')} ]`;
          }
          const dotEl = tab.querySelector('.dz2-tab-dot');
          if (dotEl) {
            dotEl.textContent = isActive ? '◆' : '•';
          }
        });

        // Update scrubber fill width
        const scrubberFill = document.getElementById('litScrubberFill');
        if (scrubberFill && item.subs.length > 0) {
          const pct = ((subIdx + 1) / item.subs.length) * 100;
          scrubberFill.style.width = `${pct.toFixed(1)}%`;
        }

        // Update Intel Specification header chip
        const detailTag = document.getElementById('litDetailTag');
        if (detailTag) detailTag.textContent = sub.intelChip ? sub.intelChip : `${sub.tag || 'OPENING'} // ACTIVE`;

        // Update Sub Headline & Spec Pill
        const detailName = document.getElementById('litDetailName');
        if (detailName) detailName.textContent = sub.name;

        const detailSpecsText = document.getElementById('litDetailSpecsText');
        if (detailSpecsText) typeSpecText(detailSpecsText, sub.timeOrSpecs);

        const detailSpecsSec = document.getElementById('litDetailSpecsSec');
        if (detailSpecsSec) detailSpecsSec.textContent = sub.secSpec || sub.tag || 'SECTOR SECURE';

        // Update action links in utilities row
        const utilLinksContainer = document.getElementById('litUtilLinks');
        if (utilLinksContainer) {
          if (sub.actionLinks && sub.actionLinks.length) {
            utilLinksContainer.innerHTML = sub.actionLinks.map(l => `
              <a href="${l.href || '#'}" class="dz2-util-link"><span class="dz2-green-bullet">■</span> ${l.text}</a>
            `).join('<span class="dz2-util-sep"></span>');
          } else {
            utilLinksContainer.innerHTML = `
              <button class="dz2-util-btn" id="litActionBtn">
                <span class="dz2-green-bullet">■</span>
                <span id="litActionBtnText">${sub.actionText || 'TRANSMIT WARNING TO AVENGERS'}</span>
              </button>
              <span class="dz2-util-sep"></span>
              <a href="#rules" class="dz2-util-link"><span class="dz2-green-bullet">■</span> PROTOCOL RULES</a>
              <span class="dz2-util-sep"></span>
              <a href="#telemetry" class="dz2-util-link"><span class="dz2-green-bullet">■</span> SATELLITE TELEMETRY</a>
            `;
          }
        }

        // Render info cards stack for this sub
        renderCardsStack(sub);

        // Animate threat bar with consistent seeded calculation
        const targetThreat = 45 + ((activeSectionIdx * 19 + subIdx * 27) % 52);
        animateThreat(targetThreat);
      }

      // Render the complete Schedule Dossier reference inside #litPlate
      function renderScheduleDossier(sectionIdx) {
        if (sectionIdx < 0 || sectionIdx >= DOSSIER_ITEMS.length) sectionIdx = 4;
        activeSectionIdx = sectionIdx;
        activeSubIdx = 0;
        const item = DOSSIER_ITEMS[sectionIdx];

        // 1. Pinned Header
        const heroCode = document.getElementById('litHeroCode');
        if (heroCode) heroCode.textContent = item.code;
        const heroSub = document.getElementById('litHeroSub');
        if (heroSub) heroSub.textContent = item.subtitle;

        // 2. Hero Section
        const heroSubCodename = document.getElementById('litHeroSubCodename');
        if (heroSubCodename) heroSubCodename.textContent = item.codename;
        const heroTitle = document.getElementById('litHeroTitle');
        if (heroTitle) heroTitle.textContent = item.title;
        const heroThreat = document.getElementById('litHeroThreat');
        if (heroThreat) heroThreat.textContent = item.threat;

        // 3. Directive Banner
        const masterTag = document.getElementById('litMasterTag');
        if (masterTag) masterTag.textContent = item.threat;
        const masterDesc = document.getElementById('litMasterDesc');
        if (masterDesc) masterDesc.textContent = item.desc;

        // 4. Vector Selector & Tabs
        const selectorEl = document.getElementById('litVectorSelector');
        const scrubberWrap = document.getElementById('litScrubberWrap');
        const subList = document.getElementById('litSubList');
        const phaseCount = document.getElementById('litPhaseCount');

        const subsCount = item.subs ? item.subs.length : 0;
        if (subsCount <= 1) {
          if (selectorEl) selectorEl.style.display = 'none';
          if (scrubberWrap) scrubberWrap.style.display = 'none';
        } else {
          if (selectorEl) selectorEl.style.display = 'flex';
          if (scrubberWrap) scrubberWrap.style.display = 'flex';
          if (phaseCount) phaseCount.textContent = `${subsCount} PHASES REGISTERED`;
        }

        if (subList) {
          subList.innerHTML = '';
          subList.className = `dz2-sub-grid${subsCount <= 3 ? ' cols-3' : ''}`;
          if (item.subs && item.subs.length) {
            item.subs.forEach((sub, sIdx) => {
              const btn = document.createElement('button');
              btn.type = 'button';
              btn.className = `dz2-sub-tab${sIdx === 0 ? ' active' : ''}`;
              btn.setAttribute('role', 'tab');
              btn.setAttribute('aria-selected', sIdx === 0 ? 'true' : 'false');
              btn.innerHTML = `
                <div class="dz2-tab-top">
                  <span class="dz2-tab-status">[ ${sIdx === 0 ? 'ACTIVE VECTOR' : (sub.tabStatus || 'STANDBY')} ]</span>
                  <span class="dz2-tab-dot">${sIdx === 0 ? '◆' : '•'}</span>
                </div>
                <div class="dz2-tab-title">${sub.tabTitle || `${sub.tag} // ${sub.name.split('//')[0].trim()}`}</div>
                <div class="dz2-tab-sub">${sub.tabSub || sub.timeOrSpecs}</div>
                <div class="dz2-tab-bar"></div>
              `;
              btn.addEventListener('click', () => {
                selectSub(sIdx);
              });
              subList.appendChild(btn);
            });
          }
        }

        // Trigger Sub 0
        selectSub(0);

        // Header and Body Staggered Entrance
        const bodyEl = document.querySelector('.dz2-body');
        if (bodyEl) {
          bodyEl.scrollTop = 0;
        }
      }

      // Hook into card clicks and modal openings
            document.addEventListener('click', (e) => {
        const rail = e.target.closest('.sec[data-card-idx]');
        window.__railOpen = !!rail;
        if (rail) {
          const idx = parseInt(rail.dataset.cardIdx, 10);
          if (!isNaN(idx)) {
            requestAnimationFrame(() => {
              renderScheduleDossier(idx);
            });
          }
        }
      }, true);

      // Listen for body.lit mutations (when opened by FLIP engine)
      let wasLit = document.body.classList.contains('lit');
      const observer = new MutationObserver(() => {
        const isLit = document.body.classList.contains('lit');
        if (isLit && !wasLit) {
          const litIdx = parseInt(document.body.dataset.litIdx, 10);
          renderScheduleDossier(isNaN(litIdx) ? activeSectionIdx : litIdx);
        }
        wasLit = isLit;
      });
      observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

      // Keyboard navigation: ArrowUp, ArrowDown, Escape
      window.addEventListener('keydown', (e) => {
                   if (document.body.classList.contains('lit') && window.__railOpen) return;
        if (e.target.closest && e.target.closest('input, textarea, select, [contenteditable="true"]')) return;
        if (!window.__railOpen) return;
        const item = DOSSIER_ITEMS[activeSectionIdx];
        if (!item || !item.subs || item.subs.length <= 1) return;

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          const next = (activeSubIdx + 1) % item.subs.length;
          selectSub(next);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          const prev = (activeSubIdx - 1 + item.subs.length) % item.subs.length;
          selectSub(prev);
        }
      });

      // Transmit warning button toast action
      document.addEventListener('click', (e) => {
        const btn = e.target.closest('#litActionBtn');
        if (btn) {
          const toast = document.getElementById('dzToast');
          if (toast) {
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 2400);
          }
          const textEl = document.getElementById('litActionBtnText');
          if (textEl && !btn.dataset.busy) {
            btn.dataset.busy = '1';
            const orig = textEl.textContent;
            textEl.textContent = 'ACCESS GRANTED // TRANSMISSION SENT';
            setTimeout(() => {
              textEl.textContent = orig;
              delete btn.dataset.busy;
            }, 2000);
          }
        }
      });

      // Initial render check
      if (document.body.classList.contains('lit')) {
        renderScheduleDossier(activeSectionIdx);
      }
    }