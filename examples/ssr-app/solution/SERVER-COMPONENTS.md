*English · [Deutsch](SERVER-COMPONENTS.de.md)*

# Sketch: the product page with Server Components

## What happens today

The server renders the whole `App` to HTML. The browser nevertheless loads the code of all components afterwards (`App`, review list, price format) and renders them once more during hydration, only to make a single button interactive. The data travels twice: as HTML and as JSON in `<script id="initial-data">`.

## With Server Components

```text
ProductPage            Server Component, async, loads data directly
├── ProductDetails     Server Component (name, description, price)
├── AddToCartButton    'use client' – the only client code
└── ReviewList         Server Component, may load its own data
    └── ReviewItem     Server Component
```

```tsx
// ProductPage.tsx – Server Component, no 'use client'
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
// unchanged: useState and onClick need the browser
```

- Only `AddToCartButton` ends up in the client bundle. Props across the boundary must be serializable (`productName: string`, no functions).
- `loadProductPage` runs only on the server. Secrets, database clients, and large libraries such as a Markdown parser for the description stay there.
- The initial data as JSON goes away; the payload of the React Server Components (RSC payload) replaces it.

## When is it worth it?

- Much of the content is display only, little is interactive: shop, docs, content pages.
- Data lives close to the server, and waterfalls between browser and API cost noticeable time.
- The client bundle is too large because libraries are only needed for rendering.

Rather not when the app is almost entirely interactive (editor, dashboard with live data) or there is no server at runtime (pure static hosting).

## With what?

Server Components need a bundler that separates server and client modules. A framework provides that: Next.js (App Router), React Router in RSC mode, or `@vitejs/plugin-rsc` for Vite directly. A custom `renderToPipeableStream` server like the one in this example is not enough for that.
