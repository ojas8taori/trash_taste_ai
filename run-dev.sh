#!/bin/bash

echo "Starting EcoBin AI Scanner..."
echo

# Set environment variables
export NODE_ENV=development

# Create uploads directory if it doesn't exist
mkdir -p uploads

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
    echo
fi

# Check if GEMINI_API_KEY is set
if [ -z "$GEMINI_API_KEY" ]; then
    echo "WARNING: GEMINI_API_KEY environment variable is not set!"
    echo "Please set your Gemini API key:"
    echo "export GEMINI_API_KEY=your_api_key_here"
    echo
    echo "You can get a free API key from: https://makersuite.google.com/app/apikey"
    echo
    exit 1
fi

echo "Starting development server..."
echo "The application will be available at: http://localhost:5000"
echo

# Run the development server
tsx server/index.ts