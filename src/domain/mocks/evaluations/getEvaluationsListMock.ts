export const getEvaluationsListMock = {
  path: '/evaluation/get-list',
  method: 'GET',
  query: {
    userUid: 'b797652d-5820-4fb5-8fd4-65b2c52d00f6',
    paginationFilters: {
      pageSize: 5,
      currentPage: 2,
    },
    filters: {
      by: 'createdAt',
      order: 'desc',
    },
  },
}
