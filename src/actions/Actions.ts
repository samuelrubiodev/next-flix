import IRequestAction from "./IRequestAction";

export default class Actions {
    private actions: IRequestAction<any>[] = [];
    
    public addAction(action: IRequestAction<any>): void {
        this.actions.push(action);
    }
    
    public async executeAll(): Promise<any[]> {
        const results: any[] = [];
        for (const action of this.actions) {
            const result = await action.sendRequest();
            results.push(result);
        }
        return results;
    }
    
    public getActions(): IRequestAction<any>[] {
        return this.actions;
    }
}