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

    @OneToMany(() => Aluguel, (alugueis) => alugueis.cliente, {
        cascade: true,
        onDelete: "CASCADE"
    })
    alugueis:Aluguel[];

    constructor(nome?:string, cpf?:string, idade?:number){
        if(nome) this.nome = nome;
        if(cpf) this.cpf = cpf;
        if(idade) this.idade = idade;
    }
}