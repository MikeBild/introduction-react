import { http, HttpResponse } from 'msw/http';

// Standardfall: Die Registrierung klappt. Fehlerfälle überschreibst du im Test
// mit server.use(...).
export const handlers = [
  http.post('/api/signup', () =>
    HttpResponse.json({ id: 'u1' }, { status: 201 })
  ),
];
