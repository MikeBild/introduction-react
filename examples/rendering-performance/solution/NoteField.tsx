import { useState } from 'react';

// The State lives where it is needed – typing only re-renders this field.
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
