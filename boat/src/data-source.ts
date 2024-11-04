import { DataSource } from "typeorm";

export const banco = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3307,
    username: "root",
    password: "pedro3026",
    database: "boat",
    entities: ["./entity/**.ts"],
    synchronize: true,
    dropSchema: false,
    logging: false
});