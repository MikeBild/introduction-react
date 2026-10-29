// Entspricht dem gemeinsamen zod-Schema PlaceOrderInput des Werkstatt-Shops.
// Hier reicht der Typ mit einem kleinen Type Guard – zod nutzt das Repo nur für Forms.
export type PlaceOrderInput = {
  customerId: string;
  items: { productId: string; quantity: number }[];
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

export const isPlaceOrderInput = (value: unknown): value is PlaceOrderInput =>
  isRecord(value) &&
  typeof value.customerId === 'string' &&
  Array.isArray(value.items) &&
  value.items.length > 0 &&
  value.items.every(
    (item) =>
      isRecord(item) &&
      typeof item.productId === 'string' &&
      Number.isInteger(item.quantity) &&
      Number(item.quantity) >= 1
  );
