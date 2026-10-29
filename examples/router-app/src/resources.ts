export type Resource = { id: number; name: string; capacity: number };

export const resources: readonly Resource[] = [
  { id: 1, name: 'Raum Berlin', capacity: 12 },
  { id: 2, name: 'Raum Hamburg', capacity: 6 },
  { id: 3, name: 'Beamer', capacity: 1 },
  { id: 4, name: 'Raum München', capacity: 20 },
];

export const findResourceById = (resourceId: number) =>
  resources.find((resource) => resource.id === resourceId);

export const searchResources = (searchText: string) => {
  const normalizedSearchText = searchText.trim().toLowerCase();
  return resources.filter((resource) =>
    resource.name.toLowerCase().includes(normalizedSearchText)
  );
};
