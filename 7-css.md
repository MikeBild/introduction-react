*English · [Deutsch](7-css.de.md)*

# Styling

Styles belong with the component. Global CSS with classes like `.btn-primary` grows out of control: nobody dares to delete a rule.

## Options

- **Tailwind CSS 4:** utility classes directly in JSX, wired up through `@tailwindcss/vite` and `@import "tailwindcss";`.
- **CSS Modules:** `Button.module.css` next to the component, classes scoped to the file.
- **Inline styles:** only for values computed at runtime.

## Variants instead of class strings

```tsx
const variantClasses = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-white text-gray-900 ring-1 ring-gray-300',
  danger: 'bg-red-600 text-white hover:bg-red-700',
} satisfies Record<string, string>;

type ButtonProps = ComponentProps<'button'> & { variant?: keyof typeof variantClasses };

export const Button = ({ variant = 'primary', className = '', ...props }: ButtonProps) => (
  <button className={`rounded px-4 py-2 ${variantClasses[variant]} ${className}`} {...props} />
);
```

## Exercise

Lesson **Styles belong with the component** (`react-styling`): [examples/styling-tailwind](examples/styling-tailwind/README.md)

The earlier version of this chapter is in [archive/chapters/7-css.md](archive/chapters/7-css.md).
