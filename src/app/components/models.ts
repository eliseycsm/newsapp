export interface LoginDetails {
    apikey: string
}

export interface Country {
    name:string,
    code: string,
    flag: string
}

export interface Result {
    code: string,
    saved: string,
    timestamp: string,
    src: string,
    author: string,
    title: string,
    description: string,
    url: string,
    image: string,
    publishedAt: string,
    content: string
}
/* export interface SearchResults {
    country: string,
    timestamp: Date,
    results: Result[]
} */

