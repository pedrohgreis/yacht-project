import { banco } from "../data-source";
import { DataSource, Repository } from "typeorm";
import { Iate } from "../entity/Iate"; 

interface IIateRepository {
    criar(i: Iate): Promise<Iate>;
    listar(): Promise<Iate[]>;
    obter(id: number): Promise<Iate | null>;
    pesquisar(filtro: Partial<Iate>): Promise<Iate | null>;
    remover(Iate: Iate): Promise<Iate>;
    atualizar(id: number, dados: Partial<Iate>): Promise<void>;
}

export class IateRepositorio implements IIateRepository {
    private repositorio: Repository<Iate>;

    constructor() {
        this.repositorio = banco.getRepository(Iate);
    }

    async criar(Iate: Iate): Promise<Iate> {
            return await this.repositorio.save(Iate);
    }

    async listar(): Promise<Iate[]> {
            return await this.repositorio.find();
    }

    async obter(id: number): Promise<Iate | null> {
            return await this.repositorio.findOneBy({ id: id });
    }

    async pesquisar(filtro: Partial<Iate>): Promise<Iate | null> {
            return await this.repositorio.findOne({ where: filtro });
    }

    async remover(iate: Iate): Promise<Iate> {
            return await this.repositorio.remove(iate);
    }

    async atualizar(id: number, dados: Partial<Iate>): Promise<void> {
            await this.repositorio.update(id, dados);
    }
}