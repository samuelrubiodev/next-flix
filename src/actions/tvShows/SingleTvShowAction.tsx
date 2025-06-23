import { ShowResponse } from "moviedb-promise";
import IAction from "../IAction";
import { RequestParams } from "../requests/IRequest";
import { JSX } from "react";
import { GenericActionsProps } from "@/types/actions/types";

export default class SingleTvShowAction implements IAction<ShowResponse> {
  private result: ShowResponse = {}
  private elementFactory: (props: GenericActionsProps) => JSX.Element;

  constructor(elementFactory: (props: GenericActionsProps) => JSX.Element) {
      this.elementFactory = elementFactory;
  }

  public getResults(): ShowResponse {
      return this.result;
  }

  public async sendRequest(params: RequestParams): Promise<ShowResponse> {
    const response = await fetch("/api/tv/show?" + new URLSearchParams({ id: params.id?.toString() || "" }).toString());
    const data = await response.json();
    this.result = data.tvData as ShowResponse;
    return this.result;
  }

  public getComponent(componentProps: GenericActionsProps): JSX.Element {
    const ElementComponent = this.elementFactory;

    return <ElementComponent
      tvShow={this.result}
      searchTerm={componentProps.searchTerm}
      calification=""
      selectedGenre=""
      sort=""
    />;
  }
}