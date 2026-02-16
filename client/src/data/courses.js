export const courses = [
  // ==============================
  // 1️⃣ PYTHON
  // ==============================
  {
    id: 101,
    title: "Introduction to Python Programming",
    duration: "7 hours",

    modules: [
      {
        id: 1011,
        title: "Module 1: Python Fundamentals",
        progress: 100,

        lessons: [
          {
            id: 10111,
            type: "video",
            title: "Installing Python & VS Code",
            duration: 7,
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            completed: true,
          },
          {
            id: 10112,
            type: "video",
            title: "Hello World & Basic Syntax",
            duration: 10,
            videoUrl: "https://www.w3schools.com/html/movie.mp4",
            completed: true,
          },
          {
            id: 10113,
            type: "video",
            title: "Variables, Data Types, and Input",
            duration: 12,
            videoUrl:
              "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
            completed: true,
          },
          {
            id: 10114,
            type: "quiz",
            title: "Quiz: Python Basics",
            duration: 10,
            completed: true,
          },
        ],
      },
      {
        id: 1012,
        title: "Module 2: Control Flow in Python",
        progress: 100,

        lessons: [
          {
            id: 10121,
            type: "video",
            title: "If Statements",
            duration: 8,
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            completed: true,
          },
          {
            id: 10122,
            type: "video",
            title: "Loops",
            duration: 15,
            videoUrl:
              "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
            completed: true,
          },
        ],
      },
      {
        id: 1013,
        title: "Module 3: Project – Build a Simple App",
        progress: 100,

        lessons: [
          {
            id: 10131,
            type: "video",
            title: "Final Project Walkthrough",
            duration: 20,
            videoUrl: "https://www.w3schools.com/html/movie.mp4",
            completed: true,
          },
        ],
      },
    ],
  },

  // ==============================
  // 2️⃣ UI / UX DESIGN
  // ==============================
  {
    id: 102,
    title: "UI/UX Design Masterclass",
    duration: "5 hours",

    modules: [
      {
        id: 1021,
        title: "Module 1: Introduction to UI/UX",
        progress: 100,

        lessons: [
          {
            id: 10211,
            type: "video",
            title: "What is UI/UX?",
            duration: 6,
            videoUrl:
              "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
            completed: true,
          },
          {
            id: 10212,
            type: "video",
            title: "Design Principles",
            duration: 12,
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            completed: true,
          },
          {
            id: 10213,
            type: "quiz",
            title: "UI Basics Quiz",
            duration: 8,
            completed: true,
          },
        ],
      },
      {
        id: 1022,
        title: "Module 2: UX Research",
        progress: 60,

        lessons: [
          {
            id: 10221,
            type: "video",
            title: "User Personas",
            duration: 9,
            videoUrl: "https://www.w3schools.com/html/movie.mp4",
            completed: true,
          },
          {
            id: 10222,
            type: "video",
            title: "User Journey Mapping",
            duration: 11,
            videoUrl:
              "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
            completed: false,
          },
        ],
      },
      {
        id: 1023,
        title: "Module 3: Wireframing & Prototyping",
        progress: 30,

        lessons: [
          {
            id: 10231,
            type: "video",
            title: "Low Fidelity Wireframes",
            duration: 14,
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            completed: false,
          },
          {
            id: 10232,
            type: "video",
            title: "Interactive Prototypes",
            duration: 18,
            videoUrl: "https://www.w3schools.com/html/movie.mp4",
            completed: false,
          },
        ],
      },
    ],
  },

  // ==============================
  // 3️⃣ JAVASCRIPT FUNDAMENTALS
  // ==============================
  {
    id: 103,
    title: "JavaScript Fundamentals",
    duration: "6 hours",

    modules: [
      {
        id: 1031,
        title: "Module 1: JavaScript Basics",
        progress: 100,

        lessons: [
          {
            id: 10311,
            type: "video",
            title: "Variables & Data Types",
            duration: 10,
            videoUrl:
              "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
            completed: true,
          },
          {
            id: 10312,
            type: "video",
            title: "Functions & Scope",
            duration: 15,
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            completed: true,
          },
          {
            id: 10313,
            type: "quiz",
            title: "JavaScript Basics Quiz",
            duration: 10,
            completed: true,
          },
        ],
      },
      {
        id: 1032,
        title: "Module 2: DOM Manipulation",
        progress: 50,

        lessons: [
          {
            id: 10321,
            type: "video",
            title: "Selecting DOM Elements",
            duration: 12,
            videoUrl: "https://www.w3schools.com/html/movie.mp4",
            completed: true,
          },
          {
            id: 10322,
            type: "video",
            title: "Event Listeners",
            duration: 14,
            videoUrl:
              "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
            completed: false,
          },
        ],
      },
      {
        id: 1033,
        title: "Module 3: Async JavaScript",
        progress: 0,

        lessons: [
          {
            id: 10331,
            type: "video",
            title: "Callbacks & Promises",
            duration: 16,
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            completed: false,
          },
          {
            id: 10332,
            type: "video",
            title: "Async / Await",
            duration: 14,
            videoUrl: "https://www.w3schools.com/html/movie.mp4",
            completed: false,
          },
        ],
      },
    ],
  },
];
