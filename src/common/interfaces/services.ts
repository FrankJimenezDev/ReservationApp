
interface Service<T> {
    getAll(status?: number, rol?: number) : Promise<Array<T>>;
    getOne(id: string | number) : Promise<T>;
    create?(body : T, reserveRoom?: number[]) : Promise<T>;
    update(id : string | number, body : T) : Promise<T>;
    delete(id: string | number) : Promise<T>;
}