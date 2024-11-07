import { Iate } from "../entity/Iate";
import { IateRepositorio } from "../repository/RepositoryIate";

export class IateService{

    private IateRepository: IateRepositorio;

    constructor(){
        this.IateRepository = new IateRepositorio();
    }

    private validarPreco(iate: Iate){
        const preco = iate.preco
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
        const prec = this.validarPreco(iate)
        const capa = this.validarCapacidade(iate)
        const comp = this.validarComprimento(iate)
        try {
            if(prec && capa && comp){
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

    async update(iateId: number, dadosAtualizacao: Partial<Iate>): Promise<Iate> {
        if (dadosAtualizacao.preco !== undefined && dadosAtualizacao.preco < 0) {
            throw new Error('Dados inválidos: preço não pode ser negativo');
        }
        return await this.IateRepository.update(iateId, dadosAtualizacao);
    }

    async remove(id: number): Promise<boolean> {
        try {
            const Iate = await this.IateRepository.get(id);
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