import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Aluguel } from "./Aluguel";

@Entity()
export class Clientes {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    cpf: string;

    @Column()
    idade: number;

    @OneToMany(() => Aluguel, (alugueis) => alugueis.cliente)
    alugueis:Aluguel[];

    constructor(nome?:string, cpf?:string, idade?:number){
        this.nome = nome;
        this.cpf = cpf;
        this.idade = idade;
    }
}