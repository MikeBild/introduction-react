// Branded IDs – fachfrei, deshalb in shared/.
export type ProductId = string & { readonly __brand: 'ProductId' };

export const productId = (id: string) => id as ProductId;
