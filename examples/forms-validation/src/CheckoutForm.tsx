import { useState, type SubmitEvent } from 'react';
import type { CartItem } from './cart';
import { toFieldErrors, type FieldErrors } from './fieldErrors';
import { isServerFieldError, type PlaceOrder } from './placeOrder';
import { PlaceOrderInput } from './placeOrderInput';
import { customers, products, type OrderId } from './shop';

type CheckoutFormProps = {
  cart: readonly CartItem[];
  placeOrder: PlaceOrder;
};

const productName = (item: CartItem) =>
  products.find((product) => product.id === item.productId)?.name ??
  item.productId;

export const CheckoutForm = ({ cart, placeOrder }: CheckoutFormProps) => {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [placedOrderId, setPlacedOrderId] = useState<OrderId | null>(null);

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // Übung: Bring auch die Mengen in die Form des Schemas.
    // Bisher schickt die Form die Mengen aus dem Warenkorb, nicht die Eingaben.
    const result = PlaceOrderInput.safeParse({
      customerId: formData.get('customerId'),
      items: cart,
    });
    if (!result.success) return setErrors(toFieldErrors(result.error.issues));
    setErrors({});
    setServerError(null);
    try {
      setPlacedOrderId(await placeOrder(result.data));
    } catch (error) {
      // Übung: Server Errors am passenden Feld zeigen, nicht im Banner.
      setServerError(
        isServerFieldError(error)
          ? error.message
          : 'Die Bestellung ist fehlgeschlagen. Versuch es noch einmal.'
      );
    }
  };

  if (placedOrderId) return <p>Bestellung {placedOrderId} ist eingegangen</p>;

  return (
    <form noValidate onSubmit={handleSubmit}>
      {serverError && <p role="alert">{serverError}</p>}
      <label htmlFor="customerId">Kunde</label>
      <select
        id="customerId"
        name="customerId"
        defaultValue=""
        aria-invalid={Boolean(errors.customerId)}
        aria-describedby={errors.customerId ? 'customerId-error' : undefined}
      >
        <option value="">Bitte wählen</option>
        {customers.map((customer) => (
          <option key={customer.id} value={customer.id}>
            {customer.name}
          </option>
        ))}
      </select>
      {errors.customerId && <p id="customerId-error">{errors.customerId}</p>}

      {cart.map((item) => (
        <div key={item.productId}>
          <label htmlFor={item.productId}>Menge {productName(item)}</label>
          <input
            id={item.productId}
            name={item.productId}
            inputMode="numeric"
            defaultValue={item.quantity}
          />
        </div>
      ))}
      <button type="submit">Bestellen</button>
    </form>
  );
};
