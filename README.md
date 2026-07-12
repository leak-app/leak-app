# Leak App

Leak App is a personal toolkit for tracking expenses and logging outcomes. It is built as a **React Single Page Application (SPA)** that talks to a dedicated **NestJS + PostgreSQL backend**. The frontend is built with Vite and interacts with the REST API using standard HTTP requests.

## 🚀 Features

- **📊 Expense & Outcome Tracking**: Log daily spends and outcomes efficiently.
- **🐘 PostgreSQL Database**: Robust and scalable data storage.
- **🐱 NestJS Backend**: A progressive Node.js framework for efficient and scalable REST API services.
- **⚡️ Vite**: Next-generation frontend tooling for ultra-fast local development.
- **⚛️ React 19**: Latest React with modern hooks.
- **📘 TypeScript**: Static type checking for robust, maintainable code.
- **🎨 Tailwind CSS v4**: Utility-first CSS with DaisyUI.
- **🌼 DaisyUI**: Component library for Tailwind (Glassmorphism theme).
- **📝 React Hook Form**: Forms and validation (e.g. with Zod).

## 🛠️ Development Tools & Quality Assurance

- **📏 ESLint**: Pluggable JavaScript linter (Flat Config).
- **✨ Prettier**: Opinionated code formatter.
- **🐶 Husky**: Git hooks made easy.
- **🚫 lint-staged**: Run linters against staged git files.
- **💬 Commitlint**: Lint commit messages to ensure they follow Conventional Commits.

## 📦 Getting Started

### Prerequisites

- **Node.js**: Version 20 or higher (see `.nvmrc` if present).
- **npm**: Package manager (comes with Node.js).

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd leak-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

   The app will be at `http://localhost:5173`.

### Build for Production

1. **Build the frontend**:

   ```bash
   npm run build
   ```

2. **Deploy**:
   Upload the generated `dist/` directory to your static hosting platform of choice (Vercel, Netlify, Cloudflare Pages, etc.). Ensure the `VITE_BASE_API_URL` environment variable is correctly set up to point to your deployed NestJS backend. See [docs/architecture.md](docs/architecture.md) for the full architecture overview.

## 📜 Scripts

| Script    | Description                                               |
| :-------- | :-------------------------------------------------------- |
| `dev`     | Starts the Vite dev server (React in `src/`) with HMR.    |
| `build`   | TypeScript compile and Vite build into `dist/` directory. |
| `preview` | Serves the production build locally.                      |
| `lint`    | Runs `lint-staged` (ESLint + Prettier) on staged files.   |
| `prepare` | Sets up Husky git hooks.                                  |

## 🤝 Contributing

This project uses **Conventional Commits** for commit messages. Please ensure your commit messages follow the standard format:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Example: `feat(auth): add login functionality`

Common types:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc.)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

## 📄 License

This project is private and proprietary.
