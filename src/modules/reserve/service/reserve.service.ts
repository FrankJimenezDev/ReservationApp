import { Reserve } from "../../../config/entities/reserves";

export class ReserveService implements Service<Reserve> {
    
    getAllByStatus(status: number): Promise<Reserve[]> {
        throw new Error("Method not implemented.");
    }
    
    async getAll(): Promise<Reserve[]> {
        throw new Error("Method not implemented.");
    }
    async getOne(id: string): Promise<Reserve> {
        throw new Error("Method not implemented.");
    }

    async create(body: Reserve): Promise<Reserve> {
        const {
            user_id,
            reserveday
        } = body

        const reserve = Reserve.create({
            user_id,
            reserveday
        })

        await Reserve.save(reserve)

        if (!reserve) {
            throw new Error(`Error al crear la habitacion`)
        }

        return reserve;
    }
    async update(id: string, body: Reserve): Promise<Reserve> {
        throw new Error("Method not implemented.");
    }
    async delete(id: string): Promise<Reserve> {
        throw new Error("Method not implemented.");
    }

}