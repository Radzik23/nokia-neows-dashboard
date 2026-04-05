# Station Alpha: NEO Surveillance Dashboard 🚀

A high-performance, responsive React dashboard built to track and analyze Near-Earth Objects (NEOs) using real-time data from the **NASA JPL Asteroid NeoWs API**.

## 🌍 Live Demo
[**Launch Station Alpha Command Center**](https://nokia-neows-dashboard.vercel.app)

## 💡 Project Overview
This application was developed as a technical solution for the **Nokia Recruitment Process**. It showcases modern React patterns, clean architecture, and a "Mission Control" UI/UX. The dashboard monitors asteroids passing near Earth, calculates potential collision risks, and visualizes astronomical telemetry.

### Key Features:
* **Real-time Surveillance:** Direct integration with NASA's NeoWs API with optimized data fetching via React Query.
* **Custom Danger Score:** A proprietary algorithm calculating threat levels (0-100) based on diameter, velocity, and miss distance.
* **Advanced Intelligence System:**
    * **Filtering:** Filter by "Potentially Hazardous" status and "High Velocity" (>75,000 km/h).
    * **Sorting:** Organize data by Date, Danger Level, or Proximity.
* **Mission Visuals:**
    * **Daily Activity:** Time-series analysis of NEO frequency.
    * **Threat Analysis:** Comparative charts of the top 5 largest objects.
* **Intelligence Feed:** A live terminal-style log providing contextual "Fun Facts" (e.g., comparing asteroid sizes to football fields).
* **Cross-Platform:** Fully responsive mobile-first design with a dedicated navigation system.
* **Telemetry Export:** Built-in utility to export current data to CSV format.

## 🛠️ Tech Stack
* **Core:** React 18 (Vite) & TypeScript
* **State Management:** Zustand
* **Data Fetching:** TanStack Query (React Query)
* **Visualizations:** Recharts
* **Styling:** Tailwind CSS (Glassmorphism & Sci-Fi Aesthetic)
* **Icons:** Lucide React
* **Date Handling:** date-fns

## 🏗️ Architecture & Best Practices
The project implements "Mid-Senior" level architectural patterns:
* **Custom Hooks Pattern:** Business logic (fetching, filtering, sorting) is decoupled from the UI (`useAsteroids.ts`).
* **View/Layout Separation:** Distinct views for `MissionControl` and `NeoTracker`.
* **Centralized Store:** Global UI state and filter persistence using Zustand.
* **Utility-First Logic:** Pure, testable functions for complex calculations (Danger Score).

## 🚀 Installation & Local Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Radzik23/nokia-neows-dashboard.git
   cd nokia-neows-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the project root and add your NASA API key:
   ```env
   VITE_NASA_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
