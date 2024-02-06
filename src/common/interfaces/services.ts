
interface Service<T> {
    getAll() : Promise<Array<T>>;
    getOne(id: number) : Promise<T>;
    create(body : T) : Promise<T>;
    update(id : number, body : T) : Promise<T>;
    delete(id: number) : Promise<T>;
}