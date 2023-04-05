export const getUsers = state => {
  return state.contacts.items;
};

export const getLoader = state => state.contacts.isLoading;

export const getFilteredUser = state => {
  const filterValue = state.filter.filterValue;
  if (typeof filterValue !== 'string') {
    return '';
  }
  return filterValue;
};
