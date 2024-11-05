import { Funcionario } from "../entity/Funcionario";
import { FuncionarioRepositorio } from "../repository/RepositoryFuncionario";

export class ServiceFuncionarios{
    private FuncionarioRepository: FuncionarioRepositorio
    private Funcionario: Funcionario

    constructor(){
        this.FuncionarioRepository = new FuncionarioRepositorio();
        
    }

    private ValidarCPF(): boolean{
        const cpf = this.Funcionario.cpf
        if((cpf.length === 11) && (!isNaN(Number(cpf)))){
            return true;
        } else{
            throw new Error("CPF inválido");
        } 
    }

    private ValidarNome():boolean{
        const nome = this.Funcionario.nome
        if(nome.length > 3){
            console.log("Nome com mais de 3 caracteres");  
            return true;
        } else{
            throw new Error("Nome não permitido")
        }
    }

    private ValidarCargo():boolean{
        const cargo = this.Funcionario.cargo
        if(cargo.length > 5){
            console.log("Cargo com mais de 5 caracteres");  
            return true;
        } else{
            throw new Error("Cargo não permitido")
        }
    }

    async ToCreate(c:Funcionario): Promise<Funcionario>{
        this.ValidarCPF(); 
        this.ValidarNome();
        this.ValidarCargo();
        try{
            return await this.FuncionarioRepository.create(c);
        } catch{
            throw new Error("Falha ao criar");
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

    async ToUpdate(id:number, Funcionario:Partial<Funcionario>):Promise<void>{
        if(Funcionario.cargo !== undefined){
            this.ValidarCargo();
        }
        try{
            await this.FuncionarioRepository.update(id,Funcionario);
        } catch{
            throw new Error("Erro ao atualizar cargo");
        }
    }

    async ToRemove(id:number):Promise<boolean>{
        try {
            const funcion = await this.FuncionarioRepository.search({ id: id });
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
}