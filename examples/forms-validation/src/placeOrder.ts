import { PlaceOrderInput } from './placeOrderInput';
import { orderId, products, type OrderId } from './shop';

// Server Error mit dem Pfad des Felds, z. B. items.1.quantity
export type ServerFieldError = { path: string; message: string };
export type PlaceOrder = (input: PlaceOrderInput) => Promise<OrderId>;

export const isServerFieldError = (value: unknown): value is ServerFieldError =>
  typeof value === 'object' &&
  value !== null &&
  'path' in value &&
  typeof value.path === 'string' &&
  'message' in value &&
  typeof value.message === 'string';

// Fake-Server: Er validiert mit demselben Schema erneut und prüft den Bestand.
export const placeOrder: PlaceOrder = async (input) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const { items } = PlaceOrderInput.parse(input);
  items.forEach((item, index) => {
    const product = products.find(({ id }) => id === item.productId);
    if (!product || product.stock < item.quantity) {
      const error: ServerFieldError = {
        path: `items.${index}.quantity`,
        message: `Nur ${product?.stock ?? 0} auf Lager`,
      };
      throw error;
    }
  });
  return orderId('o1004');
};
