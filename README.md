# EcoBin - Smart Waste Management & Sustainability Companion

An AI-powered waste management website that helps users identify waste items, get disposal guidance, and earn eco-points for sustainable practices.

## Features

🔍 **AI Waste Scanner** - Upload photos of waste items for instant identification and disposal guidance
♻️ **Waste Categorization** - Automatic classification into categories (Organic, Plastic, Electronic, etc.)
🎯 **Disposal Guidance** - Detailed instructions for proper waste disposal
🏆 **Eco-Points System** - Earn points for proper waste management
📊 **Personal Dashboard** - Track your environmental impact and progress
📚 **Educational Content** - Learn about recycling, composting, and e-waste safety

## Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- Google Gemini API key (free at https://makersuite.google.com/app/apikey)

## Installation

1. Clone or download this repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Setup

### Get Your Gemini API Key

1. Visit https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key

### Set Environment Variables

**Windows (Command Prompt):**
```cmd
set GEMINI_API_KEY=your_api_key_here
```

**Windows (PowerShell):**
```powershell
$env:GEMINI_API_KEY="your_api_key_here"
```

**Mac/Linux:**
```bash
export GEMINI_API_KEY=your_api_key_here
```

## Running the Application

### Windows Users

**Option 1: Use the startup script (recommended)**
1. Set your API key first:
   ```cmd
   set GEMINI_API_KEY=your_api_key_here
   ```
2. Double-click `start-ecobin.bat` or run in Command Prompt:
   ```cmd
   start-ecobin.bat
   ```

**Option 2: Use the alternative batch file**
```cmd
run-dev.bat
```

**Option 3: Manual setup with Command Prompt**
```cmd
set NODE_ENV=development
set GEMINI_API_KEY=your_api_key_here
npm run dev
```

**Option 3: Manual setup with PowerShell**
```powershell
$env:NODE_ENV="development"
$env:GEMINI_API_KEY="your_api_key_here"
npm run dev
```

### Mac/Linux Users

**Option 1: Use the shell script**
```bash
chmod +x run-dev.sh
./run-dev.sh
```

**Option 2: Manual setup**
```bash
export NODE_ENV=development
export GEMINI_API_KEY=your_api_key_here
npm run dev
```

## Usage

1. Open your browser and navigate to http://localhost:5000
2. Upload an image of any waste item using the scanner
3. Get instant AI-powered categorization and disposal guidance
4. Earn eco-points for proper waste management
5. Track your progress on the dashboard
6. Learn more about sustainability through the educational content

## Supported File Types

- JPEG images
- PNG images
- WebP images
- Maximum file size: 5MB

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express, TypeScript
- **AI**: Google Gemini API
- **Database**: In-memory storage (development)
- **UI Components**: Radix UI, shadcn/ui

## Troubleshooting

### Common Issues

**"NODE_ENV is not recognized" error on Windows:**
- Use the provided `run-dev.bat` script
- Or install cross-env: `npm install -g cross-env`

**"No image file provided" error:**
- Ensure your API key is set correctly
- Check that the uploads directory exists
- Verify file type is supported (JPEG, PNG, WebP)

**AI scanner not working:**
- Verify your GEMINI_API_KEY is set correctly
- Check your internet connection
- Ensure the API key has proper permissions

### Getting Help

If you encounter issues:
1. Check that all environment variables are set
2. Ensure Node.js and npm are installed correctly
3. Try restarting the development server
4. Check the console for detailed error messages

## License

MIT License - feel free to use this project for learning and development.

## Contributing

This project is designed for educational purposes. Feel free to fork and modify as needed.