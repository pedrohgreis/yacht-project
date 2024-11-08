import { banco } from "../data-source";
import { DataSource, Repository, MoreThan } from "typeorm";
import { Aluguel } from "../entity/Aluguel";
import { ICRUD } from "./Interface";

export class Alugueis implements ICRUD <Aluguel>{

    private repositorio: Repository<Aluguel>

    constructor(){
        this.repositorio = banco.getRepository(Aluguel);
    }

    async criar(c: Aluguel): Promise<Aluguel> {
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

    async pesquisar(filtro: Partial<Aluguel>): Promise<Aluguel[]> {
        return await this.repositorio.find({where:filtro});
    }

    async remover(cliente: Aluguel): Promise<Aluguel> {
        return await this.repositorio.remove(cliente)
    }

    async atualizar(id: number, dados: Partial<Aluguel>): Promise<Aluguel> {
        await this.repositorio.update(id, dados);
        const aluguelAtualizado = await this.repositorio.findOne({ where: { id } });
        if (!aluguelAtualizado) {
            throw new Error("Aluguel não encontrado");
        }
        return aluguelAtualizado;
    }

    async listAlugueisAtivos(): Promise<Aluguel[]> {
        try {
            const agora = new Date();
        
            const aluguelsAtivos = await this.repositorio.find({
                where: {
                    dataDevolucao: MoreThan(agora) 
                }
            });
            return aluguelsAtivos;
        } catch (error) {
            console.error('Erro ao listar aluguéis ativos:', error.message);
            throw error;
        }
    }

    async encontrarCliente(clienteId: number): Promise<Aluguel | undefined> {
        return await this.repositorio.findOne({
            where: {
                cliente: { id: clienteId },
                dataDevolucao: null,
            }
        });
    }

    async encontrarIate(iateId: number): Promise<Aluguel | undefined> {
        return await this.repositorio.findOne({
            where: {
                iate: { id: iateId },
                dataDevolucao: null,
            }
        });
    }
}

