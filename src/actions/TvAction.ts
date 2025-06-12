import { TvResult } from "moviedb-promise";
import IRequestAction from "./IRequestAction";
import { JSX } from "react";
import TvShows from "@/app/components/ui/Actions/TvShows/TvShows";

export default class TvAction implements IRequestAction<TvResult[]> {
    private page: number;
    private name: string;
    private results: TvResult[] = [];
    public static NUMBER_OPTION: number = 1;

    constructor(page = 1) {
        this.page = page;
        this.name = "tv";
    }

    public getName(): string {
        return this.name;
    }

    getElement(searchTerm: string): JSX.Element {
        return TvShows({searchTerm: searchTerm,tvShows: this.Results});
    }

    get Results(): TvResult[] {
        return this.results;
    }

    public async sendRequest(): Promise<TvResult[]> {
        const response = await fetch("/api/tv?" + new URLSearchParams({
            page: this.page.toString()
        }).toString());
        const data = await response.json();
        this.results = data.results as TvResult[];
        return this.results;
    }
}