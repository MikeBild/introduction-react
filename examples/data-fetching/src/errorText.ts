// Error texts in one place: every error becomes a readable sentence with a next step.
// Raw texts like “HTTP 500”, “404 Not Found” or String(error) never appear in the UI.

// fetch only throws on network errors. For 404 or 500 you throw an HttpError yourself.
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

// Domain errors bring their own sentence (“Bestellung o9999 nicht gefunden”),
// errorText adds the next step. Everything else becomes the generic text.
export const errorText = (
  error: unknown,
  nextStep = 'Versuch es noch einmal.'
): string => {
  if (error instanceof HttpError) return error.message;
  // fetch throws a TypeError on network and CORS errors (“Failed to fetch”).
  if (error instanceof TypeError)
    return 'Keine Verbindung zum Server. Prüf, ob der Server läuft, und versuch es noch einmal.';
  // response.json() throws a SyntaxError when HTML arrives instead of JSON, for example.
  if (error instanceof SyntaxError)
    return 'Der Server hat kein gültiges JSON geschickt. Prüf die API-Adresse und versuch es noch einmal.';
  if (error instanceof Error && error.message)
    return `${error.message.replace(/[.\s]+$/, '')}. ${nextStep}`;
  return `Unerwarteter Fehler. ${nextStep}`;
};
