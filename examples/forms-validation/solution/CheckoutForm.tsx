import { useState, type SubmitEvent } from 'react';
import type { CartItem } from '../src/cart';
import { toFieldErrors, type FieldErrors } from '../src/fieldErrors';
import { isServerFieldError, type PlaceOrder } from '../src/placeOrder';
import { PlaceOrderInput } from '../src/placeOrderInput';
import { customers, products, type OrderId } from '../src/shop';
import { QuantityField } from './QuantityField';

type CheckoutFormProps = {
  cart: readonly CartItem[];
  placeOrder: PlaceOrder;
};

const productName = (item: CartItem) =>
  products.find((product) => product.id === item.productId)?.name ??
  item.productId;

export const CheckoutForm = ({ cart, placeOrder }: CheckoutFormProps) => {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [placedOrderId, setPlacedOrderId] = useState<OrderId | null>(null);

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // FormData liefert Text, das Schema will Zahlen.
    const items = cart.map((item) => ({
      productId: item.productId,
      quantity: Number(formData.get(item.productId)),
    }));
    const result = PlaceOrderInput.safeParse({
      customerId: formData.get('customerId'),
      items,
    });
    if (!result.success) return setErrors(toFieldErrors(result.error.issues));
    setErrors({});
    setFormError(null);
    try {
      setPlacedOrderId(await placeOrder(result.data));
    } catch (error) {
      // Server Errors kommen mit demselben Pfad zurück ans Feld.
      if (isServerFieldError(error))
        return setErrors({ [error.path]: error.message });
      setFormError('Bestellung fehlgeschlagen');
    }
  };

  if (placedOrderId) return <p>Bestellung {placedOrderId} ist eingegangen</p>;

  return (
    <form noValidate onSubmit={handleSubmit}>
      {formError && <p role="alert">{formError}</p>}
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

      {cart.map((item, index) => (
        <QuantityField
          key={item.productId}
          item={item}
          index={index}
          label={`Menge ${productName(item)}`}
          errors={errors}
        />
      ))}
      {errors.items && <p role="alert">{errors.items}</p>}
      <button type="submit">Bestellen</button>
    </form>
  );
};
