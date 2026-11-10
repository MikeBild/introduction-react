type AddToCartFormProps = {
  stock: number;
  onAdd: (quantity: number) => void;
};

// Exercise react-events-forms: the form has no submit handler yet –
// a click reloads the page, and onAdd is never called.
// Make the quantity a Controlled Input and disable the button
// when the quantity is not between 1 and the stock.
export const AddToCartForm = (_props: AddToCartFormProps) => (
  <form>
    <label htmlFor="quantity">Menge</label>
    <input id="quantity" name="quantity" type="number" defaultValue="1" />
    <button type="submit">In den Warenkorb</button>
  </form>
);
