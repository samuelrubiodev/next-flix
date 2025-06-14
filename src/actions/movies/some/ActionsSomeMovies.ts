import { RequestParams } from "@/actions/requests/IRequest";
import ITestRequest from "@/actions/requests/ITestRequest";
import NotFound from "@/app/not-found";
import { GenericMovieActionRequest } from "@/types/actions/types";
import { MovieResult } from "moviedb-promise";
import { JSX } from "react";

export default class ActionsSomeMovies {
  public actions: ITestRequest<MovieResult[],GenericMovieActionRequest>[] = [];

  private setPage(page:number) {
    this.actions.forEach((action) => {
      action.setPage(page);
    });
  }

  public async addAction(action: ITestRequest<MovieResult[],GenericMovieActionRequest>, params: RequestParams): Promise<void> {
    this.actions.splice(1,this.actions.length);
    this.actions.push(action);

    await action.sendRequestAction(params).then((result) => {
      console.log("Action result:", result);
    });
  }

  public getActionByActionSelected(actionSelected: number, props: GenericMovieActionRequest): JSX.Element {
    const action = this.actions.find((action, id) => id === actionSelected);
    if (!action) {
      return NotFound();
    }
    return action.getElement({ movies: [], searchTerm: props.searchTerm });
  }
}