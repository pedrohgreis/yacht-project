import { log } from "console";
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

    async criar(iate: Iate): Promise<Iate> {
        const resp = this.validarPreco(iate)
        const capa = this.validarCapacidade(iate)
        const comp = this.validarComprimento(iate)
        try {
            if(resp && capa && comp){
                return await this.IateRepository.criar(iate);
            }
        } catch (error) {
            console.log("Erro ao criar!");
        }
    }

    async listar(): Promise<Iate[]> {
        try {
            return await this.IateRepository.listar();
        } catch (error) {
            console.log("Erro ao listar!");
        }
    }

    async atualizar(id: number, iate: Partial<Iate>): Promise<void> {
        try {
            await this.IateRepository.atualizar(id, iate);
        } catch (error) {
            console.log("Erro ao atualizar!");
        }
    }

    async remover(id: number): Promise<boolean> {
        try {
            const Iate = await this.IateRepository.pesquisar({ id: id });
        if (!Iate) {
            return false;
        }
            await this.IateRepository.remover(Iate);
            return true;
        } catch (error) {
            console.log("Erro ao remover!");
        }
    }
}