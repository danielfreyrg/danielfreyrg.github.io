# Milliridill - Handball Standings Calculator

## Security Setup

The API key is now stored on the server side to protect it from being exposed in the client-side code.

## Setup Instructions

1. **Set your API key as an environment variable** (recommended for production):
   ```bash
   export API_SPORTS_KEY=your_api_key_here
   ```

   Or create a `.env` file (if using a package like `dotenv`):
   ```
   API_SPORTS_KEY=your_api_key_here
   ```

2. **Install dependencies** (first time only):
   ```bash
   npm install
   ```

3. **Start the server**:
   ```bash
   npm start
   ```

   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

3. **Access the application**:
   Open your browser to `http://localhost:3000`

## How It Works

- The server acts as a proxy between your frontend and the API Sports API
- All API requests go through `/api/*` endpoints on your server
- The server adds the API key to requests before forwarding them
- The API key never appears in the client-side JavaScript code

## Deployment

When deploying to production:

1. Set the `API_SPORTS_KEY` environment variable on your hosting platform
2. Make sure `.env` is in `.gitignore` (already included)
3. Never commit your API key to version control

## Important Notes

- The API key is still visible in `server.js` as a fallback. For production, always use environment variables.
- The server serves static files and proxies API requests
- CORS is enabled for local development
