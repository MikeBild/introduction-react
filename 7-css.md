# Styling

Styles gehören zur Component. Globales CSS mit Klassen wie `.btn-primary` wächst unkontrolliert: Niemand traut sich, eine Regel zu löschen.

## Optionen

- **Tailwind CSS 4:** Utility-Klassen direkt im JSX, eingebunden über `@tailwindcss/vite` und `@import "tailwindcss";`.
- **CSS Modules:** `Button.module.css` neben der Component, Klassen lokal pro Datei.
- **Inline Styles:** nur für Werte, die zur Laufzeit berechnet werden.

## Variants statt Klassen-Strings

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

## Übung

Lektion **Styles gehören zur Component** (`react-styling`): [examples/styling-tailwind](examples/styling-tailwind/README.md)

Die alte Fassung dieses Kapitels liegt unter [legacy/chapters/7-css.md](legacy/chapters/7-css.md).
