# Card Component

## Description
A flexible card container component with hover effects and customizable padding. Used for displaying projects, team members, services, and other content blocks.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | `ReactNode` | - | Card content (required) |
| hoverable | `boolean` | `false` | Enables hover animation effects |
| padding | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Internal padding size |
| className | `string` | `''` | Additional CSS classes |
| ...props | `HTMLAttributes<HTMLDivElement>` | - | All standard div attributes |

## Usage Count
**Used approximately 20+ times** across:
- Portfolio page (project cards - 6+ instances)
- About page (team member cards - 4 instances)
- Services page (service cards - 6 instances)
- Home page (featured projects - 3 instances)

## Dependencies
- React
- Tailwind CSS

## Example

```tsx
import Card from '@/components/ui/Card'

// Basic card
<Card>
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</Card>

// Hoverable card (for interactive elements)
<Card hoverable onClick={handleClick}>
  <img src="..." alt="..." />
  <h3>Project Name</h3>
</Card>

// Custom padding
<Card padding="lg">
  <div>Large padded content</div>
</Card>

// No padding (for images)
<Card padding="none">
  <img src="..." className="w-full" />
  <div className="p-6">
    <h3>Content below image</h3>
  </div>
</Card>
```

## Styling
- Dark background (gray-800)
- Rounded corners (xl)
- Border with subtle color (gray-700)
- Hover effects when `hoverable` is true:
  - Border color changes to primary
  - Shadow with primary glow
  - Slight lift animation (-translate-y-1)
  - Cursor pointer

## Accessibility
- Semantic div container
- Accepts all standard div attributes
- When used as clickable, ensure proper role attributes are added

## Common Patterns

### Image Card
```tsx
<Card padding="none" hoverable>
  <img src="thumbnail.jpg" className="w-full aspect-video object-cover" />
  <div className="p-6">
    <h3 className="text-xl font-bold">Title</h3>
    <p className="text-gray-400">Description</p>
  </div>
</Card>
```

### Info Card
```tsx
<Card hoverable>
  <div className="flex items-start space-x-4">
    <Icon className="w-8 h-8 text-primary-500" />
    <div>
      <h4 className="font-bold">Service Name</h4>
      <p className="text-gray-400">Service description</p>
    </div>
  </div>
</Card>
```

## Future Enhancements
- Click animation ripple effect
- More border styles (solid, dashed, gradient)
- Shadow variants
- Background image support

