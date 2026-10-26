# Nagaraj K H — Developer Portfolio

A premium, cinematic, dark-mode developer portfolio built with React + Vite. Modular, responsive, and designed so new projects can be added by editing a single data file.

## Tech Stack

- React + Vite
- Tailwind CSS
- Custom CSS-transition "Rise & Settle" letter reveal (no external animation lib)
- Lucide React for icons
- Vanilla canvas for the "Dot Grid Warp" cursor effect

## Project Structure

```
src/
  components/        UI sections (Navbar, Hero, Projects, etc.)
  data/              Editable content: profile.js, projects.js, skills.js
  hooks/             useReveal.js (scroll reveal helper)
  pages/             ProjectDetails.jsx (project detail modal)
  styles/            animations.css (marquee, reveal, grain)
  App.tsx            Page composition
  main.tsx           Entry
public/
  favicon.svg
  projects/<slug>/   Project screenshots (thumbnail.webp)
README.md
```

## Getting Started

```bash
npm install
npm run dev      # start dev server
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Editing Your Profile

All personal content lives in `src/data/profile.js`:

- `name`, `monogram`, `roles` (hero role labels)
- `heroIntro` (hero supporting copy)
- `about` (heading, body, interests)
- `education` (degree, institution)
- `growth` (milestones)
- `contact` (email, github, linkedin)

Update the values and save. The site updates on the next reload.

### Contact placeholders

`email` and `linkedin` are intentionally empty (`''`) placeholders. Fill them
in when ready:

```js
contact: {
  email: 'your.email@example.com',
  github: 'https://github.com/Nagarajjkh',
  linkedin: 'https://www.linkedin.com/in/your-handle/',
}
```

Until then, the UI shows a disabled "Email not configured yet" pill instead
of a fake working link.

## Editing Skills

Edit `src/data/skills.js`. Each group has a `group` name and an `items` array.

```js
{ group: 'Frontend Development', items: ['HTML', 'CSS', 'React', 'Vite'] }
```

Add or remove items freely. Empty groups render as an empty card — remove the
whole object if you don't want it shown.

## How to Add a New Project

1. Take a screenshot of the website. Save it as `thumbnail.webp`.
2. Place it in `public/projects/<your-project-id>/thumbnail.webp`.
3. Open `src/data/projects.js` and add a new entry to the `projects` array:

```js
{
  id: 'my-new-project',            // unique, used in URLs/keys
  title: 'My New Project',
  description: 'A short one-line description.',
  longDescription: 'A longer paragraph for the details view.',
  category: 'Web Development',      // shows up in the filter bar
  technologies: ['React', 'CSS'],
  thumbnail: '/projects/my-new-project/thumbnail.webp',
  githubUrl: 'https://github.com/your-username/my-new-project',
  liveUrl: 'https://my-new-project.netlify.app',
  featured: false,
  status: 'Completed',
}
```

4. Save the file. The project appears automatically — no need to touch
   `ProjectCard.jsx`, `Projects.jsx`, or `App.tsx`.

### Optional fields

All of these are optional and handled gracefully:

- `thumbnail` → shows a typographic fallback preview if missing
- `githubUrl` → no GitHub button if empty/missing
- `liveUrl` → no Live Demo button if empty/missing
- `technologies` → no tag chips if empty/missing
- `longDescription` → falls back to `description`
- `featured` → shows a "Featured" badge when `true`
- `status` → shows a status pill (e.g. "Completed", "Concept", "Hackathon Build")

### Removing a project

Delete its object from the `projects` array in `src/data/projects.js`.

## Adding Screenshots

Place a `thumbnail.webp` (16:10 aspect ratio recommended) inside
`public/projects/<project-id>/`. Reference it as
`/projects/<project-id>/thumbnail.webp` in the `thumbnail` field.

Until you add a real screenshot, the card shows a tasteful typographic
fallback built from the project title.

## Updating Repository & Deployment URLs

Edit the `githubUrl` and `liveUrl` fields in `src/data/projects.js` for each
project. Leave them as empty strings (`''`) to hide the corresponding button.

## The Heading Animation ("Rise & Settle")

Headings use a custom `SpringHeading` component (`src/components/SpringHeading.jsx`)
that splits text into letters and transitions each one from opacity 0 / y +24
to opacity 1 / y 0 with an 81ms per-letter stagger. Each word is wrapped in an
`overflow: hidden` inline-block so letters rise out of / slide in from behind
the word's edge. Motion is CSS-transition based (interruptible, GPU-light).

To use it on any heading, render `<SpringHeading as="h2">YOUR TEXT</SpringHeading>`.
It respects `prefers-reduced-motion` (text appears statically). Centering uses
the `justify-center` className (the container is `display: flex`).

## The Dot Grid Warp Cursor

A vanilla canvas overlay (`src/components/DotGridCursor.jsx`) that pushes dots
away from the pointer and swells them as they flee. It:

- never hides the native cursor
- is `position: fixed; pointer-events: none; aria-hidden="true"`
- respects `prefers-reduced-motion` (renders a static grid)
- only mounts on `(hover: hover) and (pointer: fine)` pointers

## Building & Deploying

```bash
npm run build   # outputs to dist/
```

### Netlify

- **Build command:** `npm run build`
- **Publish directory:** `dist`

The Vite output goes to `dist` by default.
