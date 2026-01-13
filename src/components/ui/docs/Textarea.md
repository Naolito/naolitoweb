# Textarea Component

## Description
A styled textarea component for multi-line text input with label, error states, and helper text support.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | `string` | - | Textarea label text |
| error | `string` | - | Error message to display |
| helperText | `string` | - | Helper text below textarea |
| rows | `number` | `4` | Number of visible text rows |
| className | `string` | `''` | Additional CSS classes |
| ...props | `TextareaHTMLAttributes` | - | All standard textarea attributes |

## Usage Count
**Used 1 time**:
- Contact page (message field)

## Dependencies
- React (forwardRef for form libraries)
- Tailwind CSS

## Example

```tsx
import Textarea from '@/components/ui/Textarea'

// Basic textarea
<Textarea
  label="Message"
  placeholder="Tell us about your project..."
  rows={6}
/>

// With error
<Textarea
  label="Description"
  error="Message must be at least 10 characters"
  value={message}
  onChange={handleChange}
/>

// With helper text
<Textarea
  label="Project Details"
  helperText="Please include as much detail as possible"
  rows={8}
/>
```

## Accessibility
- Proper label association with `htmlFor` and `id`
- Error messages linked to textarea
- Disabled state styling
- Focus ring for keyboard navigation
- Resize handle (vertical only)

## Styling
- Dark background (gray-800)
- Focus ring in primary color
- Error state in red
- Smooth transitions
- Resizable vertically only

## Form Integration
- Uses `forwardRef` for compatibility with form libraries
- Works with react-hook-form, Formik, etc.
- Supports validation and error display

## Future Enhancements
- Character counter
- Rich text editor option
- Auto-resize based on content
- Markdown preview

