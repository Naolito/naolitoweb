# Header Component

## Description
The Header component is a sticky navigation bar that appears at the top of all pages. It includes the studio logo and main navigation menu. The header has a transparent background that becomes opaque with a blur effect when the user scrolls down.

## Props
This component doesn't accept any props.

## Features
- Sticky positioning at the top of viewport
- Dynamic background opacity based on scroll position
- Responsive logo with hover effects
- Integrated Navigation component
- Glassmorphism effect when scrolled

## Usage Count
**Used 5 times** - Once on each page:
- Home page
- Portfolio page
- About page
- Services page
- Contact page

## Dependencies
- `Navigation` component for menu items
- React Router's `Link` and `useLocation` hooks
- React's `useState` and `useEffect` hooks

## Example

```tsx
import Header from '@/components/layout/Header'

function Page() {
  return (
    <div>
      <Header />
      {/* Page content */}
    </div>
  )
}
```

## Styling
- Uses Tailwind CSS utilities
- Custom colors: primary-500 for accent
- Backdrop blur effect when scrolled
- Transitions for smooth state changes

## Future Enhancements
- Edit mode toggle button (Phase 2)
- User authentication indicator (Phase 2)
- Search functionality

