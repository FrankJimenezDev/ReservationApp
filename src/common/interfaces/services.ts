
interface Service<T> {
    getAll() : Promise<Array<T>>;
    getOne(id: string) : Promise<T>;
    create?(body : T) : Promise<T>;
    update(id : string, body : T) : Promise<T>;
    delete(id: string) : Promise<T>;
}