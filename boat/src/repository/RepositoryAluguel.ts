import { banco } from "../data-source";
import { DataSource, Repository } from "typeorm";
import { Aluguel } from "../entity/Aluguel";
import { ICRUD } from "./Interface";

export class Alugueis implements ICRUD <Aluguel>{

    private repositorio: Repository<Aluguel>

    constructor(){
        this.repositorio = banco.getRepository(Aluguel);
    }

    async create(c: Aluguel): Promise<Aluguel> {
        return await this.repositorio.save(c)
    }

    async list(): Promise<Aluguel[]> {
        return await this.repositorio.find()
    }

    
    async get(id: number): Promise<Aluguel | null> {
        try {
            return await this.repositorio.findOne({ where: { id } });
        } catch (error) {
            throw new Error("Erro ao obter aluguel.");
        }
    }

    async search(filtro: Partial<Aluguel>): Promise<Aluguel[]> {
        return await this.repositorio.find({where:filtro});
    }

    async remove(cliente: Aluguel): Promise<Aluguel> {
        return await this.repositorio.remove(cliente)
    }

    async update(id: number, dados: Partial<Aluguel>): Promise<Aluguel> {
        await this.repositorio.update(id, dados);
        const aluguelAtualizado = await this.repositorio.findOne({ where: { id } });
        if (!aluguelAtualizado) {
            throw new Error("Aluguel não encontrado");
        }
        return aluguelAtualizado;
    }
}