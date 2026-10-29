# Styling mit Tailwind

Die Checkout Form des Werkstatt-Shops mit Positionen und Summe, gestylt mit globalem CSS aus `src/styles.css`. Jede Klasse wie `.btn` gilt überall in der App – wer sie ändert, ändert jeden Button. Du ziehst die Styles in die Component und baust einen Button mit drei Variants.

Lektion: **Styles gehören zur Component** (`react-styling`)

```bash
npm install
npm run dev
npm test
```

[Tailwind CSS v4](https://tailwindcss.com) ist schon eingerichtet: Das Plugin `@tailwindcss/vite` steht in `vite.config.ts`, und `src/tailwind.css` enthält `@import 'tailwindcss'`. Eine `tailwind.config.js` brauchst du nicht.

Produkte, Positionen und `formatCents` kommen aus `src/shop.ts`, der gemeinsamen Domäne des Werkstatt-Shops. Beträge rechnet die App in ganzen Cent.

## Übung

1. Importier in `src/App.tsx` `./tailwind.css` statt `./styles.css` und lösch `src/styles.css`.
2. Bau `src/Button.tsx` mit drei Variants. Leg die Klassen in eine Map `variantClasses` und leite den Typ der Prop daraus ab (`keyof typeof variantClasses`):
   - `primary`: `bg-blue-700 text-white hover:bg-blue-800`
   - `secondary`: `bg-white text-slate-900 border border-slate-300`
   - `danger`: `bg-red-700 text-white hover:bg-red-800`
3. Schreib jede Klasse vollständig aus. Tailwind findet nur Klassen, die so im Code stehen – `bg-${color}-600` erkennt es nicht.
4. Ersetze in `src/CheckoutForm.tsx` die drei Buttons durch `<Button>` und die übrigen Klassen (`checkout-form`, `field`, `actions`, `order-summary`, `total`) durch Utilities.
5. Entferne `.skip` in `src/CheckoutForm.test.tsx`.
6. Prüf mit `npm run build`, dass die CSS-Datei in `dist/assets` genau die Utilities enthält, die du benutzt.

## Lösung

`solution/Button.tsx`, `solution/CheckoutForm.tsx`, `solution/App.tsx` und die Tests.

Um die Lösung im Browser zu sehen, ändere den Import in `src/main.tsx` auf `../solution/App`.
