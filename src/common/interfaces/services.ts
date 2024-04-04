
interface Service<T> {
    getAll(status?: number, rol?: number) : Promise<Array<T>>;
    getOne(id: string) : Promise<T>;
    create?(body : T) : Promise<T>;
    update(id : string, body : T) : Promise<T>;
    delete(id: string) : Promise<T>;
}