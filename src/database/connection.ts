import "reflect-metadata"
import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "ts_node",
  synchronize: true,
  logging: true,
  entities: [
    __dirname + '/../**/*.entity.ts'
  ],
  migrations: [
      __dirname + '/migrations/*.ts'
  ],
  subscribers: [],

})
AppDataSource.initialize()
              .then(() => console.log('connected success'))
              .catch((error) => console.log(error))
export default AppDataSource