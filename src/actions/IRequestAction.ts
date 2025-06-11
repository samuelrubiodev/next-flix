export default interface IRequestAction<O> {
    sendRequest: () => Promise<O>;
}