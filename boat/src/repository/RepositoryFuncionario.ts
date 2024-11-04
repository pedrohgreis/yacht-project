import {  } from '../entity/Musica';
import { banco } from '../data-source';
import { DataSource, Repository } from 'typeorm';

export class MusicaRepository{
    private repositorio: Repository<Musica>;

    constructor(){
        this.repositorio = banco.getRepository(Musica);
    }

    async criar(c: Musica): Promise<Musica>{
        return await this.repositorio.save(c);
    }

    async listar(): Promise<Musica[]>{
        return await this.repositorio.find();
    }
    
    async obter(id: number): Promise<Musica>{
        return await this.repositorio.findOneBy({id: id});
    }

    async pesquisar(musica: Partial<Musica>): Promise<Musica | null>{
        return await this.repositorio.findOne({where : musica});
    }

    async remover(c: Musica): Promise<Musica>{
        return await this.repositorio.remove(c);
    }

    async atualizar(id: number, c: Partial<Musica>): Promise<void>{
        await this.repositorio.update(id, c);
    }
}
