// Fehlertexte an einer Stelle: Jeder Fehler wird zu einem lesbaren Satz mit nächstem Schritt.
// Rohtexte wie „HTTP 500“, „404 Not Found“ oder String(error) erscheinen nie in der Oberfläche.

// fetch wirft nur bei Netzwerkfehlern. Für 404 oder 500 wirfst du selbst einen HttpError.
export class HttpError extends Error {
  readonly status: number;

  constructor(status: number) {
    super(httpErrorText(status));
    this.name = 'HttpError';
    this.status = status;
  }
}

export const httpErrorText = (status: number): string => {
  if (status === 404)
    return 'Das haben wir nicht gefunden. Prüf die Adresse oder geh zurück zur Übersicht.';
  if (status === 401 || status === 403)
    return 'Dafür fehlt die Berechtigung. Melde dich an und versuch es noch einmal.';
  if (status >= 500)
    return 'Der Server hat gerade ein Problem. Versuch es in einem Moment noch einmal.';
  return 'Der Server hat die Anfrage abgelehnt. Lade die Seite neu und versuch es noch einmal.';
};

// Fachliche Fehler bringen ihren Satz mit („Bestellung o9999 nicht gefunden“),
// errorText ergänzt den nächsten Schritt. Alles andere wird zum allgemeinen Text.
export const errorText = (
  error: unknown,
  nextStep = 'Versuch es noch einmal.'
): string => {
  if (error instanceof HttpError) return error.message;
  // fetch wirft bei Netzwerk- und CORS-Fehlern einen TypeError („Failed to fetch“).
  if (error instanceof TypeError)
    return 'Keine Verbindung zum Server. Prüf, ob der Server läuft, und versuch es noch einmal.';
  // response.json() wirft einen SyntaxError, wenn statt JSON zum Beispiel HTML kommt.
  if (error instanceof SyntaxError)
    return 'Der Server hat kein gültiges JSON geschickt. Prüf die API-Adresse und versuch es noch einmal.';
  if (error instanceof Error && error.message)
    return `${error.message.replace(/[.\s]+$/, '')}. ${nextStep}`;
  return `Unerwarteter Fehler. ${nextStep}`;
};
