# Router App

Eine kleine App zum Buchen von Räumen mit Startseite, „Über uns“, Ressourcenliste und Detailseite. Heute merkt sie sich die aktuelle Seite nur in `useState`. Du baust sie auf [React Router](https://reactrouter.com) 8 um. Danach ist die URL der State: Path Params und Search Params bestimmen, was du siehst.

Lektion: **Die URL ist typisierter State** (`react-routing`)

```bash
npm install
npm run dev
npm test
```

## Übung

1. Starte die App, öffne eine Ressource und such nach „raum“. Drück dann Reload oder den Back-Button. Was geht verloren? Die Adresszeile ändert sich nie.
2. Leg in `src/App.tsx` die Routes mit `<BrowserRouter>`, `<Routes>` und `<Route>` aus `react-router` an: `/`, `/about`, `/resources`, `/resources/:resourceId` und `*` für „Seite nicht gefunden“. `react-router` ist schon installiert.
3. Mach `Layout` zur Layout Route: `<NavLink>` statt Buttons, `<Outlet />` statt `children`. Ersetze die Buttons in der Liste durch `<Link>`. Den `Page`-Typ und die Callback-Props brauchst du danach nicht mehr.
4. Lies in `ResourceDetail` die ID mit `useParams()`. Path Params sind immer Strings. Schreib eine kleine Funktion `parseResourceId`, die nur ganze Zahlen akzeptiert und sonst `null` liefert. Ungültige oder unbekannte IDs zeigen „Seite nicht gefunden“.
5. Hol den Suchtext in `Resources` mit `useSearchParams()` aus `?q=`. Die URL ist die einzige Quelle, kein paralleler `useState`. Schreib beim Tippen mit `{ replace: true }`, sonst füllt jeder Buchstabe die History.
6. Entferne `.skip` in `src/App.test.tsx`. Die Tests setzen die Adresse wie ein Deep Link.

## Lösung

`solution/App.tsx` mit den Routes, `solution/pages/` und `solution/resourceId.ts`. `solution/App.test.tsx` testet über einen `MemoryRouter` mit `initialEntries`. Um die Lösung im Browser zu sehen, ändere den Import in `src/main.tsx` auf `../solution/App`.
