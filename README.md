# Nook: Your Cozy Corner for Big Ideas

Nook is a modern, full-stack web application for personal knowledge management, note-taking, and document organization. It is designed for a beautiful, fast, and collaborative user experience, leveraging the latest in React, Next.js, Convex, and modern UI/UX frameworks.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Main Features](#main-features)
- [User Flows](#user-flows)
- [Advanced Capabilities](#advanced-capabilities)
- [Development & Contribution](#development--contribution)

---

## Tech Stack

- **Frontend:** React 19, Next.js 15 (App Router, SSR/SSG, API routes)
- **Styling:** TailwindCSS, Shadcn UI, Radix UI, Lucide Icons
- **State Management:** Zustand, React Context, usehooks-ts
- **Authentication:** Clerk.dev (with ClerkProvider)
- **Database & Backend:** Convex (serverless, real-time, type-safe)
- **File Storage:** EdgeStore (for cover images, file uploads)
- **Rich Text Editor:** BlockNote (with image upload integration)
- **Notifications:** Sonner
- **Other:** SWR, Zod, Emoji Picker, Next Themes (dark/light mode)

---

## Project Structure

- `app/` — Next.js App Router pages, layouts, and route groups
  - `(landing)/` — Public landing page and marketing
  - `(main)/` — Main authenticated app (documents, navigation, trash, etc.)
  - `(public)/` — Public document sharing routes
- `components/` — UI components (toolbar, modals, editor, buttons, etc.)
- `convex/` — Convex backend functions, schema, and data model
- `hooks/` — Custom React hooks (settings, search, scroll, cover image, etc.)
- `lib/` — Utility functions and EdgeStore provider
- `public/` — Static assets (images, icons, favicons)

---

## Main Features

- **Authentication:** Secure sign-in/sign-up with Clerk
- **Document Creation:** Create, edit, and organize notes/pages in a nested tree
- **Rich Text Editing:** BlockNote editor with support for text, images, and formatting
- **Cover Images:** Upload, change, or remove cover images for documents (EdgeStore integration)
- **Emoji/Icon Picker:** Add custom icons to documents using an emoji picker
- **Sidebar Navigation:** Hierarchical, collapsible sidebar for document navigation
- **Trash & Restore:** Soft-delete (archive) documents, restore or permanently delete from Trash
- **Search:** Command palette (Ctrl+K) for fast document search and navigation
- **Document Sharing:** Publish notes to the web with a public URL; unpublish at any time
- **Dark/Light Mode:** User-selectable theme with system preference support
- **Settings Modal:** User preferences and appearance settings
- **Notifications:** Toasts for all major actions (create, delete, publish, upload, etc.)
- **Accessibility:** Keyboard navigation, ARIA roles, focus management, and accessible UI components

---

## User Flows

### 1. **Authentication**

- Users must sign in via Clerk to access the main app.
- Unauthenticated users see a landing page with marketing and sign-in options.

### 2. **Document Management**

- Create a new note from the dashboard or sidebar.
- Edit the note title inline, add content with the rich text editor.
- Organize notes in a nested (parent/child) structure.
- Add icons and cover images for visual organization.

### 3. **Trash & Restore**

- Delete (archive) notes to move them to Trash.
- Restore or permanently delete notes from Trash.
- "Empty Trash" to delete all trashed notes at once.

### 4. **Search & Navigation**

- Use the sidebar to browse and expand/collapse document trees.
- Use the command palette (Ctrl+K) to search and jump to any note.

### 5. **Document Sharing**

- Publish any note to generate a public, shareable URL.
- Unpublish to make the note private again.

### 6. **Customization & Settings**

- Toggle dark/light mode.
- Access settings modal for appearance and other preferences.

---

## Advanced Capabilities

- **Real-Time Data:** All document changes are synced in real-time via Convex.
- **File Uploads:** Cover images and editor images are uploaded and managed via EdgeStore.
- **Rich Editor:** BlockNote provides a Notion-like editing experience, including image uploads.
- **Emoji Picker:** Add expressive icons to notes for quick visual identification.
- **Accessibility:** All interactive elements are keyboard-accessible and screen-reader friendly.
- **Responsive Design:** Fully responsive for desktop and mobile devices.

---

## Development & Contribution

### Getting Started

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
2. Set up environment variables for Clerk, Convex, and EdgeStore (see `.env.example` if present).
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Scripts

- `npm run dev` — Start the development server
- `npm run build` — Build for production
- `npm run start` — Start the production server
- `npm run lint` — Run ESLint

### Deployment

- Deploys seamlessly to [Vercel](https://vercel.com/)
- Uses serverless functions and edge storage for scalability

---

## License

This project is for educational and personal use. See LICENSE file if present.
