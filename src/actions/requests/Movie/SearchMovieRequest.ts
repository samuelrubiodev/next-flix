import { MovieResult } from "moviedb-promise";
import { RequestParams } from "../IRequest";
import ITestRequest from "../ITestRequest";
import { JSX } from "react";
import { GenericMovieActionRequest } from "@/types/actions/types";

export default class SearchMovieRequest implements ITestRequest<MovieResult[], GenericMovieActionRequest>  {
  private page: number;
  private results: MovieResult[] = [];
  private elementFactory: (props: GenericMovieActionRequest) => JSX.Element;

  constructor(page: number, elementFactory: (props: GenericMovieActionRequest) => JSX.Element) {
    this.page = page;
    this.elementFactory = elementFactory;
  }

  setPage(page: number): void {
    this.page = page;
  }

  getElement(props: GenericMovieActionRequest): JSX.Element {
    return this.elementFactory({ movies:  this.results, searchTerm: props.searchTerm });
  }

  get Results(): MovieResult[] {
    return this.results;
  }

  public async sendRequestAction(params: RequestParams): Promise<MovieResult[]> {
    const response = await fetch("/api/movies/search?" + new URLSearchParams({
      query: params.query || "",
    }).toString());
    const data = await response.json();
    this.results = data.results as MovieResult[];

    return this.results;
  }
}