# ADR 001: Code nach Features ordnen

- Status: angenommen
- Datum: 29.10.2026

## Kontext

Der Shop wächst. In einem Ordner `components/` liegen Warenkorb, Katalog und Design System nebeneinander. Wer am Warenkorb arbeitet, greift schnell auf Interna des Katalogs zu. Jede Änderung im Katalog kann dann den Warenkorb brechen.

## Entscheidung

- Fachlicher Code liegt unter `features/<name>/`. Jedes Feature exportiert seine Public API über `index.ts`.
- Andere Features importieren nur über diese `index.ts`, nie direkt aus einer Datei des Features.
- `ui/` (Design System) und `shared/` (fachfreie Helfer) importieren nie aus `features/`.
- Features importieren nie aus der App-Schicht (`App.tsx`). Die App setzt Features zusammen, nicht umgekehrt.
- `architecture.test.ts` prüft diese Regeln bei jedem `npm test`.

## Konsequenzen

- Interna eines Features darfst du umbauen, solange die `index.ts` gleich bleibt.
- Neue Abhängigkeiten zwischen Features werden im Review sichtbar, weil die `index.ts` wächst.
- Der Test liest Imports per Regex. Dynamische Imports oder Aliase erkennt er nicht. Wird das nötig, steigen wir auf `eslint-plugin-boundaries` oder `dependency-cruiser` um.
