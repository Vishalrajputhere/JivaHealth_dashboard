# Jiva Health — User Management Dashboard

A MERN stack admin dashboard for managing users on a healthcare platform. Built this as part of learning how full-stack apps work with React, Redux, and MongoDB.

---

## What it does

- View and search all users on the platform
- See full user profiles with orders, payments, and family members
- Upgrade/revert users between Normal and Prime membership
- Add and edit family members with a modal form
- All changes update the UI instantly via Redux (no page reloads)

---

## Tech Stack

- **Frontend:** React 18 with Vite, React Router v6
- **State:** Redux Toolkit (createAsyncThunk for API calls)
- **Styling:** Tailwind CSS v4
- **Backend:** Node.js + Express.js
- **Database:** MongoDB with Mongoose
- **HTTP:** Axios (with Vite proxy so no CORS issues in dev)

---

## Project Structure

```
jiva/
├── client/          # React + Vite frontend
├── server/          # Express + Mongoose backend
├── package.json     # root level — runs both with concurrently
└── README.md
```

---

## Prerequisites

- Node.js v18+
- MongoDB running locally (or a MongoDB Atlas connection string)
- npm v9+

---

## Setup

### 1. Install everything

From the project root:

```bash
npm install
```

Then install server and client deps:

```bash
cd server && npm install && cd ..
cd client && npm install && cd ..
```

### 2. Set up the .env file

The server needs a `.env` file at `server/.env`. There's already one there, just update the mongo URI if needed:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
```

If you're running MongoDB locally the default URI is `mongodb://localhost:27017/jiva_health`.

### 3. Seed the database

Run this once to add some demo data:

```bash
cd server
npm run seed
```

This drops any existing data and inserts 6 users, 6 orders, 5 payments, and 3 family members. You should see something like:

```
✅ Connected to MongoDB
🗑️  Clearing existing data...
👤 Seeding users...   Inserted 6 users
🛒 Seeding orders...  Inserted 6 orders
💳 Seeding payments... Inserted 5 payments
👨‍👩‍👧‍👦 Seeding family members... Inserted 3 family members
🌱 Database seeded successfully!
```

### 4. Start the app

From the project root (starts both client and server together):

```bash
npm run dev
```

- Server runs on `http://localhost:5000`
- Client runs on `http://localhost:5173`

Or start them separately if you prefer:

```bash
# terminal 1
cd server && npm run dev

# terminal 2
cd client && npm run dev
```

---

## API Endpoints

| Method | Endpoint | What it does |
|---|---|---|
| GET | `/api/users` | get all users, supports `?search=` and `?status=` |
| GET | `/api/users/:id` | get one user with all their orders, payments, family |
| POST | `/api/users` | create a new user |
| PUT | `/api/users/:id` | update user info |
| DELETE | `/api/users/:id` | delete user and all their related data |
| PUT | `/api/users/:id/upgrade-prime` | upgrade to prime |
| PUT | `/api/users/:id/revert-prime` | revert back to normal |
| GET | `/api/orders/user/:userId` | get orders for a user |
| POST | `/api/orders` | create order |
| PUT | `/api/orders/:id` | update order status |
| DELETE | `/api/orders/:id` | delete order |
| GET | `/api/payments/user/:userId` | get payments for a user |
| POST | `/api/payments` | create payment |
| DELETE | `/api/payments/:id` | delete payment |
| GET | `/api/family/user/:userId` | get family members |
| POST | `/api/family` | add family member |
| PUT | `/api/family/:id` | update family member |
| DELETE | `/api/family/:id` | remove family member |
| GET | `/api/health` | health check |

---

## Features

- User list page with search, status filter, and stat cards at the top
- User detail page with 4 tabs: Overview, Orders & Bookings, Payments, Family Members
- Editable personal info in the Overview tab
- Inline order status dropdown that updates immediately
- Add/edit family members through a modal (updates Redux state straight away, no refetch)
- Upgrade to Prime / Revert to Normal with confirmation dialog
- Loading spinners and error states on all data fetches
- Cascade delete — removing a user also removes all their orders, payments, and family members

---

