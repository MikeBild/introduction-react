# SSR App

Die Produktseite des Werkstatt-Shops mit Server-Side Rendering: Der Server rendert per `renderToPipeableStream` fertiges HTML und streamt es an den Browser. Die Seite sieht sofort vollständig aus – aber der Button „In den Warenkorb“ reagiert nicht.

Zusatzkapitel: **Wann lohnen sich Server Components?** (`react-server-components`)

```bash
npm install
npm run dev          # Startpunkt mit Vite im Middleware Mode, http://localhost:5173
npm test
npm run build
npm start            # Production-Server aus dist/
```

Node 26 führt `server.ts` direkt aus (Type Stripping), du brauchst dafür keinen eigenen Build-Schritt.

## Aufbau

| Datei                     | Läuft auf | Aufgabe                                                    |
| ------------------------- | --------- | ---------------------------------------------------------- |
| `server.ts`               | Server    | Express-5-Server, lädt Daten, streamt HTML in `index.html` |
| `src/entry-server.tsx`    | Server    | `render()` mit `renderToPipeableStream`                    |
| `src/productPage.ts`      | Server    | `loadProductPage()`, Typen und Type Guard der Daten        |
| `src/App.tsx`             | beide     | Produktseite mit Beschreibung, Preis, Bestand, Bewertungen |
| `src/AddToCartButton.tsx` | beide     | der einzige interaktive Teil (`useState`)                  |
| `src/entry-client.tsx`    | Browser   | Client Entry, von `index.html` geladen                     |

## Übung

1. Starte `npm run dev` und öffne die Seite. Schalte JavaScript in den DevTools aus und lade neu: Was zeigt der Server schon, was fehlt?
2. Schalte JavaScript wieder ein und klick den Button. Der Zähler bleibt bei 0. Finde heraus, warum: Das Script läuft (`data-client-loaded` am `<html>`-Element), aber kein React-Code übernimmt das Server-HTML.
3. Ergänze die Hydration in `src/entry-client.tsx`: Lies die Initial Data aus `<script id="initial-data">`, prüfe sie mit `isProductPageData` und ruf `hydrateRoot` mit denselben Daten auf wie der Server. Achte auf die Console: Ein Hydration Mismatch erscheint dort als Error.
4. Skizziere, welche Teile der Seite heute Server Components wären und wo die `'use client'`-Grenze läge. Wie viel JavaScript bräuchte der Browser dann noch?

## Befund im Startpunkt

Der Server liefert vollständiges HTML und die Daten als JSON. Das Client-Script wird geladen, ruft aber weder `hydrateRoot` noch `createRoot` auf. Darum hängen an den Buttons keine Event Handler, und der Zähler bleibt nach jedem Klick bei „Im Warenkorb: 0“. Ein `createRoot` statt `hydrateRoot` würde das Server-HTML verwerfen und neu bauen – der Button ginge dann, aber der Vorteil des Server-HTML wäre verschenkt.

## Lösung

- `solution/hydrate.tsx` – `hydrateRoot` mit derselben `App` und denselben Daten
- `solution/entry-client.tsx` – liest und prüft die Initial Data, startet die Hydration
- `solution/hydrate.test.tsx` – prüft in jsdom: kein Mismatch, Button klickbar, DOM vom Server übernommen
- `solution/SERVER-COMPONENTS.md` – Skizze mit Server Components und `'use client'`-Grenze

Die Lösung läuft mit eigenem HTML-Einstieg (`solution.html`):

```bash
npm run dev:solution
npm run build && npm run start:solution
```
