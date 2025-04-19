import type { Event } from "@/lib/types"

export const events: Event[] = [
  {
    id: "hackathon",
    title: "HackNova",
    description: "Step into the world of high-speed innovation where your creativity, logic, and teamwork will be put to the ultimate test — in just 8 hours! ",
    rules: [
    "Gather your squad of 4 to 5 tech enthusiasts.",
    "Total Development Time: 8 hours.",
    "Build everything from scratch.",
    "You can use public libraries, APIs, AI tools, and frameworks to power up your project.",
    "GitHub usage is off-limits.",
  ],
    category: "cat1",
    formUrl: "https://forms.gle/NLdLHYckW4Vsq2Pr7",
  },
  {
    id: "roboKarts",
    title: "RoboKarts",
    description: "Get ready for high-speed thrills and precision engineering! RoboKarts is a line-following robot racing challenge",
    rules: [
      "Teams of 3–4 members2 attempts to complete a black-line track on a white surface.",
      "Max size: 17 cm x 15 cm", 
      "Max weight: 750g",
    ],   
    category: "cat1",
    formUrl: "https://forms.gle/1iQR7YXfuWjux7wy9",
  },
  {
    id: "cicada",
    title: "Cicada",
    description: "Unravel secrets in a maze of mystery and tech.The hunt begins-only the sharpest will see the pattern.",
    rules: ["Team Size: 2 members",
    "Rounds: 5 increasingly challenging stages",],
    category: "cat2",
    formUrl: "https://forms.gle/qCkPevcxJJaptvLX7",
  },
  {
    id: "aiart",
    title: "Prompt+Pixel",
    description: "It’s a canvas like you’ve never seen before!! Let the machines fuel your art in a clash of creativity!",
    rules: ["Use any AI tool – but mention the one used",
            "Submit the exact prompt you used to generate the image",
            "Team Size: Solo", 
    ],
    category: "cat2",
    formUrl: "https://forms.gle/AyKFbPCzzFE9oqTc9",
  },
  {
    id: "techdebate",
    title: "Ctrl+Convince",
    description: "Where facts meet fire, and opinions collide with innovation. It’s a battle of bytes and brilliance.",
    rules: ["Team Size: 2–3 members",

      "Time Limit: 5–7 minutes per team",],
    category: "cat2",
    formUrl: "https://forms.gle/Jd5TSuuQr4bU9onw7",
  },
  {
    id: "ideathon",
    title: "PitchSpark",
    description: "Where innovation takes the mic and ideas steal the spotlight. Pitch it like it’s already changing the world.",
    rules: ["Participants will present innovative, tech-based ideas addressing:",
        "What is the problem?",
              "What is your solution?",
              "What is the business value?",
              "Team Size: 1-2 members",  
              "Single Pitching Round of Presentation- Time Limit : 7 - 10 minutes",
    ],
    category: "cat2",
    formUrl: "https://forms.gle/2JwSmCLHTcz8V1Wh8",
  },
  {
    id: "quickquery",
    title: "QuickBits",
    description: "QuickBits puts your brain on the buzzer. Only the sharpest survive this knowledge showdown.",
    rules: ["Team size: Maximum of 2 members.",

      "No use of ChatGPT, Google, or any external help.",
      
      "This is a pure test of your own knowledge—stay sharp and honest!",
    ],
    category: "cat2",
    formUrl: "https://forms.gle/z6UFifRwZCCyFV8KA",
  },
  {
    id: "blankcoding",
    title: "BrainFuel",
    description: "One glance, and it’s gone — can your brain cache the code? Welcome to the ultimate memory-meets-syntax challenge.",
    category: "cat3",
    formUrl: "null",
    registrationType: "onspot",
  },
  {
    id: "techwhisper",
    title: "Shh..Tech Only",
    description: "Music in the ears, tech on the lips, confusion in the air. It’s teamwork, tech, and total miscommunication!",
    category: "cat3",
    formUrl: "null",
    registrationType: "onspot"
  },
  {
    id: "techpictionary",
    title: "Sketch-A-Tech",
    description: "Get ready for a sketchy challenge of circuits, code, and creativity! A race against time where tech terms become your canvas.",
    category: "cat3",
    formUrl: "null",
    registrationType: "onspot"
  },
  {
    id: "techtimesup",
    title: "Head's Up",
    description: "Only clues— just confusion. From “Quantum Computing” to “404 Error” — good luck explaining that!",
    category: "cat3",
    formUrl: "null",
    registrationType: "onspot"
  },
  {
    id: "turbotyping",
    title: "KeySprint",
    description: "Crush the paragraph with flawless fingers, where speed meets accuracy. Every letter counts, every second matters.",
    category: "cat3",
    formUrl:"null",
    registrationType: "onspot",
  },
  {
    id: "turbotyping",
    title: "Puzzle Relay",
    description: "Solve puzzles in a relay of logic and speed.The clock’s ticking, and the pieces won't place themselves!",
    category: "cat3",
    formUrl:"null",
    registrationType: "onspot",
  },
  {
    id: "turbotyping",
    title: "Tambola.exe",
    description: "We swapped numbers for nerdiness — welcome to the tech edition!Cross out terms, crack up, and claim victory.",
    category: "cat3",
    formUrl:"null",
    registrationType: "onspot",
  },

  {
    id: "turbotyping",
    title:"Arcade games",
    description: "Arcade action, ticket traction, prize satisfaction!",
    category: "cat3",
    formUrl:"null",
    registrationType: "onspot",
  },

]

export const categoryNames = {
  cat1: "STREAM 1",
  cat2: "STREAM 2",
  cat3: "STREAM 3",
}

export function getEventById(id: string): Event | undefined {
  return events.find((event) => event.id === id)
}

export function getEventsByCategory(category: string): Event[] {
  return events.filter((event) => event.category === category)
}
