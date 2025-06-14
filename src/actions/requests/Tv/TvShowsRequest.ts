import { TvResult } from "moviedb-promise";
import IRequest, { RequestParams } from "../IRequest";

export default class TvShowsRequest implements IRequest<TvResult[]> {
  
  public async sendRequest(params: RequestParams): Promise<TvResult[]> {
    const response = await fetch("/api/tv?" + new URLSearchParams({
      page: params.page?.toString() || "1"
    }).toString());
    const data = await response.json();
    return data.results as TvResult[];
  }
}