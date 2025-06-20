import { JSX } from "react";

export default interface IRequestAction<O> {
    sendRequestAction: (isAdultContent: boolean) => Promise<O>;
    getElement(searchTerm: string, selectedGenre: string, calification: string, sort: string): JSX.Element;
    get Results(): O;
    setPage(page:number): void;
}