
interface Service<T> {
    getAll() : Promise<Array<T>>;
    getAllByRol?(rol: number) : Promise<Array<T>>;
    getAllByStatus(status: number) : Promise<Array<T>>;
    getAllByReserveStatus?(resStat : boolean) : Promise<Array<T>>
    getOne(id: string) : Promise<T>;
    create?(body : T) : Promise<T>;
    update(id : string, body : T) : Promise<T>;
    delete(id: string) : Promise<T>;
}