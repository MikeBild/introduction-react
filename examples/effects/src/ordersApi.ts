export type Customer = { id: string; firstName: string; lastName: string };
export type Order = { id: string; productName: string };

export type LoadOrders = (
  customerId: string,
  signal?: AbortSignal
) => Promise<readonly Order[]>;

const ordersByCustomer: Record<string, readonly Order[]> = {
  c1: [
    { id: 'o1', productName: 'Kaffeebohnen' },
    { id: 'o2', productName: 'Handmühle' },
  ],
  c2: [{ id: 'o3', productName: 'Milchkännchen' }],
};

// Fake API: antwortet nach einer zufälligen Zeit, ohne Netzwerk.
export const loadOrders: LoadOrders = (customerId) =>
  new Promise((resolve) =>
    setTimeout(
      () => resolve(ordersByCustomer[customerId] ?? []),
      200 + Math.random() * 800
    )
  );

export const customers: readonly Customer[] = [
  { id: 'c1', firstName: 'Ada', lastName: 'Lovelace' },
  { id: 'c2', firstName: 'Grace', lastName: 'Hopper' },
];
