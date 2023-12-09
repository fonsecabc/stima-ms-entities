export const getClientsListMock = {
  path: '/client/get-list',
  method: 'GET',
  query: {
    userUid: '2e194143-a03b-48a7-881d-7175faefee6d',
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
