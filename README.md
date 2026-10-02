# Maison Jollof — Pre-Order West African Fine Dining

> *"From the pot to the table."*

Maison Jollof is an haute cuisine pre-order website for West African dishes presented with European fine-dining culture and storytelling.

---

## 🌟 Features

- **4-Chapter Storytelling Home Page**:
  - **Chapter 00**: Hero with interactive 3D Jollof Pot & rising steam particles.
  - **Chapter 01 (The Pot)**: Ancestral hearth, origin stories, and cast-iron heritage.
  - **Chapter 02 (The Fire)**: The craft of 12-hour woodfire smoking & Hausa yaji spicing.
  - **Chapter 03 (The Table)**: European multi-course dining & shared communion.
  - **Chapter 04 (The Pre-Order)**: 3-step reservation process with interactive 3D gift box.
- **3D & Interactive Visuals**:
  - **Hero 3D Scene**: Rotating Jollof pot & steam particles reacting to mouse/touch.
  - **Floating 3D Spices**: Drifting chili, bay leaf, tomato, and star anise background elements.
  - **Menu Card 3D Tilt**: Perspective mouse hover tilt on dish cards (`Tilt3DCard`).
  - **Dish 3D Viewer**: Drag-to-rotate 3D plate view on dish detail pages (`Dish3DViewer`).
  - **Spinning Gold Logo**: Animated logo emblem in the footer.
  - **Performance Optimization**: Capped pixel ratio (1.5 max), WebGL fallbacks, and `prefers-reduced-motion` compliance.
- **Fine-Dining Menu & Story Pages**:
  - European menu course organization: **Entrées**, **Plats**, **Desserts**, and **Boissons**.
  - Dish details with origin stories, portion selectors (Tasting vs Maison Sharing), prep times, and ingredients chips.
- **Pre-Order Flow & Cart State**:
  - Slide-in **Cart Drawer** with item quantity management and subtotal calculation in Naira (₦).
  - **Pre-Order Checkout** requiring minimum 48-hour advance date selection, time slots, delivery or pickup option, guest details, and chef instructions.
  - **Order Confirmation Page** with reference receipt ID and reservation summary.

---

## 🎨 Design System & Aesthetics

- **Color Palette**:
  - Cream Background: `#FAF7F2` / `#FFFDF9`
  - Deep Green: `#0B201A` / `#163E32`
  - Warm Gold Accent: `#C5A059` / `#D4AF37`
- **Typography**:
  - Headings: `Playfair Display` (Serif) & `Cinzel`
  - Body: `Inter` (Sans)

---

## 🚀 Stack

- **Framework**: Next.js 15+ (App Router) with TypeScript
- **Styling**: Tailwind CSS v4 & Custom Utility Classes
- **Animations**: Framer Motion
- **3D Visuals**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Icons**: Lucide React

---

## 📦 Getting Started

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/user/maison-jollof.git
cd maison
npm install --legacy-peer-deps
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to explore the website.

### 3. Build for Production

```bash
npm run build
npm run start
```
