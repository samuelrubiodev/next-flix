import { JSX } from "react";

export default interface IRequestAction<O> {
    sendRequest: () => Promise<O>;
    getElement(searchTerm: string): JSX.Element;
    get Results(): O;
    getName: () => string;
}