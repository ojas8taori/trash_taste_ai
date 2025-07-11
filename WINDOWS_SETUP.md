# Windows Setup Guide for EcoBin

## Quick Start

1. **Set your API key** (in Command Prompt):
   ```cmd
   set GEMINI_API_KEY=your_actual_api_key_here
   ```

2. **Run the application**:
   ```cmd
   start-ecobin.bat
   ```

3. **Open your browser** to: http://localhost:5000

## Troubleshooting Common Issues

### Issue: "tsx is not recognized"
**Solution**: Use `start-ecobin.bat` instead of `run-dev.bat`

### Issue: "Cannot find package 'multer'"
**Solution**: 
```cmd
npm install
start-ecobin.bat
```

### Issue: "GEMINI_API_KEY is not set"
**Solution**: Set your API key first:
```cmd
set GEMINI_API_KEY=your_api_key_here
start-ecobin.bat
```

### Issue: "Port 5000 is already in use"
**Solution**: Close other applications using port 5000 or change the port in `server/index.ts`

## Complete Manual Setup

If the batch files don't work, use this manual approach:

1. **Install dependencies**:
   ```cmd
   npm install
   ```

2. **Set environment variables**:
   ```cmd
   set NODE_ENV=development
   set GEMINI_API_KEY=your_api_key_here
   ```

3. **Create uploads directory**:
   ```cmd
   mkdir uploads
   ```

4. **Run the application**:
   ```cmd
   npm run dev
   ```

## Getting Your Gemini API Key

1. Go to https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key
5. Use it in the command above

## Verifying Setup

Once running, you should see:
- Console message: "serving on port 5000"
- Browser opens to a green-themed EcoBin website
- AI scanner works when you upload images

## Alternative Command Prompts

**PowerShell users**:
```powershell
$env:GEMINI_API_KEY="your_api_key_here"
npm run dev
```

**Git Bash users**:
```bash
export GEMINI_API_KEY=your_api_key_here
npm run dev
```

## Support

If you still have issues:
1. Make sure Node.js is installed (node --version)
2. Make sure npm is installed (npm --version)
3. Delete node_modules and run `npm install` again
4. Check that your API key is valid