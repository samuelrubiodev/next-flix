import { RequestParams } from "@/actions/requests/IRequest";
import IActionRequest from "@/actions/requests/IActionRequest";
import NotFound from "@/app/not-found";
import { GenericShowActionRequest } from "@/types/actions/types";
import { ShowResponse } from "moviedb-promise";
import { JSX } from "react";

export default class ActionsSingleTvShows {
  public actions: IActionRequest<ShowResponse,GenericShowActionRequest>[] = [];

  private setPage(page:number) {
    this.actions.forEach((action) => {
      action.setPage(page);
    });
  }

  public async addAction(action: IActionRequest<ShowResponse,GenericShowActionRequest>, params: RequestParams): Promise<void> {
    this.actions.splice(1,this.actions.length);
    this.actions.push(action);

    await action.sendRequestAction(params).then((result) => {
      console.log("Action result:", result);
    });
  }

  public getActionByActionSelected(actionSelected: number, props: GenericShowActionRequest): JSX.Element {
    const action = this.actions.find((action, id) => id === actionSelected);
    if (!action) {
      return NotFound();
    }
    return action.getElement({ 
      shows: [], 
      searchTerm: props.searchTerm, 
      show: props.show 
    });
  }
}