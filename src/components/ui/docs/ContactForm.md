# ContactForm Component

## Description
A complete contact form with validation, error handling, and success states. Collects name, email, subject, and message from users.

## Props
This component doesn't accept any props.

## Features
- Client-side validation for all fields
- Email format validation
- Real-time error clearing
- Loading state during submission
- Success message after submission
- Responsive grid layout
- Form reset after successful submission

## Usage Count
**Used 1 time**:
- Contact page

## Dependencies
- `Input` component
- `Textarea` component
- `Button` component
- React hooks (useState)

## Form Fields
| Field | Type | Validation |
|-------|------|------------|
| Name | Text | Required, non-empty |
| Email | Email | Required, valid email format |
| Subject | Text | Required, non-empty |
| Message | Textarea | Required, min 10 characters |

## Example

```tsx
import ContactForm from '@/components/ui/ContactForm'

function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h2>Get in Touch</h2>
      <ContactForm />
    </div>
  )
}
```

## Form Handling

### Current Implementation (Mock)
- Simulates API delay with setTimeout
- Logs form data to console
- Shows success message

### Future Implementation
```tsx
// TODO: Replace with Supabase integration
const { error } = await supabase
  .from('contact_submissions')
  .insert([formData])

// Or send email via API
await fetch('/api/contact', {
  method: 'POST',
  body: JSON.stringify(formData)
})
```

## Validation Rules
- **Name**: Required, cannot be empty or whitespace only
- **Email**: Required, must match email regex pattern
- **Subject**: Required, cannot be empty or whitespace only
- **Message**: Required, minimum 10 characters

## States
- **Idle**: Initial state, ready for input
- **Validating**: Checking form fields on submit
- **Submitting**: Sending data to backend (loading spinner)
- **Success**: Data submitted successfully (success message)
- **Error**: Validation errors displayed inline

## Styling
- Two-column grid for name and email on desktop
- Full-width subject and message fields
- Error messages in red below invalid fields
- Success message in green
- Smooth transitions between states

## Accessibility
- All inputs have proper labels
- Required fields marked
- Error messages associated with inputs
- Submit button disabled during submission
- Focus management

## Future Enhancements
- File attachment support (for project briefs)
- reCAPTCHA integration
- Phone number field with country code selector
- Preferred contact method selection
- Project budget range selector
- Timeline/deadline field

