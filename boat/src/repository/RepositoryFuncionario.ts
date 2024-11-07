import { banco } from "../data-source";
import { DataSource, Repository } from "typeorm";
import { Funcionario } from "../entity/Funcionario";
import { ICRUD } from "./Interface";

export class FuncionarioRepositorio implements ICRUD<Funcionario>
{
    private repositorio: Repository<Funcionario>

    constructor(){
        this.repositorio = banco.getRepository(Funcionario)
    }

    async create(c:Funcionario):Promise<Funcionario>{
        return await this.repositorio.save(c)
    }

    
    async list(): Promise<Funcionario[]> {
        try {
            return await this.repositorio.find({
                relations: ["iates"]
            });
        } catch (error) {
            throw new Error("Erro ao listar os funcionarios.");
        }
    }

    // Retorna funcionario e iates
    async get(id: number): Promise<Funcionario | null> {
        try {
            return await this.repositorio.findOne({
                where: { id },
                relations: ["iates"]
            });
        } catch (error) {
            throw new Error("Erro ao obter funcionarios e iates.");
        }
    }

    async search(filtro: Partial<Funcionario>): Promise<Funcionario[]> {
        try {
            return await this.repositorio.find({ where: filtro });
        } catch (error) {
            throw new Error("Erro ao pesquisar.");
        }
    }

    async remove(cliente: Funcionario): Promise<Funcionario> {
    
        return await this.repositorio.remove(cliente);
        
    }

    async update(id: number, dados: Partial<Funcionario>): Promise<Funcionario | null> {
        // Atualiza os dados do funcionário no banco de dados
        await this.repositorio.update(id, dados);
    
        // Retorna o funcionário atualizado
        return this.repositorio.findOne({
            where: { id },
            relations: ["iates"]
        });
    }
}
