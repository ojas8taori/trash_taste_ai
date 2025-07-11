# EcoBin - Smart Waste Management & Sustainability Companion

## Overview

EcoBin is a comprehensive waste management application that combines smart waste pickup scheduling, AI-powered waste scanning, community engagement, and sustainability tracking. The app helps users properly segregate waste, schedule pickups, earn rewards for eco-friendly behavior, and participate in community environmental initiatives.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Overall Architecture
- **Monorepo Structure**: Single repository containing both frontend and backend code
- **Frontend**: React-based single-page application with TypeScript
- **Backend**: Express.js REST API with PostgreSQL database
- **Database ORM**: Drizzle ORM for type-safe database operations
- **UI Framework**: shadcn/ui components with Tailwind CSS for styling
- **Deployment**: Replit-optimized with Vite for development and production builds

### Key Components

#### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens for consistent theming
- **Build Tool**: Vite for fast development and optimized production builds

#### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **API Design**: RESTful APIs with structured route organization
- **Database**: PostgreSQL with connection pooling via Neon serverless
- **ORM**: Drizzle ORM for type-safe database queries and migrations
- **Validation**: Zod schemas for request/response validation
- **Error Handling**: Centralized error middleware with structured responses

#### Database Schema
- **Users**: User profiles with eco-points, levels, and authentication
- **Waste Categories**: Predefined categories (organic, plastic, e-waste, hazardous) with metadata
- **Pickups**: Scheduled waste collection events with status tracking
- **Challenges**: Gamification system with daily/weekly/monthly challenges
- **User Challenges**: Progress tracking for individual challenge participation
- **Waste Scans**: AI-powered waste identification results and disposal advice
- **Community Reports**: User-submitted reports for environmental issues
- **User Stats**: Aggregated analytics for waste reduction and environmental impact

### Data Flow

1. **User Interaction**: Users interact with React components in the browser
2. **API Communication**: TanStack Query manages API calls to Express backend
3. **Request Processing**: Express routes handle requests with validation via Zod
4. **Database Operations**: Drizzle ORM executes type-safe database queries
5. **Response Handling**: Structured JSON responses with proper error handling
6. **State Updates**: React Query updates component state and triggers re-renders

### External Dependencies

#### Core Runtime Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection for serverless environments
- **drizzle-orm**: Type-safe ORM for database operations
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight routing library for React
- **zod**: Schema validation library

#### UI and Styling
- **@radix-ui/***: Comprehensive set of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Feather-inspired icon library
- **class-variance-authority**: Utility for managing conditional CSS classes

#### Development Tools
- **vite**: Fast build tool and development server
- **typescript**: Static type checking
- **drizzle-kit**: Database migration and schema management
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay

### Deployment Strategy

#### Development Environment
- **Local Development**: Vite dev server with hot module replacement
- **Database**: Neon PostgreSQL with connection pooling
- **Environment Variables**: DATABASE_URL for database connection
- **Error Handling**: Runtime error overlay for debugging

#### Production Build
- **Frontend**: Vite builds optimized React application to `dist/public`
- **Backend**: esbuild bundles Express server to `dist/index.js`
- **Static Assets**: Served directly by Express in production
- **Database Migrations**: Managed via Drizzle Kit push commands

#### Key Features Implementation
- **AI Waste Scanner**: Simulated AI service for waste identification (ready for real AI integration)
- **Pickup Scheduling**: Calendar-based system with status tracking
- **Gamification**: Point system with challenges and leaderboards
- **Community Features**: Reporting system and social engagement
- **Analytics**: Comprehensive waste tracking and environmental impact metrics
- **Mobile-First Design**: Responsive design optimized for mobile devices

The application follows modern web development best practices with type safety, scalable architecture, and user-centered design principles.