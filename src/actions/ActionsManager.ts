import { JSX } from "react";
import IAction from "./IAction";
import NotFound from "@/app/not-found";
import { GenericActionsProps } from "@/types/actions/types";
import { RequestParams } from "./requests/IRequest";

export default class ActionsManager {
    private actions: IAction<unknown>[] = []

    public async addAction(action: IAction<unknown>, params: RequestParams) {
        this.actions.push(action);

        await action.sendRequest(params);
    }

    public getAction(actionSelected: number) {
        return this.actions.find((action, id) => id === actionSelected);
    }

    public getActionElement(actionSelected: number, componentProps: GenericActionsProps): JSX.Element {
        const action = this.actions.find((action, id) => id === actionSelected);
        if (!action) {
            return NotFound();
        }

        return action.getComponent(componentProps);
    }
}