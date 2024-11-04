import { banco } from "../data-source";
import { DataSource, Repository } from "typeorm";
import { Clientes } from "../entity/Cliente";
interface ICliente {
    create(c: Clientes): Promise<Clientes>;
    list(): Promise<Clientes[]>;
    get(id: number): Promise<Clientes | null>;
    search(filtro: Partial<Clientes>): Promise<Clientes | null>;
    remove(cliente: Clientes): Promise<Clientes>;
    update(id: number, dados: Partial<Clientes>): Promise<void>;
}

export class ClienteRepositorio implements ICliente{
    private repositorio: Repository<Clientes>

    constructor(){
        this.repositorio = banco.getRepository(Clientes)
    }

    async create(c:Clientes):Promise<Clientes>{
        try{
            return await this.repositorio.save(c)
        } catch (error){
            throw new Error("Erro ao criar")
        }
    }

    
    async list(): Promise<Clientes[]> {
        try {
            return await this.repositorio.find({
                relations: ["perfis"]
            });
        } catch (error) {
            throw new Error("Erro ao listar filmes.");
        }
    }

    // Retorna cliente e alugueis
    async get(id: number): Promise<Clientes | null> {
        try {
            return await this.repositorio.findOne({
                where: { id },
                relations: ["alugueis"]
            });
        } catch (error) {
            throw new Error("Erro ao obter aluguel.");
        }
    }

    async search(filtro: Partial<Clientes>): Promise<Clientes | null> {
        try {
            return await this.repositorio.findOne({ where: filtro });
        } catch (error) {
            throw new Error("Erro ao pesquisar.");
        }
    }

    async remove(cliente: Clientes): Promise<Clientes> {
        try {
            return await this.repositorio.remove(cliente);
        } catch (error) {
            throw new Error("Erro ao remover cliente.");
        }
    }

    async update(id: number, dados: Partial<Clientes>): Promise<void> {
        try {
            await this.repositorio.update(id, dados);
        } catch (error) {
            throw new Error("Erro ao atualizar cliente.");
        }
    }
}

