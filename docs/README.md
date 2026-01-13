# Documentation

This folder contains all project documentation files.

## Main Documentation Files

### [Architecture.md](./Architecture.md)
Complete architectural guidelines, rules, and best practices for the project. **Read this first** before contributing to the codebase.

Key topics covered:
- Component size limits (<300 lines)
- Store architecture and data flow
- Naming conventions
- Code quality standards
- Documentation requirements

### [componentsGuide.md](./componentsGuide.md)
Comprehensive map of all components, their relationships, dependencies, and usage patterns.

Includes:
- Component hierarchy
- Data flow diagrams
- Usage counts
- Dependency graphs
- Best practices

### [cleanUp.md](./cleanUp.md)
Tracks legacy code, technical debt, and items scheduled for refactoring or removal.

## Component Documentation

Each component has its own `.md` documentation file located in a `docs/` subfolder within its component directory:

### Layout Components
- `src/components/layout/docs/Header.md`
- `src/components/layout/docs/Navigation.md`
- `src/components/layout/docs/Footer.md`

### UI Components
- `src/components/ui/docs/Button.md`
- `src/components/ui/docs/Card.md`
- `src/components/ui/docs/Input.md`
- `src/components/ui/docs/Textarea.md`
- `src/components/ui/docs/ContactForm.md`
- `src/components/ui/docs/ProjectCard.md`

### Section Components
- `src/components/sections/docs/Hero.md`
- `src/components/sections/docs/FeaturedProjects.md`

## Documentation Structure

```
naolitoweb/
├── docs/                           # Main documentation
│   ├── README.md                   # This file
│   ├── Architecture.md             # Architecture guidelines
│   ├── componentsGuide.md          # Component map
│   └── cleanUp.md                  # Technical debt tracking
│
└── src/
    └── components/
        ├── layout/
        │   ├── docs/               # Layout component docs
        │   │   ├── Header.md
        │   │   ├── Navigation.md
        │   │   └── Footer.md
        │   ├── Header.tsx
        │   ├── Navigation.tsx
        │   └── Footer.tsx
        │
        ├── ui/
        │   ├── docs/               # UI component docs
        │   │   ├── Button.md
        │   │   ├── Card.md
        │   │   ├── Input.md
        │   │   ├── Textarea.md
        │   │   ├── ContactForm.md
        │   │   └── ProjectCard.md
        │   ├── Button.tsx
        │   ├── Card.tsx
        │   └── ...
        │
        └── sections/
            ├── docs/               # Section component docs
            │   ├── Hero.md
            │   └── FeaturedProjects.md
            ├── Hero.tsx
            └── FeaturedProjects.tsx
```

## Documentation Standards

All component documentation files should include:

1. **Description**: What the component does
2. **Props**: All props with types and descriptions
3. **Usage Count**: How many times and where it's used
4. **Dependencies**: What other components/libraries it depends on
5. **Example**: Code examples showing usage
6. **Accessibility**: Accessibility features and considerations
7. **Future Enhancements**: Planned improvements

## Quick Links

- [Main README](../README.md) - Project overview and setup
- [Architecture Guidelines](./Architecture.md) - Start here for architecture rules
- [Components Guide](./componentsGuide.md) - Complete component documentation
- [Clean Up](./cleanUp.md) - Technical debt and legacy code

## Contributing to Documentation

When adding or modifying components:

1. Create/update the component's `.md` file in the appropriate `docs/` subfolder
2. Update `componentsGuide.md` with the new component information
3. If introducing technical debt, document it in `cleanUp.md`
4. Ensure all sections of the component documentation are complete
5. Update this README if adding new documentation categories

## Documentation Review Process

- Documentation should be reviewed alongside code changes
- All PRs must include documentation updates for affected components
- Monthly documentation audits to ensure accuracy
- Outdated documentation is considered a bug

