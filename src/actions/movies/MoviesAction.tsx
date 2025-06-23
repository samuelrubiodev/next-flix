import { MovieResult } from "moviedb-promise";
import IAction from "../IAction";
import { RequestParams } from "../requests/IRequest";
import { GenericActionsProps } from "@/types/actions/types";
import { JSX } from "react";

export default class MoviesAction implements IAction<MovieResult[]> {
  private results: MovieResult[] = [];
  private elementFactory: (props: GenericActionsProps) => JSX.Element;

  constructor(elementFactory: (props: GenericActionsProps) => JSX.Element) {
    this.elementFactory = elementFactory;
  }

  public getResults(): MovieResult[] {
    return this.results;
  }

  public async sendRequest(params: RequestParams): Promise<MovieResult[]> {
    const response = await fetch("/api/movies?" + new URLSearchParams({
      page: params.page?.toString() || "1",
      isAdultContent: params.isAdultContent ? "1" : "0"
    }).toString());
    const data = await response.json();
    this.results = data.results as MovieResult[];
    return data.results as MovieResult[];
  }

  public getComponent(componentProps: GenericActionsProps): JSX.Element {
    const ElementComponent = this.elementFactory;

    return <ElementComponent
      movies={this.results}
      searchTerm={componentProps.searchTerm}
      selectedGenre={componentProps.selectedGenre}
      calification={componentProps.calification}
      sort={componentProps.sort}
    />;
  }
}