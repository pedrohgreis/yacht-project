import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, ManyToMany } from "typeorm"
import { Empresa } from "./Empresa";
import { Aluguel } from "./Aluguel";
import { Funcionario } from "./Funcionario";
@Entity()
export class Iate {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    modelo: string;

    @Column()
    marca: string;

    @Column()
    ano: number;

    @OneToMany(() => Aluguel, (alugueis) => alugueis.iate)
    alugeis: Aluguel;

    @OneToMany(() => Empresa, (empresas) => empresas.iate)
    empresa: Empresa;

    @ManyToMany(() => Funcionario, (funcionarios) => funcionarios.iates)
    funcionarios: Funcionario[];

    constructor(modelo?: string, marca?: string, ano?: number) {
        this.marca = marca;
        this.modelo = modelo;
        this.ano = ano;
    }
}