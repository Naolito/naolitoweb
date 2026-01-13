# Hero Component

## Description
The Hero section is the main landing area of the home page. It features a full-screen background image, studio tagline, description, call-to-action buttons, and statistics counters.

## Props
This component doesn't accept any props.

## Features
- Full-screen height with centered content
- Background image with gradient overlay
- Studio tagline and description from store
- Two CTA buttons (View Work and Contact)
- Statistics grid (projects, clients, years, team members)
- Scroll indicator animation
- Fade-in animation on load
- Responsive text sizing

## Usage Count
**Used 1 time**:
- Home page

## Data Source
Fetches studio information from the global store:
- `studioInfo.tagline`
- `studioInfo.description`
- `studioInfo.stats` (all four metrics)

## Dependencies
- `Button` component
- `useStore` hook from store
- React Router's `Link` component

## Example

```tsx
import Hero from '@/components/sections/Hero'

function HomePage() {
  return (
    <div>
      <Hero />
      {/* Other sections */}
    </div>
  )
}
```

## Layout Structure
1. **Background Layer**: Image with gradient overlay
2. **Content Layer**: 
   - Heading (tagline)
   - Subheading (description)
   - CTA buttons
   - Stats grid
3. **Scroll Indicator**: Animated arrow at bottom

## Styling
- Min height: 100vh (full viewport)
- Background: Dark gradient overlay on image
- Text: White with gray accents
- Stats: Primary color with large numbers
- Animations: Fade-in and bounce

## CTA Buttons
- **Primary**: "View Our Work" → Links to /portfolio
- **Outline**: "Get in Touch" → Links to /contact

## Statistics
- Projects Completed: 250+
- Happy Clients: 120+
- Years Experience: 12+
- Team Members: 35+

## Accessibility
- Semantic HTML structure
- Alt text on background image
- Keyboard navigable buttons
- High contrast text

## Responsive Design
- Text scales down on mobile
- Stats grid: 2 columns on mobile, 4 on desktop
- Buttons stack vertically on mobile
- Padding adjusts for different screen sizes

## Future Enhancements
- Video background option
- Parallax scrolling effect
- Animated text reveal
- Typing animation for tagline
- Integration with showreel video player

