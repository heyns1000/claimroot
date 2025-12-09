# Plant-for-the-Planet Tree Widget Integration

## Overview

ClaimRoot integrates with Plant-for-the-Planet's Trillion Tree Campaign to track planetary health and reforestation progress.

## Setup Instructions

### Step 1: Register & Get Widget Code

1. Go to [widgets.plant-for-the-planet.org](https://widgets.plant-for-the-planet.org)
2. Register or login
3. Create a public profile
4. Navigate to **Settings → Create Widget**
5. Select **Tree Counter**
6. Enter your Profile URL
7. Customize options:
   - Show community trees
   - Select language
8. Generate code and copy the iframe URL

### Step 2: Configure ClaimRoot

**Option A: React Component (Recommended)**

```jsx
import { TreeCounter } from './components/TreeCounter';

function MyComponent() {
  return (
    <TreeCounter 
      widgetUrl="https://widgets.plant-for-the-planet.org/YOUR_WIDGET_URL"
      maxWidth="400px"
      height="300px"
    />
  );
}
```

**Option B: Vanilla HTML**

Use the example files in `public/examples/`:
- `tree-widget-example.html` - Static HTML example
- `tree-widget-dynamic.html` - Dynamic JavaScript loader

### Step 3: Replace Widget URL

In your chosen implementation, replace `YOUR_WIDGET_URL` with the actual URL from Plant-for-the-Planet (e.g., `counters/some-hash`).

## Component API

### TreeCounter Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `widgetUrl` | `string` | **Required** | Full URL to your Plant-for-the-Planet widget |
| `maxWidth` | `string` | `'400px'` | Maximum width of the widget container |
| `height` | `string` | `'300px'` | Height of the iframe |

## Usage Examples

### Dashboard Integration

The TreeCounter is already integrated into the main Dashboard component:

```jsx
// In Dashboard.jsx
<section className="planetary-health">
    <h3>🌍 Planetary Health Tracker</h3>
    <p>Our contribution to global reforestation:</p>
    <TreeCounter 
        widgetUrl="https://widgets.plant-for-the-planet.org/YOUR_WIDGET_URL"
        maxWidth="400px"
        height="300px"
    />
</section>
```

### Custom Page Integration

```jsx
import { TreeCounter } from './components/TreeCounter';

function TreesPage() {
  return (
    <div>
      <h1>Our Environmental Impact</h1>
      <TreeCounter 
        widgetUrl="https://widgets.plant-for-the-planet.org/counters/abc123"
        maxWidth="600px"
        height="400px"
      />
    </div>
  );
}
```

### Multiple Widgets

```jsx
function GlobalImpact() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <TreeCounter 
        widgetUrl="https://widgets.plant-for-the-planet.org/counters/org1"
        maxWidth="100%"
        height="250px"
      />
      <TreeCounter 
        widgetUrl="https://widgets.plant-for-the-planet.org/counters/org2"
        maxWidth="100%"
        height="250px"
      />
    </div>
  );
}
```

## Styling Customization

The TreeCounter component uses inline styles for maximum compatibility. To customize:

### Override Container Styles

```jsx
<div style={{ 
  /* Custom container styles */
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  padding: '20px'
}}>
  <TreeCounter 
    widgetUrl="https://widgets.plant-for-the-planet.org/YOUR_WIDGET_URL"
  />
</div>
```

### Responsive Design

```jsx
<TreeCounter 
  widgetUrl="https://widgets.plant-for-the-planet.org/YOUR_WIDGET_URL"
  maxWidth="100%"  // Full width on mobile
  height="300px"
/>
```

## Troubleshooting

### Widget Not Loading

1. **Check URL**: Ensure the `widgetUrl` is correct and includes `https://`
2. **Network**: Verify you have internet connectivity
3. **Widget Settings**: Confirm the widget is set to "Public" in Plant-for-the-Planet settings
4. **Browser Console**: Check for CORS or iframe errors

### Display Issues

1. **Height**: Adjust the `height` prop if content is cut off
2. **Width**: Use `maxWidth="100%"` for responsive layouts
3. **Loading State**: The component shows a loading indicator while the iframe loads

### CORS Errors

The Plant-for-the-Planet widgets are designed to work in iframes. If you encounter CORS errors:
- Ensure you're using the correct widget URL from Plant-for-the-Planet
- Check that your widget is set to "Public" visibility

## Additional Resources

- [Plant-for-the-Planet Website](https://www.plant-for-the-planet.org/)
- [Trillion Tree Campaign](https://www.trilliontreecampaign.org/)
- [Widget Generator](https://widgets.plant-for-the-planet.org/)

## Support

For issues with:
- **ClaimRoot Integration**: Create an issue in the ClaimRoot repository
- **Widget Configuration**: Contact Plant-for-the-Planet support

## License

This integration follows the ClaimRoot project license. The Plant-for-the-Planet widget follows their terms of service.
