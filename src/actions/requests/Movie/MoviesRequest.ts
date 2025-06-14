import { MovieResult } from "moviedb-promise";
import IRequest, { RequestParams } from "../IRequest";

export default class MoviesRequest implements IRequest<MovieResult[]> {
  
  public async sendRequest(params: RequestParams): Promise<MovieResult[]> {
    const response = await fetch("/api/movies?" + new URLSearchParams({
      page: params.page?.toString() || "1"
    }).toString());
    const data = await response.json();
    return data.results as MovieResult[];
  }
}