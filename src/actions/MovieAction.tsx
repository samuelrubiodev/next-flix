import { MovieResult } from "moviedb-promise";
import IRequestAction from "./IRequestAction";
import { JSX } from "react";
import Movies from "@/app/components/ui/Actions/Movies/Movies";

export default class MovieAction implements IRequestAction<MovieResult[]> {
    private page: number;
    private name: string;
    private results: MovieResult[] = [];
    public static NUMBER_OPTION: number = 0

    constructor(page: number) {
        this.page = page;
        this.name = "movies";
    }

    setPage(page: number): void {
        this.page = page;
    }

    public getName(): string {
        return this.name;
    }

    getElement(searchTerm: string): JSX.Element {
        return Movies({movies: this.results, searchTerm: searchTerm});
    }

    get Results(): MovieResult[] {
        return this.results;
    }

    public async sendRequest(): Promise<MovieResult[]> {
        const response = await fetch("/api/movies?" + new URLSearchParams({
            page: this.page.toString()
        }).toString());
        const data = await response.json();
        this.results = data.results as MovieResult[];
        return this.results;
    }
}