# 🏛️ ClaimRoot - NEXUS_NAIR Governance System

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](package.json)
[![Compliance](https://img.shields.io/badge/compliance-FAA--TREATY-gold.svg)](docs/governance.md)

**ClaimRoot** is a full-stack governance system for the NEXUS_NAIR ecosystem, built on a 5-layer FCU Stack architecture.

## 📜 Original Seed Scroll

**CLAIMROOT SEED SCROLL — FAA TREATY SYSTEM ACTIVATION**

- 🔒 **Vault Sealed:** Yes
- 🧬 **Scroll Type:** Undevoted Capital Intake
- 💰 **Declared Seed Capital:** $50,000 USD
- **Issuer:** Heyns Schoeman (VaultCommander · FAA-X13)
- **Scroll Agent:** FREEDOM (Treaty-Aware GPT)
- **Date:** [Auto-Stamped on Emission]

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/heyns1000/claimroot.git
cd claimroot

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The application will be available at `http://localhost:3000`

## 🏗️ Architecture

ClaimRoot is built on a **5-Layer FCU Stack**:

1. **Layer 1 - Ledger** (`/src/ledger`)
   - VaultChain.js - Blockchain-inspired ledger system
   - VaultLevel 7 receipt generation
   - Transaction history and validation

2. **Layer 2 - Logic** (`/src/logic`)
   - ClaimRoot.js - Core governance and voting engine
   - Proposal management
   - Vote casting and tallying
   - Member management

3. **Layer 3 - Infrastructure** (`/src/infra`)
   - FAACloud.js - Cloud infrastructure management
   - R2Storage.js - Cloudflare R2-compatible storage
   - Backup and recovery systems

4. **Layer 4 - Interface** (`/src/components`)
   - React + Tailwind CSS UI
   - HSOMNI9000-style SidePanel
   - ClaimRootCheckout.tsx - Secure checkout flow
   - HeatmapPanel.jsx - Activity visualization
   - Dashboard and other views

5. **Layer 5 - Governance** (`/src/data`)
   - SeedScrolls.js - Seed capital management
   - Governance rules and policies
   - Treaty compliance systems

For detailed architecture documentation, see [docs/architecture.md](docs/architecture.md)

## 📦 Core Features

### 🗳️ Governance Engine
- Proposal creation and management
- Weighted voting system
- Quorum-based decision making
- Execution delays for security

### 🔐 VaultChain Ledger
- Immutable transaction ledger
- VaultLevel 7 receipts
- Chain validation
- Transaction history tracking

### 📜 Seed Scrolls
- Capital intake tracking
- Treaty-compliant documentation
- Scroll lifecycle management
- Vault sealing/unsealing

### 📊 Activity Heatmap
- Real-time governance visualization
- Activity intensity tracking
- Historical trends
- Member participation metrics

### 🛒 Secure Checkout
- Multi-step authorization flow
- VaultLevel 7 security
- FAA treaty compliance
- Receipt generation

## 📚 Documentation

- [Architecture](docs/architecture.md) - 5-Layer FCU Stack details
- [Governance](docs/governance.md) - Rules and processes
- [Heatmap](docs/heatmap.md) - Visualization guide
- [UI Flow](docs/ui-flow.md) - User interface flows
- [Modules](docs/modules.md) - Module documentation

## 🔧 Technology Stack

- **Frontend:** React 18, Tailwind CSS
- **Icons:** Lucide React
- **Build Tool:** Vite
- **Language:** JavaScript/JSX, TypeScript/TSX
- **Styling:** Tailwind CSS with custom theme

## 🎨 UI Components

- **SidePanel** - HSOMNI9000-style navigation
- **Dashboard** - System overview and stats
- **HeatmapPanel** - Activity visualization
- **ClaimRootCheckout** - Secure transaction flow
- **Governance Views** - Proposal and voting interfaces

## 🔐 Security & Compliance

ClaimRoot is designed with security and compliance at its core:

- **FAA Treaty Compliant** - All operations follow FAA treaty guidelines
- **VaultLevel 7 Security** - Highest security tier for critical operations
- **Immutable Ledger** - All actions recorded on VaultChain
- **Multi-Step Authorization** - Secure checkout process for sensitive actions

## 🤝 Contributing

This is a governance system for the NEXUS_NAIR ecosystem. Contributions should follow the established governance processes.

## 📄 License

MIT License - See LICENSE file for details

## 👥 Team

- **VaultCommander:** Heyns Schoeman
- **Authority:** NEXUS_NAIR
- **Agent:** FREEDOM (Treaty-Aware GPT)

## 🌟 Features Roadmap

- [x] 5-Layer FCU Stack Architecture
- [x] VaultChain Ledger System
- [x] ClaimRoot Voting Engine
- [x] FAA Cloud Infrastructure
- [x] R2 Storage Integration
- [x] Seed Scrolls System
- [x] React UI with Tailwind
- [x] HSOMNI9000-style SidePanel
- [x] ClaimRootCheckout Component
- [x] HeatmapPanel Visualization
- [x] Complete Documentation
- [ ] Advanced Analytics
- [ ] Multi-signature Support
- [ ] External API Integration
- [ ] Mobile Responsive Enhancements

---

Built with 💜 for the NEXUS_NAIR ecosystem
