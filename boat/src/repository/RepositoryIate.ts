import { banco } from "../data-source";
import { Repository } from "typeorm";
import { Iate } from "../entity/Iate"; 
import { ICRUD } from "./Interface";

export class IateRepositorio implements ICRUD<Iate> {
    private repositorio: Repository<Iate>;

    constructor() {
        this.repositorio = banco.getRepository(Iate);
    }

    async create(Iate: Iate): Promise<Iate> {
        return await this.repositorio.save(Iate);
    }

    async list(): Promise<Iate[]> {
        return await this.repositorio.find({
            relations: ["alugueis"]
        });
    }

    async get(id: number): Promise<Iate | null> {
        return await this.repositorio.findOne({
            where: { id },
            relations: ["alugueis"]
        });
    }

    async search(filtro: Partial<Iate>): Promise<Iate[]> {
        return await this.repositorio.find({ where: filtro });
    }

    async remove(iate: Iate): Promise<Iate> {
        return await this.repositorio.remove(iate);
    }

    async update(id: number, dados: Partial<Iate>): Promise<Iate | null> {
        await this.repositorio.update(id, dados);
        return await this.repositorio.findOne({ where: { id } });
    }
}
