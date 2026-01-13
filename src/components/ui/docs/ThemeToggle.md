# ThemeToggle Component

## Description
Button component that toggles between light and dark theme modes. Persists user preference to localStorage and syncs with system preferences.

## Props
This component doesn't accept any props.

## Features
- Toggle between light/dark modes
- Persistent theme preference
- System preference detection
- Animated icon transitions
- Accessible button with aria-label

## Usage Count
**Used 1 time**:
- Header component (navigation area)

## Dependencies
- `useTheme` hook from ThemeContext

## Example

```tsx
import ThemeToggle from '@/components/ui/ThemeToggle'

function Header() {
  return (
    <nav>
      <ThemeToggle />
    </nav>
  )
}
```

## Styling
- Light mode: Shows moon icon, gray background
- Dark mode: Shows sun icon with yellow color
- Hover: Slightly darker background
- Size: 40x40px fixed button
- Icons: 20x20px

