export type Filters = {
  search?: {
    by: 'name'
    value: string
  }
  order: 'asc' | 'desc'
  by: 'clientName' | 'createdAt'
}
