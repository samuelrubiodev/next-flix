import { TvResult } from "moviedb-promise";
import IAction from "../IAction";
import { GenericActionsProps } from "@/types/actions/types";
import { JSX } from "react";
import { RequestParams } from "../requests/IRequest";

export default class TvShowsAction implements IAction<TvResult[]> {
    private results: TvResult[] = [];
    private elementFactory: (props: GenericActionsProps) => JSX.Element;

    constructor(elementFactory: (props: GenericActionsProps) => JSX.Element) {
        this.elementFactory = elementFactory;
    }

    public getResults(): TvResult[] {
        return this.results;
    }

    public async sendRequest(params: RequestParams): Promise<TvResult[]> {
        const response = await fetch("/api/tv?" + new URLSearchParams({
          page: params.page?.toString() || "1"
        }).toString());
        const data = await response.json();
        this.results = data.results as TvResult[];
        return data.results as TvResult[];
    }

    public getComponent(componentProps: GenericActionsProps): JSX.Element {
        const ElementComponent = this.elementFactory;

        return <ElementComponent
            tvShows={this.results}
            searchTerm={componentProps.searchTerm}
            selectedGenre={componentProps.selectedGenre}
            calification={componentProps.calification}
            sort={componentProps.sort}
        />;
    }
}