export type RequestParams = {
  id?: number,
  query?: string,
  page?: number
}

export default interface IRequest<D> {
  sendRequest: (params: RequestParams) => Promise<D>;
}