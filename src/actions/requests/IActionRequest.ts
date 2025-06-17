import { JSX } from "react";
import { RequestParams } from "./IRequest";

export default interface IActionRequest<O, T> {
  sendRequestAction: (params: RequestParams) => Promise<O>;
  getElement(props: T): JSX.Element;
  get Results(): O;
  setPage(page:number): void;
}