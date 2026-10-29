type AddToCartFormProps = {
  stock: number;
  onAdd: (quantity: number) => void;
};

// Übung react-events-forms: Das Formular hat noch keinen Submit Handler –
// ein Klick lädt die Seite neu, und onAdd wird nie aufgerufen.
// Mach die Menge zu einem Controlled Input und deaktiviere den Button,
// wenn die Menge nicht zwischen 1 und dem Bestand liegt.
export const AddToCartForm = (_props: AddToCartFormProps) => (
  <form>
    <label htmlFor="quantity">Menge</label>
    <input id="quantity" name="quantity" type="number" defaultValue="1" />
    <button type="submit">In den Warenkorb</button>
  </form>
);
