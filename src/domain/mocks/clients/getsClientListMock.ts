export const getClientsListMock = {
  path: '/client/get-list',
  method: 'GET',
  query: {
    userUid: 'b797652d-5820-4fb5-8fd4-65b2c52d00f6',
    paginationFilters: {
      pageSize: 20,
      currentPage: 1,
    },
    filters: {
      search: {
        by: 'name',
        value: '',
      },
      order: 'asc',
      by: 'clientName',
    },
  },
}
