# ClaimRoot Heatmap System

The ClaimRoot heatmap module provides real-time visual analytics for governance activity, sector engagement, and validator behavior. It is a key component of the Interface and Governance layers of the FCU Stack™.

## 🔥 Heatmap Use Cases

- 🗳️ **Validator Activity Tracking**  
  Visualize voting frequency, quorum participation, and validator responsiveness.

- 🧩 **Sector Engagement**  
  Show which brand sectors (e.g. Finance, Fashion, Tech) are generating the most claims or proposals.

- ⚙️ **Infrastructure Load**  
  Monitor FAACloud and R2Storage usage across regions and time.

## 🧠 Heatmap Architecture

### Frontend
- **Component:** `HeatmapPanel.jsx`
- **Libraries:** D3.js or Recharts (recommended)
- **UI Integration:** Embedded in `ClaimRootCheckout.tsx` and SidePanel views
- **Color Scale:** Red (high activity) → Yellow → Green (low activity)

### Backend
- **Data Source:** FAACloud metrics, ClaimRoot voting logs, VaultChain timestamps
- **Aggregation:** Claims and votes grouped by:
  - Sector
  - Validator
  - Time interval (hour/day/week)
- **API Endpoint:** `/api/heatmap-data` (suggested)

## 🧩 Sector Heatmap Grid

- 5×4 matrix representing 20 brand sectors
- Each cell = sector activity level
- Hover reveals:
  - Sector name
  - # of claims submitted
  - # of active validators
  - Avg. resolution time

## 🔄 Update Cycle

- Heatmap refreshes every 9 seconds (PulseTrade sync)
- Data pulled from FAACloud + VaultChain
- Optional: WebSocket support for real-time updates

## 🔐 Security & Privacy

- No PII stored in heatmap data
- Validator IDs hashed before display
- Sector data anonymized by default

## 🔧 Suggested Enhancements

- Toggle between:
  - Claims vs. Proposals
  - Sector vs. Validator views
  - Time-based animations
- Export heatmap snapshots as SVG/PNG
- Integrate with `ClaimRoot.js` for live proposal overlays
