# FeaturedProjects Component

## Description
Displays a grid of featured projects from the portfolio on the home page. Shows the top 3 featured projects with a link to view all projects.

## Props
This component doesn't accept any props.

## Features
- Displays first 3 featured projects
- Responsive grid layout (1/2/3 columns)
- Section heading and description
- "View All Projects" CTA button
- Slide-up animation on projects
- Pulls data from store

## Usage Count
**Used 1 time**:
- Home page

## Data Source
Fetches featured projects from the global store using the `getFeaturedProjects()` selector, which filters projects where `featured: true`.

## Dependencies
- `ProjectCard` component
- `Button` component
- `useStore` hook from store
- React Router's `Link` component

## Example

```tsx
import FeaturedProjects from '@/components/sections/FeaturedProjects'

function HomePage() {
  return (
    <div>
      <Hero />
      <FeaturedProjects />
      {/* Other sections */}
    </div>
  )
}
```

## Layout Structure
1. **Section Header**: Title and description
2. **Projects Grid**: 3 ProjectCard components
3. **CTA Button**: Link to full portfolio

## Styling
- Background: Dark gray (gray-900)
- Vertical padding: 80px (py-20)
- Grid: Responsive (1 → 2 → 3 columns)
- Gap between cards: 32px (gap-8)

## Grid Breakpoints
- Mobile (< 768px): 1 column
- Tablet (768px - 1024px): 2 columns
- Desktop (> 1024px): 3 columns

## Animation
Projects use `animate-slide-up` class from Tailwind config for entrance animation.

## Filtering Logic
```typescript
getFeaturedProjects: () => {
  return projects.filter(project => project.featured)
}
```

Currently shows `.slice(0, 3)` to limit to 3 projects.

## Accessibility
- Semantic section element
- Proper heading hierarchy (h2)
- Keyboard navigable cards and button

## Future Enhancements
- Carousel/slider for mobile
- Infinite scroll or pagination
- Filter by category
- Animated number counter
- "New" badge for recent projects
- Lazy loading for images

