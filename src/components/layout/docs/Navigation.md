# Navigation Component

## Description
The Navigation component handles all main menu navigation for the website. It provides both desktop and mobile responsive navigation menus with smooth animations and active state indicators.

## Props
This component doesn't accept any props.

## Features
- Responsive design (desktop horizontal menu, mobile hamburger menu)
- Active route highlighting
- Smooth animations for menu transitions
- Hamburger menu animation (three-line to X)
- Backdrop blur effect on mobile menu
- Automatic menu close on navigation

## Usage Count
**Used 1 time** - Inside the Header component

## Navigation Links
- Home (/)
- Portfolio (/portfolio)
- About (/about)
- Services (/services)
- Contact (/contact)

## Dependencies
- React Router's `Link` and `useLocation` hooks
- React's `useState` hook

## Example

```tsx
import Navigation from '@/components/layout/Navigation'

function Header() {
  return (
    <header>
      <div className="logo">...</div>
      <Navigation />
    </header>
  )
}
```

## Styling
- Desktop: Horizontal menu with hover effects
- Mobile: Full-width dropdown menu
- Active state: Primary color with underline (desktop) or text color (mobile)
- Animations: slideDown for mobile menu, smooth transitions

## Accessibility
- `aria-label` on mobile menu button
- `aria-expanded` state indicator
- `sr-only` screen reader text
- Keyboard navigation support via Link components

## Future Enhancements
- Dropdown submenus for service categories
- Language selector
- Theme toggle (dark/light mode)

