import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, ManyToMany } from "typeorm"
import { Empresa } from "./Empresa";

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

    // @OneToMany(() => Alugel, (alugeis) => alugeis.iate)
    // alugeis: Alugel; 

    // @OneToMany(() => Empresa, (empresas) => empresas.iate)
    // empresa: Empresa;

    // @ManyToMany(() => Fuincionario, (funcionarios) => funcionarios.iate)
    // funcionarios: Funcionario[];
    
    constructor(modelo?: string, marca?: string, ano?: number){
        this.marca = marca;
        this.modelo = modelo;
        this.ano = ano;
    }
}