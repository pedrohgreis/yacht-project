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
        try {
            // Validações de dados podem ser adicionadas aqui
            return await this.repositorio.save(Iate);
        } catch (error) {
            // Tratamento de erros
            throw new Error("Erro ao criar Iate.");
        }
    }

    async listar(): Promise<Iate[]> {
        try {
            return await this.repositorio.find();
        } catch (error) {
            throw new Error("Erro ao listar Iates.");
        }
    }

    async obter(id: number): Promise<Iate | null> {
        try {
            return await this.repositorio.findOneBy({ id: id });
        } catch (error) {
            throw new Error("Erro ao obter Iate.");
        }
    }

    async pesquisar(filtro: Partial<Iate>): Promise<Iate | null> {
        try {
            return await this.repositorio.findOne({ where: filtro });
        } catch (error) {
            throw new Error("Erro ao pesquisar Iate.");
        }
    }

    async remover(iate: Iate): Promise<Iate> {
        try {
            return await this.repositorio.remove(iate);
        } catch (error) {
            throw new Error("Erro ao remover Iate.");
        }
    }

    async atualizar(id: number, dados: Partial<Iate>): Promise<void> {
        try {
            await this.repositorio.update(id, dados);
        } catch (error) {
            throw new Error("Erro ao atualizar Iate.");
        }
    }
}