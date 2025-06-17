import { ShowResponse } from "moviedb-promise";
import ActionRequest from "../IActionRequest";
import { GenericShowActionRequest } from "@/types/actions/types";
import { JSX } from "react";
import { RequestParams } from "../IRequest";

export default class SingleTvRequest implements ActionRequest<ShowResponse, GenericShowActionRequest>{
  private page: number;
  private result: ShowResponse = {};
  private elementFactory: (props: GenericShowActionRequest) => JSX.Element;

  constructor(page: number, elementFactory: (props: GenericShowActionRequest) => JSX.Element) {
    this.page = page;
    this.elementFactory = elementFactory;
  }

  setPage(page: number): void {
    this.page = page;
  }

  getElement(props: GenericShowActionRequest): JSX.Element {
    const ElementComponent = this.elementFactory;

    return <ElementComponent
      shows={[]}
      show={this.result}
      searchTerm={props.searchTerm}
    />;
  }

  get Results(): ShowResponse {
    return this.result;
  }
  
  public async sendRequestAction(params: RequestParams): Promise<ShowResponse> {
    const response = await fetch("/api/tv/show?" + new URLSearchParams({ id: params.id?.toString() || "" }).toString());
    const data = await response.json();
    this.result = data.tvData as ShowResponse;
    return this.result;
  }
}