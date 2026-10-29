# Skizze: die Produktseite mit Server Components

## Was heute passiert

Der Server rendert die ganze `App` zu HTML. Der Browser lädt danach trotzdem den Code aller Components (`App`, Bewertungsliste, Preisformat) und rendert sie bei der Hydration noch einmal, nur um einen einzigen Button interaktiv zu machen. Die Daten reisen doppelt: als HTML und als JSON in `<script id="initial-data">`.

## Mit Server Components

```text
ProductPage            Server Component, async, lädt Daten direkt
├── ProductDetails     Server Component (Name, Beschreibung, Preis)
├── AddToCartButton    'use client' – einziger Client-Code
└── ReviewList         Server Component, darf eigene Daten laden
    └── ReviewItem     Server Component
```

```tsx
// ProductPage.tsx – Server Component, kein 'use client'
export default async function ProductPage({
  productId,
}: {
  productId: string;
}) {
  const { product, reviews } = await loadProductPage(productId);
  return (
    <main>
      <ProductDetails product={product} />
      <AddToCartButton productName={product.name} />
      <ReviewList reviews={reviews} />
    </main>
  );
}
```

```tsx
// AddToCartButton.tsx
'use client';
// unverändert: useState und onClick brauchen den Browser
```

- Nur `AddToCartButton` landet im Client Bundle. Props über die Grenze müssen serialisierbar sein (`productName: string`, keine Funktionen).
- `loadProductPage` läuft nur auf dem Server. Secrets, Datenbank-Clients und große Libraries wie ein Markdown-Parser für die Beschreibung bleiben dort.
- Die Initial Data als JSON entfällt, der RSC Payload ersetzt sie.

## Wann lohnt sich das?

- Viele Inhalte sind nur Anzeige, wenig ist interaktiv: Shop, Docs, Content-Seiten.
- Daten liegen nah am Server, und Wasserfälle zwischen Browser und API kosten spürbar Zeit.
- Das Client Bundle ist zu groß, weil Libraries nur fürs Rendern gebraucht werden.

Eher nicht, wenn die App fast komplett interaktiv ist (Editor, Dashboard mit Live-Daten) oder kein Server zur Laufzeit vorhanden ist (reines Static Hosting).

## Womit?

Server Components brauchen einen Bundler, der Server- und Client-Module trennt. Das liefert ein Framework: Next.js (App Router), React Router im RSC-Modus oder direkt `@vitejs/plugin-rsc` für Vite. Ein eigener `renderToPipeableStream`-Server wie in diesem Beispiel reicht dafür nicht.
