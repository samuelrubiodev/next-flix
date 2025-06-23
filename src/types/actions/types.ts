import { MovieResponse, MovieResult, ShowResponse, TvResult } from "moviedb-promise"

type GenericMovieActionRequest = {
  movie?: MovieResponse,
  movies: MovieResult[],
  searchTerm: string,
  selectedGenre: string, 
  calification: string, 
  sort: string
}

type GenericShowActionRequest = {
  show?: ShowResponse,
  shows: TvResult[],
  searchTerm: string
}

export type GenericActionsProps = {
  id?: number,
  movie?: MovieResponse,
  movies?: MovieResult[],
  tvShows?: TvResult[],
  tvShow?: ShowResponse,
  searchTerm?: string,
  query?: string,
  selectedGenre?: string, 
  calification?: string, 
  sort?: string
}

export type { GenericMovieActionRequest, GenericShowActionRequest }