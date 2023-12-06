export const getClientsListMock = {
  path: '/client/get-list',
  method: 'GET',
  query: {
    userUid: 'ebfa2265-59b0-4426-88c2-fd866cf1547d',
    paginationFilters: {
      pageSize: 10,
      currentPage: 1,
    } },
  filters: {
    order: 'desc',
    by: 'name',
  },
}
