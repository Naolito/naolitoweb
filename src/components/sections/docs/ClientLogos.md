# ClientLogos Component

## Description
Professional showcase section displaying Naolito's premium clients including Netflix, Amazon, PlayStation, Disney, and Nestlé. Features clean typography-based design with subtle animations.

## Props
This component doesn't accept any props.

## Features
- 5 premium client showcases
- Typography-based logo representations
- Brand colors per client
- Professional hover effects
- Responsive grid layout
- Client partnership statement

## Usage Count
**Used 1 time**:
- Home page (after Hero section)

## Dependencies
- None (fully self-contained)

## Example

```tsx
import ClientLogos from '@/components/sections/ClientLogos'

function HomePage() {
  return (
    <div>
      <Hero />
      <ClientLogos />
      <FeaturedProjects />
    </div>
  )
}
```

## Clients Featured
1. **Netflix** - Red
2. **Amazon** - Orange
3. **PlayStation** - Blue
4. **Disney** - Blue
5. **Nestlé** - Dark Red

## Styling
- Background: Dark gradient (gray-900 to gray-800)
- Cards: Semi-transparent with borders
- Hover: Opacity change + border highlight
- Typography: Large, bold, brand colors
- Professional and clean aesthetic

## Future Enhancements
- Replace text with actual client logos (when approved)
- Add case study links per client
- Client testimonials
- More clients as portfolio grows
- Animated logo reveals on scroll
