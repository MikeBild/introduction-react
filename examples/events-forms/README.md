# Events & Forms

Eine Newsletter-Anmeldung mit einem halb fertigen Formular: ein Feld, kein Submit Handler, ein Klick lädt die Seite neu. Du baust daraus eine Controlled Form.

Lektion: **Wem gehört der Wert im Input?** (`react-events-forms`)

```bash
npm install
npm run dev
npm test
```

## Übung

1. Ergänze in `src/NewsletterForm.tsx` ein zweites Feld mit dem Label „E-Mail“ (`type="email"`).
2. Mach beide Inputs zu Controlled Inputs: Je ein `useState`, `value` und `onChange`.
3. Schreib einen Submit Handler mit dem Typ `SubmitEvent<HTMLFormElement>`. Er ruft `event.preventDefault()`, übergibt `{ name, email }` an `onSubscribe` und leert danach beide Felder.
4. Deaktiviere den Button „Anmelden“, solange ein Feld leer ist. Leerzeichen zählen nicht als Eingabe. Leite das aus dem State ab, statt einen eigenen State dafür anzulegen.
5. Entferne `.skip` in `src/NewsletterForm.test.tsx`.

## Lösung

`solution/NewsletterForm.tsx` mit Tests in `solution/NewsletterForm.test.tsx`. Um die Lösung im Browser zu sehen, ändere den Import in `src/App.tsx` auf `../solution/NewsletterForm`.
