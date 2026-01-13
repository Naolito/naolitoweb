# ProjectCard Component

## Description
A card component specifically designed to display project information in the portfolio. Features thumbnail image, category badge, project details, and hover animations.

## Props
| Prop | Type | Description |
|------|------|-------------|
| project | `Project` | Project object containing all project data (required) |

### Project Type Structure
```typescript
{
  id: string
  title: string
  description: string
  category: ProjectCategory
  thumbnailUrl: string
  videoUrl?: string
  images: string[]
  client?: string
  year: number
  featured: boolean
}
```

## Usage Count
**Used 6+ times**:
- Portfolio page (all projects in grid)
- Home page (featured projects section)

## Dependencies
- `Card` component
- `Project` type from types
- React Router's `Link` (if clickable to project detail)

## Features
- Aspect ratio maintained image (16:9)
- Category badge overlay
- Hover zoom effect on image
- Gradient overlay on hover
- Featured badge for highlighted projects
- Client name and year display
- Text truncation for long descriptions (line-clamp-2)

## Example

```tsx
import ProjectCard from '@/components/ui/ProjectCard'
import { useStore } from '@/store/store'

function PortfolioGrid() {
  const projects = useStore(state => state.projects)
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}
```

## Styling
- Image with scale animation on hover
- Category badge with primary color
- Featured star icon with yellow color
- Gray text for metadata
- Hover effects on title (changes to primary color)
- Gradient overlay appears on hover

## Layout Sections
1. **Image Section**: Thumbnail with category badge and hover overlay
2. **Content Section**: Title, description, and metadata

## Accessibility
- Alt text on images
- Semantic HTML structure
- Keyboard accessible (if wrapped in Link)

## Performance
- Images should be optimized
- Consider lazy loading for images
- Use proper image dimensions

## Future Enhancements
- Click to open project detail modal/page
- Play button overlay for video projects
- Share button
- Like/favorite functionality
- Image carousel for multiple project images
- Tags in addition to category
- View count display

