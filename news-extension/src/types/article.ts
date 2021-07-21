export type Article = {
    author: string,
    content: string,
    description: string,
    publishedAt: string,
    source: Source,
    id: string | null,
    name: string,
    title: string,
    url: string,
    urlToImage: string | null
}

type Source = {
    id: string | null,
    name: string
}

export type News = {
articles: Article[],
status: string,
totalResults: number
}