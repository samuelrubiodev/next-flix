export type RequestParams = {
  id?: number,
  query?: string,
  page?: number
  isAdultContent?: boolean
}

export default interface IRequest<D> {
  sendRequest: (params: RequestParams) => Promise<D>;
}