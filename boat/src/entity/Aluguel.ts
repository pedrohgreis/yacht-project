import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm"
import { Clientes } from "./Cliente";
import { Iate } from "./Iate";


@Entity()
export class Aluguel {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Clientes, (clientes) => clientes.alugueis)
    cliente: Clientes;

    @ManyToOne(() => Iate, (iate) => iate.alugeis)
    iate: Iate;

    @Column()
    dataAluguel: Date;

    @Column()
    dataDevolucao:Date

}