
export interface ICRUD<T>{
    create(c: T): Promise<T>;
    list(): Promise<T[]>;
    get(id: number): Promise<T | null>;
    search(filtro: Partial<T>): Promise<T[]>;
    remove(cliente: T): Promise<T>;
    update(id: number, dados: Partial<T>): Promise<void>;
}