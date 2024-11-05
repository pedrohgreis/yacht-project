import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm"
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
    cpf: string;

    @ManyToMany(() => Iate, (iate) => iate.funcionarios)
    //@JoinTable() // Cria a tabela intermediária para relacionar Funcionarios e Iates
    @JoinTable({
        name: "funcionario_iate", 
        joinColumn: {
            name: "funcionario_id", 
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "iate_id", 
            referencedColumnName: "id"
        }
    })
    iates: Iate[];

    constructor(nome?: string, cargo?: string, cpf?: string) {
        this.cargo = cargo;
        this.nome = nome;
        this.cpf = cpf;
    }
}
