# المنصة السيادية — Iraq Sovereign Platform

> A sovereign-grade multi-module marketplace for Iraq. Built with Jetpack Compose, Kotlin, and a modular architecture where each section operates as an independent application within a unified interface.

## Architecture

### "Independent Nation" Module System
Each business domain runs as an isolated module with its own:
- **Visual identity** (custom color scheme & theme)
- **Data layer** (isolated Room tables, separate Firestore collections)
- **Navigation** (module-scoped routes)
- **Business logic** (independent ViewModels)

| Module | Accent Color | Domain |
|--------|-------------|--------|
| 🏪 Store | Neon Electric Blue `#00D4FF` | General marketplace (electronics, clothing, etc.) |
| 🚗 Cars | Electric Crimson `#FF1744` | Vehicle sales & listings |
| 🏠 Real Estate | Emerald Green `#00E676` | Properties: apartments, houses, land |
| 🔧 Services | Electric Orange `#FF6D00` | Professionals: plumbers, electricians, etc. |

### Dark Sovereign Theme
- Base: `#050505` (near-true black)
- Primary: Neon Electric Blue `#00D4FF`
- Secondary: Pure Gold `#FFD700`
- High-contrast text for outdoor readability
- Glassmorphism UI components

### Ghost Promotion System
Smart algorithmic promotion where paid products appear as organic "Best Value" recommendations — never as visible ads.

- **Engagement-driven**: Promotion multiplier only activates when real user engagement exists
- **Tiered levels**: Bronze (1.5x) → Silver (2.5x) → Gold (4x) → Platinum (7x)
- **Military-precision transactions**: BigDecimal arithmetic, no floating-point errors
- **Audit logs**: Every financial movement documented with full metadata

### Iron-Clad Messaging
- Socket.io real-time chat (architecture ready)
- Auto-reply templates for service professionals
- Blue verification badges for trusted accounts
- Module-aware conversations (linked to products/listings)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| UI | Jetpack Compose + Material 3 |
| Language | Kotlin |
| DI | Hilt (Dagger) |
| Local DB | Room (Master-Slave ready) |
| Remote | Firebase (Auth, Firestore, Storage, Messaging) |
| Networking | Retrofit + OkHttp |
| Real-time | Socket.IO Client |
| Image Loading | Coil |
| Navigation | Compose Navigation |

## Project Structure

```
app/src/main/java/com/iraqsovereign/app/
├── data/
│   ├── model/          # Domain models (Product, User, Transaction, etc.)
│   ├── local/          # Room database, DAOs, entities
│   ├── remote/         # Firebase & API integration
│   └── repository/     # Repository pattern
├── di/                 # Hilt dependency injection modules
├── navigation/         # NavRoutes, AppNavigation, BottomBar
├── ui/
│   ├── theme/          # Sovereign theme, ModuleTheme, Colors, Typography
│   └── screens/
│       ├── home/       # HomeScreen, ModuleSelectorScreen
│       ├── store/      # Store module screens
│       ├── cars/       # Cars module screens
│       ├── realestate/ # Real Estate module screens
│       ├── services/   # Services module screens
│       ├── chat/       # Messaging screens
│       ├── auth/       # Login, Register
│       ├── profile/    # Profile, Settings
│       ├── promotion/  # Ghost Promotion dashboard
│       └── admin/      # Admin command center
└── utils/              # CurrencyUtils, PromotionEngine
```

## Merchant Tiers

| Feature | Standard (25,000 IQD) | Premium (99,000 IQD) |
|---------|----------------------|---------------------|
| Product listings | 10 | Unlimited |
| Categories | 3 | All |
| Analytics | Basic | Advanced |
| Promotion access | Bronze | All tiers |
| Priority support | No | Yes |
| Verified badge | No | Eligible |
| Custom storefront | No | Yes |

## Setup

1. Clone the repo
2. Open in Android Studio (Hedgehog or newer)
3. Add `google-services.json` to `app/` (for Firebase)
4. Sync Gradle
5. Run on device/emulator (API 26+)

## Database Architecture

**Master-Slave Strategy:**
- **Master (Write)**: Firebase Firestore — handles all writes, user auth, real-time sync
- **Slave (Read)**: Local Room DB — offline-first reads, cached data, fast queries
- **Sync**: Firestore listeners push changes → Room cache updates automatically
- **Module Isolation**: Each module has separate Firestore collections and Room tables

## License

Proprietary — Iraq Sovereign Platform
