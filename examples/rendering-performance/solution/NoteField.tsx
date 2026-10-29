import { useState } from 'react';

// Der State lebt dort, wo er gebraucht wird – Tippen rendert nur dieses Feld.
export const NoteField = () => {
  const [note, setNote] = useState('');
  return (
    <>
      <label htmlFor="note">Notiz zur Bestellung</label>
      <input
        id="note"
        value={note}
        onChange={(event) => setNote(event.target.value)}
      />
    </>
  );
};
