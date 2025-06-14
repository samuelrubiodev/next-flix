import { MovieResult } from "moviedb-promise"

type GenericMovieActionRequest = {
    movies: MovieResult[],
    searchTerm: string
}

export type { GenericMovieActionRequest }