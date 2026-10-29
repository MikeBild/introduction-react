import { products, type OrderId, type OrderItem } from './shop';

export type AddItemToDraft = (
  orderId: OrderId,
  item: OrderItem
) => Promise<OrderItem[]>;

// Gleiches Produkt erhöht die Menge, statt eine zweite Position anzulegen.
export const mergeItem = (
  items: readonly OrderItem[],
  newItem: OrderItem
): OrderItem[] =>
  items.some((item) => item.productId === newItem.productId)
    ? items.map((item) =>
        item.productId === newItem.productId
          ? { ...item, quantity: item.quantity + newItem.quantity }
          : item
      )
    : [...items, newItem];

const savedItemsByOrder = new Map<OrderId, OrderItem[]>();

// Fake-Server: langsam, und er lehnt Positionen ohne ausreichenden Bestand ab.
export const addItemToDraft: AddItemToDraft = async (orderId, item) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const product = products.find(({ id }) => id === item.productId);
  const savedItems = savedItemsByOrder.get(orderId) ?? [];
  const nextItems = mergeItem(savedItems, item);
  const quantity =
    nextItems.find(({ productId }) => productId === item.productId)?.quantity ??
    0;
  if (!product || product.stock < quantity)
    throw new Error(
      `Nicht genug Bestand für ${product?.name ?? item.productId}`
    );
  savedItemsByOrder.set(orderId, nextItems);
  return nextItems;
};
