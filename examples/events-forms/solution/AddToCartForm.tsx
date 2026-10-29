import { useState, type SubmitEvent } from 'react';

type AddToCartFormProps = {
  stock: number;
  onAdd: (quantity: number) => void;
};

export const AddToCartForm = ({ stock, onAdd }: AddToCartFormProps) => {
  // Der State hält den Text aus dem Feld, die Zahl wird beim Rendern abgeleitet.
  const [quantity, setQuantity] = useState('1');
  const amount = Number(quantity);
  const isValid = quantity !== '' && amount >= 1 && amount <= stock;

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd(amount);
    setQuantity('1');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="quantity">Menge</label>
      <input
        id="quantity"
        name="quantity"
        type="number"
        min={1}
        max={stock}
        value={quantity}
        onChange={(event) => setQuantity(event.target.value)}
      />
      <button type="submit" disabled={!isValid}>
        In den Warenkorb
      </button>
    </form>
  );
};
