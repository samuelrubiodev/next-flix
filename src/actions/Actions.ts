import { JSX } from "react";
import IRequestAction from "./IRequestAction";
import NotFound from "@/app/not-found";

export default class Actions<T = unknown> {
  private actions: IRequestAction<T>[] = [];

  private setPage(page:number) {
    this.actions.forEach((action) => {
      action.setPage(page);
    });
  }
    
  public async addAction(action: IRequestAction<T>, page: number): Promise<void> {
    this.actions.splice(1,this.actions.length);
    this.actions.push(action);
    this.setPage(page);

    await action.sendRequestAction().then((result) => {
      console.log("Action result:", result);
    });
  }

  public getActionByActionSelected(actionSelected: number, searchTerm: string): JSX.Element {
    const action = this.actions.find((action, id) => id === actionSelected);
    if (!action) {
      return NotFound();
    }
    return action.getElement(searchTerm);
  }
}