import { MovieResponse, MovieResult, ShowResponse, TvResult } from "moviedb-promise"

type GenericMovieActionRequest = {
  movie?: MovieResponse,
  movies: MovieResult[],
  searchTerm: string
}

type GenericShowActionRequest = {
  show?: ShowResponse,
  shows: TvResult[],
  searchTerm: string
}

export type { GenericMovieActionRequest, GenericShowActionRequest }