export interface GetAllParams {
    status?: number | undefined;
    reserveDay?: string | undefined;
    rol?: number | undefined;
  }


export interface Service<T> {
    getAll(params : GetAllParams) : Promise<Array<T>>;
    getOne(id: string | number) : Promise<T>;
    create?(body : T, reserveRoom?: number[]) : Promise<T>;
    update(id : string | number, body : T) : Promise<T>;
    delete(id: string | number) : Promise<T>;
}