# writespace

A modern writing platform built with React 18, Vite, and Tailwind CSS.

## Overview

**writespace** is a modern, minimal writing space for creators, writers, and teams. It features a distraction-free editor, real-time collaboration, role-based access, and a clean, responsive UI. All data is persisted in localStorage for easy prototyping and local use.

## Features

- Public landing page with hero, features, latest posts, and footer
- Authentication: Login and registration with validation and error handling
- Role-based access: Admin and writer roles, protected routes, session management
- Blog post CRUD: Create, read, update, delete posts with ownership and role checks
- Admin dashboard: Statistics, recent posts, recent users, and quick actions
- User management: Admin-only user list, create, delete, and role assignment
- Responsive design and dark mode support
- Reusable UI components: Navbar, BlogCard, Avatar, StatCard, UserRow, ProtectedRoute, PublicNavbar
- LocalStorage-based data persistence for posts, users, and sessions
- Loading and error states for all async operations
- Unit tests for storage and auth utilities, and core UI components

## Tech Stack

- [React 18](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router v6](https://reactrouter.com/)
- [Vitest](https://vitest.dev/) for unit testing

## Getting Started

### Prerequisites

- Node.js v18 or newer
- npm v9 or newer

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

### Testing

Run all unit tests:

```bash
npm test
```

## Folder Structure

```
writespace/
├── src/
│   ├── components/         # Reusable UI components
│   ├── pages/              # Route/page components
│   ├── utils/              # Utility functions (auth, storage)
│   ├── main.jsx            # App entry point
│   ├── App.jsx             # App router and layout
│   └── index.css           # Tailwind base styles
├── public/
│   └── favicon.svg
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── README.md
```

## Usage

- Visit the landing page at `/`
- Register a new account or login as:
  - **Admin:**  
    Email: `admin@writespace.com`  
    Password: `admin123`
  - **Writer:**  
    Email: `writer@writespace.com`  
    Password: `writer123`
- Explore the dashboard, create/edit posts, manage users (admin only), and more.

## Customization

- All data (users, posts, session) is stored in browser localStorage.
- To reset data, clear your browser's localStorage for the site.
- To add more roles or features, extend the components and utilities in `src/`.

## License

This project is **private** and not licensed for public or commercial use.

---

&copy; 2024 writespace. All rights reserved.