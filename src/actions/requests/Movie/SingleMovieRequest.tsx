import { MovieResponse } from "moviedb-promise";
import ActionRequest from "../IActionRequest";
import { GenericMovieActionRequest } from "@/types/actions/types";
import { JSX } from "react";
import { RequestParams } from "../IRequest";

export default class SingleMovieRequest implements ActionRequest<MovieResponse, GenericMovieActionRequest>{
  private page: number;
  private result: MovieResponse = {};
  private elementFactory: (props: GenericMovieActionRequest) => JSX.Element;

  constructor(page: number, elementFactory: (props: GenericMovieActionRequest) => JSX.Element) {
    this.page = page;
    this.elementFactory = elementFactory;
  }

  setPage(page: number): void {
    this.page = page;
  }

  getElement(props: GenericMovieActionRequest): JSX.Element {
    const ElementComponent = this.elementFactory;

    return <ElementComponent
      movies={[]}
      movie={this.result}
      searchTerm={props.searchTerm}
    />;
  }

  get Results(): MovieResponse {
    return this.result;
  }
  
  public async sendRequestAction(params: RequestParams): Promise<MovieResponse> {
    const response = await fetch("/api/movie?" + new URLSearchParams({
      id: params.id?.toString() || "",
    }).toString());
    const data = await response.json();
    this.result = data.movieData as MovieResponse;
    return this.result;
  }
}