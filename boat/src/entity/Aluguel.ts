import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm"
import { Clientes } from "./Cliente";
import { Iate } from "./Iate";

@Entity()
export class Aluguel {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Clientes, (clientes) => clientes.alugueis)
    cliente: Clientes;

    @ManyToOne(() => Iate, (iate) => iate.alugueis)
    iate: Iate;

    @Column()
    dataAluguel: Date;

    @Column()
    dataDevolucao:Date

    constructor(cliente?:Clientes, dataAluguel?:Date, dataDevolucao?:Date){
        if(cliente) this.cliente = cliente;
        if(dataAluguel) this.dataAluguel = dataAluguel;
        if(dataDevolucao) this.dataDevolucao = dataDevolucao;
    }
}