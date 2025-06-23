import { GenericActionsProps } from "@/types/actions/types";
import { JSX } from "react";
import { RequestParams } from "./requests/IRequest";

export default interface IAction<D> {
  sendRequest: (params: RequestParams) => Promise<D>;
  getResults(): D
  getComponent(componentProps: GenericActionsProps): JSX.Element
}