
export interface ICRUD<T>{
    criar(c: T): Promise<T>;
    list(): Promise<T[]>;
    get(id: number): Promise<T | null>;
    pesquisar(filtro: Partial<T>): Promise<T[] | null>;
    remover(cliente: T): Promise<T>;
    atualizar(id: number, dados: Partial<T>): Promise<T | null>;
}