# 🛒 CampusKart – Student Marketplace

A modern, responsive student marketplace web app where college students can **buy, sell, and discover** textbooks, notes, gadgets, and accessories — all within their campus community.

---

## ✨ Features

### 🛍️ Core Marketplace
- **Browse Products** — Filter by category, condition, and price range
- **Product Detail** — Full listing with images, ratings, seller info, and location
- **Sell an Item** — Easy listing form with image upload and smart price suggestions
- **Shopping Cart** — Add, update, and remove items
- **Wishlist** — Save items for later

### 🤖 AI Recommendation System
- Personalized product suggestions based on browsing history, wishlist, and campus trends
- Dynamic scoring based on category match, price range, seller rating, and more
- Shows reason for each recommendation (*"Based on your browsing"*, *"Top rated on campus"*, etc.)

### 🗺️ Campus Deal Map
- Interactive map (OpenStreetMap via Leaflet) with real campus coordinates
- Color-coded pins by category — Books (blue), Notes (orange), Gadgets (purple), Accessories (green)
- 🔥 Animated pulsing pins for Urgent Sale items
- Clickable popups with product details and Add to Cart
- Category filter and product sidebar

### 🎯 Smart UX
- **WhatsApp Chat** — Direct seller contact with pre-filled message
- **Condition Badges** — Color-coded: New (green), Like New (blue), Used (amber)
- **Verified Student Badge** — Trusted seller indicator
- **Urgent Sale 🔥** — Time-sensitive listings
- **Nearby Deals** — Distance labels (e.g. "0.2 km away", "Same Campus")
- **Recently Viewed** — Auto-tracked browsing history on home page
- **Best Deals Under ₹500** — Budget-friendly section
- **Dark Mode** — One-click toggle in navbar
- **Star Ratings & Reviews** — On every product card and detail page

---

## 🛠️ Tech Stack

| Layer | Tech |
|---|---|
| Framework | React 18 + Vite |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Routing | Wouter |
| Animations | Framer Motion |
| Map | Leaflet + React-Leaflet + OpenStreetMap |
| State | React Context (ShopContext) |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |
| Currency | Indian Rupee (₹), `en-IN` locale |

---

## 📁 Project Structure

```
artifacts/campuskart/
├── src/
│   ├── pages/
│   │   ├── Home.tsx          # Landing page with AI recommendations
│   │   ├── Products.tsx      # Browse & filter marketplace
│   │   ├── ProductDetail.tsx # Full product view + WhatsApp
│   │   ├── Map.tsx           # Interactive campus deal map
│   │   ├── Sell.tsx          # Create a listing
│   │   ├── Cart.tsx          # Shopping cart
│   │   ├── Wishlist.tsx      # Saved items
│   │   └── Contact.tsx       # Help & contact
│   ├── components/
│   │   ├── ProductCard.tsx        # Reusable product card
│   │   ├── AIRecommendations.tsx  # Smart recommendation engine
│   │   └── layout/
│   │       ├── Navbar.tsx
│   │       └── Footer.tsx
│   ├── context/
│   │   └── ShopContext.tsx   # Global cart, wishlist, recently viewed state
│   └── App.tsx
└── vite.config.ts
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- pnpm

### Install & Run

```bash
# Install dependencies
pnpm install

# Start development server
PORT=3000 BASE_PATH=/ pnpm --filter @workspace/campuskart run dev
```

Open `http://localhost:3000` in your browser.

### Build for Production

```bash
pnpm --filter @workspace/campuskart run build
```

Output → `artifacts/campuskart/dist/`

---

## 🌐 Deployment

This project is configured for **Vercel** deployment via `vercel.json` at the repo root.

- Build command: `pnpm --filter @workspace/campuskart run build`
- Output directory: `artifacts/campuskart/dist`
- SPA routing: enabled (all routes → `index.html`)

---

## 📦 Product Data

All product listings use **mock/dummy data** stored in `ShopContext.tsx`. No backend or database required.

Each product includes:
- Title, price (₹), category, condition
- Seller name, verified status, rating & reviews
- Campus location + GPS coordinates (for the map)
- WhatsApp number for direct contact
- Urgent sale flag

---

## 🎓 Made for Students, by Students

CampusKart is designed to solve a real campus problem — the scattered, unsafe process of buying and selling second-hand items via WhatsApp groups. It brings everything into one safe, verified, campus-specific platform.

---

## 📄 License

MIT
