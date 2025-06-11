import { TvResult } from "moviedb-promise";
import IRequestAction from "./IRequestAction";
import { ReactElement } from "react";

export default class TvAction implements IRequestAction<TvResult[]> {
    private page: number;
    private element: ReactElement;

    constructor(page: number, element: ReactElement) {
        this.page = page;
        this.element = element;
    }

    public async sendRequest(): Promise<TvResult[]> {
        const response = await fetch("/api/tv?" + new URLSearchParams({
            page: this.page.toString()
        }).toString());
        const data = await response.json();
        return data.results as TvResult[];
    }
}