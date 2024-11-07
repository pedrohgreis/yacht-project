import { Funcionario } from "../entity/Funcionario";
import { FuncionarioRepositorio } from "../repository/RepositoryFuncionario";

export class ServiceFuncionarios{
    private FuncionarioRepository: FuncionarioRepositorio
    private Funcionario: Funcionario

    constructor(){
        this.FuncionarioRepository = new FuncionarioRepositorio();
        
    }

    private ValidarCPF(funcionario: Funcionario): boolean {
        const cpf = funcionario.cpf;
        if (!cpf) {
            throw new Error("CPF não fornecido");
        }
        if (cpf.length === 6 && !isNaN(Number(cpf))) {
            return true;
        } else {
            throw new Error("CPF inválido");
        }
    }
    

    private ValidarNome(funcionario: Funcionario): boolean {
        const nome = funcionario.nome;
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

    async ToCreate(funcionario: Funcionario): Promise<Funcionario> {
        try {
            this.ValidarCPF(funcionario);
            this.ValidarNome(funcionario);
            this.ValidarCargo(funcionario.cargo);
            
            return await this.FuncionarioRepository.create(funcionario);
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
            await this.FuncionarioRepository.update(id, dadosAtualizacao);
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
            await this.FuncionarioRepository.remove(funcion);
            return true;
        } catch (error) {
            console.log("Erro ao remover!");
            throw error;
        }
    }
}
