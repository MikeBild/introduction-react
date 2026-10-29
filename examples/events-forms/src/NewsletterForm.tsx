import type { Subscribe } from './subscription';

// Übung: Das Formular hat noch keinen Submit Handler – ein Klick lädt die Seite neu.
// Mach Name und E-Mail zu Controlled Inputs und deaktiviere den Button,
// solange ein Feld leer ist.
export const NewsletterForm = (_props: { onSubscribe: Subscribe }) => (
  <form>
    <label htmlFor="name">Name</label>
    <input id="name" name="name" />
    <button type="submit">Anmelden</button>
  </form>
);
