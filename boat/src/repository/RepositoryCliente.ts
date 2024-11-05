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
        return await this.repositorio.save(c)
    }

    
    async list(): Promise<Clientes[]> {
        try {
            return await this.repositorio.find({
                relations: ["alugueis"]
            });
        } catch (error) {
            throw new Error("Erro ao listar.");
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
    
        return await this.repositorio.remove(cliente);
        
    }

    async update(id: number, dados: Partial<Clientes>): Promise<void> {
        await this.repositorio.update(id, dados);
    }
}