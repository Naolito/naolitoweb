# Input Component

## Description
A styled text input component with label, error states, and helper text support. Used in forms across the application.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | `string` | - | Input label text |
| error | `string` | - | Error message to display |
| helperText | `string` | - | Helper text below input |
| className | `string` | `''` | Additional CSS classes |
| ...props | `InputHTMLAttributes` | - | All standard input attributes |

## Usage Count
**Used approximately 5 times**:
- Contact page (name, email, subject, phone fields)
- Future search functionality

## Dependencies
- React (forwardRef for form libraries)
- Tailwind CSS

## Example

```tsx
import Input from '@/components/ui/Input'

// Basic input
<Input
  label="Full Name"
  placeholder="Enter your name"
  required
/>

// With error
<Input
  label="Email"
  type="email"
  error="Please enter a valid email address"
  value={email}
  onChange={handleChange}
/>

// With helper text
<Input
  label="Phone"
  type="tel"
  helperText="Include country code"
/>

// Using with react-hook-form
import { useForm } from 'react-hook-form'

const { register, formState: { errors } } = useForm()

<Input
  label="Name"
  {...register('name', { required: 'Name is required' })}
  error={errors.name?.message}
/>
```

## Accessibility
- Proper label association with `htmlFor` and `id`
- Error messages linked to input
- Disabled state styling
- Focus ring for keyboard navigation
- Supports all ARIA attributes

## Styling
- Dark background (gray-800)
- Focus ring in primary color
- Error state in red
- Smooth transitions
- Placeholder text in gray-500

## Form Integration
- Uses `forwardRef` for compatibility with form libraries
- Works with react-hook-form, Formik, etc.
- Supports validation and error display

## Future Enhancements
- Icon support (left/right icons)
- Input groups (prefix/suffix)
- Character counter
- Password visibility toggle
- Autocomplete suggestions

