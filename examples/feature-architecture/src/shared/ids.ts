// Branded IDs – free of domain logic, which is why they live in shared/.
export type ProductId = string & { readonly __brand: 'ProductId' };

export const productId = (id: string) => id as ProductId;
