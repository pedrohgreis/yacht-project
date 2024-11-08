import { banco } from "../data-source";
import { DataSource, Repository } from "typeorm";
import { Clientes } from "../entity/Cliente";
import { ICRUD } from "./Interface";

export class ClienteRepositorio implements ICRUD<Clientes>
{
    private repositorio: Repository<Clientes>

    constructor(){
        this.repositorio = banco.getRepository(Clientes)
    }

    async criar(c:Clientes):Promise<Clientes>{
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

    async pesquisar(filtro: Partial<Clientes>): Promise<Clientes[]> {
        try {
            return await this.repositorio.find({ where: filtro });
        } catch (error) {
            throw new Error("Erro ao pesquisar.");
        }
    }

    async remover(cliente: Clientes): Promise<Clientes> {
    
        return await this.repositorio.remove(cliente);
        
    }

    async atualizar(id: number, dados: Partial<Clientes>): Promise<Clientes> {
        await this.repositorio.update(id, dados);
        return await this.repositorio.findOne({ where: { id } });
    }
}