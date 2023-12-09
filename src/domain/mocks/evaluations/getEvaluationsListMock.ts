export const getEvaluationsListMock = {
  path: '/evaluation/get-list',
  method: 'GET',
  query: {
    userUid: '7a5ed6a7-fd94-4ffe-a9a6-460cfad238e6',
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
