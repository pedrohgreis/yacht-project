import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, ManyToMany } from "typeorm"
import { Funcionario } from "./Funcionario";
import { Aluguel } from "./Aluguel";

@Entity()
export class Iate{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    modelo: string;

    @Column()
    marca: string;

    @Column()
    ano: number;

    @Column()
    comprimento: number;

    @Column()
    capacidade: number;

    @Column()
    preco: number;

    @OneToMany(() => Aluguel, (alugueis) => alugueis.iate)
    alugueis: Aluguel; 

    @ManyToMany(() => Funcionario, (funcionarios) => funcionarios.iates)
    funcionarios: Funcionario[];
    
    constructor(modelo?: string, marca?: string, ano?: number, comprimento?: number, capacidade?: number, preco?: number){
        if(marca) this.marca = marca;
        if(modelo) this.modelo = modelo;
        if(ano) this.ano = ano;
        if(comprimento) this.comprimento = comprimento;
        if(capacidade) this.capacidade = capacidade;
        if(preco) this.preco = preco;
    }
}