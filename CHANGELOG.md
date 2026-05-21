# writespace – Changelog

## v1.0.0 (2024-06-01)

### Features
- Modern writing platform built with React 18, Vite, and Tailwind CSS.
- Public landing page with hero, features, latest posts preview, and footer.
- Authentication: Login and registration forms with validation and error handling.
- Role-based access: Admin and writer roles, protected routes, and session management.
- Blog post CRUD: Create, read, update, delete posts with ownership and role checks.
- Admin dashboard: Statistics, recent posts, recent users, and quick actions.
- User management: Admin-only user list, create, delete, and role assignment.
- Responsive design and dark mode support.
- Reusable UI components: Navbar, BlogCard, Avatar, StatCard, UserRow, ProtectedRoute, PublicNavbar.
- LocalStorage-based data persistence for posts, users, and sessions.
- Loading and error states for all async operations.
- Unit tests for storage and auth utilities, and core UI components.

### Setup
- Install dependencies: `npm install`
- Start development server: `npm run dev`
- Run tests: `npm test`
- Build for production: `npm run build`

---

For more details, see the README.md.