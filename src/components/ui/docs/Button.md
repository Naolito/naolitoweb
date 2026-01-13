# Button Component

## Description
A versatile button component with multiple variants, sizes, and states. Provides consistent styling across the application.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `'primary' \| 'secondary' \| 'outline' \| 'ghost'` | `'primary'` | Visual style variant |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| children | `ReactNode` | - | Button content (required) |
| fullWidth | `boolean` | `false` | Makes button full width |
| isLoading | `boolean` | `false` | Shows loading spinner |
| className | `string` | `''` | Additional CSS classes |
| ...props | `ButtonHTMLAttributes` | - | All standard button attributes |

## Variants
- **primary**: Blue gradient, main CTA buttons
- **secondary**: Red accent color, secondary actions
- **outline**: Transparent with border, alternative actions
- **ghost**: Minimal style, subtle actions

## Usage Count
**Used approximately 15+ times** across:
- Home page (Hero CTA, featured projects)
- Portfolio page (filter buttons, project CTAs)
- About page (team member links)
- Services page (service CTAs)
- Contact page (form submit button)

## Dependencies
- React
- Tailwind CSS

## Example

```tsx
import Button from '@/components/ui/Button'

// Primary button
<Button variant="primary" size="lg">
  Get Started
</Button>

// Loading state
<Button variant="primary" isLoading>
  Submitting...
</Button>

// Outline button
<Button variant="outline" onClick={handleClick}>
  Learn More
</Button>

// Full width
<Button variant="secondary" fullWidth>
  Contact Us
</Button>
```

## Accessibility
- Proper focus states with ring
- Disabled state styling
- Loading state prevents interaction
- Accepts all standard button attributes (aria-label, etc.)

## Styling
- Uses Tailwind utility classes
- Smooth transitions on all interactions
- Focus ring for keyboard navigation
- Disabled state with reduced opacity

## Future Enhancements
- Icon support (left/right icons)
- Button group component
- More variants (danger, success, warning)
- Tooltip support

