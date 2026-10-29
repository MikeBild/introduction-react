# Forms Validation

Der Checkout des Werkstatt-Shops, validiert mit dem geteilten [zod](https://zod.dev)-Schema `PlaceOrderInput`. Dasselbe Schema nutzt auch das Backend. Errors stehen an ihrem Feld.

Lektion: **Ein Schema für Form, Server und Typ** (`react-forms-validation`)

```bash
npm install
npm run dev
npm test
```

## Aufbau

| Datei                    | Aufgabe                                                                  |
| ------------------------ | ------------------------------------------------------------------------ |
| `src/placeOrderInput.ts` | das geteilte Schema `PlaceOrderInput`, unverändert aus dem Backend       |
| `src/fieldErrors.ts`     | `toFieldErrors` macht aus Issues Texte je Pfad, z. B. `items.0.quantity` |
| `src/placeOrder.ts`      | Fake-Server: validiert erneut und prüft den Bestand                      |
| `src/CheckoutForm.tsx`   | der Checkout mit Kunde und Mengen                                        |
| `src/shop.ts`            | Domäne des Werkstatt-Shops: Produkte, Kunden, Branded IDs                |

## Übung

1. Bring in `handleSubmit` die Mengen aus der Form in die Form des Schemas: `FormData` liefert Text, `PlaceOrderInput` will Zahlen. Bau `items` aus dem Warenkorb und den Eingaben, dann ruf `safeParse` auf.
2. Zeig Errors an der Menge: Leg eine Component `QuantityField` an, die den Error unter dem Schlüssel `items.${index}.quantity` liest und per `aria-invalid` und `aria-describedby` mit dem Feld verknüpft.
3. Zeig Server Errors am passenden Feld statt im Banner. Probier es mit dem ausverkauften Steckschlüsselsatz: Der Server antwortet mit dem Pfad `items.1.quantity`.
4. Entferne `.skip` in `src/CheckoutForm.test.tsx`.

Das Schema bleibt textfrei. Die Fehlertexte formuliert die Oberfläche in `src/fieldErrors.ts`.

## Lösung

Eine mögliche Lösung liegt in `solution/`: `CheckoutForm.tsx`, `QuantityField.tsx` und die Tests.
