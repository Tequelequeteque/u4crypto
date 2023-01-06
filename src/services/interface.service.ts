export interface IService<I, O> {
    execute: (data: I) => Promise<O> | O;
}