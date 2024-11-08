import { Funcionario } from "../entity/Funcionario";
import { FuncionarioRepositorio } from "../repository/RepositoryFuncionario";
import { IateRepositorio } from "../repository/RepositoryIate";

export class ServiceFuncionarios{
    private FuncionarioRepository: FuncionarioRepositorio
    private Funcionario: Funcionario
    private iateRepoisitorio: IateRepositorio

    constructor(){
        this.FuncionarioRepository = new FuncionarioRepositorio();
        this.iateRepoisitorio = new IateRepositorio()
    }

    private ValidarCPF(cpf: string): boolean {
        if (!cpf) {
            throw new Error("CPF não fornecido");
        }
        if (cpf.length === 6 && !isNaN(Number(cpf))) {
            return true;
        } else {
            throw new Error("CPF inválido");
        }
    }
    

    private ValidarNome(nome: string): boolean {
        if (nome.length > 3) {
            return true;
        } else {
            throw new Error("Nome deve ter mais de 3 caracteres");
        }
    }
    

    private ValidarCargo(cargo: string): boolean {
        if (cargo.length > 5) {
            return true;
        }
        console.log("Cargo com menos de 5 caracteres");
        return false;
    }

    async ToCreate(dadosFuncionario: {
        nome: string
        cargo: string
        cpf: string
        iatesIds: number[];
    }): Promise<Funcionario> {

        const { nome, cargo, cpf, iatesIds } = dadosFuncionario
        try {
            this.ValidarCPF(cpf);
            this.ValidarNome(nome);
            this.ValidarCargo(cargo);

            const iates = [];
        for (const iateId of iatesIds) {
            const iate = await this.iateRepoisitorio.get(iateId);
            if (!iate) {
                throw new Error(`Iate não encontrado`);
            }
            iates.push(iate);
        }

            const funcionario = new Funcionario()
            funcionario.nome = nome;
            funcionario.cargo = cargo
            funcionario.cpf = cpf
            funcionario.iates = iates
            return await this.FuncionarioRepository.criar(funcionario);
        } catch (error) {
            console.error("Falha ao criar funcionário:", error.message);
            throw new Error(error.message); 
        }
    }
    

    async ToList():Promise<Funcionario[]>{
        try {
            return await this.FuncionarioRepository.list();
        } catch (error) {
            console.log("Erro ao listar!");
            throw error;
        }
    }

    async ToUpdate(id: number, dadosAtualizacao: Partial<Funcionario>): Promise<void> {
        try {
            // Aqui você pode incluir validações, se necessário
            await this.FuncionarioRepository.atualizar(id, dadosAtualizacao);
        } catch (error) {
            console.error("Erro ao atualizar o funcionário:", error.message);
            throw new Error(error.message);
        }
    }
    

    async ToRemove(id:number):Promise<boolean>{
        try {
            const funcion:Funcionario = await this.FuncionarioRepository.get(id);
        if (!funcion) {
            return false;
        }
            await this.FuncionarioRepository.remover(funcion);
            return true;
        } catch (error) {
            console.log("Erro ao remover!");
            throw error;
        }
    }
}
