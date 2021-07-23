export interface Article {
  author: string
  category: string
  country: string
  description: string
  published_at: string
  source: string
  name: string
  title: string
  url: string
  image: string | null
}

interface Pagination {
  limit: number
  offset: number
  count: number
  total: number
}

export interface News {
  data: Article[]
  pagination: Pagination
}
