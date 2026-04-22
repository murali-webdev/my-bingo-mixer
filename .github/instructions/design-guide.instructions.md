---
name: design-guide
description: Guidelines for creating minimalist monochrome designs with clean aesthetics and subtle interactions
---

# Design Guide: Minimalist Mono Theme

When designing or redesigning UI components for the Bingo Mixer app, follow these principles to maintain a cohesive minimalist monochrome aesthetic:

## Color Palette
- **Primary Colors**: Pure black (#000000) and white (#FFFFFF)
- **Accent Grays**: Light gray (#F5F5F5), medium gray (#9CA3AF), dark gray (#374151)
- **Avoid**: Any saturated colors, gradients, or vibrant accents
- **Usage**: Use grays for state differentiation (unmarked → marked → winning)

## Typography
- **Font Family**: System fonts (system-ui, -apple-system, sans-serif)
- **Enhancements**: Add subtle letter-spacing (0.025em) for a "mono-inspired" feel
- **Hierarchy**: Black for headings, medium gray for body, light gray for secondary text
- **Weights**: Bold for emphasis, regular for body text

## Layout & Spacing
- **Minimalism**: Generous whitespace, subtle borders (border-gray-300), minimal shadows
- **Components**: Clean cards with white backgrounds and thin borders
- **Interactions**: Use opacity changes and gray variations instead of color shifts
- **Buttons**: Black backgrounds with white text, gray active states

## Component States
- **Default**: White background, gray text, subtle border
- **Active/Hover**: Light gray background
- **Selected**: Medium gray background and border
- **Highlighted**: Dark gray background and border
- **Feedback**: Gray checkmarks and indicators instead of colored ones

## Visual Effects
- **Shadows**: Minimal or none (shadow-lg instead of shadow-xl)
- **Animations**: Subtle transitions (duration-150), simple bounce for celebrations
- **Icons/Symbols**: Keep emoji if they fit, or use simple monochrome symbols

## Accessibility
- **Contrast**: Ensure sufficient contrast in grayscale (WCAG AA compliant)
- **Focus States**: Clear gray focus indicators
- **Semantic HTML**: Maintain proper ARIA labels and structure

## Application
Apply these guidelines to all new UI components and redesigns to maintain visual consistency. For special cases (celebration modals, etc.), use the darkest grays for emphasis while staying within the monochrome palette.

This creates a sophisticated, timeless aesthetic that's perfect for professional and social applications.
