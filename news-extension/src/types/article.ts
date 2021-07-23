export type Article = {
    author: string,
    category: string,
    country:string,
    description: string,
    published_at: string,
    source: string,
    name: string,
    title: string,
    url: string,
    image: string | null
}

type Pagination = {
    limit: number,
    offset: number,
    count:number,
    total: number
}

export type News = {
data: Article[],
pagination: Pagination
}