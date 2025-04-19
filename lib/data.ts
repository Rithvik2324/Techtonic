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
    description: "Design and race robotic cars through an obstacle course. Test your engineering skills!",
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
    description: "Cryptic puzzle-solving challenge that tests your logical thinking and coding skills.",
    rules: ["Team Size: 2 members",
    "Rounds: 5 increasingly challenging stages",],
    category: "cat2",
    formUrl: "https://forms.gle/qCkPevcxJJaptvLX7",
  },
  {
    id: "aiart",
    title: "Prompt+Pixel",
    description: "Create stunning artwork using AI tools in this creative showdown.",
    rules: ["Use any AI tool – but mention the one used",
            "Submit the exact prompt you used to generate the image",
            "Team Size: Solo", 
    ],
    category: "cat2",
    formUrl: "https://forms.gle/AyKFbPCzzFE9oqTc9",
  },
  {
    id: "techdebate",
    title: "Ctrl+Convince(TECH DEBATE)",
    description: "Argue your stance on controversial tech topics in this heated debate competition.",
    rules: ["Team Size: 2–3 members",

      "Time Limit: 5–7 minutes per team",],
    category: "cat2",
    formUrl: "https://forms.gle/Jd5TSuuQr4bU9onw7",
  },
  {
    id: "ideathon",
    title: "PitchSpark",
    description: "Brainstorm innovative solutions to real-world problems in this idea marathon.",
      rules: ["Participants will present innovative, tech-based ideas addressing:",
        "What is the problem?",
              "What is your solution?",
              "What is the business value?",
              "Team Size: 1-2 members",  
              "Single Pitching Round of Presentation",
    ],
    category: "cat2",
    formUrl: "https://forms.gle/2JwSmCLHTcz8V1Wh8",
  },
  {
    id: "quickquery",
    title: "QuickBits",
    description: "Test your SQL and database knowledge in this fast-paced query challenge.",
    rules: ["Team size: Maximum of 2 members.",

      "No use of ChatGPT, Google, or any external help.",
      
      "This is a pure test of your own knowledge—stay sharp and honest!",
    ],
    category: "cat2",
    formUrl: "https://forms.gle/z6UFifRwZCCyFV8KA",
  },
  {
    id: "blankcoding",
    title: "Blank Coding",
    description: "Code without seeing the output until submission. Test your debugging skills!",
    longDescription: "Code without seeing the output until submission. Test your debugging skills!",
    rules: ["Individual participation",
            "No output checking until final submission",
            "Multiple programming languages allowed",
            "Time-based scoring with penalties for errors",
            "Choice of programming language",
    ],
    category: "cat3",
    formUrl: "null",
    registrationType: "onspot",
  },
  {
    id: "techwhisper",
    title: "Tech Whisper",
    description: "Communicate technical concepts without using technical terms in this fun challenge.",
    longDescription: "Communicate technical concepts without using technical terms in this fun challenge.",
    rules: ["Teams of 2 members",
            "Explain technical concepts without using technical terms",
            "Time limit for each explanation",
            "Points awarded for successful communication",
            "Multiple rounds with increasing difficulty",],
    category: "cat3",
    formUrl: "null",
    registrationType: "onspot"
  },
  {
    id: "techpictionary",
    title: "Tech Pictionary",
    description: "Draw and guess technical concepts in this visual challenge.",
    longDescription: "Draw and guess technical concepts in this visual challenge.",
    rules: ["Teams of 3-4 members",
            "Draw technical concepts for teammates to guess",
            "No words or symbols allowed in drawings",
            "Time limit for each round",
            "Points based on speed and accuracy",
    ],
    category: "cat3",
    formUrl: "null",
    registrationType: "onspot"
  },
  {
    id: "techtimesup",
    title: "Tech Time's Up",
    description: "Describe technical terms against the clock in this fast-paced word game.",
    longDescription: "Describe technical terms against the clock in this fast-paced word game.",
    rules: ["Teams of 3 members",
            "Three rounds: describe, one word, charades",
            "30 seconds per term",
            "Technical vocabulary from various domains",
            "Points for each correctly guessed term",
    ],
    category: "cat3",
    formUrl: "null",
    registrationType: "onspot"
  },
  {
    id: "turbotyping",
    title: "Turbo Typing",
    description: "Test your typing speed and accuracy in this keyboard challenge.",
    longDescription: "Test your typing speed and accuracy in this keyboard challenge.",
    rules: ["Individual participation",
            "Multiple rounds with different text types",
            "Code snippets, technical documentation, and prose",
            "Scoring based on WPM and accuracy",
            "Special characters and formatting count",
    ],
    category: "cat3",
    formUrl:"null",
    registrationType: "onspot"
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
