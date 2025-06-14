import { MovieResult } from "moviedb-promise";
import IRequestAction from "./IRequestAction";
import { JSX } from "react";
import IRequest from "./requests/IRequest";

export default class MovieAction implements IRequestAction<MovieResult[]> {
    private page: number;
    private results: MovieResult[] = [];
    private request: IRequest<MovieResult[]>
    private elementFactory: (props: {movies: MovieResult[], searchTerm: string}) => JSX.Element;
    public static NUMBER_OPTION: number = 0

    constructor(page: number, request: IRequest<MovieResult[]>, elementFactory: (props: {movies: MovieResult[], searchTerm: string}) => JSX.Element) {
        this.page = page;
        this.request = request;
        this.elementFactory = elementFactory;
    }

    setPage(page: number): void {
        this.page = page;
    }

    getElement(searchTerm: string): JSX.Element {
        return this.elementFactory({movies: this.results, searchTerm: searchTerm});
    }

    get Results(): MovieResult[] {
        return this.results;
    }

    public async sendRequestAction(): Promise<MovieResult[]> {
        this.results = await this.request.sendRequest({ page: this.page });
        return this.results;
    }
}