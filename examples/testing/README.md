# Testing

Der fertige Checkout des Werkstatt-Shops: Er validiert mit dem geteilten Schema `PlaceOrderInput` und schickt die Bestellung per `POST /api/orders`. Was fehlt, sind die Tests. Du schreibst sie mit Vitest und Testing Library und ersetzt `fetch` im Test durch einen Stub.

Lektion: **Teste, was Nutzende sehen und tun** (`react-testing`)

```bash
npm install
npm run dev
npm test
```

Im Dev-Modus beantwortet eine kleine Fake-API in `vite.config.ts` den Request, jede Bestellung klappt. In den Tests gibt es keinen Server:

- `mockFetchResponse(status, body)` aus `src/test/mockFetchResponse.ts` ersetzt `fetch` per `vi.stubGlobal` und gibt den Mock zurück.
- `src/test/setup.ts` lädt die jest-dom-Matcher und ruft nach jedem Test `cleanup()` und `vi.unstubAllGlobals()` auf.

## Übung

Ersetze die drei `it.todo` in `src/CheckoutForm.test.tsx` durch echte Tests. Gliedere jeden Test nach Arrange, Act, Assert.

1. **Erfolgsfall:** Antworte mit `mockFetchResponse(201, { id: 'o1004' })`. Wähl einen Kunden, klick „Bestellen“ und erwarte „Bestellung o1004 ist eingegangen“. Prüf auch, was im Request-Body steht.
2. **Validation Error:** Setz eine Menge auf `0`. Prüf mit `toHaveAccessibleDescription`, dass die Meldung am Feld hängt, und stell mit `expect(fetchMock).not.toHaveBeenCalled()` sicher, dass kein Request rausgeht.
3. **Server Error:** Antworte mit Status 500. Erwarte „Die Bestellung ist fehlgeschlagen. Der Server hat gerade ein Problem.“ in der Rolle `alert`.

Regeln dabei:

- Such Elemente über Rolle und Label (`getByRole`, `getByLabelText`), nicht über CSS-Klassen oder Test-IDs.
- Interagier mit `userEvent.setup()`, nicht mit `fireEvent`.
- Warte mit `findBy…` auf Text, der erst nach dem Request erscheint.
- Mock nur die Grenze nach außen, hier `fetch`. Form und Schema laufen echt.

## Lösung

`solution/CheckoutForm.test.tsx` enthält die drei Tests und einen vierten: einen Bestandsfehler mit Status 409, der an der Position erscheint.
