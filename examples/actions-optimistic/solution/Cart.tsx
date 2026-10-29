import { useActionState, useOptimistic } from 'react';
import { mergeItem, type AddItemToDraft } from '../src/cartApi';
import {
  formatCents,
  orderId,
  orderTotalCents,
  products,
  type OrderItem,
} from '../src/shop';
import { SubmitButton } from './SubmitButton';

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
    // Gilt nur, solange die Action läuft – danach zählt wieder cartState.
    addOptimisticItem(newItem);
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

  const [cartState, formAction] = useActionState(addItemAction, {
    items: [],
    error: null,
  });
  const [optimisticItems, addOptimisticItem] = useOptimistic(
    cartState.items,
    (currentItems: readonly OrderItem[], newItem: OrderItem) =>
      mergeItem(currentItems, newItem)
  );
  const isSaving = optimisticItems !== cartState.items;

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
        <SubmitButton label="In den Warenkorb" />
      </form>
      {cartState.error && <p role="alert">{cartState.error}</p>}
      <ul style={{ opacity: isSaving ? 0.5 : 1 }}>
        {optimisticItems.map((item) => (
          <li key={item.productId}>
            {item.quantity} × {productName(item)}
          </li>
        ))}
      </ul>
      <p>Summe: {formatCents(orderTotalCents(optimisticItems))}</p>
    </>
  );
};
