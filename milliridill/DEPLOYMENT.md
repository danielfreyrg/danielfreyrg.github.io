# Deployment Guide

This guide covers deploying the Milliridill application to various hosting platforms.

## Quick Deploy Options

### Option 1: Render (Recommended - Free Tier Available)

1. **Sign up** at [render.com](https://render.com)

2. **Create a new Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository (or use manual deploy)

3. **Configure the service**:
   - **Name**: `milliridill` (or your choice)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (or paid for better performance)

4. **Set Environment Variables**:
   - Go to "Environment" tab
   - Add: `API_SPORTS_KEY` = `your_api_key_here`
   - Add: `NODE_ENV` = `production`

5. **Deploy**: Click "Create Web Service"

Your app will be available at `https://your-app-name.onrender.com`

---

### Option 2: Railway

1. **Sign up** at [railway.app](https://railway.app)

2. **Create a new project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo" (or upload manually)

3. **Configure**:
   - Railway auto-detects Node.js
   - It will run `npm install` and `npm start` automatically

4. **Set Environment Variables**:
   - Go to "Variables" tab
   - Add: `API_SPORTS_KEY` = `your_api_key_here`

5. **Deploy**: Railway will automatically deploy

Your app will be available at a Railway-provided URL

---

### Option 3: Vercel

1. **Sign up** at [vercel.com](https://vercel.com)

2. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Set Environment Variables**:
   - Go to your project dashboard
   - Settings → Environment Variables
   - Add: `API_SPORTS_KEY` = `your_api_key_here`

5. **Update vercel.json** (create this file):
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "server.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "server.js"
       }
     ]
   }
   ```

---

### Option 4: Heroku

1. **Install Heroku CLI**:
   ```bash
   npm install -g heroku
   ```

2. **Login**:
   ```bash
   heroku login
   ```

3. **Create app**:
   ```bash
   heroku create your-app-name
   ```

4. **Set environment variable**:
   ```bash
   heroku config:set API_SPORTS_KEY=your_api_key_here
   ```

5. **Deploy**:
   ```bash
   git push heroku main
   ```

---

## Important Notes for All Platforms

1. **Environment Variables**: Always set `API_SPORTS_KEY` in your hosting platform's environment variables section. Never commit it to git.

2. **Port Configuration**: The server now uses `process.env.PORT` which hosting platforms set automatically.

3. **Static Files**: Make sure all your files (HTML, CSS, JS) are included in your repository.

4. **Node Version**: You may want to specify a Node version in `package.json`:
   ```json
   "engines": {
     "node": ">=18.0.0"
   }
   ```

5. **CORS**: The server currently allows all origins (`*`). For production, you may want to restrict this to your domain.

---

## Testing Your Deployment

After deployment, test:
- ✅ The homepage loads
- ✅ The group selector works
- ✅ Standings table displays
- ✅ Matches load and display
- ✅ Score inputs work
- ✅ Standings update when scores change

---

## Troubleshooting

**Server won't start:**
- Check that `API_SPORTS_KEY` is set in environment variables
- Check server logs in your hosting platform's dashboard
- Verify Node.js version compatibility

**API requests failing:**
- Verify `API_SPORTS_KEY` is correctly set
- Check that the API endpoint URLs are correct
- Check CORS settings if needed

**Static files not loading:**
- Ensure all files are committed to git
- Check file paths are correct
- Verify the server is serving static files correctly
