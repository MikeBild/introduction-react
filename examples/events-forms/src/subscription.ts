export type Subscription = { name: string; email: string };

export type Subscribe = (subscription: Subscription) => void;
