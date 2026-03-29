# Discuss - Developer Discussion Platform

A modern real-time discussion platform for developers. Built with React, FastAPI, and Firebase.

## Deployment Guide

### 1. Deploy Backend to Render

1. Go to [render.com/new](https://dashboard.render.com/new) → **Web Service**
2. Connect your GitHub repo
3. Configure:
   - **Name**: `discuss-backend`
   - **Root Directory**: `backend`
   - **Runtime**: `Python 3` (NOT Node.js!)
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn server:app --host 0.0.0.0 --port $PORT`
4. **Environment Variables**:
   | Key | Value |
   |-----|-------|
   | `FIREBASE_DB_URL` | https://your-project-default-rtdb.firebaseio.com |
   | `JWT_SECRET` | a-random-64-character-string |
   | `CORS_ORIGINS` | https://your-netlify-app.netlify.app,https://your-vercel-app.vercel.app |
5. Click **Create Web Service**
6. **Copy your Render URL** (e.g., `https://discuss-backend.onrender.com`)

### 2. Deploy Frontend to Netlify

1. Go to [netlify.com](https://app.netlify.com) → Import repo
2. **Base directory**: `frontend`
3. **Build command**: `yarn build`
4. **Publish directory**: `frontend/build`
5. **Environment Variables** (CRITICAL!):
   | Key | Value |
   |-----|-------|
   | `REACT_APP_BACKEND_URL` | `https://your-render-backend.onrender.com` ← YOUR RENDER URL |
   | `REACT_APP_FIREBASE_API_KEY` | Your Firebase API key |
   | `REACT_APP_FIREBASE_AUTH_DOMAIN` | your-project.firebaseapp.com |
   | `REACT_APP_FIREBASE_DATABASE_URL` | https://your-project-default-rtdb.firebaseio.com |
   | `REACT_APP_FIREBASE_PROJECT_ID` | your-project-id |
   | `REACT_APP_FIREBASE_STORAGE_BUCKET` | your-project.appspot.com |
   | `REACT_APP_FIREBASE_MESSAGING_SENDER_ID` | your-sender-id |
   | `REACT_APP_FIREBASE_APP_ID` | your-app-id |
6. Click **Deploy**

### 3. Deploy Frontend to Vercel (Alternative)

1. Go to [vercel.com/new](https://vercel.com/new) → Import repo
2. **Root Directory**: Click "Edit" → type `frontend`
3. **Framework Preset**: `Create React App`
4. Add all environment variables (same as Netlify above)
5. **Important**: Add `REACT_APP_BACKEND_URL` pointing to your Render backend!

## Common Issues

### "undefined/api/..." Error
**Cause**: `REACT_APP_BACKEND_URL` is not set in your deployment environment.
**Fix**: Add `REACT_APP_BACKEND_URL=https://your-render-backend.onrender.com` in Netlify/Vercel environment variables, then redeploy.

### npm ERESOLVE Error
**Cause**: Dependency conflicts with npm.
**Fix**: The `.npmrc` file with `legacy-peer-deps=true` should fix this. Or use yarn instead.

### "Something went wrong" on Google Sign-in
**Cause**: Firebase domain not authorized.
**Fix**: Add your deployed domain to Firebase Console → Authentication → Settings → Authorized domains.

## Local Development

### Backend
```bash
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

### Frontend
```bash
cd frontend
yarn install
yarn start
```

## Tech Stack
- **Frontend**: React 19, Tailwind CSS, Shadcn/UI
- **Backend**: FastAPI, PyJWT, bcrypt
- **Database**: Firebase Realtime Database
- **Auth**: JWT + bcrypt + Google OAuth
