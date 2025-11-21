# 🖥️ UI Flow Documentation

## Overview

ClaimRoot's user interface is designed for intuitive navigation, clear information hierarchy, and secure transaction processing. This document details the user flows and interaction patterns.

## Navigation Structure

### Main Layout

```
┌─────────────┬──────────────────────────────────┐
│             │                                  │
│  SidePanel  │        Main Content Area         │
│             │                                  │
│   (Fixed)   │         (Scrollable)             │
│             │                                  │
└─────────────┴──────────────────────────────────┘
```

### SidePanel (HSOMNI9000-style)

**Features:**
- Fixed left position
- Collapsible (64px ↔ 256px)
- Icon-based navigation
- Active state indication
- Vault status footer

**Navigation Items:**
1. 🏠 Dashboard - System overview
2. 🗳️ Governance - Proposals and voting
3. 📜 Seed Scrolls - Capital management
4. 📊 Heatmap - Activity visualization
5. 🔐 VaultChain - Ledger details
6. 🛒 Checkout - Action processing
7. ⚙️ Settings - Configuration

**Interaction:**
```
Click Navigation Item
    ↓
Update activeView state
    ↓
Render corresponding view
    ↓
Update active indicator
```

## View Flows

### 1. Dashboard View

**Purpose:** System overview and quick access

**Layout:**
```
┌─────────────────────────────────────────┐
│ Dashboard Title & Description           │
├─────────────────────────────────────────┤
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐   │
│ │Stat 1│ │Stat 2│ │Stat 3│ │Stat 4│   │
│ └──────┘ └──────┘ └──────┘ └──────┘   │
├─────────────────────────────────────────┤
│ System Status                           │
│ ■ VaultChain Ledger    [Active]        │
│ ■ Governance Engine    [Active]        │
│ ■ FAA Cloud           [Active]        │
│ ■ R2 Storage          [Active]        │
├─────────────────────────────────────────┤
│ Quick Actions                           │
│ [Create Proposal] [View Proposals]      │
│ [Create Seed Scroll]                    │
├─────────────────────────────────────────┤
│ Governance Rules                        │
│ Quorum: 51% | Voting: 7 days           │
└─────────────────────────────────────────┘
```

**User Flow:**
```
Land on Dashboard
    ↓
Review statistics
    ↓
Check system status
    ↓
[Optional] Quick action
    ↓
Navigate to specific view
```

### 2. Governance View

**Purpose:** Proposal management and voting

**Create Proposal Flow:**
```
Click "New Proposal"
    ↓
Open ClaimRootCheckout
    ↓
Step 1: Review Details
    ↓
Step 2: Authorization
    ↓
Step 3: Confirmation
    ↓
Generate VaultLevel 7 Receipt
    ↓
Proposal Created
    ↓
Return to Governance View
```

**Vote on Proposal Flow:**
```
View Active Proposals
    ↓
Select Proposal
    ↓
Review Details
    ↓
Choose Vote Type (For/Against/Abstain)
    ↓
Open ClaimRootCheckout
    ↓
Complete Authorization
    ↓
Vote Recorded
    ↓
Receipt Generated
```

### 3. Seed Scrolls View

**Purpose:** Capital management and scroll lifecycle

**Layout:**
```
┌─────────────────────────────────────────┐
│ Seed Scrolls Title                      │
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐ │
│ │ 📜 CLAIMROOT SEED SCROLL            │ │
│ │ ID: SCROLL-XXX                      │ │
│ │ ────────────────────────────────── │ │
│ │ Vault Sealed: 🔒 Yes               │ │
│ │ Type: Undevoted Capital            │ │
│ │ Capital: 💰 $50,000 USD            │ │
│ │ Issuer: Heyns Schoeman             │ │
│ │ Status: [ACTIVE]                    │ │
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ [Create New Scroll] [Filter] [Search]  │
└─────────────────────────────────────────┘
```

**Create Scroll Flow:**
```
Click "Create New Scroll"
    ↓
Fill Scroll Details Form
  - Type
  - Issuer
  - Seed Capital
  - Currency
  - Vault Commander
    ↓
Open ClaimRootCheckout
    ↓
Authorization Steps
    ↓
Scroll Created & Sealed
    ↓
Display in Scrolls List
```

### 4. Heatmap View

**Purpose:** Activity visualization and analytics

**Interaction Flow:**
```
Select Time Range (7d/30d/90d)
    ↓
Generate Heatmap Data
    ↓
Render Color-Coded Grid
    ↓
[Optional] Hover for Details
    ↓
[Optional] Click Day for Deep Dive
```

**Layout:**
```
┌─────────────────────────────────────────┐
│ Activity Heatmap    [7d][30d][90d]     │
├─────────────────────────────────────────┤
│ Statistics Cards                        │
│ [Total] [Votes] [Proposals] [Average]  │
├─────────────────────────────────────────┤
│ Daily Heatmap Grid                      │
│ ■ ■ ■ ■ ■ ■ ■                         │
│ ■ ■ ■ ■ ■ ■ ■                         │
│ [Color Legend: Less → More]            │
├─────────────────────────────────────────┤
│ Recent Activity List                    │
│ • 2024-01-15: 45 activities            │
│ • 2024-01-14: 32 activities            │
└─────────────────────────────────────────┘
```

### 5. VaultChain View

**Purpose:** Ledger inspection and verification

**Layout:**
```
┌─────────────────────────────────────────┐
│ VaultChain - Layer 1: Ledger System    │
├─────────────────────────────────────────┤
│ Chain Statistics                        │
│ Total Blocks: 42                        │
│ Chain Status: ✓ Valid                   │
│ Pending Transactions: 0                 │
├─────────────────────────────────────────┤
│ Latest Block                            │
│ Block #41                               │
│ Hash: a3f7c2...                         │
│ Timestamp: 2024-01-15 14:32:15         │
│ Transactions: 3                         │
├─────────────────────────────────────────┤
│ [View Full Chain] [Export Data]        │
└─────────────────────────────────────────┘
```

### 6. Checkout View

**Purpose:** Secure action processing

See dedicated section below.

### 7. Settings View

**Purpose:** System configuration

**Layout:**
```
┌─────────────────────────────────────────┐
│ Settings                                │
├─────────────────────────────────────────┤
│ System Information                      │
│ Version: 1.0.0                          │
│ Compliance: FAA-TREATY-COMPLIANT       │
│ Authority: NEXUS_NAIR                  │
├─────────────────────────────────────────┤
│ Governance Parameters                   │
│ [Edit] Quorum Percentage: 51%          │
│ [Edit] Voting Period: 7 days           │
│ [Edit] Proposal Threshold: 1000        │
├─────────────────────────────────────────┤
│ Account Settings                        │
│ [Update Profile] [Change Password]     │
└─────────────────────────────────────────┘
```

## ClaimRootCheckout Flow

### Purpose

Secure, multi-step authorization for critical actions with VaultLevel 7 security.

### Architecture

**3-Step Process:**
1. **Review** - Verify action details
2. **Authorization** - Enter credentials
3. **Confirmation** - Final approval

### Detailed Flow

#### Step 1: Review

```
┌─────────────────────────────────────────┐
│ ClaimRoot Checkout            [×]       │
├─────────────────────────────────────────┤
│ ⚪ Review  ○ Authorization  ○ Confirm  │
├─────────────────────────────────────────┤
│ Review Action                           │
│                                         │
│ Action Type: CREATE_PROPOSAL            │
│ Vault Level: Level 7                    │
│ Authority: NEXUS_NAIR                  │
│ Compliance: FAA-TREATY-COMPLIANT       │
│                                         │
│ Action Details:                         │
│ Creating a new governance proposal      │
├─────────────────────────────────────────┤
│ [Cancel]                        [Next]  │
└─────────────────────────────────────────┘
```

**User Actions:**
- Review all details
- Verify action type
- Check compliance status
- Click "Next" to proceed
- Click "Cancel" to abort

#### Step 2: Authorization

```
┌─────────────────────────────────────────┐
│ ClaimRoot Checkout            [×]       │
├─────────────────────────────────────────┤
│ ● Review  ⚪ Authorization  ○ Confirm  │
├─────────────────────────────────────────┤
│ Authorization Required                  │
│                                         │
│ Authorization Code:                     │
│ [________________]                      │
│                                         │
│ Vault Signature:                        │
│ [________________]                      │
│                                         │
│ ⓘ Security Notice                      │
│ This action will be recorded on the    │
│ VaultChain ledger and cannot be undone.│
├─────────────────────────────────────────┤
│ [Previous]                      [Next]  │
└─────────────────────────────────────────┘
```

**User Actions:**
- Enter authorization code
- Provide vault signature
- Read security notice
- Click "Next" when complete
- Click "Previous" to go back

#### Step 3: Confirmation

```
┌─────────────────────────────────────────┐
│ ClaimRoot Checkout            [×]       │
├─────────────────────────────────────────┤
│ ● Review  ● Authorization  ⚪ Confirm  │
├─────────────────────────────────────────┤
│ Final Confirmation                      │
│                                         │
│ 🔒 VaultLevel 7 Security Active        │
│ 🛡️ FAA Treaty Compliant               │
│ ✓ Ready for Execution                  │
│                                         │
│ ☐ I confirm that I have reviewed all  │
│   details and authorize this action... │
├─────────────────────────────────────────┤
│ [Previous]                  [Complete]  │
└─────────────────────────────────────────┘
```

**User Actions:**
- Review security indicators
- Check confirmation checkbox
- Click "Complete" to execute
- Click "Previous" if changes needed

#### Success State

```
┌─────────────────────────────────────────┐
│ Action Completed Successfully    [×]    │
├─────────────────────────────────────────┤
│         ✓                               │
│    SUCCESS                              │
│                                         │
│ VaultLevel 7 Receipt Generated          │
│ Receipt ID: VL7-1234567890-abc123      │
│                                         │
│ Your action has been executed and       │
│ recorded on the VaultChain ledger.     │
├─────────────────────────────────────────┤
│ [View Receipt]              [Close]     │
└─────────────────────────────────────────┘
```

## Responsive Design

### Breakpoints

```css
/* Mobile */
@media (max-width: 768px) {
  - Collapse SidePanel by default
  - Stack statistics cards
  - Simplify heatmap grid
}

/* Tablet */
@media (min-width: 769px) and (max-width: 1024px) {
  - Show SidePanel icons only
  - 2-column grid layouts
  - Compact heatmap
}

/* Desktop */
@media (min-width: 1025px) {
  - Full SidePanel with labels
  - 4-column grid layouts
  - Full-size heatmap
}
```

### Mobile Adaptations

**SidePanel:**
- Hidden by default
- Hamburger menu toggle
- Overlay when open
- Touch-friendly targets

**Dashboard:**
- Single column cards
- Collapsible sections
- Simplified quick actions

**Checkout:**
- Full-screen modal
- Larger touch targets
- Simplified forms

## Accessibility

### Keyboard Navigation

- **Tab** - Navigate forward
- **Shift+Tab** - Navigate backward
- **Enter/Space** - Activate buttons
- **Escape** - Close modals
- **Arrow Keys** - Navigate lists

### Screen Reader Support

- Semantic HTML elements
- ARIA labels and roles
- Status announcements
- Error messages
- Form validation feedback

### Visual Accessibility

- High contrast color scheme
- Focus indicators
- Large touch targets (min 44px)
- Clear typography
- Color not sole indicator

## Loading States

### Page Load

```
Show skeleton loaders
    ↓
Fetch data in parallel
    ↓
Populate components
    ↓
Fade in content
```

### Action Processing

```
Show loading spinner
    ↓
Disable interactive elements
    ↓
Display progress message
    ↓
Process action
    ↓
Show success/error
    ↓
Re-enable elements
```

## Error Handling

### Error Display

```
┌─────────────────────────────────────────┐
│ ⚠️ Error                               │
│                                         │
│ Action could not be completed.          │
│                                         │
│ Error: Insufficient voting power        │
│                                         │
│ [Try Again]              [Cancel]       │
└─────────────────────────────────────────┘
```

### Error Recovery

1. **Display clear error message**
2. **Suggest corrective action**
3. **Provide retry option**
4. **Log error for debugging**
5. **Graceful degradation**

## Animation & Transitions

### Subtle Animations

- **Fade In** - 200ms (page loads)
- **Slide** - 300ms (sidepanel)
- **Scale** - 150ms (hover effects)
- **Color** - 200ms (state changes)

### Loading Animations

- **Pulse** - Active status indicators
- **Spinner** - Processing actions
- **Skeleton** - Content loading

## Best Practices

### UI/UX Principles

1. **Consistency** - Uniform patterns
2. **Clarity** - Clear information hierarchy
3. **Feedback** - Immediate user feedback
4. **Efficiency** - Minimal clicks/steps
5. **Safety** - Confirm destructive actions

### Performance

1. **Lazy Load** - Load components on demand
2. **Virtualization** - Long lists
3. **Debouncing** - Search and filters
4. **Caching** - Frequently accessed data
5. **Optimization** - Bundle size and assets

---

This UI flow ensures an intuitive, secure, and efficient user experience in the ClaimRoot governance system.