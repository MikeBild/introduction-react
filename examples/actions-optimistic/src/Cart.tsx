import { useActionState } from 'react';
import type { AddItemToDraft } from './cartApi';
import {
  formatCents,
  orderId,
  orderTotalCents,
  products,
  type OrderItem,
} from './shop';

type CartState = { items: readonly OrderItem[]; error: string | null };

const draftOrderId = orderId('o1004');

const productName = (item: OrderItem) =>
  products.find((product) => product.id === item.productId)?.name ??
  item.productId;

export const Cart = ({
  addItemToDraft,
}: {
  addItemToDraft: AddItemToDraft;
}) => {
  const addItemAction = async (
    previousState: CartState,
    formData: FormData
  ): Promise<CartState> => {
    const product = products.find(({ id }) => id === formData.get('productId'));
    const quantity = Number(formData.get('quantity'));
    if (!product || !Number.isInteger(quantity) || quantity < 1)
      return { ...previousState, error: 'Bitte Produkt und Menge ab 1 wählen' };
    const newItem = {
      productId: product.id,
      quantity,
      priceCents: product.priceCents,
    };
    try {
      const savedItems = await addItemToDraft(draftOrderId, newItem);
      return { items: savedItems, error: null };
    } catch (error) {
      return {
        ...previousState,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  };

  const [cartState, formAction, isPending] = useActionState(addItemAction, {
    items: [],
    error: null,
  });

  return (
    <>
      <form action={formAction}>
        <label htmlFor="productId">Produkt</label>
        <select id="productId" name="productId">
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
        <label htmlFor="quantity">Menge</label>
        <input
          id="quantity"
          name="quantity"
          inputMode="numeric"
          defaultValue="1"
        />
        <button disabled={isPending}>
          {isPending ? 'Speichere …' : 'In den Warenkorb'}
        </button>
      </form>
      {cartState.error && <p role="alert">{cartState.error}</p>}
      <ul>
        {cartState.items.map((item) => (
          <li key={item.productId}>
            {item.quantity} × {productName(item)}
          </li>
        ))}
      </ul>
      <p>Summe: {formatCents(orderTotalCents(cartState.items))}</p>
    </>
  );
};
