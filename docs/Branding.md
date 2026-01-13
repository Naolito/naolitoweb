# Naolito Animation Studio - Branding Guidelines

## Brand Identity

**Studio Name:** Naolito  
**Tagline:** Crafting Compelling Animated Stories  
**Positioning:** Boutique animation studio for premium global brands

## Core Values

- **Quality Over Quantity**: Selective client roster ensures creative excellence
- **Character-Driven**: Specializing in character animation and storytelling
- **Professional Excellence**: Enterprise-grade quality for industry leaders
- **Creative Innovation**: Pushing boundaries in animation technology and artistry

## Visual Identity

### Color Palette

#### Primary Colors
- **Primary Blue**: `#0EA5E9` (Tailwind `primary-500`)
  - Represents: Technology, trust, professionalism
  - Usage: Primary CTAs, links, accents
  
- **Purple**: `#9333EA` (Tailwind `purple-600`)
  - Represents: Creativity, innovation, premium quality
  - Usage: Secondary accents, gradients

#### Gradients
- **Primary Gradient**: `from-primary-500 to-purple-600`
  - Usage: Buttons, hero elements, highlights
  - Creates dynamic, creative energy

- **Accent Gradient**: `from-purple-500 to-pink-600`
  - Usage: Secondary elements, decorative features

#### Neutral Colors
- **Dark Background**: `#111827` (gray-900)
- **Card Background**: `#1F2937` (gray-800)
- **Text Primary**: `#FFFFFF` (white)
- **Text Secondary**: `#9CA3AF` (gray-400)
- **Borders**: `#374151` (gray-700)

### Typography

#### Display Font: Poppins
- **Usage**: Headlines, titles, logo
- **Weights**: 400, 500, 600, 700, 800
- **Character**: Modern, bold, confident

#### Body Font: Inter
- **Usage**: Body text, UI elements
- **Weights**: 300, 400, 500, 600, 700
- **Character**: Clean, readable, professional

### Logo

- **Mark**: Gradient square with "N" letter
- **Colors**: Primary-to-purple gradient
- **Effect**: Subtle glow on hover
- **Subtitle**: "Animation Studio" in small text

### Design Principles

1. **Professional First**: Clean, modern aesthetic suitable for enterprise clients
2. **Creative Touches**: Subtle animations and gradients show our creative nature
3. **Clear Hierarchy**: Bold headlines, clear CTAs, organized content
4. **Spacious Layout**: Generous whitespace for breathing room
5. **Responsive Design**: Mobile-first approach

### Animation & Motion

- **Transitions**: 300ms duration for smooth interactions
- **Hover Effects**: Subtle lifts (-translate-y-1 to -translate-y-2)
- **Accent Animations**: Floating gradients in backgrounds (6s ease-in-out)
- **No Excess**: Animations enhance, never distract

## Tone of Voice

### Website Copy
- **Professional yet approachable**: Not stuffy, but serious about quality
- **Confident**: We know we're good at what we do
- **Clear**: No jargon, straightforward language
- **Action-oriented**: Focus on results and partnerships

### Example Phrases
✅ "Boutique animation studio partnering with leading global brands"  
✅ "Character-driven content that resonates"  
✅ "Trusted by Netflix, Amazon, PlayStation, Disney, and Nestlé"  
✅ "Let's create something exceptional"

❌ "The cute side of life" (too playful for enterprise positioning)  
❌ Emoji overuse (unprofessional)  
❌ "Adorable animations" (diminishes professional quality)

## Client Showcase

### Featured Clients
- Netflix
- Amazon
- PlayStation
- Disney
- Nestlé

### Display Guidelines
- **Logo Treatment**: Typography-based with brand colors
- **Presentation**: Clean grid layout, semi-transparent cards
- **Hover States**: Opacity increase, border highlight
- **Context**: Always frame as "partnerships" not just client list

## Photography & Imagery

### Style
- **Modern**: Contemporary animation workspace aesthetics
- **Professional**: High-quality production images
- **Atmospheric**: Moody lighting with color gradients
- **Authentic**: Real animation work, not generic stock

### Unsplash Sources
- Animation workspace imagery
- Creative team collaboration
- Technology and digital art
- Cinematic and artistic compositions

## Component Styling

### Cards
- **Background**: `bg-gray-800/50` with backdrop blur
- **Border**: `border-gray-700/50`
- **Hover**: Border glow, subtle lift, shadow increase
- **Padding**: Generous internal spacing

### Buttons
- **Primary**: Gradient with shadow and glow effect
- **Secondary**: Purple gradient
- **Outline**: Border with fill on hover
- **Sizes**: sm, md, lg with appropriate padding

### Sections
- **Background Gradients**: Dark gray tones
- **Accent Elements**: Floating gradient circles (opacity 10%)
- **Spacing**: py-20 for major sections
- **Max Width**: Container confined to readable widths

## Usage Examples

### Hero Section
```
Background: Gradient with floating accent spheres
Headline: Large, bold, white
Subheadline: Gray-400
CTAs: Primary gradient button + Outline button
Stats: White text with gradient accents
```

### Client Logos
```
Layout: Grid (2 mobile, 5 desktop)
Cards: Semi-transparent with borders
Typography: Large, bold, brand colors
Hover: Opacity 80% → 100%
```

### Project Cards
```
Images: High-quality thumbnails
Title: White, display font
Client: Primary color accent
Category: Small tag
Hover: Lift, glow, border highlight
```

## Don'ts

❌ Don't use pastel colors (not professional enough)  
❌ Don't use emojis in client-facing content  
❌ Don't use overly playful language  
❌ Don't use generic placeholder imagery  
❌ Don't overcomplicate animations  
❌ Don't use Comic Sans or other playful fonts  
❌ Don't make the logo too complex or busy

## Implementation Notes

All branding guidelines are implemented in:
- `tailwind.config.js` - Color system and utilities
- `src/styles/index.css` - Global styles and base layers
- Component files - Following design system
- `src/store/store.ts` - Content aligned with brand voice

## Future Considerations

- Real client logos (when approved)
- Case studies for each featured project
- Team photography (professional headshots)
- Behind-the-scenes content
- Awards and recognition showcase
- Client testimonials
