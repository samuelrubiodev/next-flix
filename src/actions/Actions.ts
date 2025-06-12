import { JSX } from "react";
import IRequestAction from "./IRequestAction";
import NotFound from "@/app/not-found";

export default class Actions<T = unknown> {
  private actions: IRequestAction<T>[] = [];
    
  public async addAction(action: IRequestAction<T>): Promise<void> {
    this.actions.push(action);

    await action.sendRequest().then((result) => {
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
    
  public getActions(): IRequestAction<T>[] {
      return this.actions;
  }
}