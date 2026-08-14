# 🌍 TripGenius AI {#earth_africa-tripgenius-ai}

**AI-Powered Smart Travel Planning & Trip Management Platform**

TripGenius AI is a full-stack AI-powered travel planning web application
that brings trip planning, AI-assisted itinerary generation, destination
discovery, maps, routes, hotels, restaurants, tourist places, weather,
budgeting, profiles, gallery, achievements, and trip history into one
platform.

## 🌐 Live Access {#globe_with_meridians-live-access}

-   **Frontend:** <https://tripgenai.netlify.app/>
-   **Backend:** <https://tripgenius-ai-backend-29n7.onrender.com/>

## ✨ Features {#sparkles-features}

-   🧳 Trip creation and management
-   📅 Start/end date validation
-   🟢 Upcoming / 🔵 Started / ⚫ Ended trip status
-   🤖 Gemini-powered AI travel planning
-   🗺️ Interactive Leaflet maps and route visualization
-   🏨 Nearby hotels
-   🍽️ Nearby restaurants
-   🏛️ Tourist places
-   🌦️ Weather information
-   💰 Expense tracker: add, view, update and delete expenses
-   👤 User profiles
-   🔐 Registration, login, JWT authentication and protected routes
-   🔑 Password change
-   📸 Travel gallery
-   🏆 Achievements
-   📚 Trip history
-   🌍 Explore destinations
-   📄 PDF/document generation support

## 🛠️ Tech Stack {#hammer_and_wrench-tech-stack}

### Frontend

-   React 19
-   Vite
-   React Router
-   Bootstrap / React-Bootstrap
-   Axios
-   Leaflet / React-Leaflet
-   Leaflet Routing Machine
-   React Icons
-   React Markdown
-   jsPDF / html2pdf.js

### Backend

-   Node.js
-   Express.js
-   PostgreSQL
-   `pg`
-   JWT
-   bcrypt
-   Multer
-   Axios
-   dotenv
-   CORS

### AI & External Integrations {#ai--external-integrations}

-   Google Gemini AI
-   Geoapify
-   Weather services
-   Places/location services
-   Unsplash

### Deployment

-   GitHub --- source control
-   Netlify --- frontend
-   Render --- backend
-   Neon --- PostgreSQL

## 🏗️ Architecture {#building_construction-architecture}

``` text
User Browser
     │
     ▼
Netlify — React + Vite
     │
     │ Axios / REST API
     ▼
Render — Node.js + Express
     │
     ├──────────────► Gemini AI
     ├──────────────► Weather / Places / Geoapify
     │
     ▼
Neon PostgreSQL
```

## 🔄 How It Works {#arrows_counterclockwise-how-it-works}

1.  The user interacts with the React frontend.
2.  React components call API modules/services through Axios.
3.  Requests are sent to the Express backend.
4.  Express routes forward requests to controllers.
5.  Controllers communicate with PostgreSQL models and external
    services.
6.  PostgreSQL stores persistent user, trip, expense, gallery and
    achievement data.
7.  External APIs provide AI, weather, geographic and destination
    information.
8.  The backend returns JSON responses.
9.  React updates the interface with the returned information.

## 📁 Project Structure {#file_folder-project-structure}

``` text
TripGenius-AI/
├── client/
│   ├── public/
│   │   └── _redirects
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── styles/
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── app.js
│   ├── package.json
│   └── .env
│
└── README.md
```

## ⚙️ Local Execution {#gear-local-execution}

### Prerequisites

-   Node.js and npm
-   PostgreSQL
-   Git
-   VS Code or another code editor

### Backend

``` bash
cd server
npm install
npm start
```

Development mode:

``` bash
npm run dev
```

### Frontend

Open another terminal:

``` bash
cd client
npm install
npm run dev
```

The Vite development server normally runs at:

``` text
http://localhost:5173
```

## 🔐 Environment Variables {#closed_lock_with_key-environment-variables}

Create `server/.env`.

``` env
PORT=5000

DATABASE_URL=your_neon_connection_string

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=tripgenius_db

JWT_SECRET=your_jwt_secret

GEOAPIFY_API_KEY=your_geoapify_key
GEMINI_API_KEY=your_gemini_key
UNSPLASH_ACCESS_KEY=your_unsplash_key
```

`DATABASE_URL` is used for the production Neon PostgreSQL connection.
Local PostgreSQL variables can be used when `DATABASE_URL` is absent.

**Never commit `.env` or secret keys to GitHub.**

## 🔌 API Integration {#electric_plug-api-integration}

The backend is organized into feature-based API groups:

``` text
/api/auth
/api/trips
/api/profile
/api/location
/api/weather
/api/places
/api/ai
/api/explore
/api/gallery
/api/achievements
/api/expenses
/api/profile-upload
```

Typical integration flow:

``` text
React Component
      ↓
Axios API / Service
      ↓
Express Route
      ↓
Controller
      ↓
Model / External API
      ↓
PostgreSQL or External Service
      ↓
JSON Response
      ↓
React UI
```

## 🧪 Testing Instructions {#test_tube-testing-instructions}

### Authentication

-   Register a new user.
-   Log in.
-   Verify protected pages.
-   Log out.
-   Verify protected pages redirect to login.
-   Change password.

### Trips

-   Create a trip.
-   Verify the end date cannot be before the start date.
-   Edit the trip and verify the same date validation.
-   Verify Upcoming, Started and Ended statuses.
-   Delete a trip.
-   Check Trip History.

### Travel Features

-   Generate an AI plan.
-   Explore a destination.
-   Check weather.
-   View hotels.
-   View restaurants.
-   View tourist places.
-   Display a route.
-   Test TripLive.

### Expenses

-   Add an expense.
-   View expenses.
-   Edit an expense.
-   Delete an expense.

### Profile and Gallery

-   View profile.
-   Edit profile.
-   Upload a profile picture.
-   Add a travel-gallery image.
-   View gallery images.
-   Delete a gallery image.
-   Check achievements.

### Production Testing

Use:

**<https://tripgenai.netlify.app/>**

Confirm API requests are sent to:

**<https://tripgenius-ai-backend-29n7.onrender.com/>**

and not to `localhost:5000`.

## 🚀 Deployment {#rocket-deployment}

### Frontend --- Netlify {#frontend--netlify}

The frontend is deployed from the `client` directory.

``` bash
cd client
npm run build
```

Production output:

``` text
client/dist
```

The `client/public/_redirects` file contains:

``` text
/*    /index.html   200
```

This allows React Router pages to work correctly after browser
refreshes.

### Backend --- Render {#backend--render}

Render uses:

``` text
Root Directory: server
Build Command: npm install
Start Command: npm start
```

Production secrets are configured in Render environment variables.

### Database --- Neon {#database--neon}

Production PostgreSQL is hosted on Neon. The backend connects through
`DATABASE_URL`.

## 🌟 Why TripGenius AI Is Different {#star2-why-tripgenius-ai-is-different}

### One travel workspace

Instead of switching between separate applications for maps, weather,
places, hotels, restaurants, budgets and itineraries, TripGenius AI
combines them into one platform.

### AI + practical travel tools {#ai--practical-travel-tools}

The project combines Gemini AI with real travel utilities rather than
treating AI as an isolated chatbot.

### Personalized trip management

Trips, expenses, profiles, gallery records and achievements are
associated with users and persisted in PostgreSQL.

### Live trip experience

TripLive combines route/map information with nearby hotels, restaurants
and tourist places.

### Complete full-stack implementation

The project includes authentication, database persistence, REST APIs,
third-party API integration, AI integration, responsive UI and cloud
deployment.

## 🔮 Future Work {#crystal_ball-future-work}

-   ☁️ Move profile/gallery uploads to persistent cloud image storage
    such as Cloudinary or object storage.
-   🤖 Improve AI personalization using travel preferences, history,
    budget and weather.
-   💰 Add advanced budget analytics, spending limits, cost prediction
    and currency conversion.
-   🗺️ Add multi-stop route optimization using distance, travel time,
    opening hours and weather.
-   📱 Develop Android/iOS versions.
-   🔔 Add travel reminders, weather alerts and itinerary notifications.
-   🧑‍🤝‍🧑 Add collaborative trips and shared expenses.
-   🌐 Add multilingual support.
-   📊 Add travel analytics dashboards.
-   🔐 Add rate limiting, stronger authorization, secure headers and
    improved file validation.

## 🧩 Production Troubleshooting {#jigsaw-production-troubleshooting}

### React route shows Page Not Found after refresh

Verify `client/public/_redirects` contains:

``` text
/*    /index.html   200
```

Then rebuild and redeploy.

### API requests fail

Verify frontend API URLs use:

``` text
https://tripgenius-ai-backend-29n7.onrender.com
```

and not:

``` text
http://localhost:5000
```

or malformed URLs such as:

``` text
http://https//
```

### Backend cannot connect to PostgreSQL

Verify `DATABASE_URL` exists in Render and points to the Neon database.

## 📌 Project Summary {#pushpin-project-summary}

TripGenius AI is an AI-powered full-stack travel planning and trip
management platform. It demonstrates practical use of React, Node.js,
Express, PostgreSQL, authentication, AI integration, external travel
APIs, interactive maps, REST APIs and cloud deployment.

**Built with ❤️ for smarter travel planning.**
