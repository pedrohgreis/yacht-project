import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"

@Entity()
export class Empresa {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cnpj: string;

    @Column()
    razao: string;

    @Column()
    nome: string;

    // @OneToMany(() => Cliente, (clientes) => clientes.empresa)
    // clientes:Cliente[]; (CADASTRO)

    // @OneToMany(() => Funcionario, (funcionarios) => funcionarios.empresa)
    // funcionarios:Funcionario[];

    // @OneToMany(() => Iate, (iates) => iates.empresa)
    // iates: Iate[];


    constructor(cnpj?:string, razao?:string, nome?:string){
        this.cnpj = cnpj;
        this.razao = razao;
        this.nome = nome;
    }
}
