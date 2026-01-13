# Footer Component

## Description
The Footer component displays contact information, navigation links, social media links, and copyright information. It appears at the bottom of all pages and uses data from the store for dynamic content.

## Props
This component doesn't accept any props.

## Features
- 4-column responsive grid layout
- Company information and tagline
- Quick navigation links
- Contact information with clickable email and phone
- Social media icons with links
- Dynamic copyright year
- Dark theme design

## Usage Count
**Used 5 times** - Once on each page:
- Home page
- Portfolio page
- About page
- Services page
- Contact page

## Data Source
Fetches contact information from the global store (`useStore`):
- Email address
- Phone number
- Physical address
- Social media links

## Dependencies
- `useStore` hook from store
- React Router's `Link` component

## Example

```tsx
import Footer from '@/components/layout/Footer'

function Page() {
  return (
    <div>
      {/* Page content */}
      <Footer />
    </div>
  )
}
```

## Social Platforms Supported
- LinkedIn
- Twitter
- Instagram
- YouTube
- Vimeo

## Styling
- Dark background (gray-950) with border
- 4-column grid on large screens, responsive to 1 column on mobile
- Hover effects on all interactive elements
- Primary color accents on hover

## Accessibility
- Semantic HTML footer element
- Proper heading hierarchy
- `aria-label` on social media links
- `rel="noopener noreferrer"` on external links
- Phone and email links with proper protocols

## Future Enhancements
- Newsletter signup form
- Additional company links (Privacy, Terms, etc.)
- Language selector
- Awards and certifications display

