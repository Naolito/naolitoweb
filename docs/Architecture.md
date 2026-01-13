# Architecture Guidelines

## Project Overview
This document defines the architectural rules and guidelines for the Animation Studio website. The goal is to maintain a clean, scalable, and maintainable codebase that can evolve from a static frontend to a fully dynamic content management system.

## Core Principles

### 1. Component Architecture
- **Small Components**: All components must be under 300 lines of code
- **Dumb Components**: Components should be presentational and stateless when possible
- **Single Responsibility**: Each component should do one thing well
- **Reusability**: Design components to be reusable across different contexts

### 2. State Management
- **Centralized Store**: `store.ts` manages all application state
- **Future-Ready**: Store is designed to integrate with Supabase when backend is implemented
- **No Direct API Calls**: Components never call APIs directly - always through store
- **Data Flow**: Unidirectional data flow from store to components

### 3. File Organization

```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Layout components (Header, Footer, Navigation)
│   ├── ui/             # Basic UI components (Button, Card, Input, etc.)
│   └── sections/       # Section-specific components
├── pages/              # Page-level components
├── store/              # State management
│   └── store.ts        # Central store with Supabase integration ready
├── assets/             # Static assets (images, videos, fonts)
├── types/              # TypeScript type definitions
└── styles/             # Global styles and Tailwind configuration
```

### 4. Component Documentation
Every component must have a corresponding `.md` file with:
- **Description**: What the component does
- **Props**: All props with types and descriptions
- **Usage Count**: How many times and where it's used
- **Examples**: Code examples showing how to use it

### 5. Code Quality Standards

#### TypeScript
- Use TypeScript for all code
- Define interfaces for all props and data structures
- Avoid `any` type - use `unknown` if type is truly unknown
- Export types from a central location

#### Styling
- Use Tailwind CSS utility classes
- Keep custom CSS minimal
- Mobile-first responsive design
- Use Tailwind's built-in animations

#### Naming Conventions
- **Components**: PascalCase (e.g., `ProjectCard.tsx`)
- **Files**: Match component name
- **Props**: camelCase with descriptive names
- **Constants**: UPPER_SNAKE_CASE
- **Functions**: camelCase with verb prefixes (get, set, handle, etc.)

### 6. Store Architecture

`store.ts` responsibilities:
- Manage all application content
- Provide data to components via hooks or context
- Handle future Supabase integration
- Cache data appropriately
- Handle loading and error states

Example structure:
```typescript
interface StoreState {
  projects: Project[];
  teamMembers: TeamMember[];
  services: Service[];
  contactInfo: ContactInfo;
}
```

### 7. Component Communication
- **Props Down**: Parent components pass data via props
- **Events Up**: Child components emit events via callbacks
- **Store for Global State**: Use store for data needed across multiple pages
- **No Prop Drilling**: If props go through more than 2 levels, use context or store

### 8. Performance Guidelines
- Lazy load routes and heavy components
- Optimize images and videos
- Use React.memo for expensive components
- Avoid unnecessary re-renders
- Keep bundle size small

### 9. Documentation Files

#### `componentsGuide.md`
Maps all components and their relationships:
- Component hierarchy
- Data flow between components
- Shared components and their usage
- Component dependencies

#### `cleanUp.md`
Documents legacy code for future cleanup:
- Deprecated components
- Unused code
- Technical debt items
- Refactoring opportunities

### 10. Future Considerations

#### Supabase Integration (Phase 2)
- `store.ts` will handle all Supabase calls
- Real-time subscriptions for content updates
- Authentication for edit mode
- File storage for images and videos

#### Edit Mode (Phase 2)
- In-place content editing
- Draft/publish workflow
- Media upload and management
- User permissions

## Development Workflow

1. **Before Creating a Component**
   - Check `componentsGuide.md` for existing components
   - Ensure component is needed and doesn't duplicate functionality
   - Design component to be small and focused

2. **When Creating a Component**
   - Create component file (max 300 lines)
   - Create corresponding `.md` documentation
   - Add to `componentsGuide.md`
   - Write TypeScript interfaces

3. **When Modifying a Component**
   - Update component code
   - Update corresponding `.md` file
   - Update usage count if changed
   - Test in all locations where used

4. **When Removing Code**
   - Document in `cleanUp.md` before removing
   - Check for dependencies
   - Update `componentsGuide.md`

## Technology Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **State Management**: Zustand
- **Future Backend**: Supabase

## Brand Identity

- **Studio Name**: Naolito
- **Positioning**: Boutique animation studio for premium global brands
- **Clients**: Netflix, Amazon, PlayStation, Disney, Nestlé
- **Specialty**: Character-driven animation
- **Style**: Professional, modern, creative with subtle flair

For complete branding guidelines, see [Branding.md](./Branding.md)

## Code Review Checklist

Before committing code, ensure:
- [ ] Component is under 300 lines
- [ ] Component has `.md` documentation
- [ ] TypeScript types are properly defined
- [ ] No direct API calls (all through store)
- [ ] Component is reusable and focused
- [ ] Mobile responsive
- [ ] No console errors or warnings
- [ ] Code follows naming conventions
- [ ] `componentsGuide.md` is updated

## Scalability Considerations

The architecture is designed to scale in these dimensions:
1. **Content**: Easy to add new sections and pages
2. **Features**: Edit mode can be added without major refactoring
3. **Team**: Clear structure makes onboarding easier
4. **Performance**: Modular design allows for code splitting
5. **Backend**: Store abstraction makes backend integration seamless

