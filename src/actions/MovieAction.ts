import { MovieResult } from "moviedb-promise";
import IRequestAction from "./IRequestAction";
import { JSX } from "react";

export default class MovieAction implements IRequestAction<MovieResult[]> {
    private page: number;
    private element: JSX.Element;

    constructor(page: number, element: JSX.Element) {
        this.page = page;
        this.element = element;
    }

    get Element(): JSX.Element {
        return this.element;
    }

    public async sendRequest(): Promise<MovieResult[]> {
        const response = await fetch("/api/movies?" + new URLSearchParams({
            page: this.page.toString()
        }).toString());
        const data = await response.json();
        return data.results as MovieResult[];
    }
}