import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm"
import { Empresa } from "./Empresa";
import { Aluguel } from "./Aluguel";
import { Iate } from "./Iate";

@Entity()
export class Funcionario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    cargo: string;

    @Column()
    cpf: number;

    @ManyToMany(() => Funcionario, (funcionario) => funcionario.iates)
    //@JoinTable() //criar uma tabela intermediária
    funcionarios: Funcionario[];

    constructor(nome?: string, cargo?: string, cpf?: number) {
        this.cargo = cargo;
        this.nome = nome;
        this.cpf = cpf;
    }
}
