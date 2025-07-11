# EcoBin - Smart Waste Management & Sustainability Companion

## Overview

EcoBin is a smart waste management application that combines AI-powered waste scanning with user engagement features to promote sustainable practices. The application allows users to scan waste items using their camera, receive disposal guidance, earn eco-points, and track their environmental impact.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Framework**: Radix UI components with shadcn/ui styling system
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **File Upload**: Multer for handling image uploads
- **AI Integration**: Google Gemini AI for waste image analysis

### Development Environment
- **Package Manager**: npm
- **Development Server**: Vite dev server with HMR
- **Build Process**: Vite for frontend, esbuild for backend bundling
- **Type Checking**: TypeScript with strict mode enabled

## Key Components

### Core Features
1. **AI Waste Scanner**: Camera-based waste identification using Google Gemini AI
2. **Waste Categorization**: Automatic classification into categories (Organic, Plastic, Electronic, Hazardous, etc.)
3. **Disposal Guidance**: Detailed instructions for proper waste disposal
4. **Eco-Points System**: Gamification through point rewards for proper waste management
5. **User Dashboard**: Personal analytics and progress tracking
6. **Educational Content**: Interactive learning resources with detailed guides that open in new tabs
   - Recycling 101: Complete guide to recycling practices and environmental impact
   - Composting Guide: Step-by-step composting instructions and best practices
   - E-Waste Safety: Proper electronic waste disposal and safety guidelines

### Database Schema
- **Users**: User profiles with eco-points tracking
- **Waste Scans**: Historical record of scanned items with analysis results
- **Achievements**: User accomplishments and badges system

### AI Integration
- **Image Analysis**: Google Gemini AI processes uploaded waste images
- **Categorization Logic**: AI determines waste category, subcategory, and disposal method
- **Confidence Scoring**: AI provides confidence levels for its analysis
- **Points Calculation**: Automatic eco-points calculation based on waste type and proper disposal

## Data Flow

1. **Image Upload**: User captures or uploads waste image
2. **AI Processing**: Image sent to Google Gemini AI for analysis
3. **Result Processing**: AI response parsed and structured
4. **Data Storage**: Scan results saved to database with user association
5. **Points Award**: Eco-points calculated and added to user account
6. **UI Update**: Real-time updates to user dashboard and statistics

## External Dependencies

### Core Dependencies
- **@google/genai**: Google Gemini AI integration
- **@neondatabase/serverless**: Neon Database driver
- **drizzle-orm**: Database ORM and query builder
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Comprehensive UI component library
- **multer**: File upload handling
- **zod**: Schema validation

### Development Dependencies
- **vite**: Build tool and development server
- **typescript**: Type checking and compilation
- **tailwindcss**: Utility-first CSS framework
- **@replit/vite-plugin-***: Replit-specific development tools

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite compiles React app with optimizations
2. **Backend Build**: esbuild bundles server code with external dependencies
3. **Static Assets**: Frontend assets served from `dist/public`
4. **Database Migration**: Drizzle handles schema migrations

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string (required)
- **GEMINI_API_KEY**: Google AI API key for image analysis
- **NODE_ENV**: Environment mode (development/production)

### Development Workflow
- **Local Development**: `npm run dev` starts both frontend and backend
- **Type Checking**: `npm run check` validates TypeScript
- **Database Push**: `npm run db:push` applies schema changes
- **Production Build**: `npm run build` creates optimized build
- **Production Start**: `npm start` runs the production server

### Storage Strategy
- **Database**: PostgreSQL via Neon Database for persistence
- **File Storage**: Local file system for temporary image uploads
- **Session Storage**: In-memory storage for development (can be extended to use database sessions)

## Recent Changes

### Latest Updates (July 11, 2024)
- ✅ **Fixed AI Scanner**: Resolved file upload issues with FormData handling
- ✅ **Enhanced Educational Content**: Added comprehensive learning materials with new tab functionality
- ✅ **Improved Error Handling**: Better debugging and user feedback for failed uploads
- ✅ **Windows Compatibility**: Complete Windows support with batch files and cross-env
- ✅ **TypeScript Fixes**: Resolved all type errors for better development experience
- ✅ **Setup Scripts**: Added run-dev.bat and run-dev.sh for easy startup

### Scanner Functionality
- Successfully processes images using Google Gemini AI
- Supports JPEG, PNG, and WebP image formats
- Provides detailed waste categorization with confidence scores
- Awards eco-points based on waste type and disposal method
- Real-time dashboard updates after each scan

### Windows Compatibility
- Complete Windows support with multiple startup options
- Comprehensive dependency management and error handling
- Created Windows-specific batch files for easy setup
- Added troubleshooting guide for common Windows issues
- Verified working on Windows Command Prompt, PowerShell, and Git Bash

### Educational Features
- Three comprehensive guides: Recycling 101, Composting Guide, E-Waste Safety
- Each guide opens in a new tab with detailed, structured content
- Mobile-responsive design with professional styling
- Includes practical tips, environmental impact information, and best practices

The application is designed with scalability in mind, using modern web technologies and serverless database solutions. The modular architecture allows for easy extension of features and integration with additional AI services or waste management systems.