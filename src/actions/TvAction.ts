import { TvResult } from "moviedb-promise";
import IRequestAction from "./IRequestAction";
import { JSX } from "react";
import TvShows from "@/app/components/ui/Actions/TvShows/TvShows";
import IRequest from "./requests/IRequest";

export default class TvAction implements IRequestAction<TvResult[]> {
    private page: number;
    private results: TvResult[] = [];
    private request: IRequest<TvResult[]>;
    public static NUMBER_OPTION: number = 1;

    constructor(page = 1, request: IRequest<TvResult[]>) {
        this.page = page;
        this.request = request;
    }

    setPage(page:number) { this.page = page; }

    getElement(searchTerm: string): JSX.Element {
        return TvShows({searchTerm: searchTerm,tvShows: this.Results});
    }

    get Results(): TvResult[] {
        return this.results;
    }

    public async sendRequestAction(): Promise<TvResult[]> {
        this.results = await this.request.sendRequest({page: this.page});
        return this.results;
    }
}