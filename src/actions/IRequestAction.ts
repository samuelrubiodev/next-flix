import { JSX } from "react";

export default interface IRequestAction<O> {
    sendRequestAction: () => Promise<O>;
    getElement(searchTerm: string): JSX.Element;
    get Results(): O;
    setPage(page:number): void;
}