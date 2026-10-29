export type Customer = {
  id: string;
  name: string;
  company: string;
  email: string;
  isPremium: boolean;
  avatarUrl?: string;
};

export const customers: readonly Customer[] = [
  {
    id: 'c1',
    name: 'Ada Lovelace',
    company: 'Analytical Engines GmbH',
    email: 'ada@example.com',
    isPremium: true,
    avatarUrl: 'https://i.pravatar.cc/80?u=ada',
  },
  {
    id: 'c2',
    name: 'Grace Hopper',
    company: 'Compiler AG',
    email: 'grace@example.com',
    isPremium: false,
  },
  {
    id: 'c3',
    name: 'Alan Turing',
    company: 'Enigma KG',
    email: 'alan@example.com',
    isPremium: true,
  },
];
