// Project registry. Add a new project by appending an object to this array.
// All fields except `id` and `title` are optional — the UI gracefully handles
// missing thumbnails, links, and tags. See README.md → "How to Add a New Project".

export const projects = [
  {
    id: 'triprescue-ai',
    title: 'TripRescue AI',
    description:
      'An AI-focused travel assistance project created for a hackathon. Built quickly under time pressure to explore practical uses of AI in travel safety.',
    longDescription:
      'TripRescue AI is a hackathon-built web application exploring how AI can assist travellers. The project focuses on rapid, practical assistance for travel scenarios. Capabilities are intentionally kept editable here so the description can be refined as the project evolves.',
    category: 'AI / Web Application',
    technologies: ['React', 'AI', 'JavaScript', 'Vite'],
    thumbnail: '/projects/triprescue-ai/thumbnail.webp',
    githubUrl: 'https://github.com/Nagarajjkh/triprescue-ai.git',
    liveUrl: 'https://triprescue-devhack.netlify.app/',
    featured: true,
    status: 'Hackathon Build',
  },
  {
    id: 'kalasetu-art',
    title: 'KalaSetu Art',
    description:
      'A website project exploring art and digital presentation, built to experiment with layout, imagery, and storytelling on the web.',
    longDescription:
      'KalaSetu Art is a web project exploring how art and digital presentation can come together online. It experiments with layout, imagery, and narrative to present creative work in a thoughtful way.',
    category: 'Web Development',
    technologies: ['React', 'CSS', 'JavaScript'],
    thumbnail: '/projects/kalasetu-art/thumbnail.webp',
    githubUrl: 'https://github.com/Nagarajjkh/kalasetu-art.git',
    liveUrl: 'https://kalasetu-art.netlify.app/',
    featured: false,
    status: 'Completed',
  },
  {
    id: 'mahakoota-heritage',
    title: 'Mahakoota Heritage Website',
    description:
      'A website presenting Mahakoota — the historic 7th-century temple complex near Badami, Karnataka — and its heritage, architecture, and visitor information in a clean, accessible layout.',
    longDescription:
      'The Mahakoota Heritage Website presents Mahakoota, the historic 7th-century temple complex near Badami in Karnataka. It brings together the site\u2019s architecture, history, and practical visitor information in a clean, accessible layout, making it easy for visitors and students to explore and find what they need.',
    category: 'Heritage / Web Development',
    technologies: ['React', 'CSS', 'JavaScript'],
    thumbnail: '/projects/mahakoota/thumbnail.svg',
    githubUrl: '',
    liveUrl: 'https://mahakoot.netlify.app/',
    featured: true,
    status: 'Completed',
  },
  {
    id: 'smart-exhaust-fan',
    title: 'Smart Exhaust Fan Dashboard',
    description:
      'A dashboard concept for monitoring environmental readings and controlling smart exhaust fan functions. Currently a concept / development project.',
    longDescription:
      'A dashboard concept for monitoring environmental readings and controlling smart exhaust fan functions. This is a concept / development project — a completed version can be confirmed later by updating this entry.',
    category: 'Smart Technology / Dashboard',
    technologies: ['Dashboard', 'IoT', 'Concept'],
    thumbnail: '/projects/smart-exhaust-fan/thumbnail.webp',
    githubUrl: '',
    liveUrl: '',
    featured: false,
    status: 'Concept',
  },
];

export const projectCategories = [
  'All',
  ...Array.from(new Set(projects.map((p) => p.category))),
];

export default projects;
