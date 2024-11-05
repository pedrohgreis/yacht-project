import { Iate } from "../entity/Iate";
import { IateRepositorio } from "../repository/RepositoryIate";

export class IateService{

    private IateRepository: IateRepositorio;

    constructor(){
        this.IateRepository = new IateRepositorio();
    }

    private validarPreco(iate: Iate){
        const preco = iate.preço
        if(preco > 0){
            return true;
        } else{
            throw new Error()
        }
    }

    private validarCapacidade(iate: Iate){
        const capa = iate.capacidade
        if(capa > 0){
            return true
        } else{
            throw new Error()
        }
    }

    private validarComprimento(iate: Iate){
        const comp = iate.comprimento
        if(comp > 0){
            return true
        } else{
            throw new Error()
        }
    }

    async create(iate: Iate): Promise<Iate> {
        const resp = this.validarPreco(iate)
        const capa = this.validarCapacidade(iate)
        const comp = this.validarComprimento(iate)
        try {
            if(resp && capa && comp){
                return await this.IateRepository.create(iate);
            }
        } catch (error) {
            console.log("Erro ao criar!");
        }
    }

    async list(): Promise<Iate[]> {
        try {
            return await this.IateRepository.list();
        } catch (error) {
            console.log("Erro ao listar!");
        }
    }

    async update(id: number, iate: Partial<Iate>): Promise<void> {
        try {
            await this.IateRepository.update(id, iate);
        } catch (error) {
            console.log("Erro ao atualizar!");
        }
    }

    async remove(id: number): Promise<boolean> {
        try {
            const Iate = await this.IateRepository.search({ id: id });
        if (!Iate) {
            return false;
        }
            await this.IateRepository.remove(Iate);
            return true;
        } catch (error) {
            console.log("Erro ao remover!");
        }
    }
}