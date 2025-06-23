import { MovieResponse } from "moviedb-promise";
import IAction from "../IAction";
import { JSX } from "react";
import { GenericActionsProps } from "@/types/actions/types";
import { RequestParams } from "../requests/IRequest";

export default class SingleMovieAction implements IAction<MovieResponse> {
  private result: MovieResponse = {}
  private elementFactory: (props: GenericActionsProps) => JSX.Element;
  
  constructor(elementFactory: (props: GenericActionsProps) => JSX.Element) {
    this.elementFactory = elementFactory;
  }

  public async sendRequest(params: RequestParams): Promise<MovieResponse> {
    const response = await fetch("/api/movie?" + new URLSearchParams({
      id: params.id?.toString() || "",
    }).toString());
    const data = await response.json();
    this.result = data.movieData as MovieResponse;
    return this.result;
  }

  public getResults(): MovieResponse {
    return this.result;
  }

  public getComponent(componentProps: GenericActionsProps): JSX.Element {
    const ElementComponent = this.elementFactory;

    return <ElementComponent
      movie={this.result}
      searchTerm={componentProps.searchTerm}
      calification=""
      selectedGenre=""
      sort=""
    />;
  }
}