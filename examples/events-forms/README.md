# Events und Forms

Die Produktseite im Werkstatt-Shop: Unter dem Produkt steht ein Formular für die Menge. Es hat noch keinen Submit Handler, und niemand prüft den Bestand.

Lektion: **Wem gehört der Wert im Input?** (`react-events-forms`)

```bash
npm install
npm run dev
npm test
```

## Übung

1. Klick in `npm run dev` auf „In den Warenkorb“. Die Seite lädt neu, „Im Warenkorb“ bleibt bei 0. Warum?
2. Mach die Menge in `src/AddToCartForm.tsx` zu einem Controlled Input: `useState('1')` hält den Text, `value` und `onChange` verbinden ihn mit dem Feld.
3. Leite die Zahl beim Rendern ab (`Number(quantity)`). Deaktiviere den Button, wenn die Menge leer ist oder nicht zwischen 1 und `stock` liegt.
4. Ergänze `onSubmit` an der Form, typisiert mit `SubmitEvent<HTMLFormElement>`. Ruf `event.preventDefault()` auf und dann `onAdd` mit der Menge.
5. Entferne `.skip` in `src/AddToCartForm.test.tsx`.

## Lösung

`solution/AddToCartForm.tsx` mit Tests. Um sie im Browser zu sehen, ändere den Import in `src/App.tsx` auf `../solution/AddToCartForm`.
