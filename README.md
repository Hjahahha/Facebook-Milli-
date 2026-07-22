# الصدى (Al-Sada) - Full Stack App

Anonymous reciprocal listening platform. Your voice only travels as far as others listen to you.

## Features

✨ **Anonymous Sessions** - No accounts, just unique session IDs
✨ **Reciprocal Listening** - Respond to whispers before sharing your own
✨ **Journey Tracking** - See how many people have listened to your whisper
✨ **Real-time Updates** - Socket.IO for live river animations
✨ **Persistent Storage** - MongoDB for all whispers and sessions
✨ **Responsive Design** - RTL Arabic UI

## Tech Stack

### Backend
- Node.js + Express
- MongoDB with Mongoose
- Socket.IO for real-time updates

### Frontend
- React 18
- Socket.IO Client
- Axios for HTTP requests

### Mobile (Future)
- React Native / Expo
- Same backend, native UI

## Setup

### Prerequisites
- Node.js (v14+)
- MongoDB running locally or MongoDB Atlas connection string

### Installation

1. **Clone & install dependencies**
   ```bash
   npm install
   cd client && npm install
   ```

2. **Create `.env` file** (copy from `.env.example`)
   ```bash
   MONGO_URI=mongodb://localhost:27017/al-sada
   PORT=5000
   REACT_APP_API_URL=http://localhost:5000
   ```

3. **Start MongoDB**
   ```bash
   mongod
   ```

4. **Run dev server** (from root)
   ```bash
   npm run dev
   ```

   - Backend: http://localhost:5000
   - Frontend: http://localhost:3000

## API Endpoints

### GET `/api/whispers`
Fetch all whispers from the river.

### POST `/api/whispers`
Create a new whisper.
```json
{
  "text": "شيء على بالي...",
  "author": "session-id"
}
```

### POST `/api/whispers/:id/respond`
Increment journey count when someone responds.
```json
{
  "responderId": "session-id"
}
```

### POST `/api/session`
Create a new anonymous session.

## Socket.IO Events

### Client → Server
- `listen:start` - User started listening to a whisper
- `whisper:respond` - User responded to a whisper

### Server → Client
- `whisper:new` - New whisper created
- `whisper:update` - Whisper journey count updated

## Project Structure

```
├── server/
│   └── index.js          # Express + Socket.IO server
├── client/
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.js        # Main React component
│       ├── App.css       # Styling
│       └── components/
│           ├── River.js      # Animated whisper bubbles
│           ├── ListenStage.js # Listening/responding UI
│           └── SpeakStage.js  # Whisper creation UI
├── package.json
├── .env.example
└── README.md
```

## Deployment

### Frontend (Vercel/Netlify)
```bash
cd client
npm run build
# Deploy `build/` folder
```

### Backend (Heroku/Railway/Render)
```bash
git push heroku main
```

Update `REACT_APP_API_URL` in `.env` to point to deployed backend.

## Next Steps

- [ ] React Native mobile app (Expo)
- [ ] User profiles + reputation system
- [ ] Whisper threading/conversations
- [ ] Moderation tools
- [ ] Push notifications
- [ ] Dark/Light theme toggle

## License

MIT
