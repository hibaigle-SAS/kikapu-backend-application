const buildFilters = (filters: Record<string, any>) => {
  return Object.fromEntries(
    Object.entries(filters).filter(([_, v]) => v !== undefined && v !== null),
  );
};

export default buildFilters;
