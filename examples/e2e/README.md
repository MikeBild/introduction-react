# E2E-Tests mit Playwright

Der fertige Checkout des Werkstatt-Shops mit einer echten API: Das Formular validiert mit dem geteilten Schema `PlaceOrderInput`, die API in `server/api.ts` prüft Kunde und Bestand und speichert die Bestellung. Was fehlt, sind die End-to-End-Tests. Du schreibst sie mit Playwright: Ein echter Browser bedient die App, nichts ist gestubbt.

Lektion: **E2E-Tests sichern die wichtigsten Wege** (`react-e2e-playwright`)

```bash
npm install
npx playwright install chromium   # einmalig: lädt den Browser für die Tests
npm test                          # startet API und App, führt alle Tests aus
npm run test:ui                   # dieselben Tests Schritt für Schritt im UI Mode
```

Playwright startet API (`http://127.0.0.1:3030`) und App (`http://127.0.0.1:5173`) selbst, siehe `webServer` in `playwright.config.ts`. Zum Ausprobieren im Browser startest du beide von Hand: `npm run api` und `npm run dev` in zwei Terminals.

## Aufbau

| Datei                    | Aufgabe                                                                    |
| ------------------------ | -------------------------------------------------------------------------- |
| `playwright.config.ts`   | `webServer` für API und App, `baseURL`, Chromium, Trace bei Fehlern        |
| `e2e/checkout.spec.ts`   | Startpunkt: ein Beispiel-Test und zwei Tests mit `.skip`                   |
| `server/api.ts`          | Express-API: `POST /api/orders` validiert, prüft Bestand, speichert        |
| `src/CheckoutForm.tsx`   | der Checkout mit Kunde und Mengen, Fehler am Feld, Bestellnummer im Status |
| `src/placeOrderInput.ts` | das geteilte zod-Schema, Formular und API nutzen dasselbe                  |
| `vite.config.ts`         | fester Port 5173, `/api` geht per Proxy an die API                         |

## Welche Ebene prüft was?

| Ebene            | Anzahl | Dauer         | Läuft gegen                     | Beispiel im Shop                            |
| ---------------- | ------ | ------------- | ------------------------------- | ------------------------------------------- |
| Component-Test   | viele  | Millisekunden | eine Component in jsdom         | Das Feld zeigt „Bitte eine ganze Zahl ab 1“ |
| Integration-Test | einige | Millisekunden | die API mit echter Datenbank    | `POST /api/orders` antwortet mit 409        |
| E2E-Test         | wenige | Sekunden      | Browser, App, API und Datenbank | Die Bestellung kommt mit Nummer an          |

Alles, was eine Ebene tiefer schneller und genauer zu prüfen ist, gehört dorthin. Die Lektion **Teste, was Nutzende sehen und tun** (`react-testing`, Beispiel [`testing`](../testing/README.md)) zeigt die Component-Tests für denselben Checkout.

## Übung

Ersetze in `e2e/checkout.spec.ts` die beiden `test.skip` durch echte Tests. Gliedere jeden Test nach Arrange, Act, Assert.

1. **Erfolgsweg „Bestellung aufgeben“:** Wähl „Ada Schmidt“ als Kunde, setz die Menge für den Drehmomentschlüssel auf `2` und klick „Bestellen“. Erwarte in der Rolle `status` den Text „Bestellung o… ist eingegangen“. Die Nummer vergibt der Server, prüf sie deshalb mit einem Muster wie `/Bestellung o\d+ ist eingegangen/`.
2. **Fehlerweg „Validierung“:** Setz die Menge auf `0` und klick „Bestellen“. Prüf mit `toHaveAccessibleDescription`, dass „Bitte eine ganze Zahl ab 1“ am Feld hängt, und dass es keine Bestellnummer gibt (`toHaveCount(0)` auf der Rolle `status`).

Regeln dabei:

- Such Elemente über Rolle und Label (`getByRole`, `getByLabel`), nicht über CSS-Selektoren oder Test-IDs.
- Warte nie mit `waitForTimeout`. Aktionen warten selbst, bis das Element bereit ist, und `expect(locator)` wiederholt die Prüfung bis zum Timeout.
- Jeder Test beginnt mit `page.goto('/')` und baut seinen Zustand selbst auf. Playwright gibt ihm einen eigenen Browser Context.

## Flaky Tests

Ein Test ist flaky, wenn er mal rot und mal grün ist, ohne dass sich der Code ändert.

| Flaky, weil …                             | Gegenmittel                                                   |
| ----------------------------------------- | ------------------------------------------------------------- |
| feste Wartezeit (`waitForTimeout`, sleep) | Auto-Waiting der Aktionen und `expect(locator)` nutzen        |
| geteilter Zustand zwischen Tests          | eigener Browser Context je Test, Playwright macht das selbst  |
| Daten, die ein anderer Test verändert     | feste Daten je Test anlegen, keine Zählung über alle Tests    |
| Reihenfolge der Tests                     | jeder Test muss allein grün sein (`npx playwright test -g …`) |
| CSS-Selektor, der beim Umbau bricht       | `getByRole` und `getByLabel` statt Klassen und IDs            |

Mit `--retries=2` läuft ein roter Test noch einmal; besteht er dann, meldet Playwright ihn als _flaky_ statt als bestanden. Die Ursache findest du im Trace Viewer: `npx playwright show-trace test-results/<test>/trace.zip` zeigt je Schritt Screenshot, DOM und Requests.

## Lösung

`solution/checkout.spec.ts` enthält beide Tests und einen dritten: einen Bestandsfehler, den nur die echte API kennt (`Nur 4 auf Lager` am Feld). Der Erfolgsweg prüft zusätzlich über `request.get('/api/orders/<id>')`, dass die Bestellung auf dem Server liegt. `npm test` führt Startpunkt und Lösung aus.
