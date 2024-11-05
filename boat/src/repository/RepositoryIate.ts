import { banco } from "../data-source";
import { DataSource, Repository } from "typeorm";
import { Iate } from "../entity/Iate"; 
import { Interface } from "readline";
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
            return await this.repositorio.find();
    }

    async get(id: number): Promise<Iate | null> {
            return await this.repositorio.findOneBy({ id: id });
    }

    async search(filtro: Partial<Iate>): Promise<Iate | null> {
            return await this.repositorio.findOne({ where: filtro });
    }

    async remove(iate: Iate): Promise<Iate> {
            return await this.repositorio.remove(iate);
    }

    async update(id: number, dados: Partial<Iate>): Promise<void> {
            await this.repositorio.update(id, dados);
    }
}